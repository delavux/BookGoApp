export const capasLivros = [
  require("../../assets/imagens/livro-3.png"),
  require("../../assets/imagens/livro-2.png"),
  require("../../assets/imagens/livro-4.png"),
  require("../../assets/imagens/livro-1.png"),
];

export const bannerDestaque = require("../../assets/imagens/banner-destaque.png");
export const ilustracaoCadastro = require("../../assets/imagens/cadastro-ilustracao.png");

export const notasLivros = ["4.8", "4.5", "4.9", "4.7"];

export function obterCapaLivro(indice: number, capaRemota?: string) {
  if (indice >= 0 && indice < capasLivros.length) {
    return capasLivros[indice];
  }
  if (capaRemota) {
    return { uri: capaRemota };
  }
  return capasLivros[0];
}
