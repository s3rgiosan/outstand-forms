<?php
/**
 * Field: Text
 *
 * @var array     $attributes Block attributes.
 * @var string    $content    Block default content.
 * @var \WP_Block $block      Block instance.
 *
 * @package Outstand\Forms
 */

use function Outstand\Forms\render_field;

if ( empty( $block->context['osf/formId'] ) || empty( $attributes['fieldId'] ) ) {
	return;
}

$form_id              = $block->context['osf/formId'];
$label                = $attributes['label'] ?? '';
$label_position       = $attributes['labelPosition'] ?? 'top';
$required             = $attributes['required'] ?? false;
$description          = $attributes['description'] ?? '';
$description_position = $attributes['descriptionPosition'] ?? 'bottom';

$wrapper_classes = [
	'osf-field',
	'osf-field--text',
	"osf-field--label-{$label_position}",
	"osf-field--description-{$description_position}",
	$required ? 'osf-field--required' : '',
	$label ? 'osf-field--has-label' : '',
	$description ? 'osf-field--has-description' : '',
];
$wrapper_classes = array_filter( $wrapper_classes );
$wrapper_classes = array_map( 'sanitize_html_class', $wrapper_classes );

$wrapper_attributes = get_block_wrapper_attributes(
	[
		'class' => implode( ' ', $wrapper_classes ),
	]
);

?>

<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php render_field( $block, $attributes ); ?>
</div>
