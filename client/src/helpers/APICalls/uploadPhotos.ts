import { PhotoApiData, FetchOptions, DeletePhoto } from '../../interface/UploadPhoto';

export const updateProfilePhotos = async (inputs: FormData, id: string): Promise<PhotoApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'PATCH',
    body: inputs,
    credentils: 'include',
  };
  return await fetch(`/upload/photo/${id}`, fetchOptions)
    .then((res) => res.json())
    .catch((error) => ({ error }));
};

export const deleteProfilePhotos = async (inputs: DeletePhoto, id: string): Promise<PhotoApiData> => {
  const fetchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inputs),
    credentils: 'include',
  };
  return await fetch(`/upload/delete/${id}`, fetchOptions)
    .then((res) => res.json())
    .catch((error) => ({ error }));
};
