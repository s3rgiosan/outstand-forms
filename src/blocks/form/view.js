/**
 * WordPress dependencies
 */
import {
	store,
	getContext,
	getElement,
	getConfig,
	withSyncEvent,
	withScope,
} from '@wordpress/interactivity';

/**
 * Internal dependencies
 */
import { validate } from './../../validation';

const { state, actions } = store('osf/form', {
	state: {
		/**
		 * Get the aria-describedby attribute for the field.
		 *
		 * @return {string|undefined} The aria-describedby attribute.
		 */
		get fieldAriaDescribedByAttribute() {
			const { isValid, helpTextId, errorId } = getContext();

			if (!helpTextId && !errorId) {
				return undefined;
			}

			if (!errorId) {
				return helpTextId;
			}

			return isValid ? helpTextId : `${errorId} ${helpTextId}`;
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
				case 'min':
					message = message.replace('{{min}}', validationRules.min);
					break;
				case 'max':
					message = message.replace('{{max}}', validationRules.max);
					break;
			}

			return message;
		},
		/**
		 * Determine if the form is valid.
		 *
		 * @return {boolean} True if the form is valid, false otherwise.
		 */
		get isFormValid() {
			const { formFields } = getContext('osf/form');
			return Object.keys(formFields).length > 0 && Object.values(formFields).every(Boolean);
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
		/**
		 * Handle the field change event.
		 */
		handleFieldChange() {
			const context = getContext();
			const { ref } = getElement();
			context.value = ref.value;
		},
		/**
		 * Handle the field validate event.
		 */
		handleFieldValidate() {
			const context = getContext();
			const { fieldId, value, validationRules } = context;
			const { isValid, errors } = validate(value, validationRules);

			context.isValid = isValid;
			context.validationErrors = errors;

			const { ref } = getElement();

			const formContext = getContext('osf/form');
			if (!formContext.formFields) {
				formContext.formFields = {};
			}

			formContext.formFields[fieldId] = isValid;

			const event = new CustomEvent('osf-field-validated');
			ref.dispatchEvent(event);
		},
		/**
		 * Handle the form submit event.
		 */
		handleFormSubmit: withSyncEvent((ev) => {
			ev.preventDefault();

			const { ref: form } = getElement();

			const handleValidated = withScope(() => {
				if (state.isFormValid) {
					form.submit();
				}
			});

			form.addEventListener('osf-form-validated', handleValidated, { once: true });

			actions.validateForm().then(() => {
				const event = new CustomEvent('osf-form-validated');
				form.dispatchEvent(event);
			}).catch(() => {
				form.removeEventListener('osf-form-validated', handleValidated);
			});
		}),
		/**
		 * Submit the form.
		 */
		async submitForm() {
			const context = getContext('osf/form');
			const { ref: form } = getElement();
			const { submissionMessages = {} } = getConfig('osf/form');

			// Reset state.
			context.hasSubmissionError = false;
			context.submissionMessage = '';
			context.serverErrors = {};
			context.isSubmitting = true;

			try {
				const formData = new FormData(form);

				const response = await fetch(form.action, {
					method: 'POST',
					headers: {
						'X-WP-Nonce': formData.get('_wpnonce'),
					},
					body: formData,
					credentials: 'same-origin',
				});

				const data = await response.json();
			} catch {
			} finally {
			}
		},
		/**
		 * Validate the form.
		 *
		 * @return {Promise} A promise that resolves when the validation is complete.
		 */
		validateForm() {
			const { formFields } = getContext('osf/form');
			const { ref: form } = getElement();

			const fieldIds = Object.keys(formFields || {});
			const validations = fieldIds.map((fieldId) => {
				return new Promise((resolve) => {
					const fieldElement = form.querySelector(`[id="${fieldId}"]`);
					if (!fieldElement) {
						return resolve();
					}

					const validationHandler = () => {
						fieldElement.removeEventListener('osf-field-validated', validationHandler);
						resolve();
					};

					fieldElement.addEventListener('osf-field-validated', validationHandler, {
						once: true,
					});

					const event = new CustomEvent('osf-field-validate', {
						bubbles: true,
					});
					fieldElement.dispatchEvent(event);
				});
			});

			return Promise.all(validations);
		},
	},
	callbacks: {
		/**
		 * Register the field in the form context.
		 */
		registerField() {
			const context = getContext();
			const { fieldId, isValid } = context;

			const formContext = getContext('osf/form');
			if (!formContext.formFields) {
				formContext.formFields = {};
			}

			formContext.formFields[fieldId] = isValid;
		},
		/**
		 * Initialize the field mask.
		 *
		 * @see https://robinherbots.github.io/Inputmask/
		 */
		async initMask() {
			const { ref } = getElement();
			const { inputmask } = ref?.dataset ?? {};

			if (!inputmask) {
				return;
			}

			try {
				const { default: Inputmask } = await import('inputmask');
				const im = new Inputmask(inputmask);
				im.mask(ref);
			} catch {
			}
		},
	},
});
