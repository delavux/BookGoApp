import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import CampoFormulario from "../componentes/CampoFormulario";
import { cores } from "../tema/cores";
import { ilustracaoCadastro } from "../constantes/imagensLivros";
import { salvarItem } from "../servicos/armazenamento";

export default function TelaCadastro({ navigation }: any) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cidade, setCidade] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  async function cadastrar() {
    if (!nome || !email || !senha) {
      alert("Preencha todos os campos");
      return;
    }

    const usuario = {
      nome,
      email,
      senha,
      telefone,
      cpf,
      endereco,
      cidade,
    };

    await salvarItem("usuario", JSON.stringify(usuario));

    alert("Conta criada com sucesso");

    navigation.navigate("Entrar");
  }

  return (
    <SafeAreaView style={estilos.seguro} edges={["top", "bottom"]}>
      <Pressable style={estilos.botaoVoltar} onPress={() => navigation.goBack()}>
        <MaterialIcons
          name="chevron-left"
          size={24}
          color={cores.sobreSuperficieVariante}
        />
      </Pressable>

      <KeyboardAvoidingView
        style={estilos.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={estilos.rolagem}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={estilos.cabecalho}>
            <View style={estilos.logoEnvoltorio}>
              <View style={estilos.caixaLogo}>
                <MaterialIcons
                  name="auto-stories"
                  size={32}
                  color={cores.sobrePrimariaContainer}
                />
              </View>
              <View style={estilos.logoPonto} />
            </View>
            <Text style={estilos.titulo}>Criar Conta</Text>
            <Text style={estilos.subtitulo}>
              Cadastre-se para começar a alugar seus livros favoritos
            </Text>
            <View style={estilos.ilustracaoEnvoltorio}>
              <Image
                source={ilustracaoCadastro}
                style={estilos.ilustracao}
                resizeMode="contain"
              />
            </View>
          </View>

          <CampoFormulario
            rotulo="Nome Completo"
            icone="person-outline"
            placeholder="Seu nome completo"
            value={nome}
            onChangeText={setNome}
          />
          <CampoFormulario
            rotulo="E-mail"
            icone="mail-outline"
            placeholder="exemplo@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <CampoFormulario
            rotulo="Senha"
            icone="lock-outline"
            placeholder="••••••••"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={!mostrarSenha}
            acaoDireita={{
              icone: mostrarSenha ? "visibility-off" : "visibility",
              aoPressionar: () => setMostrarSenha((v) => !v),
            }}
          />

          <View style={estilos.linha}>
            <View style={estilos.metade}>
              <CampoFormulario
                rotulo="Telefone"
                icone="smartphone"
                placeholder="(00) 00000-0000"
                value={telefone}
                onChangeText={setTelefone}
                keyboardType="phone-pad"
              />
            </View>
            <View style={estilos.metade}>
              <CampoFormulario
                rotulo="CPF"
                icone="badge"
                placeholder="000.000.000-00"
                value={cpf}
                onChangeText={setCpf}
                keyboardType="numeric"
              />
            </View>
          </View>

          <CampoFormulario
            rotulo="Endereço"
            icone="location-on"
            placeholder="Rua, número e bairro"
            value={endereco}
            onChangeText={setEndereco}
          />
          <CampoFormulario
            rotulo="Cidade"
            icone="location-city"
            placeholder="Sua cidade"
            value={cidade}
            onChangeText={setCidade}
          />

          <TouchableOpacity
            onPress={cadastrar}
            style={estilos.botaoEnviar}
            activeOpacity={0.92}
          >
            <Text style={estilos.textoEnviar}>Criar Conta</Text>
            <MaterialIcons
              name="arrow-forward"
              size={20}
              color={cores.sobrePrimariaContainer}
            />
          </TouchableOpacity>

          <View style={estilos.rodape}>
            <Text style={estilos.textoRodape}>Já possui uma conta? </Text>
            <Pressable onPress={() => navigation.navigate("Entrar")}>
              <Text style={estilos.linkRodape}>Entrar</Text>
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
  botaoVoltar: {
    position: "absolute",
    top: 56,
    left: 16,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: cores.superficieContainerMinima,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#1f2937",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  rolagem: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
    maxWidth: 480,
    width: "100%",
    alignSelf: "center",
  },
  cabecalho: {
    alignItems: "center",
    marginBottom: 8,
    paddingTop: 32,
  },
  logoEnvoltorio: {
    marginBottom: 16,
    position: "relative",
    width: 64,
    height: 64,
    alignSelf: "center",
  },
  caixaLogo: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: cores.primariaContainer,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "-6deg" }],
    shadowColor: cores.primaria,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  logoPonto: {
    position: "absolute",
    top: -4,
    right: -4,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: cores.terciariaContainer,
    borderWidth: 2,
    borderColor: cores.fundo,
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
    textAlign: "center",
    maxWidth: 280,
    marginBottom: 20,
  },
  ilustracaoEnvoltorio: {
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    marginBottom: 8,
  },
  ilustracao: {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
  },
  linha: {
    flexDirection: "row",
    gap: 12,
  },
  metade: {
    flex: 1,
  },
  botaoEnviar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: cores.primariaContainer,
    height: 48,
    borderRadius: 999,
    marginTop: 16,
    shadowColor: cores.primariaContainer,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 4,
  },
  textoEnviar: {
    fontSize: 17,
    fontWeight: "600",
    color: cores.sobrePrimariaContainer,
  },
  rodape: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 28,
    flexWrap: "wrap",
  },
  textoRodape: {
    fontSize: 14,
    color: cores.sobreSuperficieVariante,
  },
  linkRodape: {
    fontSize: 16,
    fontWeight: "600",
    color: cores.primaria,
  },
});
