/* eslint-disable import/no-extraneous-dependencies */
/**
 * External dependencies
 */
import isEqual from 'lodash/isEqual';

/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { findBlocks } from '../utils';

/**
 * Checks if a form block is a duplicate of another form block in the same root container.
 *
 * A block is considered a duplicate if:
 * - It has the same attributes as another `osf/form` block.
 * - That other block appears earlier (based on index) in the same root block tree.
 *
 * @param {string} clientId   Client ID of the block to check.
 * @param {Object} attributes Attributes to compare.
 *
 * @return {boolean} True if the block is a duplicate, false otherwise.
 */
export function useIsDuplicateFormBlock(clientId, attributes) {
	return useSelect(
		(select) => {
			const { getBlockRootClientId, getBlocks, getBlockIndex } = select(blockEditorStore);

			const rootClientId = getBlockRootClientId(clientId);
			if (!rootClientId) {
				return false;
			}

			const rootBlocks = getBlocks(rootClientId);
			const formBlocks = findBlocks((block) => block.name === 'osf/form', rootBlocks);
			const currentIndex = getBlockIndex(clientId, rootClientId);

			if (currentIndex === -1 || !formBlocks.length) {
				return false;
			}

			for (const block of formBlocks) {
				if (block.clientId !== clientId && isEqual(block.attributes, attributes)) {
					const blockIndex = getBlockIndex(block.clientId, rootClientId);
					if (blockIndex < currentIndex) {
						return true;
					}
				}
			}

			return false;
		},
		[clientId, attributes],
	);
}
