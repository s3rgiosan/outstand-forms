/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import Edit from './edit';
import Save from './save';
import { Icon } from './icon';

registerBlockType(metadata.name, {
	edit: Edit,
	save: Save,
	icon: <Icon />,
});
