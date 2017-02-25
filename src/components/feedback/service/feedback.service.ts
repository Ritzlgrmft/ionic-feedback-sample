import { Injectable } from "@angular/core";
import { Headers, Http } from "@angular/http";
import { Device } from "ionic-native";

import { ConfigurationService } from "ionic-configuration-service";
import { Logger, LoggingService, LogMessage } from "ionic-logging-service";

import { AppInfo } from "../shared/app-info.model";
import { FeedbackConfiguration } from "./feedback-configuration.model";

@Injectable()
export class FeedbackService {

	private logger: Logger;

	private url: string;

	constructor(
		private http: Http,
		private configurationService: ConfigurationService,
		loggingService: LoggingService) {

		this.logger = loggingService.getLogger("Ionic.Feedback.Service");
		const methodName = "ctor";
		this.logger.entry(methodName);

		this.configure();

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

		this.url = configuration.url;

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
			this.logger.debug(methodName, `before POST ${this.url}`);
			await this.http.post(this.url, JSON.stringify(body), { headers: headers, withCredentials: true }).toPromise();
			this.logger.debug(methodName, `after POST ${this.url}`);
		} catch (e) {
			this.logger.error(methodName, e);
			throw e;
		}

		this.logger.exit(methodName);
	}
}