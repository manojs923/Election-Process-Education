import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useProfile } from '../contexts/ProfileContext';

export default function Entry({ userProfile, onStart }) {
  const navigate = useNavigate();
  const [voterType, setVoterType] = useState('First-Time Voter');
  const { language, setLanguage, t } = useLanguage();
  const { setVoterProfile } = useProfile();

  const voterTypes = [
    { key: 'firstTimeVoter', value: 'First-Time Voter', typeId: 'first-time', desc: 'Step-by-step guidance for new voters' },
    { key: 'experiencedVoter', value: 'Experienced Voter', typeId: 'experienced', desc: 'Quick updates on new rules & EVMs' },
    { key: 'seniorCitizen', value: 'Senior Citizen', typeId: 'senior', desc: 'Info on priority lanes & home voting' },
    { key: 'accessibilitySupport', value: 'Needs Accessibility Support', typeId: 'accessible', desc: 'Details on accessible booths & help' },
  ];

  const languages = ['English', 'Hindi', 'Tamil', 'Telugu', 'Bengali', 'Kannada'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedType = voterTypes.find((type) => type.value === voterType);
    
    const contextProfile = {
      voterType: selectedType?.typeId || 'first-time',
      language: language
    };
    setVoterProfile(contextProfile);
    console.log('VOTER PROFILE SET TO:', contextProfile);

    onStart({
      voterType: selectedType?.typeId || 'first-time',
      voterTypeKey: selectedType?.key || 'firstTimeVoter',
      language,
    });
    navigate('/dashboard');
  };

  return (
    <div className="space-y-6 pb-8 pt-6">
      <section className="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
        <div className="rounded-[2xl] bg-white p-8 md:p-12 shadow-sm border border-navy/10 flex flex-col justify-center">
          <p className="text-xs font-bold uppercase tracking-widest text-saffron mb-2">
            Welcome to
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-bold leading-none text-navy">
            Voter Education Assistant
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-navy/90 font-medium">
            Learn about the election process, required documents, polling booth steps, and your rights as a voter in an interactive way.
          </p>
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 text-navy/80">
              <CheckCircle className="text-indiaGreen w-5 h-5" />
              <span className="font-medium">100% Non-Partisan & Objective</span>
            </div>
            <div className="flex items-center gap-3 text-navy/80">
              <CheckCircle className="text-indiaGreen w-5 h-5" />
              <span className="font-medium">Multilingual Support</span>
            </div>
            <div className="flex items-center gap-3 text-navy/80">
              <CheckCircle className="text-indiaGreen w-5 h-5" />
              <span className="font-medium">Interactive Timelines & Maps</span>
            </div>
          </div>
        </div>

        <div className="rounded-[2xl] bg-white p-8 md:p-10 shadow-glow border border-navy/5">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <h2 id="voter-profile-heading" className="text-xl font-bold text-navy mb-4">Select Voter Profile</h2>
              <div role="group" aria-labelledby="voter-profile-heading" className="grid grid-cols-1 gap-3">
                {voterTypes.map((type) => (
                  <label
                    key={type.value}
                    className={`cursor-pointer rounded-xl border p-4 text-left transition-all flex flex-col ${
                      voterType === type.value
                        ? 'border-saffron bg-saffron/10 text-navy font-bold shadow-sm'
                        : 'border-navy/10 hover:border-navy/30 text-navy/90'
                    }`}
                  >
                    <input
                      type="radio"
                      name="voterType"
                      value={type.value}
                      checked={voterType === type.value}
                      onChange={(e) => setVoterType(e.target.value)}
                      className="hidden"
                    />
                    <span className="text-base font-bold">{t(type.key)}</span>
                    <span className="text-xs mt-1 opacity-80">{type.desc}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h2 id="language-heading" className="text-xl font-bold text-navy mb-4">Preferred Language</h2>
              <div role="group" aria-labelledby="language-heading" className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {languages.map((lang) => (
                  <label
                    key={lang}
                    className={`cursor-pointer rounded-xl border p-3 text-center transition-all ${
                      language === lang
                        ? 'border-indiaGreen bg-indiaGreen/10 text-navy font-bold shadow-sm'
                        : 'border-navy/10 hover:border-navy/30 text-navy/90'
                    }`}
                  >
                    <input
                      type="radio"
                      name="language"
                      value={lang}
                      checked={language === lang}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="hidden"
                    />
                    <span className="text-sm">{lang}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
               type="submit"
               className="w-full rounded-xl bg-navy px-6 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2"
            >
              Start My Learning
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
