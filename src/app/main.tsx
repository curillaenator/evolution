import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { router } from './router';
import { QueryProvider } from './providers/QueryProvider';

import './index.css';

async function enableMocks() {
  if (import.meta.env.PROD) return;

  const { worker } = await import('@/shared/api/mocks/browser');

  return worker.start();
}

enableMocks().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryProvider>
        <RouterProvider router={router} />
      </QueryProvider>
    </StrictMode>,
  );
});
