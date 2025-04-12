<?php

namespace Outstand\Forms\Fields;

use Outstand\Forms\Components\Label;
use Outstand\Forms\Components\Error;
use Outstand\Forms\Components\HelpText;
use Outstand\Forms\Components\Input;

class Email extends AbstractField {

	/**
	 * {@inheritDoc}
	 */
	public function get_type(): string {
		return 'email';
	}

	/**
	 * {@inheritDoc}
	 */
	public function get_validation_rules(): array {
		$validation_rules = parent::get_validation_rules();

		$validation_rules['email'] = $this->get_type();

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
