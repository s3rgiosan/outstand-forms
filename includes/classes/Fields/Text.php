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
	public function initialize_components(): void {
		$this->components['label']     = new Label( $this );
		$this->components['help_text'] = new HelpText( $this );
		$this->components['error']     = new Error( $this );
		$this->components['field']     = new Input( $this, 'text' );
	}
}
