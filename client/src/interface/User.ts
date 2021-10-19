export interface User {
  email: string;
  username: string;
  profile: string;
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}
