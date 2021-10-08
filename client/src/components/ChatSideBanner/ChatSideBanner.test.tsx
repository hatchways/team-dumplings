import { render } from '@testing-library/react';
import ChatSideBanner from './ChatSideBanner';
import { mockLoggedInUser } from '../../mocks/mockUser';

describe('ChatSideBanner tests', () => {
  test('smoke test', () => {
    render(<ChatSideBanner loggedInUser={mockLoggedInUser} />);
  });

  test('loading snapshot test', () => {
    const { asFragment } = render(<ChatSideBanner loggedInUser={mockLoggedInUser} />);
    expect(asFragment).toMatchSnapshot();
  });
});
