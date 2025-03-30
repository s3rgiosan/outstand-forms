<?php

namespace Outstand\Forms\Components;

class Description extends AbstractComponent {

	/**
	 * {@inheritDoc}
	 */
	public function get_markup( string $form_id ): string {
		$attributes = $this->get_attributes();

		if ( empty( $attributes['description'] ) ) {
			return '';
		}

		return sprintf(
			'<div
				id="%1$s"
				class="osf-field__description"
			>%2$s</div>',
			esc_attr( $this->get_field_description_id( $form_id ) ),
			wp_kses_post( $attributes['description'] )
		);
	}
}
