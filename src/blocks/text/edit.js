/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @wordpress/no-unsafe-wp-apis */
/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import {
	useBlockProps,
	InspectorControls,
	InspectorAdvancedControls,
	RichText,
	__experimentalUseBorderProps as useBorderProps,
	__experimentalUseColorProps as useColorProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	TextControl,
	ToggleControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	__experimentalNumberControl as NumberControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { DESCRIPTION_ALLOWED_FORMATS } from '../../constants';
import {
	labelPositionOptions,
	descriptionPositionOptions,
	autocompleteOptions,
} from '../../options';

export default function FieldTextEdit({ attributes, setAttributes }) {
	const {
		label,
		labelPosition,
		required,
		defaultValue,
		placeholder,
		autocomplete,
		ariaLabel,
		description,
		descriptionPosition,
		minLength,
		maxLength,
	} = attributes;

	const borderProps = useBorderProps(attributes);
	const colorProps = useColorProps(attributes);

	const onChangeLabel = (value) => {
		setAttributes({ label: value.trim() });
	};

	const onChangeLabelPosition = (value) => {
		setAttributes({ labelPosition: value });
	};

	const onDescriptionChange = (value) => {
		setAttributes({ description: value.trim() });
	};

	const onDescriptionPositionChange = (value) => {
		setAttributes({ descriptionPosition: value });
	};

	const onChangeRequired = (value) => {
		setAttributes({ required: value });
	};

	const onChangeDefaultValue = (value) => {
		setAttributes({ defaultValue: value });
	};

	const onPlaceholderChange = (value) => {
		setAttributes({ placeholder: value });
	};

	const onAriaLabelChange = (value) => {
		setAttributes({ ariaLabel: value });
	};

	const onAutocompleteChange = (value) => {
		setAttributes({ autocomplete: value });
	};

	const onMinLengthChange = (value) => {
		setAttributes({ minLength: value !== '' ? parseInt(value, 10) : undefined });
	};

	const onMaxLengthChange = (value) => {
		setAttributes({ maxLength: value !== '' ? parseInt(value, 10) : undefined });
	};

	const inputField = (
		<input
			type="text"
			className={clsx(
				'outstand-forms__field-input',
				'outstand-forms__field-input--text',
				colorProps.className,
				borderProps.className,
			)}
			aria-label={__('Optional placeholder text', 'outstand-forms')}
			placeholder={placeholder ? undefined : __('Optional placeholder…', 'outstand-forms')}
			value={placeholder}
			onChange={(event) => onPlaceholderChange(event.target.value)}
			aria-required={required}
			style={{
				...borderProps.style,
				...colorProps.style,
			}}
		/>
	);

	const labelField = (
		<RichText
			tagName="label"
			value={label}
			onChange={onChangeLabel}
			aria-label={label ? __('Label', 'outstand-forms') : __('Empty label', 'outstand-forms')}
			placeholder={__('Type a label', 'outstand-forms')}
			allowedFormats={[]}
			className="outstand-forms__field-label"
		/>
	);

	const descriptionField = (
		<RichText
			tagName="div"
			value={description}
			onChange={onDescriptionChange}
			aria-label={__('Optional description…', 'outstand-forms')}
			placeholder={__('Add a short description', 'outstand-forms')}
			allowedFormats={DESCRIPTION_ALLOWED_FORMATS}
			className="outstand-forms__field-description"
		/>
	);

	const topDescriptionField = descriptionPosition === 'top' && descriptionField;
	const bottomDescriptionField = descriptionPosition === 'bottom' && descriptionField;

	const blockProps = useBlockProps({
		className: clsx(
			'outstand-forms__field',
			`outstand-forms__field--label-${labelPosition}`,
			`outstand-forms__field--description-${descriptionPosition}`,
			{
				'outstand-forms__field--required': required,
				'outstand-forms__field--has-label': !!label,
				'outstand-forms__field--has-description': !!description,
			},
		),
	});

	return (
		<>
			<div {...blockProps}>
				{(labelPosition === 'top' || labelPosition === 'left') && labelField}
				{labelPosition !== 'left' && labelPosition !== 'right' && topDescriptionField}
				{labelPosition === 'left' || labelPosition === 'right' ? (
					<div className="outstand-forms__field-wrapper">
						{topDescriptionField}
						{inputField}
						{bottomDescriptionField}
					</div>
				) : (
					inputField
				)}
				{labelPosition !== 'left' && labelPosition !== 'right' && bottomDescriptionField}
				{(labelPosition === 'bottom' || labelPosition === 'right') && labelField}
			</div>
			<InspectorControls>
				<PanelBody title={__('Settings', 'outstand-forms')}>
					<ToggleControl
						label={__('Required', 'outstand-forms')}
						checked={required}
						onChange={onChangeRequired}
						__nextHasNoMarginBottom
					/>
					<TextControl
						label={__('Default Value', 'outstand-forms')}
						value={defaultValue}
						onChange={onChangeDefaultValue}
						autoComplete="off"
						help={__('The value that will be displayed by default.', 'outstand-forms')}
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					<TextControl
						label={__('Placeholder', 'outstand-forms')}
						value={placeholder}
						onChange={onPlaceholderChange}
						autoComplete="off"
						help={__(
							'The text that will be displayed as a placeholder.',
							'outstand-forms',
						)}
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					<SelectControl
						label={__('Autocomplete', 'outstand-forms')}
						value={autocomplete}
						options={autocompleteOptions}
						onChange={onAutocompleteChange}
						help={__('Define how browsers autofill this field.', 'outstand-forms')}
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					<TextControl
						label={__('ARIA Label', 'outstand-forms')}
						value={ariaLabel}
						onChange={onAriaLabelChange}
						autoComplete="off"
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
				</PanelBody>
			</InspectorControls>
			<InspectorAdvancedControls>
				<ToggleGroupControl
					label={__('Label Position', 'outstand-forms')}
					value={labelPosition}
					isBlock
					onChange={onChangeLabelPosition}
					help={__('Select the position of the label.', 'outstand-forms')}
					__next40pxDefaultSize
					__nextHasNoMarginBottom
				>
					{/* eslint-disable-next-line no-shadow */}
					{labelPositionOptions.map(({ value, label }) => {
						return <ToggleGroupControlOption key={value} value={value} label={label} />;
					})}
				</ToggleGroupControl>
				<ToggleGroupControl
					label={__('Description Position', 'outstand-forms')}
					value={descriptionPosition}
					isBlock
					onChange={onDescriptionPositionChange}
					help={__('Select the position of the help text.', 'outstand-forms')}
					__next40pxDefaultSize
					__nextHasNoMarginBottom
				>
					{/* eslint-disable-next-line no-shadow */}
					{descriptionPositionOptions.map(({ value, label }) => {
						return <ToggleGroupControlOption key={value} value={value} label={label} />;
					})}
				</ToggleGroupControl>
				<NumberControl
					label={__('Minimum Characters', 'outstand-forms')}
					value={minLength}
					min={0}
					onChange={onMinLengthChange}
					help={__('Minimum number of characters required.', 'outstand-forms')}
					__next40pxDefaultSize
					__nextHasNoMarginBottom
				/>
				<NumberControl
					type="number"
					label={__('Maximum Characters', 'outstand-forms')}
					value={maxLength}
					min={0}
					onChange={onMaxLengthChange}
					help={__('Maximum number of characters allowed.', 'outstand-forms')}
					__next40pxDefaultSize
					__nextHasNoMarginBottom
				/>
			</InspectorAdvancedControls>
		</>
	);
}
