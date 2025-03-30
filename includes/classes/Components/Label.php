<?php

namespace Outstand\Forms\Components;

class Label extends AbstractComponent {

	/**
	 * {@inheritDoc}
	 */
	public function get_markup(): string {
		$attributes = $this->get_attributes();

		if ( empty( $attributes['label'] ) ) {
			return '';
		}

		$required_indicator = $attributes['requiredIndicator'] ?? '';
		if ( ! empty( $required_indicator ) ) {
			$required_indicator = sprintf(
				' <span class="osf-field__required-indicator">%s</span>',
				esc_html( $required_indicator )
			);
		}

		return sprintf(
			'<label
				id="%1$s"
				for="%2$s"
				class="osf-field__label"
			>%3$s%4$s</label>',
			esc_attr( $this->get_field_label_id() ),
			esc_attr( $this->get_field_id() ),
			wp_kses_post( $attributes['label'] ),
			wp_kses_post( $required_indicator )
		);
	}
}
