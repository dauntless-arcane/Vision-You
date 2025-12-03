import fetch from "node-fetch-native";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { selectedTasks } = req.body;

  const tasksList = [
    "Analyzing data and finding patterns", "Writing and editing content",
    "Creating visual designs", "Teaching or explaining concepts",
    "Building or fixing things", "Organizing events or projects",
    "Solving technical problems", "Helping people with their problems",
    "Conducting research", "Public speaking or presentations",
    "Managing teams or people", "Creating social media content",
    "Coding or programming", "Drawing or illustrating",
    "Planning strategies", "Customer service interactions",
    "Financial analysis or budgeting", "Video editing or production",
    "Marketing and promotion", "Scientific experiments",
    "Writing reports or documentation", "Negotiating deals",
    "Cooking or food preparation", "Graphic design work",
    "Database management", "Counseling or mentoring",
    "Event photography", "Network administration",
    "Creative writing", "Sales and persuasion",
    "Quality testing", "Interior decorating",
    "Music composition", "Legal research",
    "Project coordination", "Translation work",
    "SEO optimization", "Physical fitness training",
    "Environmental conservation", "Medical care activities",
    "Fashion styling", "Architecture planning",
    "Animation creation", "Supply chain logistics",
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

    return res.json(JSON.parse(content));
  } catch (error) {
    return res.json({ error: "AI_ERROR" });
  }
}
