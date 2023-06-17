<?php

namespace OptDashboard;

defined( 'ABSPATH' ) || exit;

if ( ! class_exists( 'OptemizSettings', false ) ) :

	abstract class OptemizSettings {

		public function __construct() {}

		abstract public function get_id();

		abstract public function get_label();

		abstract public function get_title();

		abstract public function get_menu_name();
	}

endif;
