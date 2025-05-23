import React from 'react';
import { Outlet } from 'react-router-dom';

import { Flex, Stack, Box, Button } from '@chakra-ui/react';

import { Menu } from '@/features/menu';

const Layout: React.FC = () => {
  return (
    <Flex data-layout h='100vh'>
      <Menu />

      <Stack as='main' flex='auto' maxH='100vh' w='full' gap='0'>
        <Flex
          as='header'
          data-header
          w='full'
          p='4'
          minH='72px'
          borderBottom='1px solid'
          borderColor='border'
          flex='none'
        >
          App header
        </Flex>

        <Box flex='auto' h='calc(100vh - 72px * 2)' overflow='auto' p='4'>
          <Outlet />
        </Box>

        <Flex as='footer' data-footer w='full' p='4' minH='72px' borderTop='1px solid' borderColor='border' flex='none'>
          <Button variant='surface'>Click</Button>
        </Flex>
      </Stack>
    </Flex>
  );
};

export { Layout };
