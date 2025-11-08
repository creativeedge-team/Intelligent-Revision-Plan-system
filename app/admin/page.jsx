"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  FileText,
  Users,
  Brain,
  BarChart3,
  Settings,
  Trash2,
  Pencil,
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
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", title: "Overview", icon: <BarChart3 size={18} /> },
    { id: "uploads", title: "Test Uploads", icon: <Upload size={18} /> },
    { id: "batches", title: "Batch Analytics", icon: <FileText size={18} /> },
    { id: "ai", title: "AI Insights", icon: <Brain size={18} /> },
    { id: "users", title: "User Management", icon: <Users size={18} /> },
    { id: "settings", title: "Settings", icon: <Settings size={18} /> },
  ];

  const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444"];
  const batchData = [
    { batch: "Batch 1", avgScore: 82 },
    { batch: "Batch 2", avgScore: 75 },
    { batch: "Batch 3", avgScore: 88 },
    { batch: "Batch 4", avgScore: 91 },
  ];

  const aiData = [
    { week: "W1", accuracy: 78 },
    { week: "W2", accuracy: 82 },
    { week: "W3", accuracy: 85 },
    { week: "W4", accuracy: 88 },
    { week: "W5", accuracy: 90 },
  ];

  const usersData = [
    { role: "Students", count: 420 },
    { role: "Teachers", count: 24 },
    { role: "Parents", count: 380 },
    { role: "Counselors", count: 6 },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-slate-200 flex flex-col justify-between fixed inset-y-0">
        <div>
          <div className="p-4 border-b border-slate-200">
            <h2 className="text-lg font-bold text-indigo-600">Admin Panel</h2>
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

      {/* Main */}
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
              Platform Overview
            </h1>
            <p className="text-slate-600 mb-6">
              Quick insights into platform-wide performance, student engagement,
              and AI accuracy.
            </p>

            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
              {[
                {
                  label: "Total Students",
                  value: "420",
                  color: "text-indigo-600",
                },
                {
                  label: "Total Teachers",
                  value: "24",
                  color: "text-blue-600",
                },
                {
                  label: "Active Tests",
                  value: "36",
                  color: "text-emerald-600",
                },
                {
                  label: "AI Accuracy",
                  value: "90%",
                  color: "text-fuchsia-600",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm"
                >
                  <h3 className="text-sm text-slate-500 mb-1">{stat.label}</h3>
                  <p className={`text-2xl font-bold ${stat.color}`}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-3">
                  AI Accuracy Over Time
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={aiData}>
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <XAxis dataKey="week" />
                    <YAxis domain={[60, 100]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="accuracy"
                      stroke="#6366f1"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-3">
                  User Distribution
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={usersData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="count"
                      label={({ role }) => role}
                    >
                      {usersData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}

        {/* === Uploads === */}
        {activeSection === "uploads" && (
          <motion.div
            key="uploads"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-2xl font-bold text-slate-800 mb-4">
              Upload Test Data
            </h1>
            <p className="text-slate-600 mb-8">
              Upload question papers, answer sheets, and mark entries for
              analysis.
            </p>

            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm text-center">
              <Upload className="mx-auto text-indigo-500 mb-3" size={40} />
              <p className="text-sm text-slate-600 mb-4">
                Drag and drop your files here, or click below to browse.
              </p>
              <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 shadow">
                Select Files to Upload
              </button>
            </div>

            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {["Physics Test 51", "Chemistry Test 57", "Biology Test 61"].map(
                (test, i) => (
                  <div
                    key={i}
                    className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-semibold text-slate-800">{test}</h3>
                      <p className="text-xs text-slate-500">
                        Uploaded: 12 Oct 2025
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Pencil size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          </motion.div>
        )}

        {/* === Batch Analytics === */}
        {activeSection === "batches" && (
          <motion.div
            key="batches"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-2xl font-bold text-slate-800 mb-4">
              Batch Analytics
            </h1>
            <p className="text-slate-600 mb-8">
              View performance and consistency trends across batches.
            </p>

            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={batchData}>
                  <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                  <XAxis dataKey="batch" />
                  <YAxis domain={[60, 100]} />
                  <Tooltip />
                  <Bar
                    dataKey="avgScore"
                    fill="#6366f1"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
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
              AI Platform Insights
            </h1>
            <p className="text-slate-600 mb-8">
              AI system monitors performance metrics, identifies patterns, and
              provides suggestions for optimization.
            </p>

            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
              {[
                {
                  label: "AI Confidence",
                  value: "92%",
                  color: "bg-indigo-100 text-indigo-700",
                },
                {
                  label: "Avg Accuracy",
                  value: "90%",
                  color: "bg-green-100 text-green-700",
                },
                {
                  label: "Tests Analyzed",
                  value: "148",
                  color: "bg-blue-100 text-blue-700",
                },
                {
                  label: "System Health",
                  value: "Stable",
                  color: "bg-emerald-100 text-emerald-700",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition"
                >
                  <h3 className="text-sm text-slate-500 mb-1">{card.label}</h3>
                  <p className={`text-2xl font-bold ${card.color}`}>
                    {card.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* === User Management === */}
        {activeSection === "users" && (
          <motion.div
            key="users"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-2xl font-bold text-slate-800 mb-4">
              User Management
            </h1>
            <p className="text-slate-600 mb-6">
              Add, edit, or remove platform users (students, teachers, parents,
              counselors).
            </p>

            <div className="flex justify-between mb-6">
              <input
                type="text"
                placeholder="Search user by name..."
                className="border border-slate-300 rounded-md px-3 py-2 text-sm w-1/2"
              />
              <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-indigo-700">
                <PlusCircle size={16} /> Add User
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-100 text-slate-700 font-medium">
                  <tr>
                    <th className="p-3">Name</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Batch</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Aditi", role: "Student", batch: "Batch 1" },
                    { name: "Rohit", role: "Student", batch: "Batch 2" },
                    { name: "Neha", role: "Teacher", batch: "-" },
                    { name: "Swanand", role: "Student", batch: "Batch 3" },
                  ].map((u, i) => (
                    <tr
                      key={i}
                      className="border-b border-slate-100 hover:bg-slate-50"
                    >
                      <td className="p-3">{u.name}</td>
                      <td className="p-3">{u.role}</td>
                      <td className="p-3">{u.batch}</td>
                      <td className="p-3 text-right space-x-3">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Pencil size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
