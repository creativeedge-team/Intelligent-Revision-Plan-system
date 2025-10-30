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
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

// Mock student data (can be fetched from backend)
const students = [
  {
    id: 1,
    name: "Swanand V. Bagale",
    attendance: 92,
    consistency: 88,
    weakSubjects: ["Biology – Diagrams", "Physics – EMI Derivations"],
    overallRemark: "Good performance, needs improvement in retention and focus.",
    trend: [
      { test: "Test 51", score: 540 },
      { test: "Test 57", score: 647 },
      { test: "Test 61", score: 630 },
    ],
    subjectStrengths: [
      { subject: "Physics", score: 94 },
      { subject: "Chemistry", score: 95 },
      { subject: "Biology", score: 80 },
    ],
    skillRadar: [
      { skill: "Concept Clarity", value: 85 },
      { skill: "Speed", value: 78 },
      { skill: "Accuracy", value: 90 },
      { skill: "Retention", value: 72 },
      { skill: "Consistency", value: 88 },
    ],
  },
  {
    id: 2,
    name: "Riya Sharma",
    attendance: 89,
    consistency: 91,
    weakSubjects: ["Chemistry – Thermodynamics"],
    overallRemark: "Highly consistent and accurate, minor conceptual confusion.",
    trend: [
      { test: "Test 51", score: 580 },
      { test: "Test 57", score: 600 },
      { test: "Test 61", score: 655 },
    ],
    subjectStrengths: [
      { subject: "Physics", score: 90 },
      { subject: "Chemistry", score: 82 },
      { subject: "Biology", score: 88 },
    ],
    skillRadar: [
      { skill: "Concept Clarity", value: 90 },
      { skill: "Speed", value: 84 },
      { skill: "Accuracy", value: 93 },
      { skill: "Retention", value: 88 },
      { skill: "Consistency", value: 91 },
    ],
  },
];

export default function CounselorDashboard() {
  const [selectedStudent, setSelectedStudent] = useState(students[0]);
  const [counselorNote, setCounselorNote] = useState("");
  const [notes, setNotes] = useState([]);

  const handleSaveNote = () => {
    if (counselorNote.trim()) {
      setNotes([...notes, { student: selectedStudent.name, note: counselorNote }]);
      setCounselorNote("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Counselor Dashboard</h1>
          <p className="text-slate-600">
            Track academic & behavioral progress of students
          </p>
        </div>
      </div>

      {/* Student Selector */}
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

      {/* Performance Overview */}
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-sm text-slate-500">Attendance</p>
          <p className="text-2xl font-bold text-indigo-600">
            {selectedStudent.attendance}%
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-sm text-slate-500">Consistency</p>
          <p className="text-2xl font-bold text-blue-600">
            {selectedStudent.consistency}%
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-sm text-slate-500">Strongest Subject</p>
          <p className="text-2xl font-bold text-emerald-600">
            {
              selectedStudent.subjectStrengths.reduce((max, s) =>
                s.score > max.score ? s : max
              ).subject
            }
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-sm text-slate-500">Weakest Subject</p>
          <p className="text-2xl font-bold text-red-600">
            {selectedStudent.weakSubjects[0].split("–")[0]}
          </p>
        </div>
      </div>

      {/* Consistency Trend */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-2">Performance Trend</h3>
        <div style={{ width: "100%", height: 250 }}>
          <ResponsiveContainer>
            <LineChart data={selectedStudent.trend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="test" />
              <YAxis domain={[0, 720]} />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#6366F1" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Subject Strength Chart */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-2">Subject-Wise Strength</h3>
        <div style={{ width: "100%", height: 250 }}>
          <ResponsiveContainer>
            <BarChart data={selectedStudent.subjectStrengths}>
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

      {/* Skill Radar Chart */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-2">Learning Skill Analysis</h3>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <RadarChart data={selectedStudent.skillRadar}>
              <PolarGrid />
              <PolarAngleAxis dataKey="skill" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="Skills"
                dataKey="value"
                stroke="#2563EB"
                fill="#2563EB"
                fillOpacity={0.4}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weak Areas and Remarks */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-2 text-red-600">AI Detected Weak Areas</h3>
        <ul className="list-disc ml-6 text-slate-700">
          {selectedStudent.weakSubjects.map((w, i) => (
            <li key={i}>{w}</li>
          ))}
        </ul>
        <p className="mt-3 text-slate-700 text-sm">
          <b>Overall Remark:</b> {selectedStudent.overallRemark}
        </p>
      </div>

      {/* Counselor Notes */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-3">Add Counselor Notes</h3>
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            placeholder="Add feedback or action point..."
            value={counselorNote}
            onChange={(e) => setCounselorNote(e.target.value)}
            className="border p-2 rounded flex-grow"
          />
          <button
            onClick={handleSaveNote}
            className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
          >
            Save Note
          </button>
        </div>

        {notes.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-1 text-sm text-slate-700">
              Saved Notes
            </h4>
            <ul className="list-disc ml-6 text-sm text-slate-700 space-y-1">
              {notes.map((n, i) => (
                <li key={i}>
                  <b>{n.student}:</b> {n.note}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
