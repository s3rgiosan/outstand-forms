/**
 * WordPress dependencies
 */
import { store, getContext, getElement } from '@wordpress/interactivity';

store('osf/field-text', {
	state: {
		get ariaDescribedBy() {
			const { isValid, descriptionId, errorId } = getContext();

			if (!descriptionId && !errorId) {
				return '';
			}

			if (!errorId) {
				return descriptionId;
			}

			return isValid ? descriptionId : `${errorId} ${descriptionId}`;
		},
	},
	actions: {
		onFocus() {
			const context = getContext();
			context.isFocused = true;
		},
		onBlur() {
			const context = getContext();
			context.isFocused = false;
		},
		onChange() {
			const context = getContext();
			const { ref } = getElement();
			context.value = ref.value;
			context.isValid = ref.value !== '';
		},
	},
});
