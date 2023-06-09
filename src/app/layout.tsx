import { Montserrat } from "next/font/google";
import "./globals.css";

import Nav from "@/components/Nav";
import RootProvider from "@/providers/provider";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "SoundSphere",
  description:
    "Join or create a music label DAO and earn royalties from each streamed music in the DAO dataset",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${montserrat.variable}`} lang="en">
      <body className={"flex h-full"}>
        <RootProvider>
          <Nav />
          <main className="flex gap-12 min-h-screen w-full flex-col items-center p-8 px-24 overflow-scroll">
            {children}
          </main>
        </RootProvider>
      </body>
    </html>
  );
}
