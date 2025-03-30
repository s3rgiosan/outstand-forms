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
import { useEffect } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import {
	labelPositionOptions,
	descriptionPositionOptions,
	autocompleteOptions,
} from '../../options';
import Field from '../../fields';
import { useFieldIds } from '../../hooks/useFieldIds';

export default function FieldTextEdit({ clientId, attributes, setAttributes }) {
	const {
		fieldId,
		name,
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

	const instanceId = useInstanceId(FieldTextEdit);
	const { fieldIds, stableFieldIds, hasFieldBlocks } = useFieldIds(clientId);

	useEffect(() => {
		if (!hasFieldBlocks) {
			return;
		}

		const isUnset = !Number.isFinite(fieldId);
		const isDuplicate = Number.isFinite(fieldId) && fieldIds.includes(fieldId);

		if ((isUnset || isDuplicate) && Number.isFinite(instanceId)) {
			setAttributes({ fieldId: instanceId });
		}
	}, [hasFieldBlocks, fieldId, fieldIds, stableFieldIds, instanceId, setAttributes]);

	const blockProps = useBlockProps({
		className: clsx(
			'osf-field',
			'osf-field--text',
			`osf-field--label-${labelPosition}`,
			`osf-field--description-${descriptionPosition}`,
			{
				'osf-field--required': required,
				'osf-field--has-label': !!label,
				'osf-field--has-description': !!description,
			},
		),
	});

	const onChangeName = (value) => {
		setAttributes({ name: value.trim() });
	};

	const onChangeLabelPosition = (value) => {
		setAttributes({ labelPosition: value });
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

	return (
		<>
			<div {...blockProps}>
				<Field type="text" attributes={attributes} setAttributes={setAttributes} />
			</div>
			<InspectorControls>
				<PanelBody title={__('Settings', 'outstand-forms')}>
					<ToggleControl
						label={__('Required', 'outstand-forms')}
						checked={required}
						onChange={onChangeRequired}
						__next40pxDefaultSize
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
				<TextControl
					label={__('Name', 'outstand-forms')}
					value={name || `field_${fieldId}`}
					onChange={onChangeName}
					autoComplete="off"
					__next40pxDefaultSize
					__nextHasNoMarginBottom
				/>
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
