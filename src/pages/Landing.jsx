import { useState } from "react";
import Navbar from "./../components/Navbar";
import { Link } from "react-router-dom";
import JeepTricyIcon from "../assets/jeep-tricy.png";
import CoinsIcon from "../assets/coins.png";
import DriverIcon from "../assets/driver.png";
import LtfrbIcon from "../assets/LTFRB_Seal.png";

function Landing() {
  return (
    <div className="flex flex-col items-center justify-center w-full content">
      <Navbar />
      <header className="w-2/3 py-20">
        <div className="flex flex-col md:flex-row items-center justify-center gap-2">
          <div className="flex flex-col text-center text-5xl md:text-7xl font-bold">
            <span className="text-[#4D4D4D]">Manage your fares</span>
            <span className="text-[#4CAF4F]">Anytime, Anywhere</span>
          </div>
          <img
            src={JeepTricyIcon}
            alt="landing illustration"
            className="w-full md:w-7/12"
          />
        </div>
      </header>
      <section className="px-6 md:px-10 py-16 md:py-20 bg-gradient-to-br from-[#4CAF4F] to-[#45a049] w-full flex flex-col items-center justify-center gap-8">
        <div className="text-center space-y-4 max-w-3xl">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Where are you headed,
            <span className="block text-white/90 font-medium">ka-byahe?</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
            Get instant, accurate fare calculations for your Philippine commute
          </p>
        </div>

        <form className="w-full max-w-md bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl border border-white/20">
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="pickup-point"
                className="block text-sm font-semibold text-white"
              >
                Pickup Location
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <div className="w-3 h-3 bg-[#4CAF4F] rounded-full ring-2 ring-white shadow-sm"></div>
                </div>
                <input
                  type="text"
                  id="pickup-point"
                  placeholder="Enter your starting point"
                  className="w-full pl-10 pr-4 py-4 bg-white border-0 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white/50 focus:outline-none transition-all duration-200 shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="drop-off-point"
                className="block text-sm font-semibold text-white"
              >
                Drop-off Location
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <div className="w-3 h-3 bg-[#fc1e65] rounded-full ring-2 ring-white shadow-sm"></div>
                </div>
                <input
                  type="text"
                  id="drop-off-point"
                  placeholder="Enter your destination"
                  className="w-full pl-10 pr-4 py-4 bg-white border-0 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white/50 focus:outline-none transition-all duration-200 shadow-sm"
                />
              </div>
            </div>

            <Link
              className="w-full bg-white text-[#4CAF4F] hover:bg-gray-50 focus:ring-4 focus:ring-white/30 font-semibold rounded-xl text-base py-4 px-6 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
              to="/check-fare"
            >
              <span>Calculate My Fare</span>
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </form>

        <div className="flex flex-wrap justify-center gap-4 text-white/70 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white/50 rounded-full"></div>
            <span>Estimate Fare</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white/50 rounded-full"></div>
            <span>Determine Travel Distance</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white/50 rounded-full"></div>
            <span>LTFRB Compliant</span>
          </div>
        </div>
      </section>
      {/* Plan and Manage Section */}
      <section className="bg-gradient-to-br from-[#f8f8f8] to-[#f0f0f0] py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6 text-center lg:text-left order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2d2d2d] leading-tight">
                Plan and manage your fares
                <span className="text-[#4CAF4F]"> ahead of time</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Easily calculate and prepare your transportation costs before
                your trip, helping you budget smarter and avoid surprises.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-[#4CAF4F] rounded-full"></div>
                  <span className="text-sm font-medium">
                    Instant Calculations
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-[#4CAF4F] rounded-full"></div>
                  <span className="text-sm font-medium">Budget Planning</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center order-1 lg:order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-[#4CAF4F]/10 rounded-full blur-3xl transform scale-110"></div>
                <img
                  src={CoinsIcon}
                  alt="Plan your fares with coins illustration"
                  className="relative w-64 md:w-80 lg:w-96 h-auto drop-shadow-lg transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Passenger Type Section */}
      <section className="bg-gradient-to-br from-[#fbfdfb] to-[#f5f7f5] py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="flex justify-center order-1">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-3xl transform scale-110"></div>
                <img
                  src={DriverIcon}
                  alt="Driver illustration for passenger types"
                  className="relative w-64 md:w-80 lg:w-96 h-auto drop-shadow-lg transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            <div className="space-y-6 text-center lg:text-left order-2">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2d2d2d] leading-tight">
                Pay fares based on
                <span className="text-[#4CAF4F]"> passenger type</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Ensure fair pricing by paying the correct fare according to your
                passenger category, whether Regular, Student, Senior Citizen, or
                PWD.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4 max-w-md mx-auto lg:mx-0">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-gray-200/50">
                  <div className="text-sm font-semibold text-[#4CAF4F]">
                    Regular
                  </div>
                  <div className="text-xs text-gray-600">Standard fare</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-gray-200/50">
                  <div className="text-sm font-semibold text-[#4CAF4F]">
                    Student
                  </div>
                  <div className="text-xs text-gray-600">20% discount</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-gray-200/50">
                  <div className="text-sm font-semibold text-[#4CAF4F]">
                    Senior Citizens
                  </div>
                  <div className="text-xs text-gray-600">20% discount</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-gray-200/50">
                  <div className="text-sm font-semibold text-[#4CAF4F]">
                    PWD
                  </div>
                  <div className="text-xs text-gray-600">20% discount</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LTFRB Compliance Section */}
      <section className="bg-gradient-to-br from-[#f8f8f8] to-[#f0f0f0] py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6 text-center lg:text-left order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2d2d2d] leading-tight">
                Compliant with
                <span className="text-[#4CAF4F]"> LTFRB fare matrix</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                All fares are aligned with the official LTFRB fare matrix,
                ensuring transparency and fairness for both passengers and
                drivers.
              </p>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 max-w-md mx-auto lg:mx-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#4CAF4F]/10 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-[#4CAF4F]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-[#2d2d2d]">
                      Official Rates
                    </div>
                    <div className="text-sm text-gray-600">
                      Updated regularly with LTFRB guidelines
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center order-1 lg:order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-[#4CAF4F]/10 rounded-full blur-3xl transform scale-110"></div>
                <img
                  src={LtfrbIcon}
                  alt="LTFRB logo for fare compliance"
                  className="relative w-64 md:w-80 lg:w-96 h-auto drop-shadow-lg transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full bg-gradient-to-br from-[#4CAF4F] to-[#45a049] text-white relative overflow-hidden">
  {/* Background Pattern */}
  <div className="absolute inset-0 opacity-5">
    <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
    <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
    <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white rounded-full blur-2xl"></div>
  </div>

  <div className="relative z-10 px-4 py-16 md:py-20 md:px-8">
    <div className="max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
          Ready to get started?
        </h3>
        <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Have questions about fares or need help planning your commute? We're here to help.
        </p>
      </div>

      {/* Contact Form */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 lg:p-10 border border-white/20 shadow-2xl">
          <form className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-semibold text-white"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="w-full px-4 py-4 bg-white/95 backdrop-blur-sm border-0 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white/50 focus:bg-white outline-none transition-all duration-200 shadow-sm"
                  placeholder="Enter your first name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-semibold text-white"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="w-full px-4 py-4 bg-white/95 backdrop-blur-sm border-0 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white/50 focus:bg-white outline-none transition-all duration-200 shadow-sm"
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>

            {/* Email and Subject */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-white">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-4 bg-white/95 backdrop-blur-sm border-0 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white/50 focus:bg-white outline-none transition-all duration-200 shadow-sm"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="block text-sm font-semibold text-white"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-4 bg-white/95 backdrop-blur-sm border-0 rounded-xl text-gray-500 focus:text-gray-900 focus:ring-2 focus:ring-white/50 focus:bg-white outline-none transition-all duration-200 shadow-sm"
                  required
                >
                  <option value="" className="text-gray-500">Select a topic</option>
                  <option value="fare-inquiry" className="text-gray-900">Fare Inquiry</option>
                  <option value="technical-support" className="text-gray-900">Technical Support</option>
                  <option value="feedback" className="text-gray-900">Feedback</option>
                  <option value="partnership" className="text-gray-900">Partnership</option>
                  <option value="other" className="text-gray-900">Other</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-white"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className="w-full px-4 py-4 bg-white/95 backdrop-blur-sm border-0 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white/50 focus:bg-white outline-none transition-all duration-200 resize-vertical shadow-sm"
                placeholder="Tell us how we can help you with your commute planning..."
                required
              />
            </div>

            {/* Submit Button */}
            <div className="text-center pt-4">
              <button
                type="submit"
                className="bg-white text-[#4CAF4F] hover:bg-gray-50 font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 focus:ring-4 focus:ring-white/30 outline-none shadow-lg hover:shadow-xl flex items-center justify-center gap-3 mx-auto group"
              >
                <span>Send Message</span>
                <svg className="w-5 h-5 flex-shrink-0" fill="#4CAF4F" xmlns="http://www.w3.org/2000/svg" id="mdi-send" viewBox="0 0 24 24"><path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" /></svg>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Quick Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 mb-12">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h4 className="font-semibold text-white">Email Support</h4>
          <p className="text-white/80 text-sm">support@farecalculator.ph</p>
        </div>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h4 className="font-semibold text-white">Response Time</h4>
          <p className="text-white/80 text-sm">Within 24 hours</p>
        </div>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h4 className="font-semibold text-white">Coverage</h4>
          <p className="text-white/80 text-sm">Philippines Nationwide</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="pt-8 border-t border-white/20 text-center space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/80 text-sm">
            &copy; 2025 Fare Calculator. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-white/80 text-sm">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="/about" className="hover:text-white transition-colors">About</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>
    </div>
  );
}

export default Landing;
