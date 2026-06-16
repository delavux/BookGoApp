
import { Router } from "express";

import { eq } from "drizzle-orm";

import { db } from "../database";

import {
  livros,
  usuarios,
  alugueis,
} from "../schemas/schema";

const router = Router();

/* =========================
   HOME
========================= */

router.get("/", (req, res) => {
  res.json({
    message: "BookGo API funcionando",
  });
});

/* =========================
   POPULAR LIVROS
========================= */

router.get("/popular", async (req, res) => {
  const existentes = await db.select().from(livros);

  if (existentes.length > 0) {
    return res.json({
      message: "Livros já cadastrados",
    });
  }

  await db.insert(livros).values([
    {
      titulo: "Clean Code",
      autor: "Robert C. Martin",
      capa:
        "https://m.media-amazon.com/images/I/41xShlnTZTL.jpg",
      disponivel: 1,
    },
    {
      titulo: "O Hobbit",
      autor: "J.R.R Tolkien",
      capa:
        "https://m.media-amazon.com/images/I/91M9xPIf10L.jpg",
      disponivel: 1,
    },
    {
      titulo: "1984",
      autor: "George Orwell",
      capa:
        "https://m.media-amazon.com/images/I/71kxa1-0mfL.jpg",
      disponivel: 1,
    },
  ]);

  res.json({
    message: "Livros inseridos",
  });
});

/* =========================
   LISTAR LIVROS
========================= */

router.get("/livros", async (req, res) => {
  const data = await db.select().from(livros);

  res.json(data);
});

/* =========================
   CADASTRO
========================= */

router.post("/cadastro", async (req, res) => {
  const { nome, email, senha } = req.body;

  await db.insert(usuarios).values({
    nome,
    email,
    senha,
  });

  res.json({
    message: "Usuário cadastrado",
  });
});

/* =========================
   LOGIN
========================= */

router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  const data = await db.select().from(usuarios);

  const usuario = data.find(
    (u) =>
      u.email === email &&
      u.senha === senha
  );

  if (!usuario) {
    return res.status(401).json({
      message: "Email ou senha inválidos",
    });
  }

  res.json({
    message: "Login realizado",
    usuario,
  });
});

/* =========================
   ALUGAR LIVRO
========================= */


router.post("/alugar", async (req, res) => {
  const { usuarioId, livroId } = req.body;

  await db.insert(alugueis).values({
    usuarioId: Number(usuarioId),
    livroId: Number(livroId),
    dataAluguel: new Date().toISOString(),
  });

  await db
    .update(livros)
    .set({
      disponivel: 0,
    })
    .where(eq(livros.id, Number(livroId)));

  res.json({
    message: "Livro alugado",
  });
});



/* =========================
   LISTAR ALUGUÉIS
========================= */

router.get("/alugueis", async (req, res) => {
  const data = await db.select().from(alugueis);

  res.json(data);
});

export default router;

