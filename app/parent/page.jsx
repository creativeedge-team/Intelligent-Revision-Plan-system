"use client";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar
} from "recharts";

const testPerformance = [
  { name: "Test 51", score: 540 },
  { name: "Test 57", score: 647 },
  { name: "Test 61", score: 630 },
];

const subjectProgress = [
  { subject: "Physics", progress: 94.4 },
  { subject: "Chemistry", progress: 95.5 },
  { subject: "Biology", progress: 80 },
];

export default function ParentDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Parent Dashboard</h1>
      <p className="text-slate-600 mb-6">
        Overview for <b>Swanand V. Bagale</b>
      </p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-sm text-slate-500">Overall Performance</p>
          <p className="text-xl font-bold text-indigo-600">~91%</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-sm text-slate-500">Consistency</p>
          <p className="text-xl font-bold text-green-600">95%</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-sm text-slate-500">Predicted Score</p>
          <p className="text-xl font-bold text-emerald-600">650–675 / 720</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Test performance line chart */}
        <div className="bg-white rounded shadow p-4">
          <h3 className="font-semibold mb-2">Test Performance Over Time</h3>
          <div style={{ width: "100%", height: 250 }}>
            <ResponsiveContainer>
              <LineChart data={testPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 720]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#2563EB"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject progress bar chart */}
        <div className="bg-white rounded shadow p-4">
          <h3 className="font-semibold mb-2">Subject Progress</h3>
          <div style={{ width: "100%", height: 250 }}>
            <ResponsiveContainer>
              <BarChart data={subjectProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="progress" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Remarks */}
      <div className="bg-white rounded shadow p-4 mt-6">
        <h3 className="font-semibold mb-2">Teacher Remarks & AI Notes</h3>
        <ul className="list-disc ml-6 text-slate-700">
          <li>Physics: Strong recovery; continue daily numericals.</li>
          <li>Chemistry: Maintain accuracy; practice assertion-reason questions.</li>
          <li>Biology: Focus on diagrams & genetics visualization.</li>
        </ul>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={() => window.print()}
          className="bg-indigo-600 text-white px-6 py-2 rounded shadow"
        >
          Download Report
        </button>
      </div>
    </div>
  );
}
