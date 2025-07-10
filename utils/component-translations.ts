import { useTranslations } from "next-intl";

const navigationBarTranslations = (translations: ReturnType<typeof useTranslations>) => {
  return {
    login: translations("login"),
    logout: translations("logout"),
    profile: translations("profile"),
    register: translations("register"),
    settings: translations("settings"),
  };
}

const tabTranslations = (translations: ReturnType<typeof useTranslations>) => {
  return {
    share: translations("share"),
    assets: translations("assets"),
  };
}

const assetTranslations = (translations: ReturnType<typeof useTranslations>) => {
  return {
    audio_text: translations("audio_text"),
    collection_text: translations("collection_text"),
    document_text: translations("document_text"),
    image_text: translations("image_text"),
    video_text: translations("video_text"),
  };
}

const prssKitTranslations = (translations: ReturnType<typeof useTranslations>) => {
  return {
    biography_placeholder: translations("biography_placeholder"),
    location_placeholder: translations("location_placeholder"),
    subtitle: translations("subtitle"),
    title: translations("title"),
  };
}

const shareTranslations = (translations: ReturnType<typeof useTranslations>) => {
  return {
    title: translations("title"),
    description: translations("description"),
  };
}

export { navigationBarTranslations, tabTranslations, assetTranslations, prssKitTranslations, shareTranslations };