# 📚 BookGo

Sistema simples de aluguel/delivery de livros desenvolvido com:

- **React Native**
- **Expo SDK 54**
- **TypeScript**
- **Node.js**
- **Express**
- **SQLite**
- **Drizzle ORM**

> Projeto acadêmico fullstack com frontend mobile/web e backend REST API.

---

## 🚀 Tecnologias Utilizadas

### Frontend
- React Native
- Expo SDK 54
- TypeScript
- React Navigation
- Axios
- Expo Go
- React Native Web

### Backend
- Node.js
- Express
- SQLite
- Better SQLite3
- Drizzle ORM
- TypeScript
- ts-node-dev

---

## 📁 Estrutura do Projeto
delivery-livros/
│
├── backend/
│ ├── src/
│ ├── package.json
│ └── tsconfig.json
│
└── frontend/
├── src/
├── App.tsx
├── package.json
└── tsconfig.json

text

---

## ⚙️ Requisitos

| Ferramenta | Versão |
|------------|--------|
| Node.js | 22+ |
| Expo | SDK 54 |
| npm ou yarn | latest |

---

## 🚀 Como Rodar o Backend

### 1. Entrar na pasta
```bash
cd backend
2. Instalar dependências
bash
npm install
3. Rodar servidor
bash
npm run dev
4. API local
text
http://localhost:3333
📦 Dependências Backend
Produção:

bash
npm install express cors drizzle-orm better-sqlite3
Desenvolvimento:

bash
npm install -D typescript ts-node-dev @types/node @types/express @types/cors
🚀 Como Rodar o Frontend
1. Entrar na pasta
bash
cd frontend
2. Instalar dependências
bash
npm install
3. Rodar no navegador
bash
npx expo start --web
4. Rodar no celular
bash
npx expo start
Escaneie o QR Code usando o app Expo Go

📦 Dependências Frontend
bash
# Axios
npm install axios

# React Navigation
npm install @react-navigation/native
npm install @react-navigation/native-stack

# Dependências de navegação
npm install react-native-screens react-native-safe-area-context
npx expo install react-native-gesture-handler react-native-reanimated

# Web
npx expo install @expo/metro-runtime
npm install react-native-web react-dom
🗄️ Banco de Dados
O projeto utiliza:

SQLite local

Drizzle ORM para gerenciamento

Objetivo da escolha:
✅ Simplicidade

✅ Aprendizado

✅ Facilidade de replicação

✅ Rapidez no desenvolvimento

📚 Funcionalidades
👤 Usuários
Cadastro completo (nome, email, senha, telefone, CPF, endereço, cidade)

Login

Logout

Simulação de autenticação com localStorage

📖 Livros
Listagem de livros

Capas dos livros

Controle de disponibilidade

Livros indisponíveis após aluguel

📦 Aluguéis
Solicitação de aluguel

Endereço de entrega

Observações

Contador de livros alugados

📱 Telas
Tela	Descrição
Home	Tela inicial com listagem de livros
Login	Autenticação do usuário
Cadastro	Criação de nova conta
Painel do Usuário	Dashboard com estatísticas
Aluguel	Confirmação de aluguel
🎨 Estilo Visual
O projeto utiliza um design vintage com:

Cores sépia e papel envelhecido

Bordas duplas e elementos retrô

Tipografia clássica

Linhas decorativas

🧠 Observações
O projeto foi desenvolvido de forma simplificada para fins didáticos.

A autenticação foi simulada utilizando localStorage para facilitar testes rápidos e demonstração acadêmica.

👨‍💻 Autor
Projeto acadêmico - Sistema de aluguel de livros BookGo

📄 Licença
Este projeto é de uso educacional e acadêmico.

text

**✅ Melhorias realizadas:**

| Item | Antes | Agora |
|------|-------|-------|
| Estrutura | Texto corrido | Organizado por seções |
| Tabelas | Sem tabelas | Tabela de requisitos e telas |
| Código | Sem formatação | Blocos de código com syntax highlighting |
| Emojis | Poucos | Muitos emojis visuais |
| Hierarquia | Títulos simples | Títulos com `---` e negrito |
| Listas | Sem padrão | Listas com checkmarks |
| Estilo | Plano | Visual moderno e limpo |

**📌 Seções adicionadas:**
- Tabela de versões dos requisitos
- Estrutura de pastas detalhada
- Tabela de telas do sistema
- Seção de estilo visual
- Autor e licença

Agora seu README está **profissional, organizado e bonito**! 🎯
