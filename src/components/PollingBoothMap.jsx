import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useProfile, profileConfig } from '../contexts/ProfileContext';

const steps = [
  { id: 'entrance', labelKey: 'stepEntranceLabel', descKey: 'stepEntranceDesc', x: 100, y: 550 },
  { id: 'po1', labelKey: 'stepPo1Label', descKey: 'stepPo1Desc', x: 150, y: 300 },
  { id: 'po2', labelKey: 'stepPo2Label', descKey: 'stepPo2Desc', x: 350, y: 300 },
  { id: 'po3', labelKey: 'stepPo3Label', descKey: 'stepPo3Desc', x: 550, y: 300 },
  { id: 'compartment', labelKey: 'stepCompartmentLabel', descKey: 'stepCompartmentDesc', x: 700, y: 150 },
  { id: 'exit', labelKey: 'stepExitLabel', descKey: 'stepExitDesc', x: 700, y: 550 },
];

export default function PollingBoothMap() {
  const { t } = useLanguage();
  const { voterProfile } = useProfile();
  const profileKey = voterProfile?.voterType || 'first-time';
  const config = profileConfig[profileKey] || profileConfig['first-time'];
  const [activeStepIndex, setActiveStepIndex] = useState(-1);
  const [isGuiding, setIsGuiding] = useState(false);

  useEffect(() => {
    if (config.autoGuide) {
      setActiveStepIndex(0);
      setIsGuiding(true);
    } else if (profileKey === 'experienced') {
      setActiveStepIndex(4);
    }
  }, [profileKey, config.autoGuide]);

  useEffect(() => {
    if (!isGuiding) return;
    
    // Auto-walkthrough logic
    if (activeStepIndex >= steps.length) {
      setIsGuiding(false);
      setActiveStepIndex(-1);
      return;
    }

    const timer = setTimeout(() => {
      setActiveStepIndex((prev) => prev + 1);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isGuiding, activeStepIndex]);

  const handleGuideMe = () => {
    setActiveStepIndex(0);
    setIsGuiding(true);
  };

  const getStepColor = (index) => {
    if (index === activeStepIndex) return '#FF9933'; // Saffron currently active
    if (index < activeStepIndex && activeStepIndex !== -1) return '#138808'; // Green completed
    return '#E2E8F0'; // Default gray
  };

  return (
    <div className="grid lg:grid-cols-[1fr_300px] gap-6 items-start">
      <section className="glass-card rounded-[2rem] border-navy/10 bg-white p-6 md:p-8 shadow-sm">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-navy/10 pb-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-saffron">
              {t('interactiveFlow')}
            </p>
            <h2 className="mt-2 font-display text-4xl font-bold leading-none text-navy">
              {t('insidePollingBooth')}
            </h2>
          </div>
          <button
            type="button"
            onClick={handleGuideMe}
            disabled={isGuiding}
            className={`rounded-full px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition shadow-md focus:outline-none focus:ring-2 focus:ring-saffron focus:ring-offset-2 ${
              isGuiding ? 'bg-navy/50 cursor-not-allowed' : 'bg-saffron hover:-translate-y-0.5'
            }`}
          >
            {isGuiding ? t('guiding') : t('guideMe')}
          </button>
        </div>

        <div className="relative w-full aspect-[4/3] rounded-2xl bg-[#F5F0E8] overflow-hidden border border-navy/10">
          <svg viewBox="0 0 800 600" className="w-full h-full drop-shadow-sm">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0D1B3E" strokeWidth="0.5" strokeOpacity="0.1" />
              </pattern>
              
              {/* Markers for flow */}
              <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#0D1B3E" opacity="0.4" />
              </marker>
            </defs>

            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Room Walls */}
            <path d="M 50 50 L 750 50 L 750 500 L 50 500 Z" fill="none" stroke="#0D1B3E" strokeWidth="4" />
            
            {/* Doors */}
            <rect x="50" y="500" width="100" height="10" fill="#F5F0E8" />
            <text x="100" y="535" fontSize="14" fontWeight="bold" fill="#0D1B3E" textAnchor="middle">{t('entrance')}</text>

            <rect x="650" y="500" width="100" height="10" fill="#F5F0E8" />
            <text x="700" y="535" fontSize="14" fontWeight="bold" fill="#0D1B3E" textAnchor="middle">{t('exit')}</text>

            {/* Voting Compartment */}
            <rect x="630" y="80" width="100" height="100" fill="#ffffff" stroke="#138808" strokeWidth="3" />
            <text x="680" y="125" fontSize="14" fontWeight="bold" fill="#138808" textAnchor="middle">{t('voting')}</text>
            <text x="680" y="145" fontSize="10" fill="#138808" textAnchor="middle">{t('compartment')}</text>

            {/* Polling Officers Desks */}
            <g transform="translate(100, 220)">
              <rect width="80" height="40" fill="#ffffff" stroke="#0D1B3E" strokeWidth="2" rx="4" />
              <text x="40" y="25" fontSize="12" fontWeight="bold" fill="#0D1B3E" textAnchor="middle">PO 1</text>
            </g>
            <g transform="translate(300, 220)">
              <rect width="80" height="40" fill="#ffffff" stroke="#0D1B3E" strokeWidth="2" rx="4" />
              <text x="40" y="25" fontSize="12" fontWeight="bold" fill="#0D1B3E" textAnchor="middle">PO 2</text>
            </g>
            <g transform="translate(500, 220)">
              <rect width="80" height="40" fill="#ffffff" stroke="#0D1B3E" strokeWidth="2" rx="4" />
              <text x="40" y="25" fontSize="12" fontWeight="bold" fill="#0D1B3E" textAnchor="middle">PO 3</text>
            </g>

            {/* Presiding Officer */}
            <g transform="translate(100, 100)">
              <rect width="100" height="50" fill="#ffffff" stroke="#0D1B3E" strokeWidth="2" rx="4" />
              <text x="50" y="28" fontSize="10" fontWeight="bold" fill="#0D1B3E" textAnchor="middle">{t('presidingOfficer')}</text>
            </g>

            {/* Polling Agents */}
            <g transform="translate(100, 400)">
              <rect width="200" height="40" fill="#ffffff" stroke="#0D1B3E" strokeWidth="2" strokeDasharray="4" rx="4" />
              <text x="100" y="25" fontSize="12" fontWeight="bold" fill="#0D1B3E" textAnchor="middle">{t('pollingAgents')}</text>
            </g>

            {/* Walkthrough Path Line */}
            <path d="M 100 500 L 100 450 L 140 350 L 340 350 L 540 350 L 680 350 L 680 230 L 700 230" fill="none" stroke="#0D1B3E" strokeWidth="3" strokeDasharray="8 6" opacity="0.2" />
            <path d="M 680 230 L 680 450 L 700 450 L 700 500" fill="none" stroke="#0D1B3E" strokeWidth="3" strokeDasharray="8 6" opacity="0.2" />

            {profileKey === 'senior' && (
              <g>
                <path d="M 100 500 L 100 450 L 140 350 L 340 350 L 540 350 L 680 350 L 680 230 L 700 230" fill="none" stroke="#FF9933" strokeWidth="5" strokeDasharray="8 6" opacity="0.6" />
                <text x="340" y="340" fontSize="14" fontWeight="bold" fill="#FF9933" textAnchor="middle">Priority Lane</text>
              </g>
            )}

            {profileKey === 'accessible' && (
              <g>
                <path d="M 100 500 L 100 450 L 140 350 L 340 350 L 540 350 L 680 350 L 680 230 L 700 230" fill="none" stroke="#4a90e2" strokeWidth="5" strokeDasharray="8 6" opacity="0.6" />
                <text x="340" y="340" fontSize="14" fontWeight="bold" fill="#4a90e2" textAnchor="middle">Wheelchair Accessible Path</text>
                <rect x="630" y="80" width="100" height="100" fill="#4a90e2" opacity="0.2" />
              </g>
            )}

            {/* Step Markers */}
            {steps.map((step, index) => {
              const isActive = index === activeStepIndex;
              const isPulsing = isActive && isGuiding;
              return (
                <g key={step.id} transform={`translate(${step.x}, ${step.y})`} className="transition-all duration-500">
                  {isPulsing && (
                    <circle r="25" fill="#FF9933" opacity="0.3">
                      <animate attributeName="r" values="25;40;25" dur="1.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.3;0;0.3" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                  )}
                  <circle
                    r={isActive ? "18" : "14"}
                    fill={getStepColor(index)}
                    stroke={isActive ? '#ffffff' : '#0D1B3E'}
                    strokeWidth="3"
                    className="transition-all duration-300"
                  />
                  <text
                    y="5"
                    fontSize={isActive ? "14" : "12"}
                    fontWeight="bold"
                    fill={isActive ? '#ffffff' : '#0D1B3E'}
                    textAnchor="middle"
                  >
                    {index + 1}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </section>

      {/* Guide Info Panel */}
      <section className="glass-card rounded-[2rem] border-navy/10 bg-white p-6 shadow-sm flex flex-col h-full h-max-[500px]">
        <p className="text-xs font-bold uppercase tracking-widest text-navy mb-4">{t('walkthroughGuide')}</p>
        
        {activeStepIndex === -1 || activeStepIndex >= steps.length ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
            <div className="w-16 h-16 rounded-full bg-saffron/10 text-saffron flex items-center justify-center text-2xl mb-4">📍</div>
            <h3 className="font-bold text-lg text-navy">{t('readyToLearn')}</h3>
            <p className="text-sm text-navy/60 mt-2">{t('guideInstruction')}</p>
          </div>
        ) : (
          <div className="flex-1 space-y-6 overflow-y-auto pr-2 pb-4">
            {steps.map((step, index) => {
              const isActive = index === activeStepIndex;
              const isPassed = index < activeStepIndex;
              
              return (
                <div key={step.id} className={`flex gap-4 transition-all duration-300 ${isActive ? 'scale-105 origin-left' : isPassed ? 'opacity-50' : 'opacity-30'}`}>
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 ${
                      isActive ? 'bg-saffron border-saffron text-white shadow-md' :
                      isPassed ? 'bg-indiaGreen border-indiaGreen text-white' :
                      'bg-offwhite border-navy/20 text-navy/60'
                    }`}>
                      {index + 1}
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-0.5 h-full min-h-[30px] my-1 ${isPassed ? 'bg-indiaGreen' : 'bg-navy/10'}`} />
                    )}
                  </div>
                  <div className={isActive ? 'pt-1 pb-4' : 'pt-1'}>
                    <h3 className={`font-bold ${isActive ? 'text-navy text-lg' : 'text-navy text-sm'}`}>{t(step.labelKey)}</h3>
                    {isActive && <p className="text-sm text-navy/70 mt-1 leading-relaxed font-medium transition-all">{t(step.descKey)}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
