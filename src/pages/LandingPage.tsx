import { ClipboardList, Compass, Target } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

interface LandingPageProps {
  onModuleSelect: (module: 'blueprint' | 'ikigai' | 'career-guidance') => void;
}

export default function LandingPage({ onModuleSelect }: LandingPageProps) {
  const modules = [
    {
      id: 'blueprint' as const,
      icon: Target,
      title: 'VisionYou ',
      description: 'Imagine your future, upgraded self and build your personalized VisionYou profile.',
      gradient: 'from-blue-400 to-blue-600'
    },
    {
      id: 'ikigai' as const,
      icon: Compass,
      title: 'Ikigai Method',
      description: 'Discover the intersection of passion, skills, purpose, and opportunities.',
      gradient: 'from-purple-400 to-purple-600'
    },
    {
      id: 'career-guidance' as const,
      icon: ClipboardList,
      title: 'Career Guidance (Task-First)',
      description: 'Choose tasks you enjoy and find jobs that match your natural strengths.',
      gradient: 'from-pink-400 to-pink-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <img 
              src="CAPS_logo.png"   // <--- replace with actual image path
              alt="CAPS LOGO"
              className="w-80 h-20 object-cover rounded-3xl"
            />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Path Finder 
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A career exploration experience that helps you discover your future self, your purpose,
            and the right career direction.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Card
                key={module.id}
                onClick={() => onModuleSelect(module.id)}
                className="p-8 flex flex-col items-center text-center hover:shadow-2xl"
              >
                <div
                  className={`w-24 h-24 bg-gradient-to-br ${module.gradient} rounded-3xl flex items-center justify-center mb-6 shadow-lg`}
                >
                  <Icon className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {module.title}
                </h3>
                <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                  {module.description}
                </p>
                <Button size="lg" fullWidth>
                  Start
                </Button>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            Choose any module to begin your journey of self-discovery
          </p>
        </div>
      </div>
    </div>
  );
}
