/* eslint-disable import/no-extraneous-dependencies */
/**
 * External dependencies
 */
import { v4 as uuidv4 } from 'uuid';

/**
 * Get a unique block ID.
 *
 * @param {number} length The length of the block ID. Default is 9.
 * @return {string} A unique block ID.
 */
export function getBlockId(length = 9) {
	return uuidv4().replace(/-/g, '').slice(-length);
}

/**
 * Recursively finds all blocks of a specific type.
 *
 * @param {string} blockName The name of the block to find.
 * @param {Array}  blocks    List of blocks to search in.
 * @return {Array} List of blocks matching the specified name.
 */
export function findBlocks(blockName, blocks = []) {
	return blocks.flatMap((block) => [
		...(block.name === blockName ? [block] : []),
		...(block.innerBlocks?.length ? findBlocks(blockName, block.innerBlocks) : []),
	]);
}
