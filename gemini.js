const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function analyzeResume(resumeText, jobProfile, type) {

    const prompt = `
You are an ATS resume evaluator.
Give feedback according to the user's level.

LEVEL:
${type}

JOB PROFILE:
${jobProfile}

RESUME TEXT:
${resumeText}

TASK:
1. Give ATS match percentage (0-100)
2. List missing skills
3. Suggest exact improvements
4. Suggest edited bullet points

Respond ONLY in valid JSON:
{
  "matchPercentage": number,
  "missingSkills": ["string"],
  "improvements": ["string"],
  "editedSuggestions": ["string"]
}
`;

    try {
        const result = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: [
                {
                    role: "user",
                    parts: [{ text: prompt }]
                }
            ],
            generationConfig: {
                responseMimeType: "application/json"
            }
        });

        // ✅ MUST be let (we modify it)
        let responseText =
            result.candidates[0].content.parts[0].text;

        // ✅ CLEAN markdown garbage
        responseText = responseText
            .replace(/```json/gi, "")
            .replace(/```/g, "")
            .trim();
        
        console.log("AI JSON:", responseText);

        return JSON.parse(responseText);

    } catch (error) {
        console.error("Gemini error:", error);
        throw error;
    }
}

module.exports = analyzeResume;
