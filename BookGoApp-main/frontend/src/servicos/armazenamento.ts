import AsyncStorage from "@react-native-async-storage/async-storage";

export async function obterItem(chave: string): Promise<string | null> {
  return AsyncStorage.getItem(chave);
}

export async function salvarItem(chave: string, valor: string): Promise<void> {
  await AsyncStorage.setItem(chave, valor);
}

export async function removerItem(chave: string): Promise<void> {
  await AsyncStorage.removeItem(chave);
}
