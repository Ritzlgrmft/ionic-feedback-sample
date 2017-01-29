import { Component, OnInit } from "@angular/core";

import { ConfigurationService } from "ionic-configuration-service";
import { Logger, LoggingService } from "ionic-logging-service";

/**
 * Component for displaying user feedback.
 * The component can be embedded in any web page using the directive ionic-feedback-viewer.
 */
@Component({
	selector: "ionic-feedback-viewer",
	templateUrl: "feedback-viewer.html"
})
export class FeedbackViewerComponent implements OnInit {

	// tslint:disable-next-line:completed-docs
	private logger: Logger;

	constructor(
		private configurationService: ConfigurationService,
		loggingService: LoggingService) {

		this.logger = loggingService.getLogger("Ionic.Feedback.Viewer.Component");
		const methodName = "ctor";
		this.logger.entry(methodName);

		this.logger.exit(methodName);
	}

	/**
	 * Initializes the FeedbackViewerComponent.
	 */
	public ngOnInit(): void {
	}
}
