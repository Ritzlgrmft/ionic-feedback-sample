import { APP_INITIALIZER, ErrorHandler, NgModule } from "@angular/core";
import { Http, HttpModule } from "@angular/http";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { ConfigurationService } from "ionic-configuration-service";
import { LoggingService } from "ionic-logging-service";
import { AppComponent } from "./app.component";
import { FeedbackModule } from "../components/feedback";
import { HomePage } from "../pages/home/home";

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
	declarations: [
		AppComponent,
		HomePage
	],
	imports: [
		IonicModule.forRoot(AppComponent),
		HttpModule,
		FeedbackModule
	],
	bootstrap: [IonicApp],
	entryComponents: [
		AppComponent,
		HomePage
	],
	providers: [
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		ConfigurationService,
		{
			provide: APP_INITIALIZER,
			useFactory: loadConfiguration,
			deps: [ConfigurationService],
			multi: true
		},
		LoggingService
	]
})
export class AppModule { }
