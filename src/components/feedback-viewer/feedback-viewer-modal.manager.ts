import { EventEmitter, Injectable } from "@angular/core";
import { ModalController } from "ionic-angular";
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
	 * @returns Promise which gets resolved as soon as the modal is shown.
	 */
	public async openModal(
		language: string = undefined,
		translation: FeedbackViewerTranslation = undefined,
		categories: string[] = undefined): Promise<void> {

		const methodName = "openModal";
		this.logger.entry(methodName);

		// take screenshot
		let screenshot: any;
		try {
			screenshot = (await Screenshot.URI()).URI;
			this.logger.debug(methodName, screenshot);
		} catch (e) {
			// TODO: add errorhandling
			this.logger.error(methodName, "could not take screenshot", e);
			screenshot = undefined;
		}

		const modal = this.modalController.create(FeedbackViewerModalComponent, {
			screenshot: screenshot,
			language: language,
			translation: translation,
			categories: categories
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