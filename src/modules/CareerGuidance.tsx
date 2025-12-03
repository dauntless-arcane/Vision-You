import { ClipboardCheck } from "lucide-react";
import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";

interface CareerGuidanceProps {
  onBack: () => void;
}

const tasks = [
  "Analyzing data and finding patterns",
  "Writing and editing content",
  "Creating visual designs",
  "Teaching or explaining concepts",
  "Building or fixing things",
  "Organizing events or projects",
  "Solving technical problems",
  "Helping people with their problems",
  "Conducting research",
  "Public speaking or presentations",
  "Managing teams or people",
  "Creating social media content",
  "Coding or programming",
  "Drawing or illustrating",
  "Planning strategies",
  "Customer service interactions",
  "Financial analysis or budgeting",
  "Video editing or production",
  "Marketing and promotion",
  "Scientific experiments",
  "Writing reports or documentation",
  "Negotiating deals",
  "Cooking or food preparation",
  "Graphic design work",
  "Database management",
  "Counseling or mentoring",
  "Event photography",
  "Network administration",
  "Creative writing",
  "Sales and persuasion",
  "Quality testing",
  "Interior decorating",
  "Music composition",
  "Legal research",
  "Project coordination",
  "Translation work",
  "SEO optimization",
  "Physical fitness training",
  "Environmental conservation",
  "Medical care activities",
  "Fashion styling",
  "Architecture planning",
  "Animation creation",
  "Supply chain logistics",
  "User experience testing",
];

/*const staticJobMatches = [
  {
    title: "UX Researcher",
    matchedTasks: [1, 9, 12, 45],
    description:
      "Conduct user research to understand behaviors, needs, and motivations.",
    indiaScope:
      "Growing field in major tech hubs with increasing awareness of UX.",
    abroadScope:
      "Highly valued in US, UK, and European tech companies with strong salaries.",
    futureGrowth:
      "Expected to grow 20% over the next 5 years as digital products evolve.",
    similarCareers: [
      "Product Designer",
      "User Experience Designer",
      "Usability Analyst",
    ],
  },
  {
    title: "Content Strategist",
    matchedTasks: [2, 19, 21, 37],
    description:
      "Plan and manage content across digital platforms to engage audiences.",
    indiaScope: "Strong demand in marketing agencies and media companies.",
    abroadScope:
      "Established role with opportunities in marketing firms & corporate teams.",
    futureGrowth: "Steady growth as content remains essential in business.",
    similarCareers: [
      "Digital Marketing Manager",
      "Social Media Strategist",
      "Content Marketing Manager",
    ],
  },
  {
    title: "Data Analyst",
    matchedTasks: [0, 6, 16, 24],
    description:
      "Analyze data to help organizations make informed decisions.",
    indiaScope: "Huge demand across IT, finance, healthcare, and e-commerce.",
    abroadScope:
      "Great opportunities with competitive compensation globally.",
    futureGrowth: "Among the fastest-growing careers with 25% projected growth.",
    similarCareers: [
      "Business Intelligence Analyst",
      "Data Scientist",
      "Analytics Consultant",
    ],
  },
];*/

export default function CareerGuidance({ onBack }: CareerGuidanceProps) {
  const [step, setStep] = useState(0);
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);

  const toggleTask = (index: number) => {
    setSelectedTasks((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const handleSubmit = () => setStep(2);

  // ------------------------- AI FUNCTION -------------------------
  const generateAI = async () => {
    setLoading(true);
    setAiResult(null);

    try {
      const res = await fetch("/api/career-tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selectedTasks }),
      });

      const json = await res.json();

      if (json?.careers) {
        setAiResult(json);
      } else {
        console.warn("Invalid AI response, ignoring.");
      }
    } catch (err) {
      console.error("AI Career Error:", err);
    }

    setLoading(false);
  };

  // ------------------------- STEP 0 -------------------------
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
            <p className="text-lg text-gray-600 mb-8">
              Discover careers based on the tasks you naturally enjoy.
            </p>
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

  // ------------------------- STEP 1 -------------------------
  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="p-8">
            <h2 className="text-3xl font-bold">Select Tasks You Enjoy</h2>
            <p className="text-gray-600 mb-6">
              Choose as many as you like — {selectedTasks.length} selected
            </p>

            <div className="grid md:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto p-2">
              {tasks.map((task, index) => (
                <button
                  key={index}
                  onClick={() => toggleTask(index)}
                  className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                    selectedTasks.includes(index)
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-purple-300"
                  }`}
                >
                  <span className="text-gray-900 font-medium">{task}</span>
                </button>
              ))}
            </div>

            <div className="mt-6 flex gap-4">
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
          </Card>
        </div>
      </div>
    );
  }

  // ------------------------- STEP 2 — RESULTS -------------------------
return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12">
    <div className="max-w-4xl mx-auto px-4">
      <Card className="p-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          Your Career Matches
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Based on {selectedTasks.length} selected tasks
        </p>

        {/* LOADING */}
        {loading && (
          <div className="p-4 bg-blue-100 rounded-xl text-center text-blue-700 mb-6">
            Generating AI-powered career suggestions...
          </div>
        )}

        {/* ---------------- AI RESULTS ONLY (removed static data) ---------------- */}
        {!aiResult?.careers && !loading && (
          <div className="p-4 bg-gray-100 rounded-xl text-center text-gray-600 mb-6">
            No AI results yet. Click below to generate your personalized career analysis.
          </div>
        )}

        {aiResult?.careers && (
          <div className="space-y-6 mt-8">
            <h2 className="text-xl font-bold text-center">
              AI Suggested Careers
            </h2>

            {aiResult.careers.map((item: any, idx: number) => (
              <Card key={idx} className="p-6 hover:shadow-xl">
                <h2 className="text-2xl font-bold">{item.title}</h2>

                <p className="mt-2">
                  <strong>Why Fit:</strong> {item.whyFit}
                </p>

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <strong>Scope in India:</strong>
                    <p>{item.scopeIndia}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-xl">
                    <strong>Scope Abroad:</strong>
                    <p>{item.scopeAbroad}</p>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-xl mt-4">
                  <strong>Future Growth:</strong>
                  <p>{item.futureGrowth}</p>
                </div>

                <div className="mt-4">
                  <strong>Similar Careers:</strong>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {item.similarCareers.map((c: string, i: number) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* BUTTONS */}
        <div className="mt-10 flex gap-4 justify-center">
          <Button variant="outline" onClick={() => setStep(1)}>
            Adjust Tasks
          </Button>
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
