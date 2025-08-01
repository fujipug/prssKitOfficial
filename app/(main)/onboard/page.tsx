import { useTranslations } from "next-intl";
import Stepper from "./stepper";

export default function Onboard() {
  const translations = useTranslations("Onboard");
  const messages = {
    step_1_title: translations("step_1_title"),
    step_1_button: translations("step_1_button"),
    step_2_title: translations("step_2_title"),
    step_2_button: translations("step_2_button"),
    step_3_title: translations("step_3_title"),
    step_3_button: translations("step_3_button")
  }

  return (
    <Stepper messages={messages} />
  );
}
