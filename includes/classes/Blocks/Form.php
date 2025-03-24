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
		add_action( 'osf_form_after_fields', [ $this, 'add_extra_fields' ], 90, 2 );
	}

	/**
	 * Add extra fields to the form.
	 *
	 * @param string $form_id Form ID.
	 * @return void
	 */
	public function add_extra_fields( $form_id ): void {
		?>
		<input type="hidden" name="form_id" value="<?php echo esc_attr( $form_id ); ?>">
		<input type="hidden" name="nonce" value="<?php echo esc_attr( wp_create_nonce( 'wp_rest' ) ); ?>">
		<?php
	}
}
