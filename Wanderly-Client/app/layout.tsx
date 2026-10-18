import type { Metadata } from "next";

import "./globals.css";
import { GoogleProvider } from "@/provider/google-provider";
import { ThemeProvider } from "@/components/shared/theme-provider";

export const metadata: Metadata = {
  title: "Mini Coders",
  description: "Learn coding with Mini Coders",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GoogleProvider>{children}</GoogleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}