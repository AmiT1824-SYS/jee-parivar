// @ts-nocheck
'use client';

/**
 * ============================================================================
 * 🚀 JEE PARIVAR - ULTIMATE NTA EXAM ENGINE (v7.0 - MEGA BUILD)
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
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
  User: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Calendar: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Plus: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Target: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
};

// ============================================================================
// 📦 2. BUILT-IN DEMO TEST (PASTE YOUR 51 QUESTIONS HERE TO MAKE IT 4000+ LINES)
// ============================================================================
const JEE_ADV_2016_MEGA_TEST = [
  {
    "id": 1,
    "subject": "Physics",
    "type": "MCQ",
    "text": "In a historical experiment to determine Planck’s constant, a metal surface was irradiated with light of different wavelengths. The emitted photoelectron energies were measured by applying a stopping potential. The relevant data for the wavelength $(\\lambda)$ of incident light and the corresponding stopping potential $(V_0)$ are given below:\n\n$\\lambda (\\mu m)$ : $0.3$ | $0.4$ | $0.5$\n$V_0 (Volt)$ : $2.0$ | $1.0$ | $0.4$\n\nGiven that $c = 3 \\times 10^8 ms^{-1}$ and $e = 1.6 \\times 10^{-19} C$, Planck’s constant (in units of $J s$) found from such an experiment is",
    "imageUrl": "",
    "options": [
      "$6.0 \\times 10^{-34}$",
      "$6.4 \\times 10^{-34}$",
      "$6.6 \\times 10^{-34}$",
      "$6.8 \\times 10^{-34}$"
    ],
    "correctAnswer": 1,
    "solution": "$eV = [ \\frac{hc}{\\lambda} - \\phi ]$\n$e(V_1 - V_2) = \\frac{hc}{\\lambda_1} - \\frac{hc}{\\lambda_2} = hc(\\frac{1}{\\lambda_1} - \\frac{1}{\\lambda_2})$\n$h = \\frac{e(V_1 - V_2)}{c(\\frac{1}{\\lambda_1} - \\frac{1}{\\lambda_2})} = \\frac{1.6 \\times 10^{-19}(2.0 - 1.0)}{3 \\times 10^8 (\\frac{1}{0.3 \\times 10^{-6}} - \\frac{1}{0.4 \\times 10^{-6}})} = 6.4 \\times 10^{-34}$"
  },
  {
    "id": 2,
    "subject": "Physics",
    "type": "MCQ",
    "text": "A water cooler of storage capacity 120 litres can cool water at a constant rate of P watts. In a closed circulation system, the water from the cooler is used to cool an external device that generates constantly $3 kW$ of heat. The temperature of water fed into the device cannot exceed $30^0 C$ and the entire stored 120 litres of water is initially cooled to $10^0 C$. The minimum value of P (in watts) for which the device can be operated for 3 hours is",
    "imageUrl": "https://placehold.co/400x200?text=Diagram+URL+Here",
    "options": [
      "1600",
      "2067",
      "2533",
      "3933"
    ],
    "correctAnswer": 1,
    "solution": "$(P_{heater} - P_{cooler}) \\times t = ms\\Delta T.$\n$\\Rightarrow (3 \\times 10^3 - P) \\times 3 \\times 3600 = 120 \\times 4.2 \\times 10^3 \\times 20$\n$\\Rightarrow P = 2067$"
  }
  
  // ⬇️⬇️ BHAI YAHAN PAR APNE BAAKI BAACHE HUE 49 QUESTIONS BINA KISI TENSION KE PASTE KAR DO ⬇️⬇️
  // Uske baad file save kar lena, code automatically hazaron lines ka ho jayega aur ekdum solid chalega!

];


// ============================================================================
// 🧠 3. MAIN APPLICATION COMPONENT
// ============================================================================
export default function JEEParivarUltimateLatexApp() {
  
  const [currentView, setCurrentView] = useState<'landing' | 'login' | 'dashboard' | 'test' | 'result' | 'remediation' | 'focus' | 'planner'>('landing');
  const [authMethod, setAuthMethod] = useState<'choice' | 'phone' | 'google' | 'name'>('choice');
  const [studentName, setStudentName] = useState('Aspirant');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [myTests, setMyTests] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const [microGoals, setMicroGoals] = useState([]);
  const [newMicroGoal, setNewMicroGoal] = useState('');
  const [backlogs, setBacklogs] = useState([
    { id: '1', subject: 'Physics', chapter: 'Rotational Motion', sm1: false, sm2: false, sm3: false, sm4: false },
    { id: '2', subject: 'Chemistry', chapter: 'Ionic Equilibrium', sm1: false, sm2: false, sm3: false, sm4: false },
    { id: '3', subject: 'Mathematics', chapter: 'Definite Integration', sm1: false, sm2: false, sm3: false, sm4: false }
  ]);

  const [examType, setExamType] = useState('CUSTOM');
  const [customMinutes, setCustomMinutes] = useState(180);
  const [timer, setTimer] = useState(10800); 
  const [testQuestions, setTestQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [reviewStatus, setReviewStatus] = useState({}); 
  const [questionTimers, setQuestionTimers] = useState({});
  const [activeSubject, setActiveSubject] = useState('Physics'); 

  const [scoreCard, setScoreCard] = useState(null);

  const [focusMinutes, setFocusMinutes] = useState(25);
  const [focusTimerSeconds, setFocusTimerSeconds] = useState(25 * 60);
  const [isFocusActive, setIsFocusActive] = useState(false);
  const [isLockedDown, setIsLockedDown] = useState(false);
  const [typedVerification, setTypedVerification] = useState('');

  useEffect(() => {
    try {
      const savedTests = localStorage.getItem('jee_my_files');
      if (savedTests) setMyTests(JSON.parse(savedTests));
      
      const savedUser = localStorage.getItem('jee_student_name');
      if (savedUser) setStudentName(savedUser);

      const savedGoals = localStorage.getItem('jee_micro_goals');
      if (savedGoals) setMicroGoals(JSON.parse(savedGoals));
      
      const savedBacklogs = localStorage.getItem('jee_backlog_matrix');
      if (savedBacklogs) setBacklogs(JSON.parse(savedBacklogs));

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

  useEffect(() => {
    localStorage.setItem('jee_current_view', currentView);
    if (currentView === 'test' && testQuestions.length > 0) {
      localStorage.setItem('jee_test_questions', JSON.stringify(testQuestions));
    }
  }, [currentView, testQuestions]);

  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem('jee_test_answers', JSON.stringify(answers));
    }
  }, [answers]);

  useEffect(() => { localStorage.setItem('jee_micro_goals', JSON.stringify(microGoals)); }, [microGoals]);
  useEffect(() => { localStorage.setItem('jee_backlog_matrix', JSON.stringify(backlogs)); }, [backlogs]);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleAddMicroGoal = (e) => {
    e.preventDefault();
    if (!newMicroGoal.trim()) return;
    setMicroGoals([{ id: Date.now().toString(), text: newMicroGoal, completed: false }, ...microGoals]);
    setNewMicroGoal('');
    showToast("Micro-goal added! Time to crush it. 🔥");
  };

  const toggleMicroGoal = (id) => setMicroGoals(microGoals.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
  const deleteMicroGoal = (id) => setMicroGoals(microGoals.filter(g => g.id !== id));

  const handleAddBacklogRow = () => setBacklogs([...backlogs, { id: Date.now().toString(), subject: 'New Subject', chapter: 'New Chapter', sm1: false, sm2: false, sm3: false, sm4: false }]);
  const updateBacklogField = (id, field, value) => setBacklogs(backlogs.map(b => b.id === id ? { ...b, [field]: value } : b));
  const deleteBacklogRow = (id) => { if (window.confirm("Are you sure?")) setBacklogs(backlogs.filter(b => b.id !== id)); };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== "application/json" && !file.name.endsWith('.json')) {
      showToast("Error: Only .json files are supported!", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonContent = JSON.parse(e.target.result);
        if (!Array.isArray(jsonContent) || jsonContent.length === 0 || !jsonContent[0].text) throw new Error("Invalid JSON schema.");

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
        if (currentView === 'landing') setCurrentView(studentName === 'Aspirant' ? 'login' : 'dashboard');
      } catch (error) {
        showToast("Error parsing JSON file. Make sure it's valid NTA format.", "error");
      }
    };
    reader.readAsText(file);
  };

  const deleteTest = (id) => {
    if (window.confirm("Delete this test permanently?")) {
      const updated = myTests.filter(t => t.id !== id);
      setMyTests(updated);
      localStorage.setItem('jee_my_files', JSON.stringify(updated));
      showToast("Test deleted successfully.");
    }
  };

  useEffect(() => {
    let interval;
    if (currentView === 'test' && timer > 0 && !scoreCard) {
      interval = setInterval(() => {
        setTimer((prev) => {
          const newTime = prev - 1;
          if (newTime % 10 === 0) localStorage.setItem('jee_test_timer', newTime.toString());
          return newTime;
        });
        setQuestionTimers((prev) => ({ ...prev, [currentQuestionIndex]: (prev[currentQuestionIndex] || 0) + 1 }));
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
      showToast('🎉 Focus Session Completed Successfully!');
    }
    return () => clearInterval(interval);
  }, [isFocusActive, isLockedDown, focusTimerSeconds]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && currentView === 'test' && !scoreCard) showToast("⚠️ Warning: Tab switch detected during active test!", "error");
      if (document.hidden && isFocusActive && !isLockedDown) {
        setIsLockedDown(true);
        setTypedVerification('');
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isFocusActive, isLockedDown, currentView, scoreCard]);

  const startTestFromLibrary = (test) => {
    setTestQuestions(test.data);
    setExamType(test.name);
    setTimer(customMinutes * 60);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setReviewStatus({});
    setQuestionTimers({});
    if (test.data.length > 0 && test.data[0].subject) setActiveSubject(test.data[0].subject);
    setCurrentView('test');
  };

  const startDefaultFallbackTest = () => startTestFromLibrary({ name: "JEE Advanced 2016 (Mock)", data: JEE_ADV_2016_MEGA_TEST });

  const handleVirtualKeypad = (char) => {
    const q = testQuestions[currentQuestionIndex];
    if (!q) return;
    const currentVal = answers[q.id] !== undefined ? String(answers[q.id]) : '';
    if (char === 'CLEAR') { const newAns = { ...answers }; delete newAns[q.id]; setAnswers(newAns); }
    else if (char === 'BACK') setAnswers({ ...answers, [q.id]: currentVal.slice(0, -1) });
    else setAnswers({ ...answers, [q.id]: currentVal + char });
  };

  const jumpToQuestion = (index) => {
    setCurrentQuestionIndex(index);
    if (testQuestions[index]?.subject) setActiveSubject(testQuestions[index].subject);
  };

  const handleSaveAndNext = () => {
    const q = testQuestions[currentQuestionIndex];
    if (q) setReviewStatus({ ...reviewStatus, [q.id]: false }); 
    if (currentQuestionIndex < testQuestions.length - 1) jumpToQuestion(currentQuestionIndex + 1);
  };

  const handleMarkForReviewAndNext = () => {
    const q = testQuestions[currentQuestionIndex];
    if (q) setReviewStatus({ ...reviewStatus, [q.id]: true });
    if (currentQuestionIndex < testQuestions.length - 1) jumpToQuestion(currentQuestionIndex + 1);
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
    if (window.confirm("Are you sure you want to submit the test? Ensure you have attempted all sections.")) calculateResult();
  };

  const calculateResult = () => {
    let correct = 0, incorrect = 0, unattempted = 0;
    let subjectStats = {};

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
    const ratio = maxPossibleScore > 0 ? (totalScore / maxPossibleScore) : 0;
    const normalizedScore = ratio * 300; 

    let percentile = 0;
    if (normalizedScore >= 250) percentile = 99.9 + ((normalizedScore - 250) / 50) * 0.1; 
    else if (normalizedScore >= 200) percentile = 99.0 + ((normalizedScore - 200) / 50) * 0.9;
    else if (normalizedScore >= 150) percentile = 96.0 + ((normalizedScore - 150) / 50) * 3.0;
    else if (normalizedScore >= 100) percentile = 90.0 + ((normalizedScore - 100) / 50) * 6.0;
    else if (normalizedScore >= 50) percentile = 70.0 + ((normalizedScore - 50) / 50) * 20.0;
    else if (normalizedScore > 0) percentile = Math.max(10, (normalizedScore / 50) * 60.0);
    else percentile = 0;

    percentile = Math.min(100, Math.max(0, percentile));
    let rank = Math.max(1, Math.floor(((100 - percentile) / 100) * 1400000));

    setScoreCard({
      score: totalScore, maxScore: maxPossibleScore, correct, incorrect, unattempted, 
      percentile: percentile.toFixed(4) + '%', rank: rank.toLocaleString('en-IN'), 
      sillyMistakes: Math.floor(incorrect * 0.4), conceptualGaps: Math.ceil(incorrect * 0.6), subjectStats
    });
    
    setCurrentView('result');
    localStorage.removeItem('jee_test_timer');
  };

  const getYouTubeSearchLink = (text) => {
    if (!text) return 'https://www.youtube.com/results?search_query=JEE+Advanced+Solution';
    const cleanText = text.replace(/[\$\\]/g, ' ').slice(0, 60).trim();
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(cleanText + ' JEE solution')}`;
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs > 0 ? hrs.toString().padStart(2, '0') + ':' : ''}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const uniqueSubjects = [...new Set(testQuestions.map(q => q.subject || 'General'))];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-orange-500/30">
      
      {toast.show && (
        <div className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full font-bold shadow-2xl z-[100] flex items-center gap-3 animate-in slide-in-from-top-5 duration-300 ${toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-green-500 text-slate-900'}`}>
          {toast.type === 'error' ? <Icons.Alert /> : <Icons.Check />}
          {toast.message}
        </div>
      )}

      {currentView === 'landing' && (
        <div className="flex flex-col min-h-screen">
          <nav className="flex justify-between items-center px-6 md:px-10 py-5 border-b border-slate-800 bg-slate-900/80 backdrop-blur-lg sticky top-0 z-50">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-black bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent tracking-tighter">JEE PARIVAR</span>
              <span className="text-xs px-2.5 py-1 bg-slate-800 text-slate-300 rounded-full border border-slate-700 hidden sm:block">No Ads. No Distractions.</span>
            </div>
            <button onClick={() => setCurrentView('login')} className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-slate-950 font-black rounded-xl transition-all shadow-lg shadow-orange-500/20">
              Student Login 🚀
            </button>
          </nav>

          <main className="flex-1 flex flex-col items-center justify-start pb-20 space-y-12 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 blur-[100px] rounded-full pointer-events-none"></div>
            
            <div className="w-full max-w-7xl mx-auto px-6 pt-12 relative z-10">
              <h2 className="text-center text-sm font-black text-slate-500 uppercase tracking-[0.3em] mb-6">Your Dream Destinations</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative group overflow-hidden rounded-3xl border border-slate-800 shadow-2xl aspect-[4/3]">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Main_Building_IIT_Bombay.jpg/800px-Main_Building_IIT_Bombay.jpg" alt="IIT Bombay" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent"></div>
                  <div className="absolute bottom-6 left-6"><p className="text-2xl font-black text-white">IIT Bombay</p><p className="text-orange-400 font-bold text-sm">Target AIR 100</p></div>
                </div>
                <div className="relative group overflow-hidden rounded-3xl border border-slate-800 shadow-2xl aspect-[4/3] md:-translate-y-4">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/IIT_Delhi_Main_Building.jpg/800px-IIT_Delhi_Main_Building.jpg" alt="IIT Delhi" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent"></div>
                  <div className="absolute bottom-6 left-6"><p className="text-2xl font-black text-white">IIT Delhi</p><p className="text-blue-400 font-bold text-sm">Target AIR 500</p></div>
                </div>
                <div className="relative group overflow-hidden rounded-3xl border border-slate-800 shadow-2xl aspect-[4/3]">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/IIT_Kharagpur_Main_building.JPG/800px-IIT_Kharagpur_Main_building.JPG" alt="IIT Kharagpur" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent"></div>
                  <div className="absolute bottom-6 left-6"><p className="text-2xl font-black text-white">IIT Kharagpur</p><p className="text-green-400 font-bold text-sm">Target AIR 1000</p></div>
                </div>
              </div>
            </div>

            <div className="max-w-4xl relative z-10 space-y-6 text-center pt-8 px-6">
              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                Upload JSON. <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">Solve Like NTA.</span>
              </h1>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Bypass all limits. Get any test converted to JSON, drop it below, and experience the exact NTA interface locally. Forever free.
              </p>
            </div>

            <div className="relative z-10 w-full max-w-2xl px-6">
              <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-orange-500/50 rounded-3xl bg-orange-500/5 hover:bg-orange-500/10 transition-colors cursor-pointer group shadow-2xl">
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-orange-400 group-hover:scale-110 transition-transform">
                  <Icons.Upload />
                  <p className="mb-2 mt-4 text-xl font-black text-slate-200">Drop your .json test file here</p>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Strict JSON Support Only</p>
                </div>
                <input type="file" accept=".json" className="hidden" onChange={handleFileUpload} />
              </label>
            </div>
            
            <div className="relative z-10 pt-4">
              <button onClick={() => setCurrentView('login')} className="text-slate-400 hover:text-white font-bold border-b border-dashed border-slate-500 pb-1 transition-colors">
                Already uploaded a test? Go to Dashboard →
              </button>
            </div>
          </main>
        </div>
      )}

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

      {currentView === 'dashboard' && (
        <div className="min-h-screen flex flex-col pb-10">
          <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 md:px-10 py-5 flex flex-wrap justify-between items-center sticky top-0 z-40 gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-black text-white">Welcome, <span className="text-orange-400">{studentName}</span> 🎯</h1>
              <p className="text-xs text-slate-400 mt-1">JEE Mission • Percentile Target: 99.9%</p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <button onClick={() => setCurrentView('planner')} className="px-4 py-2 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 border border-blue-500/30 rounded-xl font-bold flex items-center gap-2 transition-colors text-sm">
                <Icons.Calendar /> Planner & Backlogs
              </button>
              <button onClick={() => setCurrentView('focus')} className="px-4 py-2 bg-purple-600/20 text-purple-400 hover:bg-purple-600/30 border border-purple-500/30 rounded-xl font-bold flex items-center gap-2 transition-colors text-sm">
                <Icons.Clock /> Focus Mode
              </button>
              <button onClick={() => { setCurrentView('landing'); setAuthMethod('choice'); }} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold text-sm">Logout</button>
            </div>
          </header>

          <main className="max-w-6xl w-full mx-auto px-6 mt-10 space-y-10">
            
            <div className="bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl">
              <div>
                <h2 className="text-2xl font-black text-white mb-2">Upload Test JSON</h2>
                <p className="text-sm text-slate-400">Strictly accepts .json format only. Saved locally.</p>
              </div>
              <label className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-slate-950 font-black px-8 py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-1 flex items-center gap-3 whitespace-nowrap">
                <Icons.Upload />
                Select .json File
                <input type="file" accept=".json" className="hidden" onChange={handleFileUpload} />
              </label>
            </div>

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
                  <p className="text-sm mb-6">Upload a JSON test to see it here, or play the default mock test.</p>
                  <button onClick={startDefaultFallbackTest} className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors">
                    Start NTA Full Mock Test
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
                  
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col shadow-inner relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-green-500/20 text-green-400 text-[10px] font-black px-3 py-1 rounded-bl-xl border-l border-b border-green-500/30">BUILT-IN</div>
                    <h3 className="text-xl font-black text-slate-300 mt-4 mb-2">JEE Adv 2016 Mock</h3>
                    <p className="text-sm text-slate-500 mb-6 font-medium">Pre-loaded Mega Test</p>
                    <button onClick={startDefaultFallbackTest} className="mt-auto w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-black rounded-xl transition-all">
                      Start Test
                    </button>
                  </div>
                </div>
              )}
            </div>

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

      {currentView === 'planner' && (
        <div className="min-h-screen bg-slate-950 p-6 md:p-10 flex flex-col items-center">
          <div className="w-full max-w-6xl">
            
            <header className="flex justify-between items-center mb-10 border-b border-slate-800 pb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600/20 text-blue-400 rounded-2xl flex items-center justify-center border border-blue-500/30">
                  <Icons.Calendar />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white">Daily/Weekly Planner</h2>
                  <p className="text-slate-400 text-sm mt-1">Crush backlogs and hit micro-goals</p>
                </div>
              </div>
              <button onClick={() => setCurrentView('dashboard')} className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors">
                ← Dashboard
              </button>
            </header>

            <div className="grid lg:grid-cols-3 gap-8">
              
              <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col max-h-[80vh]">
                <div className="flex items-center gap-3 mb-6">
                  <Icons.Target />
                  <h3 className="text-xl font-black text-amber-400">Micro-Goals</h3>
                </div>
                <p className="text-xs text-slate-400 mb-6 font-medium leading-relaxed">
                  Set small, actionable targets independent of rigid batch calendars. e.g., "Do 30 Physics PYQs"
                </p>

                <form onSubmit={handleAddMicroGoal} className="mb-6 flex gap-2">
                  <input type="text" value={newMicroGoal} onChange={(e) => setNewMicroGoal(e.target.value)} placeholder="Enter a new micro-goal..." className="flex-1 p-3 bg-slate-950 border border-slate-700 rounded-xl text-white outline-none focus:border-amber-500 text-sm transition-colors"/>
                  <button type="submit" className="p-3 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl font-black transition-colors"><Icons.Plus /></button>
                </form>

                <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                  {microGoals.length === 0 ? (
                    <div className="text-center text-slate-600 mt-10 text-sm font-bold border border-dashed border-slate-700 p-6 rounded-xl">
                      No active micro-goals. Set one now!
                    </div>
                  ) : (
                    microGoals.map(goal => (
                      <div key={goal.id} className={`flex items-start justify-between p-4 rounded-xl border transition-all ${goal.completed ? 'bg-green-500/5 border-green-500/20 opacity-60' : 'bg-slate-950 border-slate-800'}`}>
                        <label className="flex items-start gap-3 cursor-pointer flex-1">
                          <input type="checkbox" checked={goal.completed} onChange={() => toggleMicroGoal(goal.id)} className="mt-1 w-5 h-5 rounded border-slate-700 accent-amber-500 cursor-pointer"/>
                          <span className={`text-sm font-medium ${goal.completed ? 'line-through text-slate-500' : 'text-slate-300'}`}>{goal.text}</span>
                        </label>
                        <button onClick={() => deleteMicroGoal(goal.id)} className="ml-3 text-slate-600 hover:text-red-500 transition-colors"><Icons.Trash /></button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-xl font-black text-blue-400">Backlog Eliminator Matrix</h3>
                    <p className="text-xs text-slate-400 mt-1">Track chapters across 4 Study Materials (SM1 to SM4)</p>
                  </div>
                  <button onClick={handleAddBacklogRow} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm transition-colors flex items-center gap-2">
                    <Icons.Plus /> Add Row
                  </button>
                </div>

                <div className="overflow-x-auto border border-slate-800 rounded-2xl bg-slate-950">
                  <table className="w-full text-left border-collapse whitespace-nowrap min-w-[700px]">
                    <thead>
                      <tr className="bg-slate-900 border-b border-slate-800 text-xs font-black text-slate-400 uppercase tracking-wider">
                        <th className="p-4 w-1/4">Subject</th>
                        <th className="p-4 w-1/3">Chapter Name</th>
                        <th className="p-4 text-center">SM 1</th>
                        <th className="p-4 text-center">SM 2</th>
                        <th className="p-4 text-center">SM 3</th>
                        <th className="p-4 text-center">SM 4</th>
                        <th className="p-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {backlogs.length === 0 ? (
                        <tr><td colSpan="7" className="p-8 text-center text-slate-500 font-bold">Wow, Zero Backlogs! You are a beast. 🔥</td></tr>
                      ) : (
                        backlogs.map((row) => (
                          <tr key={row.id} className="border-b border-slate-800 hover:bg-slate-900/50 transition-colors">
                            <td className="p-3"><input type="text" value={row.subject} onChange={(e) => updateBacklogField(row.id, 'subject', e.target.value)} className="w-full bg-transparent border-none text-sm font-bold text-orange-300 outline-none focus:bg-slate-800 px-2 py-1 rounded"/></td>
                            <td className="p-3"><input type="text" value={row.chapter} onChange={(e) => updateBacklogField(row.id, 'chapter', e.target.value)} className="w-full bg-transparent border-none text-sm font-medium text-white outline-none focus:bg-slate-800 px-2 py-1 rounded"/></td>
                            {['sm1', 'sm2', 'sm3', 'sm4'].map((smKey) => (
                              <td key={smKey} className="p-3 text-center"><div className="flex justify-center"><input type="checkbox" checked={row[smKey]} onChange={(e) => updateBacklogField(row.id, smKey, e.target.checked)} className="w-5 h-5 rounded border-slate-700 accent-blue-500 cursor-pointer"/></div></td>
                            ))}
                            <td className="p-3 text-center"><button onClick={() => deleteBacklogRow(row.id)} className="p-2 text-slate-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"><Icons.Trash /></button></td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {currentView === 'test' && testQuestions.length > 0 && (
        <div className="flex flex-col h-screen overflow-hidden bg-slate-950">
          
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
          
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            
            <div className="flex-1 flex flex-col border-r border-slate-800 relative">
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

              <div className="flex-1 overflow-y-auto p-6 md:p-10 pb-32">
                {(() => {
                  const q = testQuestions[currentQuestionIndex];
                  return (
                    <div className="max-w-4xl mx-auto">
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-sm font-black text-slate-500 uppercase tracking-widest">Question {currentQuestionIndex + 1}</span>
                        <span className="text-xs px-2 py-1 bg-slate-900 border border-slate-700 text-slate-400 rounded-lg font-bold">{q.type}</span>
                      </div>
                      
                      <div className="text-lg md:text-xl font-medium mb-8 leading-relaxed text-slate-200">
                        <Latex>{q.text}</Latex>
                      </div>
                      
                      {q.imageUrl && (
                        <div className="mb-8 bg-slate-900 p-4 rounded-xl border border-slate-800 inline-block">
                          <img src={q.imageUrl} alt="Question Diagram" className="max-w-full h-auto rounded-lg max-h-[350px] object-contain shadow-md border border-slate-700" />
                        </div>
                      )}

                      {q.type === 'MCQ' && q.options ? (
                        <div className="space-y-4">
                          {q.options.map((opt, idx) => (
                            <label key={idx} className={`w-full flex items-center p-5 rounded-2xl border-2 transition-all cursor-pointer select-none ${answers[q.id] === idx ? 'bg-orange-500/10 border-orange-500 text-orange-300 shadow-[0_0_15px_rgba(249,115,22,0.1)]' : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50 text-slate-300'}`}>
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

            <div className="w-full lg:w-80 bg-slate-900 flex flex-col shrink-0">
              
              <div className="p-4 border-b border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-slate-900 font-black shrink-0">
                  {studentName.charAt(0).toUpperCase()}
                </div>
                <div className="overflow-hidden">
                  <p className="font-bold text-sm text-white truncate">{studentName}</p>
                  <p className="text-xs text-slate-500 truncate">Candidate</p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Question Palette</h3>
                
                <div className="grid grid-cols-4 gap-2">
                  {testQuestions.map((q, idx) => {
                    if ((q.subject || 'General') !== activeSubject) return null;

                    const hasAnswer = answers[q.id] !== undefined && answers[q.id] !== '';
                    const isReview = reviewStatus[q.id];
                    const isCurrent = currentQuestionIndex === idx;
                    
                    let bg = 'bg-slate-950 text-slate-400 border-slate-800'; 
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

      {currentView === 'result' && scoreCard && (
        <div className="min-h-screen p-6 md:p-10 max-w-6xl mx-auto animate-in fade-in zoom-in duration-500">
          <header className="flex justify-between items-center mb-10 border-b border-slate-800 pb-6">
            <div>
              <h2 className="text-3xl font-black text-white">Final Scorecard</h2>
              <p className="text-slate-400">{examType} • Based on JEE 2024 Marking Scheme</p>
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
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">NTA Percentile</p>
              <p className="text-4xl font-black text-blue-400 mt-3">{scoreCard.percentile}</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500/20 to-amber-500/5 p-6 rounded-3xl border border-orange-500/30 text-center shadow-lg">
              <p className="text-xs font-black text-orange-500/80 uppercase tracking-widest mb-2">Predicted AIR</p>
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
                    {q.imageUrl && (
                      <div className="mt-6 bg-slate-950 p-4 rounded-xl inline-block border border-slate-800">
                        <img src={q.imageUrl} alt="Diagram" className="max-w-full rounded-lg" style={{maxHeight: '200px'}} />
                      </div>
                    )}
                  </div>

                  {q.type === 'MCQ' && (
                    <div className="mb-8 grid gap-3">
                      {q.options.map((opt, oIdx) => {
                        let styling = 'bg-slate-950 border-slate-800 text-slate-400'; 
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
                      <a href={getYouTubeSearchLink(q.text)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs bg-red-600/10 hover:bg-red-600/20 text-red-500 border border-red-500/30 font-black px-4 py-2 rounded-lg transition-colors">
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