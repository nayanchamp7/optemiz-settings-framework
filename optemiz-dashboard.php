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