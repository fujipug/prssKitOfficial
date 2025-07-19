import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import MockPhone from "../_components/mock-phone";
import CycleText from "@/components/animata/text/cycle-text";
import { enLandingItemTypes, esLandingItemTypes } from "@/utils/static-data";

export default function Example() {
  const translations = useTranslations("Home");
  const locale = useLocale();
  const itemTypes = locale === "en" ? enLandingItemTypes : esLandingItemTypes;
  const pluralized = locale === "en" ? "say" : "Tu";

  return (
    <div className="mx-auto max-w-7xl px-6 lg:flex lg:items-center lg:gap-x-10 lg:px-8 py-8">
      <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
        <div className="w-fit text-center sm:hover:rotate-25 z-50">
          <div className="torn-paper text-black sm:-rotate-15">
            <h1 className="font-bold text-5xl sm:text-7xl">PRSS KIT</h1>
          </div>
        </div>

        <CycleText words={itemTypes} locale={locale} localePlur={pluralized} text={translations("subtitle", { itemType: 'itemType', pluralized: 'pluralized' })} />

        <h1 className="font-bold text-4xl sm:text-6xl block mt-2 sm:mt-4 text-base-content">
          {translations.rich("title", {
            highlight: (chunks) => <span className="">{chunks}</span>
          })}
        </h1>

        <div className="mt-6 sm:mt-10 flex items-center gap-x-6">
          <Link href="/onboard" role="button" className="btn btn-lg btn-primary drop-shadow-xl">{translations("action_register")}</Link>
        </div>
      </div>

      <div className="mt-16 sm:mt-24 lg:mt-0 lg:shrink-0 lg:grow relative">
        <MockPhone />
      </div>
    </div>
  )
}
