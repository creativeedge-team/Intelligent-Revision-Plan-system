"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-white text-slate-800 overflow-x-hidden">
     

      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 md:px-16 lg:px-20 py-12 md:py-20 text-center lg:text-left gap-10">
        <motion.div
          className="lg:w-1/2 space-y-5"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-snug">
            Learn Smart, <span className="text-indigo-600">Revise Smarter</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-lg mx-auto lg:mx-0">
            Empowering Students, Teachers, Parents, and Counselors through AI-driven insights and real-time performance tracking.
          </p>
          <div className="flex justify-center lg:justify-start gap-3 sm:gap-4 flex-wrap">
            <Link
              href="/login"
              className="bg-indigo-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-indigo-700"
            >
              Get Started
            </Link>
            <Link
              href="#features"
              className="border border-indigo-600 text-indigo-600 px-5 py-3 rounded-lg font-medium hover:bg-indigo-50"
            >
              Explore Features
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="lg:w-1/2 flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <img
            src="https://cdn.elearningindustry.com/wp-content/uploads/2024/03/Navigating-The-Future-The-Rise-Of-Hybrid-Learning-In-The-Age-Of-AI.jpg"
            alt="Dashboard Preview"
            className="w-64 sm:w-80 md:w-96 drop-shadow-xl"
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 sm:px-10 md:px-16 lg:px-20 py-14 bg-white">
        <motion.h3
          className="text-2xl sm:text-3xl font-bold text-center mb-12 text-slate-900"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          One Platform, Four Perspectives
        </motion.h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Student Dashboard",
              desc: "Track progress, take AI-driven tests, and improve weak topics with smart revision plans.",
              icon: "🎓",
            },
            {
              title: "Teacher Dashboard",
              desc: "Analyze class performance, assign focus topics, and monitor improvement across batches.",
              icon: "🧑‍🏫",
            },
            {
              title: "Parent Dashboard",
              desc: "View consistency reports, performance alerts, and AI-recommended study plans.",
              icon: "👨‍👩‍👧",
            },
            {
              title: "Counselor Panel",
              desc: "Access detailed student insights, identify weak areas, and support mentorship.",
              icon: "🧠",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              className="bg-indigo-50 hover:bg-indigo-100 rounded-xl p-6 text-center shadow-sm transition-all"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h4 className="font-semibold text-base sm:text-lg mb-2">{f.title}</h4>
              <p className="text-sm text-slate-600">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        id="about"
        className="px-6 md:px-20 py-16 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-center rounded-t-3xl shadow-lg"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-2xl sm:text-3xl font-bold mb-4">AI-Driven Learning Experience</h3>
        <p className="max-w-2xl mx-auto text-indigo-100 text-sm sm:text-base mb-6">
          Intelligent Revision Plan uses test data and AI to create personalized schedules, identify weak areas, and predict performance — helping every student reach their potential.
        </p>
        <Link
          href="/login"
          className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold shadow hover:bg-indigo-50 text-sm sm:text-base"
        >
          Get Started Now
        </Link>
      </motion.section>

      {/* Footer */}
      <footer className="text-center text-xs sm:text-sm text-slate-500 py-6 bg-white">
        © 2025 Intelligent Revision Plan — Powered by AI | Designed by Creative Edge
      </footer>
    </main>
  );
}
