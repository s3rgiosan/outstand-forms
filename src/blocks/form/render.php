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

wp_interactivity_state(
	'osf/form',
	[
		'formId'   => $form_id,
		'formType' => $form_type,
	]
);

$wrapper_classes = [
	'osf-form',
	"osf-form--{$form_type}",
	"osf-form--{$form_id}",
];
$wrapper_classes = array_filter( $wrapper_classes );
$wrapper_classes = array_map( 'sanitize_html_class', $wrapper_classes );

$wrapper_attributes = get_block_wrapper_attributes(
	[
		'class'               => implode( ' ', $wrapper_classes ),
		'method'              => $form_method,
		'action'              => esc_url( $form_action ),
		'data-wp-interactive' => 'osf/form',
	]
);

?>

<form <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php do_action( 'osf_before_content', $form_id ); ?>
	<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	<?php do_action( 'osf_after_content', $form_id ); ?>
</form>
