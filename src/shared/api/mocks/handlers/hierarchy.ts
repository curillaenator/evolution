import { HttpResponse } from 'msw';
import { http } from '../http';

import type { ApiSchemas } from '../../schema';

const ITEMS: ApiSchemas['Item'][] = [
  {
    id: '123',
    parent: null,
    name: 'Doc 2',
    locked: false,
    children: null,
  },
  {
    id: '456',
    parent: null,
    name: 'Doc 1',
    locked: false,
    children: ['789'],
  },
  {
    id: '789',
    parent: '456',
    name: 'Cool 2',
    locked: false,
    children: null,
  },
];

const ROOT_ELEMENT: ApiSchemas['Item'] = {
  id: 'hierarchy-root',
  parent: null,
  name: 'root',
  locked: false,
  children: ['123', '456'],
};

const hierarchyHandlers = [
  http.get('/hierarchy', () => HttpResponse.json(ROOT_ELEMENT)),

  http.get('/hierarchy/{itemId}', (ctx) => {
    return HttpResponse.json(ITEMS.find((el) => el.id === ctx.params.itemId));
  }),

  http.post('/hierarchy', async (ctx) => {
    const { item } = await ctx.request.json();

    ITEMS.push(item);
    ROOT_ELEMENT.children?.push(item.id);

    //@ts-expect-error reason
    return HttpResponse.json({ description: 'Элемент created' });
  }),

  http.delete(
    '/hierarchy/{itemId}',
    async (ctx) => {
      const { itemId } = await ctx.params;
      const deleteIdx = ITEMS.findIndex((el) => el.id === itemId);

      //@ts-expect-error reason
      if (deleteIdx < 0) return HttpResponse.json({ description: 'Элемент не найден' });

      const deleted = ITEMS.splice(deleteIdx, 1);

      ROOT_ELEMENT.children = (ROOT_ELEMENT.children || [])?.filter((childId) => childId !== itemId);

      return HttpResponse.json({ ...deleted[0] });
    },
    {},
  ),
];

export { hierarchyHandlers };
