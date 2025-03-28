<?php

namespace Outstand\Forms\Components;

abstract class AbstractComponent {

	/**
	 * Block instance.
	 *
	 * @var \WP_Block
	 */
	protected $block = null;

	/**
	 * Component attributes.
	 *
	 * @var array
	 */
	protected array $attributes = [];

	/**
	 * Form ID.
	 *
	 * @var string
	 */
	protected string $form_id;

	/**
	 * Get the markup for the component.
	 *
	 * @var string
	 */
	abstract public function get_markup(): string;

	/**
	 * Constructor.
	 *
	 * @param \WP_Block $block      Block instance.
	 * @param array     $attributes Component attributes.
	 */
	public function __construct( $block = null, array $attributes ) {
		$this->block      = $block;
		$this->attributes = $attributes;
		$this->form_id    = $block->context['osf/formId'];
	}

	/**
	 * Get the field ID.
	 *
	 * @return string
	 */
	public function get_field_id(): string {
		return sprintf( 'osf-%1$s-field-%2$s', $this->form_id, $this->attributes['fieldId'] );
	}

	/**
	 * Get the label ID.
	 *
	 * @return string
	 */
	public function get_label_id(): string {
		return sprintf( 'osf-%1$s-label-%2$s', $this->form_id, $this->attributes['fieldId'] );
	}

	/**
	 * Get the description ID.
	 *
	 * @return string
	 */
	public function get_description_id(): string {
		return sprintf( 'osf-%1$s-description-%2$s', $this->form_id, $this->attributes['fieldId'] );
	}
}
