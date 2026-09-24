// @ts-nocheck
"use client";

import React, { useState, useEffect } from 'react';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

const NTA_COLORS = {
  NOT_VISITED: 'bg-gray-200 text-gray-700',
  NOT_ANSWERED: 'bg-red-500 text-white',
  ANSWERED: 'bg-green-500 text-white',
  MARKED_FOR_REVIEW: 'bg-purple-500 text-white',
  ANSWERED_AND_MARKED: 'bg-purple-700 text-white border-2 border-green-400 relative',
};

export default function JEESimulator() {
  const [testStarted, setTestStarted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false); 
  const [isGeneratingRemedial, setIsGeneratingRemedial] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0); 
  const [customTime, setCustomTime] = useState(180); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeSubject, setActiveSubject] = useState('Physics');
  const [responses, setResponses] = useState({});
  const [questions, setQuestions] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null); 
  const [keyboardWarning, setKeyboardWarning] = useState(false); 
  const [finalResult, setFinalResult] = useState(null);
  const [timeSpent, setTimeSpent] = useState({});
  const [showSolutions, setShowSolutions] = useState(false);

  const handleFileUpload = (e) => {
    if (e.target.files.length > 0) setUploadedFile(e.target.files[0]);
  };

  const startDemoTest = () => {
    let generatedQs = [];
    let idCounter = 1;
    ['Physics', 'Chemistry', 'Mathematics'].forEach(sub => {
      for(let i=1; i<=5; i++) {
        generatedQs.push({ 
          id: idCounter++, subject: sub, type: 'MCQ', 
          text: `[Demo] ${sub} Q${i}: Evaluate $ \\int_{0}^{\\pi} \\sin(x) \\, dx $`, 
          options: ['$0$', '$1$', '$2$', '$\\pi$'], correctAnswer: '$2$',
          solution: `Step 1: The integral of $\\sin(x)$ is $-\\cos(x)$. \n Step 2: Evaluate from $0$ to $\\pi$: $(-\\cos(\\pi)) - (-\\cos(0)) = (1) - (-1) = 2$.`,
          youtubeLink: `https://www.youtube.com/results?search_query=definite+integration+jee+solution`
        });
      }
      for(let i=1; i<=2; i++) {
        generatedQs.push({ 
          id: idCounter++, subject: sub, type: 'INTEGER', 
          text: `[Demo] ${sub} Num Q${i}: Enter '-5'`, correctAnswer: '-5',
          solution: `This is a demo solution for integer type. Answer is clearly -5.`,
          youtubeLink: `https://www.youtube.com/results?search_query=quadratic+equations+jee+solution`
        });
      }
    });
    setQuestions(generatedQs);
    setTimeLeft(180 * 60); 
    setTestStarted(true);
    setIsSubmitted(false);
    setActiveSubject('Physics');
  };

  const startTest = async () => {
    if (!uploadedFile) { alert("Bhai, pehle apna PDF Question Paper upload karo!"); return; }
    if (!customTime || customTime <= 0) { alert("Please enter a valid time!"); return; }
    setIsExtracting(true); 
    try {
      const formData = new FormData();
      formData.append('file', uploadedFile);
      const res = await fetch('/api/extract', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) {
        setQuestions(data.questions);
        setTimeLeft(customTime * 60); 
        setTestStarted(true);
        setIsSubmitted(false);
        setActiveSubject(data.questions[0]?.subject || 'Physics');
      } else { alert("AI Error: " + data.error); }
    } catch (error) { alert("Server Error: " + error.message); } 
    finally { setIsExtracting(false); }
  };

  const startRevisionTest = () => {
    const wrongQs = questions.filter(q => responses[q.id]?.value !== q.correctAnswer);
    if (wrongQs.length === 0) { 
        alert("Wah Bhai! Aapne saare questions ekdum sahi kiye hain. Koi galtiyan nahi bachi!"); 
        return; 
    }
    alert(`Revision Vault Unlocked! 🔓 \nAapke ${wrongQs.length} galat/chhode hue questions ka Retest shuru ho raha hai.`);
    setQuestions(wrongQs); 
    setResponses({}); 
    setTimeSpent({}); 
    setCurrentIndex(0);
    setActiveSubject(wrongQs[0].subject); 
    setTimeLeft(wrongQs.length * 120); 
    setIsSubmitted(false); 
    setShowSolutions(false); 
    setFinalResult(null);
  };

  const generateSimilarTest = async () => {
    const wrongQs = questions.filter(q => responses[q.id]?.value !== q.correctAnswer);
    if (wrongQs.length === 0) { 
        alert("Aapne sab kuch sahi kiya hai, naye test ki zaroorat nahi!"); 
        return; 
    }
    
    setIsGeneratingRemedial(true);
    try {
      const dataToSend = wrongQs.map(q => ({ subject: q.subject, text: q.text }));
      const res = await fetch('/api/remedial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wrongQuestions: dataToSend })
      });
      const data = await res.json();
      
      if (data.success) {
        setQuestions(data.questions);
        setResponses({}); 
        setTimeSpent({}); 
        setCurrentIndex(0);
        setActiveSubject(data.questions[0]?.subject || 'Physics');
        setTimeLeft(15 * 180); 
        setIsSubmitted(false); 
        setShowSolutions(false); 
        setFinalResult(null);
        alert("AI ne aapki galtiyon ke hisaab se 15 NAYE similar questions bana diye hain! Best of luck. 🚀");
      } else { 
        alert("AI Error: " + data.error); 
      }
    } catch (error) { 
        alert("Server Error: " + error.message); 
    } finally { 
        setIsGeneratingRemedial(false); 
    }
  };

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    if (!testStarted || isSubmitted || !currentQuestion) return;
    const tracker = setInterval(() => {
      setTimeSpent(prev => ({ ...prev, [currentQuestion.id]: (prev[currentQuestion.id] || 0) + 1 }));
    }, 1000);
    return () => clearInterval(tracker);
  }, [testStarted, isSubmitted, currentQuestion]);

  useEffect(() => {
    if (!testStarted || isSubmitted) return;
    if (timeLeft <= 0) { alert("Time is up!"); calculateScore(); setIsSubmitted(true); return; }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, testStarted, isSubmitted]);

  useEffect(() => {
    if (!testStarted || isSubmitted) return;
    const disableKeyboard = (e) => {
      if (e.ctrlKey && e.key === 'b') { console.log("Developer Bypass!"); return; }
      const allowedKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'PageUp', 'PageDown'];
      if (!allowedKeys.includes(e.key)) { 
          e.preventDefault(); 
          setKeyboardWarning(true); 
          setTimeout(() => setKeyboardWarning(false), 2000); 
      }
    };
    window.addEventListener('keydown', disableKeyboard, { capture: true });
    return () => window.removeEventListener('keydown', disableKeyboard, { capture: true });
  }, [testStarted, isSubmitted]);

  useEffect(() => {
    if (!testStarted || isSubmitted) return;
    const handleVisibility = () => { 
        if (document.hidden) { 
            alert("⚠️ STRICT WARNING: Screen ya Tab change detect hua hai!"); 
        } 
    };
    const preventRightClick = (e) => e.preventDefault();
    document.addEventListener("visibilitychange", handleVisibility);
    document.addEventListener("contextmenu", preventRightClick);
    return () => { 
        document.removeEventListener("visibilitychange", handleVisibility); 
        document.removeEventListener("contextmenu", preventRightClick); 
    };
  }, [testStarted, isSubmitted]);

  const calculateScore = () => {
    let score = 0; let correct = 0; let incorrect = 0; let unattempted = 0;
    let subjectStats = { 
        Physics: { score: 0, correct: 0, incorrect: 0, unattempted: 0, time: 0, totalQs: 0 }, 
        Chemistry: { score: 0, correct: 0, incorrect: 0, unattempted: 0, time: 0, totalQs: 0 }, 
        Mathematics: { score: 0, correct: 0, incorrect: 0, unattempted: 0, time: 0, totalQs: 0 } 
    };
    let sillyMistakes = 0; let conceptualGaps = 0; let failureToSkip = 0; 

    questions.forEach(q => {
      const userAns = responses[q.id]?.value;
      const timeTaken = timeSpent[q.id] || 0; 
      const sub = q.subject || 'Physics';

      if(!subjectStats[sub]) subjectStats[sub] = { score: 0, correct: 0, incorrect: 0, unattempted: 0, time: 0, totalQs: 0 };
      subjectStats[sub].totalQs++; 
      subjectStats[sub].time += timeTaken;

      if (!userAns) { 
          unattempted++; 
          subjectStats[sub].unattempted++; 
          if (timeTaken > 270) failureToSkip++;
      } else if (userAns === q.correctAnswer) { 
          score += 4; correct++; 
          subjectStats[sub].score += 4; 
          subjectStats[sub].correct++; 
          if (timeTaken > 270) failureToSkip++;
      } else { 
          score -= 1; incorrect++; 
          subjectStats[sub].score -= 1; 
          subjectStats[sub].incorrect++; 
          if (timeTaken < 30) sillyMistakes++; 
          if (timeTaken > 180) conceptualGaps++; 
      }
    });

    let percentile = "N/A"; let rank = "N/A";
    if (score >= 200) { percentile = "99.0 - 100"; rank = "Under 10,000"; } 
    else if (score >= 150) { percentile = "97.0 - 98.9"; rank = "15K - 35K"; } 
    else if (score >= 100) { percentile = "93.0 - 96.9"; rank = "35K - 80K"; } 
    else if (score >= 80) { percentile = "90.0 - 92.9"; rank = "80K - 1.2 Lakh"; } 
    else if (score >= 50) { percentile = "80.0 - 89.9"; rank = "1.2L - 2.5 Lakh"; } 
    else if (score >= 20) { percentile = "50.0 - 79.9"; rank = "2.5L - 6 Lakh"; } 
    else { percentile = "< 50.0 (Needs Work)"; rank = "> 6 Lakh"; }

    setFinalResult({ score, correct, incorrect, unattempted, percentile, rank, subjectStats, sillyMistakes, conceptualGaps, failureToSkip });
  };

  const submitTest = () => {
    const confirmSubmit = window.confirm("Are you sure you want to submit?");
    if (confirmSubmit) { calculateScore(); setIsSubmitted(true); }
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600); const m = Math.floor((seconds % 3600) / 60); const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if(testStarted && currentQuestion) { 
        setResponses((prev) => ({ ...prev, [currentQuestion.id]: prev[currentQuestion.id] || { status: 'NOT_ANSWERED', value: "" } })); 
    }
  }, [currentIndex, testStarted, currentQuestion]);

  const selectOption = (option) => setResponses(prev => ({ ...prev, [currentQuestion.id]: { ...prev[currentQuestion.id], value: option } }));
  const handleKeypad = (char) => {
    setResponses(prev => {
      let currentVal = prev[currentQuestion.id]?.value || "";
      if (char === 'CLEAR') return { ...prev, [currentQuestion.id]: { ...prev[currentQuestion.id], value: "" } };
      if (char === 'BACK') return { ...prev, [currentQuestion.id]: { ...prev[currentQuestion.id], value: currentVal.slice(0, -1) } };
      return { ...prev, [currentQuestion.id]: { ...prev[currentQuestion.id], value: currentVal + char } };
    });
  };

  const goToNextIndex = (prevIdx) => { 
      if (prevIdx < questions.length - 1) { 
          setActiveSubject(questions[prevIdx + 1].subject); 
          return prevIdx + 1; 
      } 
      return prevIdx; 
  };
  
  const saveAndNext = () => { setResponses(prev => ({ ...prev, [currentQuestion.id]: { ...prev[currentQuestion.id], status: prev[currentQuestion.id]?.value ? 'ANSWERED' : 'NOT_ANSWERED' } })); setCurrentIndex(goToNextIndex); };
  const saveAndMarkReview = () => { setResponses(prev => ({ ...prev, [currentQuestion.id]: { ...prev[currentQuestion.id], status: prev[currentQuestion.id]?.value ? 'ANSWERED_AND_MARKED' : 'MARKED_FOR_REVIEW' } })); setCurrentIndex(goToNextIndex); };
  const markForReview = () => { setResponses(prev => ({ ...prev, [currentQuestion.id]: { ...prev[currentQuestion.id], status: 'MARKED_FOR_REVIEW' } })); setCurrentIndex(goToNextIndex); };
  const clearResponse = () => setResponses(prev => ({ ...prev, [currentQuestion.id]: { status: 'NOT_ANSWERED', value: "" } }));

  const activeSubjectQuestions = questions.filter(q => q.subject === activeSubject);

  if (isExtracting || isGeneratingRemedial) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 p-4 font-sans">
        <div className="bg-white p-10 rounded-xl shadow-xl max-w-lg w-full text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-solid mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {isGeneratingRemedial ? "AI is creating 15 New Questions..." : "AI is analyzing your PDF..."}
          </h2>
          <p className="text-gray-500">Please wait! Processing background tasks.</p>
        </div>
      </div>
    );
  }

  if (!testStarted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 p-4 font-sans">
        <div className="bg-white p-8 rounded-xl shadow-xl max-w-lg w-full text-center">
          <h1 className="text-3xl font-extrabold text-blue-700 mb-2">JEE Parivar Platform</h1>
          <p className="text-gray-500 mb-6">NTA Updated Pattern Simulator</p>
          <div className="mb-4 p-5 border-2 border-dashed border-blue-300 rounded-lg bg-blue-50 text-left">
            <input type="file" accept=".pdf" onChange={handleFileUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"/>
          </div>
          <div className="mb-6 p-5 border-2 border-blue-300 rounded-lg bg-blue-50 text-left">
            <h3 className="font-bold text-gray-700 mb-2">Timer (Minutes)</h3>
            <input type="number" value={customTime} onChange={(e) => setCustomTime(Number(e.target.value))} min="5" className="w-full border border-gray-300 rounded p-2 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={startTest} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg shadow-md">Start Test (AI Extract)</button>
            <button onClick={startDemoTest} className="w-full bg-white border-2 border-green-500 text-green-600 font-bold py-3 rounded-lg shadow-sm">Quick Preview (Demo Mode)</button>
          </div>
        </div>
      </div>
    );
  }

  if (isSubmitted && finalResult) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 p-4 font-sans overflow-y-auto">
        <div className="bg-white p-8 rounded-xl shadow-2xl max-w-5xl w-full my-8">
          <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-6">Advanced Diagnostic Report</h1>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-center">
              <p className="text-gray-500 font-bold uppercase tracking-wider text-sm">Total Score</p>
              <p className="text-5xl font-black text-blue-600">{finalResult.score}</p>
              <p className="text-xs text-gray-400 mt-1">Out of {questions.length * 4}</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-emerald-700 text-white p-4 rounded-lg text-center shadow-lg">
              <p className="font-bold uppercase tracking-wider text-sm opacity-80">Predicted Rank</p>
              <p className="text-3xl font-black">{finalResult.rank}</p>
              <p className="text-sm font-bold mt-1 bg-black/20 rounded py-1 inline-block px-3">{finalResult.percentile} %ile</p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4 mt-8">🧠 AI Behavioral Analytics</h3>
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg text-center"><p className="text-red-600 font-bold text-2xl">{finalResult.sillyMistakes}</p><p className="text-xs text-gray-700 font-bold uppercase mt-1">Silly Rush Mistakes</p></div>
            <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg text-center"><p className="text-orange-600 font-bold text-2xl">{finalResult.conceptualGaps}</p><p className="text-xs text-gray-700 font-bold uppercase mt-1">Conceptual Gaps</p></div>
            <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg text-center"><p className="text-purple-600 font-bold text-2xl">{finalResult.failureToSkip}</p><p className="text-xs text-gray-700 font-bold uppercase mt-1">Failure to Skip</p></div>
          </div>

          <h3 className="text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4 mt-8">📊 Detailed Subject-Wise Analysis</h3>
          <div className="flex flex-col gap-4 mb-8">
            {Object.keys(finalResult.subjectStats).map(sub => {
              const stats = finalResult.subjectStats[sub];
              if(stats.totalQs === 0) return null;
              const accuracy = (stats.correct + stats.incorrect) > 0 ? Math.round((stats.correct / (stats.correct + stats.incorrect)) * 100) : 0;
              return (
                <div key={sub} className="bg-white border border-gray-300 p-5 rounded-xl shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="w-full md:w-1/4 text-center md:text-left"><h4 className="font-black text-xl text-blue-700">{sub}</h4><p className="text-xs text-gray-500 font-bold mt-1">⏱️ Time: {Math.floor(stats.time / 60)}m {stats.time % 60}s</p></div>
                  <div className="w-full md:w-2/4 grid grid-cols-3 gap-2 text-center">
                     <div className="bg-green-50 rounded p-2 border border-green-200"><p className="text-green-600 font-black text-lg">{stats.correct}</p><p className="text-[10px] uppercase font-bold text-gray-500 mt-1">Correct</p></div>
                     <div className="bg-red-50 rounded p-2 border border-red-200"><p className="text-red-600 font-black text-lg">{stats.incorrect}</p><p className="text-[10px] uppercase font-bold text-gray-500 mt-1">Incorrect</p></div>
                     <div className="bg-gray-100 rounded p-2 border border-gray-300"><p className="text-gray-600 font-black text-lg">{stats.unattempted}</p><p className="text-[10px] uppercase font-bold text-gray-500 mt-1">Skipped</p></div>
                  </div>
                  <div className="w-full md:w-1/4 flex flex-col items-center md:items-end"><p className="text-3xl font-black text-gray-800">{stats.score} <span className="text-sm text-gray-400 font-bold">/ {stats.totalQs * 4}</span></p><div className={`mt-2 text-xs font-bold px-3 py-1 rounded-full ${accuracy >= 80 ? 'bg-green-100 text-green-700' : accuracy >= 50 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>🎯 Accuracy: {accuracy}%</div></div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-4 mb-4">
            <button onClick={() => setShowSolutions(!showSolutions)} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-lg transition-all shadow-md">{showSolutions ? "Hide Solutions" : "📚 View Solutions & YouTube Links"}</button>
            <button onClick={() => window.location.reload()} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 rounded-lg transition-all shadow-md">Back to Home</button>
          </div>

          {/* REVISION VAULT BUTTONS */}
          <div className="flex gap-4 mb-8">
            <button onClick={startRevisionTest} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-lg transition-all shadow-md">
              🔄 Retest Same Mistakes
            </button>
            <button onClick={generateSimilarTest} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 rounded-lg transition-all shadow-md">
              ✨ Generate 15 NEW Similar Qs (AI)
            </button>
          </div>

          {showSolutions && (
            <div className="mt-4 border-t-2 border-gray-200 pt-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Detailed Solutions (AI Generated)</h2>
              <div className="space-y-6">
                {questions.map((q, idx) => {
                  const userAns = responses[q.id]?.value;
                  const isCorrect = userAns === q.correctAnswer;
                  return (
                    <div key={q.id} className={`p-5 rounded-lg border-2 ${isCorrect ? 'border-green-300 bg-green-50' : (userAns ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50')}`}>
                      <div className="flex justify-between mb-2">
                        <span className="font-bold text-gray-700">Q{idx + 1}. ({q.subject})</span>
                        <span className={`font-bold ${isCorrect ? 'text-green-600' : (userAns ? 'text-red-600' : 'text-gray-500')}`}>{isCorrect ? '✓ Correct' : (userAns ? '✗ Incorrect' : '• Unattempted')}</span>
                      </div>
                      <div className="text-md mb-4"><Latex>{q.text}</Latex></div>
                      <div className="mb-4 bg-white p-3 rounded border">
                        <p className="text-sm text-gray-600"><strong>Your Answer:</strong> <Latex>{userAns || "None"}</Latex></p>
                        <p className="text-sm text-green-700"><strong>Correct Answer:</strong> <Latex>{q.correctAnswer}</Latex></p>
                      </div>
                      {q.solution && (
                        <div className="bg-blue-50 border border-blue-200 p-4 rounded mb-3"><p className="font-bold text-blue-800 mb-2">AI Step-by-Step Solution:</p><p className="text-gray-700 whitespace-pre-wrap"><Latex>{q.solution}</Latex></p></div>
                      )}
                      {q.youtubeLink && (
                        <a href={q.youtubeLink} target="_blank" rel="noreferrer" className="inline-block mt-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold py-2 px-4 rounded shadow">▶ Watch Video Solution on YouTube</a>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white text-black font-sans text-sm relative overscroll-none overflow-hidden">
      {keyboardWarning && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-2 rounded-full shadow-lg font-bold z-50 animate-pulse">
          ⚠️ Keyboard is locked during the exam! Only Mouse & Arrow keys allowed.
        </div>
      )}

      <div className="flex-1 flex flex-col border-r border-gray-300">
        <div className="bg-blue-600 text-white p-2 flex justify-between items-center shadow-md z-10">
          <h1 className="text-lg font-bold">JEE Parivar CBT</h1>
          <div className="text-base bg-black/30 px-3 py-1 rounded font-mono font-bold">Time Left: {formatTime(timeLeft)}</div>
        </div>
        <div className="flex bg-gray-100 border-b border-gray-300">
            {Array.from(new Set(questions.map(q => q.subject))).map(sub => (
                <button key={sub} onClick={() => { setActiveSubject(sub); setCurrentIndex(questions.findIndex(q => q.subject === sub)); }}
                  className={`px-8 py-3 font-bold border-r border-gray-300 transition-colors ${activeSubject === sub ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-white'}`}>{sub}</button>
            ))}
        </div>
        
        <div className="p-6 flex-1 overflow-y-auto text-left relative">
          <div className="absolute top-2 right-6 text-xs text-gray-400 font-mono bg-gray-100 px-2 py-1 rounded">Time on Q: {timeSpent[currentQuestion?.id] || 0}s</div>
          <div className="flex justify-between text-gray-500 mb-4 font-bold border-b pb-2"><span>Question No. {currentQuestion?.id} | Type: {currentQuestion?.type}</span><span className="text-green-600">Marks: +4 / -1</span></div>
          <div className="text-lg mb-8 font-medium whitespace-pre-wrap"><Latex>{currentQuestion?.text || ""}</Latex></div>
          
          {currentQuestion?.type === 'MCQ' && (
            <div className="flex flex-col space-y-3 items-start">
              {currentQuestion.options.map((opt, idx) => (
                <label key={idx} className="flex items-center space-x-3 cursor-pointer p-2 border rounded-lg hover:bg-blue-50 transition w-full max-w-2xl"><input type="radio" name="option" className="h-4 w-4 shrink-0" checked={responses[currentQuestion.id]?.value === opt} onChange={() => selectOption(opt)} /><span className="text-base"><Latex>{opt}</Latex></span></label>
              ))}
            </div>
          )}
          {currentQuestion?.type === 'INTEGER' && (
            <div className="mt-4 max-w-sm text-left">
              <div className="mb-4"><input type="text" readOnly value={responses[currentQuestion.id]?.value || ""} placeholder="Enter numerical value" className="w-full border-2 border-blue-400 rounded-lg p-3 text-xl font-bold bg-blue-50 focus:outline-none shadow-inner cursor-not-allowed"/></div>
              <div className="grid grid-cols-4 gap-2 bg-gray-200 p-3 rounded-lg border border-gray-300">
                {['7','8','9','BACK','4','5','6','CLEAR','1','2','3','-','0','.','<','>'].map(key => (
                  <button key={key} onClick={() => handleKeypad(key)} className={`bg-white border border-gray-400 py-3 rounded font-bold text-lg hover:bg-blue-100 shadow-sm ${key==='BACK'||key==='CLEAR'?'hover:bg-red-100 text-red-600':''} ${(key==='<'||key==='>')?'bg-gray-300 text-gray-500 cursor-not-allowed':''}`}>{key === 'BACK' ? '←' : key}</button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-gray-100 p-3 border-t border-gray-300 flex justify-between items-center">
          <div className="flex space-x-2">
            <button onClick={saveAndMarkReview} className="bg-white border border-gray-400 text-gray-800 px-4 py-2 rounded font-semibold shadow-sm hover:bg-gray-50 text-xs">Save & Mark for Review</button>
            <button onClick={clearResponse} className="bg-white border border-gray-400 text-gray-800 px-4 py-2 rounded font-semibold shadow-sm hover:bg-gray-50 text-xs">Clear Response</button>
            <button onClick={markForReview} className="bg-yellow-500 text-white px-4 py-2 rounded font-semibold shadow-sm hover:bg-yellow-600 text-xs">Mark for Review & Next</button>
          </div>
          <div><button onClick={saveAndNext} className="bg-green-600 text-white px-8 py-2 rounded font-bold shadow-sm hover:bg-green-700">Save & Next</button></div>
        </div>
      </div>
      
      <div className="w-80 bg-gray-50 flex flex-col border-l border-gray-300">
        <div className="p-3 bg-blue-50 border-b border-gray-200 flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-300 rounded"></div>
            <div><p className="font-bold text-gray-800">Aspirant Name</p><p className="text-xs text-gray-500">Subject: {activeSubject}</p></div>
        </div>
        <div className="p-3 grid grid-cols-2 gap-2 text-[10px] border-b border-gray-300 font-bold bg-white">
           <div className="flex items-center"><span className={`inline-block w-4 h-4 mr-1 ${NTA_COLORS.NOT_VISITED}`}></span> Not Visited</div>
           <div className="flex items-center"><span className={`inline-block w-4 h-4 mr-1 ${NTA_COLORS.NOT_ANSWERED}`}></span> Not Answered</div>
           <div className="flex items-center"><span className={`inline-block w-4 h-4 mr-1 ${NTA_COLORS.ANSWERED}`}></span> Answered</div>
           <div className="flex items-center"><span className={`inline-block w-4 h-4 mr-1 rounded-full ${NTA_COLORS.MARKED_FOR_REVIEW}`}></span> Marked</div>
        </div>
        <div className="p-3 flex-1 overflow-y-auto">
          <h3 className="font-bold mb-3 text-gray-700 bg-blue-100 px-2 py-1 flex justify-between"><span>{activeSubject}</span> <span>{activeSubjectQuestions.length} Qs</span></h3>
          <div className="grid grid-cols-5 gap-2">
            {activeSubjectQuestions.map((q) => {
              const res = responses[q.id];
              const colorClass = res ? NTA_COLORS[res.status] || NTA_COLORS.NOT_VISITED : NTA_COLORS.NOT_VISITED;
              const isAnsMarked = res?.status === 'ANSWERED_AND_MARKED';
              const actualIndex = questions.findIndex(mainQ => mainQ.id === q.id);
              return (
                <button key={q.id} onClick={() => { setActiveSubject(q.subject); setCurrentIndex(actualIndex); }}
                  className={`relative h-10 w-10 flex items-center justify-center font-bold rounded shadow-sm text-sm border-gray-300 border ${colorClass} ${currentIndex === actualIndex ? 'ring-2 ring-black' : ''} ${isAnsMarked || res?.status === 'MARKED_FOR_REVIEW' ? 'rounded-full' : ''}`}>
                  {q.id}
                  {isAnsMarked && <span className="absolute bottom-1 right-1 w-2 h-2 bg-green-400 rounded-full"></span>}
                </button>
              );
            })}
          </div>
        </div>
        <div className="p-3 border-t border-gray-300 bg-blue-50">
            <button onClick={submitTest} className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 shadow-md">Submit Test</button>
        </div>
      </div>
    </div>
  );
}