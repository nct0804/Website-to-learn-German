import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import App from './App';
import '@testing-library/jest-dom';

test('renders without crashing', () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  );
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
}); 