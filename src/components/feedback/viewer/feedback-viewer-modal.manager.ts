import { EventEmitter, Injectable } from "@angular/core";

import { AppVersion } from "@ionic-native/app-version";
import { Device } from "@ionic-native/device";
import { Screenshot } from "@ionic-native/screenshot";
import { ModalController, Platform } from "ionic-angular";

import { FeedbackService } from "../service/feedback.service";
import { AppInfo } from "../shared/app-info.model";
import { FeedbackConfiguration } from "../shared/feedback-configuration.model";
import { FeedbackContact } from "../shared/feedback-contact.model";
import { FeedbackViewerModalComponent } from "./feedback-viewer-modal.component";
import { FeedbackViewerTranslation } from "./feedback-viewer-translation.model";

import { ConfigurationService } from "ionic-configuration-service";
import { Logger, LoggingService, LogMessage } from "ionic-logging-service";

/**
 * Helper class which makes the usage of the FeedbackViewerModalComponent more comfortable.
 */
@Injectable()
export class FeedbackViewerModalManager {

	/**
	 * Event submitted when the modal gets closed.
	 */
	public modalClosed = new EventEmitter<void>();

	private configuration: FeedbackConfiguration;
	private contact: FeedbackContact;

	private logger: Logger;

	private modalIsOpen: boolean;

	constructor(
		private platform: Platform,
		private modalController: ModalController,
		private appVersion: AppVersion,
		private device: Device,
		private screenshot: Screenshot,
		private loggingService: LoggingService,
		private feedbackService: FeedbackService) {

		this.logger = loggingService.getLogger("Ionic.Feedback.Viewer.Modal.Manager");
		const methodName = "ctor";
		this.logger.entry(methodName);

		this.configuration = feedbackService.configuration;
		this.contact = feedbackService.contact;

		this.modalIsOpen = false;

		this.logger.exit(methodName);
	}

	/**
	 * Opens the modal.
	 * @param language language used for the modal. Currently the languages en and de are supported.
	 *                 If the given language is unknown or undefined, the given translation is used.
	 * @param translation translation for the labels in the modal.
	 * @param categories optional categories of the feedback.
	 * @param name name of the contact.
	 * @param email email address.
	 * @param attachScreenshot if true, a shot of the current screen will be attached.
	 * @param attachLogMessages if true, the last log messages will be attached.
	 * @param attachDeviceInfo if true, the device info will be attached.
	 * @param attachAppInfo if true, the app info will be attached.
	 * @returns Promise which gets resolved as soon as the modal is shown.
	 */
	public async openModal(
		language: string = this.configuration.language,
		translation: FeedbackViewerTranslation = this.configuration.translation,
		categories: string[] = this.configuration.categories,
		name: string = this.contact.name,
		email: string = this.contact.email,
		attachScreenshot: boolean = this.configuration.attachScreenshot,
		attachDeviceInfo: boolean = this.configuration.attachDeviceInfo,
		attachAppInfo: boolean = this.configuration.attachAppInfo,
		attachLogMessages: boolean = this.configuration.attachLogMessages): Promise<void> {

		// retrieve log messages (as soon as possible)
		let logMessages: LogMessage[];
		if (attachLogMessages) {
			// thanks to slice(), the array is cloned
			logMessages = this.loggingService.getLogMessages().slice(0);
		}

		const methodName = "openModal";
		this.logger.entry(methodName, language, typeof translation === "object" ? "object" : undefined, categories,
			name, email, attachScreenshot, attachDeviceInfo, attachAppInfo, attachLogMessages);

		if (this.modalIsOpen) {
			this.logger.warn(methodName, "modal is already open");
			throw new Error("FeedbackViewerModalComponent is already open");
		}

		try {
			this.modalIsOpen = true;

			// take screenshot
			let screenshot: string;
			if (attachScreenshot) {
				try {
					if (await this.platform.ready() === "cordova") {
						screenshot = (await this.screenshot.URI()).URI;
						this.logger.debug(methodName, "screenshot taken");
					} else {
						this.logger.debug(methodName, "no screenshot taken since not running on device");
					}
				} catch (e) {
					this.logger.error(methodName, "could not take screenshot", e);
				}
			}

			// retrieve device info
			const deviceInfo = (this.platform.is("cordova") && attachDeviceInfo) ? this.device : undefined;

			// retrieve app info
			let appInfo: AppInfo;
			if (this.platform.is("cordova") && attachAppInfo) {
				appInfo = {
					appName: await this.appVersion.getAppName(),
					packageName: await this.appVersion.getPackageName(),
					versionCode: await this.appVersion.getVersionCode(),
					versionNumber: await this.appVersion.getVersionNumber(),
				};
			}

			const modal = this.modalController.create(FeedbackViewerModalComponent, {
				appInfo,
				categories,
				deviceInfo,
				email,
				language,
				logMessages,
				name,
				screenshot,
				translation,
			});
			modal.onDidDismiss(() => {
				this.onModalClosed();
			});
			await modal.present();
		} catch (e) {
			this.logger.error(methodName, e);
			// something went wrong, so the modal is not open
			this.modalIsOpen = false;
			throw e;
		}

		this.logger.exit(methodName);
	}

	/**
	 * Callback called when the modal is closed.
	 */
	private onModalClosed(): void {
		const methodName = "onModalClosed";
		this.logger.entry(methodName);

		this.modalIsOpen = false;
		this.modalClosed.emit();

		this.logger.exit(methodName);
	}
}
