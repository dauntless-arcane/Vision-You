import { Award, DollarSign, Globe, Heart } from "lucide-react";
import { useState } from "react";
import Accordion from "../components/Accordion";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import ProgressBar from "../components/ProgressBar";

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

export default function IkigaiMethod({ onBack }: IkigaiMethodProps) {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  // Ikigai FINAL AI Result
  const [ikigaiResult, setIkigaiResult] = useState<any>(null);

  // ---------------------------------------------------------------------
  //  HARD-CODED MOCK IKIGAI JSON 
  // ---------------------------------------------------------------------
  /*
  const mockIkigaiData = {
    ikigaiSummary: {
      passion: ["Design", "Helping Others", "Creating Solutions"],
      strengths: ["Communication", "Analytical Thinking", "Problem Solving"],
      marketNeeds: ["Better digital experiences", "Accessible education tools"],
      earningOpportunities: ["Tech design roles", "Consulting", "Data roles"],
      overlap:
        "Your Ikigai lies at the intersection of human-centered design, problem solving, and impactful digital innovation.",
    },

    careerThemes: [
      "User-Centered Digital Innovation",
      "Creative Technology",
      "Strategic Problem-Solving for Impact",
    ],

    topCareerDirections: [
      {
        title: "Digital Product Design",
        reason:
          "You love creativity, you're good at problem solving, and the world needs better digital experiences.",
      },
      {
        title: "Tech Consulting",
        reason:
          "Combines your strengths with high-impact opportunities and strong earning potential.",
      },
      {
        title: "Data-Driven Innovation",
        reason:
          "Blends analytical skills with meaningful, future-proof market demand.",
      },
    ],

    jobRoles: [
      {
        title: "UX/UI Designer",
        description:
          "Design intuitive digital products that solve real user problems.",
        scopeIndia:
          "Huge demand across startups, SaaS companies, and IT hubs like Bangalore, Pune, Hyderabad.",
        scopeAbroad:
          "Strong opportunities in US, Canada, UK, Germany — remote work also rising.",
        challenges: [
          "High competition",
          "Need strong portfolio",
          "Rapidly evolving tools",
        ],
        preparation: [
          "Master Figma",
          "Make 3+ case studies",
          "Follow top designers & trends",
        ],
      },
      {
        title: "Product Manager",
        description:
          "Own product strategy, user value, and business alignment.",
        scopeIndia:
          "Expanding demand in unicorn startups and enterprise-level tech firms.",
        scopeAbroad:
          "High-paying PM roles in US, UK, EU; remote-first PM roles increasing.",
        challenges: [
          "High responsibility",
          "Needs cross-team leadership",
          "Strong business understanding",
        ],
        preparation: [
          "Learn product frameworks",
          "Build roadmap samples",
          "Intern under a PM",
        ],
      },
      {
        title: "Data Analyst",
        description:
          "Interpret data to help businesses make informed decisions.",
        scopeIndia:
          "Growing demand in fintech, edtech, healthcare, e-commerce.",
        scopeAbroad:
          "Shortage of skilled talent in US, UK, Germany, Singapore.",
        challenges: ["Math required", "Complex datasets", "Continuous learning"],
        preparation: [
          "Learn SQL + Python",
          "Do real dashboards (Power BI/Tableau)",
          "Intern in analytics",
        ],
      },
    ],
  };*/

  // ---------------------------------------------------------------------
  // 🔥 PARSER — If AI returns plain text JSON → convert safely
  // ---------------------------------------------------------------------
  const parseIkigaiResponse = (data: any) => {
    if (typeof data === "object") return data;

    try {
      return JSON.parse(data);
    } catch {
      console.warn("AI response not valid JSON.");
      return null;
    }
  };

  // ---------------------------------------------------------------------
  // 🔥 API CALL → If fails → use mock JSON
  // ---------------------------------------------------------------------
  const generateIkigai = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/ikigai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("API failed");

      const raw = await res.json();
      const parsed = parseIkigaiResponse(raw);

      setIkigaiResult(parsed);
    }catch (err) {
      console.error("Ikigai API Error:", err);
      setIkigaiResult(null);
    }


    setLoading(false);
  };

  const [formData, setFormData] = useState<FormData>({
    love1: "",
    love2: "",
    love3: "",
    good1: "",
    good2: "",
    good3: "",
    need1: "",
    need2: "",
    need3: "",
    paid1: "",
    paid2: "",
    paid3: "",
  });

  const updateField = (field: keyof FormData, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  // ---------------------------------------------------------------------
  // STEP 0 – Landing Page
  // ---------------------------------------------------------------------
  if (step === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Heart className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Discover Your Ikigai
            </h1>

            <p className="text-gray-700 leading-relaxed mb-6 max-w-2xl mx-auto">
              Ikigai is a Japanese concept that means “a reason for being.” It helps you find purpose by combining what you love, what you're good at, what the world needs, and what you can be paid for.
This Ikigai diagram helps you explore your purpose by reflecting on four areas . By filling in each circle, you discover where all four overlap. This overlap is your potential career direction and personal purpose. Use this exercise to understand yourself better and make meaningful choices for your future.

            </p>

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

// ---------------------------------------------------------------------
// STEP 5 – FULL IKIGAI ANALYSIS (AI ONLY, NO STATIC DATA)
// ---------------------------------------------------------------------
if (step === 5) {
  const data = ikigaiResult;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Your Ikigai Analysis
          </h1>

          {/* Loading */}
          {loading && (
            <div className="p-4 bg-blue-100 rounded-xl text-center text-blue-800 mb-4">
              Generating your personalized Ikigai analysis...
            </div>
          )}

          {/* No AI Result Yet */}
          {!data && !loading && (
            <div className="p-4 bg-gray-100 rounded-xl text-center text-gray-700 mb-6">
              <strong>Please Click “Generate Analysis” to continue.</strong> 
            </div>
          )}

          {/* AI RESULTS */}
          {data && (
            <>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl mb-8">
                <h2 className="text-xl font-bold mb-3">Ikigai Overlap Summary</h2>
                <p className="text-gray-700">{data.ikigaiSummary.overlap}</p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl mb-8">
                <h2 className="text-xl font-bold mb-3">Strongest Career Themes</h2>
                <ul className="list-disc list-inside text-gray-700">
                  {data.careerThemes.map((t: string, i: number) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-r from-pink-50 to-blue-50 p-6 rounded-2xl mb-8">
                <h2 className="text-xl font-bold mb-3">Top Career Directions</h2>
                <div className="space-y-3">
                  {data.topCareerDirections.map((c: any, i: number) => (
                    <div key={i} className="p-4 bg-white rounded-xl shadow-sm">
                      <h3 className="font-bold text-gray-900">{c.title}</h3>
                      <p className="text-gray-700">{c.reason}</p>
                    </div>
                  ))}
                </div>
              </div>

              <h2 className="text-xl font-bold mb-3">Top Job Roles</h2>

              {data.jobRoles.map((role: any, index: number) => (
                <Accordion key={index} title={`${index + 1}. ${role.title}`}>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-1">Description</h4>
                      <p>{role.description}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-1">Scope in India</h4>
                      <p>{role.scopeIndia}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-1">Scope Abroad</h4>
                      <p>{role.scopeAbroad}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-1">Challenges</h4>
                      <ul className="list-disc list-inside">
                        {role.challenges.map((c: string, i: number) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-xl">
                      <h4 className="font-semibold mb-1">Preparation Steps</h4>
                      <ul className="list-disc list-inside">
                        {role.preparation.map((c: string, i: number) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Accordion>
              ))}
            </>
          )}

          {/* BUTTONS */}
          <div className="mt-10 flex gap-4 justify-center">
            <Button variant="outline" onClick={onBack}>
              Back to Home
            </Button>
            <Button size="lg" onClick={generateIkigai} disabled={loading}>
              {loading ? "Generating..." : "Generate Analysis"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}


  // ---------------------------------------------------------------------
  // STEPS 1–4 (QUESTIONS)
  // ---------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <Card className="p-8">
          <div className="mb-8">
            <ProgressBar currentStep={step} totalSteps={4} />
          </div>

          {/* STEP 1 - LOVE */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <Heart className="text-red-500" /> What You Love
              </h2>

              <Input
                label="1. What activities make you lose track of time?"
                value={formData.love1}
                multiline
                rows={3}
                onChange={(v) => updateField("love1", v)}
              />

              <Input
                label="2. What topics can you talk about for hours?"
                value={formData.love2}
                multiline
                rows={3}
                onChange={(v) => updateField("love2", v)}
              />

              <Input
                label="3. What would you do even if you weren’t paid?"
                value={formData.love3}
                multiline
                rows={3}
                onChange={(v) => updateField("love3", v)}
              />
            </div>
          )}

          {/* STEP 2 - GOOD AT */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <Award className="text-blue-500" /> What You're Good At
              </h2>

              <Input
                label="1. What do people praise you for?"
                value={formData.good1}
                multiline
                rows={3}
                onChange={(v) => updateField("good1", v)}
              />

              <Input
                label="2. What comes naturally to you?"
                value={formData.good2}
                multiline
                rows={3}
                onChange={(v) => updateField("good2", v)}
              />

              <Input
                label="3. What have you mastered over time?"
                value={formData.good3}
                multiline
                rows={3}
                onChange={(v) => updateField("good3", v)}
              />
            </div>
          )}

          {/* STEP 3 - WORLD NEEDS */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <Globe className="text-green-500" /> What the World Needs
              </h2>

              <Input
                label="1. What problems frustrate you?"
                value={formData.need1}
                multiline
                rows={3}
                onChange={(v) => updateField("need1", v)}
              />

              <Input
                label="2. What causes matter to you?"
                value={formData.need2}
                multiline
                rows={3}
                onChange={(v) => updateField("need2", v)}
              />

              <Input
                label="3. Who benefits from your help?"
                value={formData.need3}
                multiline
                rows={3}
                onChange={(v) => updateField("need3", v)}
              />
            </div>
          )}

          {/* STEP 4 - PAID FOR */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <DollarSign className="text-purple-500" /> What You Can Be Paid For
              </h2>

              <Input
                label="1. What services do people commonly pay for?"
                value={formData.paid1}
                multiline
                rows={3}
                onChange={(v) => updateField("paid1", v)}
              />

              <Input
                label="2. What skills are in-demand?"
                value={formData.paid2}
                multiline
                rows={3}
                onChange={(v) => updateField("paid2", v)}
              />

              <Input
                label="3. Where do your abilities meet market needs?"
                value={formData.paid3}
                multiline
                rows={3}
                onChange={(v) => updateField("paid3", v)}
              />
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <Button variant="outline" onClick={prevStep}>
                Previous
              </Button>
            )}

            <Button fullWidth onClick={nextStep}>
              {step === 4 ? "View Analysis" : "Next"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
