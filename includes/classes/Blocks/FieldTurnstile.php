<?php

namespace Outstand\Forms\Blocks;

class FieldTurnstile extends AbstractBlock {

	/**
	 * @inheritDoc
	 */
	public function get_name(): string {
		return 'field-turnstile';
	}

	/**
	 * @inheritDoc
	 */
	public function register(): void {
		add_action( 'wp_enqueue_scripts', [ $this, 'register_script' ], 10 );
	}

	/**
	 * Registers the script.
	 *
	 * @return void
	 */
	public function register_script(): void {

		wp_register_script(
			'cloudflare-turnstile',
			'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=osfTurnstileReady',
			[],
			null, // phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion
			[
				'strategy'  => 'defer',
				'in_footer' => true,
			]
		);
	}
}
