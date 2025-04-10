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
	__experimentalBlockVariationPicker as BlockVariationPicker,
} from '@wordpress/block-editor';
import {
	TextControl,
	SelectControl,
	PanelBody,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import { useEffect, useMemo, useRef } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import { store as blocksStore, createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';
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

function FormEditContainer({ attributes, setAttributes, clientId }) {
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
					const newFieldId = getBlockId();
					updateBlockAttributes(block.clientId, { fieldId: newFieldId });
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

function FormVariationPicker({ clientId, name, setAttributes }) {
	const { blockType, defaultVariation, variations } = useSelect(
		(select) => {
			const { getBlockVariations, getBlockType, getDefaultBlockVariation } =
				select(blocksStore);

			return {
				blockType: getBlockType(name),
				defaultVariation: getDefaultBlockVariation(name, 'block'),
				variations: getBlockVariations(name, 'block'),
			};
		},
		[name],
	);

	const { replaceInnerBlocks } = useDispatch(blockEditorStore);

	const blockProps = useBlockProps();

	return (
		<div {...blockProps}>
			<BlockVariationPicker
				icon={blockType?.icon?.src}
				allowSkip={false}
				label={blockType?.title}
				variations={variations}
				instructions={__(
					'Choose a form template or start from scratch to create your own.',
					'outstand-forms',
				)}
				onSelect={(nextVariation = defaultVariation) => {
					if (nextVariation.attributes) {
						setAttributes(nextVariation.attributes);
					}
					if (nextVariation.innerBlocks) {
						replaceInnerBlocks(
							clientId,
							createBlocksFromInnerBlocksTemplate(nextVariation.innerBlocks),
							true,
						);
					}
				}}
			/>
		</div>
	);
}

export default function FormEdit(props) {
	const { clientId } = props;

	const hasInnerBlocks = useSelect(
		(select) => select(blockEditorStore).getBlocks(clientId).length > 0,
		[clientId],
	);

	const Component = hasInnerBlocks ? FormEditContainer : FormVariationPicker;

	return <Component {...props} />;
}
