import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import * as schema from './schema';
import { items } from './schema';

const sqlite = new Database('db.sqlite');
export const db: BetterSQLite3Database<typeof schema> = drizzle(sqlite, {
    schema,
});

// this is important to bring the schema into the database, otherwise the tables won't be created
migrate(db, { migrationsFolder: 'drizzle' });


async function seed() {
    await db.insert(items).values([
        { id: "001", name: "Teh", price: 5000, description: "Teh celup per sachet" },
        { id: "002", name: "Kopi", price: 7000, description: "Kopi instan per sachet" },
        { id: "003", name: "Garam", price: 3000, description: "Garam dapur per ons" },
        { id: "004", name: "Telur", price: 2000, description: "Telur ayam per butir" },
        { id: "005", name: "Minyak Goreng", price: 25000, description: "Minyak goreng per liter" },
        { id: "006", name: "Beras", price: 10000, description: "Beras putih per kilo" },
        { id: "007", name: "Gula", price: 9000, description: "Gula pasir per kilo" },
        { id: "008", name: "Mie Instan", price: 3000, description: "Mie instan per bungkus" },
        { id: "009", name: "Susu", price: 20000, description: "Susu cair per liter" },
        { id: "010", name: "Roti", price: 5000, description: "Roti tawar per bungkus" },
        { id: "011", name: "Detergen", price: 7000, description: "Detergen cair per botol" },
        { id: "012", name: "Sabun Mandi", price: 3000, description: "Sabun mandi batang" },
        { id: "013", name: "Shampoo", price: 15000, description: "Shampoo per botol" },
        { id: "014", name: "Pasta Gigi", price: 10000, description: "Pasta gigi per tube" },
        { id: "015", name: "Tisu", price: 5000, description: "Tisu per bungkus" },
        { id: "016", name: "Sapu", price: 20000, description: "Sapu lidi" },
        { id: "017", name: "Pembersih Lantai", price: 15000, description: "Pembersih lantai per botol" },
        { id: "018", name: "Pembersih Toilet", price: 20000, description: "Pembersih toilet per botol" },
        { id: "019", name: "Pembersih Piring", price: 7000, description: "Sabun cuci piring per botol" },
        { id: "020", name: "Pembersih Kaca", price: 10000, description: "Pembersih kaca per botol" },
        { id: "021", name: "Pembersih Mebel", price: 15000, description: "Pembersih mebel per botol" },
        { id: "022", name: "Pembersih Karpet", price: 20000, description: "Pembersih karpet per botol" },
        { id: "023", name: "Pembersih Serbaguna", price: 10000, description: "Pembersih serbaguna per botol" },
        { id: "024", name: "Pembersih Kamar Mandi", price: 15000, description: "Pembersih kamar mandi per botol" },
        { id: "025", name: "Pembersih Dapur", price: 20000, description: "Pembersih dapur per botol" },
        { id: "026", name: "Pembersih Lemari", price: 10000, description: "Pembersih lemari per botol" },
        { id: "027", name: "Pembersih Jendela", price: 15000, description: "Pembersih jendela per botol" },
        { id: "028", name: "Pembersih Meja", price: 20000, description: "Pembersih meja per botol" },
        { id: "029", name: "Pembersih Kursi", price: 10000, description: "Pembersih kursi per botol" },
        { id: "030", name: "Pembersih Sofa", price: 15000, description: "Pembersih sofa per botol" }
    ]);

}
// seed()

// sqlite.close()