import { useTranslations } from "next-intl";
import ArtistCarousel from "./artist-carousel";

export default function Landing() {
  const translations = useTranslations("Home");
  const description = translations("description");
  const actionRegister = translations("action_register");

  return (
    <div className="container mx-auto px-4 py-8 min-h-dvh">
      <div className="w-fit text-center hover:rotate-25 z-50">
        <div className="torn-paper text-black -rotate-15">
          <h1 className="font-bold text-5xl sm:text-7xl">PRSS KIT</h1>
        </div>
      </div>

      <ArtistCarousel textOverlay={description} actionButtonText={actionRegister} />
    </div>
  );
}
