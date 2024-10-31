#!/bin/bash

echo "Testing backend API..."
curl -v http://localhost:8000/api/test

echo -e "\nTesting backend debug endpoint..."
curl -v http://localhost:8000/api/debug

echo -e "\nChecking Laravel logs..."
docker-compose exec backend tail -n 50 storage/logs/laravel.log

echo -e "\nChecking Nginx error logs..."
docker-compose exec nginx tail -n 50 /var/log/nginx/error.log

echo -e "\nChecking PHP-FPM logs..."
docker-compose exec backend tail -n 50 /usr/local/etc/php-fpm.log