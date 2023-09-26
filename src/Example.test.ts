import { check } from 'k6';
import ResponseCodes from './types/ResponseCodes';
import { get } from './helpers/Http';

export const options = {
  iterations: 1,
};

export default async function () {
  const response = await get({
    // Note this can also be set as a env variable and then you do not have to specify it
    baseUrl: 'https://test-api.k6.io',
    path: '/public/crocodiles/',
  });

  check(response, {
    'Check correct response code': (r) => r.status === ResponseCodes.OK,
  });
}
