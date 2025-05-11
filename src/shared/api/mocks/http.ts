import { createOpenApiHttp } from 'openapi-msw';
import { API_CONFIG } from '@/shared/config';
import { type ApiPaths } from '../schema';

const http = createOpenApiHttp<ApiPaths>({
  baseUrl: API_CONFIG.baseUrl,
});

export { http };
