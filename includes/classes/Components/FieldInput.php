<?php

namespace Outstand\Forms\Components;

class FieldInput extends AbstractComponent {

	/**
	 * {@inheritDoc}
	 */
	public function get_markup(): string {

		$field_name    = $this->attributes['name'];
		$input_type    = $attributes['type'] ?? 'text';
		$required      = $this->attributes['required'] ?? false;
		$default_value = $this->attributes['defaultValue'] ?? '';
		$placeholder   = $this->attributes['placeholder'] ?? '';
		$autocomplete  = $this->attributes['autocomplete'] ?? '';
		$min_length    = $this->attributes['minLength'] ?? 0;
		$max_length    = $this->attributes['maxLength'] ?? 0;
		$aria_label    = $this->attributes['ariaLabel'] ?? '';

		$field_id       = $this->get_field_id();
		$field_name     = ! empty( $field_name ) ? $field_name : 'field_' . $this->attributes['fieldId'];
		$label_id       = $this->get_label_id();
		$description_id = $this->get_description_id();

		return sprintf(
			'<input
				type="%13$s"
				id="%1$s"
				name="%2$s"
				value="%3$s"
				%4$s
				%5$s
				%6$s
				%7$s
				%8$s
				%9$s
				%10$s
				%11$s
				%12$s
				class="osf-field__input osf-field__input--%13$s"
				data-wp-class--is-focused="context.isFocused"
				data-wp-on-async--focus="actions.onFocus"
				data-wp-on-async--blur="actions.onBlur"
			/>',
			esc_attr( $field_id ),
			esc_attr( $field_name ),
			esc_attr( $default_value ),
			$placeholder ? sprintf( ' placeholder="%s"', esc_attr( $placeholder ) ) : '',
			$autocomplete ? sprintf( ' autocomplete="%s"', esc_attr( $autocomplete ) ) : '',
			$min_length ? sprintf( ' minlength="%s"', esc_attr( $min_length ) ) : '',
			$max_length ? sprintf( ' maxlength="%s"', esc_attr( $max_length ) ) : '',
			$required ? ' required' : '',
			$required ? ' aria-required="true"' : '',
			$aria_label ? sprintf( ' aria-label="%s"', esc_attr( $aria_label ) ) : '',
			$label_id ? sprintf( ' aria-labelledby="%s"', esc_attr( $label_id ) ) : '',
			$description_id ? sprintf( ' aria-describedby="%s"', esc_attr( $description_id ) ) : '',
			esc_attr( $input_type )
		);
	}
}
