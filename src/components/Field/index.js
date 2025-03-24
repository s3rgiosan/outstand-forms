/**
 * Internal dependencies
 */
import FieldInput from '../FieldInput';
import FieldLabel from '../FieldLabel';
import FieldDescription from '../FieldDescription';

export default function Field({ type = 'text', attributes, setAttributes }) {
	const { labelPosition, descriptionPosition } = attributes;

	const hasInlineLabel = labelPosition === 'left' || labelPosition === 'right';

	const labelField = <FieldLabel attributes={attributes} setAttributes={setAttributes} />;
	const descriptionField = (
		<FieldDescription attributes={attributes} setAttributes={setAttributes} />
	);
	const inputField = (
		<FieldInput type={type} attributes={attributes} setAttributes={setAttributes} />
	);

	return (
		<>
			{labelPosition !== 'right' && labelField}
			{!hasInlineLabel && descriptionPosition === 'top' && descriptionField}

			{hasInlineLabel ? (
				<div className="osf__field-wrapper">
					{descriptionPosition === 'top' && descriptionField}
					{inputField}
					{descriptionPosition === 'bottom' && descriptionField}
				</div>
			) : (
				inputField
			)}

			{!hasInlineLabel && descriptionPosition === 'bottom' && descriptionField}
			{labelPosition === 'right' && labelField}
		</>
	);
}
