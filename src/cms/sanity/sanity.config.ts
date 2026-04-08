import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';

// 🔑 Project ID configurado via .env ou hardcoded como fallback
const PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID || '8eg6szpi';
const DATASET = import.meta.env.VITE_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'ited-studio',
  title: 'ITED — Painel de Conteúdo',

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
              .title('Configurações do Site')
              .id('siteConfig')
              .child(
                S.document()
                  .schemaType('siteConfig')
                  .documentId('siteConfig')
              ),
            S.listItem()
              .title('Hero (Seção Inicial)')
              .id('hero')
              .child(
                S.document()
                  .schemaType('hero')
                  .documentId('hero')
              ),
            S.listItem()
              .title('Sobre Nós')
              .id('about')
              .child(
                S.document()
                  .schemaType('about')
                  .documentId('about')
              ),
            S.divider(),
            // Collections
            S.documentTypeListItem('ministry').title('Ministérios'),
            S.documentTypeListItem('serviceTime').title('Horários de Culto'),
            S.documentTypeListItem('event').title('Eventos'),
            S.documentTypeListItem('galleryItem').title('Galeria'),
            S.documentTypeListItem('parish').title('Paróquias'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
