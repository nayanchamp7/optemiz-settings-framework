<?php
/**
 * Plugin Name: Optemiz Dashboard
 * Plugin URI: https://optemiz.com
 * Description: This plugin shows faq question and answers for per product with comment and FAQ schema support.
 * Version: 1.0.0
 * Author: Optemiz
 * Author URI: https://optemiz.com/
 * Text Domain: optemiz-dashboard
 * Domain Path: /i18n/languages/
 *
 * WP Requirement & Test
 * Requires at least: 4.4
 * Tested up to: 6.0
 * Requires PHP: 5.6
 *
 * WC Requirement & Test
 * WC requires at least: 3.2
 * WC tested up to: 7.0
 *
 * @package Optemiz
 */

use OptDashboard\OptemizDashboard;
use OptDashboard\OptemizSettings;
use OptDashboard\OptemizTab;
use OptDashboard\OptemizSubTab;

defined( 'ABSPATH' ) || exit;

if ( ! defined( 'OPT_PLUGIN_URL' ) ) {
	define( 'OPT_PLUGIN_URL', plugins_url( '', __FILE__ ) );
}


if ( ! defined( 'OPT_PLUGIN_PATH' ) ) {
	define( 'OPT_PLUGIN_PATH', untrailingslashit(plugin_dir_path(__FILE__)) );
}

//autoload file
require_once OPT_PLUGIN_PATH . "/vendor/autoload.php";

add_action('plugins_loaded', 'opt_dashboard_init');
function opt_dashboard_init() {

	error_log("here");

	new OptDashboard\OptemizDashboard();

	add_action( 'admin_menu', 'opt_dashboard_menu_page' );
	add_action( 'admin_enqueue_scripts', 'opt_admin_enqueue_scripts' );
}

//include classes

function opt_dashboard_menu_page() {
	add_menu_page(
		__( 'Optemiz Dashboard', 'optemiz' ),
		'Optemiz Dashboard',
		'manage_options',
		'optemiz-dashboard',
		'opt_dashboard_menu_page_cb',
		'',
		6
	);
}

function opt_dashboard_menu_page_cb() {
    include 'templates/opt-dashboard.php';
}

function opt_get_dashboard_data() {
	$data = [];

	OptemizDashboard::setArgs([
		"panel_title" => __("Control Panel"),
		"color" => "#680DB4"
	]);

	$header_args = [
		'icon_url' => 'http://optemiz.com/',
		'heading' => __('Orderly'),
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
	];

	OptemizDashboard::createHeader([]);

	$sidebar_args = [
		'box_classes' => [],
		'items' => [
			[
				'icon_url' => '',
				'type' => 'review',
				'label' => __('Show your love'),
				'content' => __('We love to have you in the SchedulePress family. We are making it more awesome everyday.'),
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

	OptemizDashboard::createSidebar([]);

	OptemizDashboard::createTab('order_tips', [
		"label" => __("Tips"),
		"classes" => [],
	]);

	OptemizDashboard::createSubTab('order_tips', 'init', [
		"label" => __("Initialization"),
		"classes" => [],
	]);

	OptemizDashboard::createOptions('order_tips', 'init', [
		[
			'name' => 'order_tips_first_name',
			'type' => 'text',
			'default_value' => 'First Name',
			'placeholder' => '',
			'disabled' => false,
			'required' => false,
			'min' => '',
			'max' => '',
			'step' => '',
			'label' => 'Enable first name for roles',
			'description' => 'Your first name should be here.',
			'css' => '',
			'id' => '',
			'classes' => [],
			'options' => [],
		],
		[
			'name' => 'order_tips_last_name',
			'type' => 'text',
			'default_value' => 'Last Name',
			'placeholder' => 'Your second name should be here.',
			'disabled' => false,
			'required' => false,
			'min' => '',
			'max' => '',
			'step' => '',
			'label' => 'Enable last name for roles',
			'description' => 'Your second name should be here.',
			'css' => '',
			'id' => '',
			'classes' => [],
			'options' => [],
		],
		[
			'name' => 'order_tips_donation',
			'type' => 'number',
			'default_value' => 50,
			'placeholder' => 'Your donation should be here.',
			'disabled' => false,
			'required' => false,
			'min' => '',
			'max' => '',
			'step' => '',
			'label' => 'Enter donation',
			'description' => 'Your donation should be here.',
			'css' => '',
			'id' => '',
			'classes' => [],
			'options' => [],
		],
		[
			'name' => 'order_tips_donation_hospital',
			'type' => 'radio',
			'default_value' => 'dola',
			'disabled' => false,
			'required' => false,
			'label' => 'Enter donation',
			'description' => 'Your donation hospital should be here.',
			'css' => '',
			'id' => '',
			'classes' => [],
			'options' => [
				'kinston' => 'Kinston',
				'apolo' => 'Apolo',
				'ibn-sina' => 'Ibn Sina',
				'dola' => 'Dola Clinic'
			],
		],
		[
			'name' => 'order_tips_donation_destination',
			'type' => 'checkbox',
			'default_value' => ['argentina', 'denmark'],
			'disabled' => false,
			'required' => false,
			'label' => 'Enter donation',
			'description' => 'Your donation should be here.',
			'css' => '',
			'id' => '',
			'classes' => [],
			'options' => [
				'argentina' => 'Argentina',
				'brazil' => 'Brazil',
				'cr' => 'Check Republic',
				'denmark' => 'Denmark',
				'france' => 'France',
			],
		],
		[
			'name' => 'order_tips_donation_members',
			'type' => 'select',
			'default_value' => ['ayub', 'daud'],
			'multiple' => true,
			'disabled' => false,
			'required' => false,
			'label' => 'Donation member',
			'description' => 'Your donation members should be here.',
			'css' => '',
			'id' => '',
			'classes' => [],
			'options' => [
				'ayub' => 'Ayub Ali',
				'belal' => 'Belal',
				'kibria' => 'Kibria',
				'daud' => 'Daud Kim',
				'osman' => 'Osman',
			],
		],
	]);

	OptemizDashboard::createSubTab('order_tips', 'style', [
		"label" => __("Style"),
		"classes" => [],
	]);

	OptemizDashboard::createOptions('order_tips', 'style', [
		[
			'name' => 'order_tips_font_size',
			'type' => 'text',
			'default_value' => '24px',
			'placeholder' => 'font size here',
			'disabled' => false,
			'required' => false,
			'min' => '',
			'max' => '',
			'step' => '',
			'label' => 'Enter font size',
			'description' => 'Your font size should be here.',
			'css' => '',
			'id' => '',
			'classes' => [],
			'options' => [],
		],
		[
			'name' => 'order_tips_border_width',
			'type' => 'text',
			'default_value' => '14px',
			'placeholder' => 'border width here.',
			'disabled' => false,
			'required' => false,
			'min' => '',
			'max' => '',
			'step' => '',
			'label' => 'Enable border width',
			'description' => 'Your border width should be here.',
			'css' => '',
			'id' => '',
			'classes' => [],
			'options' => [],
		],
	]);

	OptemizDashboard::createSubTab('order_tips', 'help', [
		"label" => __("Help"),
		"classes" => [],
	]);

	// General Tab
	OptemizDashboard::createTab('barcode', [
		"label" => __("Barcode"),
		"classes" => [],
	]);

	OptemizDashboard::createSubTab('barcode', 'init', [
		"label" => __("Init"),
		"classes" => [],
	]);

	OptemizDashboard::createSubTab('barcode', 'mapping', [
		"label" => __("Mapping"),
		"classes" => [],
	]);

	// get value
	$opt_settings = OptemizSettings::get();

	return apply_filters('opt_filter_dashboard_data', $opt_settings);
}

function opt_admin_enqueue_scripts( $hook ) {

	$script_dependencies = [
		'dependencies' => [],
		'version' => '1.0.0'
	];

	//@TODO need to handle $hook to load the scripts in specific pages
	//@TODO plugin_dir_url function should be dynamic here for any plugin usage this library
	wp_enqueue_style('opt-dashboard-style', OPT_PLUGIN_URL . '/assets/admin/css/style.css' );
	wp_enqueue_style('opt-dashboard-select2-style', OPT_PLUGIN_URL . '/assets/admin/css/select2.min.css' );
	wp_enqueue_style( 'opt-google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500&display=swap', [], null );



	// include dependencies file
	if ( file_exists( OPT_PLUGIN_PATH . '/assets/build/index.asset.php' ) ) {
		$script_dependencies = require OPT_PLUGIN_PATH . '/assets/build/index.asset.php';

		// echo "<pre>";
		// print_r($script_dependencies);
		// die();
	}

	//@TODO need to handle $hook to load the scripts in specific pages
	//@TODO plugin_dir_url function should be dynamic here for any plugin usage this library
	wp_enqueue_script( 'opt-dashboard', OPT_PLUGIN_URL . '/assets/build/index.js' , $script_dependencies['dependencies'], $script_dependencies['version'] );
	wp_enqueue_script( 'opt-dashboard-select2', OPT_PLUGIN_URL . '/assets/admin/js/select2.min.js' , array('jquery'), '1.0.0' );

	wp_localize_script('opt-dashboard', 'opt_dashboard_data', [
		'ajaxurl'       => esc_url( admin_url( 'admin-ajax.php' ) ),
        'homeurl'       => esc_url( home_url() ),
        'nonce'         => wp_create_nonce( 'opt_admin_data' ),
		'plugin_url' 	=> OPT_PLUGIN_URL,
		'plugin_path' 	=> OPT_PLUGIN_PATH,
		'settings' 		=> opt_get_dashboard_data(),
	]);
}

