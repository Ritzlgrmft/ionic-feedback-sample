import { FeedbackViewerTranslation } from "../viewer/feedback-viewer-translation.model";
import { AttachmentState } from "./attachment-state.model";

export interface FeedbackConfiguration {

	isEnabled: boolean;

	url: string;

	language: string;
	translation: FeedbackViewerTranslation;
	categories: string[];
	attachScreenshot: boolean;
	attachDeviceInfo: boolean;
	attachAppInfo: boolean;
	attachLogMessages: AttachmentState;
}
