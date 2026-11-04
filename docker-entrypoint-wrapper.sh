#!/bin/bash
set -e

# Đảm bảo các thư mục tồn tại
mkdir -p /var/www/html/wp-content/plugins /var/www/html/wp-content/uploads

# Tự động đồng bộ plugin Viet Tri Translation Editor vào thư mục plugins của volume
if [ -d "/usr/src/wordpress/wp-content/plugins/viettri-translation-editor" ]; then
    cp -r /usr/src/wordpress/wp-content/plugins/viettri-translation-editor /var/www/html/wp-content/plugins/
fi

# Cấp quyền ghi cho www-data để sửa lỗi "Unable to create directory wp-content/uploads"
chown -R www-data:www-data /var/www/html/wp-content/uploads /var/www/html/wp-content/plugins
chmod -R 775 /var/www/html/wp-content/uploads /var/www/html/wp-content/plugins

# Gọi tiếp entrypoint gốc của WordPress Docker
exec docker-entrypoint.sh "$@"
