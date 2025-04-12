<?php

namespace Outstand\Forms\Components;

use Outstand\Forms\Fields\FieldInterface;

class Input extends AbstractComponent {

	/**
	 * Input type.
	 *
	 * @var string
	 */
	protected string $input_type;

	/**
	 * Constructor.
	 *
	 * @param FieldInterface $field      Field instance.
	 * @param string         $input_type Input type (text, email, number, etc.).
	 */
	public function __construct( FieldInterface $field, string $input_type = 'text' ) {
		parent::__construct( $field );
		$this->input_type = $input_type;
	}

	/**
	 * {@inheritDoc}
	 */
	public function get_markup(): string {

		$field_id   = $this->get_field_id();
		$field_name = $this->get_field_name();
		$label_id   = $this->get_field_label_id();
		$attributes = $this->get_attributes();

		$required      = $attributes['required'] ?? false;
		$default_value = $attributes['defaultValue'] ?? '';
		$step          = $attributes['step'] ?? 1;
		$placeholder   = $attributes['placeholder'] ?? '';
		$autocomplete  = $attributes['autocomplete'] ?? '';
		$min_length    = $attributes['minLength'] ?? 0;
		$max_length    = $attributes['maxLength'] ?? 0;
		$pattern       = $attributes['pattern'] ?? '';
		$aria_label    = $attributes['ariaLabel'] ?? '';

		$conditional_attrs = [
			'{required}'        => $required ? 'required' : '',
			'{placeholder}'     => $placeholder ? sprintf( 'placeholder="%s"', esc_attr( $placeholder ) ) : '',
			'{step}'            => '',
			'{autocomplete}'    => $autocomplete ? sprintf( 'autocomplete="%s"', esc_attr( $autocomplete ) ) : '',
			'{min_length}'      => $min_length ? sprintf( 'minlength="%d"', esc_attr( $min_length ) ) : '',
			'{max_length}'      => $max_length ? sprintf( 'maxlength="%d"', esc_attr( $max_length ) ) : '',
			'{pattern}'         => $pattern ? sprintf( 'pattern="%s"', esc_attr( $pattern ) ) : '',
			'{aria_required}'   => $required ? 'aria-required="true"' : '',
			'{aria_label}'      => $aria_label ? sprintf( 'aria-label="%s"', esc_attr( $aria_label ) ) : '',
			'{aria_labelledby}' => $label_id ? sprintf( 'aria-labelledby="%s"', esc_attr( $label_id ) ) : '',
		];

		if ( 'number' === $this->input_type ) {
			$conditional_attrs['{step}'] = $step ? sprintf( 'step="%d"', esc_attr( $step ) ) : '';
		}

		$template = '<input
			type="{type}"
			id="{id}"
			name="{name}"
			value="{value}"
			{required}
			{placeholder}
			{step}
			{autocomplete}
			{min_length}
			{max_length}
			{pattern}
			{aria_required}
			{aria_label}
			{aria_labelledby}
			class="osf-field__input osf-field__input--{type}"
			data-wp-bind--value="context.value"
			data-wp-bind--aria-invalid="!context.isValid"
			data-wp-bind--aria-describedby="state.fieldAriaDescribedByAttribute"
			data-wp-on--focus="actions.handleFieldFocus"
			data-wp-on--blur="actions.handleFieldBlur"
			data-wp-on--change="actions.handleFieldChange"
			data-wp-init--register="callbacks.registerField"
			data-wp-on--osf-field-validate="actions.handleFieldValidate"
		/>';

		$replacements = array_merge(
			[
				'{type}'  => esc_attr( $this->input_type ),
				'{id}'    => esc_attr( $field_id ),
				'{name}'  => esc_attr( $field_name ),
				'{value}' => esc_attr( $default_value ),
			],
			$conditional_attrs
		);

		$markup = strtr( $template, $replacements );

		$markup = preg_replace( '/\s+/', ' ', $markup );
		$markup = trim( $markup );

		return $markup;
	}
}
