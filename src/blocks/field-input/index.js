/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import { text as icon } from './icon';
import variations from './variations';

registerBlockType(metadata.name, {
	edit,
	save: () => null,
	icon,
	variations,
});
