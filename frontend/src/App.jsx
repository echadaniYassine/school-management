// src/App.jsx

import { RouterProvider } from 'react-router-dom';
import { router } from './router/index';
// --- FIX IS HERE ---
// We import UserContext because that is the correct name of our context provider now.
import UserContext from './context/UserContext'; 
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <>
      {/* --- FIX IS HERE --- */}
      {/* We use the UserContext component we just imported. */}
      <UserContext>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </UserContext>
      <Toaster />
    </>
  );
}

export default App;