import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import TelaInicio from "./src/telas/TelaInicio";
import TelaLogin from "./src/telas/TelaLogin";
import TelaCadastro from "./src/telas/TelaCadastro";
import TelaAluguel from "./src/telas/TelaAluguel";
import TelaPainel from "./src/telas/TelaPainel";
import TelaDetalheLivro from "./src/telas/TelaDetalheLivro";

const Pilha = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Pilha.Navigator screenOptions={{ headerShown: false }}>
          <Pilha.Screen name="Inicio" component={TelaInicio} />
          <Pilha.Screen name="Entrar" component={TelaLogin} />
          <Pilha.Screen name="Cadastro" component={TelaCadastro} />
          <Pilha.Screen name="Aluguel" component={TelaAluguel} />
          <Pilha.Screen name="DetalheLivro" component={TelaDetalheLivro} />
          <Pilha.Screen name="Painel" component={TelaPainel} />
        </Pilha.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
