import NavBar from "@/components/navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";
import { Icons } from "@/components/icons";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stackoverflow-clone",
  description: "simple project for alx",
  icons: Icons.logo,
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
          <div className="container px-2 ">
            <NavBar />
            {children}
          </div>
          {authModal}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
