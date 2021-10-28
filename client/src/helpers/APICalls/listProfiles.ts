import { FetchOptions } from '../../interface/FetchOptions';
import { ProfileApiData } from '../../interface/Profile';

export async function listProfiles(
  filter: boolean,
  dateIn: number,
  dateOff: number,
  search: string,
): Promise<ProfileApiData> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/profile?filter=${filter}&dateIn=${dateIn}&dateOff=${dateOff}&search=${search}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
