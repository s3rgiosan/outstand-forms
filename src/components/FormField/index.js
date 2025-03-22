/**
 * FormField component.
 *
 * This component is used to render a form field.
 *
 * @param {Object} props       Component props.
 * @param {Object} props.slots Component slots.
 *
 * @return {Object} FormField component.
 */
export default function FormField({ slots = {} }) {
	const {
		labelTop,
		labelLeft,
		labelRight,
		labelBottom,
		descriptionTop,
		descriptionBottom,
		beforeInput,
		input,
		afterInput,
	} = slots;

	const hasInlineLabel = labelLeft || labelRight;

	return (
		<>
			{labelTop}
			{descriptionTop}

			{hasInlineLabel ? (
				<div className="osf__field-wrapper">
					{labelLeft}
					{beforeInput}
					{input}
					{afterInput}
					{labelRight}
				</div>
			) : (
				<>
					{beforeInput}
					{input}
					{afterInput}
				</>
			)}

			{descriptionBottom}
			{labelBottom}
		</>
	);
}
