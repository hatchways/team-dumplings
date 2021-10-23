export interface Profile {
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: Date | null;
  phoneNumber: string;
  address: string;
  description: string;
  _id?: string;
}

export interface ProfileApiDataSuccess {
  profile: Profile;
}

export interface ProfileApiData {
  error?: string;
  success?: ProfileApiDataSuccess;
}
