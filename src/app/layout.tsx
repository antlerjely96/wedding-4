import type { Metadata } from "next";
import {Great_Vibes, Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import FloatingHearts from "@/components/FloatingHearts";

const greatVibes = Great_Vibes({
    subsets: ["latin", "vietnamese"],
    weight: ["400"],
    variable: "--font-script",
});

const playfair = Playfair_Display({
    subsets: ["latin", "vietnamese"],
    variable: "--font-serif",
});

const montserrat = Montserrat({
    subsets: ["latin", "vietnamese"],
    variable: "--font-sans",
});


export const metadata: Metadata = {
    title: "Thu Trang ❤️ Sơn Tùng Wedding",
    description: "Trân trọng kính mời tham dự lễ cưới",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="vi">
        <body className={`${greatVibes.variable} ${playfair.variable} ${montserrat.variable} font-sans antialiased`}>
        {children}

        <FloatingHearts />
        </body>
        </html>
    );
}