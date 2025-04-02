<?php
/**
 * Form Content
 *
 * @var array     $attributes Block attributes.
 * @var string    $content    Block default content.
 * @var \WP_Block $block      Block instance.
 *
 * @package Outstand\Forms
 */

if ( empty( $block->context['osf/formId'] ) ) {
	return;
}

$form_id = $block->context['osf/formId'];

$wrapper_attributes = get_block_wrapper_attributes(
	[
		'class' => 'osf-form__fields',
	]
);

?>

<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php do_action( 'osf_before_fields', $form_id ); ?>
	<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	<?php do_action( 'osf_after_fields', $form_id ); ?>
</div>
