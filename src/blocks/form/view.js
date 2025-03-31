/**
 * WordPress dependencies
 */
import { store } from '@wordpress/interactivity';

store('osf/form', {
	actions: {
		onSubmit(ev) {
			ev.preventDefault();

			const form = ev.currentTarget;

			const formData = new FormData(form);
			const entries = Object.fromEntries(formData.entries());

			console.log('Form submitted:', entries);
		},
	},
});
