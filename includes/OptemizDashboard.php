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

    }

    /**
	 * Set settings general arguments.
	 *
     * @param array $args arguments.
     *
	 * @return void
	 */
	public static function setArgs($args) {
        OptemizSettings::set($args);
	}

    /**
	 * Create header.
	 *
     * @param array $args arguments.
     *
	 * @return void
	 */
	public static function createHeader($args) {
        OptemizHeader::set($args);
	}

    /**
	 * Create sidebar.
	 *
     * @param array $args arguments.
     *
	 * @return void
	 */
	public static function createSidebar($args) {
        OptemizSidebar::set($args);
	}

    /**
	 * Create tab settings.
	 *
     * @param string    $key tab key.
     * @param array     $args arguments.
     *
	 * @return void
	 */
	public static function createTab($key, $args) {
        OptemizTab::set($key, $args);
	}

    /**
	 * Create sub tab settings.
     *
     * @param string    $tab_key tab key.
     * @param string    $sub_tab_key sub tab key.
     * @param array     $args arguments.
     *
	 * @return void
	 */
	public static function createSubTab($tab_key, $sub_tab_key, $args) {
        OptemizSubTab::set($tab_key, $sub_tab_key, $args);
	}

    /**
	 * Create sub tab settings.
     *
     * @param string    $tab_key tab key.
     * @param string    $sub_tab_key sub tab key.
     * @param array     $args arguments.
     *
	 * @return void
	 */
        public static function createOptions($tab_key, $sub_tab_key, $fields) {
        OptemizField::set($tab_key, $sub_tab_key, $fields);
	}
}