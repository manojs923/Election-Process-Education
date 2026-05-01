import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import { describe, it, expect } from 'vitest';

describe('Home Component', () => {
  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByText(/Know Your Vote/i)).toBeInTheDocument();
  });
});
