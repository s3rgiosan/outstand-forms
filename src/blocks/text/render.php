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

use function Outstand\Forms\get_field_description_id;
use function Outstand\Forms\get_field_id;
use function Outstand\Forms\get_field_label_id;

$form_idx   = 1; // @todo
$field_idx  = 8; // @todo

$field_id   = get_field_id( $form_idx, $field_idx );
$field_name = $field_id; // @todo

$label                = $attributes['label'] ?? '';
$label_position       = $attributes['labelPosition'] ?? 'top';
$required             = $attributes['required'] ?? false;
$default_value        = $attributes['defaultValue'] ?? '';
$placeholder          = $attributes['placeholder'] ?? '';
$autocomplete         = $attributes['autocomplete'] ?? '';
$description          = $attributes['description'] ?? '';
$description_position = $attributes['descriptionPosition'] ?? 'bottom';
$min_length           = $attributes['minLength'] ?? 0;
$max_length           = $attributes['maxLength'] ?? 0;

$label_id    = '';
$label_field = '';

if ( ! empty( $label ) ) {
	$label_id    = get_field_label_id( $form_idx, $field_idx );
	$label_field = sprintf(
		'<label id="%1$s" for="%2$s" class="outstand-forms__field-label">%3$s</label>',
		esc_attr( $label_id ),
		esc_attr( $field_id ),
		wp_kses_post( $label )
	);
}

$description_id    = '';
$description_field = '';

if ( ! empty( $description ) ) {
	$description_id    = get_field_description_id( $form_idx, $field_idx );
	$description_field = sprintf(
		'<div id="%1$s" class="outstand-forms__field-description">%2$s</div>',
		esc_attr( $description_id ),
		wp_kses_post( $description )
	);
}

$input_field = sprintf(
	'<input
		type="text"
		id="%1$s"
		name="%2$s"
		value="%3$s"
		%4$s
		%5$s
		%6$s
		%7$s
		%8$s
		%9$s
		%10$s
		class="outstand-forms__field-input outstand-forms__field-input--text"
	/>',
	esc_attr( $field_id ),
	esc_attr( $field_name ),
	esc_attr( $default_value ),
	$placeholder ? sprintf( ' placeholder="%s"', esc_attr( $placeholder ) ) : '',
	$autocomplete ? sprintf( ' autocomplete="%s"', esc_attr( $autocomplete ) ) : '',
	$min_length ? sprintf( ' minlength="%s"', esc_attr( $min_length ) ) : '',
	$max_length ? sprintf( ' maxlength="%s"', esc_attr( $max_length ) ) : '',
	$required ? ' required' : '',
	$label_id ? sprintf( ' aria-labelledby="%s"', esc_attr( $label_id ) ) : '',
	$description_id ? sprintf( ' aria-describedby="%s"', esc_attr( $description_id ) ) : ''
);

$top_description_field    = $description_position === 'top' ? $description_field : '';
$bottom_description_field = $description_position === 'bottom' ? $description_field : '';

$wrapper_classes = [
	'outstand-forms__field',
	"outstand-forms__field--label-{$label_position}",
	"outstand-forms__field--description-{$description_position}",
	$required ? 'outstand-forms__field--required' : '',
	$label ? 'outstand-forms__field--has-label' : '',
	$description ? 'outstand-forms__field--has-description' : '',
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

	<?php if ( ( 'top' === $label_position || 'left' === $label_position ) && $label_field ) : ?>
		<?php echo $label_field;  // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	<?php endif; ?>

	<?php if ( 'left' !== $label_position && 'right' !== $label_position && $top_description_field ) : ?>
		<?php echo $top_description_field; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	<?php endif; ?>

	<?php if ( ( 'left' === $label_position || 'right' === $label_position ) ) : ?>
		<div class="outstand-forms__field-input-wrapper">
			<?php echo $top_description_field; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			<?php echo $input_field; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			<?php echo $bottom_description_field; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		</div>
	<?php else : ?>
		<?php echo $input_field; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	<?php endif; ?>

	<?php if ( 'left' !== $label_position && 'right' !== $label_position && $bottom_description_field ) : ?>
		<?php echo $bottom_description_field; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	<?php endif; ?>

	<?php if ( ( 'bottom' === $label_position || 'right' === $label_position ) && $label_field ) : ?>
		<?php echo $label_field;  // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	<?php endif; ?>

</div>
