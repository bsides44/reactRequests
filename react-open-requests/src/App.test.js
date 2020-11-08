import { render, screen } from '@testing-library/react';
import App from './App';

test('renders dashboard title', () => {
  render(<App />);
  const textElement = screen.getByText(/Hello Betty/i);
  expect(textElement).toBeInTheDocument();
});
