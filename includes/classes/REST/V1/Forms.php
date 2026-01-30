<?php

namespace Outstand\Forms\REST\V1;

use Outstand\Forms\FormBlockParser;
use Outstand\Forms\Validation\Validator;
use WP_Error;
use WP_REST_Request;
use WP_REST_Response;

class Forms extends AbstractRoute {

	/**
	 * {@inheritDoc}
	 */
	protected string $rest_base = 'forms';

	/**
	 * {@inheritDoc}
	 */
	public function register_routes(): void {

		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/submit',
			[
				[
					'methods'             => 'POST',
					'callback'            => [ $this, 'submit_form' ],
					'permission_callback' => [ $this, 'submit_form_permissions_check' ],
					'args'                => $this->get_submit_args(),
				],
			]
		);
	}

	/**
	 * Get submission endpoint arguments.
	 *
	 * @return array
	 */
	protected function get_submit_args(): array {
		return [
			'form_id' => [
				'description'       => __( 'The form ID.', 'outstand-forms' ),
				'type'              => 'string',
				'required'          => true,
				'sanitize_callback' => 'sanitize_text_field',
			],
			'post_id' => [
				'description'       => __( 'The post ID containing the form.', 'outstand-forms' ),
				'type'              => 'integer',
				'required'          => true,
				'sanitize_callback' => 'absint',
			],
			'nonce'   => [
				'description'       => __( 'Security nonce.', 'outstand-forms' ),
				'type'              => 'string',
				'required'          => true,
				'sanitize_callback' => 'sanitize_text_field',
			],
		];
	}

	/**
	 * Check if the user can submit forms.
	 *
	 * @param WP_REST_Request $request The request.
	 * @return bool|WP_Error
	 */
	public function submit_form_permissions_check( WP_REST_Request $request ): bool|WP_Error {
		$nonce = $request->get_param( 'nonce' );

		if ( ! wp_verify_nonce( $nonce, 'wp_rest' ) ) {
			return new WP_Error(
				'rest_forbidden',
				__( 'Invalid security token.', 'outstand-forms' ),
				[ 'status' => 403 ]
			);
		}

		return true;
	}

	/**
	 * Handle form submission.
	 *
	 * @param WP_REST_Request $request The request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function submit_form( WP_REST_Request $request ): WP_REST_Response|WP_Error {
		$form_id = $request->get_param( 'form_id' );
		$post_id = $request->get_param( 'post_id' );
		$params  = $request->get_params();

		// Remove internal parameters.
		unset( $params['form_id'], $params['nonce'], $params['post_id'] );

		// Get field configurations by parsing block content.
		$field_configs = $this->get_form_field_configs( $form_id, $post_id );

		// Validate all fields.
		$validator         = new Validator();
		$validation_errors = [];

		foreach ( $field_configs as $field_name => $config ) {
			$value  = $params[ $field_name ] ?? null;
			$rules  = $config['validation_rules'] ?? [];
			$result = $validator->validate( $value, $rules );

			if ( ! $result['is_valid'] ) {
				$validation_errors[ $field_name ] = $result['errors'];
			}
		}

		if ( ! empty( $validation_errors ) ) {
			return new WP_Error(
				'validation_failed',
				__( 'Form validation failed.', 'outstand-forms' ),
				[
					'status' => 400,
					'errors' => $validation_errors,
				]
			);
		}

		// Sanitize field values.
		$sanitized_data = $this->sanitize_form_data( $params, $field_configs );

		/**
		 * Fires when a form is submitted and validated successfully.
		 *
		 * @param string $form_id        The form ID.
		 * @param array  $sanitized_data The sanitized form data.
		 * @param array  $field_configs  The field configurations.
		 */
		do_action( 'osf_form_submitted', $form_id, $sanitized_data, $field_configs );

		$response = [
			'success' => true,
			'message' => __( 'Form submitted successfully.', 'outstand-forms' ),
		];

		return new WP_REST_Response( $response, 200 );
	}

	/**
	 * Get field configurations for a form by parsing block content.
	 *
	 * @param string $form_id The form ID.
	 * @param int    $post_id The post ID containing the form.
	 * @return array
	 */
	protected function get_form_field_configs( string $form_id, int $post_id ): array {
		$parser  = new FormBlockParser();
		$configs = $parser->extract_field_configs( $post_id, $form_id );

		/**
		 * Filters the field configurations for a form.
		 *
		 * This filter allows plugins/themes to provide field configuration
		 * including validation rules for server-side validation.
		 *
		 * @param array  $configs The field configurations keyed by field name.
		 *                        Each config should include:
		 *                        - 'type' (string) The field type.
		 *                        - 'validation_rules' (array) The validation rules.
		 * @param string $form_id The form ID.
		 * @return array
		 */
		return apply_filters( 'osf_form_field_configs', $configs, $form_id );
	}

	/**
	 * Sanitize form data based on field configurations.
	 *
	 * @param array $data          The form data.
	 * @param array $field_configs The field configurations.
	 * @return array
	 */
	protected function sanitize_form_data( array $data, array $field_configs ): array {
		$sanitized = [];

		foreach ( $field_configs as $field_name => $config ) {
			if ( ! array_key_exists( $field_name, $data ) ) {
				continue;
			}

			$value = $data[ $field_name ];
			$type  = $config['type'] ?? 'text';

			$sanitized[ $field_name ] = match ( $type ) {
				'email'    => sanitize_email( $value ),
				'url'      => esc_url_raw( $value ),
				'number'   => is_numeric( $value ) ? (float) $value : 0,
				'textarea' => sanitize_textarea_field( $value ),
				default    => sanitize_text_field( $value ),
			};
		}

		return $sanitized;
	}
}
