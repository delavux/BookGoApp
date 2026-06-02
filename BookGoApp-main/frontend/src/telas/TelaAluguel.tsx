import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";

import { useState } from "react";
import { obterItem, salvarItem } from "../servicos/armazenamento";

export default function TelaAluguel({ route, navigation }: any) {
  const { livro } = route.params;

  const [endereco, setEndereco] = useState("");
  const [observacao, setObservacao] = useState("");

  async function alugarLivro() {
    if (!endereco) {
      alert("Informe o endereço");
      return;
    }

    const alugueisSalvos = await obterItem("alugueis");
    const alugueis = JSON.parse(alugueisSalvos || "[]");

    if (alugueis.includes(livro.id)) {
      alert("Livro já alugado");
      return;
    }

    alugueis.push(livro.id);

    await salvarItem("alugueis", JSON.stringify(alugueis));

    alert("Livro alugado com sucesso");

    navigation.navigate("Painel");
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#F4EADB",
        padding: 20,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          paddingVertical: 40,
        }}
      >
        <Text
          style={{
            fontSize: 36,
            fontWeight: "bold",
            color: "#4A2F14",
            textAlign: "center",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          BookGo
        </Text>

        <Text
          style={{
            fontSize: 14,
            color: "#6B4C2A",
            textAlign: "center",
            fontStyle: "italic",
            marginBottom: 30,
          }}
        >
          confirmar aluguel
        </Text>

        <View
          style={{
            borderBottomColor: "#C4A77D",
            borderBottomWidth: 1,
            marginBottom: 30,
            width: "40%",
            alignSelf: "center",
          }}
        />

        <View
          style={{
            backgroundColor: "#FFF8EE",
            borderWidth: 2,
            borderColor: "#D4B896",
            borderRadius: 12,
            padding: 20,
            marginBottom: 24,
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              color: "#3A2010",
              textAlign: "center",
              borderLeftWidth: 4,
              borderLeftColor: "#C4A77D",
              paddingLeft: 12,
              marginBottom: 12,
            }}
          >
            {livro.titulo}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#6B4C2A",
                fontWeight: "600",
              }}
            >
              Autor:
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#8B5A2B",
                marginLeft: 8,
                fontStyle: "italic",
                fontWeight: "500",
              }}
            >
              {livro.autor}
            </Text>
          </View>
        </View>

        <View
          style={{
            borderBottomColor: "#D4B896",
            borderBottomWidth: 1,
            marginBottom: 24,
            width: "80%",
            alignSelf: "center",
          }}
        />

        <TextInput
          placeholder="Endereço de entrega"
          placeholderTextColor="#A68A5C"
          value={endereco}
          onChangeText={setEndereco}
          style={{
            backgroundColor: "#FFF8EE",
            borderWidth: 2,
            borderColor: "#D4B896",
            borderRadius: 8,
            padding: 16,
            fontSize: 16,
            color: "#4A2F14",
            fontWeight: "500",
            marginBottom: 16,
          }}
        />

        <TextInput
          placeholder="Observações (opcional)"
          placeholderTextColor="#A68A5C"
          value={observacao}
          onChangeText={setObservacao}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
          style={{
            backgroundColor: "#FFF8EE",
            borderWidth: 2,
            borderColor: "#D4B896",
            borderRadius: 8,
            padding: 16,
            fontSize: 16,
            color: "#4A2F14",
            fontWeight: "500",
            marginBottom: 24,
            minHeight: 100,
          }}
        />

        <TouchableOpacity
          onPress={alugarLivro}
          style={{
            backgroundColor: "#4A2F14",
            padding: 18,
            borderRadius: 10,
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#C4A77D",
            marginBottom: 16,
          }}
          activeOpacity={0.8}
        >
          <Text
            style={{
              color: "#F4EADB",
              fontWeight: "bold",
              fontSize: 18,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            Confirmar Aluguel
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: "transparent",
            padding: 14,
            borderRadius: 8,
            alignItems: "center",
            borderWidth: 2,
            borderColor: "#8B6946",
          }}
          activeOpacity={0.8}
        >
          <Text
            style={{
              color: "#8B6946",
              fontWeight: "600",
              fontSize: 14,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            ← Voltar
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
