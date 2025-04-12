/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import { icon } from './icon';
import './style.css';

registerBlockType(metadata.name, {
	edit,
	save: () => null,
	icon,
});
