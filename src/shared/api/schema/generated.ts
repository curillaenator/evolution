/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/hierarchy': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Получение root иерархии */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Элемент найден */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': components['schemas']['Item'];
          };
        };
        401: components['responses']['unauthorizedError'];
        404: components['responses']['notFoundError'];
      };
    };
    put?: never;
    /** Создание элемента иерархии */
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody: {
        content: {
          'application/json': components['schemas']['CreateItemPayload'];
        };
      };
      responses: {
        /** @description Элемент успешно создан */
        201: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
        401: components['responses']['unauthorizedError'];
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/hierarchy/{itemId}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Получение элемента иерархии по ID */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          itemId: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Элемент найден */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': components['schemas']['Item'];
          };
        };
        401: components['responses']['unauthorizedError'];
        404: components['responses']['notFoundError'];
      };
    };
    put?: never;
    post?: never;
    /** Удаление элемента с перемещением его детей */
    delete: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          itemId: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Элемент удалён, дети перемещены */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': components['schemas']['Item'];
          };
        };
        401: components['responses']['unauthorizedError'];
        404: components['responses']['notFoundError'];
      };
    };
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/auth/login': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Login */
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody: {
        content: {
          'application/json': components['schemas']['Creds'];
        };
      };
      responses: {
        /** @description login success */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': components['schemas']['User'];
          };
        };
        401: components['responses']['unauthorizedError'];
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/auth/register': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Register */
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody: {
        content: {
          'application/json': components['schemas']['Creds'];
        };
      };
      responses: {
        /** @description login success */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': components['schemas']['User'];
          };
        };
        401: components['responses']['badRequestError'];
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
}
export type webhooks = Record<string, never>;
export interface components {
  schemas: {
    Item: {
      id: string;
      parentId: string | null;
      name: string;
      locked: boolean;
      childrenIds: string[];
      createdAt?: number;
      createdBy?: string;
      updatedAt?: number;
      updatedBy?: string;
    };
    Error: {
      message: string;
      code: string;
    };
    CreateItemPayload: {
      item: components['schemas']['Item'];
    };
    Creds: {
      /** Format: email */
      email?: string;
      /** Format: password */
      password?: string;
    };
    User: {
      id?: string;
      /** Format: email */
      email?: string;
    };
  };
  responses: {
    /** @description Unauthorized */
    unauthorizedError: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        'application/json': components['schemas']['Error'];
      };
    };
    /** @description Resource not found */
    notFoundError: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        'application/json': components['schemas']['Error'];
      };
    };
    /** @description Bad request */
    badRequestError: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        'application/json': components['schemas']['Error'];
      };
    };
  };
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
