import NavBar from "@/components/navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";
import { Icons } from "@/components/icons";
import SideMenu from "@/components/sidemenu";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stackoverflow-clone",
  description: "simple project for alx",
};

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="md:container px-2">
            <NavBar />
            <div className="flex gap-5">
              <div className="w-fit">
                <SideMenu />
              </div>
              <div>{children}</div>
            </div>
          </div>
        </Providers>
        {authModal}
        <Toaster />
      </body>
    </html>
  );
}
