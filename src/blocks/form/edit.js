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
	useInnerBlocksProps,
	InspectorControls,
	InspectorAdvancedControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import {
	TextControl,
	SelectControl,
	PanelBody,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import { useEffect, useMemo, useRef } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './editor.css';
import { labelPositionOptions, helpTextPositionOptions } from '../../options';
import { useFieldBlocks } from '../../hooks/useFieldBlocks';
import { useIsDuplicateFormBlock } from '../../hooks/useIsDuplicateFormBlock';
import { getBlockId } from '../../utils';

const TEMPLATE = [
	['osf/form-fields', {}, [['osf/field-text', {}]]],
	['osf/form-submit-button', {}],
];

export default function FormEdit({ clientId, attributes, setAttributes }) {
	const { formId, type, method, action, labelPosition, helpTextPosition, requiredIndicator } =
		attributes;

	const newFormId = useMemo(() => getBlockId(), []);

	const isDuplicate = useIsDuplicateFormBlock(clientId, attributes);
	const fieldBlocks = useFieldBlocks(clientId);
	const { updateBlockAttributes } = useDispatch(blockEditorStore);
	const didResetFieldIds = useRef(false);

	/**
	 * @todo
	 *
	 * Only generate a `formId` when `type` is `'inline'`.
	 * If the form type is `'reference'`, the `formId` should come from the form post ID
	 * and must be globally unique — no duplicates allowed.
	 */
	useEffect(() => {
		if (!formId || isDuplicate) {
			const prefix = type === 'inline' ? 'inline-' : 'ref-';
			setAttributes({ formId: `${prefix}${newFormId}` });

			if (isDuplicate && !didResetFieldIds.current) {
				fieldBlocks.forEach((block) => {
					if (block.name?.startsWith('osf/field-')) {
						const newFieldId = getBlockId();
						updateBlockAttributes(block.clientId, { fieldId: newFieldId });
					}
				});
				didResetFieldIds.current = true;
			}
		}
	}, [
		type,
		formId,
		isDuplicate,
		setAttributes,
		newFormId,
		clientId,
		fieldBlocks,
		updateBlockAttributes,
	]);

	const blockProps = useBlockProps({
		className: clsx('osf-form', `osf-form--${type}`, `osf-form--${formId}`),
	});

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		__experimentalCaptureToolbars: true,
		template: TEMPLATE,
		templateLock: 'insert',
	});

	const onMethodChange = (value) => {
		setAttributes({ method: value });
	};

	const onActionChange = (value) => {
		setAttributes({ action: value });
	};

	const onLabelPositionChange = (value) => {
		setAttributes({ labelPosition: value });
	};

	const onHelpTextPositionChange = (value) => {
		setAttributes({ helpTextPosition: value });
	};

	const onRequiredIndicatorChange = (value) => {
		setAttributes({ requiredIndicator: value });
	};

	return (
		<>
			<div {...innerBlocksProps} />
			<InspectorControls>
				<PanelBody title={__('Settings', 'outstand-forms')}>
					<SelectControl
						label={__('Method', 'outstand-forms')}
						options={[
							{ label: __('GET', 'outstand-forms'), value: 'get' },
							{ label: __('POST', 'outstand-forms'), value: 'post' },
						]}
						value={method}
						onChange={onMethodChange}
						help={__('The HTTP method used to submit the form data.', 'outstand-forms')}
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					<TextControl
						type="url"
						label={__('Form action', 'outstand-forms')}
						value={action}
						onChange={onActionChange}
						autoComplete="off"
						help={__(
							'The URL where the form will be submitted. Leave blank to handle the submission automatically.',
							'outstand-forms',
						)}
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
				<TextControl
					label={__('Required Indicator', 'outstand-forms')}
					value={requiredIndicator}
					onChange={onRequiredIndicatorChange}
					autoComplete="off"
					help={__(
						'The character or string used to indicate that a field is required. Leave blank to disable.',
						'outstand-forms',
					)}
					__next40pxDefaultSize
					__nextHasNoMarginBottom
				/>
			</InspectorAdvancedControls>
		</>
	);
}
