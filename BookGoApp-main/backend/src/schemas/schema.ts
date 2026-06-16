import {
  sqliteTable,
  text,
  integer,
} from "drizzle-orm/sqlite-core";

/* =========================
   UF
========================= */

export const ufs = sqliteTable("ufs", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  nome: text("nome").notNull(),

  sigla: text("sigla").notNull(),
});

/* =========================
   CIDADE
========================= */

export const cidades = sqliteTable("cidades", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  nome: text("nome").notNull(),

  ufId: integer("uf_id")
    .references(() => ufs.id)
    .notNull(),
});

/* =========================
   USUÁRIOS
========================= */

export const usuarios = sqliteTable("usuarios", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  nome: text("nome").notNull(),

  email: text("email").notNull(),

  senha: text("senha").notNull(),

  perfil: text("perfil").default("usuario"),
});

/* =========================
   LIVROS
========================= */

export const livros = sqliteTable("livros", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  titulo: text("titulo").notNull(),

  autor: text("autor").notNull(),

  capa: text("capa").notNull(),

  disponivel: integer("disponivel").default(1),
});

/* =========================
   ALUGUÉIS
========================= */

export const alugueis = sqliteTable("alugueis", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  usuarioId: integer("usuario_id")
    .references(() => usuarios.id)
    .notNull(),

  livroId: integer("livro_id")
    .references(() => livros.id)
    .notNull(),

  dataAluguel: text("data_aluguel").notNull(),
});