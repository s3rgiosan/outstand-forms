/**
 * WordPress dependencies
 */
import { store, getContext } from '@wordpress/interactivity';

const { state } = store('osf/form', {
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
	},
});
