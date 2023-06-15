<?php

defined( 'ABSPATH' ) || exit;

/**
 * Class Optemiz_Tab
 */
class Optemiz_Tab extends Abstract_Optemiz_Tab {

    /**
     * Optemiz_Tab constructor.
     *
     * @param string|null $key  Tab key.
     * @param array|string|null $args  Arguments array.
     *
     */
    public function __construct( $key = null, $args = array() ) {

        if( empty($key) ) {
            return;
        }

        $this->key      = is_string($key) ? strtolower($key) : $key;
        $this->args     = wp_parse_args($args, $this->defaults());

    }

    /**
	 * Set Tab.
	 *
	 * @return array
	 */
	protected function set() {
        $defaults = array(
			'label' => __("General"),
			'classes' => [],
		);

		return apply_filters("filter_opt_tab_{$this->key}_default_values", $defaults, $this->key);
	}

    /**
	 * Returns Field's Default Value.
	 *
	 * @return array
	 */
	protected function defaults() {
        $defaults = array(
			'label' => __("General"),
			'classes' => [],
		);

		return apply_filters("filter_opt_tab_{$this->key}_default_values", $defaults, $this->key);
	}
}