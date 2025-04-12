/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';
import { icon } from './icon';

registerBlockType(metadata.name, {
	edit,
	save,
	icon,
});
