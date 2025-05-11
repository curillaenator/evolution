import { setupWorker } from 'msw/browser';
import { hierarchyHandlers } from './handlers/hierarchy';

export const worker = setupWorker(...hierarchyHandlers);
