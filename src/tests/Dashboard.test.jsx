import { render, screen } from '@testing-library/react';
import Dashboard from '../pages/Dashboard';
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

describe('Dashboard Component', () => {
  it('renders Assistant tab by default', () => {
    render(<Dashboard userProfile={mockUserProfile} />);
    expect(screen.getByTestId('assistant-mock')).toBeInTheDocument();
  });

  it('renders Timeline tab when selected', () => {
    render(<Dashboard tab="timeline" userProfile={mockUserProfile} />);
    expect(screen.getByTestId('timeline-mock')).toBeInTheDocument();
  });

  it('renders Polling Map tab when selected', () => {
    render(<Dashboard tab="map" userProfile={mockUserProfile} />);
    expect(screen.getByTestId('map-mock')).toBeInTheDocument();
  });

  it('renders Find Booth tab when selected', () => {
    render(<Dashboard tab="booth" userProfile={mockUserProfile} />);
    expect(screen.getByTestId('booth-mock')).toBeInTheDocument();
  });
});

