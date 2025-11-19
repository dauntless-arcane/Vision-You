import { useState } from 'react';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import VisionYouBlueprint from './modules/VisionYouBlueprint';
import IkigaiMethod from './modules/IkigaiMethod';
import CareerGuidance from './modules/CareerGuidance';

type ModuleType = 'home' | 'blueprint' | 'ikigai' | 'career-guidance';

function App() {
  const [currentModule, setCurrentModule] = useState<ModuleType>('home');

  const handleModuleSelect = (module: ModuleType) => {
    setCurrentModule(module);
  };

  const handleBackToHome = () => {
    setCurrentModule('home');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {currentModule !== 'home' && <Header onHomeClick={handleBackToHome} />}

      {currentModule === 'home' && (
        <LandingPage onModuleSelect={handleModuleSelect} />
      )}

      {currentModule === 'blueprint' && (
        <VisionYouBlueprint onBack={handleBackToHome} />
      )}

      {currentModule === 'ikigai' && (
        <IkigaiMethod onBack={handleBackToHome} />
      )}

      {currentModule === 'career-guidance' && (
        <CareerGuidance onBack={handleBackToHome} />
      )}
    </div>
  );
}

export default App;
