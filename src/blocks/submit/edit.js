/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const TEMPLATE = [
	[
		'core/buttons',
		{},
		[
			[
				'core/button',
				{
					text: __('Submit', 'outstand-forms'),
					tagName: 'button',
					type: 'submit',
				},
			],
		],
	],
];

export default function FieldSubmitEdit() {
	const blockProps = useBlockProps({
		className: 'outstand-forms__field',
	});
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		template: TEMPLATE,
		templateLock: 'all',
	});

	return <div {...innerBlocksProps} />;
}
