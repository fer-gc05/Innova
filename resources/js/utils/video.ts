export function getYouTubeId(linkVideo: string | null | undefined): string | null {
  if (!linkVideo) return null;
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const ytMatch = linkVideo.match(youtubeRegex);
  return ytMatch ? ytMatch[1] : null;
}

export function getVideoEmbedUrl(linkVideo: string | null | undefined): string | null {
  if (!linkVideo) return null;

  // Si es YouTube, usar nocookie
  const ytId = getYouTubeId(linkVideo);
  if (ytId) return `https://www.youtube-nocookie.com/embed/${ytId}?rel=0&modestbranding=1`;

  // Si ya es una URL de embed o de otro proveedor, retornarla tal cual
  return linkVideo;
}

export function getYouTubeThumbnail(linkVideo: string | null | undefined, quality: 'default' | 'mq' | 'hq' | 'sd' | 'max' = 'hq'): string | null {
  const id = getYouTubeId(linkVideo);
  if (!id) return null;
  const map = {
    default: `https://img.youtube.com/vi/${id}/default.jpg`,
    mq: `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
    hq: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    sd: `https://img.youtube.com/vi/${id}/sddefault.jpg`,
    max: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
  } as const;
  return map[quality];
}

export default getVideoEmbedUrl;
