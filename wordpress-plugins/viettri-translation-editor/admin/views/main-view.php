<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
?>
<div class="wrap viettri-translations-wrap">
    <div class="viettri-header">
        <div class="viettri-header-brand">
            <div>
                <h1 class="viettri-title">Quản Lý Bản Dịch Website</h1>
                <p class="viettri-subtitle">Viet Tri Legacy Lakeside — Chỉnh sửa trực tiếp nội dung Song ngữ</p>
            </div>
        </div>
        <div class="viettri-header-actions">
            <div class="viettri-mode-group">
                <button type="button" class="viettri-mode-btn active" data-mode="visual">Giao diện Trực quan</button>
                <button type="button" class="viettri-mode-btn" data-mode="code">Mã nguồn JSON</button>
            </div>
            <button type="button" class="button button-primary viettri-btn-save" id="btn-save-top">
                Lưu Thay Đổi
            </button>
        </div>
    </div>

    <!-- Alert Message Banner -->
    <div id="viettri-alert-banner" class="viettri-alert" style="display: none;"></div>

    <!-- VISUAL EDITOR CONTAINER (50/50 Split) -->
    <div id="viettri-visual-container" class="viettri-editor-box">
        <!-- Page Navigation & Search Bar -->
        <div class="viettri-pages-bar">
            <div class="viettri-page-nav">
                <button type="button" class="viettri-page-btn active" data-page="common">Dùng chung</button>
                <button type="button" class="viettri-page-btn" data-page="home">Trang chủ</button>
                <button type="button" class="viettri-page-btn" data-page="about">Giới thiệu</button>
                <button type="button" class="viettri-page-btn" data-page="livingSpace">Không gian sống</button>
                <button type="button" class="viettri-page-btn" data-page="theVillas">Dòng sản phẩm</button>
            </div>
            <div class="viettri-search-wrapper">
                <input type="text" id="viettri-search-input" placeholder="Tìm kiếm từ khóa..." />
            </div>
        </div>

        <!-- 50/50 Column Headers Sticky Bar -->
        <div class="viettri-columns-header">
            <div class="viettri-col-header viettri-col-vi">
                <span class="viettri-flag">🇻🇳</span> Tiếng Việt (vi.json)
            </div>
            <div class="viettri-col-header viettri-col-en">
                <span class="viettri-flag">🇬🇧</span> Tiếng Anh (en.json)
            </div>
        </div>

        <!-- Dynamic Form Fields Area -->
        <div id="viettri-form-fields" class="viettri-form-fields">
            <!-- Rendered 50/50 side by side by admin-script.js -->
        </div>
    </div>

    <!-- CODE EDITOR CONTAINER (JSON 50/50) -->
    <div id="viettri-code-container" class="viettri-editor-box" style="display: none;">
        <div class="viettri-code-toolbar">
            <div class="viettri-code-info">
                Chỉnh sửa trực tiếp file JSON song ngữ
            </div>
            <div class="viettri-code-actions">
                <button type="button" class="button" id="btn-format-json">Làm đẹp mã</button>
                <button type="button" class="button" id="btn-validate-json">Kiểm tra cú pháp</button>
            </div>
        </div>
        <div class="viettri-code-split">
            <div class="viettri-code-col">
                <div class="viettri-code-col-title">
                    <span class="viettri-flag">🇻🇳</span> vi.json
                </div>
                <textarea id="viettri-json-editor-vi" spellcheck="false"></textarea>
            </div>
            <div class="viettri-code-col">
                <div class="viettri-code-col-title">
                    <span class="viettri-flag">🇬🇧</span> en.json
                </div>
                <textarea id="viettri-json-editor-en" spellcheck="false"></textarea>
            </div>
        </div>
    </div>

    <!-- Bottom Actions Bar -->
    <div class="viettri-footer-bar">
        <div class="viettri-footer-left">
            <button type="button" class="button button-primary button-hero viettri-btn-save" id="btn-save-bottom">
                Lưu Thay Đổi
            </button>
            <button type="button" class="button" id="btn-export-vi">
                Tải về <span class="viettri-flag">🇻🇳</span> vi.json
            </button>
            <button type="button" class="button" id="btn-export-en">
                Tải về <span class="viettri-flag">🇬🇧</span> en.json
            </button>
            <label class="button" for="import-file-input-vi">
                Tải lên <span class="viettri-flag">🇻🇳</span>
                <input type="file" id="import-file-input-vi" accept=".json,application/json" style="display: none;" />
            </label>
            <label class="button" for="import-file-input-en">
                Tải lên <span class="viettri-flag">🇬🇧</span>
                <input type="file" id="import-file-input-en" accept=".json,application/json" style="display: none;" />
            </label>
        </div>
        <div class="viettri-footer-right">
            <button type="button" class="button button-link-delete" id="btn-reset-default">
                Khôi phục mặc định ban đầu
            </button>
        </div>
    </div>

    <!-- Advanced Settings: Next.js Revalidation -->
    <div class="viettri-advanced-box">
        <details>
            <summary>
                <strong>Cài đặt đồng bộ Webhook Next.js</strong>
            </summary>
            <div class="viettri-advanced-content">
                <p class="description">
                    Khi khách hàng bấm <strong>Lưu Thay Đổi</strong>, WordPress có thể tự động gửi tín hiệu Webhook để Next.js xóa cache (ISR revalidate) tức thì.
                </p>
                <table class="form-table" role="presentation">
                    <tbody>
                        <tr>
                            <th scope="row"><label for="viettri_nextjs_revalidate_url">Webhook Revalidate URL</label></th>
                            <td>
                                <input type="url" id="viettri_nextjs_revalidate_url" class="regular-text" placeholder="https://viettrilegacylakeside.vn/api/revalidate-dictionary" value="<?php echo esc_attr( $webhook_url ); ?>" />
                                <p class="description">URL API của Next.js (ví dụ <code>https://viettrilegacylakeside.vn/api/revalidate-dictionary</code>).</p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label for="viettri_nextjs_revalidate_secret">Bí mật xác thực (Secret Key)</label></th>
                            <td>
                                <input type="password" id="viettri_nextjs_revalidate_secret" class="regular-text" placeholder="viettri_secret_token_123" value="<?php echo esc_attr( $secret ); ?>" />
                                <p class="description">Mã bảo vệ để đảm bảo chỉ có WordPress gửi request revalidate hợp lệ.</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type="button" class="button" id="btn-save-settings">Lưu Cài Đặt Webhook</button>
            </div>
        </details>
    </div>
</div>
