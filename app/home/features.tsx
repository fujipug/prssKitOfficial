import { useTranslations } from "next-intl";

export default function Features() {
  const translations = useTranslations("Home");

  return (
    <div className="min-h-dvh bg-accent sm:py-12">
      <div className="container mx-auto px-4 py-8">
        <div className="torn-paper max-w-3xl py-2">
          <h2 className="font-semibold text-gray-500 text-lg">{translations("features_header_1")}</h2>
          <p className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{translations("features_header_2")}</p>
          <p className="mt-4 text-gray-500">
            {translations("features_description")}
          </p>
        </div>
      </div>
    </div>
  );
}