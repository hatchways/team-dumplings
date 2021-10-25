import { FetchOptions } from '../../interface/FetchOptions';
import { Request, RequestsApiData } from '../../interface/Request';

export async function updateRequest(request: Request): Promise<RequestsApiData> {
  const fetchOptions: FetchOptions = {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sitterId: request.sitterId,
      dogId: request.dogId,
      start: request.start,
      end: request.end,
      status: request.status,
    }),
  };
  return await fetch(`/requests/${request._id}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
