/**
 * Internal dependencies
 */
import FieldInput from '../FieldInput';
import FieldLabel from '../FieldLabel';
import FieldDescription from '../FieldDescription';

export default function FormField({ type = 'text', attributes, setAttributes }) {
	const { labelPosition, descriptionPosition } = attributes;

	const hasInlineLabel = labelPosition === 'left' || labelPosition === 'right';

	const labelField = <FieldLabel attributes={attributes} setAttributes={setAttributes} />;
	const descriptionField = (
		<FieldDescription attributes={attributes} setAttributes={setAttributes} />
	);
	const inputField = <FieldInput type={type} {...attributes} setAttributes={setAttributes} />;

	return (
		<>
			{labelPosition === 'top' && labelField}
			{descriptionPosition === 'top' && descriptionField}

			{hasInlineLabel ? (
				<div className="osf__field-wrapper">
					{labelPosition === 'left' && labelField}
					{inputField}
					{labelPosition === 'right' && labelField}
				</div>
			) : (
				inputField
			)}

			{descriptionPosition === 'bottom' && descriptionField}
			{labelPosition === 'bottom' && labelField}
		</>
	);
}
