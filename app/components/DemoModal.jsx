"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, Mail } from "lucide-react";

export default function DemoModal() {
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const dates = Array.from({ length: 15 }, (_, i) => i + 11); // Example dates 11–25
  const times = [
    "10:00 AM",
    "11:30 AM",
    "1:00 PM",
    "2:30 PM",
    "4:00 PM",
    "5:30 PM",
  ];

  return (
    <>
      {/* Request Demo Button */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-indigo-600 text-white px-5 py-3 rounded-lg shadow hover:bg-indigo-700 transition"
      >
        Request a Demo
      </button>

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
              {/* Header */}
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

              {/* Modal Body */}
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
                    Your privacy is protected. We only use your contact details
                    for scheduling and follow-up communication.
                  </p>
                </div>

                {/* Right Panel - Calendar */}
                <div className="p-6 bg-slate-50">
                  <h4 className="font-semibold text-slate-900 mb-3">
                    Select a Date & Time
                  </h4>

                  {/* Date Grid */}
                  <div className="grid grid-cols-7 gap-2 mb-6">
                    {dates.map((day) => (
                      <button
                        key={day}
                        onClick={() => setSelectedDate(day)}
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

                  {/* Time Slots */}
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

                  {/* Confirmation */}
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
    </>
  );
}
