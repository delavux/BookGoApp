import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";


/* UF */
export const ufs = sqliteTable("ufs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  nome: text("nome").notNull(),
  sigla: text("sigla").notNull(),
});

/* CIDADE */
export const cidades = sqliteTable("cidades", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  nome: text("nome").notNull(),
  ufId: integer("uf_id").notNull(),
});

/* USUARIO */
export const usuarios = sqliteTable("usuarios", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  nome: text("nome").notNull(),
  email: text("email").notNull(),
  senha: text("senha").notNull(),
  perfil: text("perfil").default("usuario"),
});

/* LIVRO */
export const livros = sqliteTable("livros", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  titulo: text("titulo").notNull(),
  autor: text("autor").notNull(),
  capa: text("capa").notNull(),
  disponivel: integer("disponivel").default(1),
});

/* ALUGUEL */
export const alugueis = sqliteTable("alugueis", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  usuarioId: integer("usuario_id").notNull(),
  livroId: integer("livro_id").notNull(),
});