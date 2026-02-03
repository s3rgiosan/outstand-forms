/**
 * WordPress dependencies
 */
import { useEffect, useRef } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';

/**
 * Manages sequential numeric field IDs for all field blocks within a form.
 *
 * @param {Object}   attributes    The form block's attributes.
 * @param {Function} setAttributes The form block's setAttributes function.
 * @param {Array}    fieldBlocks   Array of field blocks within the form.
 */
export function useFieldId(attributes, setAttributes, fieldBlocks) {
	const { nextFieldId } = attributes;
	const { updateBlockAttributes } = useDispatch(blockEditorStore);
	const didAssign = useRef(false);

	useEffect(() => {
		if (!fieldBlocks.length) {
			return;
		}

		const validIds = new Set();
		const toAssign = [];

		for (const block of fieldBlocks) {
			const id = block.attributes?.fieldId;
			const numericId = typeof id === 'string' ? parseInt(id, 10) : id;

			if (
				id !== undefined &&
				id !== '' &&
				!Number.isNaN(numericId) &&
				Number.isInteger(numericId) &&
				numericId > 0 &&
				!validIds.has(numericId)
			) {
				validIds.add(numericId);
			} else {
				toAssign.push(block);
			}
		}

		if (!toAssign.length) {
			if (!didAssign.current) {
				didAssign.current = true;
			}
			return;
		}

		const maxExisting = validIds.size > 0 ? Math.max(...validIds) : 0;
		let counter = Math.max(nextFieldId || 1, maxExisting + 1);

		for (const block of toAssign) {
			updateBlockAttributes(block.clientId, {
				fieldId: counter,
				name: '',
			});
			counter++;
		}

		setAttributes({ nextFieldId: counter });
		didAssign.current = true;
	}, [fieldBlocks, nextFieldId, setAttributes, updateBlockAttributes]);
}
