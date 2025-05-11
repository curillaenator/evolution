import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div data-layout>
      <Outlet />
    </div>
  );
};

export { Layout };
