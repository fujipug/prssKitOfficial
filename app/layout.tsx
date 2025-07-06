import type { Metadata } from "next";
import { Special_Elite } from "next/font/google";
import "./globals.css";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider, useTranslations } from "next-intl";
import NavigationBar from "@/components/navigation-bar";
import Footer from "@/components/footer";
import { AuthProvider } from "@/utils/AuthContext";
import { ThemeProvider } from "@/utils/ThemeContext";
// import FirebaseAuthProvider from "@/utils/FirebaseAuthProvider";

const specialEliteSans = Special_Elite({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prss Kit",
  description: "Share who you are and what you do",
};

export default function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = getMessages();
  const translations = useTranslations("NavigationBar");
  const navMessages = {
    login: translations("login"),
    logout: translations("logout"),
    profile: translations("profile"),
    register: translations("register"),
    settings: translations("settings"),
    theme: translations("theme")
  }

  return (
    <html lang={params.locale} className="h-full">
      <body
        className={`${specialEliteSans.className} antialiased`}
      >
        <AuthProvider>
          {/* <FirebaseAuthProvider> */}
          <ThemeProvider>
            <NextIntlClientProvider messages={messages}>
              <NavigationBar translations={navMessages} />
              {/* Use a container to ensure consistent padding and centering */}
              {/* Uncomment the following line if you want to use a container */}
              {/* <div className="container mx-auto px-4 py-8 min-h-dvh"> */}
              {children}
              {/* </div> */}
              <Footer />
            </NextIntlClientProvider>
            {/* </FirebaseAuthProvider> */}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
