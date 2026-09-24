import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: "Bhai, koi PDF file nahi aayi!" }, { status: 400 });
    }

    // PDF ko Base64 mein convert karna taaki AI image/diagrams padh sake
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Data = buffer.toString("base64");

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // NAYA PROMPT: Full Paper, Solutions aur YouTube link ke sath
    const prompt = `
    You are an expert JEE Exam creator. I am providing a JEE Question Paper PDF file directly.
    Read the PDF, understand the diagrams, and extract ALL the questions available in the paper (up to 75 questions).
    
    For EACH question, you must also generate:
    1. A step-by-step detailed solution using standard LaTeX for math.
    2. A highly targeted YouTube search link to find the video explanation for this specific topic/question. (Format: https://www.youtube.com/results?search_query=topic+jee+solution)

    Identify if it is a multiple choice question (MCQ) or an INTEGER type.
    
    CRITICAL INSTRUCTION FOR MATHS: 
    For any mathematical equations, formulas, or symbols, MUST use standard LaTeX format. 
    Use $ for inline math (e.g., $x^2 + y^2 = r^2$) and $$ for display math.
    
    Return ONLY a JSON array in this EXACT format, no markdown or extra text:
    [
      {
        "id": 1,
        "subject": "Physics", 
        "type": "MCQ",
        "text": "The actual question text goes here...",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": "Option A",
        "solution": "Step 1: First we use the formula $F = ma$... Step 2: ...",
        "youtubeLink": "https://www.youtube.com/results?search_query=Newton+laws+of+motion+jee+advanced+solution"
      }
    ]
    
    Note: 
    - If it's an INTEGER question, keep options as an empty array [] and set correctAnswer to the numerical value.
    - DO NOT truncate. Extract as many questions as you can process from the PDF.
    `;

    // AI ko PDF file aur naya order bhejna
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Data,
          mimeType: "application/pdf"
        }
      }
    ]);

    const aiResponse = await result.response.text();
    
    // JSON ko clean karna
    const cleanJson = aiResponse.replace(/```json/g, "").replace(/```/g, "").trim();
    const questionsArray = JSON.parse(cleanJson);

    return NextResponse.json({ success: true, questions: questionsArray });

  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}