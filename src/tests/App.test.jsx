import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { describe, it, expect, vi } from 'vitest';
import { LanguageProvider } from '../contexts/LanguageContext';
import { ProfileProvider } from '../contexts/ProfileContext';

vi.mock('../utils/demoState', () => ({
  useDemoState: () => [{ phase: 'Pre-Match', isEmergency: false }, vi.fn()],
  getDemoState: vi.fn(),
  demoStateSubscribers: new Set(),
  notifySubscribers: vi.fn(),
  updateDemoState: vi.fn(),
}));

describe('App Component', () => {
  it('renders the header correctly', () => {
    render(
      <ProfileProvider>
        <LanguageProvider>
          <MemoryRouter>
            <App />
          </MemoryRouter>
        </LanguageProvider>
      </ProfileProvider>
    );
    expect(screen.getByText('Voter Education AI')).toBeInTheDocument();
  });

  it('renders the main navigation links', () => {
    render(
      <ProfileProvider>
        <LanguageProvider>
          <MemoryRouter>
            <App />
          </MemoryRouter>
        </LanguageProvider>
      </ProfileProvider>
    );
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('AI Assistant')).toBeInTheDocument();
    expect(screen.getByText('Timeline')).toBeInTheDocument();
  });

  it('exposes accessible labels for navigation and language selection', () => {
    render(
      <ProfileProvider>
        <LanguageProvider>
          <MemoryRouter>
            <App />
          </MemoryRouter>
        </LanguageProvider>
      </ProfileProvider>
    );

    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'Select language' })).toBeInTheDocument();
  });

  it('updates language selection', () => {
    render(
      <ProfileProvider>
        <LanguageProvider>
          <MemoryRouter>
            <App />
          </MemoryRouter>
        </LanguageProvider>
      </ProfileProvider>
    );

    const select = screen.getByRole('combobox', { name: 'Select language' });
    fireEvent.change(select, { target: { value: 'Hindi' } });
    expect(select.value).toBe('Hindi');
  });
});
