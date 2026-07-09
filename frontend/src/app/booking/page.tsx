"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Calendar, Clock, User, Mail, MessageSquare, CheckCircle2 } from "lucide-react";

const timeSlots = ["9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", "3:00 PM", "4:30 PM"];

export default function BookingPage() {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No backend yet — this just simulates a successful booking for now.
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-chocolate-50/50">
      <Navbar />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sage-50 border border-sage-100 rounded-full mb-6">
              <Calendar className="w-4 h-4 text-sage-600" />
              <span className="text-sm font-medium text-sage-600">Book a Consultation</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-chocolate-900 mb-4">
              Let's Talk About Your{" "}
              <span className="text-sage-600">Nutrition Goals</span>
            </h1>
            <p className="text-lg text-chocolate-400 max-w-xl mx-auto">
              Schedule a free initial consultation with one of our expert dietitians.
            </p>
          </div>

          {submitted ? (
            /* Success state */
            <div className="bg-white rounded-3xl border border-chocolate-100 p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-sage-100 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-8 h-8 text-sage-600" />
              </div>
              <h2 className="text-xl font-bold text-chocolate-900 mb-2">
                Request Sent!
              </h2>
              <p className="text-chocolate-400">
                We'll confirm your appointment by email shortly.
              </p>
            </div>
          ) : (
            /* Booking form */
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl border border-chocolate-100 p-8 lg:p-10 space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-chocolate-400 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-chocolate-400" />
                    <input
                      required
                      type="text"
                      placeholder="Your name"
                      className="w-full pl-10 pr-4 py-3 bg-chocolate-50 border border-chocolate-100 rounded-xl text-sm text-chocolate-900 placeholder:text-chocolate-400 focus:outline-none focus:border-sage-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-chocolate-400 mb-1.5">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-chocolate-400" />
                    <input
                      required
                      type="email"
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-3 bg-chocolate-50 border border-chocolate-100 rounded-xl text-sm text-chocolate-900 placeholder:text-chocolate-400 focus:outline-none focus:border-sage-400"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-chocolate-400 mb-1.5">
                  Preferred Date
                </label>
                <input
                  required
                  type="date"
                  className="w-full px-4 py-3 bg-chocolate-50 border border-chocolate-100 rounded-xl text-sm text-chocolate-900 focus:outline-none focus:border-sage-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-chocolate-400 mb-2">
                  Preferred Time
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        selectedSlot === slot
                          ? "bg-chocolate-700 text-white"
                          : "bg-chocolate-50 text-chocolate-600 border border-chocolate-100 hover:border-sage-400"
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-chocolate-400 mb-1.5">
                  What would you like to discuss?
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-chocolate-400" />
                  <textarea
                    rows={4}
                    placeholder="Tell us a bit about your goals..."
                    className="w-full pl-10 pr-4 py-3 bg-chocolate-50 border border-chocolate-100 rounded-xl text-sm text-chocolate-900 placeholder:text-chocolate-400 focus:outline-none focus:border-sage-400 resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-chocolate-700 text-white font-semibold rounded-xl hover:bg-chocolate-900 transition-colors"
              >
                Confirm Booking
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}