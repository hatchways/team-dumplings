export interface File {
  data: string;
}

export interface PhotoApiData {
  error?: string;
  success?: File;
}

export interface FetchOptions {
  method: string;
  body: FormData;
  credentils: string;
}

export interface DeletePhoto {
  photoName: string;
}
