import { createBrowserRouter } from "react-router-dom";

import { App } from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        lazy: {
          Component: async () =>
            (await import("../features/mainpage/mainpage")).Component,
        },
      },
    ],
  },
]);

export { router };
