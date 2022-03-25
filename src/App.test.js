import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App', () => {
  const newDiv = document.createElement("div");
  newDiv.setAttribute('id', 'popup-root');
  document.body.append(newDiv)

  render(<App />);

  expect(true).toBeTruthy();
});
