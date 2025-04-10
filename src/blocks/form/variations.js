/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { BlankVariationIcon, ContactUsVariationIcon } from './icon';

const variations = [
	{
		name: 'blank',
		title: __('Blank', 'outstand-forms'),
		isDefault: true,
		attributes: {
			type: 'inline',
		},
		icon: BlankVariationIcon,
		innerBlocks: [
			['osf/form-fields', {}, []],
			['osf/form-submit-button', {}],
		],
		scope: ['block'],
	},
	{
		name: 'contact-us',
		title: __('Contact Us', 'outstand-forms'),
		attributes: {
			type: 'inline',
		},
		icon: ContactUsVariationIcon,
		innerBlocks: [
			[
				'osf/form-fields',
				{},
				[
					[
						'osf/field-text',
						{
							label: __('Name', 'outstand-forms'),
							required: true,
							helpText: 'Please enter your full name.',
							name: 'name',
							autocomplete: 'name',
						},
					],
					[
						'osf/field-textarea',
						{
							label: __('Message', 'outstand-forms'),
							required: true,
							helpText: 'Please enter your message.',
						},
					],
				],
			],
			['osf/form-submit-button', {}],
		],
		scope: ['block'],
	},
];

export default variations;
