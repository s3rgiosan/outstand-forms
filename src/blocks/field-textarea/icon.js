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
			className="osf__icon"
			viewBox="0 0 24 24"
		>
			<Path stroke="none" d="M0 0h24v24H0z"></Path>
			<Path d="M4 6h16M4 18h5M4 12h13a3 3 0 0 1 0 6h-4l2-2m0 4-2-2"></Path>
		</SVG>
	);
};
