import type { Config } from 'drizzle-kit'

export default {
    schema: './db/schema.ts',
    out: './drizzle',
    driver: 'better-sqlite',
    breakpoints: true,
    dbCredentials: {
        url: 'db.sqlite'
    }
    , verbose: true
} satisfies Config