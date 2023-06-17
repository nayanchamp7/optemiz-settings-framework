<?php

namespace OptDashboard;

defined( 'ABSPATH' ) || exit;

/**
 * Class OptemizDashboard
 */
class OptemizDashboard {

    /**
     * Settings values.
     *
     * @var array
     */
    public $settings;


    /**
     * OptemizDashboard constructor.
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