'use client';
import { useEffect, useState } from "react";
import { Artist } from "../../types";
import { usePathname } from "next/navigation";
import { getUserByUrlIdentifier } from "@/network/firebase";

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
    <div className="hero bg-red-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">{artist?.artistName || "Artist"}</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
            quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  )
}
