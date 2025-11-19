import { Sparkles } from 'lucide-react';
import { useState } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import ProgressBar from '../components/ProgressBar';
const [loading, setLoading] = useState(false);
const [aiResult, setAIResult] = useState<string | null>(null);


const generateAI = async () => {
  setLoading(true);

  try {
    const res = await fetch("/api/visionyou", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formData }),
    });

    const data = await res.json();

    if (data?.summary) {
      setAIResult(data.summary);
    } else {
      setAIResult("No response received from the AI.");
    }
  } catch (err) {
    console.error(err);
    setAIResult("An error occurred while generating your analysis.");
  }

  setLoading(false);
};


interface VisionYouBlueprintProps {
  onBack: () => void;
}

interface FormData {
  coreValues: string;
  jobTitle: string;
  industry: string;
  adjectives: string;
  exceptionalSkills: string;
  futureSkills: string;
  superpower: string;
  priorities: string;
  dreamActivities: string;
  impact: string;
  beneficiaries: string;
  workdayFeeling: string;
  futureMessage: string;
}

export default function VisionYouBlueprint({ onBack }: VisionYouBlueprintProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    coreValues: '',
    jobTitle: '',
    industry: '',
    adjectives: '',
    exceptionalSkills: '',
    futureSkills: '',
    superpower: '',
    priorities: '',
    dreamActivities: '',
    impact: '',
    beneficiaries: '',
    workdayFeeling: '',
    futureMessage: ''
  });

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  if (step === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <Card className="p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              VisionYou
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              Let’s create your VisionYou — the future, upgraded version of you. I’ll ask you questions to understand your ideal identity, skills, lifestyle, and aspirations. Answer in as much detail as you can.
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="ghost" onClick={onBack}>
                Back to Home
              </Button>
              <Button size="lg" onClick={nextStep}>
                Begin Assessment
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (step === 5) {
    {/* AI RESULT AREA */}
      {loading && (
        <div className="mt-6 p-4 bg-blue-100 text-blue-800 rounded-xl text-center">
          Generating your VisionYou Analysis... Please wait.
        </div>
      )}

      {aiResult && (
        <div className="mt-6 p-6 bg-white border border-blue-200 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            AI-Generated Career Analysis
          </h2>
          <div className="prose max-w-none text-gray-800 whitespace-pre-line">
            {aiResult}
          </div>
        </div>
      )}

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Your VisionYou Summary
            </h1>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Identity</h2>
                <div className="space-y-3 text-gray-700">
                  <p><strong>Core Values:</strong> {formData.coreValues}</p>
                  <p><strong>Desired Job Title:</strong> {formData.jobTitle}</p>
                  <p><strong>Industry:</strong> {formData.industry}</p>
                  <p><strong>Three Adjectives:</strong> {formData.adjectives}</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Skills & Strengths</h2>
                <div className="space-y-3 text-gray-700">
                  <p><strong>Exceptional Skills:</strong> {formData.exceptionalSkills}</p>
                  <p><strong>Future Skills (2 Years):</strong> {formData.futureSkills}</p>
                  <p><strong>Daily Superpower:</strong> {formData.superpower}</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Lifestyle & Impact</h2>
                <div className="space-y-3 text-gray-700">
                  <p><strong>Priorities:</strong> {formData.priorities}</p>
                  <p><strong>Dream Activities:</strong> {formData.dreamActivities}</p>
                  <p><strong>Impact to Create:</strong> {formData.impact}</p>
                  <p><strong>Beneficiaries:</strong> {formData.beneficiaries}</p>
                  <p><strong>Workday Feeling:</strong> {formData.workdayFeeling}</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Future-Self Message</h2>
                <p className="text-gray-700 leading-relaxed">{formData.futureMessage}</p>
              </div>

              <div className="bg-white border-2 border-blue-200 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Recommended Career Paths
                </h2>
                <p className="text-gray-600 italic">
                  Based on your responses, detailed career recommendations would be generated here
                  including suitability analysis, scope in India and abroad, challenges, and a
                  6/12/24-month preparation roadmap.
                </p>
              </div>
            </div>

            <div className="mt-8 flex gap-4 justify-center">
              <Button variant="outline" onClick={onBack}>
                Back to Home
              </Button>
              <Button size="lg" onClick={generateAI} disabled={loading}>
              {loading ? "Generating..." : "Generate AI Analysis"}
              </Button>

            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <Card className="p-8">
          <div className="mb-8">
            <ProgressBar currentStep={step} totalSteps={4} />
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Step 1: Identity</h2>
              <p className="text-gray-600 mb-6">Define who you aspire to become</p>

              <Input
                label="What are your core values?"
                value={formData.coreValues}
                onChange={(val) => updateField('coreValues', val)}
                placeholder="e.g., Innovation, integrity, creativity..."
                multiline
              />

              <Input
                label="What is your desired job title?"
                value={formData.jobTitle}
                onChange={(val) => updateField('jobTitle', val)}
                placeholder="e.g., Product Designer, Software Engineer..."
              />

              <Input
                label="Which industry do you see yourself in?"
                value={formData.industry}
                onChange={(val) => updateField('industry', val)}
                placeholder="e.g., Technology, Healthcare, Education..."
              />

              <Input
                label="Describe yourself in 3 adjectives"
                value={formData.adjectives}
                onChange={(val) => updateField('adjectives', val)}
                placeholder="e.g., Creative, analytical, empathetic"
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Step 2: Skills</h2>
              <p className="text-gray-600 mb-6">Identify your strengths and growth areas</p>

              <Input
                label="What are you exceptionally good at?"
                value={formData.exceptionalSkills}
                onChange={(val) => updateField('exceptionalSkills', val)}
                placeholder="Describe your natural talents and developed skills..."
                multiline
                rows={4}
              />

              <Input
                label="What skills will you master in the next 2 years?"
                value={formData.futureSkills}
                onChange={(val) => updateField('futureSkills', val)}
                placeholder="List skills you're committed to developing..."
                multiline
                rows={4}
              />

              <Input
                label="What is one superpower you will use daily?"
                value={formData.superpower}
                onChange={(val) => updateField('superpower', val)}
                placeholder="e.g., Problem-solving, communication, creativity..."
                multiline
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Step 3: Lifestyle</h2>
              <p className="text-gray-600 mb-6">Envision your ideal work-life balance</p>

              <Input
                label="What are your top priorities in life?"
                value={formData.priorities}
                onChange={(val) => updateField('priorities', val)}
                placeholder="e.g., Family, growth, impact, flexibility..."
                multiline
              />

              <Input
                label="What does your dream-career day look like?"
                value={formData.dreamActivities}
                onChange={(val) => updateField('dreamActivities', val)}
                placeholder="Describe the activities you'd love to do daily..."
                multiline
                rows={4}
              />

              <Input
                label="What impact do you want to create?"
                value={formData.impact}
                onChange={(val) => updateField('impact', val)}
                placeholder="How do you want to make a difference?"
                multiline
              />

              <Input
                label="Who benefits from your work?"
                value={formData.beneficiaries}
                onChange={(val) => updateField('beneficiaries', val)}
                placeholder="e.g., Students, businesses, communities..."
              />

              <Input
                label="How do you want to feel at the end of a workday?"
                value={formData.workdayFeeling}
                onChange={(val) => updateField('workdayFeeling', val)}
                placeholder="e.g., Fulfilled, energized, proud..."
              />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Step 4: Message to Your Future Self
              </h2>
              <p className="text-gray-600 mb-6">please retype the entire sentence by filling-in the blanks</p>

              <Input
                label="“My future self is proud that I chose _________, because I followed my love for _________, built strong skills in _________, made an impact by _________, and turned it into a career in _________.”"
                value={formData.futureMessage}
                onChange={(val) => updateField('futureMessage', val)}
                placeholder="My future self is proud that I chose to pursue design, because I followed my love for creating visually meaningful stories, built strong skills in UI/UX and digital art, made an impact by designing products that improve people’s everyday experiences, and turned it into a career in product design."
                multiline
                rows={8}
              />
            </div>
          )}

          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <Button variant="outline" onClick={prevStep}>
                Previous
              </Button>
            )}
            <Button fullWidth onClick={step === 4 ? nextStep : nextStep}>
              {step === 4 ? 'View Summary' : 'Next'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
