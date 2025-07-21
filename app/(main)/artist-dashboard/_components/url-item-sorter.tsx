import AppleMusicEmbed from "@/components/embed-items/apple-music-item";
import SoundCloudEmbed from "@/components/embed-items/soundcloud-item";
import SpotifyEmbed from "@/components/embed-items/spotify-item";
import YouTubeEmbed from "@/components/embed-items/youtube-item";

export function UrlItemSorter({ url }: { url?: string }) {
  if (!url) {
    return <div className="text-gray-500">No URL provided</div>;
  }

  if (url.includes("spotify")) {
    return (
      <div className="flex justify-center items-center">
        <SpotifyEmbed url={url} />
      </div>
    );
  }

  if (url.includes("soundcloud")) {
    return (
      <div className="flex justify-center items-center">
        <SoundCloudEmbed url={url} />
      </div>
    );
  }

  if (url.includes("apple")) {
    return (
      // <div className="flex justify-center items-center">
      <AppleMusicEmbed url={url} />
      // </div>
    );
  }

  if (url.includes("youtube")) {
    return (
      // <div className="flex justify-center items-center">
      <YouTubeEmbed url={url} />
      // </div>
    );
  }

}