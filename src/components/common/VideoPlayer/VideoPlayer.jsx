import React from 'react';
import './VideoPlayer.css';

/**
 * Helper function to extract YouTube Embed URL with autoplay parameters
 */
function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  let videoId = null;

  // Handle youtube.com/watch?v=ID
  const watchMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  if (watchMatch && watchMatch[1]) {
    videoId = watchMatch[1];
  }

  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&enablejsapi=1&modestbranding=1`;
  }
  return null;
}

/**
 * Helper function to extract Vimeo Embed URL
 */
function getVimeoEmbedUrl(url) {
  if (!url) return null;
  const match = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
  if (match && match[1]) {
    return `https://player.vimeo.com/video/${match[1]}?autoplay=1&muted=1&loop=1&background=1`;
  }
  return null;
}

export default function VideoPlayer({
  src,
  poster,
  className = '',
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  videoRef,
}) {
  if (!src) return null;

  const youtubeEmbed = getYouTubeEmbedUrl(src);
  const vimeoEmbed = getVimeoEmbedUrl(src);

  // If YouTube link
  if (youtubeEmbed) {
    return (
      <iframe
        className={`video-player-iframe ${className}`}
        src={youtubeEmbed}
        title="YouTube Video Player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        frameBorder="0"
      />
    );
  }

  // If Vimeo link
  if (vimeoEmbed) {
    return (
      <iframe
        className={`video-player-iframe ${className}`}
        src={vimeoEmbed}
        title="Vimeo Video Player"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        frameBorder="0"
      />
    );
  }

  // Regular HTML5 Video (local .mp4 or direct URL .mp4)
  return (
    <video
      ref={videoRef}
      className={`video-player-html5 ${className}`}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      poster={poster}
      preload="auto"
    >
      <source src={src} type="video/mp4" />
      <source src={src} type="video/webm" />
      Your browser does not support the video tag.
    </video>
  );
}
