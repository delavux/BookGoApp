import { View, Text, StyleSheet } from "react-native";
import { cores } from "../tema/cores";

export default function TelaLembrarSenha() {
  return (
    <View style={estilos.container}>
      <Text style={estilos.texto}>Lembrar senha</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: cores.fundo,
  },
  texto: {
    fontSize: 18,
    color: cores.sobreSuperficie,
    fontWeight: "600",
  },
});
