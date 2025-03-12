<?php

namespace Outstand\Forms\Blocks;

use Outstand\Forms\AbstractModule;

class Submit extends AbstractModule {

	/**
	 * {@inheritDoc}
	 */
	public function register() {
		add_filter( 'render_block_outstand-forms/submit', [ $this, 'render_block_submit' ] );
	}

	/**
	 * Updates the block content.
	 *
	 * @param string $block_content The block content.
	 * @return string The updated block content.
	 */
	public function render_block_submit( $block_content ) {

		$processor = new \WP_HTML_Tag_Processor( $block_content );

		if ( $processor->next_tag( 'button' ) ) {
			$processor->set_attribute( 'data-wp-on--click', 'actions.validate' );
			$processor->set_attribute( 'data-wp-bind--disabled', '!state.isValid' );
		}

		$block_content = $processor->get_updated_html();

		return $block_content;
	}
}
