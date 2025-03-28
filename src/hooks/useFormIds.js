/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';

export function useFormIds() {
	const { getBlocksByName, getBlocksByClientId } = useSelect(blockEditorStore);

	const blocks = useMemo(() => {
		const clientIds = getBlocksByName('osf/form');
		return getBlocksByClientId(clientIds) || [];
	}, [getBlocksByName, getBlocksByClientId]);

	const formIds = useMemo(() => {
		return blocks
			.map((block) => block?.attributes?.formId)
			.filter((id) => id !== null && id !== undefined && id !== '');
	}, [blocks]);

	const stableFormIds = useMemo(() => formIds.slice().sort().join(','), [formIds]);

	return {
		formIds,
		stableFormIds,
		hasFormBlocks: blocks.length > 0,
	};
}
