
"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isClient, setIsClient] = React.useState(false);
  
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative overflow-hidden rounded-full transition-colors"
    >
      <div className={cn(
        "absolute inset-0 transition-opacity duration-300",
        theme === "dark" ? "opacity-0" : "opacity-100"
      )}>
        <Sun className="h-5 w-5 transition-all" />
      </div>
      <div className={cn(
        "absolute inset-0 transition-opacity duration-300",
        theme === "dark" ? "opacity-100" : "opacity-0"
      )}>
        <Moon className="h-5 w-5 transition-all" />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
