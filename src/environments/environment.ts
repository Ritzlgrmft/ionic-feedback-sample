import { AttachmentState } from "ionic-feedback-module";

export const environment = {
	production: false,

	logging: {
		logLevels: [
			{
				loggerName: "root",
				logLevel: "DEBUG",
			},
		],
	},
	feedback: {
		isEnabled: true,
		appKey: "94f4e317-a8ef-4ece-92ff-9e0d9398b5eb",
		appSecret: "307726c0-f677-4918-beb5-01ca6fce80ea",
		url: "http://localhost:5000/api/Feedback",
		language: "en",
		categories: [
			"Issue",
			"Suggestion",
		],
		attachScreenshot: AttachmentState.Ask,
		attachDeviceInfo: AttachmentState.Ask,
		attachAppInfo: AttachmentState.Ask,
		attachLogMessages: AttachmentState.Ask,
	},
};

import "zone.js/dist/zone-error";

