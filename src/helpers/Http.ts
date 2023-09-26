import http from 'k6/http';

/*
 * DESCRIPTION:
 * These helper functions are wrappers for K6 HTTP that will send an HTTP request to the provided URL.
 * You can call these functions from your test script to send HTTP requests.
 * You can call the request function and specify the method, path, body, etc.
 * Or you can call the get, del, put, post functions and specify the path, body, etc.
 *
 * BASE URL:
 * Note you can specify the baseUrl in the options object or you can set the API_URL environment variable.
 * The baseUrl within the options object will override the API_URL environment variable.
 */

// eslint-disable-next-line import/no-unused-modules
export interface IHttpSharedParams {
  timeout?: number; // Timeout in milliseconds
  redirects?: number; // Number of redirects to follow
  authHeader?: string; // Auth Token to be sent in the Authorization Header
  headers?: { [k: string]: any }; // Request Headers
  tags?: { [k: string]: any }; // Tags to be sent with the request
}

interface IHttpOptions extends IHttpSharedParams {
  baseUrl?: string; // Base URL to send request to
  body?: any; // Request Body
  method: 'POST' | 'PUT' | 'GET' | 'DELETE' | 'UPDATE'; // Request Method
  path?: string; // Path to append to baseUrl
  contentType?: string; // Type of content type to send
}

// eslint-disable-next-line import/no-unused-modules
export async function request(options: IHttpOptions) {
  const {
    authHeader,
    path,
    baseUrl = __ENV.API_URL,
    contentType = 'application/json',
    headers = {},
    body,
    method,
    redirects = 10,
    timeout = 60000,
    tags,
  }: IHttpOptions = options;

  // Set Auth Token if provided
  if (authHeader) {
    headers.Authorization = authHeader;
  }

  // Set Content-Type
  headers['Content-Type'] = headers['Content-Type']
    ? headers['Content-Type']
    : contentType;

  // stringify body if Content-Type is application/json
  const bodyToSend = headers['Content-Type']
    .toLowerCase()
    .includes('application/json')
    ? JSON.stringify(body)
    : body;

  return await http.asyncRequest(
    method,
    `${baseUrl}${path || ''}`,
    bodyToSend,
    {
      headers,
      redirects,
      timeout,
      tags,
    }
  );
}

// eslint-disable-next-line import/no-unused-modules
export async function get(o: Partial<IHttpOptions>) {
  return await request({ ...o, method: 'GET' });
}

// eslint-disable-next-line import/no-unused-modules
export async function del(o: Partial<IHttpOptions>) {
  return await request({ ...o, method: 'DELETE' });
}

// eslint-disable-next-line import/no-unused-modules
export async function put(o: Partial<IHttpOptions>) {
  return await request({ ...o, method: 'PUT' });
}

// eslint-disable-next-line import/no-unused-modules
export async function post(o: Partial<IHttpOptions>) {
  return await request({ ...o, method: 'POST' });
}

// eslint-disable-next-line import/no-unused-modules
export async function update(o: Partial<IHttpOptions>) {
  return await request({ ...o, method: 'UPDATE' });
}
