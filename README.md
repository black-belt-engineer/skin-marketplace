# Skin Marketplace Backend

## Getting Started

### Prerequisites

- Docker and Docker Compose installed on your system.

### Installation & Bootstrap

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd skin-marketplace
   ```

2. **Configure Environment Variables**:
   Create a `.env` file in the root directory. You can use the following default values for development:
   ```env
   # App configuration
   PORT=3000
   HOST=0.0.0.0

   # Database (PostgreSQL)
   POSTGRES_USER=user
   POSTGRES_PASSWORD=password
   POSTGRES_DB=skin_marketplace
   POSTGRES_HOST=postgres
   POSTGRES_PORT=5432

   # Cache (Redis)
   REDIS_HOST=redis
   REDIS_PORT=6379

   # External API
   SKINPORT_BASE_URL=https://api.skinport.com/v1
   ```

3. **Start the Application**:
   ```bash
   docker compose up --build
   ```
   This command will:
   - Build the Fastify application container.
   - Start PostgreSQL and Redis.
   - Automatically run migrations from the `migrations/` folder to initialize the `users` table and seed a test user.
