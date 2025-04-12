<?php
/**
 * Form
 *
 * @var array     $attributes Block attributes.
 * @var string    $content    Block default content.
 * @var \WP_Block $block      Block instance.
 *
 * @package Outstand\Forms
 */

if ( empty( $attributes['formId'] ) ) {
	return;
}

$form_id     = $attributes['formId'];
$form_method = $attributes['method'] ?? 'post';
$form_action = $attributes['action'] ?? '';

if ( empty( $form_action ) ) {
	$form_action = rest_url( 'osf/v1/forms/submit' );
}

$wrapper_classes = [
	'osf-form',
	"osf-form--{$form_id}",
];
$wrapper_classes = array_filter( $wrapper_classes );
$wrapper_classes = array_map( 'sanitize_html_class', $wrapper_classes );

$wrapper_attributes = get_block_wrapper_attributes(
	[
		'id'                  => sprintf( 'osf-%s', $form_id ),
		'class'               => implode( ' ', $wrapper_classes ),
		'method'              => $form_method,
		'action'              => esc_url( $form_action ),
		'novalidate'          => '',
		'data-wp-interactive' => 'osf/form',
		'data-wp-on--submit'  => 'actions.handleFormSubmit',
	]
);

wp_interactivity_state( 'osf/form' );

$context = wp_interactivity_data_wp_context(
	[
		'formFields' => [],
	]
);

wp_interactivity_config(
	'osf/form',
	[
		/**
		 * Filters the validation messages.
		 *
		 * @param array  $messages An associative array of messages keyed by rule name.
		 *                         Example:
		 *                         [
		 *                             'required'  => 'This field is required.',
		 *                             'minLength' => 'Please enter at least {{min}} characters.',
		 *                             'maxLength' => 'Please enter no more than {{max}} characters.',
		 *                         ]
		 * @param string $form_id  The form ID.
		 * @return array
		 */
		'validationMessages' => apply_filters(
			'osf_validation_messages',
			[
				'required'  => __( 'This field is required.', 'outstand-forms' ),
				'pattern'   => __( 'The value does not match the expected format.', 'outstand-forms' ),
				'email'     => __( 'Please enter a valid email address.', 'outstand-forms' ),
				'url'       => __( 'Please enter a valid URL.', 'outstand-forms' ),
				'minLength' => __( 'Please enter at least {{min}} characters.', 'outstand-forms' ),
				'maxLength' => __( 'Please enter no more than {{max}} characters.', 'outstand-forms' ),
			],
			$form_id
		),
	]
);

?>

<form
	<?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	<?php echo $context; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
>
	<?php do_action( 'osf_before_content', $form_id ); ?>

	<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>

	<input type="hidden" name="form_id" value="<?php echo esc_attr( $form_id ); ?>">
	<input type="hidden" name="nonce" value="<?php echo esc_attr( wp_create_nonce( 'wp_rest' ) ); ?>">

	<?php do_action( 'osf_after_content', $form_id ); ?>
</form>
