export interface Profile {
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: Date | null;
  phoneNumber: string;
  address: string;
  description: string;
  _id?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  availability?: any;
  rate?: number;
  customerId?: string;
  ratingsByValue?: { 1: number; 2: number; 3: number; 4: number; 5: number };
  sumRating?: number;
  total?: number;
}

export interface ProfileApiDataSuccess {
  profile?: Profile;
  profiles?: Profile[];
}

export interface ProfileApiData {
  error?: string;
  success?: ProfileApiDataSuccess;
}
