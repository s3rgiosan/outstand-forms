/**
 * Internal dependencies
 */
import validationRegistry from '../validation-registry';

function maxLength(value, length = 0) {
	if (!value || length === 0) {
		return true;
	}

	return value.length <= length;
}

validationRegistry.register('maxLength', maxLength);

export default maxLength;
