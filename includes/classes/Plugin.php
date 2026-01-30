<?php

namespace Outstand\Forms;

use Outstand\Forms\REST\V1\Forms;

class Plugin {

	/**
	 * Plugin singleton instance.
	 *
	 * @var ?Plugin
	 */
	private static ?Plugin $instance = null;

	/**
	 * Retrieve the plugin instance.
	 *
	 * @return Plugin The plugin instance.
	 */
	public static function get_instance(): Plugin {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Setup the plugin.
	 *
	 * @return void
	 */
	public function setup(): void {

		$modules = [
			new Forms(),
		];

		foreach ( $modules as $module ) {
			$module->register();
		}

		add_action( 'init', [ $this, 'register_blocks' ] );
		add_filter( 'block_categories_all', [ $this, 'register_block_categories' ] );
	}

	/**
	 * Registers the blocks using the metadata loaded from the `block.json` files.
	 *
	 * @return void
	 */
	public function register_blocks(): void {

		$block_json_files = glob( OUTSTAND_FORMS_PATH . 'build/blocks/*/block.json' );

		foreach ( $block_json_files as $filename ) {

			$block_folder = dirname( $filename );
			$block_type   = register_block_type_from_metadata( $block_folder );

			if ( ! empty( $block_type->editor_script_handles ) ) {
				foreach ( $block_type->editor_script_handles as $handle ) {
					wp_set_script_translations(
						$handle,
						'outstand-forms',
						OUTSTAND_FORMS_PATH . 'languages'
					);
				}
			}
		}
	}

	/**
	 * Registers the block categories.
	 *
	 * @param  array $categories The block categories.
	 * @return array The updated block categories.
	 */
	public function register_block_categories( array $categories ): array {

		$categories[] = [
			'slug'  => 'osf',
			'title' => esc_html__( 'Outstand Forms', 'outstand-forms' ),
		];

		return $categories;
	}
}
