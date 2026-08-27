# ⚽🏆 Popular da Copa — Aplicativo Mobile

**Popular da Copa** é um aplicativo mobile de entretenimento temático para a Copa do Mundo de Futebol, desenvolvido para proporcionar ao torcedor uma experiência completa e imersiva: acompanhar grupos e partidas do torneio, visualizar seleções participantes por confederação, colecionar figurinhas digitais de jogadores, fazer palpites/apostas e gerenciar seu perfil social dentro do aplicativo.

---

## 📌 Sumário

1. [Visão Geral e Funcionalidades](#-visão-geral-e-funcionalidades)
2. [Linguagens e Tecnologias](#-linguagens-e-tecnologias)
3. [Arquitetura e Estrutura do Projeto](#-arquitetura-e-estrutura-do-projeto)
4. [Banco de Dados Local e Nuvem](#-banco-de-dados-local-e-nuvem)
5. [Configuração do Ambiente (.env)](#-configuração-do-ambiente-env)
6. [Como Executar e Testar no Android Studio](#-como-executar-e-testar-no-android-studio)
7. [Scripts Disponíveis](#-scripts-disponíveis)

---

## ⚽ Visão Geral e Funcionalidades

- **👤 Autenticação & Perfil de Usuário**: Cadastro e login via Firebase Authentication, sincronização de dados de perfil no Cloud Firestore (nome, avatar emoji, figurinha especial e saldo de figurinhas).
- **🏆 Grupos e Partidas**: Visualização dos grupos da Copa do Mundo, tabela de classificação (*standings*) e partidas com placares e status atualizados via banco SQLite local.
- **🌍 Seleções Participantes**: Listagem de todas as seleções classificadas com busca por nome e filtro por confederações (UEFA, CONMEBOL, CONCACAF, CAF, AFC, OFC).
- **🃏 Álbum de Figurinhas Digitais**:
  - Abertura de pacotes de figurinhas digitais (5 figurinhas por pacote).
  - Álbum de coleção com progresso e contagem de figurinhas únicas.
  - Controle automático de figurinhas duplicadas.
  - Armazenamento offline de figurinhas via SQLite.
- **🎲 Apostas e Palpites**: Área reservada para palpites de jogos e interatividade do torcedor.

---

## 💻 Linguagens e Tecnologias

| Tecnologia | Versão / Descrição |
|---|---|
| **Linguagem Principal** | **TypeScript** (`.ts` / `.tsx`) — Tipagem estática e segurança no desenvolvimento |
| **Framework Mobile** | **React Native** (v0.86 / v0.81) |
| **SDK & Tooling** | **Expo SDK 57** (New Architecture habilitada com engine **Hermes**) |
| **Roteamento** | **Expo Router v57** (File-system based routing) |
| **Estilização & UI** | React Native `StyleSheet`, `expo-linear-gradient`, `expo-image`, `@expo/vector-icons` |
| **Animações & Gestos** | `react-native-reanimated`, `react-native-gesture-handler` |
| **Banco de Dados Local** | `expo-sqlite` (SQLite 3 nativo com suporte a WAL mode e auto-seeding) |
| **Backend & Cloud** | Firebase Auth, Firebase Cloud Firestore |
| **Persistência de Sessão** | `@react-native-async-storage/async-storage` |

---

## 🏗️ Arquitetura e Estrutura do Projeto

O projeto segue os princípios da **Clean Architecture** combinada com **Feature-First (Modular) Architecture**, dividindo cada funcionalidade nas três camadas fundamentais da Clean Architecture:

```
src/
├── app/                        ← Roteamento Expo Router (Rotas baseadas em arquivos)
│   ├── _layout.tsx             ← Layout raiz (Header global + Bottom Navigation Bar)
│   ├── index.tsx               ← Rota inicial (Redirecionamento para Home)
│   ├── login.tsx / register.tsx ← Autenticação
│   ├── profile.tsx             ← Perfil de usuário
│   ├── groups.tsx              ← Fase de Grupos e Classificação
│   ├── teams.tsx               ← Seleções e Filtros
│   ├── sticker.tsx             ← Pacotes de Figurinhas
│   ├── collection.tsx          ← Álbum de Coleção
│   └── bets.tsx                ← Apostas e Palpites
├── features/                   ← Módulos isolados por funcionalidade (Feature-First)
│   ├── auth/                   ← Domínio, dados e telas de autenticação
│   ├── home/                   ← Hub principal
│   ├── groups/                 ← Lógica de grupos, partidas e classificações
│   ├── teams/                  ← Lógica de seleções por confederação
│   ├── stickers/               ← Lógica de coleção e abertura de pacotes
│   └── bets/                   ← Lógica de apostas
└── shared/                     ← Código compartilhado entre módulos
    ├── data/                   ← Dados estáticos e configuração do SQLite (Migrations e Seeds)
    ├── domain/                 ← Entidades compartilhadas (Team, Match, Standing, etc.)
    └── presentation/           ← Componentes reutilizáveis de layout e UI
```

### Divisão de Camadas por Feature

- **`domain/`**: Entidades puras, interfaces de repositório (`ITeamRepository`) e Use Cases em classes com injeção de dependência (`GetTeamsUseCase`).
- **`data/`**: Datasources nativos (SQLite/Firebase) e implementações concretas dos repositórios.
- **`presentation/`**: Componentes de tela, hooks de estado e arquivos de estilos dedicados (`styles/`).

---

## 🗄️ Banco de Dados Local e Nuvem

### 1. SQLite Local (`expo-sqlite`)
Gerenciado com controle de migrações automáticas por versão (`PRAGMA user_version`):
- **Tabelas**: `user_profile`, `sticker_packs`, `collected_stickers`, `teams` e `matches`.
- **Migrations & Seeds**: População automática das seleções e partidas da Copa do Mundo na primeira execução (versão v2 do banco).

### 2. Firebase Cloud
- **Authentication**: Gerenciamento de login e criação de contas com rollback transacional em caso de erro.
- **Firestore**: Gravação de dados extras do usuário (`username`, `avatarEmoji`, `stickerCount`, `favoriteSpecialSticker`).

---

## 🔑 Configuração do Ambiente (.env)

Crie um arquivo `.env` na raiz do projeto com as credenciais do seu projeto Firebase:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=sua_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=seu_projeto
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=seu_app_id
```

---

## 📱 Como Executar e Testar no Android Studio

Para rodar o aplicativo no **Android Studio** (emulador Android virtual AVD), siga o passo a passo detalhado abaixo.

### 1. Pré-requisitos
1. Instale o **Node.js** (v18 ou superior).
2. Instale o **Android Studio**:
   - Durante a instalação, garanta que os componentes **Android SDK**, **Android SDK Platform-Tools** e **Android Virtual Device (AVD)** estejam selecionados.
3. Configure as **Variáveis de Ambiente do Sistema (Windows)**:
   - Defina `ANDROID_HOME`: `C:\Users\<SeuUsuario>\AppData\Local\Android\Sdk`
   - Adicione ao `Path`:
     - `%ANDROID_HOME%\platform-tools`
     - `%ANDROID_HOME%\emulator`

### 2. Criar e Iniciar o Emulador no Android Studio
1. Abra o **Android Studio**.
2. No menu inicial ou topo superior direito, clique em **More Actions** ➔ **Virtual Device Manager** (ou **AVD Manager**).
3. Clique em **Create Device** (Criar Dispositivo Virtual).
4. Escolha um dispositivo (ex: **Pixel 6** ou **Pixel 7**).
5. Selecione uma imagem do sistema (recomendado: **Android 13.0 (API 33)** ou **Android 14.0 (API 34)** com Google Play).
6. Finalize a criação e clique no botão **Play (▶️)** para ligar o emulador.

### 3. Instalar Dependências do Projeto
No terminal do projeto, execute:
```bash
npm install
```

### 4. Executar o App via Expo no Emulador Android

Com o emulador do Android Studio já aberto e rodando na tela:

**Opção A: Executar diretamente no Android via Expo CLI (Recomendado)**
```bash
npm run android
# ou
npx expo start --android
```
> O servidor Metro Bundler iniciará e compilará/instalará o aplicativo automaticamente dentro do emulador Android.

**Opção B: Iniciar o Metro e pressionar `a`**
1. Inicie o servidor Metro:
   ```bash
   npm start
   ```
2. Quando o menu interativo aparecer no terminal, pressione a tecla **`a`** para abrir no emulador Android.

---

### 5. Compilação Nativa Completa no Android Studio (Build Nativo)

Se desejar abrir o projeto nativo diretamente no Android Studio para debug ou compilação de APK/AAB:

1. Gere a pasta nativa do Android rodando o prebuild do Expo:
   ```bash
   npx expo prebuild
   ```
2. Abra o **Android Studio**.
3. Escolha **Open** e selecione a pasta `android/` gerada dentro do seu projeto (`app_copa/android`).
4. Aguarde o Gradle sincronizar as dependências e o indexador concluir.
5. No topo, selecione o emulador iniciado e clique no botão **Run 'app' (Shift + F10)**.
6. Em um terminal à parte, mantenha o servidor JS ativo:
   ```bash
   npx expo start
   ```

---

## 📜 Scripts Disponíveis

| Comando | Descrição |
|---|---|
| `npm start` / `npx expo start` | Inicia o servidor de desenvolvimento Expo (Metro Bundler) |
| `npm run android` | Inicia o servidor e abre a aplicação no emulador Android |
| `npm run ios` | Inicia o servidor e abre a aplicação no simulador iOS (macOS) |
| `npm run web` | Executa a aplicação no navegador web |
| `npm run lint` | Executa a verificação de código com ESLint |
| `npm test` | Executa a suíte de testes unitários com Jest |

---

Desenvolvido para proporcionar a melhor experiência ao torcedor na Copa do Mundo! ⚽🔥
