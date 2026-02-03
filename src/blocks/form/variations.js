/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { blank, contactUs } from './icon';
import { getBlockId } from '../../utils';

const variations = [
	{
		name: 'blank',
		title: __('Blank', 'outstand-forms'),
		isDefault: true,
		attributes: {
			type: 'inline',
		},
		icon: blank,
		innerBlocks: [
			[
				'osf/form-fields',
				{},
				[
					[
						'osf/field-input',
						{
							fieldId: getBlockId(),
						},
					],
				],
			],
			['osf/form-actions', {}],
		],
		scope: ['block'],
	},
	{
		name: 'contact-us',
		title: __('Contact Us', 'outstand-forms'),
		attributes: {},
		icon: contactUs,
		innerBlocks: [
			[
				'osf/form-fields',
				{},
				[
					[
						'osf/field-input',
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
						'osf/field-input',
						{
							fieldId: getBlockId(),
							type: 'email',
							name: 'email',
							label: __('Email', 'outstand-forms'),
							required: true,
							helpText: __('Please enter your email address.', 'outstand-forms'),
							autocomplete: 'email',
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
			['osf/form-actions', {}],
		],
		scope: ['block'],
	},
];

export default variations;
