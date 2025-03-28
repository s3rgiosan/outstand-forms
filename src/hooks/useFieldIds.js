/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';

export function useFieldIds(clientId) {
	const { getBlockParentsByBlockName, getBlocks } = useSelect(blockEditorStore);

	const blockParents = useMemo(
		() => getBlockParentsByBlockName(clientId, 'osf/form-fields'),
		[clientId, getBlockParentsByBlockName],
	);

	const blocks = useMemo(() => {
		return blockParents.length > 0 ? getBlocks(blockParents[0]) : [];
	}, [blockParents, getBlocks]);

	const fieldIds = useMemo(() => {
		return blocks
			.map((block) => block?.attributes?.fieldId)
			.filter((id) => id !== null && Number.isFinite(id));
	}, [blocks]);

	const stableFieldIds = useMemo(() => fieldIds.slice().sort().join(','), [fieldIds]);

	return {
		fieldIds,
		stableFieldIds,
		hasFieldBlocks: blocks.length > 0,
	};
}
