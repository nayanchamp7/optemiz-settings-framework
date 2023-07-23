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

	new OptDashboard\OptemizDashboard('orderly_settings');

	add_action( 'admin_init', 'opt_dashboard_admin_init' );
	add_action( 'admin_menu', 'opt_dashboard_menu_page' );
	add_action( 'admin_enqueue_scripts', 'opt_admin_enqueue_scripts' );

}

function opt_dashboard_admin_init() {
	add_action('wp_ajax_opt_get_settings_data', 'opt_get_settings_data');
	add_action('wp_ajax_opt_update_settings_data', 'opt_update_settings_data');
}

function opt_get_settings_data() {

	if( !isset($_POST['key']) ) {
		return;
	}

	$data 	= [];
	$key 	= wp_unslash($_POST['key']);

	$values = get_option($key);

	if( $values ) {
		$data['values'] = $values;
		$data['msg'] = __("settings parsed");
	}

	wp_send_json_success($data);
	exit;
}

function opt_update_settings_data() {

	if( !isset($_POST['key']) ) {
		return;
	}

	if( !isset($_POST['value']) ) {
		return;
	}

	$data 	= [];
	$key 	= wp_unslash($_POST['key']);
	$value 	= $_POST['value'];

	error_log( print_r($key, true) );
	error_log( print_r($value, true) );

	$updated = update_option($key, json_encode($value));

	if( $updated ) {
		$data['msg'] = __("settings udpated");
	}

	wp_send_json_success($data);
	exit;
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

	OptemizDashboard::createTab('order_barcode', [
		"label" => __("Barcode"),
		"classes" => [],
	]);

	OptemizDashboard::createSubTab('order_barcode', 'init', [
		"label" => __("Initialization"),
		"classes" => [],
	]);

	OptemizDashboard::createOptions('order_barcode', 'init', [
		[
			'name' => 'order_barcode_enable',
			'type' => 'switch',
			'default_value' => 1, // 1 / 0 should be here
			'placeholder' => '',
			'disabled' => false,
			'required' => false,
			'min' => '',
			'max' => '',
			'step' => '',
			'label' => __( 'Enable Order Barcode', 'order-manager-for-woocommerce' ),
			'description' => __( 'Check to enable order barcode.', 'order-manager-for-woocommerce' ),
			'css' => '',
			'id' => '',
			'classes' => [],
			'options' => [],
		],
		[
			'name' => 'order_barcode_in_metabox',
			'type' => 'switch',
			'default_value' => 1, // 1 / 0 should be here
			'placeholder' => '',
			'disabled' => false,
			'required' => false,
			'min' => '',
			'max' => '',
			'step' => '',
			'label' => __( 'Order Barcode in Metabox', 'order-manager-for-woocommerce' ),
			'description' => __( 'Show barcode in metabox.', 'order-manager-for-woocommerce' ),
			'css' => '',
			'id' => '',
			'classes' => [],
			'options' => [],
		],
		[
			'name' => 'order_barcode_type',
			'type' => 'select',
			'default_value' => ['C39'],
			'placeholder' => __( 'Select barcode position', 'order-manager-for-woocommerce' ),
			'multiple' => false,
			'disabled' => false,
			'required' => false,
			'label' => __( 'Order Barcode Type', 'order-manager-for-woocommerce' ),
			'description' => __( 'Select the barcode type.', 'order-manager-for-woocommerce' ),
			'css' => '',
			'id' => '',
			'classes' => [],
			'options' => apply_filters( 'order_barcode_types', array(
				[
					'label' => __( 'CODE 39 - ANSI MH10.8M-1983 - USD-3 - 3 of 9', 'order-manager-for-woocommerce' ),
					'value' => 'C39'
				],
				[
					'label' => __( 'CODE 39 + CHECKSUM', 'order-manager-for-woocommerce' ),
					'value' => 'C39+'
				],
				[
					'label' => __( 'CODE 39 EXTENDED', 'order-manager-for-woocommerce' ),
					'value' => 'C39E'
				],
				[
					'label' => __( 'CODE 39 EXTENDED + CHECKSUM', 'order-manager-for-woocommerce' ),
					'value' => 'C39E+'
				],
				[
					'label' => __( 'CODE 93 - USS-93', 'order-manager-for-woocommerce' ),
					'value' => 'C93'
				],
				[
					'label' => __( 'Standard 2 of 5 + CHECKSUM', 'order-manager-for-woocommerce' ),
					'value' => 'S25+'
				],
				[
					'label' => __( 'Interleaved 2 of 5', 'order-manager-for-woocommerce' ),
					'value' => 'I25'
				],
				[
					'label' => __( 'Interleaved 2 of 5 + CHECKSUM', 'order-manager-for-woocommerce' ),
					'value' => 'I25+'
				],
				[
					'label' => __( 'CODE 128 AUTO', 'order-manager-for-woocommerce' ),
					'value' => 'C128'
				],
				[
					'label' => __( 'CODE 128 A', 'order-manager-for-woocommerce' ),
					'value' => 'C128A'
				],
				[
					'label' => __( 'CODE 128 B', 'order-manager-for-woocommerce' ),
					'value' => 'C128B'
				],
				[
					'label' => __( 'CODE 128 C', 'order-manager-for-woocommerce' ),
					'value' => 'C128C'
				],
				[
					'label' => __( '2-Digits UPC-Based Extension', 'order-manager-for-woocommerce' ),
					'value' => 'EAN2'
				],
				[
					'label' => __( '5-Digits UPC-Based Extension', 'order-manager-for-woocommerce' ),
					'value' => 'EAN5'
				],
				[
					'label' => __( 'EAN 8', 'order-manager-for-woocommerce' ),
					'value' => 'EAN8'
				],
				[
					'label' => __( 'EAN 13', 'order-manager-for-woocommerce' ),
					'value' => 'EAN13'
				],
				[
					'label' => __( 'UPC-A', 'order-manager-for-woocommerce' ),
					'value' => 'UPCA'
				],
				[
					'label' => __( 'UPC-E', 'order-manager-for-woocommerce' ),
					'value' => 'UPCE'
				],
				[
					'label' => __( 'MSI (Variation of Plessey code)', 'order-manager-for-woocommerce' ),
					'value' => 'MSI'
				],
				[
					'label' => __( 'MSI + CHECKSUM (modulo 11)', 'order-manager-for-woocommerce' ),
					'value' => 'MSI+'
				],
				[
					'label' => __( 'POSTNET', 'order-manager-for-woocommerce' ),
					'value' => 'POSTNET'
				],
				[
					'label' => __( 'PLANET', 'order-manager-for-woocommerce' ),
					'value' => 'PLANET'
				],
				[
					'label' => __( 'RMS4CC (Royal Mail 4-state Customer Code) - CBC (Customer Bar Code)', 'order-manager-for-woocommerce' ),
					'value' => 'RMS4CC'
				],
				[
					'label' => __( 'KIX (Klant index - Customer index)', 'order-manager-for-woocommerce' ),
					'value' => 'KIX'
				],
				[
					'label' => __( 'IMB - Intelligent Mail Barcode - Onecode - USPS-B-3200', 'order-manager-for-woocommerce' ),
					'value' => 'IMB'
				],
				[
					'label' => __( 'IMB - Intelligent Mail Barcode - Onecode - USPS-B-3200- pre-processed', 'order-manager-for-woocommerce' ),
					'value' => 'IMBPRE'
				],
				[
					'label' => __( 'CODABAR', 'order-manager-for-woocommerce' ),
					'value' => 'CODABAR'
				],
				[
					'label' => __( 'CODE 11', 'order-manager-for-woocommerce' ),
					'value' => 'CODE11'
				],
				[
					'label' => __( 'PHARMACODE', 'order-manager-for-woocommerce' ),
					'value' => 'PHARMA'
				],
				[
					'label' => __( 'PHARMACODE TWO-TRACKS', 'order-manager-for-woocommerce' ),
					'value' => 'PHARMA2T'
				],
				[
					'label' => __( 'DATAMATRIX (ISO/IEC 16022)', 'order-manager-for-woocommerce' ),
					'value' => 'DATAMATRIX'
				],
				[
					'label' => __( 'PDF417 (ISO/IEC 15438:2006)', 'order-manager-for-woocommerce' ),
					'value' => 'PDF417'
				],
				[
					'label' => __( 'QR-CODE', 'order-manager-for-woocommerce' ),
					'value' => 'QRCODE'
				],
				[
					'label' => __( '2D RAW MODE comma-separated rows', 'order-manager-for-woocommerce' ),
					'value' => 'RAW'
				],
				[
					'label' => __( '2D RAW MODE rows enclosed in square parentheses', 'order-manager-for-woocommerce' ),
					'value' => 'RAW2'
				],
			)),
		],
		[
			'name' => 'order_barcode_metabox_position',
			'type' => 'select',
			'default_value' => ['normal-high'],
			'placeholder' => 'Select position',
			'multiple' => true,
			'disabled' => false,
			'required' => false,
			'label' => __( 'Barcode Position', 'order-manager-for-woocommerce' ),
			'description' => __( 'Select the barcode position in.', 'order-manager-for-woocommerce' ),
			'css' => '',
			'id' => '',
			'classes' => [],
			'options' => apply_filters( 'order_barcode_metabox_position', array(
				[
					'label' => __( 'Normal-Always Top', 'order-manager-for-woocommerce' ),
					'value' => 'normal-high'
				],
				[
					'label' => __( 'Normal-Core', 'order-manager-for-woocommerce' ),
					'value' => 'normal-core'
				],
				[
					'label' => __( 'Normal-Default', 'order-manager-for-woocommerce' ),
					'value' => 'normal-default'
				],
				[
					'label' => __( 'Normal-Always (low)', 'order-manager-for-woocommerce' ),
					'value' => 'normal-low'
				],
				[
					'label' => __( 'Side-Always (high)', 'order-manager-for-woocommerce' ),
					'value' => 'side-high'
				],
				[
					'label' => __( 'Side-After core metabox', 'order-manager-for-woocommerce' ),
					'value' => 'side-core'
				],
				[
					'label' => __( 'Side-Always low', 'order-manager-for-woocommerce' ),
					'value' => 'side-low'
				],
			)),
		],
		[
			'name' => 'order_barcode_in_store_order_list',
			'type' => 'switch',
			'default_value' => 1, // 1 / 0 should be here
			'placeholder' => '',
			'disabled' => false,
			'required' => false,
			'min' => '',
			'max' => '',
			'step' => '',
			'label' => __( 'Barcode in store order list', 'order-manager-for-woocommerce' ),
			'description' => __( 'Enable to show barcode in store order list.', 'order-manager-for-woocommerce' ),
			'css' => '',
			'id' => '',
			'classes' => [],
			'options' => [],
		],
		[
			'name' => 'order_barcode_in_my_order_list',
			'type' => 'switch',
			'default_value' => 1, // 1 / 0 should be here
			'placeholder' => '',
			'disabled' => false,
			'required' => false,
			'min' => '',
			'max' => '',
			'step' => '',
			'label' => __( 'Barcode on my order list', 'order-manager-for-woocommerce' ),
			'description' => __( 'Enable barcode in my order list.', 'order-manager-for-woocommerce' ),
			'css' => '',
			'id' => '',
			'classes' => [],
			'options' => [],
		],
		[
			'name' => 'order_barcode_in_email',
			'type' => 'switch',
			'default_value' => 1, // 1 / 0 should be here
			'placeholder' => '',
			'disabled' => false,
			'required' => false,
			'min' => '',
			'max' => '',
			'step' => '',
			'label' => __( 'Barcode in order email', 'order-manager-for-woocommerce' ),
			'description' => __( 'Show barcode in order email.', 'order-manager-for-woocommerce' ),
			'css' => '',
			'id' => '',
			'classes' => [],
			'options' => [],
		],
		[
			'name' => 'order_barcode_download_from_my_account',
			'type' => 'switch',
			'default_value' => 1, // 1 / 0 should be here
			'placeholder' => '',
			'disabled' => false,
			'required' => false,
			'min' => '',
			'max' => '',
			'step' => '',
			'label' => __( 'Download from my account', 'order-manager-for-woocommerce' ),
			'description' => __( 'Enable to download barcode from my account.', 'order-manager-for-woocommerce' ),
			'css' => '',
			'id' => '',
			'classes' => [],
			'options' => [],
		],
	]);

	OptemizDashboard::createSubTab('order_barcode', 'style', [
		"label" => __("Style"),
		"classes" => [],
	]);

	OptemizDashboard::createOptions('order_barcode', 'style', [
		[
			'name' => 'order_barcode_width',
			'type' => 'number',
			'default_value' => 100,
			'placeholder' => __("Enter barcode width here", 'order-manager-for-woocommerce'),
			'disabled' => false,
			'required' => false,
			'min' => '',
			'max' => '',
			'step' => '',
			'label' => __("Barcode width (px)", 'order-manager-for-woocommerce'),
			'description' => __("Input barcode width here.", 'order-manager-for-woocommerce'),
			'css' => '',
			'id' => '',
			'classes' => [],
			'options' => [],
		],
		[
			'name' => 'order_barcode_color',
			'type' => 'color',
			'default_value' => '#dedede',
			'disabled' => false,
			'required' => false,
			'min' => '',
			'max' => '',
			'step' => '',
			'label' => __("Color", 'order-manager-for-woocommerce'),
			'description' => __('Barcode color should be here.', 'order-manager-for-woocommerce'),
			'css' => '',
			'id' => '',
			'classes' => [],
			'options' => [],
		],
		[
			'name' => 'order_barcode_background_color',
			'type' => 'color',
			'default_value' => '#b25353',
			'disabled' => false,
			'required' => false,
			'min' => '',
			'max' => '',
			'step' => '',
			'label' => __("Background", 'order-manager-for-woocommerce'),
			'description' => 'Barcode background color should be here.',
			'css' => '',
			'id' => '',
			'classes' => [],
			'options' => [],
		]
	]);

	OptemizDashboard::createSubTab('order_barcode', 'help', [
		"label" => __("Help"),
		"classes" => [],
	]);

	// General Tab
	OptemizDashboard::createTab('order_tips', [
		"label" => __("Tips"),
		"classes" => [],
	]);

	OptemizDashboard::createSubTab('order_tips', 'init', [
		"label" => __("Init"),
		"classes" => [],
	]);

	OptemizDashboard::createOptions('order_tips', 'init', [
		[
			'name' => 'order_barcode_width_2',
			'type' => 'number',
			'default_value' => 100,
			'placeholder' => __("Enter barcode width here", 'order-manager-for-woocommerce'),
			'disabled' => false,
			'required' => false,
			'min' => '',
			'max' => '',
			'step' => '',
			'label' => __("Barcode width (px)", 'order-manager-for-woocommerce'),
			'description' => __("Input barcode width here.", 'order-manager-for-woocommerce'),
			'css' => '',
			'id' => '',
			'classes' => [],
			'options' => [],
		],
		[
			'name' => 'order_barcode_color_2',
			'type' => 'color',
			'default_value' => '#dedede',
			'disabled' => false,
			'required' => false,
			'min' => '',
			'max' => '',
			'step' => '',
			'label' => __("Color", 'order-manager-for-woocommerce'),
			'description' => __('Barcode color should be here.', 'order-manager-for-woocommerce'),
			'css' => '',
			'id' => '',
			'classes' => [],
			'options' => [],
		],
		[
			'name' => 'order_barcode_background_color_2',
			'type' => 'color',
			'default_value' => '#ededed',
			'disabled' => false,
			'required' => false,
			'min' => '',
			'max' => '',
			'step' => '',
			'label' => __("Background", 'order-manager-for-woocommerce'),
			'description' => 'Barcode background color should be here.',
			'css' => '',
			'id' => '',
			'classes' => [],
			'options' => [],
		],
		[
			'name' => 'order_tips_first_name_2',
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
			'name' => 'order_tips_last_name_2',
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
			'name' => 'order_tips_color_2',
			'type' => 'color',
			'default_value' => '#dedede',
			'disabled' => false,
			'required' => false,
			'min' => '',
			'max' => '',
			'step' => '',
			'label' => 'Tip Color',
			'description' => 'Your color should be here.',
			'css' => '',
			'id' => '',
			'classes' => [],
			'options' => [],
		],
		[
			'name' => 'order_tips_donation_hospital_2',
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
			'name' => 'order_tips_donation_destination_2',
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
			'name' => 'order_tips_font_size_2',
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

	OptemizDashboard::createSubTab('order_tips', 'mapping', [
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
		'ajaxurl'       => admin_url( 'admin-ajax.php' ),
        'homeurl'       => esc_url( home_url() ),
        'nonce'         => wp_create_nonce( 'opt_admin_data' ),
		'plugin_url' 	=> OPT_PLUGIN_URL,
		'plugin_path' 	=> OPT_PLUGIN_PATH,
		'settings' 		=> opt_get_dashboard_data(),
	]);
}


