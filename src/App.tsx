import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useEffect } from "react";
import { useThemeStore, initializeTheme } from "./stores/useThemeStore";
import { ToastContainer } from "./components/ui";

function App() {
  const { mode, scaleMode } = useThemeStore();

  useEffect(() => {
    // Initialize theme on mount
    initializeTheme();
  }, []);

  useEffect(() => {
    // Re-apply when mode or scale changes
    const { setMode, setScaleMode } = useThemeStore.getState();
    setMode(mode);
    setScaleMode(scaleMode);
  }, [mode, scaleMode]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
