export interface Profile {
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: Date | null;
  phoneNumber: string;
  address: string;
  description: string;
  _id?: string;
  availability?: any;
  rate?: number;
  customerId?: string;
}

export interface ProfileApiDataSuccess {
  profile?: Profile;
  profiles?: Profile[];
}

export interface ProfileApiData {
  error?: string;
  success?: ProfileApiDataSuccess;
}
