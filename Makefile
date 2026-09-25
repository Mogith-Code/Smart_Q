.PHONY: dev-up dev-down migrate seed test help

help:
	@echo "SmartQ Development Commands:"
	@echo "  make dev-up       - Start all Docker containers"
	@echo "  make dev-down     - Stop all Docker containers"
	@echo "  make migrate      - Run database migrations"
	@echo "  make seed         - Seed test institutions and services"
	@echo "  make test         - Run backend and AI unit tests"

dev-up:
	docker-compose up -d

dev-down:
	docker-compose down

migrate:
	docker-compose exec backend alembic upgrade head

seed:
	docker-compose exec backend python seeds/seed_institutions.py
	docker-compose exec backend python seeds/seed_services.py

test:
	docker-compose exec backend pytest tests/
	docker-compose exec ai pytest tests/
