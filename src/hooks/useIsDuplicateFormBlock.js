/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { useFormBlocks } from './useFormBlocks';

export function useIsDuplicateFormBlock(clientId, attributes) {
	const stableAttributes = useMemo(() => JSON.stringify(attributes), [attributes]);

	const rootClientId = useSelect(
		(select) => {
			const { getBlockRootClientId } = select(blockEditorStore);
			return getBlockRootClientId(clientId);
		},
		[clientId],
	);

	const formBlocks = useFormBlocks(rootClientId);

	return useSelect(
		(select) => {
			const { getBlockIndex } = select(blockEditorStore);

			const currentIndex = getBlockIndex(clientId, rootClientId);

			if (!rootClientId || currentIndex === -1 || !formBlocks.length) {
				return false;
			}

			for (const block of formBlocks) {
				if (
					block.clientId !== clientId &&
					JSON.stringify(block.attributes) === stableAttributes
				) {
					const blockIndex = getBlockIndex(block.clientId, rootClientId);
					if (blockIndex < currentIndex) {
						return true;
					}
				}
			}

			return false;
		},
		[clientId, stableAttributes, formBlocks, rootClientId],
	);
}
