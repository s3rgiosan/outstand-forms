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
 * Determines whether a block is a duplicate by comparing its attributes
 * to other blocks of the same type within the same container.
 *
 * A block is considered a duplicate if another block with the same name
 * and identical attributes appears earlier in the same container.
 *
 * @param {string}  blockName       Name of the block (e.g., 'osf/field-input').
 * @param {string}  clientId        Client ID of the current block.
 * @param {Object}  attributes      Attributes to compare.
 * @param {string?} parentBlockName Optional parent block name to scope the check.
 *
 * @return {boolean} True if the block is a duplicate, false otherwise.
 */
export function useIsDuplicateBlock(blockName, clientId, attributes, parentBlockName) {
	return useSelect(
		(select) => {
			const { getBlockRootClientId, getBlockParentsByBlockName, getBlocks, getBlockIndex } =
				select(blockEditorStore);

			const rootClientId = parentBlockName
				? getBlockParentsByBlockName(clientId, parentBlockName)?.[0]
				: getBlockRootClientId(clientId);

			if (!rootClientId) {
				return false;
			}

			const allBlocks = getBlocks(rootClientId);
			const siblingBlocks = findBlocks((block) => block.name === blockName, allBlocks);
			const currentIndex = getBlockIndex(clientId, rootClientId);

			if (currentIndex === -1 || !siblingBlocks.length) {
				return false;
			}

			for (const block of siblingBlocks) {
				if (block.clientId === clientId) {
					continue;
				}

				const blockIndex = getBlockIndex(block.clientId, rootClientId);

				if (blockIndex < currentIndex && isEqual(block.attributes, attributes)) {
					return true;
				}
			}

			return false;
		},
		[blockName, clientId, attributes, parentBlockName],
	);
}
