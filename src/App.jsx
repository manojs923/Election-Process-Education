import { Suspense, lazy, useEffect, useState } from 'react';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { useLanguage } from './contexts/LanguageContext';
import { useProfile } from './contexts/ProfileContext';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Entry = lazy(() => import('./pages/Entry'));

const navItems = [
  { to: '/dashboard', labelKey: 'dashboard' },
  { to: '/assistant', labelKey: 'assistant' },
  { to: '/timeline', labelKey: 'timeline' },
  { to: '/map', labelKey: 'pollingMap' },
  { to: '/find-booth', labelKey: 'findBooth' },
];

function loadProfile() {
  if (typeof window === 'undefined') return null;
  try {
    const saved = window.localStorage.getItem('voter-profile');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function getVoterTypeKey(profile) {
  if (profile?.voterTypeKey) return profile.voterTypeKey;
  if (profile?.voterType === 'experienced') return 'experiencedVoter';
  if (profile?.voterType === 'senior') return 'seniorCitizen';
  if (profile?.voterType === 'accessible') return 'accessibilitySupport';
  if (profile?.voterType === 'first-time') return 'firstTimeVoter';
  if (profile?.voterType === 'Experienced Voter') return 'experiencedVoter';
  if (profile?.voterType === 'Senior Citizen') return 'seniorCitizen';
  if (profile?.voterType === 'Needs Accessibility Support') return 'accessibilitySupport';
  return 'firstTimeVoter';
}

export default function App() {
  const [userProfile, setUserProfile] = useState(loadProfile);
  const { language, setLanguage, t } = useLanguage();
  const { voterProfile, setVoterProfile } = useProfile();

  const updateLanguage = (nextLanguage) => {
    setLanguage(nextLanguage);
    setUserProfile((profile) => (profile ? { ...profile, language: nextLanguage } : profile));
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (userProfile) {
      window.localStorage.setItem('voter-profile', JSON.stringify(userProfile));
      return;
    }
    window.localStorage.removeItem('voter-profile');
  }, [userProfile]);

  useEffect(() => {
    if (userProfile?.language && userProfile.language !== language) {
      setLanguage(userProfile.language);
    }
  }, [language, setLanguage, userProfile?.language]);

  useEffect(() => {
    if (!userProfile) return;

    if (
      voterProfile?.voterType !== userProfile.voterType ||
      voterProfile?.language !== userProfile.language
    ) {
      setVoterProfile({
        voterType: userProfile.voterType || null,
        language: userProfile.language || 'English',
      });
    }
  }, [setVoterProfile, userProfile, voterProfile?.language, voterProfile?.voterType]);

  return (
    <div className="min-h-screen bg-offwhite text-navy font-body">
      {/* 4px Tricolor Top Bar */}
      <div className="h-1 w-full tricolor-gradient"></div>

      <header className="sticky top-0 z-30 border-b border-navy/10 bg-white/90 backdrop-blur-xl shadow-sm">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
          <div className="min-w-0">
            <p className="section-label text-xs font-bold uppercase text-saffron tracking-widest">
              {t('electionProcessGuide')}
            </p>
            <p className="font-display text-3xl font-bold leading-none text-navy md:text-4xl">
              {t('appTitle')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {userProfile ? (
              <div className="hidden rounded-full border border-indiaGreen/20 bg-indiaGreen/10 px-4 py-2 text-sm font-bold text-indiaGreen md:block shadow-sm">
                {t(getVoterTypeKey(userProfile))}
              </div>
            ) : null}

            <label htmlFor="language-select" className="sr-only">
              {t('languageSelector')}
            </label>
            <select
              id="language-select"
              aria-label={t('languageSelector')}
              value={language}
              onChange={(e) => updateLanguage(e.target.value)}
              className="rounded-full border border-navy/20 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-navy transition hover:border-navy/40 outline-none cursor-pointer"
            >
              <option value="English">English</option>
              <option value="Hindi">हिन्दी</option>
              <option value="Tamil">தமிழ்</option>
              <option value="Telugu">తెలుగు</option>
              <option value="Bengali">বাংলা</option>
              <option value="Kannada">ಕನ್ನಡ</option>
            </select>
          </div>
        </div>

        <div className="mx-auto w-full max-w-7xl px-4 pb-4 md:px-6">
          <nav aria-label={t('primaryNavigation')} className="flex flex-wrap gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-center text-xs font-bold uppercase tracking-widest transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron border ${
                    isActive
                      ? 'bg-navy text-white border-navy shadow-md'
                      : 'bg-white text-navy border-navy/10 hover:border-navy/30'
                  }`
                }
              >
                {t(item.labelKey)}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 pb-28 pt-8 md:px-6 md:pb-14">
        <Suspense fallback={<div className="py-12 text-center text-sm font-medium text-navy/60">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Entry userProfile={userProfile} onStart={setUserProfile} />} />
            <Route path="/entry" element={<Navigate to="/" replace />} />
            <Route
              path="/dashboard"
              element={
                userProfile ? (
                  <Dashboard userProfile={userProfile} />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route path="/assistant" element={userProfile ? <Dashboard tab="assistant" userProfile={userProfile} /> : <Navigate to="/" replace />} />
            <Route path="/timeline" element={userProfile ? <Dashboard tab="timeline" userProfile={userProfile} /> : <Navigate to="/" replace />} />
            <Route path="/map" element={userProfile ? <Dashboard tab="map" userProfile={userProfile} /> : <Navigate to="/" replace />} />
            <Route path="/find-booth" element={userProfile ? <Dashboard tab="booth" userProfile={userProfile} /> : <Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

