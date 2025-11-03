"use client";
// @ts-nocheck
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Brain,
  FileText,
  RefreshCcw,
  User,
  Calendar,
} from "lucide-react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

/**
 * Student Dashboard with Sidebar + Charts + Micro Tests (Demo Data)
 * Save as: app/student/page.jsx
 * npm install recharts lucide-react
 */

/* --------------------- Demo / Mock Data --------------------- */
const testPerformance = [
  { test: "Test 1", score: 72 },
  { test: "Test 2", score: 78 },
  { test: "Test 3", score: 84 },
  { test: "Test 4", score: 88 },
  { test: "Test 5", score: 92 },
];

const subjectStrength = [
  { subject: "Math", score: 89 },
  { subject: "Science", score: 83 },
  { subject: "English", score: 91 },
  { subject: "History", score: 77 },
  { subject: "Geography", score: 85 },
];

/* micro-tests (alternate day 15-question tests) */
const microTestsSeed = [
  { date: "2025-10-12", topic: "Physics - EMI", correct: 11, total: 15 },
  { date: "2025-10-14", topic: "Biology - Physiology", correct: 8, total: 15 },
  { date: "2025-10-16", topic: "Chemistry - Ionic Eq.", correct: 13, total: 15 },
  { date: "2025-10-18", topic: "Physics - AC Circuits", correct: 10, total: 15 },
  { date: "2025-10-20", topic: "Biology - Genetics", correct: 12, total: 15 },
];

/* 15 demo questions for micro test (short sample) */
const demoQuestionsSeed = [
  { q: "SI unit of electric current?", options: ["Ohm", "Coulomb", "Ampere", "Volt"], answer: "Ampere" },
  { q: "Molecular formula of water?", options: ["H2O", "CO2", "O2", "H2"], answer: "H2O" },
  { q: "Which part controls balance?", options: ["Cerebrum", "Cerebellum", "Medulla", "Hypothalamus"], answer: "Cerebellum" },
  { q: "pH of neutral water at 25°C?", options: ["7", "1", "14", "0"], answer: "7" },
  { q: "Ohm's law relates which quantities?", options: ["V,I,R", "P,V,T", "m,a,F", "E,m,c"], answer: "V,I,R" },
  { q: "Atomic number of Carbon?", options: ["6", "12", "8", "14"], answer: "6" },
  { q: "Photosynthesis main gas uptake?", options: ["O2", "CO2", "N2", "H2O"], answer: "CO2" },
  { q: "Unit of resistance?", options: ["Ohm", "Ampere", "Volt", "Watt"], answer: "Ohm" },
  { q: "Which is an alkali metal?", options: ["Na", "Fe", "Al", "Cu"], answer: "Na" },
  { q: "DNA full form?", options: ["Ribonucleic acid", "Deoxyribonucleic acid", "Deoxynucleic acid", "None"], answer: "Deoxyribonucleic acid" },
  { q: "Ideal gas equation?", options: ["PV=nRT", "P+V=nR", "PV=RT", "P=VnR"], answer: "PV=nRT" },
  { q: "Primary color NOT in RGB?", options: ["Red", "Green", "Blue", "Yellow"], answer: "Yellow" },
  { q: "Speed of light symbol?", options: ["c", "v", "s", "l"], answer: "c" },
  { q: "pH < 7 indicates?", options: ["Neutral", "Acidic", "Basic", "Alkaline"], answer: "Acidic" },
  { q: "Which is a covalent bond?", options: ["NaCl", "H2O", "KCl", "MgO"], answer: "H2O" },
];

/* ----------------------- Component -------------------------- */
export default function StudentDashboard() {
  const [activeSection, setActiveSection] = useState("overview");

  // micro-tests state
  const [microTests, setMicroTests] = useState(microTestsSeed);

  // demo test modal state
  const [demoActive, setDemoActive] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [demoScore, setDemoScore] = useState(0);

  // AI recommendations demo (updates after demo)
  const [aiRecommendations, setAiRecommendations] = useState([
    "Revise Biology diagrams daily for 10 mins.",
    "Focus on EMI derivations; practice step-by-step.",
    "Use spaced repetition for Chemistry equations.",
  ]);

  // computed micro accuracy
  const microAccuracy = useMemo(() => {
    if (!microTests || microTests.length === 0) return 0;
    const avg =
      microTests.reduce((acc, t) => acc + (t.correct / t.total) * 100, 0) /
      microTests.length;
    return avg;
  }, [microTests]);

  const weakTopics = useMemo(() => {
    return [...new Set(microTests.filter((t) => t.correct / t.total < 0.75).map((t) => t.topic))];
  }, [microTests]);

  // demo handlers
  const startDemo = () => {
    setDemoActive(true);
    setCurrentQ(0);
    setSelectedAnswers({});
    setDemoSubmitted(false);
    setDemoScore(0);
  };

  const chooseAnswer = (opt) => {
    setSelectedAnswers((prev) => ({ ...prev, [currentQ]: opt }));
  };

  const nextQuestion = () => {
    if (currentQ < demoQuestionsSeed.length - 1) setCurrentQ((c) => c + 1);
    else submitDemo();
  };

  const prevQuestion = () => {
    if (currentQ > 0) setCurrentQ((c) => c - 1);
  };

  const submitDemo = () => {
    const correct = Object.keys(selectedAnswers).filter((k) => {
      const idx = Number(k);
      return demoQuestionsSeed[idx].answer === selectedAnswers[k];
    }).length;
    setDemoScore(correct);
    setDemoSubmitted(true);

    // Append micro-test result to microTests
    const newMicro = [
      ...microTests,
      {
        date: new Date().toISOString().split("T")[0],
        topic: "Demo Test (Mixed)",
        correct,
        total: demoQuestionsSeed.length,
      },
    ];
    setMicroTests(newMicro);

    // Update AI recommendations (demo logic)
    if (correct / demoQuestionsSeed.length < 0.7) {
      setAiRecommendations((prev) => [
        `Demo indicates weakness in basics — focus on diagrams & definitions.`,
        ...prev,
      ]);
    } else {
      setAiRecommendations((prev) => [
        `Demo indicates solid fundamentals — keep the micro-test rhythm.`,
        ...prev,
      ]);
    }
  };

  /* Sections meta */
  const sections = [
    { id: "overview", title: "Overview", icon: <User size={18} /> },
    { id: "ai", title: "AI Insights", icon: <Brain size={18} /> },
    { id: "tests", title: "Tests & Performance", icon: <BarChart3 size={18} /> },
    { id: "revision", title: "Revision Plan", icon: <RefreshCcw size={18} /> },
    { id: "reports", title: "Reports", icon: <FileText size={18} /> },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-slate-200 flex flex-col justify-between fixed inset-y-0">
        <div>
          <div className="p-4 border-b border-slate-200">
            <h2 className="text-lg font-bold text-indigo-600">Student Panel</h2>
          </div>

          <nav className="p-3 flex flex-col gap-2">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md font-medium transition-all ${
                  activeSection === s.id
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {s.icon} {s.title}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-200 text-xs text-slate-500">
          © 2025 Intelligent Revision Plan
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-60 flex-1 p-6 space-y-8">
        {/* Overview */}
        {activeSection === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-2xl font-bold text-slate-800 mb-6">
              Dashboard Overview
            </h1>

            {/* Stats Cards */}
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
              {[
                { label: "Average Score", value: "86%" },
                { label: "Tests Completed", value: "12" },
                { label: "Micro Test Accuracy", value: `${microAccuracy.toFixed(1)}%` },
                { label: "AI Rank", value: "#4 / 25" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white p-5 rounded-xl shadow-sm border border-slate-100"
                >
                  <h3 className="text-sm text-slate-500 mb-1">{stat.label}</h3>
                  <p className="text-2xl font-bold text-indigo-600">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Line Chart */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-3">
                  Performance Trend
                </h3>
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={testPerformance}>
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <XAxis dataKey="test" />
                    <YAxis domain={[60, 100]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#4f46e5"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Bar Chart */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-3">
                  Subject Strengths
                </h3>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={subjectStrength}>
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <XAxis dataKey="subject" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="score" fill="#6366f1" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Upcoming Test */}
            <div className="mt-10 bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Upcoming Test
              </h3>
              <div className="flex items-center gap-3 text-slate-700">
                <Calendar className="text-indigo-600" size={20} />
                <span>Next test on <b>5th Nov</b> — Science (Chapter 6)</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* AI Insights */}
        {activeSection === "ai" && (
  <motion.div
    key="ai"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <h1 className="text-2xl font-bold text-slate-800 mb-4">
      AI Insights & Smart Recommendations
    </h1>

    <p className="text-slate-600 mb-8">
      The IRP AI continuously tracks your academic progress, learning behavior,
      and test patterns to generate personalized, actionable insights.
    </p>

    {/* AI Metric Cards */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {[
        { label: "AI Confidence", value: "87%", desc: "AI prediction accuracy", color: "bg-indigo-100 text-indigo-700" },
        { label: "Consistency Index", value: "92%", desc: "Daily performance stability", color: "bg-emerald-100 text-emerald-700" },
        { label: "Weak Topics", value: "3", desc: "Physics, Biology, Chemistry", color: "bg-amber-100 text-amber-700" },
        { label: "Improvement Rate", value: "+14%", desc: "Overall growth trend", color: "bg-blue-100 text-blue-700" },
      ].map((item, i) => (
        <div
          key={i}
          className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition"
        >
          <h3 className="text-sm text-slate-500 mb-1">{item.label}</h3>
          <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
          <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
        </div>
      ))}
    </div>

    {/* AI Analysis Charts */}
    <div className="grid lg:grid-cols-2 gap-8 mb-10">
      {/* Radar Chart - Mock Skills */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">
          Subject Strength Map
        </h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={[
              { subject: "Physics", score: 78 },
              { subject: "Chemistry", score: 83 },
              { subject: "Biology", score: 69 },
              { subject: "Math", score: 91 },
              { subject: "English", score: 88 },
            ]}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="subject" />
            <YAxis domain={[50, 100]} />
            <Tooltip />
            <Bar dataKey="score" fill="#4f46e5" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart - Accuracy Growth */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">
          Accuracy Improvement Over Time
        </h3>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart
            data={[
              { week: "Week 1", accuracy: 72 },
              { week: "Week 2", accuracy: 78 },
              { week: "Week 3", accuracy: 84 },
              { week: "Week 4", accuracy: 89 },
              { week: "Week 5", accuracy: 92 },
            ]}
          >
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis dataKey="week" />
            <YAxis domain={[60, 100]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="accuracy"
              stroke="#10b981"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* Smart Insights Feed */}
    <div className="grid lg:grid-cols-3 gap-6 mb-10">
      {[
        {
          tag: "Critical",
          color: "bg-red-100 text-red-700",
          title: "Physics – Force & Motion",
          desc: "Low accuracy in numericals. AI recommends daily 10-min speed drills.",
        },
        {
          tag: "Improving",
          color: "bg-green-100 text-green-700",
          title: "Chemistry – Acids & Bases",
          desc: "Accuracy increased by 15%. Keep practicing with AI test cards.",
        },
        {
          tag: "Stable",
          color: "bg-blue-100 text-blue-700",
          title: "Math – Linear Equations",
          desc: "Maintaining 90% accuracy. AI recommends a concept check every 3 days.",
        },
      ].map((card, i) => (
        <div
          key={i}
          className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition"
        >
          <div className="flex justify-between mb-2">
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${card.color}`}
            >
              {card.tag}
            </span>
            <span className="text-xs text-slate-400">AI Insight</span>
          </div>
          <h4 className="font-semibold text-slate-800 mb-1">{card.title}</h4>
          <p className="text-sm text-slate-600">{card.desc}</p>
        </div>
      ))}
    </div>

    {/* AI Actionable Suggestions */}
    <div className="bg-gradient-to-r from-indigo-50 to-slate-50 p-6 rounded-xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800 mb-3">
        AI Suggested Actions
      </h3>
      <ul className="list-disc list-inside text-slate-700 text-sm space-y-2">
        <li>
          Schedule one <span className="font-semibold">AI practice test</span>{" "}
          every 2 days.
        </li>
        <li>
          Revise <span className="font-semibold">weak chapters</span> first,
          before taking the next test.
        </li>
        <li>
          Use AI feedback to prioritize high-weightage topics for upcoming exams.
        </li>
        <li>
          Maintain minimum <span className="font-semibold">85% consistency</span>{" "}
          to trigger advanced recommendations.
        </li>
      </ul>
    </div>
  </motion.div>
)}

        {/* Tests & Performance (with Micro-tests + Demo) */}
        {activeSection === "tests" && (
          <motion.div
            key="tests"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-slate-800">Tests & Performance</h1>
              <div className="flex gap-2">
                <button
                  onClick={startDemo}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 text-sm"
                >
                  🎯 Take Micro Test
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Micro-test List */}
              <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                <h3 className="font-semibold mb-3">Micro Tests (15 questions)</h3>
                <p className="text-sm text-slate-600 mb-3">
                  Alternate-day micro-tests to improve accuracy on weak topics.
                </p>

                <div className="space-y-2 max-h-64 overflow-auto">
                  {microTests.slice().reverse().map((m, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-slate-50 p-3 rounded-md"
                    >
                      <div>
                        <div className="text-sm font-medium">{m.topic}</div>
                        <div className="text-xs text-slate-500">{m.date}</div>
                      </div>
                      <div className="text-sm font-semibold text-indigo-600">
                        {m.correct} / {m.total}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Micro-test Chart */}
              <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                <h3 className="font-semibold mb-3">Micro Tests — Correct Answers</h3>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={microTests}>
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 15]} />
                    <Tooltip formatter={(val) => `${val} correct`} />
                    <Bar dataKey="correct" fill="#10b981" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>

                <div className="mt-3 text-sm text-slate-600">
                  AI Insight: {weakTopics.length ? `Focus more micro-tests on ${weakTopics.join(", ")}.` : "No weak topics detected in recent micro-tests."}
                </div>
              </div>
            </div>

            {/* Ranking / Batch (kept simple demo) */}
            <div className="mt-6 bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
              <h3 className="font-semibold mb-3">Batch Ranking (demo)</h3>
              <div className="grid grid-cols-2 gap-2 max-w-md">
                <div className="text-sm text-slate-500">Your Rank</div>
                <div className="text-sm font-semibold text-indigo-600">#4 / 25</div>
                <div className="text-sm text-slate-500">Last Test Score</div>
                <div className="text-sm font-semibold text-indigo-600">84%</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Revision Plan */}
       {activeSection === "revision" && (
  <motion.div
    key="revision"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <h1 className="text-2xl font-bold text-slate-800 mb-4">
      Detailed AI Revision Plan
    </h1>

    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
      <p className="text-slate-600 mb-6">
        This week’s revision plan is generated based on your recent test data,
        weak concepts, and AI performance tracking. Follow the day-wise plan
        below to strengthen your core subjects.
      </p>

      {/* Week Timeline */}
      <div className="relative border-l-2 border-indigo-200 ml-4">
        {[
          {
            day: "Monday",
            topic: "Force & Motion",
            difficulty: "Moderate",
            tasks: [
              "Revise Newton's laws and formula derivations",
              "Solve 15 AI-generated questions",
              "Watch 10-min concept video",
            ],
            aiNote:
              "Focus on the 2nd Law numericals — accuracy dropped by 10% in last test.",
          },
          {
            day: "Tuesday",
            topic: "Atoms & Molecules",
            difficulty: "Easy",
            tasks: [
              "Quick recap of symbols and valency rules",
              "Take 10-question quick quiz",
              "Review errors from previous micro-test",
            ],
            aiNote:
              "You consistently score above 80%, maintain light revision load today.",
          },
          {
            day: "Wednesday",
            topic: "Chemical Reactions",
            difficulty: "Challenging",
            tasks: [
              "Write 3 balanced equations daily",
              "Read reaction type chart",
              "Take AI quiz (15 questions)",
            ],
            aiNote:
              "This topic showed lowest retention; AI suggests spaced repetition.",
          },
          {
            day: "Thursday",
            topic: "Sound & Waves",
            difficulty: "Moderate",
            tasks: [
              "Revise wave formulas",
              "Practice numericals from workbook",
              "Review 5 AI feedback notes",
            ],
            aiNote:
              "Speed of solving numericals is improving — maintain current pace.",
          },
          {
            day: "Friday",
            topic: "Light & Reflection",
            difficulty: "Easy",
            tasks: [
              "Revise ray diagram rules",
              "Complete 10 MCQs (AI-generated)",
              "Summarize mirror formulas",
            ],
            aiNote: "Focus on accuracy, not speed today.",
          },
          {
            day: "Saturday",
            topic: "Biology – Human Systems",
            difficulty: "Hard",
            tasks: [
              "Label diagrams of heart and lungs",
              "Take 15-question test",
              "Review 3 AI weak zones",
            ],
            aiNote: "Low accuracy in structure labeling — use visual memory aids.",
          },
          {
            day: "Sunday",
            topic: "AI Self-Test & Analysis",
            difficulty: "Mixed",
            tasks: [
              "Attempt AI-generated mock test (25 questions)",
              "Review complete weekly analytics",
              "Generate next week’s plan",
            ],
            aiNote:
              "End of week: AI will create next plan based on test outcomes.",
          },
        ].map((day, idx) => (
          <div key={day.day} className="mb-8 ml-6 relative">
            <span className="absolute -left-[1.05rem] top-2 w-3 h-3 bg-indigo-500 rounded-full"></span>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-indigo-700">
                  {day.day} – {day.topic}
                </h3>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    day.difficulty === "Easy"
                      ? "bg-green-100 text-green-700"
                      : day.difficulty === "Moderate"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {day.difficulty}
                </span>
              </div>

              <ul className="list-disc list-inside text-slate-600 text-sm space-y-1 mb-3">
                {day.tasks.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>

              <div className="bg-indigo-50 text-sm text-indigo-800 px-3 py-2 rounded-md border-l-4 border-indigo-400">
                <strong>AI Note:</strong> {day.aiNote}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
)}


       {activeSection === "reports" && (
  <motion.div
    key="reports"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <h1 className="text-2xl font-bold text-slate-800 mb-6">
      Reports & Analytics
    </h1>

    <p className="text-slate-600 mb-8">
      Get a detailed AI-generated performance analysis — track consistency,
      improvement, and download your progress reports in one click.
    </p>

    {/* Report Summary Cards */}
    <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
      {[
        { label: "Overall Performance", value: "84%", desc: "Across last 3 tests", color: "bg-indigo-100 text-indigo-700" },
        { label: "AI Predicted Growth", value: "+11%", desc: "Expected improvement next cycle", color: "bg-emerald-100 text-emerald-700" },
        { label: "Test Consistency", value: "91%", desc: "Average accuracy stability", color: "bg-amber-100 text-amber-700" },
        { label: "Total Tests Taken", value: "15", desc: "Including micro-tests", color: "bg-blue-100 text-blue-700" },
      ].map((item, i) => (
        <div
          key={i}
          className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition"
        >
          <h3 className="text-sm text-slate-500 mb-1">{item.label}</h3>
          <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
          <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
        </div>
      ))}
    </div>

    {/* Performance Chart */}
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-10">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">
        AI Performance Overview
      </h3>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart
          data={[
            { test: "Test 51", score: 72 },
            { test: "Test 57", score: 81 },
            { test: "Test 61", score: 88 },
            { test: "Micro Test", score: 90 },
            { test: "Demo Test", score: 92 },
          ]}
        >
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <XAxis dataKey="test" />
          <YAxis domain={[60, 100]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#4f46e5"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>

    {/* Download Report Section */}
    <div className="bg-gradient-to-r from-indigo-50 to-slate-50 p-8 rounded-xl border border-slate-200 shadow-sm text-center">
      <h3 className="text-xl font-semibold text-slate-800 mb-2">
        Download Your Complete Report
      </h3>
      <p className="text-slate-600 mb-6">
        Generate a personalized AI-based PDF report summarizing your overall
        progress, strengths, and next-step recommendations.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 shadow transition flex items-center justify-center gap-2">
          <FileText size={18} /> Download Full Report
        </button>

        <button className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition flex items-center justify-center gap-2">
          <BarChart3 size={18} /> View Quick Summary
        </button>
      </div>

      <div className="mt-8 flex justify-center">
        <div className="w-64 bg-slate-200 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full"
            style={{ width: "85%" }}
          ></div>
        </div>
      </div>
      <p className="text-xs text-slate-500 mt-2">
        AI estimates: 85% report accuracy based on latest data
      </p>
    </div>
  </motion.div>
)}

      </main>

      {/* ---------------- Demo/Micro Test Modal ---------------- */}
      {demoActive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl overflow-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <div>
                <h2 className="font-bold text-lg">Micro Test — 15 Questions (Demo)</h2>
                <p className="text-xs text-slate-500">Timed practice to improve weak topics</p>
              </div>
              <div className="flex gap-2 items-center">
                {!demoSubmitted ? <div className="text-sm text-slate-500">Q {currentQ + 1} / {demoQuestionsSeed.length}</div> : null}
                <button className="text-sm text-slate-500" onClick={() => { setDemoActive(false); setDemoSubmitted(false); }}>Close</button>
              </div>
            </div>

            <div className="p-6">
              {!demoSubmitted ? (
                <>
                  <div className="mb-4">
                    <div className="text-sm text-slate-700 font-medium">{demoQuestionsSeed[currentQ].q}</div>
                    <div className="mt-3 grid gap-2">
                      {demoQuestionsSeed[currentQ].options.map((opt) => {
                        const selected = selectedAnswers[currentQ] === opt;
                        return (
                          <button
                            key={opt}
                            onClick={() => chooseAnswer(opt)}
                            className={`text-left p-3 rounded border ${selected ? "bg-indigo-50 border-indigo-300" : "hover:bg-slate-50"}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <div>
                      <button onClick={prevQuestion} disabled={currentQ === 0} className="px-3 py-2 text-sm rounded border disabled:opacity-50">Previous</button>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setDemoActive(false); }} className="px-3 py-2 text-sm rounded border">Save & Exit</button>
                      <button onClick={nextQuestion} className="px-4 py-2 bg-indigo-600 text-white rounded text-sm">{currentQ < demoQuestionsSeed.length - 1 ? "Next" : "Submit"}</button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Results</h3>
                  <p className="text-lg mb-2">You scored <span className="font-semibold">{demoScore}</span> / {demoQuestionsSeed.length}</p>
                  <p className="text-sm text-slate-600 mb-4">
                    {demoScore / demoQuestionsSeed.length >= 0.7 ? "Great work — keep this consistency!" : "Target weak topics from the recommendations below."}
                  </p>

                  <div className="text-left">
                    <h4 className="font-semibold mb-2">AI Recommendations (From Demo)</h4>
                    <ul className="list-disc ml-6 text-sm text-slate-700">
                      {demoScore / demoQuestionsSeed.length < 0.7 ? (
                        <li>Focus revision on diagrams, core definitions, and basic numericals.</li>
                      ) : (
                        <li>Maintain daily micro-tests to keep accuracy high.</li>
                      )}
                      <li>Try another micro-test in 2 days to measure improvement.</li>
                    </ul>
                  </div>

                  <div className="mt-6 flex justify-center gap-3">
                    <button onClick={() => { setDemoActive(false); setDemoSubmitted(false); }} className="px-4 py-2 border rounded">Close</button>
                    <button onClick={() => { setDemoSubmitted(false); setCurrentQ(0); setSelectedAnswers({}); setDemoScore(0); }} className="px-4 py-2 bg-emerald-600 text-white rounded">Retake</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
