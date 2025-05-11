import React from 'react';

import { rqClient } from '@/shared/api/instance';

interface HierarchyElementProps {
  itemId: string;
}

const HierarchyElement: React.FC<HierarchyElementProps> = (props) => {
  const { itemId } = props;

  const { data, isLoading } = rqClient.useQuery('get', `/hierarchy/{itemId}`, { params: { path: { itemId } } });

  if (isLoading) return <div>loading</div>;

  return (
    <li>
      <button>{data?.name}</button>
    </li>
  );
};

const Hierarchy: React.FC = () => {
  const { data: rootHierarchy, isLoading } = rqClient.useQuery('get', `/hierarchy/{itemId}`, {
    params: { path: { itemId: '' } }, // empty itemId means root hierarchy query
  });

  if (isLoading) return <div>loading</div>;

  if (!rootHierarchy) return null;

  const { children } = rootHierarchy || {};

  return <ul>{children?.map((childKey) => <HierarchyElement key={childKey} itemId={childKey} />)}</ul>;
};

export { Hierarchy };
