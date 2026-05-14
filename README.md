# Mercadinho (Lista de Compras Inteligente)

**Aluno:** Nicolas Urban Maurer  
**Atividade:** Mercadinho (lista de compras inteligente)

## Descrição do App
O Mercadinho é um aplicativo de lista de compras intuitivo e inteligente, desenvolvido em React Native (Expo). Ele permite que os usuários adicionem itens categorizados ("Fruta", "Limpeza", "Bebida", "Outro"), visualizem estatísticas de itens pendentes e comprados e gerenciem suas compras do dia a dia de forma simples. 

O aplicativo persiste as informações localmente no dispositivo através do `AsyncStorage`, para que o usuário não perca seus dados ao fechar o app. Além disso, conta com recursos para riscar visualmente itens já comprados com mudança de cores e ícones, e a capacidade de limpar toda a lista rapidamente.

## Instruções para Executar o Projeto

1. **Pré-requisitos:** Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em seu computador e o aplicativo [Expo Go](https://expo.dev/client) no seu celular (ou um emulador devidamente configurado).
2. **Instalação das dependências:**
   No terminal, dentro da pasta do projeto, rode os comandos:
   ```bash
   npm install
   npx expo install @expo/vector-icons
   npx expo install @react-native-async-storage/async-storage
   ```
3. **Iniciando o servidor Expo:**
   Após a instalação das dependências, inicie o servidor rodando:
   ```bash
   npx expo start
   ```
4. **Abrindo o aplicativo:**
   - **No celular:** Abra o aplicativo Expo Go e escaneie o QR Code exibido no terminal.
   - **No Emulador:** Pressione `a` no terminal para abrir no emulador Android ou `i` para o simulador iOS.
