import { useTranslations } from "next-intl";
import { assetTranslations, prssKitTranslations, shareTranslations, tabTranslations } from "@/utils/component-translations";
import TabManager from "./tab-manager";

// TODO: Verify token handling and session management probably in a layout in this folder
export default function ArtistDashboard() {
  const tabTranslationsInstance = useTranslations('ArtistDashboardTabs');
  const tabMessages = tabTranslations(tabTranslationsInstance);

  const assetTranslationsInstance = useTranslations('ArtistDashboardAssets');
  const assetMessages = assetTranslations(assetTranslationsInstance);

  const prssKitTranslationsInstance = useTranslations('ArtistDashboardPrssKit');
  const prssKitMessages = prssKitTranslations(prssKitTranslationsInstance);

  const shareTranslationsInstance = useTranslations('ArtistDashboardShare');
  const shareMessages = shareTranslations(shareTranslationsInstance);

  return (
    <TabManager
      tabTranslations={tabMessages}
      assetTranslations={assetMessages}
      prssKitTranslations={prssKitMessages}
      shareTranslations={shareMessages} />
  );
}