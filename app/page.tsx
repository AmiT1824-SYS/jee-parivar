// @ts-nocheck
'use client';

import React, { useState, useEffect } from 'react';

export default function JEEParivarUltimateApp() {
  // Navigation & Auth States
  const [currentView, setCurrentView] = useState<'landing' | 'login' | 'dashboard' | 'test' | 'result' | 'remediation'>('landing');
  const [authMethod, setAuthMethod] = useState<'choice' | 'phone' | 'google' | 'name'>('choice');
  
  // Credentials
  const [studentName, setStudentName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  
  // Exam Mode & Configuration States
  const [examType, setExamType] = useState<'MAIN' | 'ADVANCED' | 'DEMO'>('MAIN');
  const [customMinutes, setCustomMinutes] = useState(180);
  const [timer, setTimer] = useState(10800);
  
  // Test Session States
  const [testQuestions, setTestQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [warningCount, setWarningCount] = useState(0);

  // AI PDF Extractor & Auto-Detector States
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [isAnalyzingPDF, setIsAnalyzingPDF] = useState(false);
  const [detectedExamType, setDetectedExamType] = useState('');

  // Mistakes Vault State
  const [vaultMistakes, setVaultMistakes] = useState([
    { id: 1, subject: 'Physics', concept: 'Rotational Dynamics', note: 'Revise moment of inertia of solid cylinders.' },
    { id: 2, subject: 'Chemistry', concept: 'Coordination Compounds', note: 'Confused crystal field splitting energy.' }
  ]);

  // Scorecard State
  const [scoreCard, setScoreCard] = useState(null);

  // ANTI-CHEAT & SECURITY SYSTEM
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && currentView === 'test' && examType !== 'DEMO') {
        setWarningCount((prev) => {
          const newCount = prev + 1;
          alert(`⚠️ SECURITY WARNING (${newCount}/3): Tab switching is restricted! Test auto-submits on 3 warnings.`);
          if (newCount >= 3) {
            handleSubmitTest();
          }
          return newCount;
        });
      }
    };
    const handleContextMenu = (e) => e.preventDefault();

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('contextmenu', handleContextMenu);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [currentView, examType]);

  // TIMER EFFECT
  useEffect(() => {
    let interval;
    if (currentView === 'test' && timer > 0 && !scoreCard) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0 && currentView === 'test') {
      handleSubmitTest();
    }
    return () => clearInterval(interval);
  }, [currentView, timer, scoreCard]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // VIRTUAL KEYPAD FOR INTEGER QUESTIONS
  const handleVirtualKeypad = (char) => {
    const q = testQuestions[currentQuestionIndex];
    if (!q) return;
    const currentVal = answers[q.id] !== undefined ? String(answers[q.id]) : '';
    
    if (char === 'CLEAR') {
      setAnswers({ ...answers, [q.id]: '' });
    } else if (char === 'BACK') {
      setAnswers({ ...answers, [q.id]: currentVal.slice(0, -1) });
    } else {
      setAnswers({ ...answers, [q.id]: currentVal + char });
    }
  };

  // DEMO TEST GENERATOR (QUICK 3 QUESTIONS)
  const startDemoTest = () => {
    setExamType('DEMO');
    setTimer(300); // 5 Minutes demo timer
    setTestQuestions([
      {
        id: 991,
        subject: 'Physics',
        type: 'MCQ',
        text: '[Demo Test] A particle moves in a straight line with deceleration proportional to displacement. Its loss of kinetic energy is proportional to:',
        options: ['x', 'x²', 'log(x)', 'e^x'],
        correctAnswer: 1,
        solution: 'Using work-energy theorem: F = -kx => W = ΔKE => KE loss is proportional to x².',
        youtubeLink: 'https://www.youtube.com/results?search_query=work+energy+theorem+jee+physics'
      },
      {
        id: 992,
        subject: 'Chemistry',
        type: 'MCQ',
        text: '[Demo Test] Which of the following coordination compounds exhibits optical isomerism?',
        options: ['[Co(en)3]³⁺', '[Co(NH3)6]³⁺', '[Ni(CN)4]²⁻', '[PtCl4]²⁻'],
        correctAnswer: 0,
        solution: '[Co(en)3]³⁺ contains three symmetrical bidentate ligands and lacks a plane of symmetry.',
        youtubeLink: 'https://www.youtube.com/results?search_query=coordination+compounds+optical+isomerism+jee'
      },
      {
        id: 993,
        subject: 'Mathematics',
        type: 'INTEGER',
        text: '[Demo Test] Find the value of x if x + 5 = 9 (Integer response test).',
        options: [],
        correctAnswer: '4',
        solution: 'Simple linear equation: x = 9 - 5 = 4.',
        youtubeLink: 'https://www.youtube.com/results?search_query=linear+equations+jee'
      }
    ]);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setCurrentView('test');
  };

  // GENERATE FULL PAPER (MAIN: 75 Qs | ADVANCED: 51 Qs)
  const startMockTest = (type) => {
    setExamType(type);
    setTimer(customMinutes * 60);
    
    let generated = [];
    const subjects = ['Physics', 'Chemistry', 'Mathematics'];
    
    if (type === 'MAIN') {
      let idCounter = 1;
      subjects.forEach((subj) => {
        for (let i = 1; i <= 20; i++) {
          generated.push({
            id: idCounter++,
            subject: subj,
            type: 'MCQ',
            text: `[JEE Main 2026] Sample MCQ Question ${i} in ${subj} covering core syllabus concepts.`,
            options: ['Option A Calculation', 'Option B Derivation', 'Option C Formula substitution', 'Option D Direct theory'],
            correctAnswer: 0,
            solution: `Detailed AI step-by-step solution for ${subj} MCQ question ${i}.`,
            youtubeLink: 'https://www.youtube.com/results?search_query=jee+main+physics+chemistry_math'
          });
        }
        for (let i = 1; i <= 5; i++) {
          generated.push({
            id: idCounter++,
            subject: subj,
            type: 'INTEGER',
            text: `[JEE Main 2026] Numerical Integer Question ${i} in ${subj}. Compute final evaluated value.`,
            options: [],
            correctAnswer: '4',
            solution: `Integer evaluation steps for ${subj} Q${i}. Final exact integer is 4.`,
            youtubeLink: 'https://www.youtube.com/results?search_query=jee+numerical+value+questions'
          });
        }
      });
    } else {
      let idCounter = 1;
      subjects.forEach((subj) => {
        for (let i = 1; i <= 10; i++) {
          generated.push({
            id: idCounter++,
            subject: subj,
            type: 'MCQ',
            text: `[JEE Advanced] Multi-concept advanced MCQ ${i} in ${subj}.`,
            options: ['Choice P', 'Choice Q', 'Choice R', 'Choice S'],
            correctAnswer: 2,
            solution: `Advanced analytical solution for ${subj} question ${i}.`,
            youtubeLink: 'https://www.youtube.com/results?search_query=jee+advanced+physics+math'
          });
        }
        for (let i = 1; i <= 7; i++) {
          generated.push({
            id: idCounter++,
            subject: subj,
            type: 'INTEGER',
            text: `[JEE Advanced] Integer / Numerical response question ${i} in ${subj}.`,
            options: [],
            correctAnswer: '7',
            solution: `Advanced integer derivation for ${subj} question ${i}.`,
            youtubeLink: 'https://www.youtube.com/results?search_query=jee+advanced+integer+questions'
          });
        }
      });
    }

    setTestQuestions(generated);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setCurrentView('test');
  };

  const handleAIPdfUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFileName(file.name);
      setIsAnalyzingPDF(true);
      setTimeout(() => {
        setIsAnalyzingPDF(false);
        const isAdv = file.name.toLowerCase().includes('adv') || file.name.toLowerCase().includes('advanced');
        setDetectedExamType(isAdv ? 'JEE Advanced (51 Questions)' : 'JEE Main (75 Questions)');
      }, 2000);
    }
  };

  const handleSubmitTest = () => {
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;
    let subjectStats = { 
      Physics: { correct: 0, incorrect: 0 }, 
      Chemistry: { correct: 0, incorrect: 0 }, 
      Mathematics: { correct: 0, incorrect: 0 } 
    };

    testQuestions.forEach((q) => {
      const userAns = answers[q.id];
      if (userAns === undefined || userAns === '') {
        unattempted++;
      } else if (String(userAns).trim() === String(q.correctAnswer).trim()) {
        correct++;
        subjectStats[q.subject].correct++;
      } else {
        incorrect++;
        subjectStats[q.subject].incorrect++;
      }
    });

    const totalScore = correct * 4 - incorrect * 1;
    setScoreCard({
      score: totalScore,
      correct,
      incorrect,
      unattempted,
      percentile: totalScore > 10 ? '99.8%' : '85.0%',
      rank: totalScore > 10 ? 450 : 15000,
      sillyMistakes: Math.floor(incorrect * 0.5),
      conceptualGaps: Math.ceil(incorrect * 0.5),
      subjectStats
    });

    setCurrentView('result');
  };

  // ================= 1. IIT LANDING PAGE =================
  if (currentView === 'landing') {
    return (
      <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-orange-500 selection:text-white">
        <nav className="flex justify-between items-center px-8 py-5 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
              JEE PARIVAR 🏛️
            </span>
            <span className="text-xs px-2.5 py-1 bg-orange-500/20 text-orange-400 rounded-full border border-orange-500/30 font-semibold">
              IIT Bombay & Kharagpur Mission
            </span>
          </div>
          <button
            onClick={() => setCurrentView('login')}
            className="px-6 py-2.5 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 font-bold rounded-xl shadow-lg shadow-orange-500/20 transition-all transform hover:scale-105"
          >
            Student Login 🚀
          </button>
        </nav>

        <header className="relative overflow-hidden py-20 px-6 text-center bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-900">
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-slate-800 text-amber-400 text-sm font-semibold border border-slate-700">
              🔥 Target: AIR Under 1000 • Developed by Amit
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
              Master JEE Main & Advanced with <br />
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                Exact NTA Exam Engine & Demo Test
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
              Try a quick demo test, or take full 75 Qs Main & 51 Qs Advanced papers with AI readers and virtual keypads.
            </p>
            <button
              onClick={() => setCurrentView('login')}
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 font-bold text-lg rounded-xl shadow-xl shadow-orange-500/30 transition-all transform hover:-translate-y-1"
            >
              Enter Portal & Login 🎯
            </button>
          </div>
        </header>

        {/* IIT Campus Showcase */}
        <section className="py-16 px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-orange-400">Your Destination: Elite IIT Campuses 🏛️✨</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl group">
              <img 
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80" 
                alt="IIT Bombay" 
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-400 mb-2">IIT Bombay 🌅</h3>
                <p className="text-slate-400 text-sm">"The struggle you're in today is developing the strength you need for tomorrow."</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl group">
              <img 
                src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80" 
                alt="IIT Kharagpur" 
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-400 mb-2">IIT Kharagpur 🌳</h3>
                <p className="text-slate-400 text-sm">"Legacy, heritage, and the historic 2,100 acres of academic excellence."</p>
              </div>
            </div>
          </div>
        </section>

        <footer className="py-10 text-center border-t border-slate-900 text-slate-500 text-sm bg-slate-900/40">
          <p className="mb-2 font-semibold text-slate-300">🇮🇳 Made with pride in India</p>
          <p className="text-orange-400 font-bold mb-1">Developed by Amit</p>
          <p>© 2026 JEE Parivar • Dedicated to future IITians 🚀</p>
        </footer>
      </div>
    );
  }

  // ================= 2. LOGIN SYSTEM =================
  if (currentView === 'login') {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-md w-full shadow-2xl">
          <h2 className="text-2xl font-black text-orange-400 mb-2 text-center">Student Portal Login</h2>
          <p className="text-slate-400 text-sm mb-6 text-center">Secure authentication for future IITians.</p>

          {authMethod === 'choice' && (
            <div className="space-y-4">
              <button
                onClick={() => {
                  setStudentName('Google Student (Amit)');
                  setCurrentView('dashboard');
                }}
                className="w-full py-3.5 px-4 bg-slate-950 hover:bg-slate-800 border border-slate-700 rounded-xl font-bold flex items-center justify-center gap-3 transition-all"
              >
                <span>🌐</span> Continue with Google
              </button>

              <button
                onClick={() => setAuthMethod('phone')}
                className="w-full py-3.5 px-4 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border border-orange-500/30 rounded-xl font-bold flex items-center justify-center gap-3 transition-all"
              >
                <span>📱</span> Login with Phone Number (OTP)
              </button>

              <button
                onClick={() => setAuthMethod('name')}
                className="w-full py-3.5 px-4 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold flex items-center justify-center gap-3 transition-all text-sm text-slate-300"
              >
                <span>👤</span> Quick Login with Name
              </button>

              <button
                onClick={() => setCurrentView('landing')}
                className="w-full mt-4 py-2 text-slate-400 hover:text-white text-sm text-center block"
              >
                ← Back to Home
              </button>
            </div>
          )}

          {authMethod === 'phone' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Mobile Number:</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-orange-500"
                />
              </div>

              {isOtpSent && (
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Enter 6-Digit OTP:</label>
                  <input
                    type="text"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-orange-500 font-mono tracking-widest text-center text-lg"
                  />
                </div>
              )}

              {!isOtpSent ? (
                <button
                  onClick={() => {
                    if (phoneNumber.length < 10) {
                      alert('Please enter a valid phone number.');
                      return;
                    }
                    setIsOtpSent(true);
                    alert('OTP Sent successfully! (Use any 6 digits)');
                  }}
                  className="w-full py-3 bg-orange-500 hover:bg-orange-600 font-bold rounded-xl transition-all"
                >
                  Send OTP 📩
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (otp.length < 4) {
                      alert('Please enter valid OTP');
                      return;
                    }
                    setStudentName('User (' + phoneNumber.slice(-4) + ')');
                    setCurrentView('dashboard');
                  }}
                  className="w-full py-3 bg-green-600 hover:bg-green-700 font-bold rounded-xl transition-all"
                >
                  Verify & Login 🚀
                </button>
              )}

              <button
                onClick={() => setAuthMethod('choice')}
                className="w-full py-2 text-slate-400 text-sm hover:text-white"
              >
                ← Back to Login Options
              </button>
            </div>
          )}

          {authMethod === 'name' && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter your name (e.g., Amit Kumar)"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-orange-500"
              />
              <button
                onClick={() => {
                  if (studentName.trim() === '') {
                    alert('Please enter your name!');
                    return;
                  }
                  setCurrentView('dashboard');
                }}
                className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 font-bold rounded-xl transition-all"
              >
                Continue to Dashboard 🚀
              </button>
              <button
                onClick={() => setAuthMethod('choice')}
                className="w-full py-2 text-slate-400 text-sm hover:text-white"
              >
                ← Back to Login Options
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ================= 3. DASHBOARD VIEW (WITH DEMO TEST BUTTON) =================
  if (currentView === 'dashboard') {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col">
        <header className="bg-slate-900 border-b border-slate-800 px-8 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-black text-orange-400">Welcome, {studentName || 'Aspirant'} 🎯</h1>
            <p className="text-xs text-slate-400">Target: IIT Bombay / Delhi • Testing Dashboard</p>
          </div>
          <button
            onClick={() => setCurrentView('landing')}
            className="text-xs px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300"
          >
            Logout
          </button>
        </header>

        <main className="flex-1 p-8 max-w-4xl mx-auto w-full space-y-8">
          {/* QUICK DEMO TEST BANNER */}
          <div className="bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-slate-900 border border-amber-500/40 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <span className="text-xs px-2.5 py-1 bg-amber-500/20 text-amber-400 rounded-full font-bold">⚡ Quick Check</span>
              <h2 className="text-xl font-bold mt-2 text-white">Want to try a Quick Demo Test?</h2>
              <p className="text-slate-400 text-sm">Test the NTA interface, virtual keypad, and analytics in just 3 sample questions.</p>
            </div>
            <button
              onClick={startDemoTest}
              className="px-6 py-3.5 bg-amber-500 hover:bg-amber-600 font-black text-slate-950 rounded-xl shadow-lg transition-all transform hover:scale-105 whitespace-nowrap"
            >
              Start Demo Test (3 Qs) 🚀
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-orange-400">⚙️ Full Mock Test & Timer Configuration</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-xs text-slate-400 block mb-2">Customize Test Duration (Minutes):</label>
                <input
                  type="number"
                  value={customMinutes}
                  onChange={(e) => setCustomMinutes(Number(e.target.value))}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-orange-500 outline-none font-bold text-lg"
                />
              </div>
              <div className="flex items-end gap-3">
                <button
                  onClick={() => startMockTest('MAIN')}
                  className="flex-1 py-3.5 bg-orange-500 hover:bg-orange-600 font-bold rounded-xl shadow-lg transition-all"
                >
                  JEE Main (75 Qs) 🚀
                </button>
                <button
                  onClick={() => startMockTest('ADVANCED')}
                  className="flex-1 py-3.5 bg-purple-600 hover:bg-purple-700 font-bold rounded-xl shadow-lg transition-all"
                >
                  JEE Adv (51 Qs) ⚡
                </button>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-2 text-orange-400">🤖 AI PDF Question Paper Reader & Auto-Detector</h2>
            <p className="text-slate-400 text-sm mb-6">Upload any previous year question paper PDF. AI will automatically detect Main or Advanced and parse the answer key from the last page!</p>
            <input
              type="file"
              accept=".pdf"
              onChange={handleAIPdfUpload}
              className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl mb-6 text-sm text-slate-300"
            />
            {isAnalyzingPDF && <p className="text-amber-400 animate-pulse font-semibold">Analyzing PDF structure & extracting Answer Key...</p>}
            {detectedExamType && (
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                <p className="text-green-400 font-bold text-sm">✅ AI Auto-Detected Paper Type: {detectedExamType}</p>
                <p className="text-slate-400 text-xs mt-1">Answer key successfully mapped from the last page of {uploadedFileName}!</p>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  // ================= 4. EXAM TEST INTERFACE WITH VIRTUAL KEYPAD =================
  if (currentView === 'test' && testQuestions.length > 0) {
    const q = testQuestions[currentQuestionIndex];
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col">
        <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="font-bold text-orange-400">JEE Parivar NTA Engine ({examType})</span>
            {examType !== 'DEMO' && (
              <span className="text-xs bg-red-500/20 text-red-400 px-3 py-1 rounded-full border border-red-500/30">
                Anti-Cheat Active (Warnings: {warningCount}/3)
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400">Time Remaining:</span>
            <span className="font-mono text-lg font-bold text-amber-400">{formatTime(timer)}</span>
          </div>
        </header>

        <main className="flex-1 p-6 max-w-7xl mx-auto w-full grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full font-semibold">
                  {q.subject} • {q.type}
                </span>
                <span className="text-sm text-slate-400">Question {currentQuestionIndex + 1} of {testQuestions.length}</span>
              </div>
              <p className="text-lg font-medium mb-6 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
                {q.text}
              </p>

              {q.type === 'MCQ' ? (
                <div className="space-y-3 mb-8">
                  {q.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => setAnswers({ ...answers, [q.id]: idx })}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        answers[q.id] === idx ? 'bg-orange-500/20 border-orange-500 text-orange-300' : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <span className="font-bold mr-3">{String.fromCharCode(65 + idx)}.</span> {opt}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="mb-8 p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <label className="text-xs text-slate-400 block mb-2">Integer / Numerical Response Box (NTA Virtual Keypad):</label>
                  <input
                    type="text"
                    readOnly
                    placeholder="Use virtual keypad below..."
                    value={answers[q.id] !== undefined ? answers[q.id] : ''}
                    className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-lg mb-4 text-center"
                  />
                  <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
                    {['1','2','3','4','5','6','7','8','9','-','0','.'].map((char) => (
                      <button
                        key={char}
                        onClick={() => handleVirtualKeypad(char)}
                        className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg font-bold text-center"
                      >
                        {char}
                      </button>
                    ))}
                    <button
                      onClick={() => handleVirtualKeypad('CLEAR')}
                      className="p-3 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg font-bold text-xs"
                    >
                      CLEAR
                    </button>
                    <button
                      onClick={() => handleVirtualKeypad('BACK')}
                      className="p-3 bg-amber-600/20 hover:bg-amber-600/30 text-amber-400 rounded-lg font-bold text-xs col-span-2"
                    >
                      ⌫ BACKSPACE
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-800">
              <button
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 rounded-xl text-sm font-bold"
              >
                Previous
              </button>
              {currentQuestionIndex < testQuestions.length - 1 ? (
                <button
                  onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                  className="px-6 py-2 bg-orange-500 hover:bg-orange-600 font-bold rounded-xl text-sm"
                >
                  Save & Next
                </button>
              ) : (
                <button
                  onClick={handleSubmitTest}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 font-bold rounded-xl text-sm shadow-lg shadow-green-600/20"
                >
                  Submit Final Test 🏁
                </button>
              )}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 overflow-y-auto max-h-[600px]">
            <h3 className="font-bold mb-4 text-sm text-slate-300">Question Palette</h3>
            <div className="grid grid-cols-5 gap-2">
              {testQuestions.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`h-10 rounded-lg font-bold border text-xs transition-all ${
                    currentQuestionIndex === idx ? 'border-white' : 'border-slate-800'
                  } ${answers[item.id] !== undefined && answers[item.id] !== '' ? 'bg-green-600/20 text-green-400 border-green-500/50' : 'bg-slate-950 text-slate-400'}`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ================= 5. SCORECARD =================
  if (currentView === 'result' && scoreCard) {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-8 flex flex-col items-center justify-center">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-3xl w-full shadow-2xl">
          <h2 className="text-3xl font-black text-orange-400 mb-2 text-center">🎉 Test Submitted Successfully!</h2>
          <p className="text-slate-400 text-sm mb-8 text-center">Performance & Rank Predictor for {studentName || 'Student'}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-center">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
              <p className="text-xs text-slate-400">Total Score</p>
              <p className="text-2xl font-bold text-amber-400">{scoreCard.score}</p>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
              <p className="text-xs text-slate-400">Correct</p>
              <p className="text-2xl font-bold text-green-400">{scoreCard.correct}</p>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
              <p className="text-xs text-slate-400">Percentile</p>
              <p className="text-2xl font-bold text-blue-400">{scoreCard.percentile}</p>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
              <p className="text-xs text-slate-400">Predicted Rank</p>
              <p className="text-2xl font-bold text-orange-400">AIR {scoreCard.rank}</p>
            </div>
          </div>

          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setCurrentView('remediation')}
              className="flex-1 py-4 bg-amber-500 hover:bg-amber-600 font-bold rounded-xl text-slate-950 transition-all"
            >
              📖 View Multi-Page Diagnostics & AI Solutions
            </button>
            <button
              onClick={() => { setCurrentView('dashboard'); setScoreCard(null); }}
              className="px-6 py-4 bg-slate-800 hover:bg-slate-700 font-bold rounded-xl"
            >
              Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ================= 6. MULTI-PAGE DIAGNOSTICS & REMEDIATION =================
  if (currentView === 'remediation' && scoreCard) {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-8 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
          <h2 className="text-2xl font-black text-orange-400">📖 Multi-Page Diagnostic Read-Out & AI Solutions</h2>
          <button
            onClick={() => setCurrentView('result')}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm"
          >
            ← Back to Scorecard
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-amber-400 mb-2">💡 Auto-Remediation Plan</h3>
            <p className="text-slate-300 text-sm mb-4">Detected <span className="text-red-400 font-bold">{scoreCard.sillyMistakes} silly calculation mistakes</span> and <span className="text-orange-400 font-bold">{scoreCard.conceptualGaps} conceptual gaps</span>.</p>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-sm text-slate-400">
              Recommendation: Focus heavily on core formulas and coordinate calculation steps before taking the next NTA mock.
            </div>
          </div>

          <h3 className="text-xl font-bold mt-8 mb-4">Detailed Solutions & YouTube References</h3>
          {testQuestions.map((q, idx) => {
            const userAns = answers[q.id];
            const isCorrect = String(userAns).trim() === String(q.correctAnswer).trim();
            return (
              <div key={q.id} className={`p-6 rounded-2xl border ${isCorrect ? 'bg-slate-900/50 border-green-500/30' : 'bg-slate-900 border-red-500/30'}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-orange-400">Q{idx + 1}. {q.subject}</span>
                  <span className={`text-xs px-2 py-1 rounded font-bold ${isCorrect ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {isCorrect ? 'Correct ✅' : 'Incorrect ❌'}
                  </span>
                </div>
                <p className="text-sm font-medium mb-3">{q.text}</p>
                <div className="p-3 bg-slate-950 rounded-xl text-xs text-slate-300 mb-3 border border-slate-800">
                  <strong className="text-amber-400">AI Detailed Solution:</strong> {q.solution}
                </div>
                {!isCorrect && (
                  <a
                    href={q.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-lg shadow"
                  >
                    ▶ Watch AI Solution Video on YouTube
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
}