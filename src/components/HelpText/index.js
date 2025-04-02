/**
 * WordPress dependencies
 */
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { HELP_TEXT_ALLOWED_FORMATS } from '../../constants';

export default function HelpText({ attributes, setAttributes }) {
	const { helpText } = attributes;

	const onHelpTextChange = (value) => {
		setAttributes({ helpText: value });
	};

	return (
		<RichText
			tagName="div"
			value={helpText}
			onChange={onHelpTextChange}
			aria-label={__('Optional help text…', 'outstand-forms')}
			placeholder={__('Add help text', 'outstand-forms')}
			allowedFormats={HELP_TEXT_ALLOWED_FORMATS}
			className="osf-field__help-text"
		/>
	);
}
