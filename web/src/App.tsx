import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { LanguageProvider } from './context/LanguageContext';

export const App = () => {
  return (
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  );
};

export default App;
