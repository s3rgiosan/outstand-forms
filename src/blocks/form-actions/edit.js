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
					lock: {
						remove: true,
					},
				},
			],
		],
	],
];

export default function FormActionsEdit() {
	const blockProps = useBlockProps({
		className: 'osf-form__actions',
	});

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		template: TEMPLATE,
		templateLock: 'insert',
	});

	return <div {...innerBlocksProps} />;
}
