import { render } from '@testing-library/react';
import Search from './Search';

const props = { search: 'searching', handleChange: jest.fn() };

describe('Search tests', () => {
  test('smoke test', () => {
    render(<Search {...props} />);
  });

  test('loading snapshot test', () => {
    const { asFragment } = render(<Search {...props} />);
    expect(asFragment).toMatchSnapshot();
  });
});
