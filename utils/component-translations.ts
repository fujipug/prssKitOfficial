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
    add_new_item: translations("add_new_item"),
    biography_placeholder: translations("biography_placeholder"),
    divider_text: translations("divider_text"),
    edit_profile: translations("edit_profile"),
    location_placeholder: translations("location_placeholder"),
    select_from_assets: translations("select_from_assets"),
    upload_files: translations("upload_files")
  };
}

const shareTranslations = (translations: ReturnType<typeof useTranslations>) => {
  return {
    title: translations("title"),
    description: translations("description"),
  };
}

export { navigationBarTranslations, tabTranslations, assetTranslations, prssKitTranslations, shareTranslations };