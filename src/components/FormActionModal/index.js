/* eslint-disable @wordpress/no-unsafe-wp-apis */
/**
 * WordPress dependencies
 */
import {
	BaseControl,
	Modal,
	SelectControl,
	SlotFillProvider,
	TextControl,
	__experimentalVStack as VStack,
	__experimentalHStack as HStack,
	Fill,
	Slot,
} from '@wordpress/components';
import { RichText, BlockControls } from '@wordpress/block-editor';
import { useEffect, useRef, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ACTION_LABELS } from '../FormActions';
import './style.css';

export default function FormActionModal({
	action,
	actionIndex,
	onClose,
	onUpdate,
	emailFieldOptions,
}) {
	const actionId = action?.id || '';
	const title = ACTION_LABELS[actionId] || actionId;
	const isUserEmail = actionId === 'user_notification';

	const [isMessageSelected, setIsMessageSelected] = useState(false);
	const messageWrapperRef = useRef();

	useEffect(() => {
		if (!isMessageSelected) {
			return;
		}

		const ownerDocument = messageWrapperRef.current?.ownerDocument;
		if (!ownerDocument) {
			return;
		}

		const handleMouseDown = (event) => {
			const wrapper = messageWrapperRef.current;

			// Check if click is inside the RichText wrapper
			if (wrapper?.contains(event.target)) {
				return;
			}

			// Check if click is inside the toolbar or any popover (link input, etc.)
			const toolbar = ownerDocument.querySelector(
				'.block-editor-rich-text__inline-format-toolbar',
			);

			if (toolbar?.contains(event.target)) {
				return;
			}

			// Check if click is inside any popover (link URL input, etc.)
			const popover = event.target.closest('.components-popover');

			if (popover) {
				return;
			}

			setIsMessageSelected(false);
		};

		ownerDocument.addEventListener('mousedown', handleMouseDown);
		return () => ownerDocument.removeEventListener('mousedown', handleMouseDown);
	}, [isMessageSelected]);

	return (
		<Modal
			title={title}
			onRequestClose={onClose}
			size="medium"
			className="osf-form__actions__modal"
		>
			<SlotFillProvider>
				<VStack spacing={4}>
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
					<BaseControl
						id={`osf-action-message-${actionIndex}`}
						label={__('Message', 'outstand-forms')}
						help={__(
							'Use {field_name} to insert field values. Use {all_fields} to insert all fields.',
							'outstand-forms',
						)}
					>
						<HStack
							ref={messageWrapperRef}
							onFocus={() => setIsMessageSelected(true)}
							expanded
						>
							<RichText
								tagName="div"
								className="osf-form__actions__action-message"
								value={action.message || ''}
								onChange={(value) => onUpdate(actionIndex, 'message', value)}
								placeholder={__(
									'Write your email message here\u2026',
									'outstand-forms',
								)}
								allowedFormats={['core/bold', 'core/italic', 'core/link']}
								isSelected={isMessageSelected}
								inlineToolbar
								__unstablePastePlainText
							/>
						</HStack>
						<Slot name="RichText.Toolbar" />
						<Fill name="RichText.Toolbar">
							<BlockControls />
						</Fill>
					</BaseControl>
				</VStack>
			</SlotFillProvider>
		</Modal>
	);
}
