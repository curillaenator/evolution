import React from 'react';

interface MenuStateItem {
  isOpen: boolean;
  isMoving: boolean;
}

type MenuStateKey = keyof MenuStateItem;

type MenuStateType = Record<string, MenuStateItem>;

interface MenuContextType {
  state: MenuStateType;
  setState: React.Dispatch<React.SetStateAction<MenuStateType>>;
}

export type { MenuStateItem, MenuStateKey, MenuStateType, MenuContextType };
