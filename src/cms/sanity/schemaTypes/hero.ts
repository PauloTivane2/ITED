import { defineField, defineType } from 'sanity';

export const heroSchema = defineType({
  name: 'hero',
  title: 'Hero (Seção Inicial)',
  type: 'document',
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge (texto do topo)',
      type: 'string',
      description: 'Ex: Seja bem-vindo à ITED • Baseados na fé',
      initialValue: 'Seja bem-vindo à ITED • Baseados na fé',
    }),
    defineField({
      name: 'typewriterWords',
      title: 'Palavras do Typewriter',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Palavras que aparecem uma a uma no título',
      initialValue: ['fé, esperança', 'amor e propósito', 'comunidade e paz', 'graça e redenção'],
    }),
    defineField({
      name: 'bibleReference',
      title: 'Referência Bíblica',
      type: 'string',
      description: 'Ex: Êxodo 33:7-11',
      initialValue: 'Êxodo 33:7-11',
    }),
    defineField({
      name: 'bibleText',
      title: 'Texto Bíblico',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'stats',
      title: 'Estatísticas',
      type: 'array',
      of: [
        defineField({
          name: 'stat',
          title: 'Estatística',
          type: 'object',
          fields: [
            defineField({ name: 'number', title: 'Número', type: 'string' }),
            defineField({ name: 'label', title: 'Rótulo', type: 'string' }),
          ],
          preview: {
            select: { title: 'number', subtitle: 'label' },
          },
        }),
      ],
      initialValue: [
        { number: '7+', label: 'Anos Manifestando o Reino' },
        { number: '500+', label: 'Vidas Edificadas no Altar' },
      ],
    }),
    defineField({
      name: 'ctaPrimaryLabel',
      title: 'Botão Primário (texto)',
      type: 'string',
      initialValue: 'Nossos Horários',
    }),
    defineField({
      name: 'ctaSecondaryLabel',
      title: 'Botão Secundário (texto)',
      type: 'string',
      initialValue: 'Conheça a Igreja',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Hero Section' }),
  },
});
