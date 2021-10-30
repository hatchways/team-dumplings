import { FetchOptions } from '../../interface/FetchOptions';
import { CreateRequest, RequestsApiData } from '../../interface/Request';

export async function createRequest(request: CreateRequest): Promise<RequestsApiData> {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  };
  return await fetch(`/requests/v2/`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
