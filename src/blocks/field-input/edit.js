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
import { useEffect, useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { labelPositionOptions, helpTextPositionOptions, autocompleteOptions } from '../../options';
import Field from '../../fields';
import { useIsDuplicateBlock } from '../../hooks/useIsDuplicateBlock';
import { getBlockId } from '../../utils';

export default function FieldInputEdit({ name, clientId, attributes, setAttributes, context }) {
	const {
		'osf/labelPosition': defaultLabelPosition,
		'osf/helpTextPosition': defaultHelpTextPosition,
	} = context;

	const {
		fieldId,
		type,
		name: fieldName,
		label,
		labelPosition = defaultLabelPosition,
		required,
		defaultValue,
		placeholder,
		autocomplete,
		ariaLabel,
		helpText,
		helpTextPosition = defaultHelpTextPosition,
		minLength,
		maxLength,
	} = attributes;

	const newFieldId = useMemo(() => getBlockId(), []);
	const isDuplicate = useIsDuplicateBlock(name, clientId, attributes, 'osf/form-fields');

	useEffect(() => {
		if (!fieldId || isDuplicate) {
			setAttributes({ fieldId: newFieldId, name: '' });
		}
	}, [fieldId, isDuplicate, setAttributes, newFieldId]);

	const blockProps = useBlockProps({
		className: clsx(
			'osf-field',
			`osf-field--input-${type}`,
			`osf-field--label-${labelPosition}`,
			`osf-field--help-text-${helpTextPosition}`,
			{
				'osf-field--required': required,
				'osf-field--has-label': !!label,
				'osf-field--has-help-text': !!helpText,
			},
		),
	});

	const onNameChange = (value) => {
		setAttributes({ name: value.trim() });
	};

	const onLabelPositionChange = (value) => {
		setAttributes({ labelPosition: value });
	};

	const onHelpTextPositionChange = (value) => {
		setAttributes({ helpTextPosition: value });
	};

	const onRequiredChange = (value) => {
		setAttributes({ required: value });
	};

	const onDefaultValueChange = (value) => {
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

	return (
		<>
			<div {...blockProps}>
				<Field
					type={type}
					attributes={attributes}
					setAttributes={setAttributes}
					context={context}
				/>
			</div>
			<InspectorControls>
				<PanelBody title={__('Settings', 'outstand-forms')}>
					<ToggleControl
						label={__('Required', 'outstand-forms')}
						checked={required}
						onChange={onRequiredChange}
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					<TextControl
						label={__('Default Value', 'outstand-forms')}
						value={defaultValue}
						onChange={onDefaultValueChange}
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
				<TextControl
					label={__('Name', 'outstand-forms')}
					value={fieldName || `field_${fieldId}`}
					onChange={onNameChange}
					autoComplete="off"
					__next40pxDefaultSize
					__nextHasNoMarginBottom
				/>
				<ToggleGroupControl
					label={__('Label Position', 'outstand-forms')}
					value={labelPosition}
					isBlock
					onChange={onLabelPositionChange}
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
					label={__('Help Text Position', 'outstand-forms')}
					value={helpTextPosition}
					isBlock
					onChange={onHelpTextPositionChange}
					help={__('Select the position of the help text.', 'outstand-forms')}
					__next40pxDefaultSize
					__nextHasNoMarginBottom
				>
					{/* eslint-disable-next-line no-shadow */}
					{helpTextPositionOptions.map(({ value, label }) => {
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
