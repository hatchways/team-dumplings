import { Profile } from './Profile';

type role = 'owner' | 'sitter';

export interface User {
  id: string;
  email: string;
  username: string;
  role: role;
  profile: string;
}

export interface UserFromSearch {
  email: string;
  username: string;
  role: role;
  profile: Profile;
}

export interface SearchUsersApiData {
  users?: UserFromSearch[];
  error?: { message: string };
}
