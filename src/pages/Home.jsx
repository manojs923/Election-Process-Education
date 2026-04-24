import { Link } from 'react-router-dom';
import { CheckCircle, BookOpen, Map, Clock, MessageCircle } from 'lucide-react';

const featureCards = [
  {
    icon: '🗳️',
    title: 'AI Voter Expert',
    detail: 'Get instant, non-partisan answers about ID requirements, EVM usage, VVPAT, and your electoral rights.',
  },
  {
    icon: '🗺️',
    title: 'Polling Booth Map',
    detail: 'Walk through the entire booth experience step-by-step with an interactive animated guide.',
  },
  {
    icon: '📅',
    title: 'Election Timeline',
    detail: 'Understand the complete election schedule from announcement to result declaration.',
  },
  {
    icon: '📍',
    title: 'Find My Booth',
    detail: 'Locate your nearest polling booth, check live queue times, and get directions.',
  },
];

const languages = ['हिन्दी', 'English', 'தமிழ்', 'తెలుగు', 'বাংলা', 'ಕನ್ನಡ'];

export default function Home({ userProfile }) {
  return (
    <div className="space-y-8 pb-6 pt-2">

      {/* Hero Section */}
      <section className="rounded-[2rem] bg-navy p-8 md:p-12 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #FF9933 0%, transparent 60%)' }} />
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-saffron/30 bg-saffron/10 px-4 py-2 mb-6">
              <span className="h-2 w-2 rounded-full bg-saffron animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-saffron">100% Non-Partisan</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-bold leading-tight text-white">
              Know Your Vote. <br />
              <span className="text-saffron">Exercise Your Right.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70 font-medium">
              India's AI-powered Voter Education Assistant. Learn the complete election process, 
              find your booth, and get instant answers — in your language.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/entry"
                className="rounded-xl bg-saffron px-7 py-4 text-center text-sm font-bold uppercase tracking-widest text-white transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
              >
                {userProfile ? 'Update My Profile' : 'Get Started'}
              </Link>
              {userProfile && (
                <Link
                  to="/assistant"
                  className="rounded-xl border border-white/20 bg-white/10 px-7 py-4 text-center text-sm font-bold uppercase tracking-widest text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
                >
                  Resume Assistant
                </Link>
              )}
            </div>
          </div>

          <div className="grid gap-3">
            <div className="rounded-2xl bg-white/10 border border-white/10 p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-saffron mb-3">Multilingual Support</p>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <span key={lang} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-bold text-white">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-indiaGreen/20 border border-indiaGreen/30 p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-indiaGreen mb-2">Powered By</p>
              <p className="text-xl font-bold text-white">Gemini 2.0 Flash</p>
              <p className="text-sm text-white/60 mt-1">For accurate, context-aware election guidance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tricolor divider */}
      <div className="h-1 w-full tricolor-gradient rounded-full" />

      {/* Features */}
      <section>
        <p className="text-xs font-bold uppercase tracking-widest text-saffron mb-2">What You Can Do</p>
        <h2 className="font-display text-3xl font-bold text-navy mb-6">Everything You Need to Vote Confidently</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {featureCards.map((card) => (
            <article
              key={card.title}
              className="glass-card rounded-[1.75rem] border-navy/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-lg font-bold text-navy">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy/60 font-medium">{card.detail}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Why It Matters */}
      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-[2rem] bg-saffron/5 border border-saffron/20 p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-saffron mb-4">Our Commitment</p>
          <h2 className="font-display text-3xl font-bold text-navy">Built for Every Indian Voter</h2>
          <p className="mt-4 text-base leading-relaxed text-navy/70 font-medium">
            Whether you're voting for the first time or need a refresher on the process, 
            this assistant provides accurate, unbiased information about your electoral rights 
            — in the language you're most comfortable with.
          </p>
          <div className="mt-6 space-y-3">
            {[
              'No political party promotions',
              'Official ECI guidelines only',
              'Available in 6 regional languages',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-indiaGreen flex-shrink-0" />
                <span className="text-sm font-medium text-navy">{item}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[2rem] bg-navy p-8 text-white">
          <p className="text-xs font-bold uppercase tracking-widest text-saffron mb-4">Quick Start Guide</p>
          <div className="space-y-5">
            {[
              { num: '01', title: 'Select Your Profile', desc: 'Tell us if you\'re a first-time voter, experienced voter, or need accessibility support.' },
              { num: '02', title: 'Choose Your Language', desc: 'Get all information in English, Hindi, Tamil, Telugu, Bengali, or Kannada.' },
              { num: '03', title: 'Ask & Explore', desc: 'Chat with the AI, view the booth map, timeline, and find your polling station.' },
            ].map((step) => (
              <div key={step.num} className="flex gap-4">
                <span className="font-display text-3xl font-bold text-saffron/40 leading-none">{step.num}</span>
                <div>
                  <h3 className="font-bold text-white">{step.title}</h3>
                  <p className="text-sm text-white/60 mt-1">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <Link
            to="/entry"
            className="mt-8 block rounded-xl bg-saffron px-6 py-4 text-center text-sm font-bold uppercase tracking-widest text-white transition hover:-translate-y-0.5"
          >
            Begin Your Journey →
          </Link>
        </article>
      </section>
    </div>
  );
}
