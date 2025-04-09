/* eslint-disable import/no-extraneous-dependencies */
/**
 * External dependencies
 */
import isEqual from 'lodash/isEqual';

/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { useMemo } from '@wordpress/element';
import { store as blockEditorStore } from '@wordpress/block-editor';

/**
 * Determines whether a block is a duplicate by comparing its attributes
 * to other blocks of the same type within the same parent.
 *
 * A block is considered a duplicate if another block with the same name
 * and identical attributes appears earlier in the same container.
 *
 * @param {string}  blockName       The name of the block to check.
 * @param {string}  clientId        The client ID of the block.
 * @param {Object}  attributes      The block attributes to compare.
 * @param {string?} parentBlockName Optional parent block name to restrict the scope.
 *
 * @return {boolean} Whether the block is a duplicate.
 */
export function useIsDuplicateBlock(blockName, clientId, attributes, parentBlockName) {
	const stableAttributes = useMemo(() => JSON.stringify(attributes), [attributes]);

	const { siblings, currentIndex } = useSelect(
		(select) => {
			const { getBlockParentsByBlockName, getBlocks, getBlockIndex, getBlockRootClientId } =
				select(blockEditorStore);

			const rootClientId = parentBlockName
				? getBlockParentsByBlockName(clientId, parentBlockName)?.[0]
				: getBlockRootClientId(clientId);

			if (!rootClientId) {
				return { siblings: [], currentIndex: -1 };
			}

			return {
				siblings: getBlocks(rootClientId),
				currentIndex: getBlockIndex(clientId, rootClientId),
			};
		},
		[clientId, parentBlockName],
	);

	return useMemo(() => {
		if (!siblings?.length || currentIndex === -1) {
			return false;
		}

		for (let i = 0; i < currentIndex; i++) {
			const block = siblings[i];

			if (
				block.name === blockName &&
				block.clientId !== clientId &&
				JSON.stringify(block.attributes) === stableAttributes
			) {
				return true;
			}
		}

		return false;
	}, [siblings, currentIndex, stableAttributes, blockName, clientId]);
}
