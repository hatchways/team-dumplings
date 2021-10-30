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

export const createProfile = async (inputs: Profile): Promise<ProfileApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inputs),
    credentials: 'include',
  };
  return await fetch(`/profile/`, fetchOptions)
    .then((res) => res.json())
    .catch((error) => ({ error }));
};

export const getProfile = async (id: string): Promise<ProfileApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/profile/${id}`, fetchOptions)
    .then((res) => res.json())
    .catch((error) => ({ error }));
};
