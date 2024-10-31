# Todo List Application

A full-stack Todo List application built with React and Laravel.

## Requirements

- Docker
- Docker Compose

## Quick Start

1. Clone the repository:

```bash
git clone <repository-url>
cd todo-list
```

2. Run the setup script:

```bash
chmod +x setup.sh
./setup.sh
```

The script will:

- Create necessary environment files
- Start Docker containers
- Install dependencies
- Run database migrations
- Build frontend assets

## Manual Setup

If you prefer to set up manually:

1. Copy environment files:

```bash
cp .env.example .env
cp backend/.env.example backend/.env
```

2. Start the containers:

```bash
docker-compose up -d
```

3. Install dependencies and set up the application:

```bash
# Backend setup
docker-compose exec backend composer install
docker-compose exec backend php artisan key:generate
docker-compose exec backend php artisan migrate

# Frontend setup
docker-compose exec frontend npm install
docker-compose exec frontend npm run dev
```

## Accessing the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api

## Data Persistence

The MySQL data is persisted in a Docker volume named `mysql_data`. This means your data will survive container restarts and removals.

To completely reset the database:

```bash
# Remove containers and volume
docker-compose down -v

# Restart the application
docker-compose up -d
```

## Development

To start development servers:

```bash
# Watch frontend changes
docker-compose exec frontend npm run dev

# Monitor backend logs
docker-compose logs -f backend
```

## Available API Endpoints

- GET /api/tasks - List all tasks
- POST /api/tasks - Create a new task
- PUT /api/tasks/{id} - Update a task
- DELETE /api/tasks/{id} - Delete a task
- GET /api/categories - List all categories
- POST /api/categories - Create a new category
- DELETE /api/categories/{id} - Delete a category
