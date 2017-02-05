import { EventEmitter, Injectable } from "@angular/core";
import { ModalController, Platform } from "ionic-angular";
import { Screenshot } from "ionic-native";

import { FeedbackViewerModalComponent } from "./feedback-viewer-modal.component";
import { FeedbackViewerTranslation } from "./feedback-viewer-translation.model";

import { Logger, LoggingService } from "ionic-logging-service";

/**
 * Helper class which makes the usage of the FeedbackViewerModalComponent more comfortable.
 */
@Injectable()
export class FeedbackViewerModalManager {

	constructor(
		private platform: Platform,
		private modalController: ModalController,
		loggingService: LoggingService) {

		this.logger = loggingService.getLogger("Ionic.Feedback.Viewer.Modal.Manager");
		const methodName = "ctor";
		this.logger.entry(methodName);

		this.logger.exit(methodName);
	}

	/**
	 * Event submitted when the modal gets closed.
	 */
	public modalClosed = new EventEmitter<void>();

	// tslint:disable-next-line:completed-docs
	private logger: Logger;

	/**
	 * Opens the modal.
	 * @param language language used for the modal. Currently the languages en and de are supported.
	 *                 If the given language is unknown or undefined, the given translation is used.
	 * @param translation translation for the labels in the modal.
	 * @param categories optional categories of the feedback.
	 * @param email email address
	 * @param attachScreenshot if true, a shot of the current screen will be attached by default
	 * @returns Promise which gets resolved as soon as the modal is shown.
	 */
	public async openModal(
		language: string,
		translation: FeedbackViewerTranslation,
		categories: string[],
		email: string,
		attachScreenshot: boolean): Promise<void> {

		const methodName = "openModal";
		this.logger.entry(methodName, language, typeof translation === "object" ? "object" : undefined, categories, email, attachScreenshot);

		// take screenshot
		let screenshot: string = undefined;
		if (attachScreenshot) {
			try {
				if (await this.platform.ready() === "cordova") {
					screenshot = (await Screenshot.URI()).URI;
					this.logger.debug(methodName, screenshot);
				} else {
					this.logger.debug(methodName, "no screenshot taken since not running on device");
				}
			} catch (e) {
				// TODO: add errorhandling
				this.logger.error(methodName, "could not take screenshot", e);
			}
		}

		const modal = this.modalController.create(FeedbackViewerModalComponent, {
			screenshot: screenshot,
			language: language,
			translation: translation,
			categories: categories,
			email: email
		});
		modal.onDidDismiss(() => {
			this.onModalClosed();
		});
		await modal.present();

		this.logger.exit(methodName);
	}

	/**
	 * Callback called when the modal is closed.
	 */
	private onModalClosed(): void {
		const methodName = "onModalClosed";
		this.logger.entry(methodName);

		this.modalClosed.emit();

		this.logger.exit(methodName);
	}
}