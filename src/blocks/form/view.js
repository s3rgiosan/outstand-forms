/**
 * WordPress dependencies
 */
import { store, getContext, getElement, getConfig, withSyncEvent } from '@wordpress/interactivity';

/**
 * Internal dependencies
 */
import validationRegistry from './../../validation-registry';
import './../../validators';

const { actions } = store('osf/form', {
	state: {
		/**
		 * Get the aria-describedby attribute for the field.
		 *
		 * @return {string|undefined} The aria-describedby attribute.
		 */
		get fieldAriaDescribedByAttribute() {
			const { isValid, helpTextFieldId, errorFieldId } = getContext();

			if (!helpTextFieldId && !errorFieldId) {
				return undefined;
			}

			if (!errorFieldId) {
				return helpTextFieldId;
			}

			return isValid ? helpTextFieldId : `${errorFieldId} ${helpTextFieldId}`;
		},
		/**
		 * Get the error message for the field.
		 *
		 * @return {string} The error message.
		 */
		get fieldErrorMessage() {
			const { isValid, validationErrors } = getContext();

			// Skip if there are no validation errors.
			if (isValid) {
				return '';
			}

			const { validationMessages = {} } = getConfig('osf/form');

			// Skip if there are no validation messages.
			if (!validationMessages) {
				return '';
			}

			const context = getContext();
			const { validationRules } = context;

			const error = validationErrors[0];

			// Skip if the error is not in the validation messages.
			if (validationMessages?.[error] === undefined) {
				return '';
			}

			let message = validationMessages[error];
			switch (error) {
				case 'minLength':
					message = message.replace('{{min}}', validationRules.minLength);
					break;
				case 'maxLength':
					message = message.replace('{{max}}', validationRules.maxLength);
					break;
			}

			return message;
		},
	},
	actions: {
		/**
		 * Handle the field focus event.
		 */
		handleFieldFocus() {
			const context = getContext();
			context.isFocused = true;
		},
		/**
		 * Handle the field blur event.
		 */
		handleFieldBlur() {
			const context = getContext();
			context.isFocused = false;
		},
		handleFieldChange() {
			const context = getContext();
			const { ref } = getElement();

			context.value = ref.value;
			actions.validateField();
		},
		validateField() {
			console.log('validateField', getElement().ref.getAttribute('name'), getContext());
			const context = getContext();
			const { value, validationRules } = context;
			const { isValid, errors } = validationRegistry.validate(value, validationRules);

			context.isValid = isValid;
			context.validationErrors = errors;
		},
		onFormSubmit: withSyncEvent((ev) => {
			ev.preventDefault();

			const form = ev.currentTarget;

			const formData = new FormData(form);
			const entries = Object.fromEntries(formData.entries());

			console.log('onFormSubmit', entries);
		}),
	},
});
