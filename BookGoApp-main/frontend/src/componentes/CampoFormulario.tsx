import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
  Pressable,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { cores } from "../tema/cores";

type PropsCampoFormulario = TextInputProps & {
  rotulo?: string;
  icone: keyof typeof MaterialIcons.glyphMap;
  acaoDireita?: {
    icone: keyof typeof MaterialIcons.glyphMap;
    aoPressionar: () => void;
  };
};

export default function CampoFormulario({
  rotulo,
  icone,
  acaoDireita,
  style,
  ...propsEntrada
}: PropsCampoFormulario) {
  return (
    <View style={estilos.envoltorio}>
      {rotulo ? <Text style={estilos.rotulo}>{rotulo}</Text> : null}
      <View style={estilos.linhaEntrada}>
        <MaterialIcons
          name={icone}
          size={20}
          color={cores.contorno}
          style={estilos.iconeInicio}
        />
        <TextInput
          placeholderTextColor={cores.contornoVariante}
          style={[estilos.entrada, style]}
          {...propsEntrada}
        />
        {acaoDireita ? (
          <Pressable
            onPress={acaoDireita.aoPressionar}
            style={estilos.iconeFim}
          >
            <MaterialIcons
              name={acaoDireita.icone}
              size={20}
              color={cores.contorno}
            />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  envoltorio: {
    marginBottom: 12,
  },
  rotulo: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.6,
    color: cores.contorno,
    marginBottom: 6,
    marginLeft: 4,
  },
  linhaEntrada: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: cores.superficieContainerMinima,
    borderRadius: 12,
    minHeight: 48,
    shadowColor: "#1f2937",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  iconeInicio: {
    marginLeft: 16,
  },
  entrada: {
    flex: 1,
    fontSize: 16,
    color: cores.sobreSuperficie,
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  iconeFim: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
});
