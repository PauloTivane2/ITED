/// <reference types="vite/client" />
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/cms/sanity/schemaTypes';

const PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID || '8eg6szpi';
const DATASET = import.meta.env.VITE_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'ited-studio',
  title: 'ITED \u2014 Painel de Conte\u00FAdo',

  projectId: PROJECT_ID,
  dataset: DATASET,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Painel ITED')
          .items([
            // Singletons
            S.listItem()
              .title('Configura\u00E7\u00F5es do Site')
              .id('siteConfig')
              .child(
                S.document()
                  .schemaType('siteConfig')
                  .documentId('siteConfig')
              ),
            S.listItem()
              .title('Hero (Se\u00E7\u00E3o Inicial)')
              .id('hero')
              .child(
                S.document()
                  .schemaType('hero')
                  .documentId('hero')
              ),
            S.listItem()
              .title('Sobre N\u00F3s')
              .id('about')
              .child(
                S.document()
                  .schemaType('about')
                  .documentId('about')
              ),
            S.divider(),
            // Collections
            S.documentTypeListItem('ministry').title('Minist\u00E9rios'),
            S.documentTypeListItem('serviceTime').title('Hor\u00E1rios de Culto'),
            S.documentTypeListItem('event').title('Eventos'),
            S.documentTypeListItem('galleryItem').title('Galeria'),
            S.documentTypeListItem('parish').title('Par\u00F3quias'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
