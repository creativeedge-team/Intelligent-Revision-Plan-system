"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Brain,
  BarChart3,
  FileText,
  Calendar,
  Search,
  ArrowLeft,
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

export default function CounselorDashboard() {
  const [activeSection, setActiveSection] = useState("overview");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("All");

  const sections = [
    { id: "overview", title: "Overview", icon: <Users size={18} /> },
    { id: "students", title: "Students", icon: <BarChart3 size={18} /> },
    { id: "ai", title: "AI Insights", icon: <Brain size={18} /> },
    {
      id: "attendance",
      title: "Attendance",
      icon: <Calendar size={18} />,
    },
    { id: "reports", title: "Reports", icon: <FileText size={18} /> },
  ];

  const studentData = [
    {
      name: "Aditi",
      score: 88,
      consistency: 91,
      motivation: "High",
      batch: "Batch 1",
    },
    {
      name: "Rohit",
      score: 76,
      consistency: 80,
      motivation: "Moderate",
      batch: "Batch 2",
    },
    {
      name: "Swanand",
      score: 82,
      consistency: 86,
      motivation: "High",
      batch: "Batch 3",
    },
    {
      name: "Neha",
      score: 91,
      consistency: 94,
      motivation: "High",
      batch: "Batch 1",
    },
    {
      name: "Karan",
      score: 69,
      consistency: 72,
      motivation: "Low",
      batch: "Batch 3",
    },
    {
      name: "Priya",
      score: 85,
      consistency: 89,
      motivation: "High",
      batch: "Batch 2",
    },
    {
      name: "Yash",
      score: 79,
      consistency: 83,
      motivation: "Moderate",
      batch: "Batch 1",
    },
  ];

  const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444"];
  const emotionData = [
    { name: "Motivated", value: 45 },
    { name: "Average", value: 30 },
    { name: "Low Focus", value: 15 },
    { name: "Stressed", value: 10 },
  ];

  const consistencyTrend = [
    { week: "Week 1", consistency: 72 },
    { week: "Week 2", consistency: 78 },
    { week: "Week 3", consistency: 85 },
    { week: "Week 4", consistency: 89 },
    { week: "Week 5", consistency: 91 },
  ];

  // Filter Logic
  const filteredStudents = studentData.filter((s) => {
    const matchName = s.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchBatch = selectedBatch === "All" || s.batch === selectedBatch;
    return matchName && matchBatch;
  });

  const renderStudentDetail = (student) => (
    <motion.div
      key="detail"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <button
        onClick={() => setSelectedStudent(null)}
        className="flex items-center text-sm text-indigo-600 hover:underline mb-4"
      >
        <ArrowLeft size={16} className="mr-1" /> Back to All Students
      </button>

      <h2 className="text-2xl font-bold text-slate-800">
        {student.name} — Student Report
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Average Score", value: `${student.score}%` },
          { label: "Consistency", value: `${student.consistency}%` },
          { label: "Motivation", value: student.motivation },
          { label: "AI Confidence", value: "88%" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm"
          >
            <p className="text-xs text-slate-500">{item.label}</p>
            <p className="text-lg font-semibold text-slate-800 mt-1">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 mb-3">
          Performance Trend
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            data={[
              { test: "Test 51", score: 72 },
              { test: "Test 57", score: 81 },
              { test: "Test 61", score: 88 },
              { test: "Micro Test", score: 90 },
            ]}
          >
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis dataKey="test" />
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

      <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 shadow-sm">
        <h3 className="text-lg font-semibold text-indigo-700 mb-3">
          AI Counseling Notes
        </h3>
        <ul className="list-disc list-inside text-slate-700 text-sm space-y-1">
          <li>Improving steadily; consistency up 6% this month.</li>
          <li>Struggles slightly with “Force & Motion”.</li>
          <li>AI suggests 2 micro-tests weekly for reinforcement.</li>
          <li>Encourage regular 15-min reading after revision.</li>
        </ul>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-slate-200 flex flex-col justify-between fixed inset-y-0">
        <div>
          <div className="p-4 border-b border-slate-200">
            <h2 className="text-lg font-bold text-indigo-600">
              Counselor Panel
            </h2>
          </div>
          <nav className="p-3 flex flex-col gap-2">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setActiveSection(s.id);
                  setSelectedStudent(null);
                }}
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

      {/* Main Content */}
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
              Counselor Dashboard Overview
            </h1>
            <p className="text-slate-600 mb-6">
              Analyze emotional consistency, motivation, and student performance
              trends.
            </p>

            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
              {[
                {
                  label: "Total Students",
                  value: "125",
                  color: "text-indigo-600",
                },
                {
                  label: "Under Observation",
                  value: "12",
                  color: "text-amber-600",
                },
                {
                  label: "Avg Consistency",
                  value: "88%",
                  color: "text-emerald-600",
                },
                {
                  label: "Motivation Index",
                  value: "74%",
                  color: "text-blue-600",
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

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Consistency Chart */}
              <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-3">
                  Weekly Consistency Growth
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={consistencyTrend}>
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <XAxis dataKey="week" />
                    <YAxis domain={[60, 100]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="consistency"
                      stroke="#4f46e5"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Motivation Pie */}
              <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-3">
                  Motivation Distribution
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={emotionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name }) => name}
                    >
                      {emotionData.map((entry, index) => (
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

        {/* === Students Section with Filters === */}
        {activeSection === "students" &&
          (selectedStudent ? (
            renderStudentDetail(selectedStudent)
          ) : (
            <motion.div
              key="students"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-2xl font-bold text-slate-800 mb-4">
                All Students Overview
              </h1>
              <p className="text-slate-600 mb-6">
                Search or filter by batch to view detailed insights and AI
                counseling data.
              </p>

              {/* Search & Filter */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                <div className="flex items-center border border-slate-300 rounded-md px-3 py-2 bg-white w-full sm:w-1/2">
                  <Search size={16} className="text-slate-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Search student by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="outline-none w-full text-sm text-slate-700"
                  />
                </div>

                <select
                  value={selectedBatch}
                  onChange={(e) => setSelectedBatch(e.target.value)}
                  className="border border-slate-300 rounded-md px-3 py-2 text-sm bg-white"
                >
                  <option value="All">All Batches</option>
                  <option value="Batch 1">Batch 1</option>
                  <option value="Batch 2">Batch 2</option>
                  <option value="Batch 3">Batch 3</option>
                </select>
              </div>

              {/* Grid */}
              {filteredStudents.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredStudents.map((s, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedStudent(s)}
                      className="cursor-pointer bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition"
                    >
                      <h3 className="text-lg font-semibold text-indigo-700">
                        {s.name}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {s.batch} • Avg Score: {s.score}% | Consistency:{" "}
                        {s.consistency}%
                      </p>
                      <p
                        className={`text-xs mt-2 ${
                          s.motivation === "High"
                            ? "text-emerald-600"
                            : s.motivation === "Low"
                            ? "text-red-600"
                            : "text-amber-600"
                        }`}
                      >
                        Motivation: {s.motivation}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-slate-500 mt-10">
                  No students found for your search/filter.
                </p>
              )}
            </motion.div>
          ))}

        {/* === AI Insights === */}
        {activeSection === "ai" && (
          <motion.div
            key="ai"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-2xl font-bold text-slate-800 mb-4">
              AI Insights & Counseling Recommendations
            </h1>
            <p className="text-slate-600 mb-8">
              The IRP AI continuously analyzes student data — consistency,
              emotional stability, and progress — to help counselors make more
              informed decisions.
            </p>

            {/* AI Cards */}
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
              {[
                {
                  label: "AI Confidence Level",
                  value: "88%",
                  color: "bg-indigo-100 text-indigo-700",
                },
                {
                  label: "Overall Consistency",
                  value: "91%",
                  color: "bg-emerald-100 text-emerald-700",
                },
                {
                  label: "Students At Risk",
                  value: "6",
                  color: "bg-red-100 text-red-700",
                },
                {
                  label: "Improvement Index",
                  value: "+9%",
                  color: "bg-blue-100 text-blue-700",
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

            <div className="grid lg:grid-cols-2 gap-8 mb-10">
              {/* Chart 1 */}
              <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-3">
                  Emotional Stability Index
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart
                    data={[
                      { week: "W1", stability: 72 },
                      { week: "W2", stability: 78 },
                      { week: "W3", stability: 84 },
                      { week: "W4", stability: 88 },
                      { week: "W5", stability: 91 },
                    ]}
                  >
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <XAxis dataKey="week" />
                    <YAxis domain={[60, 100]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="stability"
                      stroke="#4f46e5"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Chart 2 */}
              <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-3">
                  AI-Detected Behavioral Patterns
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    data={[
                      { category: "High Focus", value: 40 },
                      { category: "Low Motivation", value: 25 },
                      { category: "Consistent", value: 50 },
                      { category: "Needs Support", value: 15 },
                    ]}
                  >
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Insight Feed */}
            <div className="grid lg:grid-cols-3 gap-6">
              {[
                {
                  tag: "Critical",
                  color: "bg-red-100 text-red-700",
                  title: "Batch 3 - Motivation Drop",
                  desc: "AI detected drop in consistency and motivation; recommends counselor follow-up this week.",
                },
                {
                  tag: "Improving",
                  color: "bg-green-100 text-green-700",
                  title: "Batch 4 - Excellent Growth",
                  desc: "Steady emotional stability rise; consider recognizing top consistent students.",
                },
                {
                  tag: "Stable",
                  color: "bg-blue-100 text-blue-700",
                  title: "Batch 2 - Balanced Progress",
                  desc: "Students maintain consistent 85%+ focus; continue current mentorship frequency.",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex justify-between mb-2">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${card.color}`}
                    >
                      {card.tag}
                    </span>
                    <span className="text-xs text-slate-400">AI Alert</span>
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-1">
                    {card.title}
                  </h4>
                  <p className="text-sm text-slate-600">{card.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* === Attendance === */}
        {activeSection === "attendance" && (
          <motion.div
            key="attendance"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-2xl font-bold text-slate-800 mb-4">
              Attendance & Consistency Tracker
            </h1>
            <p className="text-slate-600 mb-8">
              Attendance and consistency are crucial to emotional balance and
              learning efficiency. AI tracks attendance patterns to identify
              students needing intervention.
            </p>

            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
              {[
                {
                  label: "Overall Attendance",
                  value: "92%",
                  color: "text-indigo-600",
                },
                {
                  label: "Average Consistency",
                  value: "88%",
                  color: "text-emerald-600",
                },
                {
                  label: "Irregular Students",
                  value: "8",
                  color: "text-red-600",
                },
                {
                  label: "AI Stability Score",
                  value: "85%",
                  color: "text-blue-600",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm"
                >
                  <h3 className="text-sm text-slate-500 mb-1">{card.label}</h3>
                  <p className={`text-2xl font-bold ${card.color}`}>
                    {card.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm mb-10">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Weekly Attendance Consistency
              </h3>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart
                  data={[
                    { week: "Week 1", attendance: 85 },
                    { week: "Week 2", attendance: 88 },
                    { week: "Week 3", attendance: 91 },
                    { week: "Week 4", attendance: 92 },
                    { week: "Week 5", attendance: 95 },
                  ]}
                >
                  <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                  <XAxis dataKey="week" />
                  <YAxis domain={[60, 100]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="attendance"
                    stroke="#10b981"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 shadow-sm">
              <h3 className="text-lg font-semibold text-indigo-700 mb-3">
                AI Counselor Notes
              </h3>
              <ul className="list-disc list-inside text-slate-700 text-sm space-y-1">
                <li>
                  Attendance steadily improving since last term; maintain
                  motivation routines.
                </li>
                <li>
                  8 students show irregularity — AI suggests weekly reminder
                  sessions.
                </li>
                <li>
                  Consistency and emotional stability are directly correlated
                  (R=0.82).
                </li>
                <li>
                  Suggest parental meetings for <b>Batch 3</b> and{" "}
                  <b>Batch 5</b>.
                </li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* === Reports === */}
        {activeSection === "reports" && (
          <motion.div
            key="reports"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-2xl font-bold text-slate-800 mb-6">
              Download Counselor Reports
            </h1>
            <div className="bg-gradient-to-r from-indigo-50 to-slate-50 p-8 rounded-xl border border-slate-200 shadow-sm text-center">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Generate Student Wellness Report
              </h3>
              <p className="text-slate-600 mb-6">
                Includes emotional, attendance, and performance analytics with
                AI recommendations.
              </p>
              <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 shadow flex items-center justify-center gap-2 mx-auto">
                <FileText size={18} /> Download Report PDF
              </button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
