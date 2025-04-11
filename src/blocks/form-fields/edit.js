/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function FormContentEdit() {
	const blockProps = useBlockProps({
		className: 'osf-form__fields',
	});

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		__experimentalCaptureToolbars: true,
		templateLock: false,
		prioritizedInserterBlocks: ['osf/field-text', 'osf/field-textarea', 'osf/field-email'],
		defaultBlock: {
			name: 'osf/field-text',
		},
	});

	return <div {...innerBlocksProps} />;
}
