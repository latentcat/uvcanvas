import type {Metadata, Viewport} from "next";
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


export const viewport: Viewport = {
  width: 'device-width',
  height: 'device-height',
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
  viewportFit: "cover",

  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
      <link rel="manifest" href="/manifest.json"/>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
      <meta content="yes" name="apple-mobile-web-app-capable"/>
    </head>
    <body className={inter.className}>
    <Providers>
      <Layout>{children}</Layout>
    </Providers>
    </body>
    </html>
  );
}
