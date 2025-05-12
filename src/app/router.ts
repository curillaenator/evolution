import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './layout';

import { ROUTES } from '@/shared/routes';

const router = createBrowserRouter([
  {
    path: ROUTES.root,
    Component: Layout,
    children: [
      {
        index: true,
        lazy: {
          Component: async () => (await import('../pages/main/main.page')).Component,
        },
      },
      {
        path: ROUTES.login,
        lazy: {
          Component: async () => (await import('../pages/auth/login.page')).Component,
        },
      },
      {
        path: ROUTES.register,
        lazy: {
          Component: async () => (await import('../pages/auth/register.page')).Component,
        },
      },
    ],
  },
]);

export { router };
