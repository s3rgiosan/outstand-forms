/**
 * WordPress dependencies
 */
import { SVG, Path, Rect } from '@wordpress/primitives';

export const icon = () => {
	return (
		<SVG
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.5"
			className="osf-icon osf-icon--form"
			viewBox="0 0 24 24"
		>
			<Path d="M4 14h6M4 2h10" />
			<Rect width="16" height="4" x="4" y="18" rx="1" />
			<Rect width="16" height="4" x="4" y="6" rx="1" />
		</SVG>
	);
};
