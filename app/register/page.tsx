import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import RegisterForm from "./register-form";

export default function Register() {
  const translations = useTranslations("Auth");
  const messages = {
    email_title: translations("email"),
    email_error: translations("email_error"),
    password_requirements: translations("password_requirements"),
    password_title: translations("password"),
    password_confirm_title: translations("password_confirm"),
    register_button: translations("register_button"),
    divider_text: translations("divider_text"),
    // register_error: translations("register_error")
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 skull-pattern min-h-dvh">
      <div className="col-span-1 mx-4 my-4 sm:mx-12 sm:my-0">
        <div className="w-fit text-center sm:hover:rotate-25">
          <Link href="/">
            <div className="torn-paper text-black sm:-rotate-15">
              <h1 className="font-bold text-5xl sm:text-7xl">PRSS KIT</h1>
            </div>
          </Link>
        </div>
        <h2 className="sm:mt-14 text-xl font-semibold">{translations("register_description")}</h2>

        <RegisterForm messages={messages} className="mt-4" />

        <p className="text-sm text-center mt-8 font-medium">{translations("register_redirect_login")}</p>
      </div>
      <div className="col-span-1 lg:block hidden">
        <Image
          alt="Register background image"
          width={1920}
          height={1280}
          src="/register_image.jpg"
          className="object-cover rounded-box shadow-2xl"
        />
      </div>
    </div>
  );
}
