/* eslint-disable @wordpress/no-unsafe-wp-apis */
/* eslint-disable import/no-extraneous-dependencies */
/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __experimentalVStack as VStack, __experimentalText as Text } from '@wordpress/components';
import { Icon } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { icon } from './icon';

export default function FormErrorsEdit() {
	const blockProps = useBlockProps();
	return (
		<VStack {...blockProps} alignment="center" spacing={1}>
			<Icon icon={icon()} width="24" height="24" />
			<Text size="small">
				{__('Error messages will be displayed here.', 'outstand-forms')}
			</Text>
		</VStack>
	);
}
