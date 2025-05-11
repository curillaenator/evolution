// обртка над fetch и над react-query
import createFetchClient from 'openapi-fetch';
import createClient from 'openapi-react-query';

import { API_CONFIG } from '@/shared/config';
import type { ApiPaths } from './schema';

const fetchClient = createFetchClient<ApiPaths>({
  baseUrl: API_CONFIG.baseUrl,
});

const rqClient = createClient(fetchClient);

export { fetchClient, rqClient };
