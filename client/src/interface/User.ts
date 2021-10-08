export interface User {
  email: string;
  username: string;
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}
