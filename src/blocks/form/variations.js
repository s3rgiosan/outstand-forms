/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { BlankVariationIcon, ContactUsVariationIcon } from './icon';
import { getBlockId } from '../../utils';

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
		attributes: {},
		icon: ContactUsVariationIcon,
		innerBlocks: [
			[
				'osf/form-fields',
				{},
				[
					[
						'osf/field-text',
						{
							fieldId: getBlockId(),
							name: 'name',
							label: __('Name', 'outstand-forms'),
							required: true,
							helpText: __('Please enter your full name.', 'outstand-forms'),
							autocomplete: 'name',
						},
					],
					[
						'osf/field-email',
						{
							fieldId: getBlockId(),
							name: 'email',
							label: __('Email', 'outstand-forms'),
							required: true,
							helpText: __('Please enter your email address.', 'outstand-forms'),
						},
					],
					[
						'osf/field-textarea',
						{
							fieldId: getBlockId(),
							name: 'message',
							label: __('Message', 'outstand-forms'),
							required: true,
							helpText: __('Please enter your message.', 'outstand-forms'),
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
