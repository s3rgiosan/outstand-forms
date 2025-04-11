/**
 * WordPress dependencies
 */
import { SVG, Path, Circle } from '@wordpress/primitives';

export const Icon = () => {
	return (
		<SVG
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.5"
			viewBox="0 0 24 24"
			className="osf__icon"
		>
			<Circle cx="12" cy="12" r="4" />
			<Path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
		</SVG>
	);
};
