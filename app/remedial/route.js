import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req) {
  try {
    const { wrongQuestions } = await req.json();

    if (!wrongQuestions || wrongQuestions.length === 0) {
      return NextResponse.json({ error: "No wrong questions found!" }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    You are an expert JEE tutor. A student has incorrectly answered or skipped these questions:
    ${JSON.stringify(wrongQuestions)}

    Analyze the underlying concepts of these specific questions. 
    Generate exactly 15 BRAND NEW, unique, and slightly easier questions based ONLY on these weak subtopics to rebuild the student's confidence.
    Mix MCQs and INTEGER types. Ensure mathematical equations use standard LaTeX (use $ for inline, $$ for block).

    Return ONLY a JSON array in this EXACT format (no markdown or extra text):
    [
      {
        "id": 1,
        "subject": "Physics", 
        "type": "MCQ",
        "text": "New Question text...",
        "options": ["A", "B", "C", "D"],
        "correctAnswer": "A",
        "solution": "Step-by-step solution...",
        "youtubeLink": "https://www.youtube.com/results?search_query=..."
      }
    ]
    `;

    const result = await model.generateContent(prompt);
    const aiResponse = await result.response.text();
    
    const cleanJson = aiResponse.replace(/```json/g, "").replace(/```/g, "").trim();
    const generatedQs = JSON.parse(cleanJson);

    return NextResponse.json({ success: true, questions: generatedQs });

  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}