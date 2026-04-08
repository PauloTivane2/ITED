import { defineField, defineType } from 'sanity';

export const ministrySchema = defineType({
  name: 'ministry',
  title: 'Ministérios',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nome do Ministério',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Imagem de Capa',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Ordem de exibição',
      type: 'number',
      description: 'Número menor aparece primeiro',
    }),
  ],
  orderings: [
    {
      title: 'Ordem de exibição',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', media: 'image', subtitle: 'description' },
  },
});
