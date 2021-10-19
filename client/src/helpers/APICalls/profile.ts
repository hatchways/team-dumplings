import { Profile, ProfileApiData } from '../../interface/Profile';
import { FetchOptions } from '../../interface/FetchOptions';

export const editProfile = async (inputs: Profile, id: string): Promise<ProfileApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inputs),
    credentials: 'include',
  };
  return await fetch(`/profile/${id}`, fetchOptions)
    .then((res) => res.json())
    .catch((error) => ({ error }));
};
