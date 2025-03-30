<?php

namespace Outstand\Forms\Components;

interface ComponentInterface {

	/**
	 * Get the markup for the component.
	 *
	 * @param string $form_id Form ID.
	 * @return string
	 */
	public function get_markup( string $form_id ): string;
}
