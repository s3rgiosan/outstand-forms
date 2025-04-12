/**
 * Internal dependencies
 */
import validationRegistry from '../validation-registry';

function url(value) {
	if (!value) {
		return true;
	}

	const regex = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;
	return regex.test(value);
}

validationRegistry.register('url', url);

export default url;
