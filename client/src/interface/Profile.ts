export interface Profile {
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: Date | null;
  phoneNumber: string;
  address: string;
  description: string;
}

export interface ProfileApiDataSuccess {
  updatedProfile: Profile;
}

export interface ProfileApiData {
  error?: string;
  success?: ProfileApiDataSuccess;
}
