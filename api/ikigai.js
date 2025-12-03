import fetch from "node-fetch-native";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

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

    try {
      return res.json(JSON.parse(raw));
    } catch {
      return res.json({ error: "INVALID_JSON", raw });
    }
  } catch (err) {
    return res.status(500).json({ error: "SERVER_FAILURE" });
  }
}
