import { defineField, defineType } from 'sanity';

export const galleryItemSchema = defineType({
  name: 'galleryItem',
  title: 'Galeria',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required(),
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
      validation: (rule) => rule.required(),
      initialValue: 'image',
    }),
    defineField({
      name: 'image',
      title: 'Imagem',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ document }) => document?.type !== 'image',
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'URL do YouTube (embed)',
      type: 'url',
      description: 'Ex: https://www.youtube.com/embed/VIDEO_ID',
      hidden: ({ document }) => document?.type !== 'youtube',
    }),
    defineField({
      name: 'videoFile',
      title: 'Arquivo de Vídeo',
      type: 'file',
      options: { accept: 'video/*' },
      hidden: ({ document }) => document?.type !== 'video',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail (para vídeos)',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ document }) => document?.type === 'image',
    }),
    defineField({
      name: 'featured',
      title: 'Destaque (tamanho grande)',
      type: 'boolean',
      description: 'Itens em destaque ocupam 2 colunas na grade desktop',
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
    select: {
      title: 'title',
      subtitle: 'type',
      media: 'image',
      thumbnail: 'thumbnail',
    },
    prepare({ title, subtitle, media, thumbnail }) {
      return {
        title,
        subtitle: subtitle === 'image' ? 'Imagem' : subtitle === 'youtube' ? 'YouTube' : 'Vídeo',
        media: media || thumbnail,
      };
    },
  },
});
