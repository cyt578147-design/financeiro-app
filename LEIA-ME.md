# Financeiro e Horas — configurar e publicar

Agora o app sincroniza de verdade entre PC e celular (usando Firebase,
plano grátis do Google). Antes de subir no GitHub, você precisa criar
o seu projeto Firebase e colar as chaves no código. É rápido.

## Passo 1 — Criar o projeto no Firebase

1. Acesse **console.firebase.google.com** e entre com sua conta Google.
2. Clique em **Adicionar projeto**, dê um nome (ex: `meu-financeiro`) e siga o assistente (pode desativar o Google Analytics, não precisa).
3. Dentro do projeto, no menu lateral, vá em **Compilação → Authentication**.
   - Clique em **Vamos começar**.
   - Ative o provedor **Email/senha** e salve.
4. Ainda no menu lateral, vá em **Compilação → Firestore Database**.
   - Clique em **Criar banco de dados**.
   - Escolha o modo **produção** e a região mais próxima (ex: `southamerica-east1`).
5. Vá em **Regras** (aba dentro do Firestore) e substitua tudo pelo texto abaixo, depois clique em **Publicar**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /usuarios/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

Isso garante que só você (logado) consegue ler ou escrever os seus dados.

## Passo 2 — Pegar as chaves do projeto

1. No menu lateral, clique na engrenagem ⚙️ → **Configurações do projeto**.
2. Role até **Seus apps** → clique no ícone **</>** (Web) → dê um nome e clique em **Registrar app**.
3. Vai aparecer um bloco de código com `firebaseConfig = { apiKey: "...", ... }`.
4. Copie esses valores.

## Passo 3 — Colar as chaves no arquivo

1. Abra o arquivo `index.html` desta pasta em qualquer editor de texto (até o Bloco de Notas serve).
2. Procure este trecho, bem no início do `<script>`:

```js
const firebaseConfig = {
  apiKey: "COLOQUE_AQUI",
  authDomain: "COLOQUE_AQUI.firebaseapp.com",
  projectId: "COLOQUE_AQUI",
  storageBucket: "COLOQUE_AQUI.appspot.com",
  messagingSenderId: "COLOQUE_AQUI",
  appId: "COLOQUE_AQUI"
};
```

3. Substitua pelos valores que você copiou no Passo 2. Salve o arquivo.

## Passo 4 — Subir no GitHub Pages

Mesmo processo de antes:
1. Crie um repositório novo no GitHub (público).
2. Envie `index.html`, `manifest.json`, `service-worker.js` e a pasta `icons/` pelo **Add file → Upload files**.
3. Em **Settings → Pages**, ative o branch `main` na raiz.
4. Pegue o link `https://seuusuario.github.io/repo/`.

## Passo 5 — Usar

1. Abra o link no PC e no celular.
2. Na primeira vez, clique em **"Ainda não tenho conta — criar agora"**, digite um email e senha (pode ser fictício, é só pra identificar sua conta) e crie.
3. No outro aparelho, entre com o **mesmo email e senha**.
4. Pronto — qualquer lançamento feito em um aparelho aparece automaticamente no outro (o app usa sincronização em tempo real).

## Sobre o menu ⋮

No canto superior direito, o menu deixa trocar entre:
- **Financeiro** — gasto e lucro por dia, gráfico de saldo acumulado, categorias de gasto e nota do dia.
- **Horas trabalhadas** — hora de início e fim do expediente, gráfico de horas por dia, nota do dia.
- **Comparativo** — dois gráficos de barras com os últimos 12 meses (saldo financeiro e horas trabalhadas), a partir do mês selecionado na tela Financeiro.

Cada modo guarda os dados separadamente, mês a mês.

## Categorias de gasto

Ao lançar um gasto, dá pra escolher uma categoria (Equipamento, Assinatura,
Marketing, Alimentação, Transporte, Imposto ou Outros). Abaixo dos cartões
de resumo aparece um gráfico de barras horizontais mostrando pra onde o
dinheiro foi no mês.

## Nota do dia

Tanto no modo Financeiro quanto no Horas, dá pra escrever uma nota curta
lembrando o que gerou aquele lançamento (ex: "comprei fonte pro PC",
"gravação vídeo Solo Leveling"). Dias com nota aparecem com uma bolinha
dourada no canto do calendário.

## Origem do lucro

Ao lançar um lucro, tem um campo "De onde veio o lucro" com sugestões
(YouTube, TikTok, Instagram, Produto, Patrocínio) mas você pode digitar
qualquer texto. Abaixo dos cartões aparece um gráfico mostrando quanto
veio de cada origem no período.

## Meta de horas diárias

No modo Horas trabalhadas, clique em "editar" ao lado de "Meta diária"
pra definir sua meta (em horas). O gráfico de barras mostra uma linha
pontilhada com a meta, e os dias que bateram a meta ficam verdes; os que
não bateram ficam azuis.

## Modo Mês / Semana

Logo abaixo da navegação de data tem dois botões: **Mês** e **Semana**.
No modo Semana, o calendário e o gráfico mostram só os 7 dias da semana
selecionada, com botões ‹ › pra navegar semana a semana (sempre dentro
do mês ativo — pra trocar de mês, volte pro modo Mês).

## Custos

O plano gratuito do Firebase (Spark) cobre tranquilamente o uso de uma
pessoa só lançando dados diários — você não vai precisar pagar nada
pra isso.
