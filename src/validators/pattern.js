/**
 * Internal dependencies
 */
import validationRegistry from '../validation-registry';

function patternFn(value, pattern = '') {
	if (!value || !pattern) {
		return true;
	}

	try {
		const regex = new RegExp(pattern);
		return regex.test(value);
	} catch {
		return true;
	}
}

validationRegistry.register('pattern', patternFn);

export default patternFn;
