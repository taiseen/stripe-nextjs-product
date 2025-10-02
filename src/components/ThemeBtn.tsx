"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useMounted } from "@/hook/useMounted";
import { useTheme } from "next-themes";

const ThemeBtn = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isMounted = useMounted();

  if (!isMounted) {
    // Render a neutral placeholder to avoid hydration mismatch
    return (
      <button
        aria-label="Loading theme toggle"
        className="p-2 rounded-md opacity-0 pointer-events-none"
      >
        <SunIcon className="size-4" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
    >
      {theme === "dark" ? (
        <SunIcon className="size-4" />
      ) : (
        <MoonIcon className="size-4" />
      )}
    </button>
  );
};

export default ThemeBtn;
