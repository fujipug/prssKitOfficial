import { ThemeProvider } from "@/lib/ThemeContext";
import "../globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prss Kit",
  description: "Share who you are and what you do",
};

export default async function Layout({
  children,
  params
}: {
  children: React.ReactNode,
  params: { locale: string };
}) {

  return (
    <html lang={params.locale}>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}