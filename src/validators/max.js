/**
 * Internal dependencies
 */
import validationRegistry from '../validation-registry';

function maxFn(value, maxValue = 0) {
	if (!value || isNaN(value)) {
		return true;
	}

	return parseFloat(value) <= parseFloat(maxValue);
}

validationRegistry.register('max', maxFn);

export default maxFn;
