import { Component } from "@angular/core";
import { ItemSliding, NavController, reorderArray } from "ionic-angular";
import { ReorderIndexes } from "ionic-angular/components/item/item-reorder";

import { FeedbackViewerModalManager, FeedbackViewerTranslation } from "../../components/feedback";

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

	// private loggerName = "Ionic.Feedback.Sample.HomePage";

	constructor(
		private navController: NavController,
		private feedbackViewerModalManager: FeedbackViewerModalManager) {

		this.languages = ["en", "de", "custom"];
		this.selectedLanguage = "en";
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
		this.categories = ["Issue", "Suggestion"];
		this.name = "It's me";
		this.email = "somebody@somewhere.com";
		this.attachScreenshot = true;
		this.attachDeviceInfo = true;
		this.attachAppInfo = true;
		this.attachLogMessages = true;
	}

	/**
	 * Open feedback modal.
	 */
	public openModal(): void {
		this.feedbackViewerModalManager.openModal(
			this.selectedLanguage === "custom" ? undefined : this.selectedLanguage,
			this.selectedLanguage === "custom" ? this.translation : undefined,
			this.categories,
			this.name,
			this.email,
			this.attachScreenshot,
			this.attachDeviceInfo,
			this.attachAppInfo,
			this.attachLogMessages);
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
