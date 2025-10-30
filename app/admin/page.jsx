"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const batchData = [
  { class: "9th", avg: 398 },
  { class: "10th", avg: 422 },
  { class: "11th", avg: 455 },
  { class: "12th", avg: 470 },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Admin / School Analytics</h1>
      <p className="text-slate-600 mb-6">
        Institutional insights powered by Intelligent Revision Plan
      </p>

      {/* Stats cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-sm text-slate-500">Average Score</p>
          <p className="text-xl font-bold text-indigo-600">398 / 720</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-sm text-slate-500">Topper</p>
          <p className="text-xl font-bold text-green-600">695</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-sm text-slate-500">Avg Improvement</p>
          <p className="text-xl font-bold text-emerald-600">+6.2%</p>
        </div>
      </div>

      {/* Bar chart */}
      <div className="bg-white rounded shadow p-4 mb-6">
        <h3 className="font-semibold mb-2">Average Scores by Class</h3>
        <div style={{ width: "100%", height: 250 }}>
          <ResponsiveContainer>
            <BarChart data={batchData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="class" />
              <YAxis domain={[0, 720]} />
              <Tooltip />
              <Bar dataKey="avg" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Common Weak Topics */}
      <div className="bg-white rounded shadow p-4 mb-6">
        <h3 className="font-semibold mb-2">Common Weak Topics (Detected by AI)</h3>
        <ul className="list-disc ml-6 text-slate-700">
          <li>Physics: EMI & Wave Optics</li>
          <li>Chemistry: Electrochemistry</li>
          <li>Biology: Biotechnology diagrams</li>
        </ul>
      </div>

      {/* Actionable Insights */}
      <div className="bg-white rounded shadow p-4">
        <h3 className="font-semibold mb-2">AI Suggestions for School</h3>
        <ul className="list-disc ml-6 text-slate-700">
          <li>Run a targeted 2-week remedial for EMI and diagram-based chapters.</li>
          <li>Integrate weekly AI mini-tests for concept retention.</li>
          <li>Share parent-friendly performance reports after each test.</li>
        </ul>
      </div>
    </div>
  );
}
    