import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import CampoFormulario from "../componentes/CampoFormulario";
import { cores } from "../tema/cores";
import { obterItem, salvarItem } from "../servicos/armazenamento";

export default function TelaLogin({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  async function login() {
    const usuarioSalvo = await obterItem("usuario");

    if (!usuarioSalvo) {
      alert("Usuário não encontrado");
      return;
    }

    const usuario = JSON.parse(usuarioSalvo);

    if (email === usuario.email && senha === usuario.senha) {
      alert("Login realizado 😄");

      await salvarItem("logado", "true");

      navigation.navigate("Painel");
    } else {
      alert("E-mail ou senha incorretos");
    }
  }

  return (
    <SafeAreaView style={estilos.seguro} edges={["top", "bottom"]}>
      <View style={estilos.brilhoTopo} />
      <View style={estilos.brilhoRodape} />
      <KeyboardAvoidingView
        style={estilos.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={estilos.rolagem}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={estilos.linhaMarca}>
            <View style={estilos.caixaLogo}>
              <MaterialIcons
                name="menu-book"
                size={24}
                color={cores.sobrePrimaria}
              />
            </View>
            <Text style={estilos.marca}>BookGo</Text>
          </View>

          <Text style={estilos.titulo}>Bem vindo</Text>
          <Text style={estilos.subtitulo}>
            Sua biblioteca de serenidade digital aguarda por você. Faça login
            para continuar sua jornada.
          </Text>

          <View style={estilos.formulario}>
            <CampoFormulario
              icone="mail-outline"
              placeholder="E-mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <CampoFormulario
              icone="lock-outline"
              placeholder="Senha"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={!mostrarSenha}
              acaoDireita={{
                icone: mostrarSenha ? "visibility-off" : "visibility",
                aoPressionar: () => setMostrarSenha((v) => !v),
              }}
            />
          </View>

          <TouchableOpacity
            onPress={login}
            style={estilos.botaoEnviar}
            activeOpacity={0.92}
          >
            <Text style={estilos.textoEnviar}>Entrar</Text>
            <MaterialIcons
              name="arrow-forward"
              size={20}
              color={cores.sobrePrimaria}
            />
          </TouchableOpacity>

          <View style={estilos.rodape}>
            <Text style={estilos.textoRodape}>Não tem uma conta? </Text>
            <Pressable onPress={() => navigation.navigate("Cadastro")}>
              <Text style={estilos.linkRodape}>Criar nova conta</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  seguro: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  flex: {
    flex: 1,
  },
  brilhoTopo: {
    position: "absolute",
    top: -80,
    right: -80,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "rgba(91, 200, 154, 0.18)",
  },
  brilhoRodape: {
    position: "absolute",
    bottom: -100,
    left: -100,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "rgba(138, 248, 193, 0.12)",
  },
  rolagem: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 32,
    maxWidth: 480,
    width: "100%",
    alignSelf: "center",
  },
  linhaMarca: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 32,
  },
  caixaLogo: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: cores.primaria,
    alignItems: "center",
    justifyContent: "center",
  },
  marca: {
    fontSize: 26,
    fontWeight: "700",
    color: cores.primaria,
    letterSpacing: -0.5,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "700",
    color: cores.sobreSuperficie,
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 14,
    lineHeight: 22,
    color: cores.sobreSuperficieVariante,
    marginBottom: 28,
  },
  formulario: {
    marginBottom: 8,
  },
  botaoEnviar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: cores.primaria,
    height: 56,
    borderRadius: 999,
    marginTop: 16,
    shadowColor: cores.primaria,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 4,
  },
  textoEnviar: {
    fontSize: 17,
    fontWeight: "600",
    color: cores.sobrePrimaria,
  },
  rodape: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: "auto",
    paddingTop: 48,
  },
  textoRodape: {
    fontSize: 14,
    color: cores.sobreSuperficieVariante,
  },
  linkRodape: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.5,
    color: cores.primaria,
  },
});
