import { ConvexClientProvider } from "@/provider/ConvexClientProvider";
import { metaRootData } from "@/meta";
import { LayoutType } from "@/types";
import Navbar from "@/components/Navbar";
import Bg from "@/components/Bg";
import "../styles/globals.css";

export const metadata = metaRootData;

export default function RootLayout({ children }: Readonly<LayoutType>) {
  return (
    <html lang="en">
      <body>
        <ConvexClientProvider>
          <Bg />

          <Navbar />

          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
