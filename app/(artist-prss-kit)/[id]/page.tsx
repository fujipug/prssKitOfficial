'use client';
import { useEffect, useState } from "react";
import { Artist } from "../../types";
import { usePathname } from "next/navigation";
import { getUserByUrlIdentifier } from "@/network/firebase";
import Image from "next/image";

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
          <Image src={artist?.imageUrl} alt={artist?.name} width={200} height={200} />
        </div>

        <div className="col-span-6 bg-gray-300">

        </div>
      </div>
    </>
  )
}
