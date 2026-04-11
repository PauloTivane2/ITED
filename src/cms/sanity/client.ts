import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';

// ─── Configuração do cliente ─────────────────────────────────────────────────
// Defina no arquivo .env da raiz do projeto:
//   VITE_SANITY_PROJECT_ID=xxxxx
//   VITE_SANITY_DATASET=production
//   VITE_SANITY_API_VERSION=2024-01-01

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string;
const dataset = (import.meta.env.VITE_SANITY_DATASET as string) || 'production';
const apiVersion = (import.meta.env.VITE_SANITY_API_VERSION as string) || '2024-01-01';

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // cache CDN para leitura — mais rápido
});

// ─── Helper para URLs de imagem ──────────────────────────────────────────────
const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// ─── Queries GROQ reutilizáveis ──────────────────────────────────────────────
export const queries = {
  /** Configurações globais do site (singleton) */
  siteConfig: `*[_type == "siteConfig"][0]`,

  /** Hero section (singleton) */
  hero: `*[_type == "hero"][0]`,

  /** Sobre nós (singleton) */
  about: `*[_type == "about"][0]`,

  /** Todos os ministérios, ordenados */
  ministries: `*[_type == "ministry"] | order(order asc) {
    _id, title, description,
    "image": image.asset->url
  }`,

  /** Horários de culto, ordenados */
  serviceTimes: `*[_type == "serviceTime"] | order(order asc) {
    _id, day, name, time, description, colorTheme
  }`,

  /** Eventos em destaque na home (máx 3, ordenados por data) */
  featuredEvents: `*[_type == "event" && featured == true] | order(date asc)[0..2] {
    _id, title, date, time, location, tag, tagColor
  }`,

  /** Todos os eventos futuros */
  upcomingEvents: `*[_type == "event" && date >= $today] | order(date asc) {
    _id, title, date, time, location, tag, tagColor, description,
    "image": image.asset->url
  }`,

  /** Itens da galeria, ordenados */
  galleryItems: `*[_type == "galleryItem"] | order(order asc) {
    _id, title, type, youtubeUrl, featured,
    "imageUrl": image.asset->url,
    "thumbnailUrl": thumbnail.asset->url,
    "videoUrl": videoFile.asset->url
  }`,

  /** Paróquias, ordenadas */
  parishes: `*[_type == "parish"] | order(order asc) {
    _id, name, leader, location, description, phone, googleMapsUrl, isHeadquarters,
    "image": image.asset->url
  }`,
};
