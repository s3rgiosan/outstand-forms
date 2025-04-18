/**
 * Internal dependencies
 */
import validationRegistry from '../validation-registry';

function minFn(value, minValue = 0) {
	if (!value || isNaN(value)) {
		return true;
	}

	return parseFloat(value) >= parseFloat(minValue);
}

validationRegistry.register('min', minFn);

export default minFn;
