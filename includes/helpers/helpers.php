<?php

namespace Outstand\Forms;

/**
 * Get the field ID for a form field.
 *
 * @param string $form_id  Form ID.
 * @param int    $field_id Field ID.
 * @return string
 */
function get_field_id( $form_id, $field_id ) {
	return sprintf( 'outstand-forms-%1$s-field-%2$s', $form_id, $field_id );
}

/**
 * Get the label ID for a form field.
 *
 * @param string $form_id  Form ID.
 * @param int    $field_id Field ID.
 * @return string
 */
function get_field_label_id( $form_id, $field_id ) {
	return sprintf( 'outstand-forms-%1$s-label-%2$s', $form_id, $field_id );
}

/**
 * Get the description ID for a form field.
 *
 * @param string $form_id  Form ID.
 * @param int    $field_id Field ID.
 * @return string
 */
function get_field_description_id( $form_id, $field_id ) {
	return sprintf( 'outstand-forms-%1$s-description-%2$s', $form_id, $field_id );
}

/**
 * Render a form field.
 *
 * @param array $slots       Array of slots.
 * @param bool  $should_echo Whether to echo the output.
 * @return string|void
 */
function render_form_field( $slots = [], $should_echo = true ) {

	$slots = wp_parse_args(
		$slots,
		[
			'label_top'          => '',
			'label_left'         => '',
			'label_right'        => '',
			'label_bottom'       => '',
			'description_top'    => '',
			'description_bottom' => '',
			'before_input'       => '',
			'input'              => '',
			'after_input'        => '',
		]
	);

	$has_inline_label = ! empty( $slots['label_left'] ) || ! empty( $slots['label_right'] );

	ob_start();

	// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
	?>

	<?php echo $slots['label_top']; ?>
	<?php echo $slots['description_top']; ?>

	<?php if ( $has_inline_label ) : ?>
	<div class="outstand-forms__field-wrapper">
		<?php echo $slots['label_left']; ?>
		<?php echo $slots['before_input']; ?>
		<?php echo $slots['input']; ?>
		<?php echo $slots['after_input']; ?>
		<?php echo $slots['label_right']; ?>
	</div>
	<?php else : ?>
		<?php echo $slots['before_input']; ?>
		<?php echo $slots['input']; ?>
		<?php echo $slots['after_input']; ?>
	<?php endif; ?>

	<?php echo $slots['description_bottom']; ?>
	<?php echo $slots['label_bottom']; ?>

	<?php

	$html = ob_get_clean();

	if ( ! $should_echo ) {
		return $html;
	}

	echo $html;
	// phpcs:enable WordPress.Security.EscapeOutput.OutputNotEscaped
}
