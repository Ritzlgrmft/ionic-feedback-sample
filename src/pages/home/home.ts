import { Component } from "@angular/core";
import { ItemSliding, ModalController, NavController, reorderArray } from "ionic-angular";
import { ReorderIndexes } from "ionic-angular/components/item/item-reorder";

import { LoggingService, Logger } from "ionic-logging-service";

import { FeedbackViewerModalManager, FeedbackViewerTranslation } from "../../components/feedback";

import { SettingsPage } from "../settings/settings";

/**
 * Home page.
 */
@Component({
	selector: "page-home",
	templateUrl: "home.html",
})
export class HomePage {

	/**
	 * Available languages for FeedbackViewerModalManager.
	 */
	public languages: string[];

	/**
	 * Selected language.
	 */
	public selectedLanguage: string;

	/**
	 * Custom translation, used if selectedLanguage === "custom"
	 */
	public translation: FeedbackViewerTranslation;

	public categories: string[];

	public name: string;
	public email: string;

	public attachScreenshot: boolean;
	public attachDeviceInfo: boolean;
	public attachAppInfo: boolean;
	public attachLogMessages: boolean;

	private logger: Logger;

	constructor(
		private modalController: ModalController,
		private navController: NavController,
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

		await this.feedbackViewerModalManager.openModal(
			this.selectedLanguage === "custom" ? undefined : this.selectedLanguage,
			this.selectedLanguage === "custom" ? this.translation : undefined,
			this.categories,
			this.name,
			this.email,
			this.attachScreenshot,
			this.attachDeviceInfo,
			this.attachAppInfo,
			this.attachLogMessages);

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
