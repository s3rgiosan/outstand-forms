/* eslint-disable @wordpress/no-unsafe-wp-apis */
/**
 * WordPress dependencies
 */
import { BaseControl, __experimentalHStack as HStack, Fill, Slot } from '@wordpress/components';
import { RichText, BlockControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function ActionMessageField({
	actionIndex,
	value,
	onChange,
	placeholder,
	help,
	isMessageSelected,
	setIsMessageSelected,
	messageWrapperRef,
}) {
	return (
		<BaseControl
			id={`osf-action-message-${actionIndex}`}
			label={__('Message', 'outstand-forms')}
			help={help}
		>
			<HStack ref={messageWrapperRef} onFocus={() => setIsMessageSelected(true)} expanded>
				<RichText
					tagName="div"
					className="osf-action-modal__message"
					value={value}
					onChange={onChange}
					placeholder={placeholder}
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
	);
}
