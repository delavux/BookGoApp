import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TelaAbertura from "../telas/TelaAbertura";
import TelaInicio from "../telas/TelaInicio";
import TelaLogin from "../telas/TelaLogin";
import TelaCadastro from "../telas/TelaCadastro";
import TelaLembrarSenha from "../telas/TelaLembrarSenha";
import TelaAluguel from "../telas/TelaAluguel";
import TelaDetalheLivro from "../telas/TelaDetalheLivro";

const Pilha = createNativeStackNavigator();

export default function Rotas() {
  return (
    <NavigationContainer>
      <Pilha.Navigator screenOptions={{ headerShown: false }}>
        <Pilha.Screen name="Abertura" component={TelaAbertura} />
        <Pilha.Screen name="Inicio" component={TelaInicio} />
        <Pilha.Screen name="Entrar" component={TelaLogin} />
        <Pilha.Screen name="Cadastro" component={TelaCadastro} />
        <Pilha.Screen name="Aluguel" component={TelaAluguel} />
        <Pilha.Screen name="DetalheLivro" component={TelaDetalheLivro} />
        <Pilha.Screen name="LembrarSenha" component={TelaLembrarSenha} />
      </Pilha.Navigator>
    </NavigationContainer>
  );
}
