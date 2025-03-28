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
			className="osf__icon osf__icon--form-fields"
		>
			<Rect width="7" height="7" x="3" y="3" rx="1" />
			<Rect width="7" height="7" x="3" y="14" rx="1" />
			<Path d="M14 4h7M14 9h7M14 15h7M14 20h7" />
		</SVG>
	);
};
