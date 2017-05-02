import { Component } from "@angular/core";

import { SplashScreen } from "@ionic-native/splash-screen";
import { Platform } from "ionic-angular";

import { Logger, LoggingService } from "ionic-logging-service";
import { FeedbackService, FeedbackViewerModalManager } from "../components/feedback";

import { HomePage } from "../pages/home/home";

/**
 * Root component of the app.
 */
@Component({
	templateUrl: "app.html",
})
export class AppComponent {

	/**
	 * Root page of the app.
	 */
	public rootPage = HomePage;

	private logger: Logger;

	constructor(
		platform: Platform,
		splashScreen: SplashScreen,
		loggingService: LoggingService,
		feedbackService: FeedbackService,
		private feedbackViewerModalManager: FeedbackViewerModalManager) {

		this.logger = loggingService.getLogger("Ionic.Feedback.Sample");
		const methodName = "ctor";
		this.logger.entry(methodName);

		platform.ready().then(() => {
			feedbackService.shaken.subscribe(() => {
				this.onShaken();
			});
			feedbackService.startWatchForShake();
			splashScreen.hide();
		});

		this.logger.exit(methodName);
	}

	private async onShaken(): Promise<void> {
		const methodName = "onShaken";
		this.logger.entry(methodName);

		try {
			await this.feedbackViewerModalManager.openModal();
		} catch (e) {
			this.logger.error(methodName, e);
		}

		this.logger.exit(methodName);
	}
}
