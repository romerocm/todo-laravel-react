#!/bin/bash

echo "1. Clearing route cache..."
docker-compose exec backend php artisan route:clear

echo "2. Clearing config cache..."
docker-compose exec backend php artisan config:clear

echo "3. Clearing application cache..."
docker-compose exec backend php artisan cache:clear

echo "4. Restarting Laravel queue..."
docker-compose exec backend php artisan queue:restart

echo "5. List all routes..."
docker-compose exec backend php artisan route:list

echo "6. Testing routes..."
echo -e "\nTesting root API endpoint..."
curl -v http://localhost:8000/api

echo -e "\nTesting /api/test endpoint..."
curl -v http://localhost:8000/api/test

echo -e "\nTesting /api/health endpoint..."
curl -v http://localhost:8000/api/health

echo "7. Checking Laravel logs..."
docker-compose exec backend tail -n 50 storage/logs/laravel.log