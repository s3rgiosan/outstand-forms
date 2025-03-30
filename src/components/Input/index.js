/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

export default function Input({ type = 'text', attributes, setAttributes }) {
	const { required, placeholder } = attributes;

	const onPlaceholderChange = (value) => {
		setAttributes({ placeholder: value });
	};

	return (
		<input
			type={type}
			className={clsx('osf-field__input', `osf-field__input--${type}`)}
			aria-label={__('Optional placeholder text', 'outstand-forms')}
			placeholder={placeholder ? undefined : __('Optional placeholder…', 'outstand-forms')}
			value={placeholder}
			onChange={(event) => onPlaceholderChange(event.target.value)}
			aria-required={required}
		/>
	);
}
