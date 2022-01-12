import { User } from '../interface/User';

const mockLoggedInUser: User = {
  id: '6166381aee7c3c0f101bde10',
  email: 'mockLoggedInUser@gmail.com',
  username: 'mock LoggedIn user',
  role: 'owner',
  profile: '51651651666661',
};

const mockOtherUser1: User = {
  id: '6166381aee7c3c0f101bde11',
  username: 'Mock test user 1',
  email: 'mockTestUser1@gmail.com',
  role: 'sitter',
  profile: '51651651666662',
};
const mockOtherUser2: User = {
  id: '6166381aee7c3c0f101bde12',
  username: 'Mock test user 2',
  email: 'mockTestUser2@gmail.com',
  role: 'owner',
  profile: '51651651666663',
};
const mockOtherUser3: User = {
  id: '6166381aee7c3c0f101bde13',
  username: 'Mock test user 3',
  email: 'mockTestUser3@gmail.com',
  role: 'sitter',
  profile: '51651651666664',
};

const mockOtherUsers: User[] = [mockOtherUser1, mockOtherUser2, mockOtherUser3];

export { mockLoggedInUser, mockOtherUsers };
