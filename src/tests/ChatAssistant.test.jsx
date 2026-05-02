import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import ChatAssistant from '../components/ChatAssistant';
import { LanguageProvider } from '../contexts/LanguageContext';
import { ProfileProvider } from '../contexts/ProfileContext';

vi.mock('../utils/firebase', () => ({
  getChatHistory: vi.fn().mockResolvedValue(null),
  saveChatHistory: vi.fn(),
}));

vi.mock('../utils/chat', () => ({
  buildWelcomeMessage: vi.fn().mockReturnValue('Welcome message'),
  getAssistantReply: vi.fn(),
}));

describe('ChatAssistant accessibility', () => {
  it('renders accessible chat history and question input labels', async () => {
    render(
      <BrowserRouter>
        <ProfileProvider>
          <LanguageProvider>
            <ChatAssistant />
          </LanguageProvider>
        </ProfileProvider>
      </BrowserRouter>
    );

    expect(await screen.findByRole('log', { name: 'Assistant conversation history' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Ask the voter education assistant a question' })).toBeInTheDocument();
  });

  it('handles user input and submission', async () => {
    render(
      <BrowserRouter>
        <ProfileProvider>
          <LanguageProvider>
            <ChatAssistant />
          </LanguageProvider>
        </ProfileProvider>
      </BrowserRouter>
    );

    const input = screen.getByRole('textbox', { name: 'Ask the voter education assistant a question' });
    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    fireEvent.change(input, { target: { value: 'Hi' } });
    const sendBtn = screen.getByRole('button', { name: 'Send' });
    fireEvent.click(sendBtn);

    const quickPrompt = await screen.findByText(/What do I bring to vote/i);
    fireEvent.click(quickPrompt);
  });
});
