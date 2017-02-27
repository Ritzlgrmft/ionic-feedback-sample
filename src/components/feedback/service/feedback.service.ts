import { EventEmitter, Injectable } from "@angular/core";
import { Headers, Http } from "@angular/http";
import { Platform } from "ionic-angular";
import { Device, Shake } from "ionic-native";

import { ConfigurationService } from "ionic-configuration-service";
import { Logger, LoggingService, LogMessage } from "ionic-logging-service";

import { AppInfo } from "../shared/app-info.model";
import { FeedbackConfiguration } from "../shared/feedback-configuration.model";
import { FeedbackViewerModalManager } from "../viewer/feedback-viewer-modal.manager";

@Injectable()
export class FeedbackService {

	public shaken: EventEmitter<void>;
	private logger: Logger;

	private configuration: FeedbackConfiguration;

	constructor(
		private http: Http,
		private platform: Platform,
		private configurationService: ConfigurationService,
		loggingService: LoggingService) {

		this.logger = loggingService.getLogger("Ionic.Feedback.Service");
		const methodName = "ctor";
		this.logger.entry(methodName);

		this.configure();
		this.shaken = new EventEmitter<void>();

		this.logger.exit(methodName);
	}

	private configure(configuration?: FeedbackConfiguration): void {
		const methodName = "configure";
		this.logger.entry(methodName, configuration);

		if (typeof configuration === "undefined") {
			configuration = this.configurationService.getValue<FeedbackConfiguration>("feedback");
		}
		if (typeof configuration === "undefined") {
			this.logger.error(methodName, "configuration missing");
			throw new Error("FeedbackService: configuation missing");
		}

		this.configuration = configuration;

		this.logger.exit(methodName);
	}

	public async startWatchForShake(): Promise<void> {
		const methodName = "startWatchForShake";
		this.logger.entry(methodName);

		if (!this.configuration.isEnabled) {
			this.logger.warn(methodName, "feedback is disabled");
		} else if (await this.platform.ready() === "cordova" && !Device.isVirtual) {
			Shake.startWatch().subscribe(() => this.onShaken());
			this.logger.debug(methodName, "subscribed for shake events");
		} else {
			this.logger.warn(methodName, "shaking is not supported");
		}

		this.logger.exit(methodName);
	}

	private async onShaken(): Promise<void> {
		const methodName = "onShaken";
		this.logger.entry(methodName);

		this.shaken.emit();
		// const feedbackViewerModalManager: FeedbackViewerModalManager = this.injector.get(FeedbackViewerModalManager);
		// await feedbackViewerModalManager.openModal(this.configuration.language, this.configuration.translation,
		// 	this.configuration.categories, this.configuration.name, this.configuration.email,
		// 	this.configuration.attachScreenshot, this.configuration.attachDeviceInfo,
		// 	this.configuration.attachAppInfo, this.configuration.attachLogMessages);

		this.logger.exit(methodName);
	}

	public async sendFeedback(timestamp: string, category: string, message: string, name: string, email: string, screenshot: string, deviceInfo: Device, appInfo: AppInfo, logMessages: LogMessage[]): Promise<void> {
		const methodName = "sendFeedback";
		this.logger.entry(methodName);

		const headers = new Headers();
		headers.append("Accept", "application/json");
		headers.append("Authorization", "Basic " + btoa("94f4e317-a8ef-4ece-92ff-9e0d9398b5eb" + ":" + "307726c0-f677-4918-beb5-01ca6fce80ea"));
		headers.append("Content-Type", "application/json");
		const body = {
			timestamp: timestamp,
			category: category,
			message: message,
			name: name,
			email: email,
			screenshot: screenshot,
			deviceInfo: deviceInfo,
			appInfo: appInfo,
			logMessages: logMessages
		};

		try {
			this.logger.debug(methodName, `before POST ${this.configuration.url}`);
			await this.http.post(this.configuration.url, JSON.stringify(body), { headers: headers, withCredentials: true }).toPromise();
			this.logger.debug(methodName, `after POST ${this.configuration.url}`);
		} catch (e) {
			this.logger.error(methodName, e);
			throw e;
		}

		this.logger.exit(methodName);
	}
}