import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix leaflet marker icon bug in vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const MOCK_BOOTHS = [
  { id: 1, nameKey: 'booth1Name', name: "Government High School, Block A", lat: 28.6139, lng: 77.2090, distance: "0.8 km", waitTime: "15 mins", queue: "Moderate" },
  { id: 2, nameKey: 'booth2Name', name: "Community Center Hall, Sector 3", lat: 28.6250, lng: 77.2150, distance: "1.2 km", waitTime: "5 mins", queue: "Short" },
  { id: 3, nameKey: 'booth3Name', name: "Primary Health Center, Zone 2", lat: 28.6050, lng: 77.2000, distance: "2.1 km", waitTime: "45 mins", queue: "Long" },
];

function MapController({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 16);
    }
  }, [center, map]);
  return null;
}

export default function FindBooth() {
  const { t } = useLanguage();
  const [selectedBooth, setSelectedBooth] = useState(MOCK_BOOTHS[0]);
  const markerRefs = useRef({});

  const handleGetDirections = (booth) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${booth.lat},${booth.lng}&travelmode=walking`;
    const directionsWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (directionsWindow) {
      directionsWindow.opener = null;
    }
  };

  useEffect(() => {
    if (selectedBooth) {
      markerRefs.current[selectedBooth.id]?.openPopup();
    }
  }, [selectedBooth]);

  return (
    <div className="grid lg:grid-cols-[1fr_350px] gap-6 h-[calc(100vh-200px)] min-h-[500px]">
      <section className="glass-card rounded-[2rem] border-navy/10 bg-white overflow-hidden shadow-sm flex flex-col">
        <div className="p-6 border-b border-navy/10">
          <p className="text-xs font-bold uppercase tracking-widest text-saffron">{t('locationServices')}</p>
          <h2 className="mt-2 font-display text-4xl font-bold leading-none text-navy">{t('findBooth')}</h2>
        </div>
        
        <div className="flex-1 w-full bg-slate-100 relative">
          <MapContainer 
            center={[28.6139, 77.2090]} 
            zoom={13} 
            style={{ height: '100%', width: '100%' }}
          >
            <MapController center={selectedBooth ? [selectedBooth.lat, selectedBooth.lng] : null} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {MOCK_BOOTHS.map(booth => (
              <Marker 
                key={booth.id}
                ref={(ref) => {
                  if (ref) {
                    markerRefs.current[booth.id] = ref;
                  }
                }}
                position={[booth.lat, booth.lng]}
                eventHandlers={{ click: () => setSelectedBooth(booth) }}
              >
                <Popup>
                  <strong>{t(booth.nameKey) !== booth.nameKey ? t(booth.nameKey) : booth.name}</strong><br/>
                  {t('waitTime')}: {booth.waitTime}<br/>
                  Distance: {booth.distance}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </section>

      <section className="glass-card rounded-[2rem] border-navy/10 bg-white p-6 shadow-sm flex flex-col overflow-y-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-navy mb-4">{t('nearbyBooths')}</p>
        
        <div aria-label={t('nearbyBoothsList')} className="space-y-4">
          {MOCK_BOOTHS.map(booth => {
            const isSelected = selectedBooth?.id === booth.id;
            return (
              <div
                key={booth.id} 
                onClick={() => setSelectedBooth(booth)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setSelectedBooth(booth);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                aria-label={`${t('selectBooth')}: ${t(booth.nameKey) !== booth.nameKey ? t(booth.nameKey) : booth.name}`}
                className={`w-full cursor-pointer rounded-xl border p-4 text-left transition-all ${
                  isSelected ? 'border-saffron bg-saffron/5 shadow-md' : 'border-navy/10 hover:border-navy/30'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`font-bold ${isSelected ? 'text-navy' : 'text-navy/80'}`}>
                    {t(booth.nameKey) !== booth.nameKey ? t(booth.nameKey) : booth.name}
                  </h3>
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
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleGetDirections(booth);
                  }}
                  className="mt-4 w-full rounded-lg bg-navy px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition hover:-translate-y-0.5"
                >
                  {t('getDirections')}
                </button>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  );
}
