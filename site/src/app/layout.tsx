import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {Providers} from "@/app/providers";
import {Layout} from "@/components/Layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://uvcanvas.com'),
  title: {
    template: '%s - UVCanvas',
    default:
      'UVCanvas',
  },
  description:
    'UVCanvas',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={inter.className}>

    <Providers>
      <Layout>{children}</Layout>
    </Providers>
    </body>
    </html>
  );
}
