import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

const sqlite = new Database("sqlite.db");

export const db = drizzle(sqlite);

/* =========================
   CRIAR TABELAS
========================= */

sqlite.exec(`
  CREATE TABLE IF NOT EXISTS livros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    autor TEXT NOT NULL,
    capa TEXT NOT NULL,
    disponivel INTEGER DEFAULT 1
  );
`);

console.log("Banco SQLite conectado");