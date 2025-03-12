/**
 * WordPress dependencies
 */
import { store } from '@wordpress/interactivity';

const { state } = store('outstand-forms/form', {
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
