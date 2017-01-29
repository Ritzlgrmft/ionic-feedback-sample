import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

import { FeedbackPage } from "../feedback/feedback";
// import { FeedbackViewerModalManager, FeedbackViewerTranslation } from "ionic-feedback-viewer";

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

	// /**
	//  * Custom translation, used if selectedLanguage === "custom"
	//  */
	// public translation: FeedbackViewerTranslation;

	constructor(
		private navController: NavController
		// private feedbackViewerModalManager: FeedbackViewerModalManager
	) {

		this.languages = ["en", "de", "custom"];
		this.selectedLanguage = "en";
		// this.translation = { title: "myTitle", cancel: "myCancel" };
	}

	/**
	 * Go to feedback page.
	 */
	public goToFeedbackPage(): void {
		this.navController.push(FeedbackPage);
	}

	/**
	 * Open feedback modal.
	 */
	public openModal(): void {
		// if (this.selectedLanguage === "custom") {
		// 	this.feedbackViewerModalManager.openModal(undefined, this.translation);
		// } else {
		// 	this.feedbackViewerModalManager.openModal(this.selectedLanguage);
		// }
	}

	/**
	 * Change the language for the feedback modal.
	 */
	public changeLanguage(language: string): void {
		this.selectedLanguage = language;
	}
}
