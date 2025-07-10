import { useTranslations } from "next-intl";
import TabManager from "./tab-manager";

// TODO: Verify token handling and session management probably in a layout in this folder
export default function ArtistDashboard() {
  const tabTranslations = useTranslations('ArtistDashboardTabs');
  const tabMessages = {
    share: tabTranslations("share"),
    assets: tabTranslations("assets"),
  };

  const assetTranslations = useTranslations('ArtistDashboardAssets');
  const assetMessages = {
    audio_text: assetTranslations("audio_text"),
    collection_text: assetTranslations("collection_text"),
    document_text: assetTranslations("document_text"),
    image_text: assetTranslations("image_text"),
    video_text: assetTranslations("video_text"),
  };

  const prssKitTranslations = useTranslations('ArtistDashboardPrssKit');
  const prssKitMessages = {
    biography_placeholder: prssKitTranslations("biography_placeholder"),
    location_placeholder: prssKitTranslations("location_placeholder"),
    subtitle: prssKitTranslations("subtitle"),
    title: prssKitTranslations("title"),
  };

  const shareTranslations = useTranslations('ArtistDashboardShare');
  const shareMessages = {
    title: shareTranslations("title"),
    description: shareTranslations("description"),
  };

  return (
    <TabManager
      tabTranslations={tabMessages}
      assetTranslations={assetMessages}
      prssKitTranslations={prssKitMessages}
      shareTranslations={shareMessages} />
  );
}