const validationRegistry = {
	/**
	 * List of registered validators.
	 *
	 * @type {Object}
	 */
	validators: {},

	/**
	 * Register a new validator.
	 *
	 * @param {*} name     Validator name.
	 * @param {*} callback Validator callback.
	 */
	register(name, callback) {
		this.validators[name] = callback;
	},

	/**
	 * Get a validator by name.
	 *
	 * @param {string} name Validator name.
	 * @return {Function|null} Validator callback or null if not found.
	 */
	get(name) {
		return this.validators[name];
	},

	/**
	 * Validate a value against a set of rules.
	 *
	 * @param {*}      value The value to validate.
	 * @param {Object} rules The validation rules.
	 * @return {Object} Validation result.
	 */
	validate(value, rules = {}) {
		const errors = [];

		for (const [ruleName, ruleConfig] of Object.entries(rules)) {
			// Skip if rule is disabled.
			if (ruleConfig === false) {
				continue;
			}

			const validator = this.get(ruleName);

			// Skip if validator doesn't exist.
			if (!validator) {
				continue;
			}

			const params = ruleConfig === true ? {} : ruleConfig;
			const isValid = validator(value, params);

			if (!isValid) {
				errors.push(ruleName);
			}
		}

		return {
			isValid: errors.length === 0,
			errors,
		};
	},
};

export default validationRegistry;
