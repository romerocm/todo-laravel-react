#!/bin/bash

echo "Clearing Laravel caches..."
docker-compose exec backend php artisan config:clear
docker-compose exec backend php artisan route:clear
docker-compose exec backend php artisan cache:clear
docker-compose exec backend php artisan view:clear

echo "Optimizing Laravel..."
docker-compose exec backend php artisan config:cache
docker-compose exec backend php artisan route:cache

echo "Checking route list..."
docker-compose exec backend php artisan route:list

echo "Testing API endpoint..."
curl -v http://localhost:8000/api/test