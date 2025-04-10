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
import variations from './variations';
import { Icon } from './icon';
import './style.css';

registerBlockType(metadata.name, {
	edit,
	save,
	icon: <Icon />,
	variations,
});
