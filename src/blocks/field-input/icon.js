/**
 * WordPress dependencies
 */
import { SVG, Path, Circle } from '@wordpress/primitives';

export const text = () => {
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
			<Path d="M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7M9 7v10" />
		</SVG>
	);
};

export const email = () => {
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
