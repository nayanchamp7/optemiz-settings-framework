<?php

defined( 'ABSPATH' ) || exit;

if ( ! class_exists( 'Optemiz_Settings', false ) ) :

	abstract class Optemiz_Settings {

		public function __construct() {

		}

		abstract public function get_id();

		abstract public function get_label();

		abstract public function get_title();

		abstract public function get_menu_name();
	}

endif;
