import React from 'react';
import { v4 as getId } from 'uuid';
import { useQueryClient } from '@tanstack/react-query';

import { Stack, Button, Flex } from '@chakra-ui/react';

import type { ApiSchemas } from '@/shared/api/schema';
import { rqClient } from '@/shared/api/instance';

import { $menuContext as MenuContext } from './context';

import { HierarchyItem } from './HierarchyItem';
import type { MenuStateType } from './interfaces';

const generateNewItem = (): ApiSchemas['Item'] => {
  const id = getId();
  return { id, name: id, parentId: null, locked: false, childrenIds: [] };
};

const Menu: React.FC = () => {
  const [state, setState] = React.useState<MenuStateType>({});

  const qc = useQueryClient();

  const { data: rootHierarchy } = rqClient.useQuery('get', '/hierarchy');

  const { mutate: createHierarchyUnit } = rqClient.useMutation('post', '/hierarchy', {
    onSuccess: async () => {
      await qc.invalidateQueries(rqClient.queryOptions('get', '/hierarchy'));
    },
  });

  if (!rootHierarchy) return null;

  const { childrenIds } = rootHierarchy || {};

  return (
    <MenuContext value={{ state, setState }}>
      <Stack as='aside' data-aside h='100vh' w='384px' flex='none' borderRight='1px solid' borderColor='border' gap='0'>
        <Flex w='full' p='4' minH='72px' borderBottom='1px solid' borderColor='border' flex='none'>
          Aside head
        </Flex>

        <Stack p='4' as='ul' flex='auto' gap={0} maxH='calc(100vh - 73px * 2)' overflow='auto'>
          {childrenIds?.map((childKey) => <HierarchyItem key={childKey} itemId={childKey} />)}
        </Stack>

        <Flex w='full' p='4' minH='72px' borderTop='1px solid' borderColor='border' flex='none'>
          <Button w='full' variant='surface' onClick={() => createHierarchyUnit({ body: { item: generateNewItem() } })}>
            Create
          </Button>
        </Flex>
      </Stack>
    </MenuContext>
  );
};

export { Menu };
