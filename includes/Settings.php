<?php

namespace Optemiz\Dashboard;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

/**
 * Class Settings
 */
if ( ! class_exists( '\Optemiz\Dashboard\Settings' ) ) {
    class Settings {
    
        /**
         * Header values.
         *
         * @var Header
         */
        public $header;
        
        /**
         * Sidebar values.
         *
         * @var Sidebar
         */
        public $sidebar;
        
        /**
         * Tab values.
         *
         * @var Tab
         */
        public $tab;
        
        /**
         * Sub Tab values.
         *
         * @var SubTab
         */
        public $subtab;
        
        /**
         * Field values.
         *
         * @var Field
         */
        public $field;

        /**
         * Settings.
         *
         * @var array
         */
        public $settings;
    
        /**
         * Settings object.
         *
         * @var object
         */
        public $settings_obj;
    
        /**
         * Instance.
         *
         * @var mixed
         */
        protected static $_instance   = null;
    
        /**
         * Dashboard constructor.
         *
         */
        public function __construct() {
    
            if(!empty($this->settings_id())) {
                $settings_id = $this->settings_id();

                $this->setKey($settings_id);

                $this->header   = new Header($settings_id, $this);
                $this->sidebar  = new Sidebar($settings_id, $this);
                $this->tab      = new Tab($settings_id, $this);
                $this->subtab   = new SubTab($settings_id, $this);
                $this->field    = new Field($settings_id, $this);
            }
    
            $this->define_constants();
            $this->hooks();
        }
    
        /**
         * Dashboard instance.
         *
         */
        public static function instance()
        {
            if (is_null(self::$_instance)) {
                self::$_instance = new self();
            }
    
            return self::$_instance;
        }
    
        /**
         * Define constants.
         *
         * @return void
         */
        private function define_constants() {
    
            if ( ! defined( 'OSF_URL' ) ) {
                define( 'OSF_URL', plugins_url( '', __FILE__ ) );
            }
            
            if ( ! defined( 'OSF_PATH' ) ) {
                define( 'OSF_PATH', untrailingslashit(plugin_dir_path(__FILE__)) );
            }
        }
    
        /**
         * Hooks
         *
         * @return void
         */
        public function hooks() {
            add_action( 'admin_init', [$this, 'adminInit'] );
            add_action( 'admin_enqueue_scripts', [$this, 'enqueueScripts'] );
        }
        
        /**
         * Page ID
         *
         * @return string
         */
        public function page_id(): string {
            return '';
        }
        
        /**
         * Settings ID
         *
         * @return string
         */
        public function settings_id(): string {
            return '';
        }

        /**
         * Load dashboard template
         *
         * @return void
         */
        public function loadTemplate() {
            ob_start();
            echo '<div class="opt-main-container"></div>';
            echo ob_get_clean();
        }
    
        /**
         * Enqueue style and script files
         *
         */
        public function enqueueScripts( $hook ) {
    
            if( empty($this->page_id()) ) {
                return;
            }
    
            if( !isset($_GET['page']) ) {
                return;
            }
    
            if( $_GET['page'] !== $this->page_id() ) {
                return;
            }
    
            $script_dependencies = [
                'dependencies' => [],
                'version' => '1.0.0'
            ];
    
            //enqueue settings styles
            wp_enqueue_style('opt-dashboard-style', OSF_URL . '/assets/admin/css/style.css' );
            wp_enqueue_style('opt-dashboard-select2-style', OSF_URL . '/assets/admin/css/select2.min.css' );
            wp_enqueue_style( 'opt-google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500&display=swap', [], null );
    
    
            // include dependencies file
            if ( file_exists( OSF_PATH . '/assets/build/backend.asset.php' ) ) {
                $script_dependencies = require OSF_PATH . '/assets/build/backend.asset.php';
            }
    
            //enqueue settings scripts
            wp_enqueue_script( 'opt-dashboard', OSF_URL . '/assets/build/backend.js' , $script_dependencies['dependencies'], $script_dependencies['version'] );
            wp_enqueue_script( 'opt-dashboard-select2', OSF_URL . '/assets/admin/js/select2.min.js' , array('jquery'), '1.0.0' );
    
            wp_localize_script('opt-dashboard', 'opt_dashboard_data', [
                'ajaxurl'       => admin_url( 'admin-ajax.php' ),
                'homeurl'       => esc_url( home_url() ),
                'nonce'         => wp_create_nonce( 'opt_admin_data' ),
                'plugin_url' 	=> OSF_URL,
                'plugin_path' 	=> OSF_PATH,
                'settings' 		=> $this->get_settings(),
            ]);
        }
    
        /**
         * Admin Init
         *
         * @return void
         */
        public function adminInit() {
            add_action('wp_ajax_opt_get_settings_data', [$this, 'getData']);
            add_action('wp_ajax_opt_update_settings_data', [$this, 'updateData']);
        }
    
        /**
         * Get settings data on ajax call
         *
         * @return void
         */
        public function getData() {
    
            if( !isset($_POST['nonce']) || !wp_verify_nonce( $_POST['nonce'], 'opt_admin_data' ) ) {
                wp_send_json_error( __('Security Check Failed') );
            }
    
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
    
        /**
         * Update settings data on ajax call
         *
         * @return void
         */
        public function updateData() {
    
            if( !isset($_POST['nonce']) || !wp_verify_nonce( $_POST['nonce'], 'opt_admin_data' ) ) {
                wp_send_json_error( __('Security Check Failed') );
            }
    
            if( !isset($_POST['key']) ) {
                return;
            }
    
            if( !isset($_POST['value']) ) {
                return;
            }
    
            $data 	= [];
            $key 	= sanitize_text_field(wp_unslash($_POST['key']));
            $value 	= $_POST['value'];
    
            $updated = update_option($key, $value);
    
            if( $updated ) {
                $data['msg'] = __("settings udpated");
            }
    
            wp_send_json_success($data);
            exit;
        }

        /**
         * Set meta key.
         *
         * @return void
         */
        public function setKey($key) {
            $this->settings['key'] = $key;
        }

        /**
         * Get settings.
         *
         * @return array
         */
        public function get_settings() {

            if( !isset($this->settings['args']) ) {
                $this->settings['args'] = [];
            }

            if( !isset($this->settings['header']) ) {
                $this->settings['header'] = [];
            }

            if( !isset($this->settings['sidebar']) ) {
                $this->settings['sidebar'] = [];
            }

            if( !isset($this->settings['form']) ) {
                $this->settings['form'] = [];
            }

            return $this->settings;
        }
    
        /**
         * Set settings general arguments.
         *
         * @param array $args arguments.
         *
         * @return void
         */
        public function setArgs($args) {
            $this->settings['args'] = $args;
        }

        /**
         * Create header.
         *
         * @param array $args arguments.
         *
         * @return void
         */
        public function createHeader($args) {
            $this->settings['header'] = $args;
        }
    
        /**
         * Create sidebar.
         *
         * @param array $args arguments.
         *
         * @return void
         */
        public function createSidebar($args) {
            $this->settings['sidebar'] = $args;
        }
    
        /**
         * Create tab settings.
         *
         * @param string    $key tab key.
         * @param array     $args arguments.
         *
         * @return void
         */
        public function createTab($key, $args) {
            $this->tab->set($key, $args);
        }
    
        /**
         * Create sub tab settings.
         *
         * @param string    $tab_key tab key.
         * @param string    $sub_tab_key sub tab key.
         * @param array     $args arguments.
         *
         * @return void
         */
        public function createSubTab($tab_key, $sub_tab_key, $args) {
            $this->subtab->set($tab_key, $sub_tab_key, $args);
        }
    
        /**
         * Create sub tab settings.
         *
         * @param string    $tab_key tab key.
         * @param string    $sub_tab_key sub tab key.
         * @param array     $args arguments.
         *
         * @return void
         */
        public function createOptions($tab_key, $sub_tab_key, $fields) {
            $this->field->set($tab_key, $sub_tab_key, $fields);
        }
    }
}
