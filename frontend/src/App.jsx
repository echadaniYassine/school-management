import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/index';
import StudentContext from './context/StudentContext';
import { ThemeProvider } from "./components/theme-provider"
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <>

      <StudentContext>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </StudentContext>
      <Toaster />



    </>
  );
}

export default App;