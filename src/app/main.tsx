import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { router } from './router';
import { QueryProvider } from './providers/QueryProvider';
import { ChakraProvider } from './providers/ChakraProvider';

async function enableMocks() {
  if (import.meta.env.PROD) return;

  const { worker } = await import('@/shared/api/mocks/browser');

  return worker.start();
}

enableMocks().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryProvider>
        <ChakraProvider>
          <RouterProvider router={router} />
        </ChakraProvider>
      </QueryProvider>
    </StrictMode>,
  );
});
