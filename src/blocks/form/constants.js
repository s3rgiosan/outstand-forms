/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

export const TEMPLATE = [
	['osf/form-errors', {}],
	['osf/form-fields', {}, [['osf/field-input', { type: 'text' }]]],
	['osf/form-submit', {}],
	['osf/form-message', {}],
];

export const ADMIN_EMAIL_ACTION = {
	id: 'admin_notification',
	enabled: true,
	to: '{admin_email}',
	from: { email: '{admin_email}', name: '' },
	replyTo: '',
	bcc: '',
	subject: __('New submission from {form_title}', 'outstand-forms'),
	message: '{all_fields}',
};

export const USER_EMAIL_ACTION = {
	id: 'user_notification',
	enabled: false,
	toFieldId: '',
	from: { email: '{admin_email}', name: '' },
	replyTo: '',
	bcc: '',
	subject: __('We have received your inquiry', 'outstand-forms'),
	message: '',
};

export const DEFAULT_ACTIONS = [ADMIN_EMAIL_ACTION, USER_EMAIL_ACTION];
