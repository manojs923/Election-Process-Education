import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatAssistant from '../components/ChatAssistant';
import Timeline from '../components/Timeline';
import PollingBoothMap from '../components/PollingBoothMap';
import FindBooth from '../components/FindBooth';
import { useProfile } from '../contexts/ProfileContext';

const PROFILE_CONTENT = {
  'first-time': {
    bannerColor: '#138808',
    bannerLabel: '🌱 Beginner\'s Guide',
    cards: [
      {
        title: '📋 Check Electoral Roll',
        description: 'Verify your name at voters.eci.gov.in',
      },
      {
        title: '🪪 Carry Valid ID',
        description: 'Voter ID or Aadhaar card required',
      },
      {
        title: '🗺️ Find Your Booth',
        description: 'Locate your assigned polling booth',
      },
    ],
  },
  experienced: {
    bannerColor: '#0D1B3E',
    bannerLabel: '⭐ Quick Reference Mode',
    cards: [
      {
        title: '🆕 What Changed',
        description: 'M3 EVMs and updated ID rules in 2024',
      },
      {
        title: '🔗 Aadhaar Linking',
        description: 'Link Aadhaar to Voter ID if not done',
      },
      {
        title: '📍 Verify Booth',
        description: 'Your booth may have changed - recheck',
      },
    ],
  },
  senior: {
    bannerColor: '#FF9933',
    bannerLabel: '🏅 Senior Citizen Priority Guide',
    cards: [
      {
        title: '⚡ Priority Queue',
        description: 'You get priority entry - no long wait',
      },
      {
        title: '🏠 Vote From Home',
        description: 'Above 85? Apply via Form 12D',
      },
      {
        title: '👨‍👩‍👧 Bring a Companion',
        description: 'Family member can accompany you',
      },
    ],
  },
  accessible: {
    bannerColor: '#1e40af',
    bannerLabel: '♿ Accessibility Services Guide',
    cards: [
      {
        title: '♿ Wheelchair Ramp',
        description: 'All booths have ramps by ECI mandate',
      },
      {
        title: '⌨️ Braille EVM',
        description: 'Braille labels on every EVM button',
      },
      {
        title: '🤝 Companion Voting',
        description: 'Someone can assist you inside booth',
      },
    ],
  },
};

const STATS = [
  { value: '7AM - 6PM', label: 'Voting Hours' },
  { value: '18+', label: 'Eligible Age' },
  { value: '1 Vote', label: 'Per Citizen' },
];

function DashboardHome({ voterType, onStartLearning, onChangeProfile }) {
  const profile = PROFILE_CONTENT[voterType] || PROFILE_CONTENT['first-time'];

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <div className="flex items-start justify-end">
        <button
          type="button"
          onClick={onChangeProfile}
          className="rounded-full border border-navy/15 bg-white px-4 py-2 text-sm font-bold text-navy shadow-sm transition hover:-translate-y-0.5"
        >
          ← Change Profile
        </button>
      </div>

      <div
        className="rounded-xl px-6 py-5 text-white shadow-sm"
        style={{ backgroundColor: profile.bannerColor }}
      >
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-white/80">
          Profile Banner
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold leading-tight md:text-4xl">
          {profile.bannerLabel}
        </h1>
      </div>

      <section className="rounded-xl border border-navy/10 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-saffron">
              What To Do Today
            </p>
            <h2 className="mt-2 text-2xl font-bold text-navy">Your Next 3 Steps</h2>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {profile.cards.map((card) => (
            <article
              key={card.title}
              className="rounded-xl border border-navy/10 bg-white p-5 shadow-sm transition-transform hover:-translate-y-0.5"
            >
              <h3 className="text-lg font-bold text-navy">{card.title}</h3>
              <p className="mt-3 text-sm font-medium leading-6 text-navy/65">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-navy/10 bg-white p-6 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-saffron">
          Quick Stats
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl bg-offwhite px-5 py-4 shadow-sm ring-1 ring-navy/5"
            >
              <div className="text-2xl font-bold text-navy">{stat.value}</div>
              <div className="mt-1 text-sm font-semibold uppercase tracking-wider text-navy/55">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <button
        type="button"
        onClick={onStartLearning}
        className="w-full rounded-xl bg-saffron px-6 py-4 text-center text-base font-bold text-white shadow-md transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2"
      >
        Go to AI Assistant →
      </button>
    </section>
  );
}

export default function Dashboard({ tab = 'dashboard', userProfile }) {
  const { voterProfile } = useProfile();
  const navigate = useNavigate();

  const activeProfile = userProfile?.voterType ? userProfile : voterProfile;
  const voterType = useMemo(() => {
    return activeProfile?.voterType || 'first-time';
  }, [activeProfile]);

  if (tab === 'assistant') {
    return (
      <div className="mx-auto w-full max-w-6xl">
        <ChatAssistant isFullScreen={true} />
      </div>
    );
  }

  if (tab === 'timeline') {
    return (
      <div className="mx-auto w-full max-w-6xl">
        <Timeline />
      </div>
    );
  }

  if (tab === 'map') {
    return (
      <div className="mx-auto w-full max-w-6xl">
        <PollingBoothMap />
      </div>
    );
  }

  if (tab === 'booth') {
    return (
      <div className="mx-auto w-full max-w-6xl">
        <FindBooth />
      </div>
    );
  }

  return (
    <DashboardHome
      voterType={voterType}
      onStartLearning={() => navigate('/assistant')}
      onChangeProfile={() => navigate('/')}
    />
  );
}
