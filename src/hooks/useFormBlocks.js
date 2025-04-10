/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { useMemo } from '@wordpress/element';
import { store as blockEditorStore } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { findBlocks } from '../utils';

/**
 * Returns all `osf/form` blocks.
 *
 * @param {string} rootClientId Root client ID.
 * @return {Array} List of form blocks.
 */
export function useFormBlocks(rootClientId) {
	const rootBlocks = useSelect(
		(select) => select(blockEditorStore).getBlocks(rootClientId),
		[rootClientId],
	);
	return useMemo(() => findBlocks('osf/form', rootBlocks), [rootBlocks]);
}
