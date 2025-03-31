/**
 * WordPress dependencies
 */
import { store, getContext, getElement, getConfig } from '@wordpress/interactivity';

/**
 * Internal dependencies
 */
import validationRegistry from './../../validation-registry';
import './../../validators';

const { actions } = store('osf/field-text', {
	state: {
		get ariaDescribedBy() {
			const { isValid, descriptionFieldId, errorFieldId } = getContext();

			if (!descriptionFieldId && !errorFieldId) {
				return '';
			}

			if (!errorFieldId) {
				return descriptionFieldId;
			}

			return isValid ? descriptionFieldId : `${errorFieldId} ${descriptionFieldId}`;
		},
		get errorMessage() {
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
			actions.validate();
		},
		validate() {
			const context = getContext();
			const { value, validationRules } = context;
			const { isValid, errors } = validationRegistry.validate(value, validationRules);

			context.isValid = isValid;
			context.validationErrors = errors;
		},
	},
});
