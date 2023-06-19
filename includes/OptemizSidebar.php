<?php

namespace OptDashboard;

defined( 'ABSPATH' ) || exit;

/**
 * Class OptemizSidebar
 */
class OptemizSidebar {

    /**
     * OptemizSidebar constructor.
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
        $default_args = [
            'box_classes' => [],
            'items' => [
                [
                    'icon_url' => '',
                    'type' => 'review',
                    'label' => __('Show your love'),
                    'content' => __('We love to have you in the Optemiz family. We are making it more awesome everyday.'),
                    'buttons' => [
                        [
                            'button_label' => __('Rate Us'),
                            'button_url' => 'https://optemiz.com',
                            'button_classes' => ['opt-right-side-bar-span'],
                        ]
                    ],
                ],
                [
                    'icon_url' => '',
                    'type' => 'documentation',
                    'label' => __('Documentation'),
                    'content' => __('Get started spending some time with the documentation to get familiar with Optemiz. Build awesome websites for you or your clients with ease.'),
                    'buttons' => [
                        [
                            'button_label' => __('Let\'s Explore'),
                            'button_url' => 'https://optemiz.com',
                            'button_classes' => ['opt-right-side-bar-span'],
                        ]
                    ],
                ],
                [
                    'icon_url' => '',
                    'type' => 'support',
                    'label' => __('Need Help'),
                    'content' => __('Stuck with something? Get help from the community Optemiz Forum or Facebook Community. In case of emerhency, Initiate live chat at the Optemiz website.'),
                    'buttons' => [
                        [
                            'button_label' => __('Let\'s Explore'),
                            'button_url' => 'https://optemiz.com',
                            'button_classes' => ['opt-right-side-bar-span'],
                        ]
                    ],
                ],
                [
                    'icon_url' => '',
                    'type' => 'subscribe',
                    'label' => __('Subscribe to Newsletter'),
                    'content' => __('Subscribe to our mailing list for get any news of Our plugins and activities.'),
                    'buttons' => [
                        [
                            'button_label' => __('Subscribe'),
                            'button_url' => 'https://optemiz.com',
                            'button_classes' => ['opt-right-side-bar-span'],
                        ]
                    ],
                ],
            ]
        ];

        $args = wp_parse_args($args, $default_args);

        $opt_settings = OptemizSettings::instance();
        $opt_settings::$settings['sidebar'] = $args;

		return apply_filters("filter_opt_sidebar_args", $args );
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