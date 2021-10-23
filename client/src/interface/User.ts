type role = 'owner' | 'sitter';

export interface User {
  email: string;
  username: string;
  role: role;
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}
