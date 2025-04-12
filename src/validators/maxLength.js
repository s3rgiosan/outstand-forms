/**
 * Internal dependencies
 */
import validationRegistry from '../validation-registry';

function maxLengthFn(value, length = 0) {
	if (!value || length === 0) {
		return true;
	}

	return value.length <= length;
}

validationRegistry.register('maxLength', maxLengthFn);

export default maxLengthFn;
