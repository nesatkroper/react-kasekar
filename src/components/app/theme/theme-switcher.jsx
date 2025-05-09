import React, { useEffect, useState } from "react";
import { Check, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function ThemeSwitcher() {
  const [theme, setTheme] = useState("green");

  useEffect(() => {
    const storedTheme = localStorage.getItem("ui-theme");
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.setAttribute("data-theme", storedTheme);
    }
  }, []);

  const changeTheme = (newTheme) => {
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("ui-theme", newTheme);
    setTheme(newTheme);
  };

  const themes = [
    { name: "zinc", color: "#71717a" },
    { name: "slate", color: "#64748b" },
    { name: "stone", color: "#78716c" },
    { name: "gray", color: "#6b7280" },
    { name: "neutral", color: "#737373" },
    { name: "red", color: "#ef4444" },
    { name: "rose", color: "#f43f5e" },
    { name: "orange", color: "#f97316" },
    { name: "green", color: "#22c55e" },
    { name: "blue", color: "#3b82f6" },
    { name: "yellow", color: "#eab308" },
    { name: "violet", color: "#8b5cf6" },
    { name: "purple", color: "#a855f7" },
    { name: "indigo", color: "#6366f1" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='icon' size='icon'>
          <Palette className='h-[1.2rem] w-[1.2rem]' />
          <span className='sr-only'>Change theme color</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <div className='grid grid-cols-3 gap-1 p-1'>
          {themes.map((t) => (
            <DropdownMenuItem
              key={t.name}
              className='flex h-8 w-8 items-center justify-center p-0 hover:bg-accent focus:bg-accent'
              onClick={() => changeTheme(t.name)}>
              <div
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full",
                  "border border-input"
                )}
                style={{ backgroundColor: t.color }}>
                {theme === t.name && <Check className='h-4 w-4 text-white' />}
              </div>
              <span className='sr-only'>{t.name}</span>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
