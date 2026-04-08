import { defineField, defineType } from 'sanity';

export const aboutSchema = defineType({
  name: 'about',
  title: 'Sobre (Seção Sobre Nós)',
  type: 'document',
  fields: [
    defineField({
      name: 'kicker',
      title: 'Kicker (texto acima do título)',
      type: 'string',
      initialValue: 'Excelência & Fé',
    }),
    defineField({
      name: 'titleLine1',
      title: 'Título linha 1',
      type: 'string',
      initialValue: 'Fundada na',
    }),
    defineField({
      name: 'titleHighlight1',
      title: 'Destaque linha 1',
      type: 'string',
      initialValue: 'Palavra',
    }),
    defineField({
      name: 'titleLine2',
      title: 'Título linha 2',
      type: 'string',
      initialValue: 'Movida pelo',
    }),
    defineField({
      name: 'titleHighlight2',
      title: 'Destaque linha 2',
      type: 'string',
      initialValue: 'Amor',
    }),
    defineField({
      name: 'leadParagraph',
      title: 'Parágrafo introdutório',
      type: 'text',
      rows: 3,
      initialValue:
        'A ITED é mais do que uma instituição; é um refúgio espiritual dedicado à manifestação genuína do Reino de Deus em Moçambique.',
    }),
    defineField({
      name: 'paragraph1',
      title: 'Parágrafo 1',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'paragraph2',
      title: 'Parágrafo 2',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'pillars',
      title: 'Pilares (Visão, Valores, Missão)',
      type: 'array',
      of: [
        defineField({
          name: 'pillar',
          title: 'Pilar',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Título', type: 'string' }),
            defineField({ name: 'description', title: 'Descrição', type: 'string' }),
          ],
          preview: { select: { title: 'title', subtitle: 'description' } },
        }),
      ],
      initialValue: [
        { title: 'Visão', description: 'Ser casa de adoração para as nações.' },
        { title: 'Valores', description: 'Comunhão, Ensino e Amor Próximo.' },
        { title: 'Missão', description: 'Levar o Evangelho e transformar vidas.' },
      ],
    }),
    defineField({
      name: 'statsNumber',
      title: 'Número de anos (destaque)',
      type: 'string',
      initialValue: '10+',
    }),
    defineField({
      name: 'statsLabel',
      title: 'Texto do destaque',
      type: 'string',
      initialValue: 'Anos transformando vidas em nossa comunidade.',
    }),
    defineField({
      name: 'images',
      title: 'Imagens',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (rule) => rule.max(2),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Sobre Nós' }),
  },
});
