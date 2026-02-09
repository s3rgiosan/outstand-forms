/* eslint-disable @wordpress/no-unsafe-wp-apis */
/**
 * WordPress dependencies
 */
import { SelectControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import ActionMessageField from './ActionMessageField';

export default function EmailActionFields({
	action,
	actionIndex,
	onUpdate,
	isUserEmail,
	emailFieldOptions,
	isMessageSelected,
	setIsMessageSelected,
	messageWrapperRef,
}) {
	return (
		<>
			{isUserEmail ? (
				<SelectControl
					label={__('To Email', 'outstand-forms')}
					value={action.toFieldId || ''}
					options={emailFieldOptions}
					onChange={(value) => onUpdate(actionIndex, 'toFieldId', value)}
					help={__(
						'Select the email field that contains the recipient address.',
						'outstand-forms',
					)}
					__next40pxDefaultSize
					__nextHasNoMarginBottom
				/>
			) : (
				<TextControl
					label={__('To Email', 'outstand-forms')}
					value={action.to || '{admin_email}'}
					onChange={(value) => onUpdate(actionIndex, 'to', value)}
					placeholder={__('e.g. {admin_email}', 'outstand-forms')}
					__next40pxDefaultSize
					__nextHasNoMarginBottom
				/>
			)}
			<TextControl
				label={__('From Name', 'outstand-forms')}
				value={action.from?.name || ''}
				onChange={(value) =>
					onUpdate(actionIndex, 'from', {
						...action.from,
						name: value,
					})
				}
				__next40pxDefaultSize
				__nextHasNoMarginBottom
			/>
			<TextControl
				label={__('From Email', 'outstand-forms')}
				value={action.from?.email || ''}
				onChange={(value) =>
					onUpdate(actionIndex, 'from', {
						...action.from,
						email: value,
					})
				}
				__next40pxDefaultSize
				__nextHasNoMarginBottom
			/>
			<TextControl
				label={__('Reply-To', 'outstand-forms')}
				value={action.replyTo || ''}
				onChange={(value) => onUpdate(actionIndex, 'replyTo', value)}
				__next40pxDefaultSize
				__nextHasNoMarginBottom
			/>
			<TextControl
				label={__('BCC', 'outstand-forms')}
				value={action.bcc || ''}
				onChange={(value) => onUpdate(actionIndex, 'bcc', value)}
				help={__('Comma-separated list of email addresses.', 'outstand-forms')}
				__next40pxDefaultSize
				__nextHasNoMarginBottom
			/>
			<TextControl
				label={__('Subject', 'outstand-forms')}
				value={action.subject || ''}
				onChange={(value) => onUpdate(actionIndex, 'subject', value)}
				__next40pxDefaultSize
				__nextHasNoMarginBottom
			/>
			<ActionMessageField
				actionIndex={actionIndex}
				value={action.message || ''}
				onChange={(value) => onUpdate(actionIndex, 'message', value)}
				placeholder={__('Write your email message here\u2026', 'outstand-forms')}
				help={__(
					'Use {field_name} to insert field values. Use {all_fields} to insert all fields.',
					'outstand-forms',
				)}
				isMessageSelected={isMessageSelected}
				setIsMessageSelected={setIsMessageSelected}
				messageWrapperRef={messageWrapperRef}
			/>
		</>
	);
}
