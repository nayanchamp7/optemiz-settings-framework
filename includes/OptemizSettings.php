<?php

namespace OptDashboard;

defined( 'ABSPATH' ) || exit;

/**
 * Class OptemizSettings
 */
class OptemizSettings {

    /**
     * Settings values.
     *
     * @var array
     */
    public static $settings;

    /**
     * Instance.
     *
     * @var mixed
     */
    protected static $_instance   = null;

    /**
     * OptemizSettings constructor.
     *
     */
    public function __construct() {
    }

	/**
     * OptemizSettings instance.
     *
     */
	public static function instance()
	{
		if (is_null(self::$_instance)) {
			self::$_instance = new self();
		}

		return self::$_instance;
	}

    /**
	 * Set meta key.
	 *
	 * @return void
	 */
	public static function setKey($key) {
        self::$settings['key'] = $key;

		//self::$settings = apply_filters("filter_opt_general_settings", self::$settings['args']);

        //return self::$_instance;
	}

    /**
	 * Set arguments.
	 *
	 * @return array
	 */
	public static function set($args) {
        self::$settings['args'] = $args;

		//self::$settings = apply_filters("filter_opt_general_settings", self::$settings['args']);

        //return self::$_instance;
	}

    /**
	 * Get settings.
	 *
	 * @return array
	 */
	public static function get() {

		if( !isset(self::$settings['args']) ) {
			self::$settings['args'] = [];
		}

		if( !isset(self::$settings['header']) ) {
			self::$settings['header'] = [];
		}

		if( !isset(self::$settings['sidebar']) ) {
			self::$settings['sidebar'] = [];
		}

		if( !isset(self::$settings['form']) ) {
			self::$settings['form'] = [];
		}

        return self::$settings;
	}
}