import { Component } from "@angular/core";
import { ItemSliding, ModalController, NavController, reorderArray } from "ionic-angular";

import { FeedbackViewerModalManager, FeedbackViewerTranslation } from "ionic-feedback-module";
import { Logger, LoggingService } from "ionic-logging-service";

import { SettingsPage } from "../settings/settings";

/**
 * Home page.
 */
@Component({
	selector: "page-home",
	templateUrl: "home.html",
})
export class HomePage {

	private logger: Logger;

	constructor(
		private modalController: ModalController,
		loggingService: LoggingService,
		private feedbackViewerModalManager: FeedbackViewerModalManager) {

		this.logger = loggingService.getLogger("Ionic.Feedback.Sample.HomePage");
		const methodName = "ctor";
		this.logger.entry(methodName);

		this.logger.exit(methodName);
	}

	/**
	 * Open feedback modal.
	 */
	public async openFeedback(): Promise<void> {
		const methodName = "openFeedback";
		this.logger.entry(methodName);

		await this.feedbackViewerModalManager.openModal();

		this.logger.exit(methodName);
	}

	/**
	 * Open settings modal.
	 */
	public async openSettings(): Promise<void> {
		const methodName = "openSettings";
		this.logger.entry(methodName);

		const modal = this.modalController.create(SettingsPage);
		await modal.present();

		this.logger.exit(methodName);
	}
}
