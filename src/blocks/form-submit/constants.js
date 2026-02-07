/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

export const SUBMIT_BUTTON_WRAPPER_BLOCK = {
	name: 'core/buttons',
	attributes: {
		className: 'osf-form__submit-buttons',
		lock: {
			remove: true,
		},
	},
};

export const SUBMIT_BUTTON_BLOCK = {
	name: 'core/button',
	attributes: {
		text: __('Submit', 'outstand-forms'),
		tagName: 'button',
		type: 'submit',
		className: 'osf-form__submit-button',
		lock: {
			remove: true,
		},
	},
};

export const TEMPLATE = [
	[
		'core/buttons',
		SUBMIT_BUTTON_WRAPPER_BLOCK.attributes,
		[['core/button', SUBMIT_BUTTON_BLOCK.attributes]],
	],
];
