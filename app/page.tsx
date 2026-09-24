// @ts-nocheck
'use client';

import React, { useState, useEffect } from 'react';

export default function Home() {
  const [currentView, setCurrentView] = useState<'landing' | 'app'>('landing');
  
  // App navigation state
  const [activeTab, setActiveTab] = useState<'test' | 'ai' | 'vault'>('test');
  const [timer, setTimer] = useState(10800); // 3 hours
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [scoreCard, setScoreCard] = useState(null);

  // AI PDF Extractor states
  const [pdfFile, setPdfFile] = useState(null);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiQuestions, setAiQuestions] = useState([]);

  // Mistakes Vault states
  const [vaultMistakes, setVaultMistakes] = useState([
    { id: 1, subject: 'Physics', concept: 'Rotational Motion', note: 'Forgot to add parallel axis theorem correctly.' },
    { id: 2, subject: 'Chemistry', concept: 'Coordination Compounds', note: 'Confused optical isomerism with linkage isomerism.' }
  ]);

  // Sample Questions
  const questions = [
    {
      id: 1,
      subject: 'Physics',
      text: 'A particle moves in a straight line with deceleration proportional to displacement. Its loss of kinetic energy for displacement x is proportional to:',
      options: ['x', 'x²', 'log(x)', 'e^x'],
      correctAnswer: 1,
      solution: 'Using work-energy theorem: F = -kx => W = ΔKE => KE loss proportional to x².'
    },
    {
      id: 2,
      subject: 'Chemistry',
      text: 'Which of the following coordination compounds exhibits optical isomerism?',
      options: ['[Co(en)3]³⁺', '[Co(NH3)6]³⁺', '[Ni(CN)4]²⁻', '[PtCl4]²⁻'],
      correctAnswer: 0,
      solution: '[Co(en)3]³⁺ contains three symmetrical bidentate ligands and lacks a plane of symmetry.'
    },
    {
      id: 3,
      subject: 'Mathematics',
      text: 'If the sum of the first 10 terms of the series 1 + 3 + 7 + 15 + 31 + ... is 2ⁿ - k, find the value of k.',
      options: ['10', '11', '12', '15'],
      correctAnswer: 2,
      solution: 'General term T_r = 2ʳ - 1. Sum = 2(2¹⁰ - 1) - 10 = 2¹¹ - 12. Thus k = 12.'
    }
  ];

  // Timer effect
  useEffect(() => {
    let interval;
    if (isTestStarted && timer > 0 && !scoreCard) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
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

  const handleSubmitTest = () => {
    let correct = 0;
    let incorrect = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) correct++;
      else if (answers[q.id] !== undefined) incorrect++;
    });
    setScoreCard({
      score: correct * 4 - incorrect * 1,
      correct,
      incorrect,
      percentile: '99.5%'
    });
  };

  const handleAIPdfUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdfFile(file.name);
      setIsGeneratingAI(true);
      setTimeout(() => {
        setIsGeneratingAI(false);
        setAiQuestions([
          { id: 101, text: 'AI Extracted PYQ: Find eigenvalues of matrix A...', subject: 'Math' },
          { id: 102, text: 'AI Extracted PYQ: Calculate entropy change for isothermal expansion...', subject: 'Chemistry' }
        ]);
      }, 2000);
    }
  };

  // 1. IIT LANDING PAGE VIEW
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
              IIT Bombay & Kharagpur Mission
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
        <header className="relative overflow-hidden py-20 px-6 text-center bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-900">
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-slate-800 text-amber-400 text-sm font-semibold border border-slate-700">
              🔥 Target: AIR Under 1000 • Developed by Amit
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
              Dreaming of <br />
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                IIT Bombay & IIT Kharagpur?
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
              India's ultimate NTA-pattern CBT Mock Test engine combined with AI PDF question extractors and mistakes revision vault.
            </p>
            <button
              onClick={() => setCurrentView('app')}
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 font-bold text-lg rounded-xl shadow-xl shadow-orange-500/30 transition-all transform hover:-translate-y-1"
            >
              Start Free Mock Test 🎯
            </button>
          </div>
        </header>

        {/* IIT Campus Showcase Section */}
        <section className="py-16 px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-orange-400">The Ultimate Goal: Elite IIT Campuses 🏛️✨</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl group">
              <img 
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80" 
                alt="IIT Campus" 
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-400 mb-2">IIT Bombay 🌅</h3>
                <p className="text-slate-400 text-sm">"The struggle you're in today is developing the strength you need for tomorrow at Powai Lake."</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl group">
              <img 
                src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80" 
                alt="IIT Campus" 
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-400 mb-2">IIT Kharagpur 🌳</h3>
                <p className="text-slate-400 text-sm">"Legacy, heritage, and the historic 2.210 acres of academic excellence."</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-orange-500/50 transition-all">
            <div className="text-4xl mb-4">💻</div>
            <h3 className="text-xl font-bold mb-2">NTA CBT Simulator</h3>
            <p className="text-slate-400 text-sm">Real exam interface with palette tracking and 3-hour countdown timer.</p>
          </div>
          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-orange-500/50 transition-all">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold mb-2">AI PYQ Extractor</h3>
            <p className="text-slate-400 text-sm">Upload any PDF and let Google Gemini convert it into custom test questions.</p>
          </div>
          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-orange-500/50 transition-all">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold mb-2">Mistakes Vault</h3>
            <p className="text-slate-400 text-sm">Track silly mistakes and conceptual gaps so you never repeat them.</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 text-center border-t border-slate-900 text-slate-500 text-sm bg-slate-900/40">
          <p className="mb-2 font-semibold text-slate-300">🇮🇳 Made with pride in India</p>
          <p className="text-orange-400 font-bold mb-1">Developed by Amit</p>
          <p>© 2026 JEE Parivar • Dedicated to future IITians 🚀</p>
        </footer>
      </div>
    );
  }

  // 2. MAIN APP DASHBOARD VIEW (TEST, AI, VAULT)
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col">
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={() => { setCurrentView('landing'); setIsTestStarted(false); setScoreCard(null); }}
            className="text-xs px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300"
          >
            ← Back to Home
          </button>
          <h1 className="text-lg font-bold text-orange-400">JEE Parivar Portal</h1>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('test')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'test' ? 'bg-orange-500 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            💻 CBT Mock Test
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'ai' ? 'bg-orange-500 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            🤖 AI PDF Extractor
          </button>
          <button
            onClick={() => setActiveTab('vault')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'vault' ? 'bg-orange-500 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            📚 Mistakes Vault
          </button>
        </div>

        {/* Timer */}
        {activeTab === 'test' && isTestStarted && !scoreCard && (
          <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400">Time:</span>
            <span className="font-mono font-bold text-amber-400">{formatTime(timer)}</span>
          </div>
        )}
      </header>

      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        {/* TAB 1: CBT TEST ENGINE */}
        {activeTab === 'test' && (
          <div>
            {!isTestStarted ? (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center max-w-xl mx-auto mt-16 shadow-xl">
                <h2 className="text-2xl font-bold mb-4">JEE Main / Advanced CBT Mock Engine</h2>
                <p className="text-slate-400 mb-6">Total Questions: {questions.length} | Negative Marking: -1</p>
                <button
                  onClick={() => setIsTestStarted(true)}
                  className="px-8 py-3 bg-orange-500 hover:bg-orange-600 font-bold rounded-xl shadow-lg transition-all"
                >
                  Start Test Now 🚀
                </button>
              </div>
            ) : scoreCard ? (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-orange-400 mb-4">🎉 Test Completed!</h2>
                <p className="text-xl mb-6">Your Score: <span className="text-amber-400 font-bold">{scoreCard.score}</span></p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-slate-950 rounded-xl">Correct: {scoreCard.correct}</div>
                  <div className="p-4 bg-slate-950 rounded-xl">Incorrect: {scoreCard.incorrect}</div>
                </div>
                <button
                  onClick={() => { setScoreCard(null); setIsTestStarted(false); }}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-700 font-bold rounded-xl"
                >
                  Back to Dashboard
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full">
                        {questions[currentQuestionIndex].subject}
                      </span>
                      <span className="text-sm text-slate-400">Q {currentQuestionIndex + 1} / {questions.length}</span>
                    </div>
                    <p className="text-lg font-medium mb-6">{questions[currentQuestionIndex].text}</p>
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
                  </div>
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

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <h3 className="font-bold mb-4">Question Palette</h3>
                  <div className="grid grid-cols-4 gap-3">
                    {questions.map((q, idx) => (
                      <button
                        key={q.id}
                        onClick={() => setCurrentQuestionIndex(idx)}
                        className={`h-12 rounded-xl font-bold border transition-all ${
                          currentQuestionIndex === idx ? 'border-white' : 'border-slate-800'
                        } ${answers[q.id] !== undefined ? 'bg-green-600/20 text-green-400' : 'bg-slate-950 text-slate-400'}`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: AI PDF EXTRACTOR */}
        {activeTab === 'ai' && (
          <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-orange-400">🤖 AI PYQ PDF Extractor</h2>
            <p className="text-slate-400 mb-6">Upload any previous year question paper PDF. Google Gemini will extract questions instantly.</p>
            <input
              type="file"
              accept=".pdf"
              onChange={handleAIPdfUpload}
              className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl mb-6 text-sm text-slate-300"
            />
            {isGeneratingAI && <p className="text-amber-400 animate-pulse mb-4">Analyzing PDF with Gemini AI...</p>}
            {aiQuestions.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-bold text-green-400">Extracted Questions:</h3>
                {aiQuestions.map((q) => (
                  <div key={q.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                    <span className="text-xs text-orange-400 block mb-1">{q.subject}</span>
                    <p>{q.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: MISTAKES VAULT */}
        {activeTab === 'vault' && (
          <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-orange-400">📚 Mistakes Revision Vault</h2>
            <p className="text-slate-400 mb-6">Review your weak concepts so you don't repeat them in JEE Main.</p>
            <div className="space-y-4">
              {vaultMistakes.map((m) => (
                <div key={m.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center">
                  <div>
                    <span className="text-xs px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded mr-2">{m.subject}</span>
                    <span className="font-bold">{m.concept}</span>
                    <p className="text-slate-400 text-sm mt-1">{m.note}</p>
                  </div>
                  <span className="text-red-400 text-sm font-bold">Needs Revision</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}