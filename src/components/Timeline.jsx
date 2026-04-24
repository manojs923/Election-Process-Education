import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const phases = [
  {
    icon: "📋",
    title: "Election Announcement",
    date: "Day 1",
    voterAction: "Check your name on electoral roll at voters.eci.gov.in",
    deadline: "Immediately after announcement"
  },
  {
    icon: "📝",
    title: "Voter Registration Deadline",
    date: "Day 7",
    voterAction: "Submit Form 6 online if not registered",
    deadline: "7 days after announcement"
  },
  {
    icon: "🏃",
    title: "Campaign Period",
    date: "Day 8–26",
    voterAction: "Research candidates, attend public meetings",
    deadline: "Ends 48 hours before voting"
  },
  {
    icon: "🗳️",
    title: "Voting Day",
    date: "Day 27",
    voterAction: "Carry valid ID, visit booth 7am–6pm",
    deadline: "Single day"
  },
  {
    icon: "📊",
    title: "Result Declaration",
    date: "Day 30",
    voterAction: "Check results at eci.gov.in",
    deadline: "3 days after voting"
  }
];

export default function Timeline() {
  const { t } = useLanguage();
  const [activePhase, setActivePhase] = useState(null);

  return (
    <section className="glass-card rounded-[2rem] border-navy/10 bg-white p-6 md:p-8 shadow-sm">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4 border-b border-navy/10 pb-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-saffron">
            {t('processOverview')}
          </p>
          <h2 className="mt-2 font-display text-4xl font-bold leading-none text-navy">
            {t('electionTimeline')}
          </h2>
          <p className="mt-2 text-sm font-medium text-navy/60">
            {t('timelineSubtitle')}
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 overflow-x-auto pb-4">
        {phases.map((phase, index) => (
          <div 
            key={index}
            onClick={() => setActivePhase(activePhase === index ? null : index)}
            className={`cursor-pointer rounded-2xl border p-5 flex-1 min-w-[200px] transition-all hover:shadow-md ${activePhase === index ? 'border-saffron bg-saffron/5' : 'border-navy/10 bg-white'}`}
          >
            <div className="text-3xl mb-3">{phase.icon}</div>
            <div className="text-xs font-bold text-saffron uppercase tracking-wider mb-1">{phase.date}</div>
            <h3 className="font-bold text-navy mb-2">{phase.title}</h3>
            
            {activePhase === index && (
              <div className="mt-4 pt-4 border-t border-navy/10 animate-fade-in">
                <p className="text-sm font-medium text-navy mb-2"><strong>Action:</strong> {phase.voterAction}</p>
                <p className="text-xs text-navy/60"><strong>Deadline:</strong> {phase.deadline}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
