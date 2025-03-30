/**
 * Internal dependencies
 */
import Input from '../components/Input';
import Label from '../components/Label';
import Description from '../components/Description';

export default function Field({ type = 'text', attributes, setAttributes, context }) {
	const { labelPosition, descriptionPosition } = attributes;

	const hasInlineLabel = labelPosition === 'left' || labelPosition === 'right';

	const label = <Label attributes={attributes} setAttributes={setAttributes} context={context} />;
	const description = (
		<Description attributes={attributes} setAttributes={setAttributes} context={context} />
	);

	let field = '';
	switch (type) {
		case 'text':
			field = (
				<Input
					type="text"
					attributes={attributes}
					setAttributes={setAttributes}
					context={context}
				/>
			);
			break;
	}

	return (
		<>
			{labelPosition !== 'right' && label}
			{!hasInlineLabel && descriptionPosition === 'top' && description}

			{hasInlineLabel ? (
				<div className="osf-field__wrapper">
					{descriptionPosition === 'top' && description}
					{field}
					{descriptionPosition === 'bottom' && description}
				</div>
			) : (
				field
			)}

			{!hasInlineLabel && descriptionPosition === 'bottom' && description}
			{labelPosition === 'right' && label}
		</>
	);
}
