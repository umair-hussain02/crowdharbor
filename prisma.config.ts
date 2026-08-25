import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    // Prefer a direct session connection for migrations, but do not require it
    // while generating the client (for example during a Vercel install).
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL,
  },
});
