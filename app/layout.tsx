import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import FrozenBackground from "@/components/FrozenBackground";
import ScrollProgress from "@/components/ScrollProgress";
import MagneticTargets from "@/components/MagneticTargets";
import SeasonProvider, {
  SEASON_BOOT_SCRIPT,
} from "@/components/SeasonProvider";
import LanguageProvider, {
  LANG_BOOT_SCRIPT,
} from "@/components/LanguageProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Suleiman Khashashneh — Full Stack Web Developer & IoT Engineer",
  description:
    "Portfolio of Suleiman Khashashneh — Full Stack Web Developer & IoT Engineer. Interactive 3D portfolio featuring Angular, ASP.NET Core, React, Python, C#, and IoT.",
  authors: [{ name: "Suleiman Khashashneh" }],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/icon.svg",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Suleiman Khashashneh — Full Stack Web Developer & IoT Engineer",
    description:
      "Interactive 3D portfolio of Suleiman Khashashneh featuring web engineering, IoT pipelines, and full-stack projects.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Suleiman Khashashneh — Full Stack Web Developer & IoT Engineer",
    description:
      "Interactive 3D portfolio of Suleiman Khashashneh featuring web engineering, IoT pipelines, and full-stack projects.",
  },
};

export const viewport: Viewport = {
  themeColor: "#060e1c",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Run synchronously before hydration to apply the user's stored
            season + language — avoids a flash of the default values. */}
        <script dangerouslySetInnerHTML={{ __html: SEASON_BOOT_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: LANG_BOOT_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Suleiman Khashashneh",
              jobTitle: "Full Stack Web Developer & IoT Engineer",
              url: "https://github.com/SuleimanKh97",
              sameAs: [
                "https://www.linkedin.com/in/suleimankhashashneh/",
                "https://github.com/SuleimanKh97"
              ],
              knowsAbout: [
                "Full Stack Web Development",
                "IoT Data Telemetry",
                "ASP.NET Core",
                "Angular",
                "React",
                "Python",
                "C#",
                "TypeScript",
                "PostgreSQL",
                "SQL Server"
              ]
            }),
          }}
        />
      </head>
      <body
        className="min-h-full flex flex-col"
        suppressHydrationWarning
      >
        <LanguageProvider>
          <SeasonProvider>
            <FrozenBackground />
            <ScrollProgress />
            {children}
            <CustomCursor />
            <MagneticTargets />
          </SeasonProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
