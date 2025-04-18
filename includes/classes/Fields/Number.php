<?php

namespace Outstand\Forms\Fields;

use Outstand\Forms\Components\Label;
use Outstand\Forms\Components\Error;
use Outstand\Forms\Components\HelpText;
use Outstand\Forms\Components\Input;

class Number extends AbstractField {

	/**
	 * {@inheritDoc}
	 */
	public function get_type(): string {
		return 'number';
	}

	/**
	 * {@inheritDoc}
	 */
	public function get_validation_rules(): array {
		$validation_rules = parent::get_validation_rules();

		if ( isset( $this->attributes['minLength'] ) ) {
			unset( $validation_rules['minLength'] );
		}

		if ( isset( $this->attributes['maxLength'] ) ) {
			unset( $validation_rules['maxLength'] );
		}

		if ( isset( $this->attributes['pattern'] ) ) {
			unset( $validation_rules['pattern'] );
		}

		if ( ! empty( $this->attributes['min'] ) ) {
			$validation_rules['min'] = (int) $this->attributes['min'];
		}

		if ( ! empty( $this->attributes['max'] ) ) {
			$validation_rules['max'] = (int) $this->attributes['max'];
		}

		return $validation_rules;
	}

	/**
	 * {@inheritDoc}
	 */
	public function initialize_components(): void {
		$this->components['label']     = new Label( $this );
		$this->components['help_text'] = new HelpText( $this );
		$this->components['error']     = new Error( $this );
		$this->components['field']     = new Input( $this, $this->get_type() );
	}
}
