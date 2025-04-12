/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { text, email, hash, lock, phone, link } from './icon';

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
			autocomplete: 'email',
		},
		scope: ['block', 'inserter', 'transform'],
	},
	{
		name: 'number',
		title: __('Number', 'outstand-forms'),
		icon: hash,
		keywords: [
			__('field', 'outstand-forms'),
			__('input', 'outstand-forms'),
			__('number', 'outstand-forms'),
		],
		attributes: {
			type: 'number',
		},
		scope: ['block', 'inserter', 'transform'],
	},
	{
		name: 'password',
		title: __('Password', 'outstand-forms'),
		icon: lock,
		keywords: [
			__('field', 'outstand-forms'),
			__('input', 'outstand-forms'),
			__('password', 'outstand-forms'),
		],
		attributes: {
			type: 'password',
			autocomplete: 'new-password',
		},
		scope: ['block', 'inserter', 'transform'],
	},
	{
		name: 'tel',
		title: __('Phone', 'outstand-forms'),
		icon: phone,
		keywords: [
			__('field', 'outstand-forms'),
			__('input', 'outstand-forms'),
			__('telephone', 'outstand-forms'),
			__('tel', 'outstand-forms'),
		],
		attributes: {
			type: 'tel',
			autocomplete: 'tel',
		},
		scope: ['block', 'inserter', 'transform'],
	},
	{
		name: 'url',
		title: __('URL', 'outstand-forms'),
		icon: link,
		keywords: [
			__('field', 'outstand-forms'),
			__('input', 'outstand-forms'),
			__('url', 'outstand-forms'),
			__('link', 'outstand-forms'),
		],
		attributes: {
			type: 'url',
			autocomplete: 'url',
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
