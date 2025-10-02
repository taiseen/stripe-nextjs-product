"use client";

import { useMounted } from "@/hook/useMounted";
import { useTheme } from "next-themes";

const Bg = () => {
  const { resolvedTheme } = useTheme();

  const isMounted = useMounted();
  
  if (!isMounted) {
    // Optional: render a neutral fallback or nothing
    return (
      <div className="absolute inset-0 -z-10 h-full w-full bg-background" />
    );
  }

  return (
    <div
      className="absolute inset-0 -z-10 h-full w-full bg-background"
      style={
        resolvedTheme === "dark"
          ? {
              backgroundImage: `
                linear-gradient(to right, hsl(var(--grid-color)) 1px, transparent 1px),
                linear-gradient(to bottom, hsl(var(--grid-color)) 1px, transparent 1px)
              `,
              backgroundSize: "6rem 4rem",
            }
          : {
              backgroundImage: `
                linear-gradient(to right, hsl(var(--grid-color)) 1px, transparent 1px),
                linear-gradient(to bottom, hsl(var(--grid-color)) 1px, transparent 1px)
              `,
              backgroundSize: "6rem 4rem",
            }
      }
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle 800px at 100% 200px, hsl(var(--radial-color)), transparent)`,
        }}
      />
    </div>
  );
};

export default Bg;
