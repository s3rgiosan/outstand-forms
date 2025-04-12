/**
 * Internal dependencies
 */
import validationRegistry from '../validation-registry';

function emailFn(value) {
	if (!value) {
		return true;
	}

	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regex.test(value);
}

validationRegistry.register('email', emailFn);

export default emailFn;
