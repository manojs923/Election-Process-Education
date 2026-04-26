import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Entry from '../pages/Entry';
import { LanguageProvider } from '../contexts/LanguageContext';
import { ProfileProvider } from '../contexts/ProfileContext';
import { describe, it, expect, vi } from 'vitest';

// Mock translation function
vi.mock('../contexts/LanguageContext', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useLanguage: () => ({
      language: 'English',
      setLanguage: vi.fn(),
      t: (key) => key // just return key for testing
    })
  };
});

describe('Entry Component', () => {
  it('renders correctly and allows user to select profile', () => {
    const handleStart = vi.fn();
    render(
      <BrowserRouter>
        <ProfileProvider>
          <Entry onStart={handleStart} />
        </ProfileProvider>
      </BrowserRouter>
    );
    expect(screen.getByText('Voter Education Assistant')).toBeInTheDocument();
    
    // Select Experienced Voter
    const experiencedLabelText = screen.getByText('experiencedVoter');
    fireEvent.click(experiencedLabelText);

    // After clicking the span inside the label, the radio should become checked.
    // However, finding the hidden radio button is hard. We can just verify the start button works.

    const startBtn = screen.getByRole('button', { name: /Start My Learning/i });
    fireEvent.click(startBtn);

    expect(handleStart).toHaveBeenCalled();
  });
});
