import { Component } from "@angular/core";

import { SplashScreen } from "@ionic-native/splash-screen";
import { Platform } from "ionic-angular";

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

	constructor(
		platform: Platform,
		splashScreen: SplashScreen,
		feedbackService: FeedbackService,
		private feedbackViewerModalManager: FeedbackViewerModalManager) {
		platform.ready().then(() => {
			feedbackService.shaken.subscribe(() => {
				this.onShaken();
			});
			feedbackService.startWatchForShake();
			splashScreen.hide();
		});
	}

	private async onShaken(): Promise<void> {
		try {
			await this.feedbackViewerModalManager.openModal();
		} catch (e) {
			// ignore errors
		}
	}
}
