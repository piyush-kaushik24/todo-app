import { useEffect } from "react";
import { Header } from "./components/Header";
import { ImageSwitch } from "./components/ImageSwitch";
import { Todo } from "./components/Todo";
import { useLocalStorage } from "./hooks/useLocalStorage";

export const App = () => {
  const [theme, setTheme] = useLocalStorage("theme", true);
  function onThemeSwitch(theme: boolean) {
    setTheme(theme);
  }
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme ? "dark" : "light",
    );
  }, [theme]);

  return (
    <div className="flex min-h-screen flex-col p-4">
      <ImageSwitch theme={theme} />
      <div className="relative z-20 mx-auto w-full max-w-150 md:py-16">
        <Header onTheme={onThemeSwitch} theme={theme} />
        <main>
          <Todo />
          <span className="mt-12 block text-center">
            Drag and drop to reorder list
          </span>
        </main>
      </div>
    </div>
  );
};
