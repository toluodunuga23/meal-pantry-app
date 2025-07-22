#!/bin/bash

# Meal Pantry App - Database Management Commands

echo "🥘 Meal Pantry App Database Commands"
echo "=================================="
echo ""

case "$1" in
  start)
    echo "Starting PostgreSQL container..."
    docker compose up -d
    echo "✅ Database started on port 5433"
    ;;
  stop)
    echo "Stopping PostgreSQL container..."
    docker compose down
    echo "✅ Database stopped"
    ;;
  studio)
    echo "Starting Prisma Studio..."
    echo "📊 Open http://localhost:5555 in your browser"
    npx prisma studio
    ;;
  migrate)
    echo "Running database migration..."
    npx prisma migrate dev
    ;;
  reset)
    echo "Resetting database..."
    npx prisma migrate reset
    ;;
  seed)
    echo "Seeding database with sample data..."
    npx prisma db seed
    ;;
  logs)
    echo "Showing database logs..."
    docker compose logs postgres -f
    ;;
  status)
    echo "Database container status:"
    docker ps | grep meal-pantry-postgres
    echo ""
    echo "Database connection test:"
    docker exec meal-pantry-postgres pg_isready -h localhost -p 5432
    ;;
  *)
    echo "Usage: $0 {start|stop|studio|migrate|reset|seed|logs|status}"
    echo ""
    echo "Commands:"
    echo "  start   - Start the PostgreSQL container"
    echo "  stop    - Stop the PostgreSQL container"
    echo "  studio  - Open Prisma Studio (localhost:5555)"
    echo "  migrate - Run database migrations"
    echo "  reset   - Reset database (WARNING: deletes all data)"
    echo "  seed    - Seed database with sample data"
    echo "  logs    - Show database container logs"
    echo "  status  - Check database status"
    echo ""
    exit 1
    ;;
esac 