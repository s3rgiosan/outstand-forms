/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function FormContentEdit() {
	const blockProps = useBlockProps({
		className: 'osf__form-fields',
	});

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		__experimentalCaptureToolbars: true,
		templateLock: false,
		prioritizedInserterBlocks: ['osf/field-text'],
		defaultBlock: {
			name: 'osf/field-text',
		},
	});

	return <div {...innerBlocksProps} />;
}
