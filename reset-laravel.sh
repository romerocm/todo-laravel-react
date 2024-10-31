#!/bin/bash

echo "Stopping containers..."
docker-compose down

echo "Clearing Laravel caches..."
rm -rf backend/bootstrap/cache/*.php
rm -rf backend/storage/framework/cache/*
rm -rf backend/storage/framework/views/*
rm -rf backend/storage/framework/sessions/*

echo "Starting containers..."
docker-compose up -d

echo "Waiting for containers to be ready..."
sleep 10

echo "Installing composer dependencies..."
docker-compose exec backend composer install

echo "Setting storage permissions..."
docker-compose exec backend chown -R www-data:www-data storage bootstrap/cache
docker-compose exec backend chmod -R 775 storage bootstrap/cache

echo "Generating application key..."
docker-compose exec backend php artisan key:generate

echo "Clearing all caches..."
docker-compose exec backend php artisan config:clear
docker-compose exec backend php artisan cache:clear
docker-compose exec backend php artisan route:clear
docker-compose exec backend php artisan view:clear

echo "Running migrations..."
docker-compose exec backend php artisan migrate:fresh --seed

echo "Verifying Laravel installation..."
docker-compose exec backend php artisan --version

echo "Testing API endpoint..."
curl http://localhost:8000/api/test

echo "Done! Your Laravel application should now be properly initialized."