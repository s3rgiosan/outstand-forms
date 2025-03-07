/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function FormEdit() {
	const blockProps = useBlockProps({
		className: 'outstand-forms__form',
	});

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		__experimentalCaptureToolbars: true,
		template: [['outstand-forms/text']],
	});

	return <div {...innerBlocksProps} />;
}
