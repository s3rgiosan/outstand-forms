/* eslint-disable @wordpress/no-unsafe-wp-apis */
/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import {
	__experimentalUseBorderProps as useBorderProps,
	__experimentalUseColorProps as useColorProps,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function FieldInput({ type = 'text', attributes, setAttributes }) {
	const { required, placeholder } = attributes;

	const borderProps = useBorderProps(attributes);
	const colorProps = useColorProps(attributes);

	const onPlaceholderChange = (value) => {
		setAttributes({ placeholder: value });
	};

	return (
		<input
			type={type}
			className={clsx(
				'osf__field-input',
				`osf__field-input--${type}`,
				colorProps.className,
				borderProps.className,
			)}
			aria-label={__('Optional placeholder text', 'outstand-forms')}
			placeholder={placeholder ? undefined : __('Optional placeholder…', 'outstand-forms')}
			value={placeholder}
			onChange={(event) => onPlaceholderChange(event.target.value)}
			aria-required={required}
			style={{
				...borderProps.style,
				...colorProps.style,
			}}
		/>
	);
}
