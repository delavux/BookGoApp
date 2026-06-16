import { ImageSourcePropType } from "react-native";

export type LivroDetalhe = {
  id: string;
  titulo: string;
  autor: string;
  autorResumo?: string;
  nota: string;
  capa: ImageSourcePropType;
  paginas: string;
  genero: string;
  descricao: string;
  autorDestaque: string;
  exemplo: boolean;
  capaRemota?: string;
};

export type LivroExemplo = LivroDetalhe & {
  exemplo: true;
};

export const livrosExemplo: LivroExemplo[] = [
  {
    id: "1",
    titulo: "Clean Code",
    autor: "Robert C. Martin",
    nota: "4.9",
    capa: {
      uri: "https://m.media-amazon.com/images/I/41xShlnTZTL.jpg",
    } as any,
    paginas: "464",
    genero: "Programação",
    autorDestaque: "Robert C. Martin",
    exemplo: true,
    descricao:
      "Um dos livros mais importantes sobre boas práticas de desenvolvimento de software.",
  },

  {
    id: "2",
    titulo: "O Hobbit",
    autor: "J.R.R Tolkien",
    nota: "4.9",
    capa: {
      uri: "https://m.media-amazon.com/images/I/91M9xPIf10L.jpg",
    } as any,
    paginas: "336",
    genero: "Fantasia",
    autorDestaque: "J.R.R Tolkien",
    exemplo: true,
    descricao:
      "A clássica aventura de Bilbo Bolseiro rumo à Montanha Solitária.",
  },

  {
    id: "3",
    titulo: "1984",
    autor: "George Orwell",
    nota: "4.8",
    capa: {
      uri: "https://m.media-amazon.com/images/I/71kxa1-0mfL.jpg",
    } as any,
    paginas: "416",
    genero: "Distopia",
    autorDestaque: "George Orwell",
    exemplo: true,
    descricao:
      "Uma das obras mais influentes da literatura moderna sobre vigilância e controle social.",
  },
];

export function livroApiParaDetalhe(
  livro: { id: number; titulo: string; autor: string; capa: string },
  indice: number
): LivroDetalhe {
  const base = livrosExemplo[indice % livrosExemplo.length];
  return {
    id: String(livro.id),
    titulo: livro.titulo,
    autor: livro.autor,
    nota: base.nota,
    capa: { uri: livro.capa },
    capaRemota: livro.capa,
    paginas: base.paginas,
    genero: base.genero,
    descricao: `Conheça "${livro.titulo}", de ${livro.autor}. Uma obra disponível para aluguel na BookGo, pronta para fazer parte da sua próxima leitura.`,
    autorDestaque: livro.autor,
    exemplo: false,
  };
}

export function livroParaAluguel(detalhe: LivroDetalhe) {
  return {
    id: detalhe.exemplo ? detalhe.id : Number(detalhe.id),
    titulo: detalhe.titulo,
    autor: detalhe.autor,
    capa: detalhe.capaRemota || "",
  };
}
