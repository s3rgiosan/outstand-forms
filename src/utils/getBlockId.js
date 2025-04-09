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
