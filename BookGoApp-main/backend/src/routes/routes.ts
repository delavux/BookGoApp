import { Router } from "express";

import { db } from "../database";
import { livros } from "../schemas/schema";

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

export default router;