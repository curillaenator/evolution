import React from 'react';
import { Outlet } from 'react-router-dom';

import { Hierarchy } from '@/features/hierarchy';

const Layout: React.FC = () => {
  return (
    <div data-layout style={{ display: 'flex' }}>
      <aside style={{ height: '100vh', width: '384px' }}>
        <Hierarchy />
      </aside>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export { Layout };
