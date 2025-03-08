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

wp_interactivity_state(
	'outstand-forms/form',
	[]
);

$block_attributes = get_block_wrapper_attributes(
	[
		'method'              => 'post',
		'action'              => '',
		'class'               => 'outstand-forms__form',
		'data-wp-interactive' => 'outstand-forms/form',
	]
);

?>

<form <?php echo $block_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</form>
