"use client";
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

// Mock Data
const testTrend = [
  { name: "Test 51", score: 540 },
  { name: "Test 57", score: 647 },
  { name: "Test 61", score: 630 },
];

const subjectPerformance = [
  { subject: "Physics", score: 94 },
  { subject: "Chemistry", score: 95 },
  { subject: "Biology", score: 80 },
];

const skillRadar = [
  { skill: "Concept Clarity", value: 85 },
  { skill: "Speed", value: 75 },
  { skill: "Accuracy", value: 90 },
  { skill: "Retention", value: 70 },
  { skill: "Consistency", value: 88 },
];

const aiRecommendations = [
  "Revise Physics EMI chapter — focus on derivations.",
  "In Biology, practice diagram labeling daily (15 mins).",
  "Chemistry accuracy excellent — maintain with weekly mock.",
  "Do 10 mixed MCQs each day for retention improvement.",
];

const sevenDayPlan = [
  { day: "Day 1", topic: "Physics – Electromagnetic Induction", duration: "90 min" },
  { day: "Day 2", topic: "Chemistry – Electrochemistry", duration: "60 min" },
  { day: "Day 3", topic: "Biology – Human Physiology", duration: "60 min" },
  { day: "Day 4", topic: "Physics – Alternating Current", duration: "75 min" },
  { day: "Day 5", topic: "Chemistry – Organic Reactions", duration: "60 min" },
  { day: "Day 6", topic: "Biology – Biotechnology Diagrams", duration: "90 min" },
  { day: "Day 7", topic: "AI-Generated Mixed Test", duration: "120 min" },
];

// 🏆 Class Ranking Mock Data
const rankingData = [
  { rank: 1, name: "Aarav Mehta", score: 680 },
  { rank: 2, name: "Riya Sharma", score: 662 },
  { rank: 3, name: "Swanand V. Bagale", score: 647 },
  { rank: 4, name: "Tanishq Patel", score: 630 },
  { rank: 5, name: "Krisha Nair", score: 615 },
  { rank: 6, name: "Aditya Rao", score: 590 },
];

export default function StudentDashboard() {
  const studentName = "Swanand V. Bagale";
  const studentRank = rankingData.find((s) => s.name === studentName)?.rank;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Student Dashboard</h1>
          <p className="text-slate-600">
            Performance Overview for <b>{studentName}</b> (XI–XII PCB)
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-500">Predicted Next Score</p>
          <p className="text-lg font-semibold text-green-600">650 – 675 / 720</p>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-sm text-slate-500">Average Score</p>
          <p className="text-2xl font-bold text-indigo-600">606 / 720</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-sm text-slate-500">Accuracy</p>
          <p className="text-2xl font-bold text-emerald-600">92%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-sm text-slate-500">Improvement</p>
          <p className="text-2xl font-bold text-orange-500">+17%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-sm text-slate-500">Consistency</p>
          <p className="text-2xl font-bold text-blue-600">88%</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-2">Test Performance Trend</h3>
          <div style={{ width: "100%", height: 250 }}>
            <ResponsiveContainer>
              <LineChart data={testTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 720]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#6366F1"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject Performance */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-2">Subject-Wise Performance</h3>
          <div style={{ width: "100%", height: 250 }}>
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

      {/* Skill Radar */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-2">Learning Skill Map</h3>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <RadarChart data={skillRadar}>
              <PolarGrid />
              <PolarAngleAxis dataKey="skill" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="Skill"
                dataKey="value"
                stroke="#2563EB"
                fill="#2563EB"
                fillOpacity={0.4}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🏆 Ranking Widget */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Class Ranking</h3>
          <span className="text-sm text-slate-500">
            Your Rank: <b className="text-indigo-600">#{studentRank}</b> / {rankingData.length}
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b bg-slate-100 text-left">
                <th className="py-2 px-2">Rank</th>
                <th className="py-2 px-2">Student</th>
                <th className="py-2 px-2">Score</th>
              </tr>
            </thead>
            <tbody>
              {rankingData.map((s) => (
                <tr
                  key={s.rank}
                  className={`border-b ${
                    s.name === studentName ? "bg-indigo-50 font-semibold" : "hover:bg-slate-50"
                  }`}
                >
                  <td className="py-2 px-2">#{s.rank}</td>
                  <td className="py-2 px-2">{s.name}</td>
                  <td className="py-2 px-2">{s.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-2">AI Personalized Recommendations</h3>
        <ul className="list-disc ml-6 space-y-1 text-slate-700">
          {aiRecommendations.map((rec, i) => (
            <li key={i}>{rec}</li>
          ))}
        </ul>
      </div>

      {/* 7-Day Study Plan */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-2">7-Day AI Revision Plan</h3>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b bg-slate-100 text-left">
              <th className="py-2 px-2">Day</th>
              <th className="py-2 px-2">Focus Topic</th>
              <th className="py-2 px-2">Suggested Duration</th>
            </tr>
          </thead>
          <tbody>
            {sevenDayPlan.map((day, i) => (
              <tr key={i} className="border-b hover:bg-slate-50">
                <td className="py-2 px-2">{day.day}</td>
                <td className="py-2 px-2">{day.topic}</td>
                <td className="py-2 px-2">{day.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Motivation */}
      <div className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-lg shadow p-6 text-center">
        <h3 className="text-lg font-semibold mb-1">AI Motivation</h3>
        <p className="text-sm italic">
          “Consistency beats intensity. Focus 20 minutes daily on your weakest
          subject — and success will follow.”
        </p>
      </div>
    </div>
  );
}
