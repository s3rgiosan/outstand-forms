/**
 * WordPress dependencies
 */
import { store, getContext, getElement } from '@wordpress/interactivity';

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
			const { isValid, validationErrors, errorMessages } = getContext();
			if (isValid) {
				return '';
			}

			const firstError = validationErrors[0];
			return errorMessages?.[firstError] || '';
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
