<?php

namespace Outstand\Forms\Blocks;

use Outstand\Forms\AbstractModule;

abstract class AbstractBlock extends AbstractModule {

	/**
	 * The block name.
	 *
	 * @var string
	 */
	abstract public function get_name(): string;
}
