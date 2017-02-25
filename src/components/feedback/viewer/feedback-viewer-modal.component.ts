import { Component, OnInit } from "@angular/core";
import { Headers, Http } from "@angular/http";
import { AlertController, NavParams, Platform, ViewController } from "ionic-angular";
import { Device } from "ionic-native";
import * as moment from "moment";

import { Logger, LoggingService, LogMessage } from "ionic-logging-service";

import { AppInfo } from "../shared/app-info.model";
import { FeedbackService } from "../service/feedback.service";
import { FeedbackViewerTranslation } from "./feedback-viewer-translation.model";

/**
 * Ionic modal showing FeedbackViewerComponent.
 */
@Component({
	selector: "ionic-feedback-viewer-modal",
	templateUrl: "feedback-viewer-modal.html"

})
export class FeedbackViewerModalComponent implements OnInit {

	public timestamp: string;
	public showCategories: boolean;
	public category: string;
	public categories: string[];
	public message: string;
	public name: string;
	public email: string;
	public showScreenshot: boolean;
	public includeScreenshot: boolean;
	public screenshot: string;
	public showDeviceInfo: boolean;
	public includeDeviceInfo: boolean;
	public deviceInfo: Device;
	public showAppInfo: boolean;
	public includeAppInfo: boolean;
	public appInfo: AppInfo;
	public showLogMessages: boolean;
	public includeLogMessages: boolean;
	public logMessages: LogMessage[];

	public get sendDisabled(): boolean {
		return typeof this.message === "undefined" || this.message.length === 0;
	}

	/**
	 * Language to be used for the modal.
	 * Currently supported: en, de
	 */
	private language: string;

	/**
	 * Translation to be used for the modal.
	 * If specified, the language is ignored.
	 */
	private translation: FeedbackViewerTranslation;

	// tslint:disable-next-line:completed-docs
	private logger: Logger;

	// tslint:disable-next-line:completed-docs	
	private translations: { [language: string]: FeedbackViewerTranslation; };

	constructor(
		private viewController: ViewController,
		navParams: NavParams,
		platform: Platform,
		private alertController: AlertController,
		private http: Http,
		loggingService: LoggingService,
		private feedbackService: FeedbackService) {

		this.logger = loggingService.getLogger("Ionic.Feedback.Viewer.Modal.Component");
		const methodName = "ctor";
		this.logger.entry(methodName);

		this.categories = navParams.get("categories");
		if (Array.isArray(this.categories) && this.categories.length > 0) {
			this.showCategories = true;
			this.category = this.categories[0];
		} else {
			this.showCategories = false;
		}

		this.includeScreenshot = true;
		this.screenshot = navParams.get("screenshot");
		this.showScreenshot = (typeof this.screenshot !== "undefined");

		this.includeDeviceInfo = true;
		this.deviceInfo = navParams.get("deviceInfo");
		this.showDeviceInfo = (typeof this.deviceInfo !== "undefined");

		this.includeAppInfo = true;
		this.appInfo = navParams.get("appInfo");
		this.showAppInfo = (typeof this.appInfo !== "undefined");

		this.includeLogMessages = true;
		this.logMessages = navParams.get("logMessages");
		this.showLogMessages = (typeof this.logMessages !== "undefined");

		this.timestamp = moment().toISOString();
		this.name = navParams.get("name");
		this.email = navParams.get("email");

		this.language = navParams.get("language");
		this.translation = navParams.get("translation");

		this.logger.exit(methodName);
	}

	/**
	 * Initializes the FeedbackViewerModalComponent.
	 * It configures the supported translations.
	 */
	public ngOnInit(): void {
		// prepare translations
		this.translations = {};
		// tslint:disable-next-line:no-string-literal
		this.translations["en"] = {
			title: "Feedback",
			cancel: "Cancel",
			send: "Send",
			message: "Message",
			name: "Name",
			email: "Email",
			includeScreenshot: "Include Screenshot",
			includeDeviceInfo: "Include Device Info",
			includeAppInfo: "Include App Info",
			includeLogMessages: "Include Log"
		};
		// tslint:disable-next-line:no-string-literal
		this.translations["de"] = {
			title: "Feedback",
			cancel: "Abbrechen",
			send: "Senden",
			message: "Nachricht",
			name: "Name",
			email: "Email",
			includeScreenshot: "Screenshot einschließen",
			includeDeviceInfo: "Geräte Info einschließen",
			includeAppInfo: "App Info einschließen",
			includeLogMessages: "Log einschließen"
		};
	}

	/**
	 * Eventhandler called by Ionic when the modal is opened.
	 */
	public ionViewDidEnter(): void {
		const methodName = "ionViewDidEnter";
		this.logger.entry(methodName);

		this.logger.exit(methodName);
	}

	/**
	 * Eventhandler called when the cancel button is clicked.
	 */
	public onClose(): void {
		const methodName = "onClose";
		this.logger.entry(methodName);

		this.viewController.dismiss();

		this.logger.exit(methodName);
	}

	public async onSend(): Promise<void> {
		const methodName = "onSend";
		this.logger.entry(methodName);

		try {
			await this.feedbackService.sendFeedback(
				this.timestamp,
				this.category,
				this.message,
				this.name,
				this.email,
				this.showScreenshot && this.includeScreenshot ? this.screenshot : undefined,
				this.showDeviceInfo && this.includeDeviceInfo ? this.deviceInfo : undefined,
				this.showAppInfo && this.includeAppInfo ? this.appInfo : undefined,
				this.showLogMessages && this.includeLogMessages ? this.logMessages : undefined
			);
			this.viewController.dismiss();
		} catch (e) {
			const alert = this.alertController.create({
				title: "Feedback",
				subTitle: "Could not send feedback",
				buttons: ["OK"]
			});
			await alert.present();
		}

		this.logger.exit(methodName);
	}

	/**
	 * Helper method returning the current translation:
	 * - the property translation if defined
	 * - the translation according property language if valid
	 * - English translation, otherwise
	 */
	public getTranslation(): FeedbackViewerTranslation {
		if (typeof this.translation !== "undefined") {
			return this.translation;
		} else if (typeof this.language !== "undefined" && typeof this.translations[this.language] === "object") {
			return this.translations[this.language];
		} else {
			// tslint:disable-next-line:no-string-literal
			return this.translations["en"];
		}
	}
}
