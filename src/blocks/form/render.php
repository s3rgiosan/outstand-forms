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

$form_id   = $attributes['formId'] ?? '';
$form_type = $attributes['formType'] ?? 'inline';

wp_interactivity_state(
	'osf/form',
	[
		'formId'   => $form_id,
		'formType' => $form_type,
	]
);

$wrapper_classes = [
	'osf__form',
	"osf__form--{$form_type}",
	"osf__form--{$form_id}",
];
$wrapper_classes = array_filter( $wrapper_classes );
$wrapper_classes = array_map( 'sanitize_html_class', $wrapper_classes );

$wrapper_attributes = get_block_wrapper_attributes(
	[
		'method'              => 'post',
		'action'              => '',
		'class'               => implode( ' ', $wrapper_classes ),
		'data-wp-interactive' => 'osf/form',
	]
);

?>

<form <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</form>
