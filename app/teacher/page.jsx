"use client";
import { useState } from "react";
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

// Mock data — AI-processed test scores
const students = [
  {
    id: 1,
    name: "Swanand V. Bagale",
    scores: [
      { test: "Test 51", marks: 540 },
      { test: "Test 57", marks: 647 },
      { test: "Test 61", marks: 630 },
    ],
    avg: 606,
    weakArea: "Biology – Diagrams",
  },
  {
    id: 2,
    name: "Riya Sharma",
    scores: [
      { test: "Test 51", marks: 580 },
      { test: "Test 57", marks: 600 },
      { test: "Test 61", marks: 655 },
    ],
    avg: 612,
    weakArea: "Physics – EMI",
  },
  {
    id: 3,
    name: "Aarav Mehta",
    scores: [
      { test: "Test 51", marks: 620 },
      { test: "Test 57", marks: 680 },
      { test: "Test 61", marks: 695 },
    ],
    avg: 665,
    weakArea: "Chemistry – Organic Mechanism",
  },
];

// Mock batch-wise AI recommendation
const batchAIInsights = [
  {
    batch: "Batch 1",
    weakTopics: ["Physics – EMI", "Biology – Diagrams"],
    avgImprovement: "+8.5%",
  },
  {
    batch: "Batch 2",
    weakTopics: ["Chemistry – Thermodynamics", "Biology – Genetics"],
    avgImprovement: "+6.2%",
  },
  {
    batch: "Batch 3",
    weakTopics: ["Physics – Magnetism", "Chemistry – Ionic Equilibrium"],
    avgImprovement: "+5.7%",
  },
];

export default function TeacherDashboard() {
  const [selectedStudent, setSelectedStudent] = useState(students[0]);
  const [focusTopic, setFocusTopic] = useState("");
  const [teacherNotes, setTeacherNotes] = useState([]);

  const handleSaveNote = () => {
    if (focusTopic.trim() !== "") {
      setTeacherNotes([
        ...teacherNotes,
        { student: selectedStudent.name, topic: focusTopic },
      ]);
      setFocusTopic("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Teacher Dashboard
          </h1>
          <p className="text-slate-600">Monitor Student Progress & Batch Insights</p>
        </div>
        <button
          onClick={() => alert("Simulating AI re-analysis...")}
          className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700"
        >
          Run AI Batch Analysis
        </button>
      </div>

      {/* Student selector */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-3">Select Student</h3>
        <select
          className="border p-2 rounded w-full md:w-1/2"
          value={selectedStudent.id}
          onChange={(e) =>
            setSelectedStudent(
              students.find((s) => s.id === Number(e.target.value))
            )
          }
        >
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* Student Progress Chart */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-2">
          {selectedStudent.name}'s Progress (Last 3 Tests)
        </h3>
        <div style={{ width: "100%", height: 250 }}>
          <ResponsiveContainer>
            <LineChart data={selectedStudent.scores}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="test" />
              <YAxis domain={[0, 720]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="marks"
                stroke="#2563EB"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-3 flex justify-between text-sm text-slate-600">
          <p>Average Score: <b>{selectedStudent.avg}</b></p>
          <p>Weak Area: <b>{selectedStudent.weakArea}</b></p>
        </div>
      </div>

      {/* Teacher Suggest Focus Topic */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-3">
          Suggest Focus Topic for {selectedStudent.name}
        </h3>
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            placeholder="Enter focus topic..."
            value={focusTopic}
            onChange={(e) => setFocusTopic(e.target.value)}
            className="border p-2 rounded flex-grow"
          />
          <button
            onClick={handleSaveNote}
            className="bg-emerald-600 text-white px-4 py-2 rounded shadow hover:bg-emerald-700"
          >
            Save Suggestion
          </button>
        </div>

        {/* Teacher Notes List */}
        {teacherNotes.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-1 text-sm text-slate-700">
              Saved Focus Topics
            </h4>
            <ul className="list-disc ml-6 text-sm text-slate-700 space-y-1">
              {teacherNotes.map((note, i) => (
                <li key={i}>
                  <b>{note.student}:</b> {note.topic}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* AI Batch Recommendation */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-3">AI Batch Insights & Recommendations</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b bg-slate-100 text-left">
                <th className="py-2 px-2">Batch</th>
                <th className="py-2 px-2">Weak Topics</th>
                <th className="py-2 px-2">Avg Improvement</th>
              </tr>
            </thead>
            <tbody>
              {batchAIInsights.map((b, i) => (
                <tr key={i} className="border-b hover:bg-slate-50">
                  <td className="py-2 px-2 font-medium">{b.batch}</td>
                  <td className="py-2 px-2">{b.weakTopics.join(", ")}</td>
                  <td className="py-2 px-2 text-emerald-600 font-semibold">
                    {b.avgImprovement}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Class-wide Performance Overview */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-3">Class Average Performance</h3>
        <div style={{ width: "100%", height: 250 }}>
          <ResponsiveContainer>
            <BarChart
              data={students.map((s) => ({
                name: s.name.split(" ")[0],
                average: s.avg,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 720]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="average" fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
