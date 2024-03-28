import Header from "@/components/Header/Header";
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
              <Header />
              <div className="flex flex-col items-center mt-36">
                <div className="max-w-4xl mx-auto px-6">{children}</div>
              </div>
            </div>
          </AuthContextWrapper>
        </Provider>
      </body>
    </html>
  );
}
