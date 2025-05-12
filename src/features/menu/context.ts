import { createContext, useContext } from 'react';

import type { MenuContextType } from './interfaces';

const $menuContext = createContext<MenuContextType>({
  state: {},
  setState: () => {},
});

const useMenuContext = () => useContext($menuContext);

export { $menuContext, useMenuContext };
