import { useEffect, useState } from 'react';

export default function AppleMusicEmbed({ url, width = "100%" }: { url: string; width?: string }) {
  const [iframeHeight, setIframeHeight] = useState('150px'); // Default height for songs

  // Convert the URL to embed format
  const embedUrl = url.replace(/https:\/\/music\.apple\.com\/.*?\//, "https://embed.music.apple.com/").replace(/\/\?i=/, "/");

  // Determine content type and set appropriate height
  useEffect(() => {
    if (url.includes('/album/')) {
      setIframeHeight('500px'); // Taller for albums
    } else if (url.includes('/playlist/')) {
      setIframeHeight('450px'); // Medium for playlists
    } else if (url.includes('/song/') || url.includes('?i=')) {
      setIframeHeight('150px'); // Short for single songs
    }

    // For more precise height handling (if the above isn't enough):
    const handleMessage = (event: MessageEvent) => {
      // Apple Music embed sometimes sends height updates
      if (event.data && typeof event.data === 'object' && event.data.height) {
        setIframeHeight(`${event.data.height}px`);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [url]);

  return (
    <div className="apple-music-embed-container">
      <iframe
        allow="autoplay *; encrypted-media *;"
        height={iframeHeight}
        width={width}
        style={{
          maxWidth: '660px',
          overflow: 'hidden',
          background: 'transparent',
          border: '0',
          display: 'block',
          margin: '0 auto'
        }}
        sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
        src={embedUrl}
      />
    </div>
  );
}