import React from 'react';
import { Outlet } from 'react-router-dom';

import { Flex, Stack } from '@chakra-ui/react';

import { Menu } from '@/features/menu';

const Layout: React.FC = () => {
  return (
    <Flex data-layout h='100vh'>
      <Menu />

      <Stack as='main' flex='auto' maxH='100vh' overflow='auto'>
        <Outlet />
      </Stack>
    </Flex>
  );
};

export { Layout };
