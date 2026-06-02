import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { cores } from "../tema/cores";
import { LivroDetalhe, livroParaAluguel } from "../constantes/livrosExemplo";
import { obterItem } from "../servicos/armazenamento";

export default function TelaDetalheLivro({ route, navigation }: any) {
  const livro = route.params.livro as LivroDetalhe;
  const [descricaoExpandida, setDescricaoExpandida] = useState(false);

  const autorExibicao = livro.autorResumo || livro.autor;

  async function aoAlugar() {
    const logado = await obterItem("logado");
    if (logado !== "true") {
      navigation.navigate("Entrar");
      return;
    }
    navigation.navigate("Aluguel", { livro: livroParaAluguel(livro) });
  }

  const descricaoLonga = livro.descricao.length > 200;
  const descricaoTexto =
    descricaoLonga && !descricaoExpandida
      ? `${livro.descricao.slice(0, 200).trim()}...`
      : livro.descricao;

  return (
    <View style={estilos.raiz}>
      <LinearGradient
        colors={[
          "rgba(91, 200, 154, 0.32)",
          "rgba(91, 200, 154, 0.14)",
          "rgba(248, 249, 255, 0)",
        ]}
        locations={[0, 0.45, 1]}
        style={estilos.fadeTopo}
        pointerEvents="none"
      />
      <SafeAreaView style={estilos.cabecalhoSeguro} edges={["top"]}>
        <View style={estilos.cabecalho}>
          <Pressable style={estilos.cabecalhoBotao} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color={cores.primaria} />
          </Pressable>
          <Text style={estilos.marca}>BookGo</Text>
          <Pressable style={estilos.cabecalhoBotao}>
            <MaterialIcons name="favorite-border" size={24} color={cores.primaria} />
          </Pressable>
        </View>
      </SafeAreaView>

      <ScrollView
        style={estilos.rolagem}
        contentContainerStyle={estilos.conteudo}
        showsVerticalScrollIndicator={false}
      >
        <View style={estilos.hero}>
          <View style={estilos.capaCartao}>
            <Image source={livro.capa} style={estilos.capa} resizeMode="contain" />
          </View>
        </View>

        <View style={estilos.identidade}>
          <View style={estilos.etiquetaAvaliacao}>
            <Text style={estilos.etiquetaAvaliacaoTexto}>Avaliação</Text>
          </View>
          <Text style={estilos.titulo}>{livro.titulo}</Text>
          <Text style={estilos.autorResumo}>{autorExibicao}</Text>
        </View>

        <View style={estilos.metaLinha}>
          <View style={estilos.metaCartao}>
            <MaterialIcons name="star" size={20} color={cores.terciaria} />
            <Text style={estilos.metaValor}>{livro.nota}</Text>
            <Text style={estilos.metaRotulo}>Nota</Text>
          </View>
          <View style={estilos.metaCartao}>
            <MaterialIcons name="menu-book" size={20} color={cores.primaria} />
            <Text style={estilos.metaValor}>{livro.paginas}</Text>
            <Text style={estilos.metaRotulo}>Páginas</Text>
          </View>
          <View style={estilos.metaCartao}>
            <MaterialIcons name="category" size={20} color={cores.secundaria} />
            <Text style={estilos.metaValor} numberOfLines={1}>
              {livro.genero}
            </Text>
            <Text style={estilos.metaRotulo}>Gênero</Text>
          </View>
        </View>

        <View style={estilos.secao}>
          <Text style={estilos.secaoTitulo}>Sobre este livro</Text>
          <View style={estilos.secaoCorpo}>
            <Text style={estilos.descricao}>{descricaoTexto}</Text>
            {descricaoLonga ? (
              <Pressable
                onPress={() => setDescricaoExpandida((v) => !v)}
                style={estilos.lerMais}
              >
                <Text style={estilos.lerMaisTexto}>
                  {descricaoExpandida ? "ler menos" : "ler mais"}
                </Text>
                <MaterialIcons
                  name={descricaoExpandida ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                  size={16}
                  color={cores.primaria}
                />
              </Pressable>
            ) : null}
          </View>
        </View>

        <View style={estilos.autorCartao}>
          <View style={estilos.autorAvatar}>
            <MaterialIcons name="person" size={28} color={cores.sobreSecundariaContainer} />
          </View>
          <View style={estilos.autorTextos}>
            <Text style={estilos.autorDestaqueRotulo}>Autor em destaque</Text>
            <Text style={estilos.autorDestaqueNome}>{livro.autorDestaque}</Text>
          </View>
          <View style={estilos.autorSeta}>
            <MaterialIcons name="chevron-right" size={22} color={cores.primaria} />
          </View>
        </View>
      </ScrollView>

      <SafeAreaView style={estilos.rodapeSeguro} edges={["bottom"]}>
        <View style={estilos.rodape}>
          <Pressable style={estilos.botaoSalvar}>
            <MaterialIcons name="bookmark-add" size={22} color={cores.primaria} />
          </Pressable>
          <TouchableOpacity
            style={estilos.botaoAlugar}
            onPress={aoAlugar}
            activeOpacity={0.92}
          >
            <Text style={estilos.botaoAlugarTexto}>Alugar Agora</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const estilos = StyleSheet.create({
  raiz: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  fadeTopo: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 460,
    zIndex: 0,
  },
  cabecalhoSeguro: {
    backgroundColor: "transparent",
    zIndex: 1,
  },
  cabecalho: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  cabecalhoBotao: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  marca: {
    fontSize: 22,
    fontWeight: "700",
    color: cores.primaria,
    letterSpacing: -0.3,
  },
  rolagem: {
    flex: 1,
    zIndex: 1,
  },
  conteudo: {
    paddingBottom: 110,
  },
  hero: {
    paddingTop: 32,
    paddingBottom: 48,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  capaCartao: {
    width: 256,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "transparent",
    shadowColor: "#1f2937",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.12,
    shadowRadius: 40,
    elevation: 10,
  },
  capa: {
    width: 256,
    height: 362,
    backgroundColor: cores.superficieContainerMinima,
    borderRadius: 12,
  },
  identidade: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: -8,
    gap: 8,
  },
  etiquetaAvaliacao: {
    backgroundColor: cores.secundariaContainer,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  etiquetaAvaliacaoTexto: {
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 16,
    letterSpacing: 0.6,
    color: cores.sobreSecundariaContainer,
    textAlign: "center",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 34,
    color: cores.sobreSuperficie,
    textAlign: "center",
    paddingTop: 8,
  },
  autorResumo: {
    fontSize: 14,
    lineHeight: 22,
    color: "rgba(62, 73, 67, 0.70)",
    textAlign: "center",
  },
  metaLinha: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    marginTop: 24,
  },
  metaCartao: {
    flex: 1,
    backgroundColor: cores.superficieContainerMinima,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  metaValor: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 24,
    color: cores.sobreSuperficie,
    marginTop: 4,
    textAlign: "center",
  },
  metaRotulo: {
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 16,
    letterSpacing: 1.2,
    color: cores.sobreSuperficieVariante,
    marginTop: 4,
    textTransform: "uppercase",
  },
  secao: {
    paddingHorizontal: 20,
    marginTop: 32,
    gap: 15,
  },
  secaoTitulo: {
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 28,
    color: cores.sobreSuperficie,
  },
  secaoCorpo: {
    gap: 8,
  },
  descricao: {
    fontSize: 14,
    lineHeight: 23,
    color: cores.sobreSuperficieVariante,
  },
  lerMais: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  lerMaisTexto: {
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 16,
    letterSpacing: 0.6,
    color: cores.primaria,
  },
  autorCartao: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 28,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "rgba(222, 233, 252, 0.5)",
    borderWidth: 1,
    borderColor: "rgba(189, 202, 192, 0.1)",
  },
  autorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: cores.secundariaContainer,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  autorTextos: {
    flex: 1,
  },
  autorDestaqueRotulo: {
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 16,
    letterSpacing: 0.6,
    color: cores.primaria,
    marginBottom: 2,
  },
  autorDestaqueNome: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 24,
    color: cores.sobreSuperficie,
  },
  autorSeta: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: cores.superficieContainer,
    alignItems: "center",
    justifyContent: "center",
  },
  rodapeSeguro: {
    backgroundColor: "rgba(248, 249, 255, 0.95)",
    borderTopWidth: 1,
    borderTopColor: "rgba(189, 202, 192, 0.25)",
    zIndex: 2,
  },
  rodape: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  botaoSalvar: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: cores.superficieContainerAlta,
    alignItems: "center",
    justifyContent: "center",
  },
  botaoAlugar: {
    flex: 1,
    height: 52,
    borderRadius: 999,
    backgroundColor: cores.primaria,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: cores.primaria,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  botaoAlugarTexto: {
    fontSize: 17,
    fontWeight: "600",
    color: cores.sobrePrimaria,
  },
});
