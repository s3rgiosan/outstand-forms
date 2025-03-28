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
	store as blockEditorStore,
	InspectorAdvancedControls,
} from '@wordpress/block-editor';
import { TextControl, SelectControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

const TEMPLATE = [
	[
		'osf/form-content',
		{},
		[['osf/field-text', { label: __('Name', 'outstand-forms'), required: true }]],
	],
	['osf/form-submit'],
];

export default function FormEdit({ attributes, setAttributes }) {
	const { id, type, method, action } = attributes;

	const { __unstableMarkNextChangeAsNotPersistent } = useDispatch(blockEditorStore);
	const instanceId = useInstanceId(FormEdit);

	useEffect(() => {
		if (!Number.isFinite(id)) {
			__unstableMarkNextChangeAsNotPersistent();
			const prefix = type === 'inline' ? 'inline-' : 'ref-';
			setAttributes({ id: `${prefix}${instanceId}` });
		}
	}, [id, type, instanceId, __unstableMarkNextChangeAsNotPersistent, setAttributes]);

	const blockProps = useBlockProps({
		className: clsx('osf__form', `osf__form--${type}`, `osf__form--${id}`),
	});

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		__experimentalCaptureToolbars: true,
		template: TEMPLATE,
		templateLock: 'all',
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
