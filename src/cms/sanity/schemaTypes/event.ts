import { defineField, defineType } from 'sanity';

export const eventSchema = defineType({
  name: 'event',
  title: 'Eventos',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título do Evento',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Data',
      type: 'date',
      options: { dateFormat: 'YYYY-MM-DD' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'time',
      title: 'Horário',
      type: 'string',
      description: 'Ex: Sábado, 14:00',
    }),
    defineField({
      name: 'location',
      title: 'Local',
      type: 'string',
      description: 'Ex: Templo Principal',
    }),
    defineField({
      name: 'tag',
      title: 'Tag / Etiqueta',
      type: 'string',
      options: {
        list: [
          { title: 'Destaque', value: 'Destaque' },
          { title: 'Inscrições abertas', value: 'Inscrições abertas' },
          { title: 'Especial', value: 'Especial' },
          { title: 'Gratuito', value: 'Gratuito' },
        ],
      },
    }),
    defineField({
      name: 'tagColor',
      title: 'Cor da Tag',
      type: 'string',
      options: {
        list: [
          { title: 'Verde', value: 'accent' },
          { title: 'Verde claro', value: 'highlight' },
          { title: 'Laranja', value: 'warm' },
        ],
      },
      initialValue: 'accent',
    }),
    defineField({
      name: 'description',
      title: 'Descrição completa',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Imagem do evento',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'featured',
      title: 'Destaque na home?',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Data (mais recente primeiro)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
    {
      title: 'Data (próximos primeiro)',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'date', media: 'image' },
  },
});
