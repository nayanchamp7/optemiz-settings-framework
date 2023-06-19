<?php

namespace OptDashboard;

defined( 'ABSPATH' ) || exit;

/**
 * Class OptemizField
 */
class OptemizField {

    /**
     * OptemizField constructor.
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
	 * Set Sub Tab.
	 *
	 * @return array
	 */
	public static function set($tab_key, $sub_tab_key, $fields) {
        $opt_settings = OptemizSettings::instance();
        $opt_settings::$settings['form']['items'][$tab_key]['tabs'][$sub_tab_key]['fields'] = $fields;
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