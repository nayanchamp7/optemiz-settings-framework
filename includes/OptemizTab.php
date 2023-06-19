<?php

namespace OptDashboard;

defined( 'ABSPATH' ) || exit;

/**
 * Class OptemizTab
 */
class OptemizTab extends AbstractOptemizTab {

    /**
     * OptemizTab constructor.
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
	public static function set($key, $value) {

		OptemizSettings::set($key, $value);

        $defaults = array(
			'label' => __("General"),
			'classes' => [],
		);

		return apply_filters("filter_opt_tab_{$key}_default_values", $defaults, $key);
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