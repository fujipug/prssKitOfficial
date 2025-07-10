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

export default navigationBarTranslations;