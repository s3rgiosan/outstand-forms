/**
 * WordPress dependencies
 */
import { store, getElement, getConfig, withScope } from '@wordpress/interactivity';

// Global callback for Turnstile script load.
window.osfTurnstileReady = () => {
	document.dispatchEvent(new CustomEvent('osf:turnstile:ready'));
};

store('osf/field-turnstile', {
	callbacks: {
		/**
		 * Initialize the Turnstile widget.
		 */
		init() {
			const { enabled, siteKey, mode, theme, size } = getConfig('osf/field-turnstile');
			if (!enabled) {
				return;
			}

			const { ref: container } = getElement();
			if (!container) {
				return;
			}

			// Find the parent form element.
			const form = container.closest('form');
			if (!form) {
				return;
			}

			const renderWidget = withScope(() => {
				// Check if widget is already rendered.
				if (container.dataset.turnstileRendered === 'true') {
					return;
				}

				const { turnstile } = window;

				turnstile.render(container, {
					sitekey: siteKey,
					appearance: mode,
					theme,
					size,
					callback: (token) => {
						const input = form.querySelector('input[name="cf-turnstile-response"]');
						if (input) {
							input.value = token;
						}
					},
					'expired-callback': () => {
						const input = form.querySelector('input[name="cf-turnstile-response"]');
						if (input) {
							input.value = '';
						}
					},
					'error-callback': () => {
						const input = form.querySelector('input[name="cf-turnstile-response"]');
						if (input) {
							input.value = '';
						}
					},
				});

				container.dataset.turnstileRendered = 'true';
			});

			// Check if Turnstile API is already loaded.
			if (typeof window.turnstile !== 'undefined') {
				renderWidget();
				return;
			}

			// Wait for Turnstile API to be ready.
			document.addEventListener('osf:turnstile:ready', renderWidget, {
				once: true,
			});
		},
	},
});
