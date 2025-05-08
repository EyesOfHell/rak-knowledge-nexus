
import React from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="transition-all duration-300 hover:rotate-12"
    >
      <Sun className={`h-5 w-5 transition-opacity duration-300 ${theme === "dark" ? "opacity-0 absolute" : "opacity-100"}`} />
      <Moon className={`h-5 w-5 transition-opacity duration-300 ${theme === "light" ? "opacity-0 absolute" : "opacity-100"}`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
