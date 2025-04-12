/**
 * Internal dependencies
 */
import validationRegistry from '../validation-registry';

function email(value) {
	if (!value) {
		return true;
	}

	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regex.test(value);
}

validationRegistry.register('email', email);

export default email;
