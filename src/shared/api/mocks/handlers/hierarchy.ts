import { HttpResponse } from 'msw';
import { http } from '../http';

import type { ApiSchemas } from '../../schema';

interface MockDatabase {
  ITEMS: ApiSchemas['Item'][];
  ROOT: ApiSchemas['Item'];
}

const DB: MockDatabase = {
  ITEMS: [
    { id: '123', parentId: null, name: 'Doc 2', locked: false, childrenIds: [] },
    { id: '456', parentId: null, name: 'Doc 1', locked: false, childrenIds: ['789'] },
    { id: '789', parentId: '456', name: 'Cool 2', locked: false, childrenIds: [] },
  ],

  ROOT: {
    id: 'hierarchy-root',
    parentId: null,
    name: 'root',
    locked: false,
    childrenIds: ['123', '456'],
  },
};

const hierarchyHandlers = [
  http.get('/hierarchy', () => HttpResponse.json(DB.ROOT)),

  http.get('/hierarchy/{itemId}', (ctx) => {
    return HttpResponse.json(DB.ITEMS.find((el) => el.id === ctx.params.itemId));
  }),

  http.post('/hierarchy', async (ctx) => {
    const { item } = await ctx.request.json();

    DB.ITEMS.push(item);

    if (item.parentId) {
      const updIdx = DB.ITEMS.findIndex((el) => el.id === item.parentId);
      DB.ITEMS[updIdx].childrenIds.push(item.id);
    } else {
      DB.ROOT.childrenIds.push(item.id);
    }

    //@ts-expect-error reason
    return HttpResponse.json({ description: 'Элемент created' });
  }),

  http.delete(
    '/hierarchy/{itemId}',
    async (ctx) => {
      const { itemId } = await ctx.params;
      const itemsDeleteIdx = DB.ITEMS.findIndex((el) => el.id === itemId);

      //@ts-expect-error reason
      if (itemsDeleteIdx < 0) return HttpResponse.json({ description: 'Элемент не найден' });

      const itemToDelete = DB.ITEMS[itemsDeleteIdx];

      const { parentId, childrenIds } = itemToDelete;

      // removing item's children shifts their parentId
      childrenIds.forEach((childId) => {
        const tIdx = DB.ITEMS.findIndex((el) => el.id === childId);
        DB.ITEMS[tIdx].parentId = parentId;
      });

      if (parentId) {
        const targetParentIdx = DB.ITEMS.findIndex((el) => el.id === parentId);

        DB.ITEMS[targetParentIdx].childrenIds = [...DB.ITEMS[targetParentIdx].childrenIds, ...childrenIds].filter(
          (childId) => childId !== itemId,
        );
      } else {
        DB.ROOT.childrenIds = [...DB.ROOT.childrenIds, ...childrenIds].filter((childId) => childId !== itemId);
      }

      DB.ITEMS.splice(itemsDeleteIdx, 1);

      return HttpResponse.json(itemToDelete);
    },
    {},
  ),
];

export { hierarchyHandlers };
