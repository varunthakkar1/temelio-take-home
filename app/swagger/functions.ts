// swagger.ts

import { createSwaggerSpec } from 'next-swagger-doc';

export async function getApiDocs() {
  const spec = createSwaggerSpec({
    apiFolder: 'app/*',
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API Documentation',
        version: '1.0',
      },
    },
  });
  return spec;
}