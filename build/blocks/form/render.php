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
$form_type   = $attributes['type'] ?? 'inline';
$form_method = $attributes['method'] ?? 'post';
$form_action = $attributes['action'] ?? '';

if ( empty( $form_action ) ) {
	$form_action = rest_url( 'osf/v1/forms/submit' );
}

$wrapper_classes = [
	'osf-form',
	"osf-form--{$form_type}",
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
		'validationMessages' => [
			'required'  => __( 'This value is required.', 'outstand-forms' ),
			'minLength' => __( 'This value is too short. It should have {{min}} characters or more.', 'outstand-forms' ),
			'maxLength' => __( 'This value is too long. It should have {{max}} characters or fewer.', 'outstand-forms' ),
		],
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
	<input type="hidden" name="form_type" value="<?php echo esc_attr( $form_type ); ?>">
	<input type="hidden" name="nonce" value="<?php echo esc_attr( wp_create_nonce( 'wp_rest' ) ); ?>">

	<?php do_action( 'osf_after_content', $form_id ); ?>
</form>
