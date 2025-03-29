<?php

namespace Outstand\Forms\Components;

class FieldDescription extends AbstractComponent {

	/**
	 * {@inheritDoc}
	 */
	public function get_markup(): string {

		if ( empty( $this->attributes['description'] ) ) {
			return '';
		}

		return sprintf(
			'<div id="%1$s" class="osf-field__description">%2$s</div>',
			esc_attr( $this->get_description_id() ),
			wp_kses_post( $this->attributes['description'] )
		);
	}
}
