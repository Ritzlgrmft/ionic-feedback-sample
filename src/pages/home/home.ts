import { Component } from "@angular/core";
import { ItemSliding, NavController, reorderArray } from "ionic-angular";
import { ReorderIndexes } from "ionic-angular/components/item/item-reorder";

import { FeedbackViewerModalManager, FeedbackViewerTranslation } from "../../components/feedback-viewer";

/**
 * Home page.
 */
@Component({
	selector: "page-home",
	templateUrl: "home.html"
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

	public email: string;

	public attachScreenshot: boolean;

	private loggerName = "Ionic.Feedback.Sample.HomePage";

	constructor(
		private navController: NavController,
		private feedbackViewerModalManager: FeedbackViewerModalManager) {

		this.languages = ["en", "de", "custom"];
		this.selectedLanguage = "en";
		this.translation = {
			title: "myTitle",
			cancel: "myCancel",
			send: "mySend",
			message: "myMessage",
			email: "myEmail",
			includeScreenshot: "myIncludeScreenshot"
		};
		this.categories = ["Issue", "Suggestion"];
		this.email = "somebody@somewhere.com";
		this.attachScreenshot = true;
	}

	public ionViewDidEnter(): void {
		// this.openModal();
	}

	/**
	 * Open feedback modal.
	 */
	public openModal(): void {
		this.feedbackViewerModalManager.openModal(
			this.selectedLanguage === "custom" ? undefined : this.selectedLanguage,
			this.selectedLanguage === "custom" ? this.translation : undefined,
			this.categories,
			this.email,
			this.attachScreenshot);
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
