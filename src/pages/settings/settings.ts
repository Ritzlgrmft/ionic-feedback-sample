import { Component } from "@angular/core";
import { ItemSliding, NavController, reorderArray, ViewController } from "ionic-angular";
import { ReorderIndexes } from "ionic-angular/components/item/item-reorder";

import { Logger, LoggingService } from "ionic-logging-service";

import { FeedbackService, FeedbackViewerModalManager, FeedbackViewerTranslation } from "../../components/feedback";
import { FeedbackConfiguration } from "../../components/feedback/shared/feedback-configuration.model";
import { FeedbackContact } from "../../components/feedback/shared/feedback-contact.model";

/**
 * Home page.
 */
@Component({
	selector: "page-settings",
	templateUrl: "settings.html",
})
export class SettingsPage {

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
	private configuration: FeedbackConfiguration;
	private contact: FeedbackContact;

	constructor(
		private navController: NavController,
		private viewController: ViewController,
		loggingService: LoggingService,
		private feedbackService: FeedbackService,
		private feedbackViewerModalManager: FeedbackViewerModalManager) {

		this.logger = loggingService.getLogger("Ionic.Feedback.Sample.SettingsPage");
		const methodName = "ctor";
		this.logger.entry(methodName);

		this.configuration = feedbackService.configuration;
		this.contact = feedbackService.contact;

		this.languages = ["en", "de", "custom"];

		this.selectedLanguage = this.configuration.language;
		if (this.selectedLanguage === "custom") {
			this.translation = this.configuration.translation;
		} else {
			this.translation = {
				cancel: "myCancel",
				email: "myEmail",
				includeAppInfo: "myIncludeAppInfo",
				includeDeviceInfo: "myIncludeDeviceInfo",
				includeLogMessages: "myIncludeLogMessages",
				includeScreenshot: "myIncludeScreenshot",
				message: "myMessage",
				name: "myName",
				send: "mySend",
				title: "myTitle",
			};
		}
		this.categories = this.configuration.categories;
		this.name = this.contact.name;
		this.email = this.contact.email;
		this.attachScreenshot = this.configuration.attachScreenshot;
		this.attachDeviceInfo = this.configuration.attachDeviceInfo;
		this.attachAppInfo = this.configuration.attachAppInfo;
		this.attachLogMessages = this.configuration.attachLogMessages;

		this.logger.exit(methodName);
	}

	public close(): void {
		const methodName = "close";
		this.logger.entry(methodName);

		this.viewController.dismiss();

		this.logger.exit(methodName);
	}

	public save(): void {
		const methodName = "save";
		this.logger.entry(methodName);

		this.configuration.language = this.selectedLanguage;
		if (this.selectedLanguage === "custom") {
			this.configuration.translation = this.translation;
		}
		this.configuration.categories = this.categories;
		this.contact.name = this.name;
		this.contact.email = this.email;
		this.configuration.attachScreenshot = this.attachScreenshot;
		this.configuration.attachDeviceInfo = this.attachDeviceInfo;
		this.configuration.attachAppInfo = this.attachAppInfo;
		this.configuration.attachLogMessages = this.attachLogMessages;

		this.viewController.dismiss();

		this.logger.exit(methodName);
	}

	/**
	 * Change the language for the feedback modal.
	 */
	public changeLanguage(language: string): void {
		this.selectedLanguage = language;
	}

	public reorderCategories(indexes: ReorderIndexes): void {
		this.categories = reorderArray(this.categories, indexes);
	}

	public deleteCategory(categoryToDelete: ItemSliding): void {
		for (let i = 0; i < this.categories.length; i++) {
			if (this.categories[i] === categoryToDelete.toString()) {
				this.categories.splice(i, 1);
				break;
			}
		}
	}

	public addCategory(): void {
		this.categories.push(`Category ${this.categories.length + 1}`);
	}
}
