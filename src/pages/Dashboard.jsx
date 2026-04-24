import ChatAssistant from '../components/ChatAssistant';
import Timeline from '../components/Timeline';
import PollingBoothMap from '../components/PollingBoothMap';
import FindBooth from '../components/FindBooth';
import { useProfile, profileConfig } from '../contexts/ProfileContext';

export default function Dashboard({ tab = 'assistant', onResetExperience }) {
  const { voterProfile } = useProfile();
  console.log('VOTER PROFILE IN DASHBOARD:', voterProfile);

  const config = profileConfig[voterProfile?.voterType] || profileConfig['first-time'];

  return (
    <div className="space-y-6 lg:max-w-6xl mx-auto" style={{ fontSize: config.fontSize }}>
      
      <div style={{ background: config.bannerColor, color: 'white', padding: '15px', borderRadius: '1rem', marginBottom: '1rem' }}>
        <h3 className="font-bold text-lg">{config.banner}</h3>
      </div>
      
      {tab === 'assistant' && <ChatAssistant isFullScreen={true} />}
      {tab === 'timeline' && <Timeline />}
      {tab === 'map' && <PollingBoothMap />}
      {tab === 'booth' && <FindBooth />}
    </div>
  );
}
