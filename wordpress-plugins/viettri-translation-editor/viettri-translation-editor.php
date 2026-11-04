<?php
/**
 * Plugin Name: Viet Tri Translation Editor (Quản Lý Bản Dịch Website)
 * Plugin URI: https://viettrilegacylakeside.vn
 * Description: Plugin quản trị từ điển đa ngôn ngữ (vi.json & en.json) cho website Việt Trì Legacy Lakeside. Hỗ trợ giao diện form trực quan, JSON code editor, phân theo từng trang và cung cấp REST API cho Next.js Frontend.
 * Version: 1.0.0
 * Author: Viet Tri Tech Team
 * Author URI: https://viettrilegacylakeside.vn
 * Text Domain: viettri-translations
 * Domain Path: /languages
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

define( 'VIETTRI_TRANSLATIONS_VERSION', '1.0.0' );
define( 'VIETTRI_TRANSLATIONS_PATH', plugin_dir_path( __FILE__ ) );
define( 'VIETTRI_TRANSLATIONS_URL', plugin_dir_url( __FILE__ ) );

// Load classes
require_once VIETTRI_TRANSLATIONS_PATH . 'includes/class-storage.php';
require_once VIETTRI_TRANSLATIONS_PATH . 'includes/class-api.php';
require_once VIETTRI_TRANSLATIONS_PATH . 'admin/class-admin.php';

// Initialize Admin UI
if ( is_admin() ) {
    VietTri_Translation_Admin::init();
}

// Initialize REST API
add_action( 'rest_api_init', array( 'VietTri_Translation_API', 'register_routes' ) );

// AJAX Handler for saving webhook settings
add_action( 'wp_ajax_viettri_save_webhook_settings', function() {
    if ( ! current_user_can( 'manage_options' ) ) {
        wp_send_json_error( array( 'message' => 'Unauthorized' ), 403 );
    }

    check_ajax_referer( 'wp_rest', '_ajax_nonce' );

    $url = isset( $_POST['url'] ) ? esc_url_raw( trim( $_POST['url'] ) ) : '';
    $secret = isset( $_POST['secret'] ) ? sanitize_text_field( trim( $_POST['secret'] ) ) : '';

    update_option( VietTri_Translation_Storage::OPTION_WEBHOOK, $url );
    update_option( VietTri_Translation_Storage::OPTION_SECRET, $secret );

    wp_send_json_success( array( 'message' => 'Saved' ) );
} );
