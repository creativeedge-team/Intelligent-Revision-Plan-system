"use client";

import { motion } from "framer-motion";
import { Brain, Users, Target, BarChart3, Rocket } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="w-full bg-white">
      
      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-28 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight"
        >
          Empowering Students Through <span className="text-indigo-600">AI-Driven Learning</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-5 text-lg text-slate-600 max-w-3xl mx-auto"
        >
          The Intelligent Revision Plan (IRP) transforms raw test data into meaningful insights, 
          personalized revision plans, and student-first academic intelligence.
        </motion.p>
      </section>


      {/* WHO WE ARE */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Who We Are
          </h2>

          <p className="text-slate-600 text-center max-w-4xl mx-auto mb-12">
            IRP is built by educators and technologists from CreativeEdge, united with one mission:
            helping every student understand their strengths, fix their weaknesses, and grow with clarity.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Brain className="text-indigo-600" size={30} />,
                title: "AI-Powered Engine",
                text: "Our AI analyzes tests, patterns, accuracy, and learning gaps with precision.",
              },
              {
                icon: <Users className="text-indigo-600" size={30} />,
                title: "Built for Students",
                text: "We help students get clarity — with progress tracking, micro-tests, and revision plans.",
              },
              {
                icon: <Target className="text-indigo-600" size={30} />,
                title: "Trusted by Educators",
                text: "Teachers and institutes use IRP to optimize teaching and improve results.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-xl shadow-sm border text-center"
              >
                <div className="flex justify-center mb-3">{item.icon}</div>
                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="text-sm mt-2 text-slate-600">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* OUR MISSION */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Our Mission
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Students today struggle with unstructured learning. IRP brings clarity by analyzing performance,
              detecting learning gaps, and generating smart revision plans tailored to every student.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <BarChart3 className="text-indigo-600" />
                <p className="text-slate-600">
                  Improve student outcomes through data-driven insights.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Target className="text-indigo-600" />
                <p className="text-slate-600">
                  Help students focus on what truly matters.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Rocket className="text-indigo-600" />
                <p className="text-slate-600">
                  Support teachers with intelligent recommendations.
                </p>
              </div>
            </div>
          </motion.div>

          {/* IMAGE / GRAPHIC */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <img
              src="https://www.shutterstock.com/image-vector/3d-casual-teamwork-diverse-team-260nw-2320901243.jpg"
              alt="About IRP"
              className="rounded-xl shadow-lg w-full"
            />
          </motion.div>
        </div>
      </section>


      {/* OUR VALUES */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Our Values
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Accuracy",
                text: "We believe precision matters. Our AI engine provides highly accurate insights.",
              },
              {
                title: "Transparency",
                text: "Clear reports that help both students and parents understand progress.",
              },
              {
                title: "Student-First Design",
                text: "Every feature is built to guide, motivate, and support the learner.",
              },
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-xl shadow-sm border"
              >
                <h3 className="text-lg font-semibold text-slate-900">{value.title}</h3>
                <p className="text-sm mt-2 text-slate-600">{value.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Ready to Experience IRP?
        </h2>
        <p className="text-slate-600 mb-6">
          Book a live demo and see how IRP transforms learning.
        </p>
        <a
          href="/"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Request a Demo
        </a>
      </section>
    </div>
  );
}
