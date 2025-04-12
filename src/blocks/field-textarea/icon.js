/**
 * WordPress dependencies
 */
import { SVG, Path } from '@wordpress/primitives';

export const icon = () => {
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
			<Path d="M3 6h18M3 12h15a3 3 0 1 1 0 6h-4" />
			<Path d="m16 16-2 2 2 2M3 18h7" />
		</SVG>
	);
};
