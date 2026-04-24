import { useState } from 'react';
import { APIProvider, Map as GoogleMap, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { useLanguage } from '../contexts/LanguageContext';

const MOCK_BOOTHS = [
  { id: 1, nameKey: 'booth1Name', lat: 28.6139, lng: 77.2090, distance: "0.8 km", waitTime: "15 mins", queue: "Moderate" },
  { id: 2, nameKey: 'booth2Name', lat: 28.6250, lng: 77.2150, distance: "1.2 km", waitTime: "5 mins", queue: "Short" },
  { id: 3, nameKey: 'booth3Name', lat: 28.6050, lng: 77.2000, distance: "2.1 km", waitTime: "45 mins", queue: "Long" },
];

export default function FindBooth() {
  const { t } = useLanguage();
  const [selectedBooth, setSelectedBooth] = useState(MOCK_BOOTHS[0]);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_KEY;

  return (
    <div className="grid lg:grid-cols-[1fr_350px] gap-6 h-[calc(100vh-200px)] min-h-[500px]">
      <section className="glass-card rounded-[2rem] border-navy/10 bg-white overflow-hidden shadow-sm flex flex-col">
        <div className="p-6 border-b border-navy/10">
          <p className="text-xs font-bold uppercase tracking-widest text-saffron">{t('locationServices')}</p>
          <h2 className="mt-2 font-display text-4xl font-bold leading-none text-navy">{t('findBooth')}</h2>
        </div>
        
        <div className="flex-1 w-full bg-slate-100 relative">
          {apiKey ? (
            <APIProvider apiKey={apiKey}>
              <GoogleMap
                mapId="VOTER_MAP_ID"
                defaultCenter={{ lat: 28.6139, lng: 77.2090 }}
                defaultZoom={13}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
              >
                {MOCK_BOOTHS.map((booth) => (
                  <AdvancedMarker
                    key={booth.id}
                    position={{ lat: booth.lat, lng: booth.lng }}
                    onClick={() => setSelectedBooth(booth)}
                  >
                    <Pin 
                       background={selectedBooth?.id === booth.id ? '#FF9933' : '#138808'} 
                       borderColor={selectedBooth?.id === booth.id ? '#c27427' : '#0e6606'}
                       glyphColor="#ffffff" 
                    />
                  </AdvancedMarker>
                ))}
              </GoogleMap>
            </APIProvider>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-navy/5 text-center p-8">
               <div className="w-16 h-16 rounded-full bg-navy/10 flex items-center justify-center mb-4 text-2xl">🗺️</div>
               <h3 className="font-bold text-xl text-navy">{t('mapUnavailable')}</h3>
               <p className="text-sm text-navy/60 mt-2 max-w-md">{t('mapUnavailableDesc')}</p>
            </div>
          )}
        </div>
      </section>

      <section className="glass-card rounded-[2rem] border-navy/10 bg-white p-6 shadow-sm flex flex-col overflow-y-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-navy mb-4">{t('nearbyBooths')}</p>
        
        <div className="space-y-4">
          {MOCK_BOOTHS.map(booth => {
            const isSelected = selectedBooth?.id === booth.id;
            return (
              <div 
                key={booth.id} 
                onClick={() => setSelectedBooth(booth)}
                className={`cursor-pointer rounded-xl border p-4 transition-all ${
                  isSelected ? 'border-saffron bg-saffron/5 shadow-md' : 'border-navy/10 hover:border-navy/30'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`font-bold ${isSelected ? 'text-navy' : 'text-navy/80'}`}>{t(booth.nameKey)}</h3>
                  <span className="text-xs font-bold text-navy/60 bg-navy/5 px-2 py-1 rounded">{booth.distance}</span>
                </div>
                <div className="flex items-center gap-4 text-sm mt-3">
                  <div className="flex items-center gap-1">
                    <span className="text-navy/50">{t('waitTime')}</span>
                    <span className={`font-bold ${booth.queue === 'Long' ? 'text-red-500' : 'text-indiaGreen'}`}>
                      {booth.waitTime}
                    </span>
                  </div>
                </div>
                {isSelected && (
                  <button className="mt-4 w-full rounded-lg bg-navy px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition hover:-translate-y-0.5">
                    {t('getDirections')}
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </div>
  );
}
