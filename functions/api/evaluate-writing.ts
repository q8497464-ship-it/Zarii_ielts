// Cloudflare Pages Function / Serverless API Route: /api/evaluate-writing

interface Env {
  GEMINI_API_KEY?: string;
  GROQ_API_KEY?: string;
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  try {
    const { request, env } = context;
    const body = await request.json() as { essayText: string; prompt: any };
    const { essayText, prompt } = body;

    if (!essayText || !prompt) {
      return new Response(JSON.stringify({ error: 'Missing essayText or prompt' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const geminiKey = env.GEMINI_API_KEY;
    const groqKey = env.GROQ_API_KEY;

    // Call Gemini if key exists
    if (geminiKey) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;
      const payload = {
        contents: [
          {
            role: 'user',
            parts: [{
              text: `You are a certified IELTS Examiner. Evaluate this writing submission strictly against official IELTS descriptors.\n\nPrompt: ${prompt.promptText}\n\nEssay:\n${essayText}\n\nRespond ONLY with a JSON object containing overallBand, criteria (taskAchievement, coherenceAndCohesion, lexicalResource, grammaticalRangeAndAccuracy), strengths, weaknesses, errors, vocabUpgrades, improvedParagraph.`
            }],
          },
        ],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: 'application/json',
        },
      };

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json() as any;
        const textOutput = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (textOutput) {
          const parsed = JSON.parse(textOutput);
          return new Response(JSON.stringify({ ...parsed, evaluationMode: 'gemini' }), {
            headers: { 'Content-Type': 'application/json' },
          });
        }
      }
    }

    return new Response(JSON.stringify({ error: 'No serverless AI keys configured' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
