# Sistema de Exibição de Versículos Bíblicos para Telão

Sistema simples para exibir versículos da Bíblia em telão de igreja, desenvolvido com Next.js e pronto para deploy na Vercel.

## 🎯 Funcionalidades

- **Painel de Controle**: Interface para pesquisar e selecionar versículos
- **Tela de Exibição**: Versículos exibidos em tela cheia com design elegante
- **Responsivo**: Funciona em diferentes tamanhos de tela
- **Fácil de usar**: Interface intuitiva para operadores

## 🚀 Como Usar

### Localmente

1. Instale as dependências:
```bash
npm install
```

2. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

3. Abra o navegador em `http://localhost:3000`

### Workflow de Operação

1. Acesse o painel de controle (página inicial)
2. Selecione o livro, capítulo e versículo desejado
3. Clique em "Enviar para Telão (Tela Cheia)"
4. Uma nova janela/aba abrirá com o versículo em tela cheia
5. Se necessário, clique no botão "Tela Cheia" ou pressione F11

## 📦 Deploy na Vercel

### Opção 1: Via GitHub (Recomendado)

1. Faça push do código para um repositório GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Clique em "Add New Project"
4. Importe seu repositório GitHub
5. A Vercel detectará automaticamente que é um projeto Next.js
6. Clique em "Deploy"

### Opção 2: Via Vercel CLI

1. Instale a Vercel CLI:
```bash
npm i -g vercel
```

2. Execute o deploy:
```bash
vercel
```

3. Siga as instruções no terminal

## 🎨 Personalização

### Adicionar Mais Versículos

Edite o arquivo `src/data/biblia.ts` e adicione mais versículos ao array `bibliaData`.

### Alterar Cores e Estilo

- **Painel**: Edite `src/pages/index.tsx`
- **Telão**: Edite `src/pages/telao.tsx`

As cores usam Tailwind CSS, facilitando a customização.

## 📱 Dicas de Uso

- **Dois Monitores**: Mantenha o painel de controle em um monitor e o telão em outro
- **Navegador**: Recomendado usar Chrome ou Edge para melhor suporte a tela cheia
- **Atalhos**: F11 para alternar tela cheia rapidamente

## 🛠️ Tecnologias

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Vercel (hospedagem)

## 📄 Licença

Livre para uso em igrejas e ministérios.

## 🙏 Contribuindo

Sinta-se livre para adicionar mais versículos, melhorar o design ou adicionar novas funcionalidades!
