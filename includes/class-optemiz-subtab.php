<?php

defined( 'ABSPATH' ) || exit;

/**
 * Class Optemiz_SubTab
 */
class Optemiz_SubTab extends Abstract_Optemiz_Tab {

    /**
     * Optemiz_SubTab constructor.
     *
     * @param string|null $key  Sub tab key.
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
	 * Returns Field's Default Value.
	 *
	 * @return array
	 */
	protected function defaults() {
        $defaults = array(
			'label' => __("Initialization"),
			'classes' => [],
		);

		return apply_filters("filter_opt_subtab_{$this->key}_default_values", $defaults, $this->key);
	}
}