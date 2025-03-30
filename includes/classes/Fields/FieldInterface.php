<?php

namespace Outstand\Forms\Fields;

use Outstand\Forms\Components\ComponentInterface;

interface FieldInterface {

	/**
	 * Get the field type.
	 *
	 * @return string
	 */
	public function get_type(): string;

	/**
	 * Get the field attributes.
	 *
	 * @return array
	 */
	public function get_attributes(): array;

	/**
	 * Initialize components for this field type.
	 *
	 * @return void
	 */
	public function initialize_components(): void;

	/**
	 * Get a specific component.
	 *
	 * @param string $name Component name.
	 * @return ComponentInterface|null
	 */
	public function get_component( string $name ): ?ComponentInterface;

	/**
	 * Get all components.
	 *
	 * @return array Array of ComponentInterface instances.
	 */
	public function get_components(): array;

	/**
	 * Get the field ID.
	 *
	 * @param string $form_id Form ID.
	 * @return string
	 */
	public function get_field_id( string $form_id ): string;

	/**
	 * Get the field label ID.
	 *
	 * @param string $form_id Form ID.
	 * @return string
	 */
	public function get_label_id( string $form_id ): string;

	/**
	 * Get the field description ID.
	 *
	 * @param string $form_id Form ID.
	 * @return string
	 */
	public function get_description_id( string $form_id ): string;

	/**
	 * Get the field error ID.
	 *
	 * @param string $form_id Form ID.
	 * @return string
	 */
	public function get_error_id( string $form_id ): string;

	/**
	 * Render the field.
	 *
	 * @param string $form_id Form ID.
	 * @return void
	 */
	public function render( string $form_id ): void;
}
