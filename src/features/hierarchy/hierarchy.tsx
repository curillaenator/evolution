import React from 'react';
import { v4 as getId } from 'uuid';
import { useQueryClient } from '@tanstack/react-query';

import type { ApiSchemas } from '@/shared/api/schema';
import { rqClient } from '@/shared/api/instance';

interface HierarchyElementProps {
  itemId: string;
}

const generateNewItem = (): ApiSchemas['Item'] => {
  const id = getId();
  return { id, name: id, parent: null, locked: false, children: null };
};

const HierarchyElement: React.FC<HierarchyElementProps> = (props) => {
  const { itemId } = props;
  const qc = useQueryClient();

  const { data, isLoading } = rqClient.useQuery('get', `/hierarchy/{itemId}`, { params: { path: { itemId } } });

  const { mutate: deleteHierarchyUnit, isPending } = rqClient.useMutation('delete', '/hierarchy/{itemId}', {
    onSuccess: async ({ parent }) => {
      if (parent) {
        await qc.invalidateQueries(
          rqClient.queryOptions('get', '/hierarchy/{itemId}', { params: { path: { itemId: parent } } }),
        );
      } else {
        await qc.invalidateQueries(rqClient.queryOptions('get', '/hierarchy'));
      }
    },
  });

  return (
    <li
      style={{
        width: '100%',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      {isLoading || isPending ? (
        <div>loading...</div>
      ) : (
        <>
          <button style={{ flex: 'auto', width: '100%' }}>{data?.name}</button>

          <button style={{ flex: 'none' }} onClick={() => deleteHierarchyUnit({ params: { path: { itemId } } })}>
            remove
          </button>
        </>
      )}
    </li>
  );
};

const Hierarchy: React.FC = () => {
  const qc = useQueryClient();

  const { data: rootHierarchy } = rqClient.useQuery('get', '/hierarchy');

  const { mutate: createHierarchyUnit } = rqClient.useMutation('post', '/hierarchy', {
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['get', '/hierarchy'] });
    },
  });

  if (!rootHierarchy) return null;

  const { children } = rootHierarchy || {};

  return (
    <div>
      <ul style={{ padding: '8px' }}>
        {children?.map((childKey) => <HierarchyElement key={childKey} itemId={childKey} />)}
      </ul>

      <button onClick={() => createHierarchyUnit({ body: { parentId: null, item: generateNewItem() } })}>Create</button>
    </div>
  );
};

export { Hierarchy };
