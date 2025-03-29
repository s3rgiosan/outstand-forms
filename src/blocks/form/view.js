/**
 * WordPress dependencies
 */
import { store } from '@wordpress/interactivity';

const { state } = store('osf/form', {
	state: {
		get isValid() {
			return true;
		},
	},
	actions: {
		validate() {
			return true;
		},
		onSubmit(ev) {
			ev.preventDefault();

			const form = ev.currentTarget;

			const formData = new FormData(form);
			const entries = Object.fromEntries(formData.entries());

			console.log('Form submitted:', state, entries);
		},
	},
});
