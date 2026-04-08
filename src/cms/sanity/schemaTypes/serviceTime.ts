import { defineField, defineType } from 'sanity';

export const serviceTimeSchema = defineType({
  name: 'serviceTime',
  title: 'Horários de Culto',
  type: 'document',
  fields: [
    defineField({
      name: 'day',
      title: 'Dia da semana',
      type: 'string',
      options: {
        list: [
          { title: 'Segunda-feira', value: 'Segunda-feira' },
          { title: 'Terça-feira', value: 'Terça-feira' },
          { title: 'Quarta-feira', value: 'Quarta-feira' },
          { title: 'Quinta-feira', value: 'Quinta-feira' },
          { title: 'Sexta-feira', value: 'Sexta-feira' },
          { title: 'Sábado', value: 'Sábado' },
          { title: 'Domingo', value: 'Domingo' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Nome do Culto',
      type: 'string',
      description: 'Ex: Culto de Intercessão',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'time',
      title: 'Horário',
      type: 'string',
      description: 'Ex: 17:00 — 20:00',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'colorTheme',
      title: 'Cor do tema',
      type: 'string',
      options: {
        list: [
          { title: 'Verde (accent)', value: 'accent' },
          { title: 'Verde claro (highlight)', value: 'highlight' },
          { title: 'Laranja (warm)', value: 'warm' },
        ],
      },
      initialValue: 'accent',
    }),
    defineField({
      name: 'order',
      title: 'Ordem de exibição',
      type: 'number',
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
    select: { title: 'name', subtitle: 'day' },
  },
});
