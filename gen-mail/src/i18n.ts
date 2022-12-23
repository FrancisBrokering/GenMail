import { setTranslations, setLocale } from "react-i18nify";

export function i18n(): void {
  setTranslations({
    en: {
      logo: "GenMail",
      sidebar: {
        home: "Home",
        trend: "Trending",
        favorite: "Favorites",
        settings: "Settings",
      },
    },
    ja: {
      logo: "ジェネメール",
      sidebar: {
        home: "ホーム",
        trend: "トレンド",
        favorite: "お気に入り",
        settings: "設定",
      },
    },
  });
  setLocale(navigator.language);
}
