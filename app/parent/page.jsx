"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Heart,
  Brain,
  AlertCircle,
  FileText,
  Calendar,
  Smile,
  TrendingUp,
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

export default function ParentDashboard() {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", title: "Overview", icon: <Smile size={18} /> },
    { id: "progress", title: "Progress Report", icon: <BarChart3 size={18} /> },
    { id: "ai", title: "AI Insights", icon: <Brain size={18} /> },
    {
      id: "alerts",
      title: "Performance Alerts",
      icon: <AlertCircle size={18} />,
    },
    { id: "report", title: "Download Report", icon: <FileText size={18} /> },
  ];

  const weeklyProgress = [
    { week: "Week 1", score: 72 },
    { week: "Week 2", score: 79 },
    { week: "Week 3", score: 84 },
    { week: "Week 4", score: 88 },
    { week: "Week 5", score: 91 },
  ];

  const subjectPerformance = [
    { subject: "Math", score: 87 },
    { subject: "Science", score: 83 },
    { subject: "English", score: 91 },
    { subject: "History", score: 78 },
    { subject: "Biology", score: 85 },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-slate-200 flex flex-col justify-between fixed inset-y-0">
        <div>
          <div className="p-4 border-b border-slate-200">
            <h2 className="text-lg font-bold text-indigo-600">Parent Panel</h2>
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
        {/* === Overview === */}
        {activeSection === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-2xl font-bold text-slate-800 mb-4">
              Welcome, Parent 👋
            </h1>
            <p className="text-slate-600 mb-6">
              Here’s a quick snapshot of your child’s academic journey, learning
              consistency, and AI-generated progress trends.
            </p>

            {/* Cards */}
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
              {[
                {
                  label: "Overall Performance",
                  value: "88%",
                  color: "text-indigo-600",
                },
                {
                  label: "Consistency Score",
                  value: "91%",
                  color: "text-emerald-600",
                },
                {
                  label: "Tests Completed",
                  value: "14",
                  color: "text-blue-600",
                },
                {
                  label: "Improvement Rate",
                  value: "+12%",
                  color: "text-amber-600",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition"
                >
                  <h3 className="text-sm text-slate-500 mb-1">{item.label}</h3>
                  <p className={`text-2xl font-bold ${item.color}`}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-3">
                  Weekly Performance Trend
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={weeklyProgress}>
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <XAxis dataKey="week" />
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

              <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-3">
                  Subject-wise Analysis
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={subjectPerformance}>
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <XAxis dataKey="subject" />
                    <YAxis domain={[60, 100]} />
                    <Tooltip />
                    <Bar dataKey="score" fill="#6366f1" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}

        {/* === Progress Report === */}
        {activeSection === "progress" && (
          <motion.div
            key="progress"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-2xl font-bold text-slate-800 mb-4">
              Child’s Progress Summary
            </h1>
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm space-y-4">
              <p className="text-slate-600">
                Your child’s average score this month is <b>88%</b>, improving
                by
                <b> 12%</b> since last term. Consistency and focus have also
                increased significantly.
              </p>

              <div className="flex items-center gap-4">
                <TrendingUp className="text-emerald-500" size={20} />
                <span className="text-slate-600 text-sm">
                  AI predicts a <b>10-15%</b> improvement in the next quarter.
                </span>
              </div>

              <div className="mt-4 grid sm:grid-cols-2 gap-4">
                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                  <h4 className="font-semibold text-indigo-700">Strengths</h4>
                  <ul className="list-disc list-inside text-sm text-slate-600 mt-2">
                    <li>Math problem-solving speed</li>
                    <li>Concept understanding in Chemistry</li>
                    <li>Regular attendance and submissions</li>
                  </ul>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                  <h4 className="font-semibold text-amber-700">
                    Needs Attention
                  </h4>
                  <ul className="list-disc list-inside text-sm text-slate-600 mt-2">
                    <li>Physics — Force & Motion numericals</li>
                    <li>Revision frequency in Biology</li>
                    <li>Improving test review habits</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* === AI Insights === */}
        {activeSection === "ai" && (
          <motion.div
            key="ai"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-2xl font-bold text-slate-800 mb-4">
              AI Insights for Parents
            </h1>
            <p className="text-slate-600 mb-6">
              Based on the child’s consistency and test data, AI provides
              tailored feedback for better at-home learning support.
            </p>

            <div className="grid lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Encourage Revision Routine",
                  desc: "AI suggests maintaining alternate-day study cycles for better topic retention.",
                  color: "bg-indigo-100 text-indigo-700",
                },
                {
                  title: "Monitor Test Recovery",
                  desc: "After weak tests, ensure your child reviews error sheets and AI notes the same day.",
                  color: "bg-amber-100 text-amber-700",
                },
                {
                  title: "Reward Consistency",
                  desc: "Positive reinforcement boosts motivation. Celebrate small progress milestones weekly.",
                  color: "bg-emerald-100 text-emerald-700",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition ${item.color}`}
                >
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* === Performance Alerts === */}
        {activeSection === "alerts" && (
          <motion.div
            key="alerts"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-2xl font-bold text-slate-800 mb-4">
              Performance Alerts
            </h1>
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
              <ul className="divide-y divide-slate-200">
                {[
                  {
                    title: "Missed Micro Test",
                    date: "Nov 4, 2025",
                    message: "Your child missed a micro-test in Science.",
                    type: "warning",
                  },
                  {
                    title: "Low Accuracy Alert",
                    date: "Nov 2, 2025",
                    message: "Recent Physics test scored below 70%.",
                    type: "error",
                  },
                  {
                    title: "Great Improvement!",
                    date: "Oct 30, 2025",
                    message: "Biology scores improved by 10% this week.",
                    type: "success",
                  },
                ].map((alert, i) => (
                  <li
                    key={i}
                    className="py-4 flex justify-between items-start hover:bg-slate-50 px-2 rounded-lg transition"
                  >
                    <div>
                      <p className="font-medium text-slate-800">
                        {alert.title}
                      </p>
                      <p className="text-sm text-slate-600">{alert.message}</p>
                      <p className="text-xs text-slate-400 mt-1">
                        {alert.date}
                      </p>
                    </div>
                    <AlertCircle
                      size={18}
                      className={`${
                        alert.type === "success"
                          ? "text-emerald-500"
                          : alert.type === "error"
                          ? "text-red-500"
                          : "text-amber-500"
                      }`}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        {/* === Download Report === */}
        {activeSection === "report" && (
          <motion.div
            key="report"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-2xl font-bold text-slate-800 mb-4">
              Download Progress Report
            </h1>
            <div className="bg-gradient-to-r from-indigo-50 to-slate-50 p-8 rounded-xl border border-slate-200 shadow-sm text-center">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Get a Complete AI-Generated Report
              </h3>
              <p className="text-slate-600 mb-6">
                Includes test performance, AI predictions, and personalized
                improvement roadmap.
              </p>
              <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 shadow flex items-center justify-center gap-2 mx-auto">
                <FileText size={18} /> Download Report PDF
              </button>
              <p className="text-xs text-slate-500 mt-4">
                Report accuracy based on last 5 test results
              </p>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
