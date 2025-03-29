<?php

namespace Outstand\Forms\Components;

class FieldLabel extends AbstractComponent {

	/**
	 * {@inheritDoc}
	 */
	public function get_markup(): string {

		if ( empty( $this->attributes['label'] ) ) {
			return '';
		}

		return sprintf(
			'<label id="%1$s" for="%2$s" class="osf-field__label">%3$s</label>',
			esc_attr( $this->get_label_id() ),
			esc_attr( $this->get_field_id() ),
			wp_kses_post( $this->attributes['label'] )
		);
	}
}
