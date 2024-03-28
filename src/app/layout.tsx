import Header from "@/components/NavBar";
import type { Metadata } from "next";
import "../../styles/global.css";
import { Roboto_Mono, Open_Sans } from "next/font/google";
import Provider from "@/contexts/ThemeProvider";
import { AuthContextWrapper } from "@/contexts/AuthContext";
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});
const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-opensans",
});

export const metadata: Metadata = {
  title: "Portal Sinodal Brasil Central",
  description: "Um portal sobre as UMPs da Sinodal Brasil Central",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <AuthContextWrapper>
            <div
              className={`bg-white dark:bg-slate-800 text-white min-h-screen w-screen flex flex-col ${robotoMono.variable} ${openSans.variable} font-sans`}
            >
              {children}
            </div>
          </AuthContextWrapper>
        </Provider>
      </body>
    </html>
  );
}
