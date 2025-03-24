/**
 * WordPress dependencies
 */
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function FieldLabel({ attributes, setAttributes }) {
	const { label } = attributes;

	const onChangeLabel = (value) => {
		setAttributes({ label: value });
	};

	return (
		<RichText
			tagName="label"
			value={label}
			onChange={onChangeLabel}
			aria-label={label ? __('Label', 'outstand-forms') : __('Empty label', 'outstand-forms')}
			placeholder={__('Type a label', 'outstand-forms')}
			allowedFormats={[]}
			className="osf__field-label"
		/>
	);
}
