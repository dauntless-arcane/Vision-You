import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch-native";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// 🚀 AI Route
app.post("/api/visionyou", async (req, res) => {
  const { formData } = req.body;

  const prompt = `
You MUST output ONLY valid JSON (no markdown, no text outside JSON).
Follow this structure EXACTLY — do NOT change keys or remove fields.

{
  "visionYouSummary": {
    "identity": {
      "coreValues": ["value1","value2"],
      "jobTitle": "",
      "industry": "",
      "adjectives": ["a","b","c"]
    },
    "skills": {
      "exceptionalSkills": ["skill1","skill2"],
      "futureSkills": ["skill1","skill2"],
      "superpower": ""
    },
    "lifestyle": {
      "priorities": ["p1","p2"],
      "dreamActivities": ["a1","a2"],
      "impact": "",
      "beneficiaries": ["b1","b2"],
      "workdayFeeling": ""
    },
    "futureMessage": ""
  },

  "careerPaths": [
    {
      "title": "",
      "whyFit": "",
      "scopeIndia": "",
      "scopeAbroad": "",
      "challenges": ["c1","c2"],
      "preparation": ["p1","p2"]
    }
  ],

  "roadmap": {
    "sixMonths": ["step1","step2"],
    "twelveMonths": ["step1","step2"],
    "twentyFourMonths": ["step1","step2"]
  }
}

Now fill in meaningful values using the user's answers:

${JSON.stringify(formData, null, 2)}

IMPORTANT RULES:
- ABSOLUTELY NO strings allowed inside "careerPaths" array — MUST be objects exactly as defined.
- Arrays must not be empty.
- Keys must not be renamed.
- Output MUST be valid JSON. Do NOT wrap with \`\`\`json.
  `;

  try {
    const aiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const result = await aiRes.json();
    const raw = result.choices?.[0]?.message?.content || "{}";

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (err) {
      console.error("JSON parse error:", err);
      return res.json({ error: "AI response not valid JSON", raw });
    }

    res.json(parsed);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server failed" });
  }
});
app.post("/api/ikigai", async (req, res) => {
  const formData = req.body;

  const prompt = `
You are an Ikigai career expert. 
You MUST output ONLY valid JSON that matches EXACTLY this structure:

{
  "ikigaiSummary": {
    "passion": ["", ""],
    "strengths": ["", ""],
    "marketNeeds": ["", ""],
    "earningOpportunities": ["", ""],
    "overlap": ""
  },
  "careerThemes": ["", ""],
  "topCareerDirections": [
    {
      "title": "",
      "reason": ""
    }
  ],
  "jobRoles": [
    {
      "title": "",
      "description": "",
      "scopeIndia": "",
      "scopeAbroad": "",
      "challenges": ["", ""],
      "preparation": ["", ""]
    }
  ]
}

🛑 RULES (MUST FOLLOW):
- ZERO text outside JSON.
- DO NOT change the key names.
- Arrays MUST contain strings, not objects (except the defined objects in topCareerDirections & jobRoles).
- jobRoles MUST be an array of role objects, not strings.
- ALWAYS output at least 3 jobRoles.
- NEVER output markdown.
- NEVER wrap JSON in \`\`\`.

Now generate the Ikigai results based on the user's answers:

${JSON.stringify(formData, null, 2)}
`;

  try {
    const aiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8,
      }),
    });

    const json = await aiRes.json();
    const raw = json.choices?.[0]?.message?.content || "{}";

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (err) {
      console.error("AI returned invalid JSON. Falling back to mock.", err);
      return res.json({ error: "INVALID_JSON", raw });
    }

    return res.json(parsed);
  } catch (err) {
    console.error("Ikigai API error:", err);
    return res.status(500).json({ error: "SERVER_FAILURE" });
  }
});
app.post("/api/career-tasks", async (req, res) => {
  const { selectedTasks } = req.body;

  const tasksList = [
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
    "User experience testing"
  ];

  const selected = selectedTasks.map(i => tasksList[i]);

  const prompt = `
You must output ONLY valid JSON in this exact structure:

{
  "careers": [
    {
      "title": "",
      "whyFit": "",
      "scopeIndia": "",
      "scopeAbroad": "",
      "futureGrowth": "",
      "similarCareers": ["a","b","c"]
    }
  ]
}

User-selected tasks:
${JSON.stringify(selected, null, 2)}

Rules:
- No markdown.
- No explanation.
- No text outside JSON.
- ALWAYS return an array of 5 careers.
  `;

  try {
    const aiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8
      })
    });

    const raw = await aiRes.json();
    const content = raw.choices[0].message.content;

    res.json(JSON.parse(content));
  } catch (e) {
    console.error(e);
    res.json({ error: "AI_ERROR" });
  }
});



// 🟢 Start backend on port 5000
app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
