# App Target (React Native + SQLite)

Um app simples e direto para te ajudar a bater metas financeiras — criar objetivo, registrar depósitos e ver o progresso. Construído com React Native (Expo) e banco local com SQLite, seguindo o curso da Rocketseat. Sem frescura: roda offline, salva tudo no aparelho e é fácil de manter.

## Por que fiz
Eu queria um fluxo rápido para metas financeiras no celular, sem depender de internet ou backend. Aproveitei o módulo do curso sobre SQLite para entender melhor persistência local, migrations e uma camada de DAO/serviços organizada.

## O que dá pra fazer
- Criar metas com título, valor-alvo e prazo.
- Registrar quanto já foi guardado (depósitos).
- Ver a lista de metas, progresso (%) e ordenar por prazo.
- Funciona offline (dados ficam no dispositivo via SQLite).

## Stack
- React Native com Expo (TypeScript)
- Expo Router para navegação
- expo-sqlite para banco local

## Como rodar
1. Clonar e instalar:
   - `git clone <repo>`
   - `cd app-target`
   - `npm install` ou `yarn`
2. Dependência do SQLite:
   - `npx expo install expo-sqlite`
3. Start:
   - `npx expo start`
   - `a` (Android) / `i` (iOS)

Se der erro de tabela, é porque o schema ainda não rodou: abre o app e garante que a inicialização do DB rodou (eu executo o DDL no boot).

## Banco de Dados
- Tabela `targets`: id, title, amount, saved, due_date, created_at, updated_at.
- Tabela `progress_entries` (histórico): id, target_id, value, note, created_at.

Datas são strings ISO. Valores numéricos ficam como REAL no SQLite. Simples o bastante pra evoluir depois.

## Fluxo de uso
1. Criar meta: define título, valor e prazo.
2. Registrar depósitos: vai somando em “saved”.
3. Acompanhar: lista mostra barra de progresso e ordena por prazo.

## Organização do código
- `src/db`: conexão + schema/migrations
- `src/dao`: CRUD direto no banco (targets/progress)
- `src/services`: regras de negócio (ex.: atualizar progresso)
- `src/hooks`: hooks pra consumir os serviços na UI
- `app/`: telas e rotas (Expo Router)

Essa separação deixa a UI leve e o banco isolado. Se amanhã eu quiser trocar SQLite por outro storage, mexo pouco fora de `db/` e `dao/`.

## Aprendizados (SQLite no RN)
- Rodar DDL no boot do app e garantir que as tabelas existem antes da UI tentar ler.
- Usar transações quando atualizo meta + insiro histórico.
- Salvar datas como ISO e formatar só na UI.
- Cuidar do tipo numérico: sempre converter pra Number ao ler do banco.

## Próximos passos
- Filtros e busca por título.
- Gráficos simples de progresso.
- Exportar/Importar dados (JSON).
- Sincronização opcional com backend quando estiver online.

## Licença
MIT. Pode usar, adaptar e abrir PR.
