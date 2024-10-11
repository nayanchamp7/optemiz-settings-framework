<?php

namespace Optemiz\Dashboard;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

/**
 * Class Header
 */
class Header {

    /**
     * Header constructor.
     *
     */
    public function __construct() {
    }

    /**
	 * Set header arguments.
	 *
	 * @return array
	 */
	public static function set($args) {

        //@TODO need to bring default arguments from default method
        $args = wp_parse_args($args, [
            'icon_url' => 'http://optemiz.com/',
            'heading' => __('Optemiz Settings Framework'),
            'url' => 'http://optemiz.com/',
            'classes' => [],
            'big_icon_url' => '',
            'version' => '1.0.0',
            'control_panel_label' => '',
            'buttons' => [
                'upgrade_to_pro' => [
                    'text' => __("Upgrade to pro"),
                    'url' => 'http://optemiz.com/',
                    'icon_url' => 'http://optemiz.com/',
                ],
            ]
        ]);

        $opt_settings = Settings::instance();
        $opt_settings::$settings['header'] = $args;

		return apply_filters("filter_opt_header_args", $args );
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
