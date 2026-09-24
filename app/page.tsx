// @ts-nocheck
'main'
'use client';

import React, { useState, useEffect } from 'react';

export default function Home() {
  const [currentView, setCurrentView] = useState<'landing' | 'app'>('landing');
  
  // App state variables from your CBT engine
  const [activeTab, setActiveTab] = useState<'test' | 'ai' | 'vault'>('test');
  const [timer, setTimer] = useState(10800); // 3 hours in seconds
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [questionStatus, setQuestionStatus] = useState({});
  const [scoreCard, setScoreCard] = useState(null);

  // Sample mock questions for IIT JEE Pattern
  const questions = [
    {
      id: 1,
      subject: 'Physics',
      type: 'MCQ',
      text: 'A particle moves in a straight line with deceleration proportional to displacement. Its loss of kinetic energy for displacement x is proportional to:',
      options: ['x', 'x²', 'log(x)', 'e^x'],
      correctAnswer: 1, // index of x² or similar logic
      solution: 'Using work-energy theorem: F = -kx => W = ΔKE => KE loss proportional to x².',
      youtubeLink: 'https://youtube.com'
    },
    {
      id: 2,
      subject: 'Chemistry',
      type: 'MCQ',
      text: 'Which of the following coordination compounds exhibits optical isomerism?',
      options: ['[Co(en)3]³⁺', '[Co(NH3)6]³⁺', '[Ni(CN)4]²⁻', '[PtCl4]²⁻'],
      correctAnswer: 0,
      solution: '[Co(en)3]³⁺ contains three symmetrical bidentate ligands and lacks a plane of symmetry.',
      youtubeLink: 'https://youtube.com'
    },
    {
      id: 3,
      subject: 'Mathematics',
      type: 'NUMERICAL',
      text: 'If the sum of the first 10 terms of the series 1 + 3 + 7 + 15 + 31 + ... is 2ⁿ - k, find the value of k.',
      options: [],
      correctAnswer: '10',
      solution: 'General term T_r = 2ʳ - 1. Sum = 2(2¹⁰ - 1) - 10 = 2¹¹ - 12. Thus k = 12.',
      youtubeLink: 'https://youtube.com'
    }
  ];

  // Timer effect for test
  useEffect(() => {
    let interval;
    if (isTestStarted && timer > 0 && !scoreCard) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && isTestStarted && !scoreCard) {
      handleSubmitTest();
    }
    return () => clearInterval(interval);
  }, [isTestStarted, timer, scoreCard]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (qId, optionIdx) => {
    setAnswers({ ...answers, [qId]: optionIdx });
  };

  const markQuestionStatus = (qId, status) => {
    setQuestionStatus({ ...questionStatus, [qId]: status });
  };

  const handleSubmitTest = () => {
    // Generate simple score card summary
    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;

    questions.forEach((q) => {
      if (answers[q.id] === undefined) {
        unattemptedCount++;
      } else if (answers[q.id] === q.correctAnswer || String(answers[q.id]) === String(q.correctAnswer)) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });

    const totalScore = correctCount * 4 - incorrectCount * 1;

    setScoreCard({
      score: totalScore,
      correct: correctCount,
      incorrect: incorrectCount,
      unattempted: unattemptedCount,
      percentile: '99.4%',
      rank: 1250,
      sillyMistakes: 2,
      conceptualGaps: 1
    });
  };

  // 1. LANDING PAGE VIEW
  if (currentView === 'landing') {
    return (
      <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-orange-500 selection:text-white">
        {/* Navbar */}
        <nav className="flex justify-between items-center px-8 py-5 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
              JEE PARIVAR 🏛️
            </span>
            <span className="text-xs px-2 py-1 bg-orange-500/20 text-orange-400 rounded-full border border-orange-500/30">
              IIT Bombay / Delhi Mission
            </span>
          </div>
          <button
            onClick={() => setCurrentView('app')}
            className="px-6 py-2.5 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 font-bold rounded-xl shadow-lg shadow-orange-500/20 transition-all transform hover:scale-105"
          >
            Enter Portal 🚀
          </button>
        </nav>

        {/* Hero Section */}
        <header className="relative overflow-hidden py-24 px-6 text-center bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-900">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent pointer-events-none" />
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-slate-800 text-amber-400 text-sm font-semibold border border-slate-700">
              🔥 Target: AIR Under 1000 • IIT Campus Seva
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
              Conquer JEE with <br />
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                Precision & AI Intelligence
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
              India's ultimate NTA-pattern CBT Mock Test engine combined with AI PDF question extractors and advanced mistakes revision vault.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setCurrentView('app')}
                className="px-8 py-4 bg-orange-500 hover:bg-orange-600 font-bold text-lg rounded-xl shadow-xl shadow-orange-500/30 transition-all transform hover:-translate-y-1"
              >
                Start Free Mock Test 🎯
              </button>
            </div>
          </div>
        </header>

        {/* Features Grid */}
        <section className="py-20 px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Designed for Future IITians 🌟</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-orange-500/50 transition-all">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-xl font-bold mb-2">NTA CBT Simulator</h3>
              <p className="text-slate-400 text-sm">Real exam interface with palette tracking, negative marking, and timer precision.</p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-orange-500/50 transition-all">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-2">AI PYQ Extractor</h3>
              <p className="text-slate-400 text-sm">Upload any PYQ PDF and let Google Gemini generate instant custom test sets.</p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-orange-500/50 transition-all">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold mb-2">Mistakes Vault</h3>
              <p className="text-slate-400 text-sm">Categorize silly mistakes vs conceptual gaps to ensure you never repeat them.</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center border-t border-slate-900 text-slate-500 text-sm">
          <p>© 2026 JEE Parivar • Built with dedication for IIT Aspirants 🚀</p>
        </footer>
      </div>
    );
  }

  // 2. MAIN APP VIEW (TEST & AI ENGINE)
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col">
      {/* Top Bar */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentView('landing')}
            className="text-xs px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300"
          >
            ← Back to Home
          </button>
          <h1 className="text-lg font-bold text-orange-400">JEE Parivar CBT Portal</h1>
        </div>
        {isTestStarted && !scoreCard && (
          <div className="flex items-center gap-3 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
            <span className="text-sm text-slate-400">Time Left:</span>
            <span className="font-mono text-lg font-bold text-amber-400">{formatTime(timer)}</span>
          </div>
        )}
      </header>

      {/* Main Content Container */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        {!isTestStarted ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center max-w-2xl mx-auto mt-12">
            <h2 className="text-2xl font-bold mb-4">Ready for the Mock Test?</h2>
            <p className="text-slate-400 mb-6">Total Questions: {questions.length} | Duration: 3 Hours | Negative Marking: -1</p>
            <button
              onClick={() => setIsTestStarted(true)}
              className="px-8 py-3 bg-orange-500 hover:bg-orange-600 font-bold rounded-xl shadow-lg transition-all"
            >
              Start Exam Now 🚀
            </button>
          </div>
        ) : scoreCard ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-orange-400 mb-6 text-center">🎉 Test Submitted Successfully!</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-center">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <p className="text-slate-400 text-sm">Total Score</p>
                <p className="text-2xl font-bold text-amber-400">{scoreCard.score}</p>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <p className="text-slate-400 text-sm">Correct</p>
                <p className="text-2xl font-bold text-green-400">{scoreCard.correct}</p>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <p className="text-slate-400 text-sm">Incorrect</p>
                <p className="text-2xl font-bold text-red-400">{scoreCard.incorrect}</p>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <p className="text-slate-400 text-sm">Percentile</p>
                <p className="text-2xl font-bold text-blue-400">{scoreCard.percentile}</p>
              </div>
            </div>
            <button
              onClick={() => { setScoreCard(null); setIsTestStarted(false); }}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 font-bold rounded-xl"
            >
              Return to Dashboard
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Question Panel */}
            <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full">
                    {questions[currentQuestionIndex].subject}
                  </span>
                  <span className="text-sm text-slate-400">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </span>
                </div>
                <p className="text-lg font-medium mb-6">{questions[currentQuestionIndex].text}</p>

                {/* Options */}
                {questions[currentQuestionIndex].options.length > 0 && (
                  <div className="space-y-3 mb-8">
                    {questions[currentQuestionIndex].options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleOptionSelect(questions[currentQuestionIndex].id, idx)}
                        className={`w-full text-left p-4 rounded-xl border transition-all ${
                          answers[questions[currentQuestionIndex].id] === idx
                            ? 'bg-orange-500/20 border-orange-500 text-orange-300'
                            : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <span className="font-bold mr-3">{String.fromCharCode(65 + idx)}.</span> {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between pt-4 border-t border-slate-800">
                <button
                  disabled={currentQuestionIndex === 0}
                  onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                  className="px-5 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 rounded-xl"
                >
                  Previous
                </button>
                {currentQuestionIndex < questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                    className="px-5 py-2 bg-orange-500 hover:bg-orange-600 font-bold rounded-xl"
                  >
                    Save & Next
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitTest}
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 font-bold rounded-xl"
                  >
                    Submit Test 🏁
                  </button>
                )}
              </div>
            </div>

            {/* Palette Panel */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="font-bold mb-4">Question Palette</h3>
              <div className="grid grid-cols-4 gap-3">
                {questions.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`h-12 rounded-xl font-bold border transition-all ${
                      currentQuestionIndex === idx
                        ? 'border-white'
                        : 'border-slate-800'
                    } ${
                      answers[q.id] !== undefined ? 'bg-green-600/20 text-green-400 border-green-500/50' : 'bg-slate-950 text-slate-400'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}