import { Component, OnInit } from "@angular/core";
import { NavParams, ViewController } from "ionic-angular";

import { Logger, LoggingService } from "ionic-logging-service";

import { FeedbackViewerTranslation } from "./feedback-viewer-translation.model";

/**
 * Ionic modal showing FeedbackViewerComponent.
 */
@Component({
	selector: "ionic-feedback-viewer-modal",
	templateUrl: "feedback-viewer-modal.html"

})
export class FeedbackViewerModalComponent implements OnInit {

	public category: string;
	public categories: string[];
	public message: string;
	public email: string;
	public showScreenshot: boolean;
	public includeScreenshot: boolean;
	public screenshot: any;

	/**
	 * Language to be used for the modal.
	 * Currently supported: en, de
	 */
	private language: string;

	/**
	 * Translation to be used for the modal.
	 * If specified, the language is ignored.
	 */
	private translation: FeedbackViewerTranslation;

	// tslint:disable-next-line:completed-docs
	private logger: Logger;

	// tslint:disable-next-line:completed-docs	
	private translations: { [language: string]: FeedbackViewerTranslation; };

	constructor(
		private viewController: ViewController,
		navParams: NavParams,
		loggingService: LoggingService) {

		this.logger = loggingService.getLogger("Ionic.Feedback.Viewer.Modal.Component");
		const methodName = "ctor";
		this.logger.entry(methodName);

		this.categories = ["Cat A", "Cat B", "Cat C"];
		this.category = this.categories[0];
		this.includeScreenshot = true;
		this.screenshot = navParams.get("screenshot");
		this.showScreenshot = (typeof this.screenshot === "string");
		this.language = navParams.get("language");
		this.translation = navParams.get("translation");

		this.logger.exit(methodName);
	}

	/**
	 * Initializes the FeedbackViewerModalComponent.
	 * It configures the supported translations.
	 */
	public ngOnInit(): void {
		// prepare translations
		this.translations = {};
		// tslint:disable-next-line:no-string-literal
		this.translations["en"] = {
			"title": "Feedback",
			"cancel": "Cancel"
		};
		// tslint:disable-next-line:no-string-literal
		this.translations["de"] = {
			"title": "Feedback",
			"cancel": "Abbrechen"
		};
	}

	/**
	 * Eventhandler called by Ionic when the modal is opened.
	 */
	public ionViewDidEnter(): void {
		const methodName = "ionViewDidEnter";
		this.logger.entry(methodName);

		this.logger.exit(methodName);
	}

	/**
	 * Eventhandler called when the cancel button is clicked.
	 */
	public onClose(): void {
		const methodName = "onClose";
		this.logger.entry(methodName);

		this.viewController.dismiss();

		this.logger.exit(methodName);
	}

	public onSend(): void {
		const methodName = "onSend";
		this.logger.entry(methodName);

		this.viewController.dismiss();

		this.logger.exit(methodName);
	}

	/**
	 * Helper method returning the current translation:
	 * - the property translation if defined
	 * - the translation according property language if valid
	 * - English translation, otherwise
	 */
	public getTranslation(): FeedbackViewerTranslation {
		if (typeof this.translation !== "undefined") {
			return this.translation;
		} else if (typeof this.language !== "undefined" && typeof this.translations[this.language] === "object") {
			return this.translations[this.language];
		} else {
			// tslint:disable-next-line:no-string-literal
			return this.translations["en"];
		}
	}
}
