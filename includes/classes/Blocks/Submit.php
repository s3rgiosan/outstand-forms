<?php

namespace Outstand\Forms\Blocks;

class Submit extends AbstractBlock {

	/**
	 * {@inheritDoc}
	 */
	public function get_name(): string {
		return 'osf/submit';
	}

	/**
	 * {@inheritDoc}
	 */
	public function register(): void {
		add_filter( "render_block_{$this->get_name()}", [ $this, 'render_block' ] );
	}

	/**
	 * Updates the block content.
	 *
	 * @param string $block_content The block content.
	 * @return string The updated block content.
	 */
	public function render_block( $block_content ): string {

		$processor = new \WP_HTML_Tag_Processor( $block_content );

		if ( $processor->next_tag( 'button' ) ) {
			$processor->set_attribute( 'data-wp-on--click', 'actions.validate' );
			$processor->set_attribute( 'data-wp-bind--disabled', '!state.isValid' );
		}

		$block_content = $processor->get_updated_html();

		return $block_content;
	}
}
