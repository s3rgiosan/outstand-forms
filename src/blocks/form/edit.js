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
	InspectorAdvancedControls,
} from '@wordpress/block-editor';
import { TextControl, SelectControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './editor.css';
import { useFormIds } from '../../hooks/useFormIds';

const TEMPLATE = [
	[
		'osf/form-fields',
		{},
		[
			[
				'osf/field-text',
				{
					label: __('Name', 'outstand-forms'),
					required: true,
				},
			],
		],
	],
	['osf/form-submit-button', {}],
];

export default function FormEdit({ clientId, attributes, setAttributes }) {
	const { formId, type, method, action } = attributes;

	const instanceId = useInstanceId(FormEdit);
	const { formIds, stableFormIds, hasFormBlocks } = useFormIds(clientId);

	/**
	 * @todo
	 *
	 * Only generate a `formId` when `type` is `'inline'`.
	 * If the form type is `'reference'`, the `formId` should come from the form post ID
	 * and must be globally unique — no duplicates allowed.
	 */

	useEffect(() => {
		if (!hasFormBlocks) {
			return;
		}

		const isUnset = !formId;
		const isDuplicate = formId && formIds.includes(formId);

		if ((isUnset || isDuplicate) && Number.isFinite(instanceId)) {
			const prefix = type === 'inline' ? 'inline-' : 'ref-';
			setAttributes({ formId: `${prefix}${instanceId}` });
		}
	}, [hasFormBlocks, formId, type, formIds, stableFormIds, instanceId, setAttributes]);

	const blockProps = useBlockProps({
		className: clsx('osf-form', `osf-form--${type}`, `osf-form--${formId}`),
	});

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		__experimentalCaptureToolbars: true,
		template: TEMPLATE,
		templateLock: 'insert',
	});

	return (
		<>
			<div {...innerBlocksProps} />
			<InspectorAdvancedControls>
				<SelectControl
					label={__('Method', 'outstand-forms')}
					options={[
						{ label: __('GET', 'outstand-forms'), value: 'get' },
						{ label: __('POST', 'outstand-forms'), value: 'post' },
					]}
					value={method}
					onChange={(newValue) => setAttributes({ method: newValue })}
					help={__('The HTTP method used to submit the form data.', 'outstand-forms')}
					__next40pxDefaultSize
					__nextHasNoMarginBottom
				/>
				<TextControl
					type="url"
					label={__('Form action', 'outstand-forms')}
					value={action}
					onChange={(newValue) => setAttributes({ action: newValue })}
					autoComplete="off"
					help={__('The URL to which the form data will be submitted.', 'outstand-forms')}
					__next40pxDefaultSize
					__nextHasNoMarginBottom
				/>
			</InspectorAdvancedControls>
		</>
	);
}
