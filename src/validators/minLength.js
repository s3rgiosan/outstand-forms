/**
 * Internal dependencies
 */
import validationRegistry from '../validation-registry';

function minLengthFn(value, length = 0) {
	if (!value || length === 0) {
		return true;
	}

	return value.length >= length;
}

validationRegistry.register('minLength', minLengthFn);

export default minLengthFn;
