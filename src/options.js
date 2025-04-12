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
 * Options for the field help text position.
 *
 * @type {Array}
 */
export const helpTextPositionOptions = [
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
		label: __('Disabled', 'outstand-forms'),
		value: 'off',
	},
	{
		label: __('Enabled', 'outstand-forms'),
		value: 'on',
	},
	{
		label: __('Full name', 'outstand-forms'),
		value: 'name',
	},
	{
		label: __('Given name or first name', 'outstand-forms'),
		value: 'given-name',
	},
	{
		label: __('Family name or last name', 'outstand-forms'),
		value: 'family-name',
	},
	{
		label: __('Additional name or middle name', 'outstand-forms'),
		value: 'additional-name',
	},
	{
		label: __('Prefix or title', 'outstand-forms'),
		value: 'honorific-prefix',
	},
	{
		label: __('Suffix', 'outstand-forms'),
		value: 'honorific-suffix',
	},
	{
		label: __('E-mail address', 'outstand-forms'),
		value: 'email',
	},
	{
		label: __('Nickname', 'outstand-forms'),
		value: 'nickname',
	},
	{
		label: __('Username', 'outstand-forms'),
		value: 'username',
	},
	{
		label: __('New password', 'outstand-forms'),
		value: 'new-password',
	},
	{
		label: __('Current password', 'outstand-forms'),
		value: 'current-password',
	},
	{
		label: __('Company name', 'outstand-forms'),
		value: 'organization',
	},
	{
		label: __('Street address', 'outstand-forms'),
		value: 'street-address',
	},
	{
		label: __('Address line 1', 'outstand-forms'),
		value: 'address-line1',
	},
	{
		label: __('Address line 2', 'outstand-forms'),
		value: 'address-line2',
	},
	{
		label: __('Address line 3', 'outstand-forms'),
		value: 'address-line3',
	},
	{
		label: __('Country code', 'outstand-forms'),
		value: 'country',
	},
	{
		label: __('Country name', 'outstand-forms'),
		value: 'country-name',
	},
	{
		label: __('Postal code or zip code', 'outstand-forms'),
		value: 'postal-code',
	},
	{
		label: __('City', 'outstand-forms'),
		value: 'city',
	},
	{
		label: __('State or region', 'outstand-forms'),
		value: 'region',
	},
	{
		label: __('Phone number', 'outstand-forms'),
		value: 'tel',
	},
	{
		label: __('Birthdate', 'outstand-forms'),
		value: 'bday',
	},
	{
		label: __('Day component of birthday', 'outstand-forms'),
		value: 'bday-day',
	},
	{
		label: __('Month component of birthday', 'outstand-forms'),
		value: 'bday-month',
	},
	{
		label: __('Year component of birthday', 'outstand-forms'),
		value: 'bday-year',
	},
	{
		label: __('Website URL', 'outstand-forms'),
		value: 'url',
	},
];
