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

$attributes = array_merge(
	[
		'formId'            => $block->context['osf/formId'],
		'labelPosition'     => $block->context['osf/labelPosition'],
		'helpTextPosition'  => $block->context['osf/helpTextPosition'],
		'requiredIndicator' => $block->context['osf/requiredIndicator'],
	],
	$attributes
);

$factory = new FieldFactory();
$field   = $factory->create( 'email', $attributes );

$default_value      = $attributes['defaultValue'] ?? '';
$required           = $attributes['required'] ?? false;
$min_length         = $attributes['minLength'] ?? 0;
$max_length         = $attributes['maxLength'] ?? 0;
$label              = $attributes['label'] ?? '';
$label_position     = $attributes['labelPosition'];
$help_text          = $attributes['helpText'] ?? '';
$help_text_position = $attributes['helpTextPosition'];

$wrapper_classes = [
	'osf-field',
	'osf-field--email',
	"osf-field--label-{$label_position}",
	"osf-field--help-text-{$help_text_position}",
	$required ? 'osf-field--required' : '',
	$label ? 'osf-field--has-label' : '',
	$help_text ? 'osf-field--has-help-text' : '',
];
$wrapper_classes = array_filter( $wrapper_classes );
$wrapper_classes = array_map( 'sanitize_html_class', $wrapper_classes );

$wrapper_attributes = get_block_wrapper_attributes(
	[
		'class'                     => implode( ' ', $wrapper_classes ),
		'data-wp-class--is-focused' => 'context.isFocused',
		'data-wp-class--is-invalid' => '!context.isValid',
	]
);

$context = wp_interactivity_data_wp_context(
	[
		'value'           => $default_value,
		'isValid'         => true,
		'isFocused'       => false,
		'fieldId'         => $field->get_field_id(),
		'helpTextId'      => $field->get_help_text_id(),
		'errorId'         => $field->get_error_id(),
		'validationRules' => $field->get_validation_rules(),
	]
);

?>

<div
	<?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	<?php echo $context; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
>
	<?php $field->render(); ?>
</div>
