/**
 * WordPress dependencies
 */
import {
	store as blockEditorStore,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { createBlock } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { TEMPLATE, SUBMIT_BUTTON_BLOCK, SUBMIT_BUTTON_WRAPPER_BLOCK } from './constants';

/**
 * Check if a button is a submit button.
 *
 * @param {Object} block The block to check.
 * @return {boolean} Whether it's a submit button.
 */
function isSubmitButton(block) {
	return block.name === 'core/button' && block.attributes?.tagName === 'button';
}

/**
 * Find the buttons wrapper block and check for submit button.
 *
 * @param {Array} innerBlocks The inner blocks to check.
 * @return {Object} Object with buttonsBlock and hasButton properties.
 */
function getSubmitButtonState(innerBlocks) {
	const buttonsBlock = innerBlocks.find((block) => block.name === 'core/buttons');
	const hasButton = innerBlocks.some((block) => {
		if (isSubmitButton(block)) {
			return true;
		}
		if (block.name === 'core/buttons' && block.innerBlocks?.length > 0) {
			return block.innerBlocks.some((inner) => isSubmitButton(inner));
		}
		return false;
	});

	return { buttonsBlock, hasButton };
}

export default function FormSubmitEdit({ clientId }) {
	const blockProps = useBlockProps();

	const innerBlocks = useSelect(
		(select) => select(blockEditorStore).getBlocks(clientId),
		[clientId],
	);

	const { insertBlock } = useDispatch(blockEditorStore);

	useEffect(() => {
		const { buttonsBlock, hasButton } = getSubmitButtonState(innerBlocks);

		if (!hasButton) {
			if (buttonsBlock) {
				// Buttons wrapper exists but no button inside - add just the button
				const newButton = createBlock(
					SUBMIT_BUTTON_BLOCK.name,
					SUBMIT_BUTTON_BLOCK.attributes,
				);
				insertBlock(newButton, 0, buttonsBlock.clientId, false);
			} else {
				// No buttons wrapper at all - add the full wrapper with button
				const newButton = createBlock(
					SUBMIT_BUTTON_BLOCK.name,
					SUBMIT_BUTTON_BLOCK.attributes,
				);
				const newWrapper = createBlock(
					SUBMIT_BUTTON_WRAPPER_BLOCK.name,
					SUBMIT_BUTTON_WRAPPER_BLOCK.attributes,
					[newButton],
				);
				insertBlock(newWrapper, innerBlocks.length, clientId, false);
			}
		}
	}, [innerBlocks, clientId, insertBlock]);

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		__experimentalCaptureToolbars: true,
		templateLock: false,
		template: TEMPLATE,
	});

	return <div {...innerBlocksProps} />;
}
