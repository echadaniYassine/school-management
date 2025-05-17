import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/index';
import StudentContext from './context/StudentContext';
import { ThemeProvider } from "./components/theme-provider"

function App() {
  return (
    <>

      <StudentContext>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </StudentContext>

    </>
  );
}

export default App;