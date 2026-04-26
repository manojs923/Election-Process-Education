import { renderHook, act } from '@testing-library/react';
import { ProfileProvider, useProfile } from '../contexts/ProfileContext';
import { describe, it, expect } from 'vitest';

describe('ProfileContext', () => {
  it('provides default profile and allows updating', () => {
    const wrapper = ({ children }) => <ProfileProvider>{children}</ProfileProvider>;
    const { result } = renderHook(() => useProfile(), { wrapper });

    expect(result.current.voterProfile.language).toBe('English');
    expect(result.current.voterProfile.voterType).toBeNull();

    act(() => {
      result.current.setVoterProfile({ voterType: 'senior', language: 'Hindi' });
    });

    expect(result.current.voterProfile.language).toBe('Hindi');
    expect(result.current.voterProfile.voterType).toBe('senior');
  });
});
