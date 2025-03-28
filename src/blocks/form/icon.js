/**
 * WordPress dependencies
 */
import { SVG, Path, Rect } from '@wordpress/primitives';

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
			className="osf__icon osf__icon--form"
		>
			<Rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
			<Path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M12 11h4M12 16h4M8 11h.01M8 16h.01" />
		</SVG>
	);
};
