/**
 * Internal dependencies
 */
import validationRegistry from '../validation-registry';

function minLength(value, length = 0) {
	if (!value || length === 0) {
		return true;
	}

	return value.length >= length;
}

validationRegistry.register('minLength', minLength);

export default minLength;
