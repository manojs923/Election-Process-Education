import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import { useEffect } from 'react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('../components/Timeline', () => ({
  default: () => <div data-testid="timeline-mock">Timeline</div>
}));
vi.mock('../components/PollingBoothMap', () => ({
  default: () => <div data-testid="map-mock">PollingBoothMap</div>
}));
vi.mock('../components/FindBooth', () => ({
  default: () => <div data-testid="booth-mock">FindBooth</div>
}));
vi.mock('../components/ChatAssistant', () => ({
  default: () => <div data-testid="assistant-mock">ChatAssistant</div>
}));

const mockUserProfile = {
  voterType: 'First-Time Voter',
  language: 'English',
};

import { ProfileProvider } from '../contexts/ProfileContext';

import { LanguageProvider, useLanguage } from '../contexts/LanguageContext';

function LanguageSetter({ language }) {
  const { setLanguage } = useLanguage();

  useEffect(() => {
    setLanguage(language);
  }, [language, setLanguage]);

  return null;
}

describe('Dashboard Component', () => {
  const renderWithProviders = (ui, language = 'English') => {
    return render(
      <BrowserRouter>
        <LanguageProvider>
          <LanguageSetter language={language} />
          <ProfileProvider>{ui}</ProfileProvider>
        </LanguageProvider>
      </BrowserRouter>
    );
  };

  it('renders DashboardHome by default', () => {
    renderWithProviders(<Dashboard userProfile={mockUserProfile} />);
    expect(screen.getByText(/What To Do Today/i)).toBeInTheDocument();
  });

  it('renders Assistant tab when selected', async () => {
    renderWithProviders(<Dashboard tab="assistant" userProfile={mockUserProfile} />);
    expect(await screen.findByTestId('assistant-mock')).toBeInTheDocument();
  });

  it('renders Timeline tab when selected', async () => {
    renderWithProviders(<Dashboard tab="timeline" userProfile={mockUserProfile} />);
    expect(await screen.findByTestId('timeline-mock')).toBeInTheDocument();
  });

  it('renders Polling Map tab when selected', async () => {
    renderWithProviders(<Dashboard tab="map" userProfile={mockUserProfile} />);
    expect(await screen.findByTestId('map-mock')).toBeInTheDocument();
  });

  it('renders Find Booth tab when selected', async () => {
    renderWithProviders(<Dashboard tab="booth" userProfile={mockUserProfile} />);
    expect(await screen.findByTestId('booth-mock')).toBeInTheDocument();
  });

  it('renders translated dashboard content for the selected language', () => {
    renderWithProviders(<Dashboard userProfile={mockUserProfile} />, 'Bengali');
    expect(screen.getByText('আজ কী করবেন')).toBeInTheDocument();
    expect(screen.getByText('ভোটার তালিকা দেখুন')).toBeInTheDocument();
    expect(screen.getByText('সকাল ৭টা - সন্ধ্যা ৬টা')).toBeInTheDocument();
  });

  it('triggers navigation on button clicks', () => {
    renderWithProviders(<Dashboard userProfile={mockUserProfile} />);
    const changeProfileBtn = screen.getByRole('button', { name: /Change Profile/i });
    const startLearningBtn = screen.getByRole('button', { name: /Go to AI Assistant/i });
    fireEvent.click(changeProfileBtn);
    fireEvent.click(startLearningBtn);
  });
});
