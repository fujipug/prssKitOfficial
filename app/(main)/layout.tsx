import "../globals.css";
import type { Metadata } from "next";
import { Special_Elite } from "next/font/google";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider, useTranslations } from "next-intl";
import { AuthProvider } from "@/lib/AuthContext";
import { ThemeProvider } from "@/lib/ThemeContext";
import { navigationBarTranslations } from "@/utils/component-translations";
import NavigationBar from "@/components/navigation-bar";
import Footer from "@/components/footer";

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
  const navMessages = navigationBarTranslations(translations);

  return (
    <html lang={params.locale} suppressHydrationWarning className="h-full">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var savedTheme = localStorage.getItem('theme') || 'light';
                document.documentElement.setAttribute('data-theme', savedTheme);
              })();
            `,
          }}
        />
      </head>
      <body className={`${specialEliteSans.className} antialiased`}>
        <AuthProvider>
          <ThemeProvider>
            <NextIntlClientProvider messages={messages}>
              <NavigationBar translations={navMessages} />
              {children}
              <Footer />
            </NextIntlClientProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
