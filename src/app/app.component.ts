import { Component } from "@angular/core";
import { Platform } from "ionic-angular";

import { FeedbackPage } from "../pages/feedback/feedback";

/**
 * Root component of the app.
 */
@Component({
	templateUrl: "app.html"
})
export class AppComponent {

	/**
	 * Root page of the app.
	 */
	public rootPage = FeedbackPage;

	constructor(platform: Platform) {
		platform.ready().then(() => {
			// StatusBar.styleDefault();
			// Splashscreen.hide();
		});
	}
}
