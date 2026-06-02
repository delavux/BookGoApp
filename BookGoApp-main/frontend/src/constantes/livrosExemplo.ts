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
    id: "exemplo-1",
    titulo: "Comida como cultura",
    autor: "Massimo Montanari",
    nota: "4.8",
    capa: require("../../assets/imagens/livro-3.png"),
    paginas: "256",
    genero: "Cultura",
    autorDestaque: "Massimo Montanari",
    exemplo: true,
    descricao:
      "Uma reflexão sobre a relação entre alimentação e identidade cultural. O autor explora como os hábitos à mesa moldam sociedades, tradições e memórias coletivas em diferentes partes do mundo.",
  },
  {
    id: "exemplo-2",
    titulo: "O meu pé de Laranja Lima",
    autor: "José Mauro de Vasconcelos",
    autorResumo: "José Mauro de Vasconcelos",
    nota: "4.9",
    capa: require("../../assets/imagens/livro-2.png"),
    paginas: "342",
    genero: "Aventura",
    autorDestaque: "José Mauro de Vasconcelos",
    exemplo: true,
    descricao:
      "É um clássico de José Mauro de Vasconcelos, narra a infância de Zezé, um menino de 5 anos extremamente inteligente e sensível. Morando em uma família muito pobre e negligente no Rio de Janeiro, ele sofre agressões constantes. Seu refúgio é um pé de laranja-lima falante e seu amigo Manuel Valadares (o Portuga).",
  },
  {
    id: "exemplo-3",
    titulo: "A saga Wingfeather",
    autor: "Andrew Peterson",
    nota: "4.9",
    capa: require("../../assets/imagens/livro-1.png"),
    paginas: "480",
    genero: "Fantasia",
    autorDestaque: "Andrew Peterson",
    exemplo: true,
    descricao:
      "Uma épica jornada de fantasia que acompanha os irmãos Igiby em busca de seu destino. Entre criaturas misteriosas e reinos esquecidos, eles descobrem segredos sobre a própria família e o poder da coragem.",
  },
  {
    id: "exemplo-4",
    titulo: "Garota Silenciosa",
    autor: "Blake Pierce",
    nota: "4.7",
    capa: require("../../assets/imagens/livro-4.png"),
    paginas: "298",
    genero: "Suspense",
    autorDestaque: "Blake Pierce",
    exemplo: true,
    descricao:
      "Um suspense intenso que mergulha na mente de uma jovem envolvida em eventos inexplicáveis. Cada página revela novas pistas em um jogo perigoso entre verdade, silêncio e sobrevivência.",
  },
];

export const livroDestaqueBanner: LivroDetalhe = livrosExemplo[1];

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
