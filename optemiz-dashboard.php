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

defined( 'ABSPATH' ) || exit;

if ( ! defined( 'OPT_PLUGIN_URL' ) ) {
	define( 'OPT_PLUGIN_URL', plugins_url( '', __FILE__ ) );
}

add_action('plugins_loaded', 'opt_dashboard_init');
function opt_dashboard_init() {
	add_action( 'admin_menu', 'opt_dashboard_menu_page' );
}

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

	$data['header'] = [
		'icon_url' => 'http://optemiz.com/',
		'heading' => __('Orderly'),
		'url' => 'http://optemiz.com/',
		'classes' => [],
		'big_icon_url' => '',
		'version' => '',
		'control_panel_label' => '',
	];
	

	$data['sidebar'] = [
		'box_classes' => [],
		'items' => [
			[
				'icon_url' => '',
				'label' => __('Show your love'),
				'content' => __('We love to have you in the SchedulePress family. We are making it more awesome everyday.'),
				'buttons' => [
					[
						'button_label' => __('Rate Us'),
						'button_url' => 'https://optemiz.com',
						'button_classes' => ['opt-right-side-bar-span'],
					]
				],
			]
		]
	];

	return apply_filters('opt_filter_dashboard_data', $data);
}

function opt_admin_enqueue_scripts( $hook ) {

	//@TODO need to handle $hook to load the scripts in specific pages
	//@TODO plugin_dir_url function should be dynamic here for any plugin usage this library
	wp_enqueue_style('opt-dashboard-style', OPT_PLUGIN_URL . '/assets/admin/css/style.css' );
	wp_enqueue_style('opt-dashboard-select2-style', OPT_PLUGIN_URL . '/assets/admin/css/select2.min.css' );
	wp_enqueue_style( 'opt-google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500&display=swap', [], null );



	//@TODO need to handle $hook to load the scripts in specific pages
	//@TODO plugin_dir_url function should be dynamic here for any plugin usage this library
	wp_enqueue_script( 'opt-dashboard', OPT_PLUGIN_URL . '/assets/admin/js/script.js' , array('jquery'), '1.0.0' );
	wp_enqueue_script( 'opt-dashboard-select2', OPT_PLUGIN_URL . '/assets/admin/js/select2.min.js' , array('jquery'), '1.0.0' );
}
add_action( 'admin_enqueue_scripts', 'opt_admin_enqueue_scripts' );
