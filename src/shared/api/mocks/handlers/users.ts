import { HttpResponse } from 'msw';
import { http } from '../http';
import { v4 as getUserid } from 'uuid';

import type { ApiSchemas } from '../../schema';

const USERS: ApiSchemas['User'][] = [];

const userHandlers = [
  http.post('/auth/login', async (ctx) => {
    const {
      email,
      // password
    } = await ctx.request.json();

    const user = USERS.find((u) => u.email === email);

    if (!user) return HttpResponse.json({ message: 'User not found', code: '123' });

    return HttpResponse.json(user);
  }),

  http.post('/auth/register', async (ctx) => {
    const {
      email,
      // password
    } = await ctx.request.json();

    const user: ApiSchemas['User'] = { id: getUserid(), email };

    USERS.push(user);

    console.log('USERS', USERS);

    return HttpResponse.json(user);
  }),
];

export { userHandlers };
