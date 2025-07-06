import { useTranslations } from "next-intl";
import TabManager from "./tab-manager";

export default function ArtistDashboard() {
  const tabTranslations = useTranslations('ArtistDashboardTabs');
  const tabMessages = {
    share: tabTranslations("share"),
    assets: tabTranslations("assets"),
  };
  const prssKitTranslations = useTranslations('ArtistDashboardPrssKit');
  const prssKitMessages = {
    artist_name: prssKitTranslations("artist_name"),
    biography: prssKitTranslations("biography"),
    location: prssKitTranslations("location"),
    profile_url: prssKitTranslations("profile_url"),
    subtitle: prssKitTranslations("subtitle"),
    title: prssKitTranslations("title"),
  };

  return (
    <TabManager tabTranslations={tabMessages} prssKitTranslations={prssKitMessages} />
  );
}