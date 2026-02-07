/* global osfSettings */
/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, Notice, ExternalLink } from '@wordpress/components';
import { createInterpolateElement } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './editor.css';
import TurnstilePreview from './preview';

export default function FieldTurnstileEdit({ attributes, setAttributes }) {
	const { theme, size } = attributes;
	const isTurnstileConfigured = osfSettings?.spam?.turnstile?.isConfigured ?? false;

	const blockProps = useBlockProps({
		className: clsx('osf-field', 'osf-field-turnstile'),
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Settings', 'outstand-forms')}>
					{!isTurnstileConfigured && (
						<Notice
							status="warning"
							isDismissible={false}
							className="osf-field-turnstile__notice"
						>
							{createInterpolateElement(
								__(
									'Turnstile is not configured. <link>Create a widget</link> in your Cloudflare dashboard and add the Site Key and Secret Key in Settings → Outstand Forms.',
									'outstand-forms',
								),
								{
									link: (
										<ExternalLink href="https://developers.cloudflare.com/turnstile/get-started/" />
									),
								},
							)}
						</Notice>
					)}
					<SelectControl
						label={__('Theme', 'outstand-forms')}
						value={theme}
						options={[
							{ label: __('Auto', 'outstand-forms'), value: 'auto' },
							{ label: __('Light', 'outstand-forms'), value: 'light' },
							{ label: __('Dark', 'outstand-forms'), value: 'dark' },
						]}
						onChange={(value) => setAttributes({ theme: value })}
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					<SelectControl
						label={__('Size', 'outstand-forms')}
						value={size}
						options={[
							{ label: __('Normal', 'outstand-forms'), value: 'normal' },
							{ label: __('Compact', 'outstand-forms'), value: 'compact' },
						]}
						onChange={(value) => setAttributes({ size: value })}
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<TurnstilePreview theme={theme} size={size} />
			</div>
		</>
	);
}
