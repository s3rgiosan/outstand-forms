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

use Outstand\Forms\FieldFactory;

if ( empty( $block->context['osf/formId'] ) || empty( $attributes['fieldId'] ) ) {
	return;
}

$form_id              = $block->context['osf/formId'];
$default_value        = $attributes['defaultValue'] ?? '';
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
		'class'               => implode( ' ', $wrapper_classes ),
		'data-wp-interactive' => 'osf/field-text',
	]
);

$factory = new FieldFactory();
$field   = $factory->create( 'text', $attributes );

$context = wp_interactivity_data_wp_context(
	[
		'value'         => $default_value,
		'isValid'       => true,
		'isFocused'     => false,
		'descriptionId' => $field->get_description_id( $form_id ),
		'errorId'       => $field->get_error_id( $form_id ),
	]
);

?>

<div
	<?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	<?php echo $context; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
>
	<?php $field->render( $form_id ); ?>
</div>
