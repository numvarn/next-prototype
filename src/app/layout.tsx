import type { Metadata } from "next";
import { Noto_Sans_Thai, Prompt } from "next/font/google";
import {
  BootstrapClient,
} from "@/components/layout";
import { NextAuthProvider } from "@/components/layout/NextAuthProvider";
import "./globals.css";

const notoSansThai = Noto_Sans_Thai({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  variable: "--font-noto-sans-thai",
});

const prompt = Prompt({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  variable: "--font-prompt",
});

export const metadata: Metadata = {
  title: "SL Concrete - ระดับแนวหน้าในเขตจังหวัดศรีสะเกษ",
  description: "ผู้ผลิตและจำหน่ายผลิตภัณฑ์คอนกรีตมาตรฐาน ม.อ.ก. รายใหญ่ที่สุดในจังหวัดศรีสะเกษ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${notoSansThai.variable} ${prompt.variable}`}>
      <body>
        <NextAuthProvider>
          <BootstrapClient />
          <main className="main-wrapper">
            {children}
          </main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
