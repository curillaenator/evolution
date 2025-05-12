import { setupWorker } from 'msw/browser';
import { userHandlers } from './handlers/users';
import { hierarchyHandlers } from './handlers/hierarchy';

export const worker = setupWorker(...userHandlers, ...hierarchyHandlers);
