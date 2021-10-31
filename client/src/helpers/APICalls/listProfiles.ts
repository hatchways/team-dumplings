import { FetchOptions } from '../../interface/FetchOptions';
import { ProfileApiData } from '../../interface/Profile';

interface Props {
  filter: boolean;
  dateIn: number;
  dateOff: number;
  searchString: string;
}

export async function listProfiles({ filter, dateIn, dateOff, searchString }: Props): Promise<ProfileApiData> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(
    `/profile?filter=${filter}&dateIn=${dateIn}&dateOff=${dateOff}&search=${searchString}`,
    fetchOptions,
  )
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
