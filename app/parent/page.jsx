"use client";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

// Mock data
const studentData = {
  name: "Swanand V. Bagale",
  averageScore: 606,
  consistency: 88,
  accuracy: 92,
  improvement: 17,
  trend: [
    { test: "Test 51", score: 540 },
    { test: "Test 57", score: 647 },
    { test: "Test 61", score: 630 },
  ],
  alerts: [
    "Performance dropped slightly in Test 61 due to Biology section.",
    "Concept retention rate lower in Physics problem-solving.",
    "Improvement trend positive, but consistency can be improved.",
  ],
  revisionPlan: [
    { day: "Monday", topic: "Physics – EMI (Derivations)", time: "6:00 PM" },
    { day: "Tuesday", topic: "Chemistry – Electrochemistry Practice", time: "6:00 PM" },
    { day: "Wednesday", topic: "Biology – Human Physiology", time: "6:00 PM" },
    { day: "Thursday", topic: "Physics – Alternating Current", time: "6:00 PM" },
    { day: "Friday", topic: "Chemistry – Organic Reactions", time: "6:00 PM" },
    { day: "Saturday", topic: "Biology – Biotechnology Diagrams", time: "5:00 PM" },
    { day: "Sunday", topic: "Mock Test + Self Evaluation", time: "10:00 AM" },
  ],
};

export default function ParentDashboard() {
  const student = studentData;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Parent Dashboard</h1>
          <p className="text-slate-600">
            Monitoring performance for <b>{student.name}</b>
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-sm text-slate-500">Average Score</p>
          <p className="text-2xl font-bold text-indigo-600">{student.averageScore} / 720</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-sm text-slate-500">Accuracy</p>
          <p className="text-2xl font-bold text-emerald-600">{student.accuracy}%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-sm text-slate-500">Consistency</p>
          <p className="text-2xl font-bold text-blue-600">{student.consistency}%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-sm text-slate-500">Overall Improvement</p>
          <p className="text-2xl font-bold text-orange-500">+{student.improvement}%</p>
        </div>
      </div>

      {/* Progress Trend */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-2">Score Progress</h3>
        <div style={{ width: "100%", height: 250 }}>
          <ResponsiveContainer>
            <LineChart data={student.trend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="test" />
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

      {/* Performance Alerts */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-2 text-red-600">AI Performance Alerts</h3>
        <ul className="list-disc ml-6 space-y-1 text-slate-700">
          {student.alerts.map((alert, i) => (
            <li key={i}>{alert}</li>
          ))}
        </ul>
      </div>

      {/* Revision Plan */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-2">Weekly AI Revision Plan</h3>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b bg-slate-100 text-left">
              <th className="py-2 px-2">Day</th>
              <th className="py-2 px-2">Topic</th>
              <th className="py-2 px-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {student.revisionPlan.map((plan, i) => (
              <tr key={i} className="border-b hover:bg-slate-50">
                <td className="py-2 px-2">{plan.day}</td>
                <td className="py-2 px-2">{plan.topic}</td>
                <td className="py-2 px-2">{plan.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Motivation Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-lg shadow p-6 text-center">
        <h3 className="text-lg font-semibold mb-1">Encouragement</h3>
        <p className="text-sm italic">
          “Your child’s consistency and curiosity are key.  
          Encourage short daily revisions over long study hours.”
        </p>
      </div>
    </div>
  );
}
