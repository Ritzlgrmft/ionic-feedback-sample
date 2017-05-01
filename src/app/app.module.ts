import { APP_INITIALIZER, ErrorHandler, NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";

import { AppVersion } from "@ionic-native/app-version";
import { Device } from "@ionic-native/device";
import { Screenshot } from "@ionic-native/screenshot";
import { Shake } from "@ionic-native/shake";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";

import { ConfigurationService } from "ionic-configuration-service";
import { LoggingService } from "ionic-logging-service";
import { FeedbackModule } from "../components/feedback";
import { HomePage } from "../pages/home/home";
import { AppComponent } from "./app.component";

/**
 * Helper function for loading the configuration data.
 * Must be defined in a separate function due to ngc restrictions.
 */
export function loadConfiguration(configurationService: ConfigurationService): () => Promise<void> {
	return () => configurationService.load("assets/settings.json");
}

/**
 * NgModule for the app.
 */
@NgModule({
	bootstrap: [IonicApp],
	declarations: [
		AppComponent,
		HomePage,
	],
	entryComponents: [
		AppComponent,
		HomePage,
	],
	imports: [
		BrowserModule,
		FeedbackModule,
		HttpModule,
		IonicModule.forRoot(AppComponent),
	],
	providers: [
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		ConfigurationService,
		{
			deps: [ConfigurationService],
			multi: true,
			provide: APP_INITIALIZER,
			useFactory: loadConfiguration,
		},
		LoggingService,
		AppVersion,
		Device,
		Screenshot,
		Shake,
	],
})
export class AppModule { }
