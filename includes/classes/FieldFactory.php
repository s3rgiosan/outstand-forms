<?php

namespace Outstand\Forms;

use InvalidArgumentException;
use Outstand\Forms\Fields\Email;
use Outstand\Forms\Fields\FieldInterface;
use Outstand\Forms\Fields\Number;
use Outstand\Forms\Fields\Password;
use Outstand\Forms\Fields\Phone;
use Outstand\Forms\Fields\Text;
use Outstand\Forms\Fields\Textarea;
use Outstand\Forms\Fields\URL;

class FieldFactory {
	/**
	 * Field type mappings.
	 *
	 * @var array
	 */
	protected array $field_types = [
		'email'    => Email::class,
		'number'   => Number::class,
		'password' => Password::class,
		'tel'      => Phone::class,
		'text'     => Text::class,
		'textarea' => Textarea::class,
		'url'      => URL::class,
	];

	/**
	 * Register a new field type.
	 *
	 * @param string $type Field type.
	 * @param string $field_class Field class.
	 * @return void
	 * @throws InvalidArgumentException If the field class doesn't exist or doesn't implement FieldInterface.
	 */
	public function register( string $type, string $field_class ): void {

		if ( ! class_exists( $field_class ) ) {
			throw new InvalidArgumentException( esc_html( "Field class {$field_class} does not exist" ) );
		}

		if ( ! is_subclass_of( $field_class, FieldInterface::class ) ) {
			throw new InvalidArgumentException( 'Field class must implement FieldInterface' );
		}

		$this->field_types[ $type ] = $field_class;
	}

	/**
	 * Create a field instance.
	 *
	 * @param string $type Field type.
	 * @param array  $attributes Field attributes.
	 * @return FieldInterface
	 * @throws InvalidArgumentException If the field type is not supported.
	 */
	public function create( string $type, array $attributes ): FieldInterface {

		if ( ! isset( $this->field_types[ $type ] ) ) {
			throw new InvalidArgumentException( esc_html( "Unsupported field type: {$type}" ) );
		}

		$field_class = $this->field_types[ $type ];

		return new $field_class( $attributes );
	}

	/**
	 * Check if a field type is supported.
	 *
	 * @param string $type Field type.
	 * @return bool
	 */
	public function supports( string $type ): bool {
		return isset( $this->field_types[ $type ] );
	}
}
