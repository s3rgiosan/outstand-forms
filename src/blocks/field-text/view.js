/**
 * WordPress dependencies
 */
import { store, getContext, getElement } from '@wordpress/interactivity';

store('osf/form', {
	state: {
		get isFocused() {
			const { isFocused } = getContext();
			return isFocused;
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
		},
	},
});
