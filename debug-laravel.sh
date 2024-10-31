#!/bin/bash

echo "1. Checking Laravel version..."
docker-compose exec backend php artisan --version

echo -e "\n2. Checking PHP version and modules..."
docker-compose exec backend php -v
docker-compose exec backend php -m

echo -e "\n3. Verifying storage permissions..."
docker-compose exec backend ls -la storage/
docker-compose exec backend ls -la storage/logs/

echo -e "\n4. Clearing all caches..."
docker-compose exec backend php artisan cache:clear
docker-compose exec backend php artisan config:clear
docker-compose exec backend php artisan route:clear
docker-compose exec backend php artisan view:clear

echo -e "\n5. Listing all routes..."
docker-compose exec backend php artisan route:list

echo -e "\n6. Checking nginx configuration..."
docker-compose exec nginx nginx -t

echo -e "\n7. Testing basic route..."
curl -v http://localhost:8000

echo -e "\n8. Testing API route..."
curl -v http://localhost:8000/api/test

echo -e "\n9. Checking Laravel configuration..."
docker-compose exec backend php artisan config:cache

echo -e "\n10. Checking Laravel logs..."
docker-compose exec backend tail -f storage/logs/laravel.log