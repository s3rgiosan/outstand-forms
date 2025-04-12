/**
 * Internal dependencies
 */
import validationRegistry from '../validation-registry';

function requiredFn(value) {
	return value !== undefined && value !== null && value !== '';
}

validationRegistry.register('required', requiredFn);

export default requiredFn;
