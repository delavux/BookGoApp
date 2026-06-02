import { View, Text, Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { cores } from "../tema/cores";

type ChaveAba = "inicio" | "explorar" | "alugueis" | "perfil";

type PropsBarraNavegacao = {
  abaAtiva?: ChaveAba;
};

const abas: {
  chave: ChaveAba;
  rotulo: string;
  icone: keyof typeof MaterialIcons.glyphMap;
}[] = [
  { chave: "inicio", rotulo: "Início", icone: "home" },
  { chave: "explorar", rotulo: "Explorar", icone: "explore" },
  { chave: "alugueis", rotulo: "Meus aluguéis", icone: "menu-book" },
  { chave: "perfil", rotulo: "Perfil", icone: "person-outline" },
];

export default function BarraNavegacao({
  abaAtiva = "inicio",
}: PropsBarraNavegacao) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[estilos.barra, { paddingBottom: Math.max(insets.bottom, 12) }]}
    >
      {abas.map((aba) => {
        const ativa = aba.chave === abaAtiva;
        return (
          <Pressable key={aba.chave} style={estilos.aba} disabled>
            <View style={[estilos.iconeEnvoltorio, ativa && estilos.iconeAtivo]}>
              <MaterialIcons
                name={aba.icone}
                size={22}
                color={
                  ativa
                    ? cores.sobreSecundariaContainer
                    : cores.sobreSuperficieVariante
                }
              />
            </View>
            <Text style={[estilos.rotulo, ativa && estilos.rotuloAtivo]}>
              {aba.rotulo}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const estilos = StyleSheet.create({
  barra: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 10,
    paddingHorizontal: 8,
    backgroundColor: "rgba(248, 249, 255, 0.95)",
    borderTopWidth: 1,
    borderTopColor: "rgba(189, 202, 192, 0.35)",
  },
  aba: {
    alignItems: "center",
    minWidth: 72,
  },
  iconeEnvoltorio: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
  },
  iconeAtivo: {
    backgroundColor: cores.secundariaContainer,
  },
  rotulo: {
    fontSize: 11,
    fontWeight: "600",
    marginTop: 2,
    color: cores.sobreSuperficieVariante,
  },
  rotuloAtivo: {
    color: cores.sobreSecundariaContainer,
  },
});
