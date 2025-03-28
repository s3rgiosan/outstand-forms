/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Options for the field label position.
 *
 * @type {Array}
 */
export const labelPositionOptions = [
	{
		value: 'top',
		label: __('Top', 'outstand-forms'),
	},
	{
		value: 'left',
		label: __('Left', 'outstand-forms'),
	},
	{
		value: 'right',
		label: __('Right', 'outstand-forms'),
	},
];

/**
 * Options for the field description position.
 *
 * @type {Array}
 */
export const descriptionPositionOptions = [
	{
		value: 'bottom',
		label: __('Bottom', 'outstand-forms'),
	},
	{
		value: 'top',
		label: __('Top', 'outstand-forms'),
	},
];

/**
 * Options for the field autocomplete.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
 *
 * @type {Array}
 */
export const autocompleteOptions = [
	{
		label: '',
		value: '',
	},
	{
		label: __('Disabled (off)', 'outstand-forms'),
		value: 'off',
	},
	{
		label: __('Enabled (on)', 'outstand-forms'),
		value: 'on',
	},
	{
		label: __('Full Name (name)', 'outstand-forms'),
		value: 'name',
	},
	{
		label: __('First Name (given-name)', 'outstand-forms'),
		value: 'given-name',
	},
	{
		label: __('Last Name (family-name)', 'outstand-forms'),
		value: 'family-name',
	},
	{
		label: __('Email (email)', 'outstand-forms'),
		value: 'email',
	},
	{
		label: __('Username (username)', 'outstand-forms'),
		value: 'username',
	},
	{
		label: __('New Password (new-password)', 'outstand-forms'),
		value: 'new-password',
	},
	{
		label: __('Current Password (current-password)', 'outstand-forms'),
		value: 'current-password',
	},
	{
		label: __('Organization (organization)', 'outstand-forms'),
		value: 'organization',
	},
	{
		label: __('Street Address (street-address)', 'outstand-forms'),
		value: 'street-address',
	},
	{
		label: __('Address Line 1 (address-line1)', 'outstand-forms'),
		value: 'address-line1',
	},
	{
		label: __('Address Line 2 (address-line2)', 'outstand-forms'),
		value: 'address-line2',
	},
	{
		label: __('Country (country-name)', 'outstand-forms'),
		value: 'country-name',
	},
	{
		label: __('ZIP/Postal Code (postal-code)', 'outstand-forms'),
		value: 'postal-code',
	},
	{
		label: __('City (city)', 'outstand-forms'),
		value: 'city',
	},
	{
		label: __('Region/State (region)', 'outstand-forms'),
		value: 'region',
	},
	{
		label: __('Phone Number (tel)', 'outstand-forms'),
		value: 'tel',
	},
	{
		label: __('Birthdate (bday)', 'outstand-forms'),
		value: 'bday',
	},
	{
		label: __('Website URL (url)', 'outstand-forms'),
		value: 'url',
	},
];
