import { FeedbackViewerTranslation } from "../viewer/feedback-viewer-translation.model";

export interface FeedbackConfiguration {

	isEnabled: boolean;

	url: string;

	language: string;
	translation: FeedbackViewerTranslation;
	categories: string[];
	name: string;
	email: string;
	attachScreenshot: boolean;
	attachDeviceInfo: boolean;
	attachAppInfo: boolean;
	attachLogMessages: boolean;
}