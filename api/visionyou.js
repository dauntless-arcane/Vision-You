import fetch from "node-fetch-native";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

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

    try {
      return res.json(JSON.parse(raw));
    } catch {
      return res.json({ error: "AI response not valid JSON", raw });
    }
  } catch (error) {
    return res.status(500).json({ error: "Server failed" });
  }
}
