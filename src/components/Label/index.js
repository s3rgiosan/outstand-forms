/**
 * WordPress dependencies
 */
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function Label({ attributes, setAttributes, context }) {
	const { label } = attributes;
	const { 'osf/requiredIndicator': requiredIndicator } = context;

	const onChangeLabel = (value) => {
		setAttributes({ label: value });
	};

	return (
		<div className="osf-field__label">
			<RichText
				tagName="label"
				value={label}
				onChange={onChangeLabel}
				aria-label={
					label ? __('Label', 'outstand-forms') : __('Empty label', 'outstand-forms')
				}
				placeholder={__('Type a label', 'outstand-forms')}
				allowedFormats={[]}
			/>
			{requiredIndicator && ' '}
			{requiredIndicator && (
				<span className="osf-field__required-indicator">{requiredIndicator}</span>
			)}
		</div>
	);
}
