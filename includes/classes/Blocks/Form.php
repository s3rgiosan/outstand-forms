<?php

namespace Outstand\Forms\Blocks;

class Form extends AbstractBlock {

	/**
	 * {@inheritDoc}
	 */
	public function get_name(): string {
		return 'osf/form';
	}

	/**
	 * {@inheritDoc}
	 */
	public function register(): void {
		add_filter( "render_block_{$this->get_name()}", [ $this, 'render_block' ], 10, 2 );
	}

	/**
	 * Updates the block content.
	 *
	 * @param string $block_content The block content.
	 * @param array  $block         The full block, including name and attributes.
	 * @return string The updated block content.
	 */
	public function render_block( $block_content, $block ): string {

		/**
		 * Filters the extra fields to be added to the form.
		 *
		 * @param string $extra_fields The extra fields.
		 * @param array  $block        The full block, including name and attributes.
		 */
		$extra_fields = apply_filters( 'outstand_forms_form_extra_fields', '', $block );

		$block_content = str_replace(
			'</form>',
			$extra_fields . '</form>',
			$block_content
		);

		return $block_content;
	}
}
