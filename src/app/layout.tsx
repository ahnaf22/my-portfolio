import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Serif, JetBrains_Mono, Poppins } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

// the reference site's content font, used for the toolbox lists
const poppins = Poppins({
  variable: "--font-poppins-face",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const siteUrl = "https://shoumikruns.netlify.app";
const ogImage = {
  url: "/og.png", // resolved against metadataBase into an absolute URL
  width: 1200,
  height: 630,
  alt: "Ahnaf Ahmad Shoumik: I build e-commerce platforms and run the servers underneath them.",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ahnaf Ahmad Shoumik — Senior Software Engineer",
  description:
    "Senior software engineer in Dhaka building and running e-commerce platforms, payments and the Linux servers underneath them. PHP, Laravel, OpenCart, Flutter.",
  openGraph: {
    title: "Ahnaf Ahmad Shoumik — Senior Software Engineer",
    description:
      "I build e-commerce platforms and run the servers underneath them. PHP · Laravel · OpenCart · Flutter · Linux.",
    type: "website",
    url: siteUrl,
    siteName: "Ahnaf Ahmad Shoumik",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahnaf Ahmad Shoumik — Senior Software Engineer",
    description: "I build e-commerce platforms and run the servers underneath them.",
    images: [ogImage.url],
  },
};

export const viewport: Viewport = {
  themeColor: "#efebe2",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${instrument.variable} ${jetbrains.variable} ${poppins.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
