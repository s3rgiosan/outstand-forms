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
	},
});
