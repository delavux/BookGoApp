import express from "express";
import cors from "cors";
import routes from "./routes/routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("BookGo API funcionando");
});

app.listen(3333, () => {
  console.log("Servidor rodando na porta 3333");
});