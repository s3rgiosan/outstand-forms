/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { text, email } from './icon';

const variations = [
	{
		name: 'text',
		title: __('Text', 'outstand-forms'),
		isDefault: true,
		icon: text,
		keywords: [
			__('field', 'outstand-forms'),
			__('input', 'outstand-forms'),
			__('text', 'outstand-forms'),
		],
		attributes: {
			type: 'text',
		},
		scope: ['block', 'inserter', 'transform'],
	},
	{
		name: 'email',
		title: __('Email', 'outstand-forms'),
		icon: email,
		keywords: [
			__('field', 'outstand-forms'),
			__('input', 'outstand-forms'),
			__('email', 'outstand-forms'),
		],
		attributes: {
			type: 'email',
		},
		scope: ['block', 'inserter', 'transform'],
	},
];

variations.forEach((variation) => {
	if (variation.isActive) {
		return;
	}
	variation.isActive = (blockAttributes, variationAttributes) =>
		blockAttributes.type === variationAttributes.type;
});

export default variations;
