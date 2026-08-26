# ITED — Igreja Internacional Tenda do Encontro com Deus

Bem-vindo ao repositório oficial da plataforma web da **ITED (Igreja Internacional Tenda do Encontro com Deus)**, sediada no Matacuane, Beira — Moçambique, sob a liderança do **Apóstolo Rev. Clemente Raiva**.

---

## Sobre a ITED

A **ITED** é mais do que uma instituição; é um refúgio espiritual e uma comunidade cristã viva dedicada à manifestação genuína do Reino de Deus, ao acolhimento de famílias e à transformação de vidas através da Palavra, oração e serviço comunitário.

### Pilares
- **Visão**: Ser uma casa de adoração e restauração espiritual para as nações.
- **Valores**: Comunhão, fidelidade à Palavra de Deus, integridade e amor ao próximo.
- **Missão**: Pregar o Evangelho, edificar vidas e impactar a sociedade através de ações práticas de fé.

---

## Tecnologias Utilizadas

Este projeto foi desenvolvido com uma arquitetura moderna, responsiva, rápida e integrada a um sistema de gestão de conteúdo (CMS):

### Frontend
- **[React 19](https://react.dev/)** com **[TypeScript](https://www.typescriptlang.org/)**
- **[Vite](https://vitejs.dev/)** para build ultra-rápido e HMR
- **[Tailwind CSS](https://tailwindcss.com/)** com paleta institucional personalizada (*Obsidian Dark, Champagne Gold, Pure Ivory*)
- **[Framer Motion](https://www.framer.com/motion/)** & **[GSAP](https://greensock.com/gsap/)** para micro-animações suaves e transições
- **[React Icons](https://react-icons.github.io/react-icons/)**
- **[React Router DOM](https://reactrouter.com/)**

### CMS & Dados
- **[Sanity Studio v5](https://www.sanity.io/)** — Gerenciamento headless de conteúdos (cultos, eventos, avisos, galeria e textos institucionais)

### Backend & Integrações
- **[Express](https://expressjs.com/)** & **[Bun](https://bun.sh/) / Node.js**
- **[Nodemailer](https://nodemailer.com/)** para envio de mensagens do formulário de contacto e pedidos de oração

---

## Estrutura do Projeto

```
ITED/
├── public/                # Imagens públicas, manifest e ícones
├── server/                # Servidor Express & serviço de e-mail
├── src/
│   ├── app/               # Ponto de entrada da aplicação
│   ├── cms/               # Schemas e cliente de conexão com Sanity CMS
│   ├── features/          # Funcionalidades específicas (ex: contacto)
│   ├── layouts/           # Header, Footer, Navegação e Layout base
│   ├── pages/             # Páginas da aplicação (Home, Calendário, Paróquias, etc.)
│   ├── services/          # Clientes de API e serviços externos
│   ├── shared/            # Componentes reutilizáveis (Button, Card, Input, etc.)
│   ├── styles/            # Estilos globais, tipografia e temas
│   └── widgets/           # Seções completas da UI (Hero, Sobre, Horários, Galeria...)
├── tailwind.config.js     # Configuração do Tailwind e Design System
├── sanity.config.ts       # Configuração do Sanity Studio
└── package.json
```

---

## Como Executar o Projeto

### Pré-requisitos
- Node.js (v18+) ou [Bun](https://bun.sh/)
- Gestor de pacotes (`npm`, `yarn`, `pnpm` ou `bun`)

### 1. Clonar e Instalar Dependências
```bash
git clone <url-do-repositorio>
cd ITED
npm install
# ou
bun install
```

### 2. Configurar Variáveis de Ambiente
Crie um arquivo `.env` na raiz baseado no `.env.example`:
```env
VITE_SANITY_PROJECT_ID=seu_project_id
VITE_SANITY_DATASET=production
EMAIL_USER=seu_email@ited.com
EMAIL_PASS=sua_senha_ou_app_key
```

### 3. Iniciar o Ambiente de Desenvolvimento
```bash
npm run dev
# ou
bun run dev
```
Acesse a aplicação em `http://localhost:5173`.

### 4. Build de Produção
```bash
npm run build
```

---

## Localização & Contactos

- **Sede Principal**: Matacuane, Beira — Moçambique
- **Outras Paróquias**: Munhava, Muthindire e extensões
- **E-mail**: `itedmidia@gmail.com`
- **Telefone**: `+258 84 808 3482`

---

## Licença

Este projeto é de uso exclusivo e institucional da **Igreja Internacional Tenda do Encontro com Deus (ITED)**. Todos os direitos reservados.
