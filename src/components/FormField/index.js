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
