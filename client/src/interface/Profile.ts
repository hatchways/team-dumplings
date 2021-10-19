export interface Profile {
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: Date | null;
  phone: string;
  address: string;
  desc: string;
}

export interface ProfileApiDataSuccess {
  updatedProfile: Profile;
}

export interface ProfileApiData {
  error?: { error: string };
  success?: ProfileApiDataSuccess;
}
