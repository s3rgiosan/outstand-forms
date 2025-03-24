/**
 * WordPress dependencies
 */
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { DESCRIPTION_ALLOWED_FORMATS } from '../../constants';

export default function FieldDescription({ attributes, setAttributes }) {
	const { description } = attributes;

	const onDescriptionChange = (value) => {
		setAttributes({ description: value });
	};

	return (
		<RichText
			tagName="div"
			value={description}
			onChange={onDescriptionChange}
			aria-label={__('Optional description…', 'outstand-forms')}
			placeholder={__('Add a short description', 'outstand-forms')}
			allowedFormats={DESCRIPTION_ALLOWED_FORMATS}
			className="osf__field-description"
		/>
	);
}
