"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

/**
 * Combined Student Dashboard
 * - Keeps all previous features (rank widget, charts, AI recommendations, 7-day plan, skill radar)
 * - Adds: Upcoming Test popup, Demo 15-question test modal, Alternate-day micro-tests
 * - Ranking is DYNAMIC: calculated from mock class data comparing student average
 *
 * Save as: app/student/page.jsx
 * Make sure `recharts` is installed: npm install recharts
 */

/* ----------------------------- Mock / Seed Data ---------------------------- */
const studentName = "Swanand V. Bagale";

/* Full test history (larger tests) */
const testTrend = [
  { name: "Test 51", score: 540 },
  { name: "Test 57", score: 647 },
  { name: "Test 61", score: 630 },
];

/* Subject-wise performance (percent) */
const subjectPerformance = [
  { subject: "Physics", score: 94 },
  { subject: "Chemistry", score: 95 },
  { subject: "Biology", score: 80 },
];

/* Skill radar */
const skillRadar = [
  { skill: "Concept Clarity", value: 85 },
  { skill: "Speed", value: 75 },
  { skill: "Accuracy", value: 90 },
  { skill: "Retention", value: 70 },
  { skill: "Consistency", value: 88 },
];

/* Alternate-day micro-tests (15-question mini tests) */
const microTestsSeed = [
  { date: "2025-10-12", topic: "Physics - EMI", correct: 11, total: 15 },
  { date: "2025-10-14", topic: "Biology - Physiology", correct: 8, total: 15 },
  { date: "2025-10-16", topic: "Chemistry - Ionic Eq.", correct: 13, total: 15 },
  { date: "2025-10-18", topic: "Physics - AC Circuits", correct: 10, total: 15 },
  { date: "2025-10-20", topic: "Biology - Genetics", correct: 12, total: 15 },
];

/* Mock class data used to compute dynamic ranking */
const classMock = [
  { name: "Aarav Mehta", avg: 680 },
  { name: "Riya Sharma", avg: 662 },
  { name: "Swanand V. Bagale", avg: 647 },
  { name: "Tanishq Patel", avg: 630 },
  { name: "Krisha Nair", avg: 615 },
  { name: "Aditya Rao", avg: 590 },
  /* more mocked entries to simulate a class of 25 */
  ...Array.from({ length: 19 }).map((_, i) => ({
    name: `Student ${i + 7}`,
    avg: 500 + (i % 100),
  })),
];

/* AI recommendations and 7-day plan */
const aiRecommendationsSeed = [
  "Revise Biology diagrams daily for 10 mins.",
  "Focus on EMI derivations; practice step-by-step.",
  "Use spaced repetition for Chemistry equations.",
];

const sevenDayPlanSeed = [
  { day: "Day 1", topic: "Physics – EMI", duration: "90 min" },
  { day: "Day 2", topic: "Chemistry – Ionic Eq.", duration: "60 min" },
  { day: "Day 3", topic: "Biology – Human Physiology", duration: "60 min" },
  { day: "Day 4", topic: "Physics – AC Circuits", duration: "75 min" },
  { day: "Day 5", topic: "Chemistry – Organic Reactions", duration: "60 min" },
  { day: "Day 6", topic: "Biology – Diagrams", duration: "90 min" },
  { day: "Day 7", topic: "AI Mixed Practice Test", duration: "120 min" },
];

/* Upcoming test info */
const upcomingTest = {
  date: "2025-11-02",
  topic: "Physics – Waves & Oscillations",
  time: "6:00 PM",
  note: "15-question micro test covering core numericals",
};

/* ------------------------------- Demo Test Data ---------------------------- */
/* 15 demo questions (short sample). For demo we include 15 minimal Qs. */
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

/* ------------------------------ Helper Utils ------------------------------- */
const calcStudentAvgFromTrend = (trend) => {
  if (!trend || trend.length === 0) return 0;
  const sum = trend.reduce((s, t) => s + (t.score || 0), 0);
  return Math.round(sum / trend.length);
};

/* ------------------------------- Component -------------------------------- */
export default function StudentDashboard() {
  // state: keep micro tests and demo test interaction
  const [microTests, setMicroTests] = useState(microTestsSeed);
  const [aiRecommendations, setAiRecommendations] = useState(aiRecommendationsSeed);
  const [sevenDayPlan, setSevenDayPlan] = useState(sevenDayPlanSeed);

  // upcoming popup
  const [showPopup, setShowPopup] = useState(true);

  // demo test modal
  const [demoActive, setDemoActive] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [demoScore, setDemoScore] = useState(0);

  // ranking: dynamic computed from classMock comparing student's avg
  const studentAvg = useMemo(() => calcStudentAvgFromTrend(testTrend), []);
  const classSorted = useMemo(() => {
    const copy = [...classMock];
    return copy.sort((a, b) => b.avg - a.avg);
  }, []);
  const rank = useMemo(() => {
    const idx = classSorted.findIndex((s) => s.name === studentName);
    return idx >= 0 ? idx + 1 : classSorted.length + 1;
  }, [classSorted]);

  // micro test derived stats
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

  /* Auto-hide popup after 9 seconds */
  useEffect(() => {
    const t = setTimeout(() => setShowPopup(false), 9000);
    return () => clearTimeout(t);
  }, []);

  /* Demo test handlers */
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

    // Update microTests to include this demo as latest micro-test
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

    // Update AI recommendations lightly (demo: if low score suggest focus)
    if (correct / demoQuestionsSeed.length < 0.7) {
      setAiRecommendations((prev) => [
        `Demo indicates weakness in mixed fundamentals — focus on diagrams & numericals.`,
        ...prev,
      ]);
    } else {
      setAiRecommendations((prev) => [
        `Demo shows solid fundamentals — maintain micro-test rhythm.`,
        ...prev,
      ]);
    }
  };

  /* Small helper for display percent */
  const displayPercent = (n) => (typeof n === "number" ? `${n.toFixed(1)}%` : n);

  return (
    <div className="space-y-6 p-4">
      {/* Upcoming test popup */}
      {showPopup && (
        <div className="fixed right-5 top-5 z-50 max-w-xs bg-indigo-600 text-white p-4 rounded-lg shadow-lg">
          <div className="text-sm font-semibold">📅 Upcoming Test</div>
          <div className="mt-1 text-sm">
            <div className="font-medium">{upcomingTest.topic}</div>
            <div className="text-xs">{upcomingTest.date} • {upcomingTest.time}</div>
          </div>
          <div className="mt-3 text-xs text-indigo-100">
            {upcomingTest.note}
          </div>
          <div className="mt-3 flex gap-2">
            <button
              className="bg-white text-indigo-700 text-xs px-3 py-1 rounded"
              onClick={() => { setShowPopup(false); startDemo(); }}
            >
              Take Demo Now
            </button>
            <button
              className="text-xs underline text-indigo-100 ml-auto"
              onClick={() => setShowPopup(false)}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Student Dashboard</h1>
          <p className="text-sm text-slate-600">Overview & micro-test workflow for <b>{studentName}</b></p>
        </div>

        <div className="space-y-2 text-right">
          <div className="text-sm text-slate-500">Predicted next score</div>
          <div className="text-lg font-semibold text-emerald-600">{studentAvg} / 720</div>
          <div className="mt-2 text-xs text-slate-500">Rank: <span className="font-semibold text-indigo-600">#{rank}</span> / {classSorted.length}</div>
          <div className="mt-3 flex gap-2 justify-end">
            <button onClick={startDemo} className="bg-emerald-600 text-white px-3 py-1 rounded text-sm">🎯 Start Demo Test</button>
            <button onClick={() => alert("Download PDF (demo)")} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded text-sm">📄 Download Report</button>
          </div>
        </div>
      </div>

      {/* Key stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded shadow p-4 text-center">
          <div className="text-xs text-slate-500">Average Score</div>
          <div className="text-2xl font-bold text-indigo-600">{studentAvg} / 720</div>
        </div>
        <div className="bg-white rounded shadow p-4 text-center">
          <div className="text-xs text-slate-500">Micro Test Accuracy</div>
          <div className="text-2xl font-bold text-emerald-600">{displayPercent(microAccuracy)}</div>
        </div>
        <div className="bg-white rounded shadow p-4 text-center">
          <div className="text-xs text-slate-500">Weak Topics</div>
          <div className="text-sm font-semibold text-red-600">{weakTopics.length ? weakTopics.join(", ") : "None"}</div>
        </div>
        <div className="bg-white rounded shadow p-4 text-center">
          <div className="text-xs text-slate-500">Consistency</div>
          <div className="text-2xl font-bold text-blue-600">88%</div>
        </div>
      </div>

      {/* Charts (trend & subject) */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded shadow p-4">
          <h3 className="font-semibold mb-2">Performance Trend (Full Tests)</h3>
          <div style={{ height: 260 }}>
            <ResponsiveContainer>
              <LineChart data={testTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 720]} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#6366F1" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded shadow p-4">
          <h3 className="font-semibold mb-2">Subject-wise Performance</h3>
          <div style={{ height: 260 }}>
            <ResponsiveContainer>
              <BarChart data={subjectPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Micro-tests bar chart */}
      <div className="bg-white rounded shadow p-4">
        <h3 className="font-semibold mb-2">Alternate Day 15-question Micro Tests</h3>
        <div style={{ height: 240 }}>
          <ResponsiveContainer>
            <BarChart data={microTests}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 15]} />
              <Tooltip formatter={(val) => `${val} correct`} />
              <Bar dataKey="correct" fill="#2563EB" name="Correct Answers" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 text-sm text-slate-600">
          AI Insight: {weakTopics.length ? `Focus more micro-tests on ${weakTopics.join(", ")}.` : "No weak topics detected in micro-tests."}
        </div>
      </div>

      {/* Skill radar + Ranking widget */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded shadow p-4 md:col-span-2">
          <h3 className="font-semibold mb-2">Learning Skill Map</h3>
          <div style={{ height: 320 }}>
            <ResponsiveContainer>
              <RadarChart data={skillRadar}>
                <PolarGrid />
                <PolarAngleAxis dataKey="skill" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="Skill" dataKey="value" stroke="#2563EB" fill="#2563EB" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded shadow p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">Class Ranking</h3>
            <div className="text-sm text-slate-500">You are <b className="text-indigo-600">#{rank}</b> / {classSorted.length}</div>
          </div>
          <div className="overflow-y-auto h-64">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-500 border-b">
                  <th className="py-2">Rank</th>
                  <th className="py-2">Student</th>
                  <th className="py-2">Avg</th>
                </tr>
              </thead>
              <tbody>
                {classSorted.slice(0, 25).map((s, i) => (
                  <tr key={s.name} className={`border-b ${s.name === studentName ? "bg-indigo-50 font-semibold" : "hover:bg-slate-50"}`}>
                    <td className="py-2">#{i + 1}</td>
                    <td className="py-2">{s.name}</td>
                    <td className="py-2">{s.avg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-white rounded shadow p-4">
        <h3 className="font-semibold mb-2">AI Personalized Recommendations</h3>
        <ul className="list-disc ml-6 space-y-1 text-slate-700">
          {aiRecommendations.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </div>

      {/* 7-Day Revision Plan */}
      <div className="bg-white rounded shadow p-4">
        <h3 className="font-semibold mb-2">7-Day AI Revision Plan</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-100 text-left text-xs border-b">
              <th className="py-2 px-2">Day</th>
              <th className="py-2 px-2">Focus Topic</th>
              <th className="py-2 px-2">Duration</th>
            </tr>
          </thead>
          <tbody>
            {sevenDayPlan.map((d, i) => (
              <tr key={i} className="border-b hover:bg-slate-50">
                <td className="py-2 px-2">{d.day}</td>
                <td className="py-2 px-2">{d.topic}</td>
                <td className="py-2 px-2">{d.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Motivation */}
      <div className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded shadow p-6 text-center">
        <h3 className="text-lg font-semibold">AI Motivation</h3>
        <p className="text-sm italic">“Small daily progress adds up — keep taking micro-tests and review weak topics.”</p>
      </div>

      {/* ---------------- Demo Test Modal ---------------- */}
      {demoActive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl overflow-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <div>
                <h2 className="font-bold text-lg">Demo 15-question Test</h2>
                <p className="text-xs text-slate-600">This demo helps adapt your weak topics. No pressure — it's for practice.</p>
              </div>
              <div className="flex gap-2">
                {!demoSubmitted ? (
                  <div className="text-sm text-slate-500">Q {currentQ + 1} / {demoQuestionsSeed.length}</div>
                ) : null}
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
                    {demoScore / demoQuestionsSeed.length >= 0.7 ? "Great work — keep the consistency!" : "Target weak topics from the recommendations below."}
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
                    <button onClick={() => { /* keep modal open to retake */ setDemoSubmitted(false); setCurrentQ(0); setSelectedAnswers({}); setDemoScore(0); }} className="px-4 py-2 bg-emerald-600 text-white rounded">Retake</button>
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
