<?php

namespace Outstand\Forms;

use Outstand\Forms\Components\FieldDescription;
use Outstand\Forms\Components\FieldInput;
use Outstand\Forms\Components\FieldLabel;

/**
 * Render a field.
 *
 * @param \WP_Block $block      Block instance.
 * @param array     $attributes Field attributes.
 * @return void
 */
function render_field( $block, $attributes ) {

	$field_type           = $attributes['type'] ?? 'text';
	$label_position       = $attributes['labelPosition'] ?? 'top';
	$description_position = $attributes['descriptionPosition'] ?? 'bottom';

	$has_inline_label = in_array( $label_position, [ 'left', 'right' ], true );

	$label_field       = ( new FieldLabel( $block, $attributes ) )->get_markup();
	$description_field = ( new FieldDescription( $block, $attributes ) )->get_markup();

	$field = '';
	switch ( $field_type ) {
		case 'text':
			$field = ( new FieldInput( $block, $attributes ) )->get_markup();
			break;
	}

	// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
	?>

	<?php if ( 'right' !== $label_position ) : ?>
		<?php echo $label_field; ?>
	<?php endif; ?>

	<?php if ( ! $has_inline_label && 'top' === $description_position ) : ?>
		<?php echo $description_field; ?>
	<?php endif; ?>

	<?php if ( $has_inline_label ) : ?>
		<div class="osf__field-wrapper">
			<?php if ( 'top' === $description_position ) : ?>
				<?php echo $description_field; ?>
			<?php endif; ?>
			<?php echo $field; ?>
			<?php if ( 'bottom' === $description_position ) : ?>
				<?php echo $description_field; ?>
			<?php endif; ?>
		</div>
	<?php else : ?>
		<?php echo $field; ?>
	<?php endif; ?>

	<?php if ( ! $has_inline_label && 'bottom' === $description_position ) : ?>
		<?php echo $description_field; ?>
	<?php endif; ?>

	<?php if ( 'right' === $label_position ) : ?>
		<?php echo $label_field; ?>
	<?php endif; ?>

	<?php
	// phpcs:enable WordPress.Security.EscapeOutput.OutputNotEscaped
}
