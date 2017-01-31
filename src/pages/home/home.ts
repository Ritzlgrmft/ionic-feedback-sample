import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

import { FeedbackViewerModalManager, FeedbackViewerTranslation } from "../../components/feedback-viewer";

/**
 * Home page.
 */
@Component({
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
	}

	public ionViewDidEnter(): void {
		this.openModal();
	}

	/**
	 * Open feedback modal.
	 */
	public openModal(): void {
		if (this.selectedLanguage === "custom") {
			this.feedbackViewerModalManager.openModal(undefined, this.translation);
		} else {
			this.feedbackViewerModalManager.openModal(this.selectedLanguage);
		}
	}

	/**
	 * Change the language for the feedback modal.
	 */
	public changeLanguage(language: string): void {
		this.selectedLanguage = language;
	}
}
