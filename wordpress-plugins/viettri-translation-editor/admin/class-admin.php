<?php
/**
 * Viet Tri Translation Editor - Admin Interface Controller
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class VietTri_Translation_Admin {

    const MENU_SLUG = 'viettri-translations';

    public static function init() {
        add_action( 'admin_menu', array( __CLASS__, 'add_menu_page' ) );
        add_action( 'admin_enqueue_scripts', array( __CLASS__, 'enqueue_assets' ) );
        add_action( 'admin_init', array( __CLASS__, 'register_settings' ) );
    }

    public static function add_menu_page() {
        add_menu_page(
            __( 'Quản lý Bản dịch', 'viettri-translations' ),
            __( 'Từ điển Đa ngôn ngữ', 'viettri-translations' ),
            'manage_options',
            self::MENU_SLUG,
            array( __CLASS__, 'render_page' ),
            'dashicons-translation',
            26
        );
    }

    public static function enqueue_assets( $hook ) {
        if ( strpos( $hook, self::MENU_SLUG ) === false ) {
            return;
        }

        wp_enqueue_style(
            'viettri-translations-admin',
            VIETTRI_TRANSLATIONS_URL . 'admin/admin-style.css',
            array(),
            VIETTRI_TRANSLATIONS_VERSION
        );

        wp_enqueue_script(
            'viettri-translations-admin',
            VIETTRI_TRANSLATIONS_URL . 'admin/admin-script.js',
            array( 'jquery' ),
            VIETTRI_TRANSLATIONS_VERSION,
            true
        );

        $vi_data = VietTri_Translation_Storage::get_dictionary( 'vi' );
        $en_data = VietTri_Translation_Storage::get_dictionary( 'en' );

        wp_localize_script( 'viettri-translations-admin', 'viettriTranslations', array(
            'apiUrl'     => esc_url_raw( rest_url( 'viettri/v1' ) ),
            'nonce'      => wp_create_nonce( 'wp_rest' ),
            'vi'         => $vi_data,
            'en'         => $en_data,
            'webhookUrl' => get_option( VietTri_Translation_Storage::OPTION_WEBHOOK, '' ),
            'secret'     => get_option( VietTri_Translation_Storage::OPTION_SECRET, '' ),
            'strings'    => array(
                'saveSuccess'   => __( 'Đã lưu thay đổi thành công!', 'viettri-translations' ),
                'saveError'     => __( 'Có lỗi xảy ra khi lưu. Vui lòng kiểm tra lại.', 'viettri-translations' ),
                'confirmReset'  => __( 'Bạn có chắc chắn muốn khôi phục về file mặc định ban đầu không? Các chỉnh sửa chưa lưu sẽ bị xóa.', 'viettri-translations' ),
                'resetSuccess'  => __( 'Đã khôi phục về mặc định thành công!', 'viettri-translations' ),
                'invalidJson'   => __( 'Cú pháp JSON không hợp lệ! Vui lòng kiểm tra dấu phẩy hoặc ngoặc kép.', 'viettri-translations' ),
                'validJson'     => __( 'Cú pháp JSON hoàn toàn hợp lệ!', 'viettri-translations' ),
                'importSuccess' => __( 'Đã nhập dữ liệu JSON thành công vào form!', 'viettri-translations' ),
            )
        ) );
    }

    public static function register_settings() {
        register_setting( 'viettri_translation_settings', VietTri_Translation_Storage::OPTION_WEBHOOK );
        register_setting( 'viettri_translation_settings', VietTri_Translation_Storage::OPTION_SECRET );
    }

    public static function render_page() {
        if ( ! current_user_can( 'manage_options' ) ) {
            wp_die( __( 'Bạn không có quyền truy cập trang này.', 'viettri-translations' ) );
        }

        $webhook_url = get_option( VietTri_Translation_Storage::OPTION_WEBHOOK, '' );
        $secret = get_option( VietTri_Translation_Storage::OPTION_SECRET, '' );

        include VIETTRI_TRANSLATIONS_PATH . 'admin/views/main-view.php';
    }
}
