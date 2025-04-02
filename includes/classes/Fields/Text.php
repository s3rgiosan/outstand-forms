<?php

namespace Outstand\Forms\Fields;

use Outstand\Forms\Components\Label;
use Outstand\Forms\Components\Error;
use Outstand\Forms\Components\HelpText;
use Outstand\Forms\Components\Input;

class Text extends AbstractField {

	/**
	 * {@inheritDoc}
	 */
	public function get_type(): string {
		return 'text';
	}

	/**
	 * {@inheritDoc}
	 */
	public function get_validation_rules(): array {

		$validation_rules = [
			'required' => $this->attributes['required'] ?? false,
		];

		if ( ! empty( $this->attributes['minLength'] ) ) {
			$validation_rules['minLength'] = (int) $this->attributes['minLength'];
		}

		if ( ! empty( $this->attributes['maxLength'] ) ) {
			$validation_rules['maxLength'] = (int) $this->attributes['maxLength'];
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
		$this->components['field']     = new Input( $this, 'text' );
	}
}
