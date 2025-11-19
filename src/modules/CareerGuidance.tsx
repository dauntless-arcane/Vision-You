import { useState } from 'react';
import { ClipboardCheck } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

interface CareerGuidanceProps {
  onBack: () => void;
}

const tasks = [
  'Analyzing data and finding patterns',
  'Writing and editing content',
  'Creating visual designs',
  'Teaching or explaining concepts',
  'Building or fixing things',
  'Organizing events or projects',
  'Solving technical problems',
  'Helping people with their problems',
  'Conducting research',
  'Public speaking or presentations',
  'Managing teams or people',
  'Creating social media content',
  'Coding or programming',
  'Drawing or illustrating',
  'Planning strategies',
  'Customer service interactions',
  'Financial analysis or budgeting',
  'Video editing or production',
  'Marketing and promotion',
  'Scientific experiments',
  'Writing reports or documentation',
  'Negotiating deals',
  'Cooking or food preparation',
  'Graphic design work',
  'Database management',
  'Counseling or mentoring',
  'Event photography',
  'Network administration',
  'Creative writing',
  'Sales and persuasion',
  'Quality testing',
  'Interior decorating',
  'Music composition',
  'Legal research',
  'Project coordination',
  'Translation work',
  'SEO optimization',
  'Physical fitness training',
  'Environmental conservation',
  'Medical care activities',
  'Fashion styling',
  'Architecture planning',
  'Animation creation',
  'Supply chain logistics',
  'User experience testing'
];

const jobMatches = [
  {
    title: 'UX Researcher',
    matchedTasks: [1, 9, 12, 45],
    description: 'Conduct user research to understand behaviors, needs, and motivations through observation and feedback.',
    indiaScope: 'Growing field in major tech hubs with increasing awareness of user-centered design.',
    abroadScope: 'Highly valued in US, UK, and European tech companies with competitive salaries.',
    futureGrowth: 'Expected to grow 20% over next 5 years as digital products become more sophisticated.',
    similarCareers: ['Product Designer', 'User Experience Designer', 'Usability Analyst']
  },
  {
    title: 'Content Strategist',
    matchedTasks: [2, 19, 21, 37],
    description: 'Plan, develop, and manage content across digital platforms to engage audiences and meet business goals.',
    indiaScope: 'Strong demand in digital marketing agencies and content-driven companies.',
    abroadScope: 'Well-established role with opportunities in marketing agencies and corporate sectors.',
    futureGrowth: 'Steady growth as content marketing continues to be essential for business.',
    similarCareers: ['Digital Marketing Manager', 'Social Media Strategist', 'Content Marketing Manager']
  },
  {
    title: 'Data Analyst',
    matchedTasks: [1, 7, 17, 25],
    description: 'Collect, process, and analyze data to help organizations make informed business decisions.',
    indiaScope: 'Very high demand across all industries including IT, finance, healthcare, and e-commerce.',
    abroadScope: 'Excellent opportunities with competitive compensation in developed markets.',
    futureGrowth: 'One of the fastest-growing careers with 25% growth projection.',
    similarCareers: ['Business Intelligence Analyst', 'Data Scientist', 'Analytics Consultant']
  }
];

export default function CareerGuidance({ onBack }: CareerGuidanceProps) {
  const [step, setStep] = useState(0);
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);

  const toggleTask = (index: number) => {
    setSelectedTasks((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleSubmit = () => {
    setStep(2);
  };

  if (step === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <Card className="p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
              <ClipboardCheck className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Career Guidance: Task-First Method
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              This approach helps you discover careers based on the specific tasks you enjoy doing.
              We'll show you a list of common work tasks, and you'll select the ones that appeal to
              you. Then we'll match you with careers that involve those tasks daily.
            </p>
            <div className="bg-blue-50 rounded-2xl p-6 mb-8">
              <p className="text-gray-700 leading-relaxed">
                <strong>How it works:</strong> Review the task list and check everything that sounds
                interesting or enjoyable to you. Don't overthink it - go with your gut feeling!
              </p>
            </div>
            <div className="flex gap-4 justify-center">
              <Button variant="ghost" onClick={onBack}>
                Back to Home
              </Button>
              <Button size="lg" onClick={() => setStep(1)}>
                Start Selection
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Select Tasks You Enjoy
              </h2>
              <p className="text-gray-600">
                Choose as many as you like - {selectedTasks.length} selected
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-3 mb-8 max-h-[500px] overflow-y-auto p-2">
              {tasks.map((task, index) => (
                <button
                  key={index}
                  onClick={() => toggleTask(index)}
                  className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all text-left ${
                    selectedTasks.includes(index)
                      ? 'border-purple-500 bg-purple-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-sm'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                      selectedTasks.includes(index)
                        ? 'bg-purple-500'
                        : 'bg-gray-200'
                    }`}
                  >
                    {selectedTasks.includes(index) && (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-gray-900 font-medium">{task}</span>
                </button>
              ))}
            </div>

            <div className="sticky bottom-0 bg-white rounded-2xl shadow-lg p-4 border-2 border-gray-200">
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(0)}>
                  Back
                </Button>
                <Button
                  fullWidth
                  onClick={handleSubmit}
                  disabled={selectedTasks.length === 0}
                >
                  Submit Tasks ({selectedTasks.length})
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Your Career Matches
          </h1>
          <p className="text-gray-600 mb-8 text-center">
            Based on {selectedTasks.length} tasks you selected
          </p>

          <div className="space-y-6">
            {jobMatches.map((job, index) => (
              <Card key={index} className="p-6 hover:shadow-xl">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {job.title}
                    </h2>
                    <p className="text-sm text-purple-600 font-medium">
                      Matches tasks: {job.matchedTasks.map((t) => `#${t}`).join(', ')}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl px-4 py-2">
                    <span className="text-purple-700 font-bold">
                      {Math.round((job.matchedTasks.length / selectedTasks.length) * 100)}%
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-700 leading-relaxed">{job.description}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Scope in India
                      </h4>
                      <p className="text-sm text-gray-700">{job.indiaScope}</p>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Scope Abroad
                      </h4>
                      <p className="text-sm text-gray-700">{job.abroadScope}</p>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Future Growth
                    </h4>
                    <p className="text-sm text-gray-700">{job.futureGrowth}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Similar Careers
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {job.similarCareers.map((career, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {career}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex gap-4 justify-center">
            <Button variant="outline" onClick={() => setStep(1)}>
              Adjust Selection
            </Button>
            <Button variant="outline" onClick={onBack}>
              Back to Home
            </Button>
            <Button size="lg">
              Explore More Careers
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
