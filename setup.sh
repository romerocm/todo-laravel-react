#!/bin/bash

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check for required commands
if ! command_exists docker; then
    echo "Error: docker is not installed"
    exit 1
fi

if ! command_exists docker-compose; then
    echo "Error: docker-compose is not installed"
    exit 1
fi

# Stop and remove existing containers
echo "Cleaning up existing containers..."
docker-compose down

# Create root .env if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating root .env file..."
    cp .env.example .env
fi

# Initialize Laravel if composer.json doesn't exist
if [ ! -f backend/composer.json ]; then
    echo "Backend needs Laravel initialization. The script will:"
    echo "1. Back up your custom files (controllers, models, migrations, etc.)"
    echo "2. Back up your Dockerfile"
    echo "3. Install a fresh Laravel installation"
    echo "4. Restore your custom files and Dockerfile"
    read -p "Do you want to proceed? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        # Backup and restore process...
        if [ -d "backend" ]; then
            backup_dir="backend_backup_$(date +%Y%m%d_%H%M%S)"
            mkdir -p "$backup_dir"
            
            # Backup process...
            if [ -f "backend/Dockerfile" ]; then
                cp backend/Dockerfile "$backup_dir/"
                echo "✓ Backed up Dockerfile"
            fi
            
            for dir in app database routes config; do
                if [ -d "backend/$dir" ]; then
                    cp -r "backend/$dir" "$backup_dir/"
                    echo "✓ Backed up $dir directory"
                fi
            done
            
            echo "All custom files backed up to $backup_dir"
            rm -rf backend
        fi

        echo "Initializing Laravel project..."
        docker run --rm -v "$(pwd)":/app \
            composer create-project --prefer-dist laravel/laravel backend

        # Restore process...
        if [ -d "$backup_dir" ]; then
            echo "Restoring custom files..."
            if [ -f "$backup_dir/Dockerfile" ]; then
                cp "$backup_dir/Dockerfile" backend/
                echo "✓ Restored Dockerfile"
            fi
            
            for dir in app database routes config; do
                if [ -d "$backup_dir/$dir" ]; then
                    cp -r "$backup_dir/$dir"/* "backend/$dir/"
                    echo "✓ Restored $dir directory"
                fi
            done
            echo "All custom files have been restored"
        fi
    else
        echo "Setup cancelled"
        exit 1
    fi
fi

# Create Laravel .env
echo "Configuring Laravel environment..."
if [ ! -f backend/.env ]; then
    cp backend/.env.example backend/.env
fi

echo "Starting containers..."
docker-compose up -d --build

echo "Waiting for database to be ready..."
sleep 15

echo "Installing backend dependencies..."
docker-compose exec backend composer install

echo "Setting Laravel storage permissions..."
docker-compose exec backend chown -R www-data:www-data /var/www/html/storage
docker-compose exec backend chmod -R 775 /var/www/html/storage

echo "Generating Laravel app key..."
# Generate key and extract it
APP_KEY=$(docker-compose exec -T backend php artisan key:generate --show)
echo "Generated APP_KEY: $APP_KEY"

# Update the root .env file with the new APP_KEY
sed -i.bak "s|APP_KEY=.*|APP_KEY=$APP_KEY|g" .env
rm -f .env.bak

# Update Laravel .env file with the new APP_KEY
docker-compose exec backend sed -i "s|APP_KEY=.*|APP_KEY=$APP_KEY|g" .env

echo "Running migrations..."
docker-compose exec backend php artisan migrate:fresh --seed

echo "Installing frontend dependencies..."
docker-compose exec frontend npm install

echo "Setup completed! The application should be available at:"
echo "Frontend: http://localhost:3000"
echo "Backend: http://localhost:8000/api"

echo "
You can now run:
docker-compose logs -f    # To view logs
docker-compose ps         # To check container status
"

# Verify the key was set correctly
echo "Verifying APP_KEY in both environments:"
echo "Root .env APP_KEY:"
grep APP_KEY .env
echo "Laravel .env APP_KEY:"
docker-compose exec backend grep APP_KEY .env