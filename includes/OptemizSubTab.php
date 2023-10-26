<?php

namespace OptDashboard;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

/**
 * Class OptemizSubTab
 */
class OptemizSubTab extends AbstractOptemizTab {

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
	 * Set Sub Tab.
	 *
	 * @return array
	 */
	public static function set($tab_key, $sub_tab_key, $args) {

        //@TODO need to bring default arguments from default method
        $args = wp_parse_args($args, array(
			'label' => __("Initialization"),
			'classes' => [],
		));

        $opt_settings = OptemizSettings::instance();
        $opt_settings::$settings['form']['items'][$tab_key]['tabs'][$sub_tab_key]['menu'] = $args;

		//return apply_filters("filter_opt_tab_{$tab_key}_{$sub_tab_key}_args", $sub_tab_key, $tab_key, $args );
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
