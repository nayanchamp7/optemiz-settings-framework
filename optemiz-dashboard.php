<?php
use OptDashboard\OptemizDashboard;
use OptDashboard\OptemizSettings;
use OptDashboard\OptemizTab;
use OptDashboard\OptemizSubTab;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

if ( ! defined( 'OSF_URL' ) ) {
	define( 'OSF_URL', plugins_url( '', __FILE__ ) );
}

if ( ! defined( 'OSF_PATH' ) ) {
	define( 'OSF_PATH', untrailingslashit(plugin_dir_path(__FILE__)) );
}

//autoload file
require_once OSF_PATH . "/vendor/autoload.php";
