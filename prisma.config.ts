import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    // Migrate/db push need a direct (non-pgbouncer) session connection.
    url: env('DIRECT_URL'),
  },
});
