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

	let field = '';
	switch (type) {
		case 'text':
			field = (
				<FieldInput type="text" attributes={attributes} setAttributes={setAttributes} />
			);
			break;
	}

	return (
		<>
			{labelPosition !== 'right' && labelField}
			{!hasInlineLabel && descriptionPosition === 'top' && descriptionField}

			{hasInlineLabel ? (
				<div className="osf-field__wrapper">
					{descriptionPosition === 'top' && descriptionField}
					{field}
					{descriptionPosition === 'bottom' && descriptionField}
				</div>
			) : (
				field
			)}

			{!hasInlineLabel && descriptionPosition === 'bottom' && descriptionField}
			{labelPosition === 'right' && labelField}
		</>
	);
}
