/**
 * Describes all values needed in a translation.
 */
export interface FeedbackViewerTranslation {
	/**
	 * Title of the modal.
	 */
	title: string;

	/**
	 * Cancel button.
	 * This text is shown only on iOS.
	 * On Android or Windows, just an close-icon is used.
	 */
	cancel: string;

	/**
	 * Send button.
	 */
	send: string;

	/**
	 * Message placeholder.
	 */
	message: string;

	/**
	 * Name placeholder.
	 */
	name: string;

	/**
	 * Email placeholder.
	 */
	email: string;

	/**
	 * Include screenshot label.
	 */
	includeScreenshot: string;

	/**
	 * Include device info label.
	 */
	includeDeviceInfo: string;

	/**
	 * Include app info label.
	 */
	includeAppInfo: string;

	/**
	 * Include log label.
	 */
	includeLogMessages: string;
}
