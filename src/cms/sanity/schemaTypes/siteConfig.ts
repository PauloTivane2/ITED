import { defineField, defineType } from 'sanity';

export const siteConfigSchema = defineType({
  name: 'siteConfig',
  title: 'Configurações do Site',
  type: 'document',
  // Singleton — apenas 1 documento deste tipo deve existir

  fields: [
    defineField({
      name: 'churchName',
      title: 'Nome da Igreja',
      type: 'string',
      initialValue: 'ITED — Igreja Tenda do Encontro',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Slogan / Tagline',
      type: 'string',
      initialValue: 'Baseados na Fé',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'phone',
      title: 'Telefone',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'E-mail',
      type: 'string',
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp',
      type: 'string',
      description: 'Número com código do país. Ex: 258841234567',
    }),
    defineField({
      name: 'address',
      title: 'Endereço',
      type: 'string',
      description: 'Ex: Matacuanne, Beira, Moçambique',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Redes Sociais',
      type: 'object',
      fields: [
        defineField({ name: 'facebook', title: 'Facebook URL', type: 'url' }),
        defineField({ name: 'instagram', title: 'Instagram URL', type: 'url' }),
        defineField({ name: 'youtube', title: 'YouTube URL', type: 'url' }),
        defineField({ name: 'tiktok', title: 'TikTok URL', type: 'url' }),
      ],
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Descrição (SEO)',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.max(160),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Configurações do Site' }),
  },
});
