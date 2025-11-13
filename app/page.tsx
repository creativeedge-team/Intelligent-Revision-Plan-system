// app/page.jsx
"use client";
// import DemoModal from "@/components/DemoModal";
import Image from "next/image";
import Demopage from "../public/images/DemoPage.png";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, Mail } from "lucide-react";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const dates = Array.from({ length: 15 }, (_, i) => i + 11);
  const times = [
    "10:00 AM",
    "11:30 AM",
    "1:00 PM",
    "2:30 PM",
    "4:00 PM",
    "5:30 PM",
  ];
  return (
    <div className="min-h-screen">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/60 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                IR
              </div>
              <div className="text-lg font-semibold text-slate-900">
                IRP — Intelligent Revision Plan
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6 text-sm text-slate-700">
              <a className="hover:text-indigo-600" href="/about">
                About
              </a>
              <a className="hover:text-indigo-600" href="#analytics">
                Analytics
              </a>
              <a className="hover:text-indigo-600" href="#features">
                Features
              </a>
              <a className="hover:text-indigo-600" href="#how">
                How it works
              </a>
              <a
                href="/login"
                className="ml-4 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-white font-medium shadow hover:bg-indigo-700"
              >
                Login
              </a>
            </nav>

            <div className="md:hidden">
              <a
                href="/login"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-1.5 text-white text-sm"
              >
                Login
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="pt-12 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M3 12h18"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              AI-Powered • Personalized
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight mb-6">
              Revolutionize learning with{" "}
              <span className="text-indigo-600">AI-driven revision plans</span>
            </h1>

            <p className="text-slate-600 text-lg max-w-2xl mb-8">
              Intelligent Revision Plan analyzes tests and micro-tests to build
              personalized revision schedules, give teachers batch-level
              guidance, help counselors find students who need support, and keep
              parents informed — all in one unified platform.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-lg font-medium transition"
              >
                Get started — Free demo
                <svg
                  className="w-4 h-4 opacity-90"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <a
                href="#analytics"
                className="inline-flex items-center gap-2 text-indigo-600 px-4 py-3 rounded-lg border border-indigo-100 hover:bg-indigo-50 transition"
              >
                See analytics
              </a>
            </div>

            <div className="mt-8 flex items-center gap-6 text-xs text-slate-500">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-700 font-semibold">
                  P
                </div>
                <div>
                  <div className="text-slate-800 font-medium">
                    Featured on Product Hunt
                  </div>
                  <div>Trusted by modern schools</div>
                </div>
              </div>

              <div className="h-6 w-px bg-slate-200" />

              <div className="flex items-center gap-3">
                <div className="text-slate-700 font-medium">1000+</div>
                <div className="text-slate-500">students trained</div>
              </div>
            </div>
          </div>

          {/* HERO IMAGE (full width card) */}
          <div className="w-full">
            <div className="rounded-2xl shadow-2xl overflow-hidden border border-slate-100 bg-white">
              {/* Replace with your screenshot in public/images/hero-dashboard.png */}
              <Image
                src={Demopage}
                alt="Dashboard preview"
                width={1200}
                height={700}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ANALYTICS SECTION */}
      <section id="analytics" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="text-sm font-medium text-indigo-600 inline-block mb-2">
              Analytics
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Get detailed analytics for every student
            </h2>
            <p className="text-slate-600">
              Visualize growth, identify learning gaps, and make data-driven
              decisions to enhance outcomes for every learner.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100 shadow-sm">
              <section className="w-full py-10">
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* === Exam Performance === */}
                  <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition">
                    <h3 className="text-sm font-medium text-slate-700 mb-3">
                      Exam Performance
                    </h3>
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                      <img
                        src="/images/img1.png"
                        alt="Exam performance chart"
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </div>

                  {/* === Subject Performance === */}
                  <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition">
                    <h3 className="text-sm font-medium text-slate-700 mb-3">
                      Subject Performance
                    </h3>
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                      <img
                        src="/images/subject-performance.png"
                        alt="Subject performance chart"
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </div>

                  {/* === SWOT Analysis === */}
                  <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition">
                    <h3 className="text-sm font-medium text-slate-700 mb-3">
                      SWOT Analysis
                    </h3>
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                      <img
                        src="/images/swot-analysis.png"
                        alt="SWOT analysis chart"
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </div>

                  {/* === Performance Comparison === */}
                  <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition">
                    <h3 className="text-sm font-medium text-slate-700 mb-3">
                      Performance Comparison
                    </h3>
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                      <img
                        src="/images/performance-comparison.png"
                        alt="Performance comparison chart"
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-3">
                  Actionable insights
                </h3>
                <p className="text-slate-600 mb-4">
                  AI detects weak topics, suggests micro-tests, and builds
                  focused revision schedules — all automated.
                </p>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-8 h-8 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center font-semibold">
                      1
                    </div>
                    <div>
                      <div className="font-medium text-slate-800">
                        Weak topic detection
                      </div>
                      <div className="text-slate-600 text-sm">
                        Pinpoints low-retention concepts via last 3 tests.
                      </div>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-8 h-8 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center font-semibold">
                      2
                    </div>
                    <div>
                      <div className="font-medium text-slate-800">
                        Micro-tests
                      </div>
                      <div className="text-slate-600 text-sm">
                        Alternate-day quick tests refine accuracy on topics that
                        matter.
                      </div>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-8 h-8 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center font-semibold">
                      3
                    </div>
                    <div>
                      <div className="font-medium text-slate-800">
                        Counselor signals
                      </div>
                      <div className="text-slate-600 text-sm">
                        Emotion & attendance correlations help identify students
                        who need support.
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-indigo-600 text-white px-5 py-3 rounded-lg shadow hover:bg-indigo-700 transition"
                >
                  Request a Demo
                </button>
                <a
                  href="#features"
                  className="inline-flex items-center gap-2 border border-indigo-100 px-4 py-2 rounded-lg text-indigo-600"
                >
                  Explore features
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-sm font-medium text-indigo-600">
              Core features
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mt-3">
              Built for schools, teachers & parents
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Multiple logins",
                desc: "Students, Teachers, Parents, Counselors, Admins",
                accent: "user",
              },
              {
                title: "AI Performance Analytics",
                desc: "Charts, trends, and batch insights",
                accent: "chart",
              },
              {
                title: "Smart Revision Plans",
                desc: "Personalized schedules & micro-tests",
                accent: "plan",
              },
              {
                title: "Easy Uploads",
                desc: "Upload question papers & answer sheets",
                accent: "upload",
              },
              {
                title: "Counselor Support",
                desc: "Emotion & attendance correlations",
                accent: "heart",
              },
              {
                title: "PDF Reports",
                desc: "Downloadable, teacher/parent friendly reports",
                accent: "file",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="relative bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition"
              >
                <div className="absolute -top-6 right-6 bg-indigo-50 rounded-full w-12 h-12 flex items-center justify-center text-indigo-600 font-semibold">
                  {i + 1}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {f.title}
                </h3>
                <p className="text-slate-600 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-20 bg-indigo-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            How it works
          </h2>
          <p className="text-slate-600 mb-10">
            Simple 3-step flow to get your students on a smarter revision
            journey.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
              <div className="text-indigo-600 font-semibold mb-3">
                1. Upload
              </div>
              <div className="text-slate-800 font-semibold mb-2">
                Add question papers & answers
              </div>
              <div className="text-slate-600 text-sm">
                Upload PDF or CSV, map student answers and tests.
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
              <div className="text-indigo-600 font-semibold mb-3">
                2. Analyze
              </div>
              <div className="text-slate-800 font-semibold mb-2">
                AI analyzes patterns
              </div>
              <div className="text-slate-600 text-sm">
                Find weak topics, common errors and batch trends.
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
              <div className="text-indigo-600 font-semibold mb-3">3. Act</div>
              <div className="text-slate-800 font-semibold mb-2">
                Generate revision plans
              </div>
              <div className="text-slate-600 text-sm">
                Share with students, parents and counselors instantly.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FOOTER */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              Ready to try IRP?
            </h3>
            <p className="text-slate-600">
              Book a demo or sign up and bring AI into your classroom workflow.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowModal(true)}
              className="bg-indigo-600 text-white px-5 py-3 rounded-lg shadow hover:bg-indigo-700 transition"
            >
              Request a Demo
            </button>
            <a
              href="/contact"
              className="px-5 py-3 rounded-lg border border-slate-200"
            >
              Contact sales
            </a>
          </div>
        </div>
      </section>
      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl max-w-3xl w-full overflow-hidden"
            >
              <div className="flex justify-between items-center border-b border-slate-100 px-6 py-4">
                <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <Calendar size={18} className="text-indigo-600" />
                  Book a Demo
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid md:grid-cols-2">
                {/* Left Panel */}
                <div className="p-6 border-r border-slate-100">
                  <h3 className="font-semibold text-slate-900 mb-1">
                    IRP Product Demo
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    30-minute walkthrough of the Intelligent Revision Plan
                    dashboard.
                  </p>

                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                    <Clock size={16} /> 30 min session
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                    <Mail size={16} /> Web conferencing link shared upon
                    confirmation.
                  </div>

                  <p className="text-xs text-slate-400 mt-6">
                    Your privacy is protected. Details used only for scheduling.
                  </p>
                </div>

                {/* Right Panel */}
                <div className="p-6 bg-slate-50">
                  <h4 className="font-semibold text-slate-900 mb-3">
                    Select a Date & Time
                  </h4>

                  <div className="grid grid-cols-7 gap-2 mb-6">
                    {dates.map((day) => (
                      <button
                        key={day}
                        onClick={() => setSelectedDate(day as number)}
                        className={`rounded-lg py-2 text-sm font-medium ${
                          selectedDate === day
                            ? "bg-indigo-600 text-white"
                            : "bg-white text-slate-700 border border-slate-200 hover:bg-indigo-50"
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {times.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`rounded-lg py-2 text-sm font-medium ${
                          selectedTime === time
                            ? "bg-indigo-600 text-white"
                            : "bg-white text-slate-700 border border-slate-200 hover:bg-indigo-50"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 text-center">
                    <button
                      onClick={() => {
                        alert(
                          `Demo booked for ${selectedDate || "N/A"} Nov at ${
                            selectedTime || "N/A"
                          }`
                        );
                        setShowModal(false);
                      }}
                      className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="bg-white py-8 text-center text-sm text-slate-500 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          © {new Date().getFullYear()} Intelligent Revision Plan — Built by
          CreativeEdge.
        </div>
      </footer>
    </div>
  );
}
