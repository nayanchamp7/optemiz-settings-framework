<?php

defined( 'ABSPATH' ) || exit;

/**
 * Class Abstract_Optemiz_Tab
 */
abstract class Abstract_Optemiz_Tab {

    /**
     * Sub tab key.
     *
     * @var string
     */
    public $key;

    /**
     * Arguments.
     *
     * @var array
     */
    public $args;

    /**
     * Abstract_Optemiz_Tab constructor.
     *
     * @param string|null $key  Sub tab key.
     * @param array|string|null $args  Arguments array.
     *
     */
    public function __construct( $key = null, $args = array() ) {
        $this->key      = $key;
        $this->args     = $args;
    }

    /**
     * Unused for now.
     */
    public function set_key() {}

    /**
     * Unused for now.
     */
    public function set_args() {}

    /**
     * Label
     */
    public function label() {}
}