#!/bin/bash

echo "Creating storage directory if it doesn't exist..."
docker-compose exec backend mkdir -p /var/www/html/storage/logs

echo "Setting correct permissions..."
docker-compose exec backend chown -R www-data:www-data /var/www/html/storage
docker-compose exec backend chmod -R 775 /var/www/html/storage

echo "Creating empty laravel.log file..."
docker-compose exec backend touch /var/www/html/storage/logs/laravel.log
docker-compose exec backend chown www-data:www-data /var/www/html/storage/logs/laravel.log

echo "Verifying storage directory structure..."
docker-compose exec backend ls -la /var/www/html/storage
docker-compose exec backend ls -la /var/www/html/storage/logs

echo "Testing log writing..."
docker-compose exec backend php artisan log:write "Test log entry"