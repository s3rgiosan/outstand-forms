/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const TEMPLATE = [
	[
		'core/paragraph',
		{
			content: __('Your form has been submitted successfully.', 'outstand-forms'),
			lock: {
				remove: true,
			},
		},
	],
];

export default function FormMessageEdit() {
	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		template: TEMPLATE,
		templateLock: 'all',
	});
	return <div {...innerBlocksProps} />;
}
