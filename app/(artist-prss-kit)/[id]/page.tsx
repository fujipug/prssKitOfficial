'use client';
import { useEffect, useState } from "react";
import { Artist } from "../../types";
import { usePathname } from "next/navigation";
import { getUserByUrlIdentifier } from "@/network/firebase";
import Image from "next/image";
import SpotifyEmbed from "@/components/embed-items/spotify-item";

export default function ArtistPrssKit() {
  const pathname = usePathname();
  const [artist, setArtist] = useState<Artist | null>(null);

  useEffect(() => {
    let isMounted = true;
    getUserByUrlIdentifier(pathname.split('/')[1]).then((res: Artist | null) => {
      if (isMounted) setArtist(res || null);
    }).catch(console.error);
    return () => { isMounted = false; };
  }, [pathname]);

  return (
    <>
      <div className="h-60 w-full bg-indigo-500"></div>
      <div className="grid grid-cols-8 h-screen">
        <div className="col-span-2 bg-indigo-600">
          <Image src={artist?.profileImage ? artist?.profileImage?.url : ''} alt={artist?.name} width={200} height={200} />
        </div>

        <div className="col-span-6 bg-gray-300">
          <SpotifyEmbed url="https://open.spotify.com/track/10VVCjsMTbM39bPzygGSex?si=66a4bae12dcc4b7e" />
        </div>
      </div>
    </>
  )
}
