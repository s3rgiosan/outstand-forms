/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

export default function Textarea({ attributes, setAttributes }) {
	const { required, placeholder, rows, cols } = attributes;

	const onPlaceholderChange = (value) => {
		setAttributes({ placeholder: value });
	};

	return (
		<textarea
			className="osf-field__textarea"
			aria-label={__('Optional placeholder text', 'outstand-forms')}
			placeholder={placeholder ? undefined : __('Optional placeholder…', 'outstand-forms')}
			value={placeholder}
			onChange={(event) => onPlaceholderChange(event.target.value)}
			aria-required={required}
			rows={rows}
			cols={cols}
		/>
	);
}
