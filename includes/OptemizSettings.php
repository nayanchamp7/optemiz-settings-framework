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

    // instance
	static function instance()
	{
		if (is_null(self::$_instance)) {
			self::$_instance = new self();
		}

		return self::$_instance;
	}

    /**
	 * Set settings.
	 *
	 * @return array
	 */
	public static function set($key, $value) {
        self::$settings['form']['items'][$key]['menu'] = $value;

		self::$settings = apply_filters("filter_opt_settings", self::$settings);

        return self::$_instance;
	}

    /**
	 * Get settings.
	 *
	 * @return array
	 */
	public static function get() {
        error_log('class opt settings');
        return self::$settings;
	}

    /**
	 * Set header settings.
	 *
	 * @return array
	 */
	public static function set_header($value) {
        self::$settings['header'] = $value;

		return apply_filters("filter_opt_header_settings", self::$settings['header']);
	}

    /**
	 * Set sidebar settings.
	 *
	 * @return array
	 */
	public static function set_sidebar($value) {
        self::$settings['sidebar'] = $value;

		return apply_filters("filter_opt_sidebar_settings", self::$settings['sidebar']);
	}
}