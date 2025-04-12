/**
 * Internal dependencies
 */
import validationRegistry from '../validation-registry';

function pattern(value) {
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

validationRegistry.register('pattern', pattern);

export default pattern;
