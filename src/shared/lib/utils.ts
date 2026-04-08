/**
 * Converte uma URL padrão do YouTube para o formato de embed.
 * Suporta formatos:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 */
export function getYouTubeEmbedUrl(url: string): string {
  if (!url) return '';
  
  // Se já for uma URL de embed, retorna ela mesma
  if (url.includes('/embed/')) return url;

  let videoId = '';
  
  if (url.includes('youtube.com/watch?v=')) {
    videoId = url.split('v=')[1]?.split('&')[0];
  } else if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1]?.split('?')[0];
  } else if (url.includes('youtube.com/v/')) {
    videoId = url.split('/v/')[1]?.split('?')[0];
  }

  return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url;
}