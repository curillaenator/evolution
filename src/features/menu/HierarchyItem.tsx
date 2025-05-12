import React, { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { v4 as getId } from 'uuid';

import { IconButton, Button, Flex, Text, Stack } from '@chakra-ui/react';
import { IoRemoveOutline, IoAddOutline, IoCaretForwardOutline, IoLogoReact } from 'react-icons/io5';

import type { ApiSchemas } from '@/shared/api/schema';
import { rqClient } from '@/shared/api/instance';

import { useMenuContext } from './context';

interface HierarchyElementProps {
  itemId: string;
}

const generateNewItem = (parentId: string | null): ApiSchemas['Item'] => {
  const id = getId();
  return { id, name: id, parentId, locked: false, childrenIds: [] };
};

const HierarchyItem: React.FC<HierarchyElementProps> = ({ itemId }) => {
  const qc = useQueryClient();

  const [touched, setTouched] = React.useState<boolean>(false);
  const { state, setState } = useMenuContext();

  const itemState = state[itemId];

  // register state fot item
  useEffect(() => {
    setState((prev) => ({ ...prev, [itemId]: { isOpen: false, isMoving: false } }));
  }, [itemId, setState]);

  const { data, isLoading } = rqClient.useQuery('get', `/hierarchy/{itemId}`, { params: { path: { itemId } } });

  const { mutate: createHierarchyUnit, isPending: isUnitCreating } = rqClient.useMutation('post', '/hierarchy', {
    onSuccess: async () => {
      await qc.invalidateQueries(rqClient.queryOptions('get', '/hierarchy/{itemId}', { params: { path: { itemId } } }));

      if (!itemState.isOpen) {
        setState((prev) => ({ ...prev, [itemId]: { ...prev[itemId], isOpen: true } }));
      }
    },
  });

  const { mutate: deleteHierarchyUnit, isPending: isUnitDeleting } = rqClient.useMutation(
    'delete',
    '/hierarchy/{itemId}',
    {
      onSuccess: async ({ parentId }) => {
        if (parentId) {
          await qc.invalidateQueries(
            rqClient.queryOptions('get', '/hierarchy/{itemId}', { params: { path: { itemId: parentId } } }),
          );
        } else {
          await qc.invalidateQueries(rqClient.queryOptions('get', '/hierarchy'));
        }
      },
    },
  );

  const disabled = isLoading || isUnitDeleting || isUnitCreating;

  if (!data || !itemState) return null;

  return (
    <Stack as='li' w='full'>
      <Flex w='full' onClick={() => setTouched(true)}>
        <IconButton
          size='sm'
          loading={isLoading}
          variant='ghost'
          style={{ flex: 'none' }}
          onClick={() =>
            setState((prev) => ({
              ...prev,
              [itemId]: { ...prev[itemId], isOpen: !prev[itemId].isOpen },
            }))
          }
          transform={itemState.isOpen ? 'rotate(90deg)' : 'rotate(0)'}
        >
          {data.childrenIds.length ? <IoCaretForwardOutline /> : <IoLogoReact />}
        </IconButton>

        {!isLoading && (
          <>
            <Button variant='ghost' size='sm' flex='auto' w='full' justifyContent='flex-start' disabled={disabled}>
              <Text as='span' textAlign='left' textOverflow='ellipsis' whiteSpace='nowrap' overflow='hidden' w='full'>
                {data?.name}
              </Text>
            </Button>

            <IconButton
              disabled={disabled}
              loading={isUnitCreating}
              size='sm'
              variant='ghost'
              style={{ flex: 'none' }}
              onClick={() => {
                createHierarchyUnit({
                  body: { item: generateNewItem(data.id) },
                });
              }}
            >
              <IoAddOutline />
            </IconButton>

            <IconButton
              disabled={disabled}
              loading={isUnitDeleting}
              size='sm'
              variant='ghost'
              style={{ flex: 'none' }}
              onClick={() => deleteHierarchyUnit({ params: { path: { itemId } } })}
            >
              <IoRemoveOutline />
            </IconButton>
          </>
        )}
      </Flex>

      {touched && !!data.childrenIds.length && (
        <Stack pl='4' as='ul' h={itemState.isOpen ? 'fit-content' : '0'} gap={0} overflow='hidden'>
          {data.childrenIds.map((childId) => (
            <HierarchyItem key={childId} itemId={childId} />
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export { HierarchyItem };
