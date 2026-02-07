/* eslint-disable @wordpress/no-unsafe-wp-apis */
/* eslint-disable import/no-extraneous-dependencies */
/**
 * WordPress dependencies
 */
import { __experimentalHStack as HStack } from '@wordpress/components';
import { Icon } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { cfLogo, cfSuccessCheck } from './icon';

export default function TurnstilePreview({ theme, size }) {
	const previewTheme = theme === 'auto' ? 'light' : theme;
	const previewAlignItems = size === 'compact' ? 'flex-start' : 'center';
	const previewDirection = size === 'compact' ? 'column' : 'row';
	return (
		<HStack
			expanded={false}
			spacing={4}
			alignItems={previewAlignItems}
			style={{
				backgroundColor: previewTheme === 'dark' ? '#232323' : '#fafafa',
				border: `1px solid ${previewTheme === 'dark' ? '#797979' : '#ddd'}`,
				height: size === 'normal' ? '65px' : '140px',
				width: size === 'normal' ? '300px' : '150px',
				padding: size === 'normal' ? '16px' : '12px',
			}}
		>
			<HStack direction={previewDirection}>
				<HStack>
					<Icon
						icon={cfSuccessCheck(previewTheme)}
						width="50"
						height={size === 'normal' ? '50' : 'auto'}
					/>
					<HStack
						as="span"
						style={{
							fontSize: '14px',
							color: previewTheme === 'dark' ? '#fff' : '#1a1a1a',
						}}
					>
						{__('Success!', 'outstand-forms')}
					</HStack>
				</HStack>
				<HStack justify="flex-end" expanded={size === 'compact'}>
					<Icon
						icon={cfLogo(previewTheme)}
						width={size === 'normal' ? '100' : '70'}
						height={size === 'normal' ? 'auto' : '25'}
					/>
				</HStack>
			</HStack>
		</HStack>
	);
}
