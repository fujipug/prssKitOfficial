export default function YouTubeEmbed({ url, width = "100%", height = "315" }: { url: string; width?: string; height?: string }) {
  const embedUrl = url.replace("watch?v=", "embed/");

  return (
    <iframe
      width={width}
      height={height}
      src={embedUrl}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}
