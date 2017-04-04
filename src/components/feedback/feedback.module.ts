import { NgModule } from "@angular/core";
import { IonicModule } from "ionic-angular";

import { FeedbackService } from "./service/feedback.service";
import { FeedbackViewerModalComponent } from "./viewer/feedback-viewer-modal.component";
import { FeedbackViewerModalManager } from "./viewer/feedback-viewer-modal.manager";

@NgModule({
	declarations: [
		FeedbackViewerModalComponent,
	],
	entryComponents: [
		FeedbackViewerModalComponent,
	],
	imports: [
		IonicModule,
	],
	providers: [
		FeedbackViewerModalManager,
		FeedbackService,
	],
})
export class FeedbackModule { }
