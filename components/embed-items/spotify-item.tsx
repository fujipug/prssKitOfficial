export default function SpotifyEmbed({ url, width = "100%", height = "352" }: { url: string; width?: string; height?: string }) {
  // Extract the Spotify ID from the URL
  const spotifyId = url.match(/spotify:([a-z]+):([a-zA-Z0-9]+)/)?.[2] ||
    url.match(/open\.spotify\.com\/([a-z]+)\/([a-zA-Z0-9]+)/)?.[2];

  // Determine the embed type based on the URL
  const type =
    url.includes('album') ? 'album' :
      url.includes('playlist') ? 'playlist' :
        url.includes('episode') ? 'episode' :
          url.includes('show') ? 'show' :
            url.includes('track') ? 'track' :
              url.includes('artist') ? 'artist' : null;

  if (!spotifyId) {
    return <div>Invalid Spotify URL</div>;
  }

  return (
    <div className="spotify-embed-container">
      <iframe
        src={`https://open.spotify.com/embed/${type}/${spotifyId}?utm_source=generator`}
        width={width}
        height={height}
        frameBorder="0"
        allowFullScreen={true}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        style={{ borderRadius: '12px' }}
      />
    </div>
  );
}