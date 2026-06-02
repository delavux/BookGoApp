import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { api } from "../servicos/api";
import { obterItem } from "../servicos/armazenamento";
import { cores } from "../tema/cores";
import { bannerDestaque, obterCapaLivro } from "../constantes/imagensLivros";
import {
  livrosExemplo,
  livroApiParaDetalhe,
  livroDestaqueBanner,
  LivroDetalhe,
} from "../constantes/livrosExemplo";
import CartaoLivro from "../componentes/CartaoLivro";
import BarraNavegacao from "../componentes/BarraNavegacao";

const categorias = [
  "Todos",
  "Romance",
  "Ficção",
  "Fantasia",
  "Mistério",
  "História",
];

export default function TelaInicio({ navigation }: any) {
  const [livros, setLivros] = useState<any[]>([]);
  const [busca, setBusca] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  const [usuarioLogado, setUsuarioLogado] = useState(false);
  const [primeiroNome, setPrimeiroNome] = useState("Visitante");

  useFocusEffect(
    useCallback(() => {
      let ativo = true;

      (async () => {
        const logado = await obterItem("logado");
        if (ativo) {
          setUsuarioLogado(logado === "true");
        }

        const usuarioSalvo = await obterItem("usuario");
        if (!ativo) {
          return;
        }

        if (usuarioSalvo) {
          try {
            const usuario = JSON.parse(usuarioSalvo);
            const nome = usuario.nome?.trim();
            if (nome) {
              setPrimeiroNome(nome.split(" ")[0]);
              return;
            }
          } catch {}
        }

        setPrimeiroNome("Visitante");
      })();

      return () => {
        ativo = false;
      };
    }, [])
  );

  useEffect(() => {
    buscarLivros();
  }, []);

  async function buscarLivros() {
    try {
      const response = await api.get("/livros");
      console.log("LIVROS:");
      console.log(response.data);
      setLivros(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const exemplosFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    if (!termo) {
      return livrosExemplo;
    }
    return livrosExemplo.filter(
      (livro) =>
        livro.titulo.toLowerCase().includes(termo) ||
        livro.autor.toLowerCase().includes(termo)
    );
  }, [busca]);

  const livrosApiFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    if (!termo) {
      return livros;
    }
    return livros.filter(
      (livro) =>
        livro.titulo?.toLowerCase().includes(termo) ||
        livro.autor?.toLowerCase().includes(termo)
    );
  }, [livros, busca]);

  const livrosParaExibir = useMemo(() => {
    const daApi = livrosApiFiltrados.map((livro, indice) => {
      const detalhe = livroApiParaDetalhe(livro, indice);
      return {
        ...detalhe,
        capa: obterCapaLivro(indice, livro.capa),
        capaRemota: livro.capa,
        livroApi: livro,
      };
    });

    if (!usuarioLogado) {
      return exemplosFiltrados;
    }

    return [...exemplosFiltrados, ...daApi];
  }, [exemplosFiltrados, livrosApiFiltrados, usuarioLogado]);

  const larguraGrade = Dimensions.get("window").width - 40;
  const larguraCartao = (larguraGrade - 16) / 2;

  function aoVerDetalhes(livro: LivroDetalhe) {
    navigation.navigate("DetalheLivro", { livro });
  }

  return (
    <View style={estilos.raiz}>
      <SafeAreaView style={estilos.seguroTopo} edges={["top"]}>
        <View style={estilos.cabecalho}>
          <View style={estilos.cabecalhoEsquerda}>
            <View style={estilos.avatar}>
              <MaterialIcons
                name="person"
                size={22}
                color={cores.sobreSecundariaContainer}
              />
            </View>
            <View>
              <Text style={estilos.saudacao}>Olá, {primeiroNome}</Text>
              <Text style={estilos.marca}>BookGo</Text>
            </View>
          </View>
          <View style={estilos.cabecalhoAcoes}>
            <Pressable style={estilos.botaoIcone}>
              <MaterialIcons
                name="notifications-none"
                size={24}
                color={cores.sobreSuperficieVariante}
              />
            </Pressable>
            <Pressable style={estilos.botaoIcone}>
              <MaterialIcons name="search" size={24} color={cores.primaria} />
            </Pressable>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView
        style={estilos.rolagem}
        contentContainerStyle={estilos.conteudoRolagem}
        showsVerticalScrollIndicator={false}
      >
        <View style={estilos.buscaEnvoltorio}>
          <MaterialIcons
            name="search"
            size={22}
            color={cores.contorno}
            style={estilos.buscaIcone}
          />
          <TextInput
            placeholder="Buscar por título ou autor"
            placeholderTextColor={cores.contorno}
            value={busca}
            onChangeText={setBusca}
            style={estilos.buscaEntrada}
          />
        </View>

        <View style={estilos.banner}>
          <Image source={bannerDestaque} style={estilos.bannerImagem} />
          <View style={estilos.bannerSobreposicao}>
            <View style={estilos.bannerEtiqueta}>
              <Text style={estilos.bannerEtiquetaTexto}>Destaque da Semana</Text>
            </View>
            <Text style={estilos.bannerTitulo}>O Silêncio da Floresta</Text>
            <Text style={estilos.bannerAutor}>LEE HON KONG</Text>
            <TouchableOpacity
              style={estilos.bannerBotao}
              activeOpacity={0.9}
              onPress={() => aoVerDetalhes(livroDestaqueBanner)}
            >
              <Text style={estilos.bannerBotaoTexto}>Ver Detalhes</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={estilos.secaoCabecalho}>
          <Text style={estilos.secaoTitulo}>Categorias</Text>
          <Pressable>
            <Text style={estilos.secaoLink}>Ver tudo</Text>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={estilos.linhaChips}
        >
          {categorias.map((cat) => {
            const ativa = categoriaAtiva === cat;
            return (
              <Pressable
                key={cat}
                onPress={() => setCategoriaAtiva(cat)}
                style={[estilos.chip, ativa && estilos.chipAtivo]}
              >
                <Text style={[estilos.chipTexto, ativa && estilos.chipTextoAtivo]}>
                  {cat}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <Text style={[estilos.secaoTitulo, estilos.tituloLivros]}>
          Livros Disponíveis
        </Text>

        <View style={estilos.grade}>
          {livrosParaExibir.map((item) => (
            <View
              key={item.id}
              style={{ width: larguraCartao, marginBottom: 16 }}
            >
              <CartaoLivro
                titulo={item.titulo}
                autor={item.autor}
                nota={item.nota}
                capa={item.capa}
                aoPressionar={() => aoVerDetalhes(item)}
                aoAdicionar={() => aoVerDetalhes(item)}
              />
            </View>
          ))}
        </View>

        {!usuarioLogado ? (
          <View style={estilos.acessoRapido}>
            <Text style={estilos.acessoRapidoTexto}>
              Entre para alugar livros do catálogo completo
            </Text>
            <View style={estilos.acessoBotoes}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Entrar")}
                style={estilos.botaoPrimario}
                activeOpacity={0.9}
              >
                <Text style={estilos.botaoPrimarioTexto}>Entrar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Cadastro")}
                style={estilos.botaoContorno}
                activeOpacity={0.9}
              >
                <Text style={estilos.botaoContornoTexto}>Criar Conta</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </ScrollView>

      <BarraNavegacao abaAtiva="inicio" />
    </View>
  );
}

const estilos = StyleSheet.create({
  raiz: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  seguroTopo: {
    backgroundColor: "rgba(248, 249, 255, 0.92)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(189, 202, 192, 0.25)",
  },
  cabecalho: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  cabecalhoEsquerda: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: cores.secundariaContainer,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(0, 108, 75, 0.1)",
  },
  saudacao: {
    fontSize: 11,
    fontWeight: "500",
    color: cores.sobreSuperficieVariante,
  },
  marca: {
    fontSize: 20,
    fontWeight: "700",
    color: cores.primaria,
    letterSpacing: -0.3,
  },
  cabecalhoAcoes: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  botaoIcone: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
  },
  rolagem: {
    flex: 1,
  },
  conteudoRolagem: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
  },
  buscaEnvoltorio: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: cores.superficieContainerBaixa,
    borderRadius: 12,
    minHeight: 56,
    marginBottom: 32,
    shadowColor: "#1f2937",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius:  8,
    elevation: 1,
  },
  buscaIcone: {
    marginLeft: 16,
  },
  buscaEntrada: {
    flex: 1,
    fontSize: 16,
    color: cores.sobreSuperficie,
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  banner: {
    height: 192,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 32,
    shadowColor: "#1f2937",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  bannerImagem: {
    width: "100%",
    height: "100%",
  },
  bannerSobreposicao: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(18, 28, 42, 0.55)",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  bannerEtiqueta: {
    alignSelf: "flex-start",
    backgroundColor: cores.terciariaContainer,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    marginBottom: 8,
  },
  bannerEtiquetaTexto: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.5,
    color: cores.sobreTerciariaContainer,
  },
  bannerTitulo: {
    fontSize: 24,
    fontWeight: "700",
    color: cores.sobrePrimaria,
    maxWidth: 200,
    lineHeight: 30,
  },
  bannerAutor: {
    fontSize: 14,
    fontStyle: "italic",
    color: "rgba(255,255,255,0.85)",
    marginTop: 4,
  },
  bannerBotao: {
    alignSelf: "flex-start",
    backgroundColor: cores.primaria,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 999,
    marginTop: 16,
  },
  bannerBotaoTexto: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.5,
    color: cores.sobrePrimaria,
  },
  secaoCabecalho: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  secaoTitulo: {
    fontSize: 18,
    fontWeight: "600",
    color: cores.sobreSuperficie,
  },
  secaoLink: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.5,
    color: cores.primaria,
  },
  linhaChips: {
    paddingBottom: 8,
    gap: 12,
    marginBottom: 24,
  },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: cores.superficieContainerMinima,
    borderWidth: 1,
    borderColor: "rgba(189, 202, 192, 0.35)",
    shadowColor: "#1f2937",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  chipAtivo: {
    backgroundColor: cores.primaria,
    borderColor: cores.primaria,
    shadowOpacity: 0.12,
  },
  chipTexto: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.5,
    color: cores.sobreSuperficieVariante,
  },
  chipTextoAtivo: {
    color: cores.sobrePrimaria,
  },
  tituloLivros: {
    marginBottom: 20,
  },
  grade: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  acessoRapido: {
    marginTop: 8,
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
    backgroundColor: cores.superficieContainerMinima,
    borderWidth: 1,
    borderColor: "rgba(189, 202, 192, 0.35)",
  },
  acessoRapidoTexto: {
    fontSize: 14,
    color: cores.sobreSuperficieVariante,
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 22,
  },
  acessoBotoes: {
    gap: 10,
  },
  botaoPrimario: {
    width: "100%",
    backgroundColor: cores.primaria,
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: "center",
  },
  botaoPrimarioTexto: {
    color: cores.sobrePrimaria,
    fontSize: 15,
    fontWeight: "600",
  },
  botaoContorno: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: "center",
    borderWidth: 1,
    borderColor: cores.contornoVariante,
  },
  botaoContornoTexto: {
    color: cores.primaria,
    fontSize: 15,
    fontWeight: "600",
  },
});
