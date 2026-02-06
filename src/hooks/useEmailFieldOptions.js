/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Builds SelectControl options from email-type field blocks.
 *
 * @param {Array} fieldBlocks Array of field blocks within the form.
 * @return {Array} Options array with { label, value } for each email field.
 */
export function useEmailFieldOptions(fieldBlocks) {
	return useMemo(() => {
		const options = [
			{
				label: __('— Select field —', 'outstand-forms'),
				value: '',
			},
		];

		for (const block of fieldBlocks) {
			const { attributes } = block;
			const { type, fieldId, label, name } = attributes || {};

			if (type === 'email' && fieldId) {
				const fieldName = label || name;
				const fieldLabel = fieldName ? `${fieldName} (#${fieldId})` : `#${fieldId}`;
				options.push({
					label: fieldLabel,
					value: String(fieldId),
				});
			}
		}

		return options;
	}, [fieldBlocks]);
}
