import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "HowieCheats — By Order of the Peaky Blinders",
  description:
    "Premium private cheats for popular games. Undetected, safe, instant delivery.",
  keywords: ["cheats", "hacks", "game cheats", "undetected", "aimbot", "esp", "wallhack"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} ${playfair.variable} antialiased font-sans bg-black/90 text-gray-200 selection:bg-[#C6A87C] selection:text-black`}>
        {children}
      </body>
    </html>
  );
}
