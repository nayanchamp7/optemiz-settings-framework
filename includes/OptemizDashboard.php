<?php

namespace OptDashboard;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

/**
 * Class OptemizDashboard
 */
class OptemizDashboard {

    /**
     * Settings values.
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
     * OptemizDashboard constructor.
     *
     */
    public function __construct($key) {
        $this->setKey($key);
        $this->hooks();
    }

    /**
     * OptemizDashboard instance.
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
     * Hooks
     *
     */
    function hooks() {
        add_action( 'admin_init', [$this, 'adminInit'] );
        add_action( 'admin_enqueue_scripts', [$this, 'enqueueScripts'] );
    }

    /**
     * Enqueue style and script files
     *
     */
    function enqueueScripts( $hook ) {

        //@TODO need to dynamic this `toplevel_page_orderly` according to the given slug
        //$hooks - {value: toplevel_page_orderly} for - {action: admin_enqueue_scripts} hook
        if( $hook !== 'toplevel_page_orderly' ) {
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
        if ( file_exists( OSF_PATH . '/assets/build/index.asset.php' ) ) {
            $script_dependencies = require OSF_PATH . '/assets/build/index.asset.php';
        }

        //enqueue settings scripts
        wp_enqueue_script( 'opt-dashboard', OSF_URL . '/assets/build/index.js' , $script_dependencies['dependencies'], $script_dependencies['version'] );
        wp_enqueue_script( 'opt-dashboard-select2', OSF_URL . '/assets/admin/js/select2.min.js' , array('jquery'), '1.0.0' );

        wp_localize_script('opt-dashboard', 'opt_dashboard_data', [
            'ajaxurl'       => admin_url( 'admin-ajax.php' ),
            'homeurl'       => esc_url( home_url() ),
            'nonce'         => wp_create_nonce( 'opt_admin_data' ),
            'plugin_url' 	=> OSF_URL,
            'plugin_path' 	=> OSF_PATH,
            'settings' 		=> OptemizSettings::get(),
        ]);
    }

    /**
     * Admin Init
     *
     * @return void
     */
    function adminInit() {
        add_action('wp_ajax_opt_get_settings_data', [$this, 'getData']);
        add_action('wp_ajax_opt_update_settings_data', [$this, 'updateData']);
    }

    /**
     * Get settings data on ajax call
     *
     */
    function getData() {

		if( !isset($_POST['nonce']) || !wp_verify_nonce( $_POST['nonce'], 'nonce' ) ) {
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
     */
    function updateData() {

		if( !isset($_POST['nonce']) || !wp_verify_nonce( $_POST['nonce'], 'nonce' ) ) {
            wp_send_json_error( __('Security Check Failed') );
        }

        if( !isset($_POST['key']) ) {
            return;
        }

        if( !isset($_POST['value']) ) {
            return;
        }

        $data 	= [];
        $key 	= wp_unslash($_POST['key']);
        $value 	= sanitize_text_field($_POST['value']);

        $updated = update_option($key, json_encode($value));

        if( $updated ) {
            $data['msg'] = __("settings udpated");
        }

        wp_send_json_success($data);
        exit;
    }

    /**
     * Load dashboard template
     *
     * @return void
     */
    function loadTemplate() {
        include OSF_PATH . '/templates/opt-dashboard.php';
    }

	/**
	 * Set settings key.
	 *
     * @param string $key settings unique meta key.
     *
	 * @return void
	 */
	public function setKey($key) {
        OptemizSettings::setKey($key);
	}


    /**
	 * Set settings general arguments.
	 *
     * @param array $args arguments.
     *
	 * @return void
	 */
	public static function setArgs($args) {
        OptemizSettings::set($args);
	}

    /**
	 * Create header.
	 *
     * @param array $args arguments.
     *
	 * @return void
	 */
	public static function createHeader($args) {
        OptemizHeader::set($args);
	}

    /**
	 * Create sidebar.
	 *
     * @param array $args arguments.
     *
	 * @return void
	 */
	public static function createSidebar($args) {
        OptemizSidebar::set($args);
	}

    /**
	 * Create tab settings.
	 *
     * @param string    $key tab key.
     * @param array     $args arguments.
     *
	 * @return void
	 */
	public static function createTab($key, $args) {
        OptemizTab::set($key, $args);
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
	public static function createSubTab($tab_key, $sub_tab_key, $args) {
        OptemizSubTab::set($tab_key, $sub_tab_key, $args);
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
    public static function createOptions($tab_key, $sub_tab_key, $fields) {
        OptemizField::set($tab_key, $sub_tab_key, $fields);
	}
}
