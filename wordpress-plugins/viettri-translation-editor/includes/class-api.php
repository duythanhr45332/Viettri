<?php
/**
 * Viet Tri Translation Editor - REST API Endpoints
 *
 * Exposes endpoints for Next.js frontend to fetch dictionary data,
 * and internal endpoints for admin AJAX operations.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class VietTri_Translation_API {

    const NAMESPACE = 'viettri/v1';

    /**
     * Register REST API routes
     */
    public static function register_routes() {
        // Public endpoint for Next.js: GET /wp-json/viettri/v1/dictionary?lang=vi (or en)
        register_rest_route( self::NAMESPACE, '/dictionary', array(
            'methods'             => WP_REST_Server::READABLE,
            'callback'            => array( __CLASS__, 'get_dictionary' ),
            'permission_callback' => '__return_true', // Publicly accessible for frontend SSR/SSG
            'args'                => array(
                'lang' => array(
                    'default'           => 'vi',
                    'sanitize_callback' => array( 'VietTri_Translation_Storage', 'sanitize_lang' ),
                ),
            ),
        ) );

        // Direct path endpoint: GET /wp-json/viettri/v1/dictionary/{lang}
        register_rest_route( self::NAMESPACE, '/dictionary/(?P<lang>[a-zA-Z0-9_-]+)', array(
            'methods'             => WP_REST_Server::READABLE,
            'callback'            => array( __CLASS__, 'get_dictionary_by_path' ),
            'permission_callback' => '__return_true',
        ) );

        // Admin-only endpoint: POST /wp-json/viettri/v1/save-dictionary
        register_rest_route( self::NAMESPACE, '/save-dictionary', array(
            'methods'             => WP_REST_Server::CREATABLE,
            'callback'            => array( __CLASS__, 'save_dictionary' ),
            'permission_callback' => array( __CLASS__, 'check_admin_permission' ),
        ) );

        // Admin-only endpoint: POST /wp-json/viettri/v1/reset-dictionary
        register_rest_route( self::NAMESPACE, '/reset-dictionary', array(
            'methods'             => WP_REST_Server::CREATABLE,
            'callback'            => array( __CLASS__, 'reset_dictionary' ),
            'permission_callback' => array( __CLASS__, 'check_admin_permission' ),
        ) );
    }

    /**
     * Permission callback for admin endpoints
     */
    public static function check_admin_permission( WP_REST_Request $request ) {
        if ( current_user_can( 'manage_options' ) ) {
            return true;
        }

        // Verify nonce if provided in header
        $nonce = $request->get_header( 'X-WP-Nonce' );
        if ( $nonce && wp_verify_nonce( $nonce, 'wp_rest' ) ) {
            return true;
        }

        return new WP_Error( 'rest_forbidden', __( 'Bạn không có quyền thực hiện thao tác này.', 'viettri-translations' ), array( 'status' => 403 ) );
    }

    /**
     * Handler: GET /wp-json/viettri/v1/dictionary?lang=vi
     */
    public static function get_dictionary( WP_REST_Request $request ) {
        $lang = $request->get_param( 'lang' );
        $lang = VietTri_Translation_Storage::sanitize_lang( $lang );

        $data = VietTri_Translation_Storage::get_dictionary( $lang );

        $response = new WP_REST_Response( $data, 200 );
        // Add cache headers for optimal performance with Next.js ISR
        $response->header( 'Cache-Control', 'public, max-age=60, s-maxage=300, stale-while-revalidate=600' );
        $response->header( 'X-VietTri-Dictionary-Lang', $lang );

        return $response;
    }

    /**
     * Handler: GET /wp-json/viettri/v1/dictionary/{lang}
     */
    public static function get_dictionary_by_path( WP_REST_Request $request ) {
        $lang = $request->get_param( 'lang' );
        $request->set_param( 'lang', $lang );
        return self::get_dictionary( $request );
    }

    /**
     * Handler: POST /wp-json/viettri/v1/save-dictionary
     */
    public static function save_dictionary( WP_REST_Request $request ) {
        $body = $request->get_json_params();

        if ( empty( $body ) || ! is_array( $body ) ) {
            return new WP_Error( 'invalid_data', __( 'Dữ liệu JSON không hợp lệ.', 'viettri-translations' ), array( 'status' => 400 ) );
        }

        // Support saving both dictionaries at once
        if ( isset( $body['dictionaries'] ) && is_array( $body['dictionaries'] ) ) {
            if ( isset( $body['dictionaries']['vi'] ) && is_array( $body['dictionaries']['vi'] ) ) {
                VietTri_Translation_Storage::save_dictionary( 'vi', $body['dictionaries']['vi'] );
            }
            if ( isset( $body['dictionaries']['en'] ) && is_array( $body['dictionaries']['en'] ) ) {
                VietTri_Translation_Storage::save_dictionary( 'en', $body['dictionaries']['en'] );
            }
            return new WP_REST_Response( array(
                'success' => true,
                'message' => __( 'Đã lưu thành công bản dịch Tiếng Việt và Tiếng Anh!', 'viettri-translations' ),
            ), 200 );
        }

        $lang = isset( $body['lang'] ) ? $body['lang'] : 'vi';
        $lang = VietTri_Translation_Storage::sanitize_lang( $lang );

        if ( ! isset( $body['dictionary'] ) || ! is_array( $body['dictionary'] ) ) {
            return new WP_Error( 'missing_dictionary', __( 'Thiếu nội dung từ điển dictionary.', 'viettri-translations' ), array( 'status' => 400 ) );
        }

        $dict = $body['dictionary'];

        VietTri_Translation_Storage::save_dictionary( $lang, $dict );

        return new WP_REST_Response( array(
            'success' => true,
            'message' => sprintf( __( 'Đã lưu thành công từ điển %s!', 'viettri-translations' ), strtoupper( $lang ) ),
            'lang'    => $lang,
        ), 200 );
    }

    /**
     * Handler: POST /wp-json/viettri/v1/reset-dictionary
     */
    public static function reset_dictionary( WP_REST_Request $request ) {
        $body = $request->get_json_params();
        
        if ( isset( $body['lang'] ) && $body['lang'] === 'all' ) {
            $default_vi = VietTri_Translation_Storage::reset_dictionary( 'vi' );
            $default_en = VietTri_Translation_Storage::reset_dictionary( 'en' );
            return new WP_REST_Response( array(
                'success'      => true,
                'message'      => __( 'Đã khôi phục toàn bộ bản dịch về mặc định ban đầu.', 'viettri-translations' ),
                'dictionaries' => array(
                    'vi' => $default_vi,
                    'en' => $default_en,
                ),
            ), 200 );
        }

        $lang = isset( $body['lang'] ) ? $body['lang'] : 'vi';
        $lang = VietTri_Translation_Storage::sanitize_lang( $lang );

        $default_data = VietTri_Translation_Storage::reset_dictionary( $lang );

        return new WP_REST_Response( array(
            'success'    => true,
            'message'    => sprintf( __( 'Đã khôi phục từ điển %s về mặc định ban đầu.', 'viettri-translations' ), strtoupper( $lang ) ),
            'lang'       => $lang,
            'dictionary' => $default_data,
        ), 200 );
    }
}
