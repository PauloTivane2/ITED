import { defineField, defineType } from 'sanity';

export const gallerySchema = defineType({
  name: 'gallery',
  title: 'Galeria (Álbuns)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título do Álbum',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Destaque (tamanho grande)',
      type: 'boolean',
      description: 'Álbuns em destaque podem ter tratamento visual diferente',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Ordem de exibição',
      type: 'number',
    }),
    defineField({
      name: 'items',
      title: 'Itens do Álbum',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'galleryItem',
          title: 'Item da Galeria',
          fields: [
            defineField({
              name: 'title',
              title: 'Título do Item (Opcional)',
              type: 'string',
            }),
            defineField({
              name: 'type',
              title: 'Tipo de mídia',
              type: 'string',
              options: {
                list: [
                  { title: 'Imagem', value: 'image' },
                  { title: 'Vídeo (YouTube)', value: 'youtube' },
                  { title: 'Vídeo (arquivo)', value: 'video' },
                ],
                layout: 'radio',
              },
              initialValue: 'image',
            }),
            defineField({
              name: 'image',
              title: 'Imagem',
              type: 'image',
              options: { hotspot: true },
              hidden: ({ parent }) => parent?.type !== 'image',
            }),
            defineField({
              name: 'youtubeUrl',
              title: 'URL do YouTube (embed)',
              type: 'url',
              description: 'Ex: https://www.youtube.com/embed/VIDEO_ID',
              hidden: ({ parent }) => parent?.type !== 'youtube',
            }),
            defineField({
              name: 'videoFile',
              title: 'Arquivo de Vídeo',
              type: 'file',
              options: { accept: 'video/*' },
              hidden: ({ parent }) => parent?.type !== 'video',
            }),
            defineField({
              name: 'featured',
              title: 'Destaque (tamanho grande)',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'thumbnail',
              title: 'Thumbnail (Obrigatório para vídeos)',
              type: 'image',
              options: { hotspot: true },
              hidden: ({ parent }) => parent?.type === 'image',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'type',
              media: 'image',
              thumbnail: 'thumbnail',
            },
            prepare({ title, subtitle, media, thumbnail }) {
              const typeLabel = subtitle === 'image' ? 'Imagem' : subtitle === 'youtube' ? 'YouTube' : 'Vídeo';
              return {
                title: title || typeLabel,
                subtitle: typeLabel,
                media: media || thumbnail,
              };
            },
          },
        },
      ],
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
    select: {
      title: 'title',
      items: 'items',
    },
    prepare({ title, items }) {
      const itemCount = items ? items.length : 0;
      return {
        title,
        subtitle: `${itemCount} item(s) no álbum`,
      };
    },
  },
});
