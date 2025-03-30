<?php

namespace Outstand\Forms\Components;

class Label extends AbstractComponent {

	/**
	 * {@inheritDoc}
	 */
	public function get_markup( string $form_id ): string {
		$attributes = $this->get_attributes();

		if ( empty( $attributes['label'] ) ) {
			return '';
		}

		return sprintf(
			'<label
				id="%1$s"
				for="%2$s"
				class="osf-field__label"
			>%3$s</label>',
			esc_attr( $this->get_field_label_id( $form_id ) ),
			esc_attr( $this->get_field_id( $form_id ) ),
			wp_kses_post( $attributes['label'] )
		);
	}
}
