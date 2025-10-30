"use client";
import { useState } from "react";

const mockStudents = [
  { id: 1, name: "Swanand V. Bagale", score: 630, pct: 87.5, weak: "Biology: Diagrams" },
  { id: 2, name: "Aisha Khan", score: 580, pct: 80.6, weak: "Physics: EMI" },
  { id: 3, name: "Rahul Mehta", score: 655, pct: 90.9, weak: "Chemistry: Electrochemistry" },
];

export default function TeacherDashboard() {
  const [processing, setProcessing] = useState(false);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Teacher Dashboard</h1>

      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <h3 className="font-semibold mb-2">Upload & Analyze</h3>
        <div className="flex gap-2 items-center">
          <input type="file" className="border p-1 rounded" />
          <input type="file" className="border p-1 rounded" />
          <button
            onClick={() => {
              setProcessing(true);
              setTimeout(() => setProcessing(false), 2000);
            }}
            className="bg-indigo-600 text-white px-4 py-1 rounded"
          >
            {processing ? "Analyzing..." : "Analyze"}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-2">Student Reports</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th>Name</th>
              <th>Score</th>
              <th>%</th>
              <th>Weak Area</th>
            </tr>
          </thead>
          <tbody>
            {mockStudents.map((s) => (
              <tr key={s.id} className="border-b">
                <td>{s.name}</td>
                <td>{s.score}</td>
                <td>{s.pct}%</td>
                <td>{s.weak}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
