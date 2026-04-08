import { defineField, defineType } from 'sanity';

export const parishSchema = defineType({
  name: 'parish',
  title: 'Paróquias',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome da Paróquia',
      type: 'string',
      description: 'Ex: ITED Munhava',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'leader',
      title: 'Líder / Pastor',
      type: 'string',
      description: 'Ex: Pastor Winn Pombo',
    }),
    defineField({
      name: 'location',
      title: 'Localização',
      type: 'string',
      description: 'Ex: Bairro da Munhava, Beira',
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Imagem de Capa',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'phone',
      title: 'Telefone',
      type: 'string',
    }),
    defineField({
      name: 'googleMapsUrl',
      title: 'Link Google Maps',
      type: 'url',
    }),
    defineField({
      name: 'isHeadquarters',
      title: 'É a Sede Central?',
      type: 'boolean',
      initialValue: false,
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
    select: { title: 'name', subtitle: 'location', media: 'image' },
  },
});
