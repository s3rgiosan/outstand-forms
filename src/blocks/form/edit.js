/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const TEMPLATE = [
	[
		'outstand-forms/text',
		{
			label: __('Name', 'outstand-forms'),
			required: true,
		},
	],
	['outstand-forms/submit'],
];

export default function FormEdit() {
	const blockProps = useBlockProps({
		className: 'outstand-forms__form',
	});
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		__experimentalCaptureToolbars: true,
		template: TEMPLATE,
	});

	return <div {...innerBlocksProps} />;
}
