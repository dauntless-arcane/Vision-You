import { Sparkles } from "lucide-react";
import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import ProgressBar from "../components/ProgressBar";

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

export default function VisionYouBlueprint({
  onBack,
}: VisionYouBlueprintProps) {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  // aiResult now stores JSON, not just string
  const [aiResult, setAIResult] = useState<any>(null);

  // Mock data fallback
  /*const mockData = {
    visionYouSummary: {
      identity: {
        coreValues: ["Integrity", "Creativity", "Growth"],
        jobTitle: "UI/UX Designer",
        industry: "Technology",
        adjectives: ["Creative", "Empathetic", "Focused"]
      },
      skills: {
        exceptionalSkills: ["Design thinking", "User research"],
        futureSkills: ["Prototyping", "Motion design"],
        superpower: "Turning complex ideas into simple visuals"
      },
      lifestyle: {
        priorities: ["Work–life balance", "Impact", "Continuous learning"],
        dreamActivities: ["Designing interfaces", "Collaborating with teams"],
        impact: "Creating meaningful digital experiences",
        beneficiaries: ["Students", "Young professionals"],
        workdayFeeling: "Fulfilled and inspired"
      },
      futureMessage: "My future self is proud that I chose design, because I followed my love for creativity, built strong skills in UI/UX, made an impact by improving digital experiences, and turned it into a career in product design."
    },
    careerPaths: [
      {
        title: "UI/UX Designer",
        whyFit: "Matches your creativity, empathy, and interest in digital experiences.",
        scopeIndia: "High demand in IT hubs like Bangalore, Chennai, Hyderabad.",
        scopeAbroad: "Strong demand in US, Germany, Canada.",
        challenges: ["Competition", "Keeping up with design trends"],
        preparation: ["Take UI/UX courses", "Build portfolio", "Join internships"]
      },
      {
        title: "Product Designer",
        whyFit: "Blends creativity with problem-solving skills.",
        scopeIndia: "Growing opportunities in startups and tech companies.",
        scopeAbroad: "High demand in global SaaS companies.",
        challenges: ["Ambiguous tasks", "Cross-team alignment"],
        preparation: ["Learn prototyping", "Study user psychology"]
      }
    ],
    roadmap: {
      sixMonths: ["Complete UI/UX course", "Start portfolio", "Do 1 real project"],
      twelveMonths: ["Internship", "Advanced Figma skills", "2 case studies"],
      twentyFourMonths: ["Full-time role", "Deep design specialization"]
    }
  };*/

  const [formData, setFormData] = useState<FormData>({
    coreValues: "",
    jobTitle: "",
    industry: "",
    adjectives: "",
    exceptionalSkills: "",
    futureSkills: "",
    superpower: "",
    priorities: "",
    dreamActivities: "",
    impact: "",
    beneficiaries: "",
    workdayFeeling: "",
    futureMessage: "",
  });

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  // -------- AI Fetch + Parse ----------
  const generateAI = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/visionyou", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData }),
      });

      if (!res.ok) {
        throw new Error("API request failed");
      }

      const data = await res.json();

      // Check if data exists and has the expected structure
      if (data && (data.careerPaths || data.roadmap || data.visionYouSummary)) {
        setAIResult(data);
      } else if (data.summary) {
        // If data comes as a summary string, try parsing it
        try {
          const parsed = JSON.parse(data.summary);
          setAIResult(parsed);
        } catch (e) {
          console.error("JSON parse error:", e);
          // Use mock data as fallback
          //setAIResult(mockData);
          setAIResult(null);
        }
      } else {
        // Use mock data if structure is unexpected
        //setAIResult(mockData);
        setAIResult(null);
      }
    } catch (err) {
      console.error("API Error:", err);
      // Use mock data as fallback
      //setAIResult(mockData);
      setAIResult(false);
    }

    setLoading(false);
  };

  // -----------------------------------------------------------------------
  // STEP 0 — INTRO PAGE
  // -----------------------------------------------------------------------
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
              Let's create your VisionYou — the future, upgraded version of you.
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

// -----------------------------------------------------------------------
// STEP 5 — FINAL SUMMARY PAGE (AI-Only)
// -----------------------------------------------------------------------
if (step === 5) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Your VisionYou Summary
          </h1>

          {/* ---------------------- USER-WRITTEN SUMMARY ---------------------- */}
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
              <h2 className="text-xl font-bold">Identity</h2>
              <p><strong>Core Values:</strong> {formData.coreValues}</p>
              <p><strong>Desired Job Title:</strong> {formData.jobTitle}</p>
              <p><strong>Industry:</strong> {formData.industry}</p>
              <p><strong>Adjectives:</strong> {formData.adjectives}</p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6">
              <h2 className="text-xl font-bold">Skills & Strengths</h2>
              <p><strong>Exceptional Skills:</strong> {formData.exceptionalSkills}</p>
              <p><strong>Future Skills:</strong> {formData.futureSkills}</p>
              <p><strong>Superpower:</strong> {formData.superpower}</p>
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-2xl p-6">
              <h2 className="text-xl font-bold">Lifestyle & Impact</h2>
              <p><strong>Priorities:</strong> {formData.priorities}</p>
              <p><strong>Dream Activities:</strong> {formData.dreamActivities}</p>
              <p><strong>Impact:</strong> {formData.impact}</p>
              <p><strong>Beneficiaries:</strong> {formData.beneficiaries}</p>
              <p><strong>Workday Feeling:</strong> {formData.workdayFeeling}</p>
            </div>

            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6">
              <h2 className="text-xl font-bold">Future-Self Message</h2>
              <p>{formData.futureMessage}</p>
            </div>

            {/* Placeholder for AI results */}
            <div className="bg-white border-2 border-blue-200 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">Recommended Career Paths</h2>

              {!aiResult && !loading && (
                <p className="text-gray-600 italic">
                  Click “Generate AI Analysis” below to receive personalized career
                  recommendations, scope insights, challenges, and a 6/12/24-month roadmap.
                </p>
              )}
            </div>
          </div>

          {/* ---------------------- LOADING ---------------------- */}
          {loading && (
            <div className="mt-6 p-4 bg-blue-100 rounded-xl text-center text-blue-800">
              Generating your VisionYou Analysis...
            </div>
          )}

          {/* ---------------------- EMPTY AI STATE ---------------------- */}
          {!loading && !aiResult && (
            <div className="mt-6 p-4 bg-gray-100 rounded-xl text-center text-gray-700">
              No AI analysis yet. Click “Generate AI Analysis” to continue.
            </div>
          )}

          {/* ---------------------- AI RESULT — CAREER PATHS ---------------------- */}
          {aiResult?.careerPaths && (
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 mt-8">
              <h2 className="text-xl font-bold mb-4">AI Career Paths</h2>

              {aiResult.careerPaths.map((path: any, idx: number) => (
                <div
                  key={idx}
                  className="p-4 bg-white border rounded-xl mb-4 shadow-sm"
                >
                  <h3 className="text-lg font-semibold">{path.title}</h3>

                  <p><strong>Why Fit:</strong> {path.whyFit}</p>
                  <p><strong>Scope India:</strong> {path.scopeIndia}</p>
                  <p><strong>Scope Abroad:</strong> {path.scopeAbroad}</p>

                  <p className="mt-2 font-semibold">Challenges:</p>
                  <ul className="list-disc list-inside">
                    {path.challenges.map((c: string, i: number) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>

                  <p className="mt-2 font-semibold">Preparation:</p>
                  <ul className="list-disc list-inside">
                    {path.preparation.map((prep: string, i: number) => (
                      <li key={i}>{prep}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* ---------------------- AI RESULT — ROADMAP ---------------------- */}
          {aiResult?.roadmap && (
            <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-6 mt-8">
              <h2 className="text-xl font-bold mb-4">Roadmap</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Next 6 Months</h3>
                  <ul className="list-disc list-inside">
                    {aiResult.roadmap.sixMonths.map((x: string, i: number) => (
                      <li key={i}>{x}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold">Next 12 Months</h3>
                  <ul className="list-disc list-inside">
                    {aiResult.roadmap.twelveMonths.map((x: string, i: number) => (
                      <li key={i}>{x}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold">Next 24 Months</h3>
                  <ul className="list-disc list-inside">
                    {aiResult.roadmap.twentyFourMonths.map((x: string, i: number) => (
                      <li key={i}>{x}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* ---------------------- BUTTONS ---------------------- */}
          <div className="mt-10 flex gap-4 justify-center">
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


  // -----------------------------------------------------------------------
  // STEPS 1–4 — FORM
  // -----------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <Card className="p-8">
          <div className="mb-8">
            <ProgressBar currentStep={step} totalSteps={4} />
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Step 1: Identity</h2>

              <Input
                label="What are your core values?"
                value={formData.coreValues}
                onChange={(v) => updateField("coreValues", v)}
                multiline
              />

              <Input
                label="Desired job title?"
                value={formData.jobTitle}
                onChange={(v) => updateField("jobTitle", v)}
              />

              <Input
                label="Industry?"
                value={formData.industry}
                onChange={(v) => updateField("industry", v)}
              />

              <Input
                label="3 adjectives"
                value={formData.adjectives}
                onChange={(v) => updateField("adjectives", v)}
              />
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Step 2: Skills</h2>

              <Input
                label="Exceptional skills"
                value={formData.exceptionalSkills}
                onChange={(v) => updateField("exceptionalSkills", v)}
                multiline
              />

              <Input
                label="Future skills (2 years)"
                value={formData.futureSkills}
                onChange={(v) => updateField("futureSkills", v)}
                multiline
              />

              <Input
                label="Your daily superpower"
                value={formData.superpower}
                onChange={(v) => updateField("superpower", v)}
                multiline
              />
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Step 3: Lifestyle</h2>

              <Input
                label="Top priorities"
                value={formData.priorities}
                onChange={(v) => updateField("priorities", v)}
                multiline
              />

              <Input
                label="Dream career day"
                value={formData.dreamActivities}
                onChange={(v) => updateField("dreamActivities", v)}
                multiline
              />

              <Input
                label="Impact you want to create"
                value={formData.impact}
                onChange={(v) => updateField("impact", v)}
                multiline
              />

              <Input
                label="Beneficiaries"
                value={formData.beneficiaries}
                onChange={(v) => updateField("beneficiaries", v)}
              />

              <Input
                label="Workday feeling"
                value={formData.workdayFeeling}
                onChange={(v) => updateField("workdayFeeling", v)}
              />
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">
                Step 4: Message to Your Future Self
              </h2>

              <Input
                label="Complete this sentence"
                value={formData.futureMessage}
                onChange={(v) => updateField("futureMessage", v)}
                multiline
                rows={6}
              />
            </div>
          )}

          {/* NAVIGATION BUTTONS */}
          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <Button variant="outline" onClick={prevStep}>
                Previous
              </Button>
            )}

            <Button fullWidth onClick={nextStep}>
              {step === 4 ? "View Summary" : "Next"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}