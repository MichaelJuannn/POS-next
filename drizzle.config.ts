import type { Config } from 'drizzle-kit'

export default {
    schema: './db/schema.ts',
    out: './drizzle',
    driver: 'better-sqlite',
    breakpoints: true,
    dbCredentials: {
        url: 'sqlite.db'
    }
    , verbose: true
} satisfies Config