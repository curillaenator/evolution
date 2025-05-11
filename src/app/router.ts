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
    ],
  },
]);

export { router };
