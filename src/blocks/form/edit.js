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
} from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

const TEMPLATE = [
	[
		'osf/text',
		{
			label: __('Name', 'outstand-forms'),
			required: true,
		},
	],
	['osf/submit'],
];

export default function FormEdit({ attributes, setAttributes }) {
	const { formId, formType } = attributes;

	const { __unstableMarkNextChangeAsNotPersistent } = useDispatch(blockEditorStore);
	const instanceId = useInstanceId(FormEdit);

	useEffect(() => {
		if (!Number.isFinite(formId)) {
			__unstableMarkNextChangeAsNotPersistent();
			const prefix = formType === 'inline' ? 'inline-' : 'ref-';
			setAttributes({ formId: `${prefix}${instanceId}` });
		}
	}, [formId, formType, instanceId, __unstableMarkNextChangeAsNotPersistent, setAttributes]);

	const blockProps = useBlockProps({
		className: clsx('osf__form', `osf__form--${formType}`, `osf__form--${formId}`),
	});

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		__experimentalCaptureToolbars: true,
		template: TEMPLATE,
	});

	return <div {...innerBlocksProps} />;
}
