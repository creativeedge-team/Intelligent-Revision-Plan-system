"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  BarChart3,
  Brain,
  Upload,
  FileText,
  AlertTriangle,
  BookOpen,
  PlusCircle,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

export default function TeacherDashboard() {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", title: "Overview", icon: <Users size={18} /> },
    {
      id: "performance",
      title: "Batch Performance",
      icon: <BarChart3 size={18} />,
    },
    { id: "ai", title: "AI Insights", icon: <Brain size={18} /> },
    { id: "tests", title: "Manage Tests", icon: <Upload size={18} /> },
    { id: "reports", title: "Reports", icon: <FileText size={18} /> },
  ];

  const batchPerformance = [
    { batch: "Batch 1", avgScore: 82 },
    { batch: "Batch 2", avgScore: 76 },
    { batch: "Batch 3", avgScore: 68 },
    { batch: "Batch 4", avgScore: 91 },
    { batch: "Batch 5", avgScore: 85 },
  ];

  const weakTopics = [
    { batch: "Batch 2", topic: "Chemical Reactions" },
    { batch: "Batch 3", topic: "Force & Motion" },
    { batch: "Batch 5", topic: "Photosynthesis" },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-slate-200 flex flex-col justify-between fixed inset-y-0">
        <div>
          <div className="p-4 border-b border-slate-200">
            <h2 className="text-lg font-bold text-indigo-600">Teacher Panel</h2>
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

      {/* Main Section */}
      <main className="ml-60 flex-1 p-6 space-y-8">
        {/* ===== Overview ===== */}
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

            {/* Stats */}
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
              {[
                { label: "Total Students", value: "125" },
                { label: "Batches Managed", value: "5" },
                { label: "Avg Class Accuracy", value: "83%" },
                { label: "AI Confidence", value: "90%" },
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

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Line Chart */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-semibold text-slate-800 mb-3">
                  Average Batch Performance
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={batchPerformance}>
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <XAxis dataKey="batch" />
                    <YAxis domain={[60, 100]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="avgScore"
                      stroke="#6366f1"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Weak Topics */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-semibold text-slate-800 mb-3">
                  AI-Detected Weak Topics
                </h3>
                <ul className="divide-y divide-slate-200">
                  {weakTopics.map((w, i) => (
                    <li
                      key={i}
                      className="py-3 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-slate-800 font-medium">{w.topic}</p>
                        <p className="text-slate-500 text-xs">{w.batch}</p>
                      </div>
                      <AlertTriangle className="text-amber-500" size={18} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {/* ===== Batch Performance ===== */}
        {activeSection === "performance" && (
          <motion.div
            key="performance"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-2xl font-bold text-slate-800 mb-6">
              Batch Performance Overview
            </h1>

            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={batchPerformance}>
                  <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                  <XAxis dataKey="batch" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="avgScore"
                    fill="#4f46e5"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>

              <div className="mt-6 text-sm text-slate-600">
                AI notes: Batch 3 needs focused revision on Physics numericals.
                Batch 4 is showing outstanding improvement (+9% this week).
              </div>
            </div>
          </motion.div>
        )}

        {/* ===== AI Insights ===== */}
        {activeSection === "ai" && (
          <motion.div
            key="ai"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-2xl font-bold text-slate-800 mb-4">
              AI Insights & Batch Recommendations
            </h1>
            <p className="text-slate-600 mb-6">
              The AI engine analyzes all batches weekly and highlights where
              targeted support is needed.
            </p>

            <div className="grid lg:grid-cols-3 gap-6">
              {[
                {
                  tag: "Critical",
                  color: "bg-red-100 text-red-700",
                  batch: "Batch 3",
                  topic: "Force & Motion",
                  insight:
                    "Low accuracy in formula application. Suggested additional micro-tests.",
                },
                {
                  tag: "Improving",
                  color: "bg-green-100 text-green-700",
                  batch: "Batch 2",
                  topic: "Chemical Reactions",
                  insight:
                    "Accuracy improving by 12%. Maintain alternate-day practice tests.",
                },
                {
                  tag: "Stable",
                  color: "bg-blue-100 text-blue-700",
                  batch: "Batch 4",
                  topic: "Sound & Waves",
                  insight:
                    "Consistent high accuracy. Schedule AI quiz to verify retention.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex justify-between mb-2">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${item.color}`}
                    >
                      {item.tag}
                    </span>
                    <span className="text-xs text-slate-400">{item.batch}</span>
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-1">
                    {item.topic}
                  </h4>
                  <p className="text-sm text-slate-600">{item.insight}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ===== Manage Tests ===== */}
        {activeSection === "tests" && (
          <motion.div
            key="tests"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-2xl font-bold text-slate-800 mb-4">
              Manage Test Data
            </h1>

            <div className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm text-center">
              <BookOpen size={40} className="text-indigo-500 mx-auto mb-4" />
              <p className="text-slate-600 mb-4">
                Upload question papers and student answer data to update
                analytics.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 shadow flex items-center justify-center gap-2">
                  <Upload size={18} /> Upload Test Paper
                </button>
                <button className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 flex items-center justify-center gap-2">
                  <PlusCircle size={18} /> Add Student Scores
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ===== Reports ===== */}
        {activeSection === "reports" && (
          <motion.div
            key="reports"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-2xl font-bold text-slate-800 mb-6">
              Batch Reports & Downloads
            </h1>

            <div className="bg-gradient-to-r from-indigo-50 to-slate-50 p-8 rounded-xl border border-slate-200 shadow-sm text-center">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Download Batch Performance Report
              </h3>
              <p className="text-slate-600 mb-6">
                Get detailed insights for each batch, including top students,
                AI-detected weaknesses, and test consistency graphs.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 shadow flex items-center justify-center gap-2">
                  <FileText size={18} /> Download Full Batch Report
                </button>
                <button className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 flex items-center justify-center gap-2">
                  <BarChart3 size={18} /> View Batch Analytics
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
