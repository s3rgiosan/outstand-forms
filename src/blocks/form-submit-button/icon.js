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
			<Path d="M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z" />
			<Path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
		</SVG>
	);
};
