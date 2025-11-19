import { useState } from 'react';
import { Heart, Award, Globe, DollarSign } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import ProgressBar from '../components/ProgressBar';
import Input from '../components/Input';
import Accordion from '../components/Accordion';

interface IkigaiMethodProps {
  onBack: () => void;
}

interface FormData {
  love1: string;
  love2: string;
  love3: string;
  good1: string;
  good2: string;
  good3: string;
  need1: string;
  need2: string;
  need3: string;
  paid1: string;
  paid2: string;
  paid3: string;
}

const jobRoles = [
  {
    title: 'UX/UI Designer',
    description: 'Create intuitive and beautiful digital experiences',
    indiaScope: 'Growing demand in tech hubs like Bangalore, Mumbai, and Pune',
    abroadScope: 'High demand in US, UK, and European markets',
    challenges: 'Staying updated with design trends and tools'
  },
  {
    title: 'Product Manager',
    description: 'Lead product strategy and development from concept to launch',
    indiaScope: 'Expanding opportunities in startups and established tech companies',
    abroadScope: 'Excellent prospects in Silicon Valley and major tech cities',
    challenges: 'Balancing stakeholder needs and technical constraints'
  },
  {
    title: 'Data Scientist',
    description: 'Extract insights from complex data to drive business decisions',
    indiaScope: 'High demand across industries including finance, healthcare, and e-commerce',
    abroadScope: 'Premium opportunities in tech giants and research institutions',
    challenges: 'Continuous learning in rapidly evolving field'
  }
];

export default function IkigaiMethod({ onBack }: IkigaiMethodProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    love1: '',
    love2: '',
    love3: '',
    good1: '',
    good2: '',
    good3: '',
    need1: '',
    need2: '',
    need3: '',
    paid1: '',
    paid2: '',
    paid3: ''
  });

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  if (step === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="p-12">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Heart className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Discover Your Ikigai
              </h1>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                What is Ikigai?
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6 text-center max-w-2xl mx-auto">
                Ikigai is a Japanese concept meaning "reason for being." It's the intersection of
                what you love, what you're good at, what the world needs, and what you can be paid
                for.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mt-8">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <Heart className="w-6 h-6 text-red-500" />
                    <h3 className="font-bold text-gray-900">What You Love</h3>
                  </div>
                  <p className="text-sm text-gray-600">Your passion and interests</p>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="w-6 h-6 text-blue-500" />
                    <h3 className="font-bold text-gray-900">What You're Good At</h3>
                  </div>
                  <p className="text-sm text-gray-600">Your skills and talents</p>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <Globe className="w-6 h-6 text-green-500" />
                    <h3 className="font-bold text-gray-900">What the World Needs</h3>
                  </div>
                  <p className="text-sm text-gray-600">Problems you can solve</p>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <DollarSign className="w-6 h-6 text-purple-500" />
                    <h3 className="font-bold text-gray-900">What You Can Be Paid For</h3>
                  </div>
                  <p className="text-sm text-gray-600">Market opportunities</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Button variant="ghost" onClick={onBack}>
                Back to Home
              </Button>
              <Button size="lg" onClick={nextStep}>
                Begin Discovery
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (step === 5) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Your Ikigai Analysis
            </h1>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Ikigai Overlap Summary
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Based on your responses, your strongest alignment appears in areas that combine
                  creative problem-solving with technical skills, driven by a desire to make
                  meaningful impact in people's lives while maintaining sustainable income.
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Strongest Career Themes
                </h2>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold">•</span>
                    <span>Technology and Innovation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold">•</span>
                    <span>User-Centered Design and Experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold">•</span>
                    <span>Strategic Thinking and Problem-Solving</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Top 3 Career Directions
                </h2>
                <div className="space-y-3">
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <h3 className="font-bold text-gray-900">Digital Product Design</h3>
                    <p className="text-sm text-gray-600">
                      Create user experiences that solve real problems
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <h3 className="font-bold text-gray-900">Technology Consulting</h3>
                    <p className="text-sm text-gray-600">
                      Help organizations transform through technology
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <h3 className="font-bold text-gray-900">Data-Driven Innovation</h3>
                    <p className="text-sm text-gray-600">
                      Use insights to drive business growth
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Top 10 Job Roles for You
                </h2>
                <div className="space-y-3">
                  {jobRoles.map((role, index) => (
                    <Accordion key={index} title={`${index + 1}. ${role.title}`}>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Description</h4>
                          <p className="text-gray-700">{role.description}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">
                            Scope in India
                          </h4>
                          <p className="text-gray-700">{role.indiaScope}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">
                            Scope Abroad
                          </h4>
                          <p className="text-gray-700">{role.abroadScope}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Challenges</h4>
                          <p className="text-gray-700">{role.challenges}</p>
                        </div>
                        <div className="bg-blue-50 rounded-xl p-3">
                          <h4 className="font-semibold text-gray-900 mb-1">
                            Preparation Steps
                          </h4>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Build portfolio projects</li>
                            <li>• Gain relevant certifications</li>
                            <li>• Network with industry professionals</li>
                          </ul>
                        </div>
                      </div>
                    </Accordion>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4 justify-center">
              <Button variant="outline" onClick={onBack}>
                Back to Home
              </Button>
              <Button size="lg">
                Download Analysis
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
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">What You Love</h2>
                  <p className="text-gray-600">Your passions and interests</p>
                </div>
              </div>

              <Input
                label="1. What activities make you lose track of time?"
                value={formData.love1}
                onChange={(val) => updateField('love1', val)}
                placeholder="Describe activities that deeply engage you..."
                multiline
                rows={3}
              />

              <Input
                label="2. What topics can you talk about for hours?"
                value={formData.love2}
                onChange={(val) => updateField('love2', val)}
                placeholder="List subjects that genuinely excite you..."
                multiline
                rows={3}
              />

              <Input
                label="3. What would you do even if you weren't paid?"
                value={formData.love3}
                onChange={(val) => updateField('love3', val)}
                placeholder="What brings you joy regardless of compensation..."
                multiline
                rows={3}
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">What You're Good At</h2>
                  <p className="text-gray-600">Your skills and natural talents</p>
                </div>
              </div>

              <Input
                label="1. What do people often compliment you on?"
                value={formData.good1}
                onChange={(val) => updateField('good1', val)}
                placeholder="Skills or abilities others recognize in you..."
                multiline
                rows={3}
              />

              <Input
                label="2. What comes naturally to you that others find difficult?"
                value={formData.good2}
                onChange={(val) => updateField('good2', val)}
                placeholder="Tasks or abilities that feel effortless to you..."
                multiline
                rows={3}
              />

              <Input
                label="3. What have you practiced and mastered over time?"
                value={formData.good3}
                onChange={(val) => updateField('good3', val)}
                placeholder="Skills you've developed through dedication..."
                multiline
                rows={3}
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">What the World Needs</h2>
                  <p className="text-gray-600">Problems worth solving</p>
                </div>
              </div>

              <Input
                label="1. What problems do you notice that frustrate you?"
                value={formData.need1}
                onChange={(val) => updateField('need1', val)}
                placeholder="Issues in society or your community that concern you..."
                multiline
                rows={3}
              />

              <Input
                label="2. What causes or missions resonate with you?"
                value={formData.need2}
                onChange={(val) => updateField('need2', val)}
                placeholder="Social, environmental, or human needs you care about..."
                multiline
                rows={3}
              />

              <Input
                label="3. Who would benefit most from your contributions?"
                value={formData.need3}
                onChange={(val) => updateField('need3', val)}
                placeholder="Groups or communities you want to help..."
                multiline
                rows={3}
              />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    What You Can Be Paid For
                  </h2>
                  <p className="text-gray-600">Market opportunities</p>
                </div>
              </div>

              <Input
                label="1. What services or products do people pay others for?"
                value={formData.paid1}
                onChange={(val) => updateField('paid1', val)}
                placeholder="Market demands you've observed..."
                multiline
                rows={3}
              />

              <Input
                label="2. What skills are employers actively seeking?"
                value={formData.paid2}
                onChange={(val) => updateField('paid2', val)}
                placeholder="In-demand capabilities in your areas of interest..."
                multiline
                rows={3}
              />

              <Input
                label="3. Where do your abilities meet market needs?"
                value={formData.paid3}
                onChange={(val) => updateField('paid3', val)}
                placeholder="Intersection of your skills and paid opportunities..."
                multiline
                rows={3}
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
              {step === 4 ? 'View Analysis' : 'Next'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
