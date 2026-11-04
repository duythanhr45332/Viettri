(function($) {
    'use strict';

    if (typeof viettriTranslations === 'undefined') {
        return;
    }

    const state = {
        activePage: 'common',
        activeMode: 'visual',
        searchQuery: '',
        data: {
            vi: JSON.parse(JSON.stringify(viettriTranslations.vi || {})),
            en: JSON.parse(JSON.stringify(viettriTranslations.en || {}))
        }
    };

    // Human-friendly labels for section headers
    const sectionLabels = {
        meta: 'Thông tin SEO & Metadata',
        header: 'Thanh điều hướng (Header & Menu)',
        footer: 'Chân trang (Footer & Liên hệ)',
        modal: 'Hộp thoại Đăng ký tư vấn (Modal Form)',
        hero: 'Banner chính (Hero)',
        gallery: 'Bộ sưu tập hình ảnh (Gallery)',
        intro: 'Giới thiệu & Tuyên ngôn (Intro)',
        villa: 'Thông số Villa Compound',
        features: 'Hệ sinh thái tiện ích (Features)',
        map: 'Vị trí & Kết nối vùng (Map)',
        products: 'Bộ sưu tập sản phẩm (Products)',
        partners: 'Đối tác & Chủ đầu tư (Partners)',
        slider: 'Trình chiếu hình ảnh di sản (Slider)',
        values: 'Giá trị độc bản (Values)',
        noor: 'Phân khu Noor',
        lj: 'Phân khu LJ & Ven hồ',
        family: 'Không gian Gia đình (Family)',
        ana: 'Dịch vụ Ana Services',
        comparison: 'So sánh thiết kế (Split Slider)',
        tropical: 'Dinh thự Contemporary Tropical',
        indochine: 'Dinh thự Modern Indochine'
    };

    $(document).ready(function() {
        initEvents();
        renderVisualFields();
    });

    function initEvents() {
        // Mode Switcher (Visual vs Code)
        $('.viettri-mode-btn').on('click', function() {
            const mode = $(this).data('mode');
            if (mode === state.activeMode) return;

            if (mode === 'code') {
                updateCodeEditors();
                $('#viettri-visual-container').hide();
                $('#viettri-code-container').show();
            } else {
                if (!syncFromCodeEditors()) return;
                renderVisualFields();
                $('#viettri-code-container').hide();
                $('#viettri-visual-container').show();
            }

            state.activeMode = mode;
            $('.viettri-mode-btn').removeClass('active');
            $(this).addClass('active');
        });

        // Page Navigation
        $('.viettri-page-btn').on('click', function() {
            state.activePage = $(this).data('page');
            $('.viettri-page-btn').removeClass('active');
            $(this).addClass('active');
            renderVisualFields();
        });

        // Search Filter
        $('#viettri-search-input').on('input', function() {
            state.searchQuery = $(this).val().toLowerCase().trim();
            filterFields();
        });

        // Code Editor Toolbar
        $('#btn-format-json').on('click', function() {
            try {
                const viVal = JSON.parse($('#viettri-json-editor-vi').val());
                const enVal = JSON.parse($('#viettri-json-editor-en').val());
                $('#viettri-json-editor-vi').val(JSON.stringify(viVal, null, 2));
                $('#viettri-json-editor-en').val(JSON.stringify(enVal, null, 2));
                showAlert('Đã định dạng mã JSON cho cả hai ngôn ngữ!', 'success');
            } catch (err) {
                showAlert('Lỗi cú pháp JSON: ' + err.message, 'error');
            }
        });

        $('#btn-validate-json').on('click', function() {
            try {
                JSON.parse($('#viettri-json-editor-vi').val());
                JSON.parse($('#viettri-json-editor-en').val());
                showAlert('Cú pháp JSON hoàn toàn hợp lệ cho cả hai ngôn ngữ!', 'success');
            } catch (err) {
                showAlert('Lỗi cú pháp JSON: ' + err.message, 'error');
            }
        });

        // Save Actions
        $('.viettri-btn-save').on('click', function() {
            saveDictionaries();
        });

        // Reset to default
        $('#btn-reset-default').on('click', function() {
            if (!confirm('Bạn có chắc chắn muốn khôi phục toàn bộ bản dịch Tiếng Việt và Tiếng Anh về mặc định ban đầu?')) {
                return;
            }
            resetDictionaries();
        });

        // Export JSON
        $('#btn-export-vi').on('click', function() {
            exportJsonFile('vi');
        });

        $('#btn-export-en').on('click', function() {
            exportJsonFile('en');
        });

        // Import JSON
        $('#import-file-input-vi').on('change', function(e) {
            importJsonFile(e.target.files[0], 'vi');
            $(this).val('');
        });

        $('#import-file-input-en').on('change', function(e) {
            importJsonFile(e.target.files[0], 'en');
            $(this).val('');
        });

        // Save Webhook Settings
        $('#btn-save-settings').on('click', function() {
            saveWebhookSettings();
        });
    }

    // Render 50/50 side by side visual form fields
    function renderVisualFields() {
        const viPage = (state.data.vi && state.data.vi[state.activePage]) || {};
        const enPage = (state.data.en && state.data.en[state.activePage]) || {};
        const $container = $('#viettri-form-fields');
        $container.empty();

        const allSectionKeys = Array.from(new Set([...Object.keys(viPage), ...Object.keys(enPage)]));

        if (allSectionKeys.length === 0) {
            $container.html('<p class="viettri-empty-desc">Chưa có dữ liệu cho trang này.</p>');
            return;
        }

        allSectionKeys.forEach(function(sectionKey) {
            const sectionTitle = sectionLabels[sectionKey] || sectionKey.toUpperCase();
            const $card = $('<div class="viettri-section-card" data-section="' + sectionKey + '"></div>');
            const $header = $(
                '<div class="viettri-section-header">' +
                    '<span class="viettri-section-title">' + escapeHtml(sectionTitle) + '</span>' +
                    '<span class="viettri-field-key">' + escapeHtml(sectionKey) + '</span>' +
                '</div>'
            );
            const $body = $('<div class="viettri-section-body"></div>');

            renderFieldsParallel(
                $body,
                [state.activePage, sectionKey],
                viPage[sectionKey],
                enPage[sectionKey]
            );

            $card.append($header).append($body);
            $container.append($card);
        });

        if (state.searchQuery) {
            filterFields();
        }
    }

    // Recursively render bilingual fields side by side (50/50)
    function renderFieldsParallel($parent, path, viVal, enVal) {
        // Determine whether this node is a primitive value, array, or object
        const isViPrimitive = viVal === null || viVal === undefined || typeof viVal === 'string' || typeof viVal === 'number' || typeof viVal === 'boolean';
        const isEnPrimitive = enVal === null || enVal === undefined || typeof enVal === 'string' || typeof enVal === 'number' || typeof enVal === 'boolean';

        if (isViPrimitive && isEnPrimitive) {
            // Leaf node: render bilingual 50/50 field row
            const fieldPath = path.join('.');
            const label = path[path.length - 1];
            const strVi = (viVal !== null && viVal !== undefined) ? String(viVal) : '';
            const strEn = (enVal !== null && enVal !== undefined) ? String(enVal) : '';

            const isLong = strVi.length > 50 || strEn.length > 50 || strVi.includes('\n') || strEn.includes('\n');

            const $row = $('<div class="viettri-field-row" data-field-path="' + escapeHtml(fieldPath) + '"></div>');
            
            // Header for field: human label and JSON key path
            const $label = $(
                '<div class="viettri-field-label">' +
                    '<span class="viettri-label-text">' + escapeHtml(label) + '</span>' +
                    '<span class="viettri-field-key">' + escapeHtml(fieldPath) + '</span>' +
                '</div>'
            );

            // 50/50 split container
            const $split = $('<div class="viettri-field-split"></div>');

            // Left: Vietnamese (50%)
            const $colVi = $('<div class="viettri-split-col viettri-split-vi"></div>');
            const $tagVi = $('<div class="viettri-input-tag"><span class="viettri-flag">🇻🇳</span> VN</div>');
            let $inputVi;
            if (isLong) {
                $inputVi = $('<textarea class="viettri-textarea" placeholder="Nội dung Tiếng Việt...">' + escapeHtml(strVi) + '</textarea>');
            } else {
                $inputVi = $('<input type="text" class="viettri-input" placeholder="Nội dung Tiếng Việt..." value="' + escapeHtml(strVi) + '" />');
            }

            $inputVi.on('input', function() {
                setDeepValue(state.data.vi, path, $(this).val());
            });
            $colVi.append($tagVi).append($inputVi);

            // Right: English (50%)
            const $colEn = $('<div class="viettri-split-col viettri-split-en"></div>');
            const $tagEn = $('<div class="viettri-input-tag"><span class="viettri-flag">🇬🇧</span> ENG</div>');
            let $inputEn;
            if (isLong) {
                $inputEn = $('<textarea class="viettri-textarea" placeholder="English translation...">' + escapeHtml(strEn) + '</textarea>');
            } else {
                $inputEn = $('<input type="text" class="viettri-input" placeholder="English translation..." value="' + escapeHtml(strEn) + '" />');
            }

            $inputEn.on('input', function() {
                setDeepValue(state.data.en, path, $(this).val());
            });
            $colEn.append($tagEn).append($inputEn);

            $split.append($colVi).append($colEn);
            $row.append($label).append($split);
            $parent.append($row);

        } else if (Array.isArray(viVal) || Array.isArray(enVal)) {
            const arrVi = Array.isArray(viVal) ? viVal : [];
            const arrEn = Array.isArray(enVal) ? enVal : [];
            const maxLen = Math.max(arrVi.length, arrEn.length);

            for (let i = 0; i < maxLen; i++) {
                renderFieldsParallel($parent, path.concat(i), arrVi[i], arrEn[i]);
            }

        } else if (typeof viVal === 'object' || typeof enVal === 'object') {
            const objVi = (typeof viVal === 'object' && viVal !== null) ? viVal : {};
            const objEn = (typeof enVal === 'object' && enVal !== null) ? enVal : {};
            const subKeys = Array.from(new Set([...Object.keys(objVi), ...Object.keys(objEn)]));

            subKeys.forEach(function(subKey) {
                renderFieldsParallel($parent, path.concat(subKey), objVi[subKey], objEn[subKey]);
            });
        }
    }

    // Set deep nested property in object
    function setDeepValue(obj, path, value) {
        if (!obj || typeof obj !== 'object') return;
        let current = obj;
        for (let i = 0; i < path.length - 1; i++) {
            const key = path[i];
            if (!current[key] || typeof current[key] !== 'object') {
                current[key] = isNaN(path[i + 1]) ? {} : [];
            }
            current = current[key];
        }
        current[path[path.length - 1]] = value;
    }

    // Filter fields based on search query
    function filterFields() {
        const query = state.searchQuery;
        if (!query) {
            $('.viettri-section-card, .viettri-field-row').show();
            return;
        }

        $('.viettri-section-card').each(function() {
            let cardHasMatch = false;
            $(this).find('.viettri-field-row').each(function() {
                const label = $(this).find('.viettri-field-label').text().toLowerCase();
                const viText = $(this).find('.viettri-split-vi input, .viettri-split-vi textarea').val().toLowerCase();
                const enText = $(this).find('.viettri-split-en input, .viettri-split-en textarea').val().toLowerCase();

                if (label.includes(query) || viText.includes(query) || enText.includes(query)) {
                    $(this).show();
                    cardHasMatch = true;
                } else {
                    $(this).hide();
                }
            });

            if (cardHasMatch) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    // Sync visual data into Code Editors
    function updateCodeEditors() {
        $('#viettri-json-editor-vi').val(JSON.stringify(state.data.vi || {}, null, 2));
        $('#viettri-json-editor-en').val(JSON.stringify(state.data.en || {}, null, 2));
    }

    // Sync Code Editors back into state
    function syncFromCodeEditors() {
        try {
            const viVal = $('#viettri-json-editor-vi').val();
            const enVal = $('#viettri-json-editor-en').val();
            const parsedVi = JSON.parse(viVal);
            const parsedEn = JSON.parse(enVal);
            state.data.vi = parsedVi;
            state.data.en = parsedEn;
            return true;
        } catch (err) {
            showAlert('Lỗi cú pháp JSON: ' + err.message, 'error');
            return false;
        }
    }

    // Save both dictionaries
    function saveDictionaries() {
        if (state.activeMode === 'code') {
            if (!syncFromCodeEditors()) return;
        }

        const $buttons = $('.viettri-btn-save');
        $buttons.prop('disabled', true).text('Đang lưu...');

        $.ajax({
            url: viettriTranslations.apiUrl + '/save-dictionary',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                dictionaries: {
                    vi: state.data.vi,
                    en: state.data.en
                }
            }),
            beforeSend: function(xhr) {
                xhr.setRequestHeader('X-WP-Nonce', viettriTranslations.nonce);
            },
            success: function(res) {
                showAlert(res.message || 'Đã lưu thành công cả 2 bản dịch Tiếng Việt và Tiếng Anh!', 'success');
            },
            error: function(xhr) {
                const msg = xhr.responseJSON && xhr.responseJSON.message ? xhr.responseJSON.message : 'Có lỗi xảy ra khi lưu dữ liệu.';
                showAlert(msg, 'error');
            },
            complete: function() {
                $buttons.prop('disabled', false).text('Lưu Thay Đổi');
            }
        });
    }

    // Reset both dictionaries
    function resetDictionaries() {
        $.ajax({
            url: viettriTranslations.apiUrl + '/reset-dictionary',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                lang: 'all'
            }),
            beforeSend: function(xhr) {
                xhr.setRequestHeader('X-WP-Nonce', viettriTranslations.nonce);
            },
            success: function(res) {
                if (res.dictionaries) {
                    state.data.vi = res.dictionaries.vi || {};
                    state.data.en = res.dictionaries.en || {};
                }
                if (state.activeMode === 'visual') {
                    renderVisualFields();
                } else {
                    updateCodeEditors();
                }
                showAlert(res.message || 'Đã khôi phục toàn bộ bản dịch về mặc định ban đầu.', 'success');
            },
            error: function() {
                showAlert('Không thể khôi phục dữ liệu mặc định.', 'error');
            }
        });
    }

    // Export single JSON file
    function exportJsonFile(lang) {
        if (state.activeMode === 'code') {
            syncFromCodeEditors();
        }

        const filename = lang + '.json';
        const jsonStr = JSON.stringify(state.data[lang], null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const $link = $('<a></a>')
            .attr('href', url)
            .attr('download', filename)
            .appendTo('body');

        $link[0].click();
        $link.remove();
        URL.revokeObjectURL(url);
    }

    // Import single JSON file
    function importJsonFile(file, lang) {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const parsed = JSON.parse(e.target.result);
                state.data[lang] = parsed;
                if (state.activeMode === 'visual') {
                    renderVisualFields();
                } else {
                    updateCodeEditors();
                }
                showAlert('Tải lên thành công file ' + lang + '.json!', 'success');
            } catch (err) {
                showAlert('Tệp tin không đúng định dạng JSON: ' + err.message, 'error');
            }
        };
        reader.readAsText(file);
    }

    // Save Webhook Settings
    function saveWebhookSettings() {
        const url = $('#viettri_nextjs_revalidate_url').val().trim();
        const secret = $('#viettri_nextjs_revalidate_secret').val().trim();

        $.post(ajaxurl, {
            action: 'viettri_save_webhook_settings',
            _ajax_nonce: viettriTranslations.nonce,
            url: url,
            secret: secret
        }).done(function() {
            showAlert('Đã lưu cài đặt Webhook Next.js!', 'success');
        });
    }

    // Show temporary alert banner
    function showAlert(message, type) {
        const $banner = $('#viettri-alert-banner');
        $banner.removeClass('success error').addClass(type).html(message).slideDown(200);

        setTimeout(function() {
            $banner.slideUp(200);
        }, 5000);
    }

    function escapeHtml(text) {
        if (!text) return '';
        return String(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

})(jQuery);
