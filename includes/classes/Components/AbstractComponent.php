<?php

namespace Outstand\Forms\Components;

use Outstand\Forms\Components\ComponentInterface;
use Outstand\Forms\Fields\FieldInterface;

abstract class AbstractComponent implements ComponentInterface {

	/**
	 * Field instance.
	 *
	 * @var FieldInterface
	 */
	protected FieldInterface $field;

	/**
	 * Constructor.
	 *
	 * @param FieldInterface $field Field instance.
	 */
	public function __construct( FieldInterface $field ) {
		$this->field = $field;
	}

	/**
	 * Get the field attributes.
	 *
	 * @return array
	 */
	protected function get_attributes(): array {
		return $this->field->get_attributes();
	}

	/**
	 * Get the field type.
	 *
	 * @return string
	 */
	protected function get_field_type(): string {
		return $this->field->get_type();
	}

	/**
	 * Get the field ID.
	 *
	 * @param string $form_id Form ID.
	 * @return string
	 */
	protected function get_field_id( string $form_id ): string {
		return $this->field->get_field_id( $form_id );
	}

	/**
	 * Get the field label ID.
	 *
	 * @param string $form_id Form ID.
	 * @return string
	 */
	protected function get_field_label_id( string $form_id ): string {
		return $this->field->get_label_id( $form_id );
	}

	/**
	 * Get the field description ID.
	 *
	 * @param string $form_id Form ID.
	 * @return string
	 */
	protected function get_field_description_id( string $form_id ): string {
		return $this->field->get_description_id( $form_id );
	}

	/**
	 * Get the field error ID.
	 *
	 * @param string $form_id Form ID.
	 * @return string
	 */
	protected function get_field_error_id( string $form_id ): string {
		return $this->field->get_error_id( $form_id );
	}
}
