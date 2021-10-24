import { FetchOptions } from '../../interface/FetchOptions';
import { RequestsApiData } from '../../interface/Request';

export async function listRequests(): Promise<RequestsApiData> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch('/requests', fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
