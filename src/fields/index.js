/**
 * Internal dependencies
 */
import Label from '../components/Label';
import HelpText from '../components/HelpText';
import Input from '../components/Input';
import Textarea from '../components/Textarea';

export default function Field({ type = 'text', attributes, setAttributes, context }) {
	const {
		'osf/labelPosition': defaultLabelPosition,
		'osf/helpTextPosition': defaultHelpTextPosition,
	} = context;

	const { labelPosition = defaultLabelPosition, helpTextPosition = defaultHelpTextPosition } =
		attributes;

	const hasInlineLabel = labelPosition === 'left' || labelPosition === 'right';

	const label = <Label attributes={attributes} setAttributes={setAttributes} context={context} />;
	const helpText = (
		<HelpText attributes={attributes} setAttributes={setAttributes} context={context} />
	);

	let field = '';
	switch (type) {
		case 'text':
		case 'email':
		case 'number':
		case 'password':
		case 'tel':
		case 'url':
			field = (
				<Input
					type={type}
					attributes={attributes}
					setAttributes={setAttributes}
					context={context}
				/>
			);
			break;
		case 'textarea':
			field = (
				<Textarea attributes={attributes} setAttributes={setAttributes} context={context} />
			);
			break;
	}

	return (
		<>
			{labelPosition !== 'right' && label}
			{!hasInlineLabel && helpTextPosition === 'top' && helpText}

			{hasInlineLabel ? (
				<div className="osf-field__wrapper">
					{helpTextPosition === 'top' && helpText}
					{field}
					{helpTextPosition === 'bottom' && helpText}
				</div>
			) : (
				field
			)}

			{!hasInlineLabel && helpTextPosition === 'bottom' && helpText}
			{labelPosition === 'right' && label}
		</>
	);
}
