<?php

defined( 'ABSPATH' ) || exit;

/**
 * Class Optemiz_Dashboard
 */
class Optemiz_Dashboard {

    /**
     * Settings values.
     *
     * @var array
     */
    public $settings;


    /**
     * Optemiz_Dashboard constructor.
     *
     */
    public function __construct() {

        if( empty($this->settings) ) {
            $this->settings['header']   = [];
            $this->settings['sidebar']  = [];
            $this->settings['items']    = [];
        }

    }

    /**
	 * Set settings.
	 *
	 * @return array
	 */
	public function set() {

		return apply_filters("filter_opt_dashboard_settings", $this->settings);
	}
}