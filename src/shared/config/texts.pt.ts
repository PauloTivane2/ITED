/**
 * Textos centralizados - Português de Portugal (AO90)
 * Último update: 2026
 */

export const TEXTS_PT = {
  // === NAVEGAÇÃO & HEADER ===
  navigation: {
    home: 'Início',
    about: 'Sobre Nós',
    ministries: 'Ministérios',
    events: 'Eventos',
    gallery: 'Galeria',
    contact: 'Fale Connosco',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    parishes: 'Paróquias',
    privacity: 'Privacidade',
    terms: 'Termos de Uso',
  },

  // === PRÉ-ACORDO (CONSENTIMENTO) ===
  preAgreement: {
    title: 'Bem-vindo à ITED',
    subtitle: 'Antes de começar, gostaríamos de conversar consigo',
    description:
      'A sua privacidade é importante. Este site utiliza cookies para melhorar a sua experiência e compreender melhor como navegam os nossos visitantes. Nada de dados pessoais é partilhado sem o seu consentimento explícito.',
    sections: {
      cookies: {
        title: '🍪 Cookies Necessários',
        description:
          'Utilizamos cookies para guardar as suas preferências de navegação e conteúdo. Nada à menos que consinta, não recolhemos dados para análise.',
      },
      analytics: {
        title: '📊 Análise (Opcional)',
        description:
          'Com a sua permissão, podemos ver estatísticas sobre como navega o site — isto ajuda-nos a melhorar a experiência sem guardar identificadores pessoais.',
      },
      contact: {
        title: '💬 Comunicações',
        description:
          'Quando envia um formulário connosco (pedido de oração, contacto, etc), os seus dados são utilizados apenas para responder de forma adequada e respeitar a sua privacidade.',
      },
    },
    buttons: {
      accept: 'Aceito e Continuo',
      rejectAnalytics: 'Rejeitar Análises',
      customize: 'Personalizar',
      learnMore: 'Saber Mais',
    },
    footer:
      'Pode mudar estas definições em qualquer momento nas Definições de Privacidade.',
  },

  // === HERO SECTION ===
  hero: {
    welcome: 'Seja bem-vindo à ITED • Baseados na fé',
    searchLabel: 'Encontre',
    options: [
      {
        label: 'fé, esperança',
      },
      {
        label: 'comunidade e paz',
      },
      {
        label: 'graça e redenção',
      },
      {
        label: 'amor e propósito',
      },
    ],
  },

  // === SOBRE NÓS ===
  about: {
    kicker: 'Excelência & Fé',
    titles: {
      founded: 'Fundada na',
      word: 'Palavra',
      driven: 'Movida pelo',
      love: 'Amor',
    },
    vision: {
      title: 'Visão',
      description: 'Ser casa de adoração para as nações.',
    },
    mission: {
      title: 'Missão',
      description: 'Levar o Evangelho e transformar vidas.',
    },
    values: {
      title: 'Valores',
      description: 'Comunhão, Ensino e Amor Próximo.',
    },
    stats: {
      yearsLabel: 'Anos transformando vidas na nossa comunidade.',
      yearsValue: '10+',
    },
  },

  // === FORMULÁRIO DE CONTACTO ===
  contact: {
    pageTitle: 'Fale Connosco',
    pageDescription: 'Estamos aqui para ouvir. Envie a sua mensagem e responderemos brevemente.',
    form: {
      name: {
        label: 'Nome Completo',
        placeholder: 'O seu nome',
        error: 'O nome é obrigatório.',
      },
      email: {
        label: 'Email',
        placeholder: 'seu@email.com',
      },
      phone: {
        label: 'Telefone',
        placeholder: '+258 84 808 3482',
      },
      contactError: 'Forneça email ou telefone.',
      subject: {
        label: 'Assunto',
        placeholder: 'Escolha um assunto',
        error: 'O assunto é obrigatório.',
        options: [
          'Pedido de Oração',
          'Informações Gerais',
          'Apoio Pastoral',
          'Dízimos e Ofertas',
          'Voluntariado',
          'Ministérios',
        ],
      },
      message: {
        label: 'Mensagem',
        placeholder: 'Escreva a sua mensagem aqui...',
        error: 'A mensagem não pode estar vazia.',
      },
      button: 'Enviar Mensagem',
      successMessage: 'Obrigado! A sua mensagem foi enviada com sucesso. Responderemos em breve.',
      errorMessage:
        'Ocorreu um problema ao enviar a mensagem. Por favor, tente novamente mais tarde.',
    },
  },

  // === HORÁRIOS DE SERVIÇO ===
  serviceTimes: {
    sectionTitle: 'Programação',
    heading: 'Nossos Horários',
    description:
      'Temos encontros semanais pensados para o edificar. Escolha o melhor horário e venha estar connosco.',
    fallbackService: {
      day: 'Domingo',
      name: 'Culto de Adoração',
      time: '09:00 — 12:30',
      description:
        'Momento especial de adoração, louvor e ministração da palavra.',
    },
    schedule: [
      {
        day: 'Segunda',
        name: 'Intercessão',
        time: '17:00',
      },
      {
        day: 'Quinta',
        name: 'Ensino',
        time: '17:30',
      },
      {
        day: 'Sexta',
        name: 'Mulheres',
        time: '16:00',
      },
      {
        day: 'Sábado',
        name: 'Jejum e Libertação',
        time: '09:00',
      },
      {
        day: 'Domingo',
        name: 'Culto Matinal',
        time: '09:00',
      },
    ],
  },

  // === MINISTÉRIOS ===
  ministries: {
    tagline: 'Servir é adorar',
    sectionTitle: 'Nossos Ministérios',
    description:
      'Acreditamos no serviço ativo e na importância de cada dom. Cada membro é valioso e temos lugar para todos.',
    pageTitle: 'Nossos Ministérios',
    allMinistries: 'Todos os Ministérios',
    pageDescription:
      'Cada dom é um chamado. Conheça os ministérios e encontre o seu lugar no serviço.',
    categories: [
      { label: 'Todos', value: 'all' },
      { label: 'Especial', value: 'special' },
      { label: 'Jovens', value: 'youth' },
      { label: 'Social', value: 'social' },
      { label: 'Culto', value: 'worship' },
      { label: 'Oração', value: 'prayer' },
      { label: 'Família', value: 'family' },
      { label: 'Ensino', value: 'teaching' },
      { label: 'Cuidado', value: 'care' },
    ],
    fallbackMinistries: [
      {
        name: 'Ministério Infantil',
        description: 'Cuidando da próxima geração com amor e dedicação.',
      },
      {
        name: 'Jovens e Adolescentes',
        description: 'Formação espiritual para os jovens da comunidade.',
      },
      {
        name: 'Ação Social',
        description: 'Estendendo a mão aos necessitados.',
      },
      {
        name: 'Louvor e Adoração',
        description: 'Exaltando o nome do Senhor em espírito e verdade.',
      },
      {
        name: 'Intercessão',
        description: 'Orando pelos necessitados e pela comunidade.',
      },
      {
        name: 'Casais e Família',
        description: 'Fortalecendo os laços familiares na fé.',
      },
    ],
  },

  // === EVENTOS ===
  events: {
    sectionTitle: 'Agenda',
    heading: 'Próximos Eventos',
    description: 'Fique a par de tudo o que acontece na ITED.',
    viewCalendar: 'Ver Calendário Completo',
    pageTitle: 'Calendário',
    allEvents: 'Calendário Completo',
    pageDescription: 'Todos os eventos, cultos e programações da ITED.',
    months: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ],
    weekDays: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    fallbackEvents: [
      {
        title: 'Conferência de Jovens 2026',
        type: 'Destaque',
      },
      {
        title: 'Café de Mulheres Virtuosas',
        type: 'Inscrições abertas',
      },
      {
        title: 'Batismo nas Águas e Confraternização',
        type: 'Especial',
      },
    ],
  },

  // === GALERIA ===
  gallery: {
    sectionTitle: 'Nossa Vivência',
    heading: 'Momentos da Comunidade',
    description: 'Um vislumbre da nossa caminhada em comunidade.',
    pageTitle: 'Nossa Galeria',
    albumTitle: 'Álbum Completo',
    pageDescription: 'Reviva cada momento especial da ITED.',
    categories: [
      { label: 'Todos', value: 'all' },
      { label: 'Imagem', value: 'image' },
      { label: 'Vídeo', value: 'video' },
    ],
  },

  // === PARÓQUIAS ===
  parishes: {
    sectionTitle: 'Nossa Expansão',
    heading: 'Nossas Paróquias',
    description: 'Estamos presentes em diversas localidades, sempre com a mesma fé e propósito.',
    fallbackParishes: [
      {
        name: 'ITED Munhava',
        leader: 'Pastor Winn Pombo',
        location: 'Bairro da Munhava, Beira',
      },
      {
        name: 'ITED Mutindire',
        leader: 'Liderança Local ITED',
        location: 'Mutindire, Manica',
      },
    ],
  },

  // === FOOTER ===
  footer: {
    branding: {
      name: 'ITED',
      tagline: 'Tenda do Encontro com Deus',
    },
    description:
      'Uma comunidade cristã dedicada à fé, comunhão e transformação espiritual.',
    sections: {
      quickLinks: 'Links Rápidos',
      schedule: 'Horários',
      contact: 'Contato',
    },
    quickLinks: [
      'Início',
      'Sobre Nós',
      'Nossos Ministérios',
      'Eventos',
      'Galeria',
      'Paróquias',
      'Fale Connosco',
    ],
    contact: {
      phone: '+258 848083482',
      email: 'itedmidia@gmail.com',
      address: 'Matacuanne, Beira — Moçambique',
    },
    social: 'Redes Sociais',
    copyright: '© ITED. Todos os direitos reservados.',
    legal: {
      terms: 'Termos',
      privacy: 'Privacidade',
    },
  },

  // === WHATSAPP ===
  whatsapp: {
    greeting:
      'A paz do Senhor! Gostaria de pedir uma oração ou obter mais informações sobre a ITED.',
  },

  // === PÁGINAS LEGAIS ===
  legal: {
    privacy: {
      pageTitle: 'Política de Privacidade',
      section: 'Documentos Legais',
      subtitle: 'O seu bem-estar é a nossa prioridade',
      sections: {
        collected: 'Informações que Recolhemos',
        usage: 'Como Utilizamos as Suas Informações',
        protection: 'Proteção de Dados',
        rights: 'Os Seus Direitos',
      },
      lastUpdate: 'Última atualização: Março de 2026',
    },
    terms: {
      pageTitle: 'Termos de Uso',
      section: 'Documentos Legais',
      sections: {
        acceptance: 'Aceitação dos Termos',
        usage: 'Utilização do Conteúdo',
        thirdParty: 'Conteúdo de Terceiros',
        liability: 'Responsabilidade',
        communications: 'Comunicações e Privacidade',
        changes: 'Alterações nos Termos',
      },
    },
  },

  // === PÁGINA DE ERRO ===
  error: {
    pageTitle: 'Erro',
    heading: 'Ops! Algo correu mal.',
    description:
      'A página que está a procurar não existe ou foi removida temporariamente.',
    unexpectedError:
      'Um erro inesperado ocorreu. Por favor, tente novamente mais tarde.',
    backHome: 'Voltar para a Página Inicial',
  },

  // === COMPONENTES GENÉRICOS ===
  common: {
    loading: 'A carregar...',
    error: 'Erro',
    success: 'Sucesso',
    cancel: 'Cancelar',
    save: 'Guardar',
    delete: 'Eliminar',
    edit: 'Editar',
    close: 'Fechar',
    search: 'Procurar',
    noResults: 'Nenhum resultado encontrado.',
    tryAgain: 'Tente novamente',
  },
} as const;
