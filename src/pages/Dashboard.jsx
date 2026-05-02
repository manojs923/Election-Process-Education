import { Suspense, lazy, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../contexts/ProfileContext';
import { useLanguage } from '../contexts/LanguageContext';

const ChatAssistant = lazy(() => import('../components/ChatAssistant'));
const Timeline = lazy(() => import('../components/Timeline'));
const PollingBoothMap = lazy(() => import('../components/PollingBoothMap'));
const FindBooth = lazy(() => import('../components/FindBooth'));

const PROFILE_CONTENT = {
  'first-time': {
    bannerColor: '#138808',
    bannerKey: 'bannerBeginner',
    cards: [
      {
        titleKey: 'dashboardFirstTimeCard1Title',
        descriptionKey: 'dashboardFirstTimeCard1Description',
      },
      {
        titleKey: 'dashboardFirstTimeCard2Title',
        descriptionKey: 'dashboardFirstTimeCard2Description',
      },
      {
        titleKey: 'dashboardFirstTimeCard3Title',
        descriptionKey: 'dashboardFirstTimeCard3Description',
      },
    ],
  },
  experienced: {
    bannerColor: '#0D1B3E',
    bannerKey: 'bannerExperienced',
    cards: [
      {
        titleKey: 'dashboardExperiencedCard1Title',
        descriptionKey: 'dashboardExperiencedCard1Description',
      },
      {
        titleKey: 'dashboardExperiencedCard2Title',
        descriptionKey: 'dashboardExperiencedCard2Description',
      },
      {
        titleKey: 'dashboardExperiencedCard3Title',
        descriptionKey: 'dashboardExperiencedCard3Description',
      },
    ],
  },
  senior: {
    bannerColor: '#FF9933',
    bannerKey: 'bannerSenior',
    cards: [
      {
        titleKey: 'dashboardSeniorCard1Title',
        descriptionKey: 'dashboardSeniorCard1Description',
      },
      {
        titleKey: 'dashboardSeniorCard2Title',
        descriptionKey: 'dashboardSeniorCard2Description',
      },
      {
        titleKey: 'dashboardSeniorCard3Title',
        descriptionKey: 'dashboardSeniorCard3Description',
      },
    ],
  },
  accessible: {
    bannerColor: '#1e40af',
    bannerKey: 'bannerAccessible',
    cards: [
      {
        titleKey: 'dashboardAccessibleCard1Title',
        descriptionKey: 'dashboardAccessibleCard1Description',
      },
      {
        titleKey: 'dashboardAccessibleCard2Title',
        descriptionKey: 'dashboardAccessibleCard2Description',
      },
      {
        titleKey: 'dashboardAccessibleCard3Title',
        descriptionKey: 'dashboardAccessibleCard3Description',
      },
    ],
  },
};

const STATS = [
  { valueKey: 'statVotingHoursValue', labelKey: 'statVotingHoursLabel' },
  { valueKey: 'statEligibleAgeValue', labelKey: 'statEligibleAgeLabel' },
  { valueKey: 'statPerCitizenValue', labelKey: 'statPerCitizenLabel' },
];

function DashboardTabFallback() {
  return <div className="py-12 text-center text-sm font-medium text-navy/60">Loading...</div>;
}

function DashboardHome({ voterType, onStartLearning, onChangeProfile }) {
  const profile = PROFILE_CONTENT[voterType] || PROFILE_CONTENT['first-time'];
  const { t } = useLanguage();

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <div className="flex items-start justify-end">
        <button
          type="button"
          onClick={onChangeProfile}
          className="rounded-full border border-navy/15 bg-white px-4 py-2 text-sm font-bold text-navy shadow-sm transition hover:-translate-y-0.5"
        >
          ← {t('changeProfile')}
        </button>
      </div>

      <div
        className="rounded-xl px-6 py-5 text-white shadow-sm"
        style={{ backgroundColor: profile.bannerColor }}
      >
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-white/80">
          {t('profileBannerSub')}
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold leading-tight md:text-4xl">
          {t(profile.bannerKey)}
        </h1>
      </div>

      <section className="rounded-xl border border-navy/10 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-saffron">
              {t('whatToDoToday')}
            </p>
            <h2 className="mt-2 text-2xl font-bold text-navy">{t('yourNextSteps')}</h2>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {profile.cards.map((card) => (
            <article
              key={card.titleKey}
              className="rounded-xl border border-navy/10 bg-white p-5 shadow-sm transition-transform hover:-translate-y-0.5"
            >
              <h3 className="text-lg font-bold text-navy">{t(card.titleKey)}</h3>
              <p className="mt-3 text-sm font-medium leading-6 text-navy/65">
                {t(card.descriptionKey)}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-navy/10 bg-white p-6 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-saffron">
          {t('quickStats')}
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {STATS.map((stat) => (
            <div
              key={stat.labelKey}
              className="rounded-xl bg-offwhite px-5 py-4 shadow-sm ring-1 ring-navy/5"
            >
              <div className="text-2xl font-bold text-navy">{t(stat.valueKey)}</div>
              <div className="mt-1 text-sm font-semibold uppercase tracking-wider text-navy/55">
                {t(stat.labelKey)}
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
        {t('goToAiAssistant')} →
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
      <Suspense fallback={<DashboardTabFallback />}>
        <div className="mx-auto w-full max-w-6xl">
          <ChatAssistant isFullScreen={true} />
        </div>
      </Suspense>
    );
  }

  if (tab === 'timeline') {
    return (
      <Suspense fallback={<DashboardTabFallback />}>
        <div className="mx-auto w-full max-w-6xl">
          <Timeline />
        </div>
      </Suspense>
    );
  }

  if (tab === 'map') {
    return (
      <Suspense fallback={<DashboardTabFallback />}>
        <div className="mx-auto w-full max-w-6xl">
          <PollingBoothMap />
        </div>
      </Suspense>
    );
  }

  if (tab === 'booth') {
    return (
      <Suspense fallback={<DashboardTabFallback />}>
        <div className="mx-auto w-full max-w-6xl">
          <FindBooth />
        </div>
      </Suspense>
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
