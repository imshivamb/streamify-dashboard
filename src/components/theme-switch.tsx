"use client";

import { useTheme } from "@/context/theme-context";
import React from "react";
import { Sun, Moon } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className=" bg-white dark:bg-gray-950 p-2 rounded-full shadow-md flex items-center space-x-2">
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Switch
        checked={theme === "dark"}
        onCheckedChange={toggleTheme}
        className="data-[state=checked]:bg-gray-700 data-[state=unchecked]:bg-orange-500"
      />
      <Moon className="absolute mr-1.5 h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </div>
  );
};

export default ThemeSwitch;
