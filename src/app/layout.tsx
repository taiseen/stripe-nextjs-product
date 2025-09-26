import { ConvexClientProvider } from "@/provider/ConvexClientProvider";
import { metaRootData } from "@/meta";
import { LayoutType } from "@/types";
import "../styles/globals.css";

export const metadata = metaRootData;

export default function RootLayout({ children }: Readonly<LayoutType>) {
  return (
    <html lang="en">
      <body>
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
