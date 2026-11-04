<?php
/**
 * Viet Tri Translation Editor - Storage Handler
 *
 * Handles reading and saving dictionary data from WordPress options or default JSON files.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class VietTri_Translation_Storage {

    const OPTION_PREFIX = 'viettri_dict_';
    const OPTION_WEBHOOK = 'viettri_nextjs_revalidate_url';
    const OPTION_SECRET = 'viettri_nextjs_revalidate_secret';

    /**
     * Get dictionary data for specified language ('vi' or 'en')
     *
     * @param string $lang
     * @return array
     */
    public static function get_dictionary( $lang = 'vi' ) {
        $lang = self::sanitize_lang( $lang );
        $option_name = self::OPTION_PREFIX . $lang;

        $data = get_option( $option_name, null );

        if ( ! empty( $data ) && is_array( $data ) ) {
            return $data;
        }

        // Fallback to default bundled JSON
        return self::get_default_dictionary( $lang );
    }

    /**
     * Read default dictionary from plugin file
     *
     * @param string $lang
     * @return array
     */
    public static function get_default_dictionary( $lang = 'vi' ) {
        $lang = self::sanitize_lang( $lang );
        $file_path = VIETTRI_TRANSLATIONS_PATH . 'defaults/default-' . $lang . '.json';

        if ( file_exists( $file_path ) ) {
            $json = file_get_contents( $file_path );
            $decoded = json_decode( $json, true );
            if ( is_array( $decoded ) ) {
                return $decoded;
            }
        }

        return array();
    }

    /**
     * Save dictionary data for specified language
     *
     * @param string $lang
     * @param array $data
     * @return bool
     */
    public static function save_dictionary( $lang, $data ) {
        $lang = self::sanitize_lang( $lang );
        $option_name = self::OPTION_PREFIX . $lang;

        // update_option with autoload = false (large JSON data shouldn't autoload on all WP requests)
        $updated = update_option( $option_name, $data, false );

        // Trigger Next.js revalidation webhook if configured
        self::trigger_nextjs_revalidate( $lang );

        return $updated;
    }

    /**
     * Reset dictionary data to default file
     *
     * @param string $lang
     * @return array
     */
    public static function reset_dictionary( $lang ) {
        $lang = self::sanitize_lang( $lang );
        $option_name = self::OPTION_PREFIX . $lang;

        delete_option( $option_name );
        self::trigger_nextjs_revalidate( $lang );

        return self::get_default_dictionary( $lang );
    }

    /**
     * Trigger Next.js revalidation webhook
     *
     * @param string $lang
     */
    public static function trigger_nextjs_revalidate( $lang ) {
        $webhook_url = get_option( self::OPTION_WEBHOOK, '' );
        $secret = get_option( self::OPTION_SECRET, '' );

        if ( empty( $webhook_url ) ) {
            return;
        }

        $url = add_query_arg( array(
            'lang'   => $lang,
            'secret' => $secret,
        ), $webhook_url );

        wp_remote_post( $url, array(
            'timeout'   => 5,
            'blocking'  => false, // Non-blocking asynchronous request
            'sslverify' => false,
        ) );
    }

    /**
     * Ensure valid language code
     *
     * @param string $lang
     * @return string
     */
    public static function sanitize_lang( $lang ) {
        return ( strtolower( trim( $lang ) ) === 'en' ) ? 'en' : 'vi';
    }
}
