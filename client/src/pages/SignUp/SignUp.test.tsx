import { render } from '@testing-library/react';
import SignUp from './SignUp';
import { MemoryRouter } from 'react-router-dom';

describe('SignUp tests', () => {
  test('smoke test', () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>,
    );
  });

  test('snapshot test', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>,
    );
    expect(asFragment).toMatchSnapshot();
  });

  test('can input values and submit form', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>,
    );
    const account = getByText('Already have an account?');
    expect(account).toBeInTheDocument();
    const login = getByText('Login');
    expect(login).toBeInTheDocument();
    const title = getByText('Create an account');
    expect(title).toBeInTheDocument();
  });
});
