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
