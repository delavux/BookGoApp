import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

import { useEffect, useState } from "react";

import { api } from "../servicos/api";
import { obterItem, removerItem } from "../servicos/armazenamento";

export default function TelaPainel({ navigation }: any) {
  const [livros, setLivros] = useState<any[]>([]);
  const [totalAlugados, setTotalAlugados] = useState(0);

  useEffect(() => {
    buscarLivros();

    (async () => {
      const alugueisSalvos = await obterItem("alugueis");
      const alugueis = JSON.parse(alugueisSalvos || "[]");
      setTotalAlugados(alugueis.length);
    })();
  }, []);

  async function buscarLivros() {
    try {
      const response = await api.get("/livros");
      setLivros(response.data);
    } catch (error) {
      console.log(error);
    }
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
      <Text
        style={{
          fontSize: 42,
          fontWeight: "bold",
          marginTop: 50,
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
          marginTop: 8,
          fontSize: 14,
          color: "#6B4C2A",
          textAlign: "center",
          fontStyle: "italic",
        }}
      >
        painel do usuário
      </Text>

      <View
        style={{
          borderBottomColor: "#C4A77D",
          borderBottomWidth: 1,
          marginVertical: 20,
          width: "50%",
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
          marginBottom: 20,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: "#8B6946",
            marginBottom: 8,
            fontStyle: "italic",
          }}
        >
          livros disponíveis
        </Text>
        <Text
          style={{
            fontSize: 36,
            fontWeight: "bold",
            color: "#4A2F14",
          }}
        >
          {livros.length}
        </Text>

        <View
          style={{
            borderBottomColor: "#D4B896",
            borderBottomWidth: 1,
            marginVertical: 16,
            width: "80%",
          }}
        />

        <Text
          style={{
            fontSize: 16,
            color: "#8B6946",
            marginBottom: 8,
            fontStyle: "italic",
          }}
        >
          livros alugados
        </Text>
        <Text
          style={{
            fontSize: 36,
            fontWeight: "bold",
            color: "#4A2F14",
          }}
        >
          {totalAlugados}
        </Text>
      </View>

      <View
        style={{
          borderBottomColor: "#C4A77D",
          borderBottomWidth: 1,
          marginVertical: 10,
          width: "70%",
          alignSelf: "center",
        }}
      />

      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "#4A2F14",
          marginTop: 10,
          marginBottom: 10,
          textAlign: "center",
          letterSpacing: 1,
        }}
      >
        CATÁLOGO
      </Text>

      {livros.map((livro) => (
        <View
          key={livro.id}
          style={{
            backgroundColor: "#FFF8EE",
            marginTop: 24,
            padding: 20,
            borderWidth: 2,
            borderColor: "#D4B896",
            borderRadius: 12,
            shadowColor: "#000",
            shadowOffset: { width: 3, height: 3 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <View
            style={{
              borderWidth: 1,
              borderColor: "#C4A77D",
              padding: 6,
              backgroundColor: "#F5EDE0",
              borderRadius: 8,
            }}
          >
            <Image
              source={{ uri: livro.capa }}
              style={{
                width: "100%",
                height: 240,
                backgroundColor: "#E8DCC8",
                borderRadius: 6,
              }}
              resizeMode="cover"
            />
          </View>

          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginTop: 18,
              color: "#3A2010",
              letterSpacing: 0.5,
              borderLeftWidth: 4,
              borderLeftColor: "#C4A77D",
              paddingLeft: 14,
            }}
          >
            {livro.titulo}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 12,
              marginLeft: 8,
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

          <View
            style={{
              marginTop: 14,
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 8,
            }}
          >
            <View
              style={{
                backgroundColor: "#E8DCC8",
                borderWidth: 1,
                borderColor: "#A68A5C",
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 6,
              }}
            >
              <Text
                style={{
                  color: "#3A2010",
                  fontWeight: "bold",
                  fontSize: 13,
                  letterSpacing: 1,
                }}
              >
                DISPONÍVEL
              </Text>
            </View>
          </View>

          <View
            style={{
              borderBottomColor: "#D4B896",
              borderBottomWidth: 1,
              marginVertical: 18,
            }}
          />

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Aluguel", {
                livro,
              })
            }
            style={{
              backgroundColor: "#4A2F14",
              padding: 16,
              borderRadius: 10,
              alignItems: "center",
            }}
            activeOpacity={0.8}
          >
            <Text
              style={{
                color: "#FFF8EE",
                fontWeight: "bold",
                fontSize: 16,
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              Solicitar Aluguel
            </Text>
          </TouchableOpacity>
        </View>
      ))}

      <View
        style={{
          borderBottomColor: "#C4A77D",
          borderBottomWidth: 1,
          marginVertical: 30,
          width: "70%",
          alignSelf: "center",
        }}
      />

      <TouchableOpacity
        onPress={async () => {
          await removerItem("logado");
          alert("Sessão encerrada");
          navigation.navigate("Inicio");
        }}
        style={{
          backgroundColor: "transparent",
          marginTop: 10,
          padding: 18,
          borderRadius: 10,
          alignItems: "center",
          borderWidth: 2,
          borderColor: "#8B6946",
          marginBottom: 50,
        }}
        activeOpacity={0.8}
      >
        <Text
          style={{
            color: "#8B6946",
            fontWeight: "bold",
            fontSize: 16,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Sair
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
