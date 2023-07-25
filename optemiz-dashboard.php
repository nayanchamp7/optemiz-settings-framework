<?php
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