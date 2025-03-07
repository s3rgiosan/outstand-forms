<?php

namespace Outstand\Forms;

/**
 * Get the field ID for a form field.
 *
 * @param int $form_idx  Form ID.
 * @param int $field_idx Field ID.
 * @return string
 */
function get_field_id( $form_idx, $field_idx ) {
	return sprintf( 'outstand-forms-%1$s-field-%2$s', $form_idx, $field_idx );
}

/**
 * Get the label ID for a form field.
 *
 * @param int $form_idx  Form ID.
 * @param int $field_idx Field ID.
 * @return string
 */
function get_field_label_id( $form_idx, $field_idx ) {
	return sprintf( 'outstand-forms-%1$s-label-%2$s', $form_idx, $field_idx );
}

/**
 * Get the description ID for a form field.
 *
 * @param int $form_idx  Form ID.
 * @param int $field_idx Field ID.
 * @return string
 */
function get_field_description_id( $form_idx, $field_idx ) {
	return sprintf( 'outstand-forms-%1$s-description-%2$s', $form_idx, $field_idx );
}
