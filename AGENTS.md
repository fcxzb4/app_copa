# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v54.0.0/ before writing any code.

---

# 📋 Documentação do Projeto — Popular da Copa

## 1. Visão Geral

**Popular da Copa** é um aplicativo mobile de entretenimento temático para a Copa do Mundo de Futebol. O objetivo principal é proporcionar ao torcedor uma experiência completa e imersiva: acompanhar grupos e partidas do torneio, visualizar as seleções participantes, colecionar figurinhas digitais de jogadores e gerenciar seu perfil social dentro do aplicativo.

## 2. Linguagem e Plataforma

| Item | Detalhe |
|---|---|
| **Linguagem principal** | TypeScript (`.ts` / `.tsx`) |
| **Framework mobile** | React Native 0.81.5 |
| **Plataforma de build** | Expo SDK 57 (New Architecture habilitada) |
| **Roteamento** | Expo Router v57 (file-system based routing) |
| **Suporte** | Android, iOS e Web (output estático) |
| **Runtime JS** | Hermes (padrão no New Arch) |

## 3. Arquitetura

O projeto segue os princípios da **Clean Architecture** combinada com **Feature-First (Modular) Architecture**. A separação de responsabilidades é feita em três camadas verticais, repetidas dentro de cada feature:

```
src/
├── app/                        ← Roteamento (Expo Router — file-based)
├── features/                   ← Módulos de funcionalidade (Feature-First)
│   ├── auth/
│   ├── home/
│   ├── groups/
│   ├── teams/
│   └── stickers/
└── shared/                     ← Código verdadeiramente compartilhado
    ├── data/
    ├── domain/
    └── presentation/
```

### 3.1 Camadas por Feature

Cada feature segue a divisão em três camadas da Clean Architecture:

```
feature/
├── domain/
│   ├── entities/       ← Interfaces/tipos do domínio (sem dependência externa)
│   ├── repositories/   ← Contratos (interfaces) para acesso a dados
│   └── usecases/       ← Regras de negócio puras
├── data/
│   ├── datasources/    ← Acesso direto a fonte de dados (SQLite, Firebase, etc.)
│   └── repositories/   ← Implementação concreta dos contratos do domínio
└── presentation/
    ├── <Screen>.tsx     ← Componentes de tela (View)
    └── styles/          ← Estilos isolados por tela
```

## 4. Stack Tecnológico Completo

### 4.1 Frontend / UI

| Biblioteca | Versão | Uso |
|---|---|---|
| `react` | 19.1.0 | Core |
| `react-native` | 0.81.5 | Framework mobile |
| `expo` | ~57.0.8 | SDK e build tooling |
| `expo-router` | ~57.0.8 | Roteamento file-system |
| `react-native-reanimated` | ~4.1.1 | Animações performáticas |
| `react-native-gesture-handler` | ~2.28.0 | Gestos nativos |
| `react-native-safe-area-context` | ~5.6.0 | SafeArea handling |
| `react-native-screens` | ~4.16.0 | Telas nativas otimizadas |
| `expo-linear-gradient` | ~15.0.8 | Gradientes |
| `expo-image` | ~3.0.11 | Imagens otimizadas |
| `expo-symbols` | ~1.0.8 | SF Symbols (iOS) |
| `@expo/vector-icons` | ~15.0.3 | Ionicons e outros |
| `expo-haptics` | ~15.0.8 | Feedback háptico |

### 4.2 Backend / Persistência

| Serviço / Biblioteca | Uso |
|---|---|
| **Firebase Authentication** | Login, cadastro e sessão do usuário |
| **Firebase Firestore** | Perfil do usuário e dados da figurinha especial |
| **expo-sqlite** (~57.0.1) | Banco local SQLite para figurinhas, partidas e times |
| **@react-native-async-storage/async-storage** | Persistência de sessão do Firebase Auth |

### 4.3 Dados Estáticos

| Arquivo | Conteúdo |
|---|---|
| `src/shared/data/worldCupData.ts` | Dados completos da Copa (jogadores, times, grupos) |
| `src/shared/data/confederations.ts` | Mapeamento de confederações |

## 5. Features do Aplicativo

### 5.1 `auth` — Autenticação

- **Login** com e-mail e senha via Firebase Authentication
- **Cadastro** com e-mail, senha, nome de usuário, quantidade de figurinhas e figurinha especial favorita
- **Logout** com limpeza de estado
- **Persistência de sessão** via AsyncStorage (usuário permanece logado após fechar o app)
- **Rollback transacional**: se o Firestore falhar após criar conta no Auth, a conta órfã é deletada automaticamente
- **Tradução de erros** do Firebase para português
- Componentes: `LoginScreen.tsx`, `RegisterScreen.tsx`, `ProfileScreen.tsx`, `AuthContext.tsx`

### 5.2 `home` — Tela Principal

- Tela de boas-vindas e hub de navegação
- Componente: `HomeScreen.tsx`

### 5.3 `groups` — Fase de Grupos

- Visualização dos grupos da Copa do Mundo
- Tabela de classificação de cada grupo (Standings)
- Lista de partidas por grupo com resultado (placar) ou status
- **Entidades de domínio**: `Match`, `Standing`
- **Use Cases**: `GetGroupsUseCase`, `GetMatchesUseCase`
- **Repositório**: `GroupRepository` (lê do SQLite via `localGroupDataSource`)
- Componente: `GroupStageScreen.tsx`

### 5.4 `teams` — Seleções

- Listagem de todas as seleções participantes da Copa
- Filtros por confederação (UEFA, CONMEBOL, CONCACAF, CAF, AFC, OFC) e busca por nome
- **Entidade de domínio**: `Team`
- **Use Case**: `GetTeamsUseCase`
- **Repositório**: `TeamRepository` (lê do SQLite via `localTeamDataSource`)
- Componente: `TeamsScreen.tsx`

### 5.5 `stickers` — Figurinhas

- Abertura de **pacotes de figurinhas** digitais (5 figurinhas por pacote)
- **Álbum de coleção** com visualização das figurinhas únicas coletadas
- Detecção de **figurinhas duplicadas**
- Controle de saldo de pacotes restantes
- **Repositório**: `StickerRepository` (lê/escreve no SQLite via hook `useStickerDatabase`)
- Componentes: `StickersScreen.tsx`, `MyCollectionScreen.tsx`

## 6. Banco de Dados Local (SQLite)

Gerenciado pelo `expo-sqlite` com sistema de migrations versionadas via `PRAGMA user_version`.

- **Arquivo de configuração**: `src/shared/data/database/database.ts`
- **Provider**: `src/shared/data/database/DatabaseProvider.tsx` (wraps `<SQLiteProvider>` com `Suspense`)

### Schema (versão atual: v2)

| Tabela | Descrição |
|---|---|
| `user_profile` | Perfil local do usuário (uid, nome, emoji) |
| `sticker_packs` | Controle de pacotes de figurinhas restantes |
| `collected_stickers` | Figurinhas coletadas (com flag de duplicata) |
| `teams` | Todas as seleções da Copa (populado via seed automático) |
| `matches` | Todas as partidas da Copa (populado via seed automático) |

### Migrations

- **v1**: Cria tabelas de perfil e figurinhas; insere linha inicial de controle de pacotes (5 pacotes)
- **v2**: Cria tabelas `teams` e `matches`; executa seeding automático com dados do torneio

**Seeds**: `src/shared/data/database/seeds/` → `teamsSeed.ts`, `matchesSeed.ts`, `runSeed.ts`

**Performance**: WAL mode habilitado (`PRAGMA journal_mode = WAL`) e foreign keys ativadas (`PRAGMA foreign_keys = ON`).

## 7. Roteamento (Expo Router — File-Based)

Todas as rotas ficam em `src/app/`. O `_layout.tsx` é o layout raiz que envolve todos os filhos.

| Rota | Tela |
|---|---|
| `/` (`index.tsx`) | Redireciona para Home |
| `/login` | LoginScreen |
| `/register` | RegisterScreen |
| `/profile` | ProfileScreen |
| `/groups` | GroupStageScreen |
| `/teams` | TeamsScreen |
| `/sticker` | StickersScreen |
| `/collection` | MyCollectionScreen |

### Layout Global (`_layout.tsx`)

- **Header fixo** no topo: hamburguer menu + título "Popular da Copa" + avatar emoji do usuário
- **Bottom navigation bar** com 5 tabs: Home, Grupos, Times, Figurinhas, Apostas
- Tab ativa renderizada como **cápsula colorida** (estilo pill)
- Wrapping: `DatabaseProvider` → `AuthProvider` → `AppContent`
- `Suspense` com fallback de loading enquanto o banco SQLite inicializa

## 8. Autenticação e Estado Global

- **Firebase Auth**: fonte de verdade para identidade do usuário
- **Firebase Firestore**: armazena dados extras (username, avatarEmoji, stickerCount, figurinha especial)
- **AuthContext** (`AuthContext.tsx`): Context API do React; expõe `user`, `isLoggedIn`, `isLoading`, `login`, `register`, `logout`
- **Hook**: `useAuth()` para consumir o contexto em qualquer componente

## 9. Configuração e Variáveis de Ambiente

As credenciais do Firebase são carregadas via variáveis de ambiente com prefixo `EXPO_PUBLIC_`:

```
EXPO_PUBLIC_FIREBASE_API_KEY
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN
EXPO_PUBLIC_FIREBASE_PROJECT_ID
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
EXPO_PUBLIC_FIREBASE_APP_ID
```

Definidas no arquivo `.env` (não versionado) na raiz do projeto.

## 10. Configurações Especiais do Expo (app.json)

| Configuração | Valor / Detalhe |
|---|---|
| `newArchEnabled` | `true` — New Architecture do React Native habilitada |
| `experiments.typedRoutes` | `true` — Tipagem estática das rotas do Expo Router |
| `experiments.reactCompiler` | `true` — React Compiler habilitado |
| `android.edgeToEdgeEnabled` | `true` — Layout edge-to-edge no Android |
| `scheme` | `appcopa` — URI scheme para deep linking |
| Splash Screen | Imagem configurada com suporte a dark mode |

## 11. Estrutura de Arquivos Resumida

```
app_copa/
├── src/
│   ├── app/                          ← Rotas (Expo Router)
│   │   ├── _layout.tsx               ← Root layout (header + bottom nav)
│   │   ├── index.tsx                 ← Rota raiz
│   │   ├── login.tsx / register.tsx  ← Auth routes
│   │   ├── profile.tsx
│   │   ├── groups.tsx
│   │   ├── teams.tsx
│   │   ├── sticker.tsx
│   │   └── collection.tsx
│   ├── features/
│   │   ├── auth/
│   │   │   ├── domain/entities/User.ts
│   │   │   └── presentation/
│   │   │       ├── AuthContext.tsx
│   │   │       ├── LoginScreen.tsx
│   │   │       ├── RegisterScreen.tsx
│   │   │       └── ProfileScreen.tsx
│   │   ├── home/
│   │   │   └── presentation/HomeScreen.tsx
│   │   ├── groups/
│   │   │   ├── domain/entities/{Match,Standing}.ts
│   │   │   ├── domain/usecases/{GetGroups,GetMatches}UseCase.ts
│   │   │   ├── data/{datasources,repositories}/
│   │   │   └── presentation/GroupStageScreen.tsx
│   │   ├── teams/
│   │   │   ├── domain/entities/Team.ts
│   │   │   ├── domain/usecases/GetTeamsUseCase.ts
│   │   │   ├── domain/repositories/ITeamRepository.ts
│   │   │   ├── data/{datasources,repositories}/
│   │   │   └── presentation/TeamsScreen.tsx
│   │   └── stickers/
│   │       ├── data/StickerRepository.ts
│   │       ├── data/useStickerDatabase.ts
│   │       └── presentation/{StickersScreen,MyCollectionScreen}.tsx
│   └── shared/
│       ├── data/
│       │   ├── worldCupData.ts           ← Dados estáticos da Copa
│       │   ├── confederations.ts
│       │   └── database/
│       │       ├── database.ts           ← Migrations SQLite
│       │       ├── DatabaseProvider.tsx  ← SQLiteProvider wrapper
│       │       └── seeds/               ← teamsSeed, matchesSeed, runSeed
│       ├── domain/entities/index.ts     ← Tipos globais (Team, Match, Standing, Confederation)
│       └── presentation/components/
│           └── layout/layoutStyles.ts   ← Estilos do layout global
├── firebaseConfig.js                    ← Inicialização Firebase (Auth + Firestore)
├── app.json                             ← Config Expo
├── package.json
├── tsconfig.json
└── .env                                 ← Credenciais Firebase (não versionado)
```

## 12. Padrões e Convenções de Código

- **Estilos externalizados**: nenhum `StyleSheet.create` inline nas screens — estilos ficam em arquivos `styles/` dedicados dentro de cada feature
- **Repository pattern**: toda lógica de acesso a dados passa por um repositório; as screens não acessam SQLite ou Firebase diretamente
- **Use Cases como classes**: lógica de negócio encapsulada em classes (`GetTeamsUseCase`, `GetGroupsUseCase`, etc.) com injeção de dependência pelo construtor
- **Contratos via Interface**: repositórios têm interfaces no domínio (`ITeamRepository`) e implementações concretas na camada de dados
- **Inicialização única do Firebase**: guard contra re-inicialização durante HMR do Metro (`getApps().length === 0`)
- **Erros do Firebase traduzidos para pt-BR** via função `mapFirebaseError()`
- **Rollback transacional no cadastro**: se o Firestore falhar após criar a conta no Auth, a conta órfã é deletada automaticamente para manter consistência
- **WAL mode no SQLite**: habilitado para melhor performance em leituras/escritas concorrentes
