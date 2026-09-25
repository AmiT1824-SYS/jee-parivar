// @ts-nocheck
'use client';

/**
 * ============================================================================
 * 🚀 JEE PARIVAR - ULTIMATE NTA EXAM ENGINE (v3.0)
 * ============================================================================
 * Features:
 * - 📂 Landing Page Direct JSON Upload
 * - 📚 My Files (Persistent Test Library)
 * - 🧠 NTA-style Test Engine with Subject Tabs
 * - 📊 Deep Analytics & Scorecards
 * - ⏱️ Focus Mode & Anti-Cheat System
 * - 📝 Full LaTeX Equation Support
 * ============================================================================
 */

import React, { useState, useEffect, useRef } from 'react';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

// ============================================================================
// 🎨 1. SVG ICONS (CUSTOM UI LIBRARY)
// ============================================================================
const Icons = {
  Upload: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
  Play: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  Trash: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>,
  File: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>,
  Lock: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Check: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Alert: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  Home: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Clock: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  User: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
};

// ============================================================================
// 📦 2. MASSIVE DEFAULT MOCK TEST (FALLBACK DATA)
// ============================================================================
// Agar user ki library khali ho, toh yeh NTA standard mock test dikhega.
const DEFAULT_FALLBACK_TEST = [
  {
    "id": 101, "subject": "Physics", "type": "MCQ",
    "text": "A particle of mass $m$ is projected with velocity $v_0$ at an angle $\\theta$ with the horizontal. The magnitude of angular momentum of the particle about the point of projection when it is at the highest point of its trajectory is:",
    "imageUrl": "",
    "options": ["$\\frac{m v_0^3 \\sin^2 \\theta \\cos \\theta}{2g}$", "$\\frac{m v_0^3 \\sin \\theta \\cos^2 \\theta}{2g}$", "$\\frac{m v_0^3 \\sin^3 \\theta}{2g}$", "Zero"],
    "correctAnswer": 0,
    "solution": "At highest point, velocity is $v_0 \\cos \\theta$ horizontally. The perpendicular distance from projection point is maximum height $H = \\frac{v_0^2 \\sin^2 \\theta}{2g}$. Angular momentum $L = m v r_{\\perp} = m (v_0 \\cos \\theta) \\times (\\frac{v_0^2 \\sin^2 \\theta}{2g}) = \\frac{m v_0^3 \\sin^2 \\theta \\cos \\theta}{2g}$."
  },
  {
    "id": 102, "subject": "Physics", "type": "MCQ",
    "text": "In a Young's double slit experiment, the intensity at a point where path difference is $\\frac{\\lambda}{6}$ ($I$) is compared to maximum intensity ($I_0$). Find $\\frac{I}{I_0}$.",
    "imageUrl": "",
    "options": ["$\\frac{1}{2}$", "$\\frac{3}{4}$", "$\\frac{1}{4}$", "$\\frac{4}{3}$"],
    "correctAnswer": 1,
    "solution": "Phase difference $\\Delta \\phi = \\frac{2\\pi}{\\lambda} \\times \\Delta x = \\frac{2\\pi}{\\lambda} \\times \\frac{\\lambda}{6} = \\frac{\\pi}{3}$.\nIntensity $I = I_0 \\cos^2(\\frac{\\Delta \\phi}{2}) = I_0 \\cos^2(\\frac{\\pi}{6}) = I_0 (\\frac{\\sqrt{3}}{2})^2 = \\frac{3}{4} I_0$."
  },
  {
    "id": 103, "subject": "Physics", "type": "INTEGER",
    "text": "A solid sphere of mass $2 kg$ rolls down an inclined plane of height $7 m$. Calculate its translational kinetic energy (in Joules) at the bottom. (Take $g = 10 m/s^2$)",
    "imageUrl": "",
    "options": [],
    "correctAnswer": "100",
    "solution": "Total Energy $E = mgh = 2 \\times 10 \\times 7 = 140 J$.\nFor solid sphere, $K_{trans} = \\frac{5}{7} K_{total} = \\frac{5}{7} \\times 140 = 100 J$."
  },
  {
    "id": 201, "subject": "Chemistry", "type": "MCQ",
    "text": "Which of the following complexes is diamagnetic?",
    "imageUrl": "",
    "options": ["$[Fe(CN)_6]^{3-}$", "$[Co(NH_3)_6]^{3+}$", "$[NiCl_4]^{2-}$", "$[FeF_6]^{3-}$"],
    "correctAnswer": 1,
    "solution": "In $[Co(NH_3)_6]^{3+}$, Cobalt is in $+3$ state ($3d^6$). $NH_3$ is a strong field ligand, causing pairing of all 6 electrons. Since there are no unpaired electrons, it is diamagnetic."
  },
  {
    "id": 202, "subject": "Chemistry", "type": "INTEGER",
    "text": "For a first order reaction, the time required for $99.9\\%$ completion is $x$ times the half-life ($t_{1/2}$). Find the value of $x$. (Take $\\log 2 = 0.3$)",
    "imageUrl": "",
    "options": [],
    "correctAnswer": "10",
    "solution": "$t = \\frac{2.303}{k} \\log(\\frac{100}{100-99.9}) = \\frac{2.303}{k} \\log(10^3) = 3 \\times \\frac{2.303}{k}$.\nAlso, $t_{1/2} = \\frac{0.693}{k} = \\frac{2.303 \\times 0.3}{k}$.\nDividing the two: $\\frac{t}{t_{1/2}} = \\frac{3}{0.3} = 10$."
  },
  {
    "id": 301, "subject": "Mathematics", "type": "MCQ",
    "text": "Evaluate the limit: $\\lim_{x \\to 0} \\frac{\\int_0^x t \\sin(10t) dt}{x^3}$",
    "imageUrl": "",
    "options": ["$\\frac{10}{3}$", "$\\frac{3}{10}$", "$10$", "0"],
    "correctAnswer": 0,
    "solution": "Using L'Hopital's Rule and Leibnitz theorem:\n$\\lim_{x \\to 0} \\frac{x \\sin(10x)}{3x^2} = \\lim_{x \\to 0} \\frac{\\sin(10x)}{3x} = \\frac{10}{3}$."
  },
  {
    "id": 302, "subject": "Mathematics", "type": "INTEGER",
    "text": "Find the number of integral terms in the binomial expansion of $(\\sqrt{3} + \\sqrt[8]{5})^{256}$.",
    "imageUrl": "",
    "options": [],
    "correctAnswer": "33",
    "solution": "General term $T_{r+1} = \\binom{256}{r} 3^{\\frac{256-r}{2}} 5^{\\frac{r}{8}}$.\nFor term to be integer, $\\frac{256-r}{2}$ and $\\frac{r}{8}$ must be integers.\nSo, $r$ must be a multiple of $8$. Possible values of $r = 0, 8, 16, ..., 256$.\nNumber of values = $\\frac{256}{8} + 1 = 32 + 1 = 33$."
  }
];

// ============================================================================
// 🧠 3. MAIN APPLICATION COMPONENT
// ============================================================================
export default function JEEParivarUltimateLatexApp() {
  
  // -- State: View Routing --
  const [currentView, setCurrentView] = useState<'landing' | 'login' | 'dashboard' | 'test' | 'result' | 'remediation' | 'focus'>('landing');
  
  // -- State: Auth --
  const [authMethod, setAuthMethod] = useState<'choice' | 'phone' | 'google' | 'name'>('choice');
  const [studentName, setStudentName] = useState('Aspirant');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  // -- State: My Files (Test Library) --
  const [myTests, setMyTests] = useState([]);
  
  // -- State: Notifications --
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // -- State: Test Engine --
  const [examType, setExamType] = useState('CUSTOM');
  const [customMinutes, setCustomMinutes] = useState(180);
  const [timer, setTimer] = useState(10800); 
  const [testQuestions, setTestQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [reviewStatus, setReviewStatus] = useState({}); 
  const [questionTimers, setQuestionTimers] = useState({});
  const [activeSubject, setActiveSubject] = useState('Physics'); // For NTA tabs

  const [scoreCard, setScoreCard] = useState(null);

  // -- State: Focus Mode & Anti-Cheat --
  const [focusMinutes, setFocusMinutes] = useState(25);
  const [focusTimerSeconds, setFocusTimerSeconds] = useState(25 * 60);
  const [isFocusActive, setIsFocusActive] = useState(false);
  const [isLockedDown, setIsLockedDown] = useState(false);
  const [typedVerification, setTypedVerification] = useState('');
  const [focusSessions, setFocusSessions] = useState([]);
  const [analyticsTab, setAnalyticsTab] = useState<'today' | 'week' | 'month' | 'year'>('today');

  // ============================================================================
  // ⚙️ 4. LIFECYCLE & LOCAL STORAGE HANDLERS
  // ============================================================================

  // Init Data from Local Storage on Mount
  useEffect(() => {
    try {
      const savedTests = localStorage.getItem('jee_my_files');
      if (savedTests) setMyTests(JSON.parse(savedTests));
      
      const savedFocus = localStorage.getItem('jee_focus_sessions');
      if (savedFocus) setFocusSessions(JSON.parse(savedFocus));
      
      const savedUser = localStorage.getItem('jee_student_name');
      if (savedUser) setStudentName(savedUser);

      // Load ongoing test state if exists
      const savedView = localStorage.getItem('jee_current_view');
      if (savedView === 'test' || savedView === 'result') {
        const sq = localStorage.getItem('jee_test_questions');
        const sa = localStorage.getItem('jee_test_answers');
        const st = localStorage.getItem('jee_test_timer');
        if (sq) setTestQuestions(JSON.parse(sq));
        if (sa) setAnswers(JSON.parse(sa));
        if (st) setTimer(parseInt(st));
        setCurrentView(savedView);
      }
    } catch (e) {
      console.error("Storage parse error", e);
    }
  }, []);

  // Save current view state
  useEffect(() => {
    localStorage.setItem('jee_current_view', currentView);
    if (currentView === 'test' && testQuestions.length > 0) {
      localStorage.setItem('jee_test_questions', JSON.stringify(testQuestions));
    }
  }, [currentView, testQuestions]);

  // Save answers continuously
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem('jee_test_answers', JSON.stringify(answers));
    }
  }, [answers]);

  // Toast Helper
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  // ============================================================================
  // 📂 5. FILE UPLOAD LOGIC (LANDING PAGE & DASHBOARD)
  // ============================================================================
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== "application/json") {
      showToast("Only JSON format is supported! Please convert your paper first.", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonContent = JSON.parse(e.target.result);
        
        // Validation check
        if (!Array.isArray(jsonContent) || jsonContent.length === 0 || !jsonContent[0].text) {
          throw new Error("Invalid JSON schema.");
        }

        const newTest = {
          id: Date.now().toString(),
          name: file.name.replace('.json', ''),
          uploadedAt: new Date().toISOString(),
          questionCount: jsonContent.length,
          data: jsonContent
        };

        const updatedTests = [newTest, ...myTests];
        setMyTests(updatedTests);
        localStorage.setItem('jee_my_files', JSON.stringify(updatedTests));
        
        showToast(`🎉 Super! "${file.name}" added to your Library.`);
        
        // If uploaded from landing, push to dashboard
        if (currentView === 'landing') {
          if (studentName === 'Aspirant') {
            setCurrentView('login');
          } else {
            setCurrentView('dashboard');
          }
        }
      } catch (error) {
        showToast("Error parsing JSON file. Check format.", "error");
        console.error(error);
      }
    };
    reader.readAsText(file);
  };

  const deleteTest = (id) => {
    if (window.confirm("Are you sure you want to delete this test?")) {
      const updated = myTests.filter(t => t.id !== id);
      setMyTests(updated);
      localStorage.setItem('jee_my_files', JSON.stringify(updated));
      showToast("Test deleted successfully.");
    }
  };

  // ============================================================================
  // ⏱️ 6. TEST ENGINE TIMERS & ANTI-CHEAT
  // ============================================================================
  useEffect(() => {
    let interval;
    if (currentView === 'test' && timer > 0 && !scoreCard) {
      interval = setInterval(() => {
        setTimer((prev) => {
          const newTime = prev - 1;
          if (newTime % 10 === 0) localStorage.setItem('jee_test_timer', newTime.toString());
          return newTime;
        });
        setQuestionTimers((prev) => ({
          ...prev,
          [currentQuestionIndex]: (prev[currentQuestionIndex] || 0) + 1
        }));
      }, 1000);
    } else if (timer === 0 && currentView === 'test') {
      handleSubmitTest();
    }
    return () => clearInterval(interval);
  }, [currentView, timer, scoreCard, currentQuestionIndex]);

  useEffect(() => {
    let interval;
    if (isFocusActive && !isLockedDown && focusTimerSeconds > 0) {
      interval = setInterval(() => setFocusTimerSeconds(prev => prev - 1), 1000);
    } else if (focusTimerSeconds === 0 && isFocusActive) {
      setIsFocusActive(false);
      saveFocusSession(focusMinutes);
      showToast('🎉 Focus Session Completed Successfully!');
    }
    return () => clearInterval(interval);
  }, [isFocusActive, isLockedDown, focusTimerSeconds, focusMinutes]);

  // Anti-Cheat Visibility Guard
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && currentView === 'test' && !scoreCard) {
        showToast("⚠️ Warning: Tab switch detected during active test!", "error");
      }
      if (document.hidden && isFocusActive && !isLockedDown) {
        setIsLockedDown(true);
        setTypedVerification('');
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isFocusActive, isLockedDown, currentView, scoreCard]);

  // ============================================================================
  // 🕹️ 7. TEST ACTIONS (START, SUBMIT, KEYPAD)
  // ============================================================================
  const startTestFromLibrary = (test) => {
    setTestQuestions(test.data);
    setExamType(test.name);
    setTimer(customMinutes * 60);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setReviewStatus({});
    setQuestionTimers({});
    
    // Auto-detect first subject
    if (test.data.length > 0 && test.data[0].subject) {
      setActiveSubject(test.data[0].subject);
    }
    
    setCurrentView('test');
  };

  const startDefaultFallbackTest = () => {
    startTestFromLibrary({ name: "JEE Standard Mock", data: DEFAULT_FALLBACK_TEST });
  };

  const handleVirtualKeypad = (char) => {
    const q = testQuestions[currentQuestionIndex];
    if (!q) return;
    const currentVal = answers[q.id] !== undefined ? String(answers[q.id]) : '';
    
    if (char === 'CLEAR') {
      const newAns = { ...answers };
      delete newAns[q.id];
      setAnswers(newAns);
    } else if (char === 'BACK') {
      setAnswers({ ...answers, [q.id]: currentVal.slice(0, -1) });
    } else {
      setAnswers({ ...answers, [q.id]: currentVal + char });
    }
  };

  const jumpToQuestion = (index) => {
    setCurrentQuestionIndex(index);
    if (testQuestions[index]?.subject) {
      setActiveSubject(testQuestions[index].subject);
    }
  };

  const handleSaveAndNext = () => {
    const q = testQuestions[currentQuestionIndex];
    if (q) setReviewStatus({ ...reviewStatus, [q.id]: false }); 
    if (currentQuestionIndex < testQuestions.length - 1) {
      jumpToQuestion(currentQuestionIndex + 1);
    }
  };

  const handleMarkForReviewAndNext = () => {
    const q = testQuestions[currentQuestionIndex];
    if (q) setReviewStatus({ ...reviewStatus, [q.id]: true });
    if (currentQuestionIndex < testQuestions.length - 1) {
      jumpToQuestion(currentQuestionIndex + 1);
    }
  };

  const handleClearResponse = () => {
    const q = testQuestions[currentQuestionIndex];
    if (q) {
      const newAns = { ...answers };
      delete newAns[q.id];
      setAnswers(newAns);
      setReviewStatus({ ...reviewStatus, [q.id]: false });
    }
  };

  const handleSubmitTest = () => {
    if (window.confirm("Are you sure you want to submit the test?")) {
      calculateResult();
    }
  };

  const calculateResult = () => {
    let correct = 0, incorrect = 0, unattempted = 0;
    let subjectStats = {};

    // Init stats for all unique subjects
    testQuestions.forEach(q => {
      const subj = q.subject || 'General';
      if (!subjectStats[subj]) subjectStats[subj] = { correct: 0, incorrect: 0, total: 0, score: 0 };
    });

    testQuestions.forEach((q) => {
      const subj = q.subject || 'General';
      subjectStats[subj].total++;

      const userAns = answers[q.id];
      if (userAns === undefined || userAns === '') {
        unattempted++;
      } else if (String(userAns).trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase()) {
        correct++;
        subjectStats[subj].correct++;
        subjectStats[subj].score += 4;
      } else {
        incorrect++;
        subjectStats[subj].incorrect++;
        subjectStats[subj].score -= 1; 
      }
    });

    const totalScore = (correct * 4) - (incorrect * 1);
    const maxPossibleScore = testQuestions.length * 4;
    
    // Dynamic Percentile formula (Mock)
    const ratio = totalScore / maxPossibleScore;
    let percentile = 0;
    if (ratio > 0.8) percentile = 99 + (ratio - 0.8) * 4;
    else if (ratio > 0.5) percentile = 90 + (ratio - 0.5) * 30;
    else percentile = Math.max(10, ratio * 150);

    setScoreCard({
      score: totalScore, 
      maxScore: maxPossibleScore, 
      correct, 
      incorrect, 
      unattempted, 
      percentile: percentile.toFixed(2) + '%', 
      rank: Math.floor(Math.random() * 5000) + 100, // Fun mock rank
      sillyMistakes: Math.floor(incorrect * 0.4), 
      conceptualGaps: Math.ceil(incorrect * 0.6), 
      subjectStats
    });
    
    setCurrentView('result');
    localStorage.removeItem('jee_test_timer'); // Clear active test marker
  };

  const getYouTubeSearchLink = (text) => {
    if (!text) return '';
    const cleanText = text.replace(/[\$\\]/g, ' ').slice(0, 50).trim();
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(cleanText + ' JEE solution video')}`;
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs > 0 ? hrs.toString().padStart(2, '0') + ':' : ''}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Extract unique subjects for NTA Tabs
  const uniqueSubjects = [...new Set(testQuestions.map(q => q.subject || 'General'))];

  // ============================================================================
  // 🖥️ 8. COMPONENT RENDER LOGIC
  // ============================================================================

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-orange-500/30">
      
      {/* GLOBAL TOAST NOTIFICATION */}
      {toast.show && (
        <div className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full font-bold shadow-2xl z-[100] flex items-center gap-3 animate-in slide-in-from-top-5 duration-300 ${toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-green-500 text-slate-900'}`}>
          {toast.type === 'error' ? <Icons.Alert /> : <Icons.Check />}
          {toast.message}
        </div>
      )}

      {/* ------------------------------------------------------------------------
          VIEW: LANDING PAGE (WITH DIRECT UPLOAD)
          ------------------------------------------------------------------------ */}
      {currentView === 'landing' && (
        <div className="flex flex-col min-h-screen">
          <nav className="flex justify-between items-center px-6 md:px-10 py-5 border-b border-slate-800 bg-slate-900/80 backdrop-blur-lg sticky top-0 z-50">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-black bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent tracking-tighter">JEE PARIVAR</span>
              <span className="text-xs px-2.5 py-1 bg-slate-800 text-slate-300 rounded-full border border-slate-700 hidden sm:block">No APIs. No Errors.</span>
            </div>
            <button onClick={() => setCurrentView('login')} className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-slate-950 font-black rounded-xl transition-all shadow-lg shadow-orange-500/20">
              Student Login 🚀
            </button>
          </nav>

          <main className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-12 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 blur-[100px] rounded-full pointer-events-none"></div>
            
            <div className="max-w-4xl relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-700 text-amber-400 text-sm font-bold shadow-xl">
                <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span></span>
                Local JSON Engine Active
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
                Upload Test. <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">Start Solving.</span>
              </h1>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Bypass all limits. Convert any paper into our JSON format via AI, drop it here, and experience the exact NTA interface instantly. Forever free.
              </p>
            </div>

            {/* DRAG & DROP UPLOAD ZONE (FRONT PAGE) */}
            <div className="relative z-10 w-full max-w-2xl">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-orange-500/50 rounded-3xl bg-orange-500/5 hover:bg-orange-500/10 transition-colors cursor-pointer group shadow-2xl">
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-orange-400 group-hover:scale-110 transition-transform">
                  <Icons.Upload />
                  <p className="mb-2 mt-4 text-xl font-black text-slate-200">Drop your JSON test file here</p>
                  <p className="text-sm text-slate-500 font-bold">Files are saved locally to your browser</p>
                </div>
                <input type="file" accept=".json" className="hidden" onChange={handleFileUpload} />
              </label>
            </div>
            
            <div className="relative z-10 pt-8">
              <button onClick={() => setCurrentView('login')} className="text-slate-400 hover:text-white font-bold border-b border-dashed border-slate-500 pb-1 transition-colors">
                Already uploaded a test? Go to Dashboard →
              </button>
            </div>
          </main>
        </div>
      )}

      {/* ------------------------------------------------------------------------
          VIEW: LOGIN / AUTH
          ------------------------------------------------------------------------ */}
      {currentView === 'login' && (
        <div className="flex items-center justify-center min-h-screen p-6 relative">
          <div className="absolute top-6 left-6 cursor-pointer opacity-50 hover:opacity-100 transition-opacity" onClick={() => setCurrentView('landing')}>
            <Icons.Home />
          </div>
          <div className="bg-slate-900 border border-slate-800 p-10 rounded-3xl max-w-md w-full shadow-2xl relative z-10">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-400">
                <Icons.User />
              </div>
              <h2 className="text-3xl font-black text-white mb-2">Student Portal</h2>
              <p className="text-slate-400 text-sm">Access your local test library</p>
            </div>

            {authMethod === 'choice' && (
              <div className="space-y-4">
                <button onClick={() => { setStudentName('Google User'); setCurrentView('dashboard'); }} className="w-full py-4 px-4 bg-slate-950 border border-slate-700 hover:border-slate-500 rounded-xl font-bold flex items-center justify-center gap-3 transition-colors">
                  🌐 Continue with Google
                </button>
                <button onClick={() => setAuthMethod('phone')} className="w-full py-4 px-4 bg-orange-500/10 text-orange-400 border border-orange-500/30 hover:bg-orange-500/20 rounded-xl font-bold flex items-center justify-center gap-3 transition-colors">
                  📱 Phone Number
                </button>
                <button onClick={() => setAuthMethod('name')} className="w-full py-4 px-4 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold flex items-center justify-center gap-3 transition-colors text-slate-300">
                  👤 Quick Name Entry
                </button>
              </div>
            )}

            {authMethod === 'name' && (
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Your Full Name</label>
                  <input type="text" placeholder="e.g. Amit Kumar" value={studentName} onChange={(e) => setStudentName(e.target.value)} className="w-full p-4 bg-slate-950 border border-slate-700 rounded-xl text-white outline-none focus:border-orange-500 transition-colors" />
                </div>
                <button onClick={() => { if(studentName.trim()){ localStorage.setItem('jee_student_name', studentName); setCurrentView('dashboard');} }} className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-slate-950 font-black rounded-xl transition-all shadow-lg">
                  Enter Dashboard 🚀
                </button>
                <button onClick={() => setAuthMethod('choice')} className="w-full py-2 text-slate-500 hover:text-white text-sm transition-colors">← Back</button>
              </div>
            )}
            
            {/* Phone Logic Omitted for Brevity (Same as before but stylized) */}
            {authMethod === 'phone' && (
               <div className="space-y-5">
               <input type="tel" placeholder="Mobile Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full p-4 bg-slate-950 border border-slate-700 rounded-xl outline-none focus:border-orange-500" />
               <button onClick={() => { setStudentName('User '+phoneNumber.slice(-4)); setCurrentView('dashboard'); }} className="w-full py-4 bg-orange-500 text-slate-950 font-black rounded-xl">Bypass OTP & Login</button>
               <button onClick={() => setAuthMethod('choice')} className="w-full py-2 text-slate-500 text-sm">← Back</button>
             </div>
            )}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------------
          VIEW: DASHBOARD & MY FILES (LIBRARY)
          ------------------------------------------------------------------------ */}
      {currentView === 'dashboard' && (
        <div className="min-h-screen flex flex-col pb-10">
          <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 md:px-10 py-5 flex justify-between items-center sticky top-0 z-40">
            <div>
              <h1 className="text-xl md:text-2xl font-black text-white">Welcome, <span className="text-orange-400">{studentName}</span> 🎯</h1>
              <p className="text-xs text-slate-400 mt-1">JEE 2026 Mission • Target: IIT Bombay</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setCurrentView('focus')} className="px-4 py-2 bg-purple-600/20 text-purple-400 hover:bg-purple-600/30 border border-purple-500/30 rounded-xl font-bold flex items-center gap-2 transition-colors text-sm">
                <Icons.Clock /> Focus Mode
              </button>
              <button onClick={() => { setCurrentView('landing'); setAuthMethod('choice'); }} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold text-sm">Logout</button>
            </div>
          </header>

          <main className="max-w-6xl w-full mx-auto px-6 mt-10 space-y-10">
            
            {/* Quick Upload Widget inside Dashboard */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl">
              <div>
                <h2 className="text-2xl font-black text-white mb-2">Add New Test</h2>
                <p className="text-sm text-slate-400">Upload a JSON file formatted via AI. It stays locally in your browser.</p>
              </div>
              <label className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-slate-950 font-black px-8 py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-1 flex items-center gap-3">
                <Icons.Upload />
                Select JSON File
                <input type="file" accept=".json" className="hidden" onChange={handleFileUpload} />
              </label>
            </div>

            {/* MY FILES LIBRARY */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-orange-500/10 text-orange-400 rounded-xl flex items-center justify-center border border-orange-500/20">
                  <Icons.File />
                </div>
                <h2 className="text-3xl font-black text-white">My Files <span className="text-slate-500 text-xl font-medium">({myTests.length})</span></h2>
              </div>

              {myTests.length === 0 ? (
                <div className="bg-slate-900 border border-slate-800 border-dashed rounded-3xl p-12 text-center text-slate-500 flex flex-col items-center justify-center shadow-inner">
                  <Icons.File />
                  <p className="mt-4 text-lg font-bold">Your library is empty.</p>
                  <p className="text-sm mb-6">Upload a test to see it here, or play the default mock test.</p>
                  <button onClick={startDefaultFallbackTest} className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors">
                    Start Built-in NTA Mock Test
                  </button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myTests.map((test) => (
                    <div key={test.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col shadow-lg hover:border-slate-700 transition-colors group">
                      <div className="flex justify-between items-start mb-4">
                        <div className="bg-slate-950 px-3 py-1 rounded-lg border border-slate-800 text-xs font-bold text-slate-400">
                          {new Date(test.uploadedAt).toLocaleDateString()}
                        </div>
                        <button onClick={() => deleteTest(test.id)} className="text-slate-600 hover:text-red-500 transition-colors">
                          <Icons.Trash />
                        </button>
                      </div>
                      <h3 className="text-xl font-black text-white mb-2 line-clamp-2">{test.name}</h3>
                      <p className="text-sm text-slate-400 mb-6 font-medium">{test.questionCount} Questions included</p>
                      
                      <button onClick={() => startTestFromLibrary(test)} className="mt-auto w-full py-3.5 bg-slate-800 group-hover:bg-orange-500 group-hover:text-slate-950 text-white font-black rounded-xl transition-all flex items-center justify-center gap-2">
                        <Icons.Play /> Start Test
                      </button>
                    </div>
                  ))}
                  
                  {/* Always show Default option as a card too */}
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col shadow-inner relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-green-500/20 text-green-400 text-[10px] font-black px-3 py-1 rounded-bl-xl border-l border-b border-green-500/30">BUILT-IN</div>
                    <h3 className="text-xl font-black text-slate-300 mt-4 mb-2">JEE Standard Mock</h3>
                    <p className="text-sm text-slate-500 mb-6 font-medium">Pre-loaded fallback test</p>
                    <button onClick={startDefaultFallbackTest} className="mt-auto w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-black rounded-xl transition-all">
                      Start Test
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Config Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 mt-12">
              <h3 className="text-lg font-black text-white mb-4">Test Configuration</h3>
              <div className="max-w-xs">
                <label className="text-xs font-bold text-slate-400 block mb-2 uppercase tracking-wider">Custom Duration (Minutes)</label>
                <input type="number" value={customMinutes} onChange={(e) => setCustomMinutes(Number(e.target.value))} className="w-full p-4 bg-slate-950 border border-slate-700 rounded-xl text-white outline-none focus:border-orange-500 font-black text-lg" />
              </div>
            </div>

          </main>
        </div>
      )}

      {/* ------------------------------------------------------------------------
          VIEW: TEST ENGINE (NTA REPLICA)
          ------------------------------------------------------------------------ */}
      {currentView === 'test' && testQuestions.length > 0 && (
        <div className="flex flex-col h-screen overflow-hidden bg-slate-950">
          
          {/* Header */}
          <header className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex justify-between items-center shrink-0">
            <h1 className="font-black text-xl text-orange-400 truncate pr-4">{examType}</h1>
            <div className="flex items-center gap-4 shrink-0">
              <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 text-center shadow-inner hidden md:block">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Time Spent</p>
                <p className="font-mono font-black text-orange-400 text-sm">{questionTimers[currentQuestionIndex] || 0}s</p>
              </div>
              <div className="bg-slate-950 px-5 py-2 rounded-xl border border-slate-800 shadow-inner text-center">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Time Left</p>
                <p className={`font-mono text-xl font-black ${timer < 300 ? 'text-red-500 animate-pulse' : 'text-amber-400'}`}>{formatTime(timer)}</p>
              </div>
            </div>
          </header>
          
          {/* Main Layout */}
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            
            {/* Left Side: Question Area */}
            <div className="flex-1 flex flex-col border-r border-slate-800 relative">
              
              {/* NTA Subject Tabs */}
              <div className="flex bg-slate-900 border-b border-slate-800 shrink-0 overflow-x-auto">
                {uniqueSubjects.map(subj => (
                  <button 
                    key={subj} 
                    onClick={() => {
                      setActiveSubject(subj);
                      const firstIndexOfSubj = testQuestions.findIndex(q => (q.subject || 'General') === subj);
                      if(firstIndexOfSubj !== -1) setCurrentQuestionIndex(firstIndexOfSubj);
                    }}
                    className={`px-6 py-3 font-black text-sm uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${activeSubject === subj ? 'bg-slate-950 text-orange-400 border-orange-500' : 'text-slate-500 border-transparent hover:text-slate-300 hover:bg-slate-800'}`}
                  >
                    {subj}
                  </button>
                ))}
              </div>

              {/* Question Content Scrollable Area */}
              <div className="flex-1 overflow-y-auto p-6 md:p-10 pb-32">
                {(() => {
                  const q = testQuestions[currentQuestionIndex];
                  return (
                    <div className="max-w-4xl mx-auto">
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-sm font-black text-slate-500 uppercase tracking-widest">Question {currentQuestionIndex + 1}</span>
                        <span className="text-xs px-2 py-1 bg-slate-900 border border-slate-700 text-slate-400 rounded-lg font-bold">{q.type}</span>
                      </div>
                      
                      {/* Text & Latex */}
                      <div className="text-lg md:text-xl font-medium mb-8 leading-relaxed text-slate-200">
                        <Latex>{q.text}</Latex>
                      </div>
                      
                      {/* Image Diagram (If exists) */}
                      {q.imageUrl && (
                        <div className="mb-8 bg-slate-900 p-4 rounded-xl border border-slate-800 inline-block">
                          <img src={q.imageUrl} alt="Diagram" className="max-w-full h-auto rounded-lg max-h-[300px] object-contain" />
                        </div>
                      )}

                      {/* Options / Input */}
                      {q.type === 'MCQ' && q.options ? (
                        <div className="space-y-4">
                          {q.options.map((opt, idx) => (
                            <label key={idx} className={`w-full flex items-center p-5 rounded-2xl border-2 transition-all cursor-pointer select-none ${answers[q.id] === idx ? 'bg-orange-500/10 border-orange-500 text-orange-300' : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50 text-slate-300'}`}>
                              <input type="radio" name={`q-${q.id}`} checked={answers[q.id] === idx} onChange={() => setAnswers({...answers, [q.id]: idx})} className="hidden" />
                              <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-black mr-4 border ${answers[q.id] === idx ? 'bg-orange-500 border-orange-500 text-slate-950' : 'bg-slate-950 border-slate-700 text-slate-500'}`}>
                                {String.fromCharCode(65 + idx)}
                              </span>
                              <span className="flex-1"><Latex>{opt}</Latex></span>
                            </label>
                          ))}
                        </div>
                      ) : (
                        <div className="max-w-sm">
                          <input type="text" readOnly value={answers[q.id] || ''} placeholder="Type using keypad below..." className="w-full p-5 bg-slate-900 border-2 border-slate-700 rounded-2xl text-white font-mono text-2xl mb-4 text-center tracking-widest shadow-inner focus:border-orange-500 outline-none" />
                          <div className="grid grid-cols-3 gap-2">
                            {['1','2','3','4','5','6','7','8','9','-','0','.'].map(char => (
                              <button key={char} onClick={() => handleVirtualKeypad(char)} className="p-4 bg-slate-800 hover:bg-slate-700 rounded-xl font-black text-xl active:scale-95 transition-transform">{char}</button>
                            ))}
                            <button onClick={() => handleVirtualKeypad('CLEAR')} className="p-4 bg-red-500/10 text-red-500 rounded-xl font-black text-xs uppercase active:scale-95 transition-transform">Clear</button>
                            <button onClick={() => handleVirtualKeypad('BACK')} className="p-4 bg-amber-500/10 text-amber-500 rounded-xl font-black text-xs uppercase active:scale-95 transition-transform col-span-2">Backspace</button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>

              {/* Action Bar (Fixed at bottom of left pane) */}
              <div className="absolute bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-md border-t border-slate-800 p-4 flex flex-wrap justify-between items-center gap-3">
                <div className="flex gap-2">
                  <button onClick={handleClearResponse} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-lg text-sm transition-colors">Clear</button>
                  <button onClick={handleMarkForReviewAndNext} className="px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 border border-purple-500/30 font-bold rounded-lg text-sm transition-colors">Mark & Next</button>
                </div>
                <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                  <button disabled={currentQuestionIndex === 0} onClick={() => jumpToQuestion(currentQuestionIndex - 1)} className="flex-1 sm:flex-none px-6 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white font-bold rounded-lg text-sm transition-colors">Previous</button>
                  {currentQuestionIndex < testQuestions.length - 1 ? (
                    <button onClick={handleSaveAndNext} className="flex-1 sm:flex-none px-8 py-2 bg-green-600 hover:bg-green-500 text-white font-black rounded-lg text-sm shadow-lg transition-colors">Save & Next</button>
                  ) : (
                    <button onClick={handleSubmitTest} className="flex-1 sm:flex-none px-8 py-2 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-lg text-sm shadow-lg transition-colors">Submit Test</button>
                  )}
                </div>
              </div>

            </div>

            {/* Right Side: Palette Area */}
            <div className="w-full lg:w-80 bg-slate-900 flex flex-col shrink-0">
              
              {/* Profile Bar */}
              <div className="p-4 border-b border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-slate-900 font-black shrink-0">
                  {studentName.charAt(0).toUpperCase()}
                </div>
                <div className="overflow-hidden">
                  <p className="font-bold text-sm text-white truncate">{studentName}</p>
                  <p className="text-xs text-slate-500 truncate">Candidate</p>
                </div>
              </div>

              {/* Palette Grid */}
              <div className="flex-1 overflow-y-auto p-4">
                <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Question Palette</h3>
                
                {/* Filter grid by active subject to mimic NTA better, but showing all for simplicity here */}
                <div className="grid grid-cols-4 gap-2">
                  {testQuestions.map((q, idx) => {
                    // Only show palette items for the active subject tab
                    if ((q.subject || 'General') !== activeSubject) return null;

                    const hasAnswer = answers[q.id] !== undefined && answers[q.id] !== '';
                    const isReview = reviewStatus[q.id];
                    const isCurrent = currentQuestionIndex === idx;
                    
                    let bg = 'bg-slate-950 text-slate-400 border-slate-800'; // Not visited/answered
                    if (hasAnswer && !isReview) bg = 'bg-green-500/20 text-green-400 border-green-500/30';
                    else if (!hasAnswer && isReview) bg = 'bg-purple-500/20 text-purple-400 border-purple-500/30';
                    else if (hasAnswer && isReview) bg = 'bg-purple-500/20 text-purple-400 border-purple-500/30 relative';
                    
                    return (
                      <button key={q.id} onClick={() => setCurrentQuestionIndex(idx)} className={`h-10 rounded-lg font-black text-xs border transition-all flex items-center justify-center ${bg} ${isCurrent ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900' : 'hover:border-slate-500'}`}>
                        {idx + 1}
                        {hasAnswer && isReview && <span className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-green-500 rounded-full"></span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Legend & Final Submit */}
              <div className="p-4 border-t border-slate-800 bg-slate-950 shrink-0">
                <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-6">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-green-500/20 border border-green-500/30"></div> Answered</div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-slate-900 border border-slate-800"></div> Unanswered</div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-purple-500/20 border border-purple-500/30"></div> Review</div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-purple-500/20 border border-purple-500/30 relative"><span className="absolute bottom-0 right-0 w-1 h-1 bg-green-500 rounded-full"></span></div> Ans + Rev</div>
                </div>
                <button onClick={handleSubmitTest} className="w-full py-3 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 rounded-xl font-black text-sm uppercase transition-colors">
                  Submit Final Test
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------------
          VIEW: RESULT SCORECARD (ANALYTICS)
          ------------------------------------------------------------------------ */}
      {currentView === 'result' && scoreCard && (
        <div className="min-h-screen p-6 md:p-10 max-w-6xl mx-auto animate-in fade-in zoom-in duration-500">
          <header className="flex justify-between items-center mb-10 border-b border-slate-800 pb-6">
            <div>
              <h2 className="text-3xl font-black text-white">Scorecard</h2>
              <p className="text-slate-400">{examType} • {new Date().toLocaleDateString()}</p>
            </div>
            <button onClick={() => { setCurrentView('dashboard'); setScoreCard(null); }} className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors">
              Exit to Dashboard
            </button>
          </header>

          <div className="grid md:grid-cols-4 gap-6 mb-10">
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 text-center shadow-lg">
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Total Score</p>
              <p className="text-5xl font-black text-amber-400">{scoreCard.score}</p>
              <p className="text-sm font-bold text-slate-600 mt-2">out of {scoreCard.maxScore}</p>
            </div>
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 text-center shadow-lg">
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Accuracy</p>
              <div className="flex justify-center items-end gap-2 mt-4">
                <span className="text-3xl font-black text-green-500">{scoreCard.correct}</span>
                <span className="text-xl font-black text-slate-600 mb-1">/</span>
                <span className="text-2xl font-black text-red-500">{scoreCard.incorrect}</span>
              </div>
              <p className="text-[10px] font-bold text-slate-600 uppercase mt-4">{scoreCard.unattempted} Unattempted</p>
            </div>
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 text-center shadow-lg">
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Est. Percentile</p>
              <p className="text-4xl font-black text-blue-400 mt-3">{scoreCard.percentile}</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500/20 to-amber-500/5 p-6 rounded-3xl border border-orange-500/30 text-center shadow-lg">
              <p className="text-xs font-black text-orange-500/80 uppercase tracking-widest mb-2">Predicted Rank</p>
              <p className="text-4xl font-black text-orange-400 mt-3">#{scoreCard.rank}</p>
            </div>
          </div>

          <h3 className="text-xl font-black text-white mb-6 border-l-4 border-amber-400 pl-4">Subject-wise Breakdown</h3>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {Object.entries(scoreCard.subjectStats).map(([subj, data]) => {
              if (data.total === 0) return null;
              const maxSubjScore = data.total * 4;
              const fillPercent = Math.max(0, (data.score / maxSubjScore) * 100);
              return (
                <div key={subj} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-black text-lg text-slate-200">{subj}</h4>
                    <span className="font-black text-amber-400 bg-amber-400/10 px-3 py-1 rounded-lg text-sm">{data.score} <span className="text-slate-500 text-xs">/ {maxSubjScore}</span></span>
                  </div>
                  
                  {/* Custom Progress Bar */}
                  <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden mb-6 border border-slate-800">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: `${fillPercent}%` }}></div>
                  </div>

                  <div className="flex justify-between text-center bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Correct</p>
                      <p className="font-black text-green-500">{data.correct}</p>
                    </div>
                    <div className="w-px bg-slate-800"></div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Incorrect</p>
                      <p className="font-black text-red-500">{data.incorrect}</p>
                    </div>
                    <div className="w-px bg-slate-800"></div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Unattempted</p>
                      <p className="font-black text-slate-500">{data.total - data.correct - data.incorrect}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center pt-6 border-t border-slate-800">
            <button onClick={() => setCurrentView('remediation')} className="bg-orange-500 hover:bg-orange-600 text-slate-950 font-black text-lg px-12 py-5 rounded-2xl shadow-xl transition-transform hover:-translate-y-1">
              View Solutions & Remediation
            </button>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------------
          VIEW: REMEDIATION (SOLUTIONS)
          ------------------------------------------------------------------------ */}
      {currentView === 'remediation' && scoreCard && (
        <div className="min-h-screen p-6 md:p-10 max-w-5xl mx-auto">
          <header className="flex justify-between items-center mb-10 border-b border-slate-800 pb-6 sticky top-0 bg-slate-950/90 backdrop-blur-md z-40">
            <h2 className="text-3xl font-black text-orange-400">Detailed Solutions</h2>
            <button onClick={() => setCurrentView('result')} className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors">
              Back to Scorecard
            </button>
          </header>

          <div className="space-y-8">
            {testQuestions.map((q, idx) => {
              const userAns = answers[q.id];
              const isAttempted = userAns !== undefined && userAns !== '';
              const isCorrect = isAttempted && String(userAns).trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase();

              return (
                <div key={q.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl relative overflow-hidden">
                  
                  {/* Status Ribbon */}
                  <div className={`absolute top-0 right-0 px-6 py-1.5 text-xs font-black uppercase tracking-widest rounded-bl-xl ${!isAttempted ? 'bg-slate-800 text-slate-400' : isCorrect ? 'bg-green-500 text-slate-900' : 'bg-red-500 text-white'}`}>
                    {!isAttempted ? 'Unattempted' : isCorrect ? 'Correct ✅' : 'Incorrect ❌'}
                  </div>

                  <div className="mb-6">
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                      Q{idx + 1} • {q.subject || 'General'}
                    </span>
                  </div>
                  
                  <div className="text-lg mb-8 text-white leading-relaxed">
                    <Latex>{q.text}</Latex>
                    {q.imageUrl && <div className="mt-4"><img src={q.imageUrl} alt="Diagram" className="max-w-full rounded-lg" style={{maxHeight: '200px'}} /></div>}
                  </div>

                  {q.type === 'MCQ' && (
                    <div className="mb-8 grid gap-3">
                      {q.options.map((opt, oIdx) => {
                        let styling = 'bg-slate-950 border-slate-800 text-slate-400'; // default
                        if (oIdx === q.correctAnswer) styling = 'bg-green-500/10 border-green-500/30 text-green-400 ring-1 ring-green-500/50';
                        else if (isAttempted && oIdx === userAns && !isCorrect) styling = 'bg-red-500/10 border-red-500/30 text-red-400';
                        
                        return (
                          <div key={oIdx} className={`p-4 rounded-xl border flex items-center ${styling}`}>
                            <span className="font-black mr-4 text-sm w-6">{String.fromCharCode(65 + oIdx)}.</span>
                            <span className="flex-1"><Latex>{opt}</Latex></span>
                            {oIdx === q.correctAnswer && <span className="ml-2 text-[10px] font-black uppercase bg-green-500/20 text-green-400 px-2 py-1 rounded">Correct</span>}
                            {isAttempted && oIdx === userAns && !isCorrect && <span className="ml-2 text-[10px] font-black uppercase bg-red-500/20 text-red-400 px-2 py-1 rounded">Your Ans</span>}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {q.type === 'INTEGER' && (
                    <div className="mb-8 flex gap-4">
                      <div className="flex-1 p-4 bg-slate-950 border border-slate-800 rounded-xl">
                        <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Correct Answer</p>
                        <p className="text-xl font-black text-green-400">{q.correctAnswer}</p>
                      </div>
                      <div className="flex-1 p-4 bg-slate-950 border border-slate-800 rounded-xl">
                        <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Your Answer</p>
                        <p className={`text-xl font-black ${!isAttempted ? 'text-slate-600' : isCorrect ? 'text-green-400' : 'text-red-400'}`}>{!isAttempted ? 'N/A' : userAns}</p>
                      </div>
                    </div>
                  )}

                  <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 mt-4">
                    <h4 className="text-xs font-black text-amber-400 uppercase tracking-widest mb-4">Official Solution Step-by-Step</h4>
                    <div className="text-slate-300 leading-relaxed text-sm">
                      <Latex>{q.solution || 'No detailed solution available for this question in the JSON.'}</Latex>
                    </div>
                  </div>

                  {!isCorrect && (
                    <div className="mt-6 flex justify-end">
                      <a href={q.youtubeLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs bg-red-600/10 hover:bg-red-600/20 text-red-500 border border-red-500/30 font-black px-4 py-2 rounded-lg transition-colors">
                        <Icons.Play /> Search Solution on YouTube
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------------
          VIEW: FOCUS MODE (ANTI-CHEAT STUDY TIMER)
          ------------------------------------------------------------------------ */}
      {currentView === 'focus' && (
        <div className="min-h-screen p-6 md:p-10 max-w-4xl mx-auto flex flex-col items-center justify-center">
          <div className="w-full bg-slate-900 p-10 rounded-3xl border border-slate-800 shadow-2xl text-center space-y-8">
            <h2 className="text-3xl font-black text-purple-400 flex items-center justify-center gap-3">
              <Icons.Lock /> Strict Focus Mode
            </h2>
            
            <div className="text-7xl md:text-9xl font-mono font-black text-white tracking-tighter">
              {Math.floor(focusTimerSeconds / 60).toString().padStart(2, '0')}:{ (focusTimerSeconds % 60).toString().padStart(2, '0') }
            </div>

            {!isFocusActive ? (
              <div className="space-y-6">
                <div className="flex justify-center gap-3">
                  {[25, 45, 60].map((mins) => (
                    <button key={mins} onClick={() => { setFocusMinutes(mins); setFocusTimerSeconds(mins * 60); }} className={`px-6 py-3 rounded-xl font-bold border-2 transition-all ${focusMinutes === mins ? 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-600/20' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'}`}>
                      {mins} Min
                    </button>
                  ))}
                </div>
                <button onClick={() => setIsFocusActive(true)} className="px-12 py-4 bg-green-500 hover:bg-green-400 text-slate-950 font-black text-xl rounded-2xl shadow-xl transition-transform hover:-translate-y-1">
                  Start Lockdown
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-green-400 font-bold text-sm bg-green-500/10 px-4 py-2 rounded-lg inline-block border border-green-500/20 animate-pulse">
                  Active Guard: Switching tabs will lock your screen!
                </p>
                <button onClick={() => { setIsFocusActive(false); showToast('Session Aborted.', 'error'); }} className="block mx-auto mt-4 text-slate-500 hover:text-red-500 font-bold text-sm underline underline-offset-4 transition-colors">
                  Abort Session
                </button>
              </div>
            )}
            
            <button onClick={() => setCurrentView('dashboard')} disabled={isFocusActive} className="absolute top-6 left-6 text-slate-500 hover:text-white disabled:opacity-30">
              <Icons.Home />
            </button>
          </div>

          {/* Tab Switch Penalty Modal */}
          {isLockedDown && (
            <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-xl z-[100] flex items-center justify-center p-6">
              <div className="bg-slate-900 border-2 border-red-500 p-10 rounded-3xl max-w-md w-full shadow-[0_0_50px_rgba(239,68,68,0.2)] text-center space-y-6">
                <div className="text-red-500 flex justify-center"><Icons.Alert /></div>
                <h3 className="text-2xl font-black text-white">Focus Broken!</h3>
                <p className="text-slate-400 text-sm">You left the tab. To unlock the screen and resume your timer, type the pledge below exactly as shown:</p>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-amber-400 font-mono font-black text-lg select-none">
                  I WILL NOT CHEAT
                </div>
                <form onSubmit={(e) => { e.preventDefault(); if (typedVerification === 'I WILL NOT CHEAT') { setIsLockedDown(false); setTypedVerification(''); } else { showToast('Incorrect text!', 'error'); } }}>
                  <input type="text" autoFocus placeholder="Type here..." value={typedVerification} onChange={(e) => setTypedVerification(e.target.value)} className="w-full p-4 bg-slate-950 border-2 border-slate-700 rounded-xl text-white text-center font-bold outline-none focus:border-red-500 mb-4" />
                  <button type="submit" className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-black rounded-xl">Unlock Screen</button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}