import { User } from '../interface/User';

const mockLoggedInUser: User = {
  email: 'mockLoggedInUser@gmail.com',
  username: 'mock LoggedIn user',
  role: 'owner',
};

const mockOtherUser1: User = {
  username: 'Mock test user 1',
  email: 'mockTestUser1@gmail.com',
  role: 'sitter',
};
const mockOtherUser2: User = {
  username: 'Mock test user 2',
  email: 'mockTestUser2@gmail.com',
  role: 'owner',
};
const mockOtherUser3: User = {
  username: 'Mock test user 3',
  email: 'mockTestUser3@gmail.com',
  role: 'sitter',
};

const mockOtherUsers: User[] = [mockOtherUser1, mockOtherUser2, mockOtherUser3];

export { mockLoggedInUser, mockOtherUsers };
