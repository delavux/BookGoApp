import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { cores } from "../tema/cores";

export default function TelaAbertura({ navigation }: any) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Inicio");
    }, 2000);
  }, []);

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>BookGo</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.primaria,
    justifyContent: "center",
    alignItems: "center",
  },
  titulo: {
    color: cores.sobrePrimaria,
    fontSize: 38,
    fontWeight: "bold",
  },
});
