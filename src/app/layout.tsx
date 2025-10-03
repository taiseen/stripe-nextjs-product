import { ConvexClientProvider } from "@/provider/ConvexClientProvider";
import { ThemeProvider } from "next-themes";
import { metaRootData } from "@/meta";
import { LayoutType } from "@/types";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import Bg from "@/components/Bg";
import "../styles/globals.css";

export const metadata = metaRootData;

export default function RootLayout({ children }: Readonly<LayoutType>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ConvexClientProvider>
            <Bg />
            <Navbar />

            {children}

            <Toaster />
          </ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
