import { render, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from './LoginForm';

const props = { handleSubmit: jest.fn() };

describe('LoginForm tests', () => {
  test('smoke test', () => {
    render(<LoginForm {...props} />);
  });

  test('snapshot test', () => {
    const { asFragment } = render(<LoginForm {...props} />);
    expect(asFragment).toMatchSnapshot();
  });

  test('can input values and submit form', async () => {
    const { getByLabelText, getByText } = render(<LoginForm {...props} />);
    const email = getByLabelText('E-mail address');
    expect(email).toBeInTheDocument();
    const password = getByLabelText('Password');
    expect(password).toBeInTheDocument();
    const login = getByText('Login');
    expect(login).toBeInTheDocument();

    fireEvent.change(email, { target: { value: 'testUser@gmail.com' } });
    fireEvent.change(password, { target: { value: 'password123' } });

    fireEvent.click(login);

    await waitFor(() => {
      expect(props.handleSubmit).toBeCalledWith(
        {
          email: 'testUser@gmail.com',
          password: 'password123',
        },
        expect.anything(),
      );
    });
  });
});
