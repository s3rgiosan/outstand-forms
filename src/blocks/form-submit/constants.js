/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

export const SUBMIT_BUTTON_WRAPPER_BLOCK = {
	name: 'core/buttons',
	attributes: {
		className: 'wp-block-osf-form-submit__buttons',
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
		className: 'wp-block-osf-form-submit__button',
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
