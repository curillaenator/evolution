import React from "react";
import { Outlet } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div data-layout>
      <Outlet />
    </div>
  );
};

export { App };
