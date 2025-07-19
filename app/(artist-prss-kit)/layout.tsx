import "../globals.css";
import { ThemeProvider } from "@/lib/ThemeContext";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prss Kit",
  description: "Share who you are and what you do",
};

export default async function Layout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}