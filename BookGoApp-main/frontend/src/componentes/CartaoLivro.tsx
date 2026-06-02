import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { cores } from "../tema/cores";

type PropsCartaoLivro = {
  titulo: string;
  autor: string;
  nota: string;
  capa: ImageSourcePropType;
  aoPressionar: () => void;
  aoAdicionar: () => void;
};

export default function CartaoLivro({
  titulo,
  autor,
  nota,
  capa,
  aoPressionar,
  aoAdicionar,
}: PropsCartaoLivro) {
  return (
    <Pressable style={estilos.cartao} onPress={aoPressionar}>
      <View style={estilos.capaEnvoltorio}>
        <Image source={capa} style={estilos.capa} resizeMode="contain" />
        <View style={estilos.etiqueta}>
          <View style={estilos.etiquetaPonto} />
          <Text style={estilos.etiquetaTexto}>Disponível</Text>
        </View>
      </View>
      <View style={estilos.corpo}>
        <Text style={estilos.titulo} numberOfLines={1}>
          {titulo}
        </Text>
        <Text style={estilos.autor} numberOfLines={1}>
          {autor}
        </Text>
        <View style={estilos.rodape}>
          <View style={estilos.linhaNota}>
            <MaterialIcons name="star" size={14} color={cores.terciaria} />
            <Text style={estilos.nota}>{nota}</Text>
          </View>
          <TouchableOpacity
            style={estilos.botaoAdicionar}
            onPress={aoAdicionar}
            activeOpacity={0.85}
          >
            <MaterialIcons name="add" size={20} color={cores.primaria} />
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  cartao: {
    flex: 1,
    backgroundColor: cores.superficieContainerMinima,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#1f2937",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
    elevation: 4,
  },
  capaEnvoltorio: {
    height: 200,
    backgroundColor: cores.superficieContainerBaixa,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  capa: {
    width: "72%",
    height: "88%",
  },
  etiqueta: {
    position: "absolute",
    top: 12,
    left: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.92)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  etiquetaPonto: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: cores.primaria,
  },
  etiquetaTexto: {
    fontSize: 10,
    fontWeight: "500",
    color: cores.sobreSuperficieVariante,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  corpo: {
    padding: 14,
    flexGrow: 1,
  },
  titulo: {
    fontSize: 16,
    fontWeight: "600",
    color: cores.sobreSuperficie,
    marginBottom: 4,
  },
  autor: {
    fontSize: 14,
    color: cores.sobreSuperficieVariante,
    opacity: 0.85,
    marginBottom: 10,
  },
  rodape: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "auto",
  },
  linhaNota: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  nota: {
    fontSize: 12,
    fontWeight: "600",
    color: cores.sobreSuperficie,
  },
  botaoAdicionar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: cores.secundariaContainer,
    alignItems: "center",
    justifyContent: "center",
  },
});
