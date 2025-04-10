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
 * Retrieves all `osf/field-*` blocks nested within a block identified by its client ID.
 *
 * This hook recursively traverses the inner blocks starting from the specified root
 * and returns only the blocks that represent form fields.
 *
 * @param {string} clientId The client ID of the block to start the search from.
 * @return {Array} Array of field blocks (`osf/field-*`) found within the subtree.
 */
export function useFieldBlocks(clientId) {
	return useSelect(
		(select) => {
			const { getBlocks } = select(blockEditorStore);
			const rootBlocks = getBlocks(clientId);
			return findBlocks((block) => block.name?.startsWith('osf/field-'), rootBlocks);
		},
		[clientId],
	);
}
