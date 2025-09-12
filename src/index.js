import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';

// Lazy load the main App component
const App = React.lazy(() => import('./App'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <React.Suspense fallback={<div aria-label="Loading...">Loading...</div>}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </React.Suspense>
  </React.StrictMode>
);
