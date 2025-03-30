import validationRegistry from '../validation-registry';

function required(value) {
	return value !== undefined && value !== null && value !== '';
}

validationRegistry.register('required', required);

export default required;
