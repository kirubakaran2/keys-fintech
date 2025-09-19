"use client";
import Link from 'next/link';
import { useState, useEffect } from "react";
import {
  FaShieldAlt,
  FaHeart,
  FaChartLine,FaDotCircle,FaExchangeAlt,
  FaRegLifeRing,FaHandshake,FaFileInvoiceDollar,
  FaShapes,
  FaPhoneAlt,
  FaCalendarCheck,
  FaLightbulb,
  FaCalendar,
  FaUser,
  FaCogs,
  FaUsers,
  FaLock,
  FaHome,
  FaRunning,
  FaGem,
  FaFileAlt,
  FaCheckCircle,
  FaStar,
  FaAward,
  FaDollarSign,
  FaRegSmileBeam,
  FaMoneyBillAlt,
  FaHandHoldingHeart,
  FaBalanceScale
} from "react-icons/fa";

const QuoteForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    age: "",
    coverage: "₹10,00,000",
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // ← loading state

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  interface FormDataInterface {
    email: string;
    age: string;
    coverage: string;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true); // ← start loading

    const { email, age, coverage } = formData;
    const htmlBody = `
      <h2>Instant Quote Request</h2>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Age:</strong> ${age}</p>
      <p><strong>Coverage Amount:</strong> ${coverage}</p>
    `;

    try {
      const res = await fetch("/api/sendemail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "christy@christel.in",
          subject: `Quote Request from ${email}`,
          html: htmlBody,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server error ${res.status}: ${text}`);
      }

      const data = await res.json();
      console.log("Email sent:", data);
      alert("Quote request submitted! We will contact you soon.");

      setFormData({ email: "", age: "", coverage: "₹10,00,000" });
    } catch (err: any) {
      console.error("Error sending email:", err);
      alert("Failed to submit. Please try again later.");
    } finally {
      setIsLoading(false); // ← stop loading
    }
  };

  return (
    <div
      className={`transform transition-all duration-1000 ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
      } bg-white/15 backdrop-blur-xl p-8 rounded-3xl border border-white/30 mt-8 shadow-2xl hover:shadow-3xl hover:bg-white/20 transition-all duration-500`}
    >
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mr-4 shadow-lg">
          <FaShieldAlt className="text-white w-6 h-6" />
        </div>
        <h3 className="text-white text-2xl font-bold">Get Your Instant Quote</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="group">
          <label className="block text-white/90 mb-3 font-semibold text-sm uppercase tracking-wide">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your Email-id"
            className="w-full p-4 border border-white/30 rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/30 transition-all duration-300 group-hover:border-white/50"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            required
            disabled={isLoading}
          />
        </div>

        <div className="group">
          <label className="block text-white/90 mb-3 font-semibold text-sm uppercase tracking-wide">
            Age
          </label>
          <input
            type="number"
            placeholder="Enter your age"
            className="w-full p-4 border border-white/30 rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/30 transition-all duration-300 group-hover:border-white/50"
            value={formData.age}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, age: e.target.value }))
            }
            required
            disabled={isLoading}
          />
        </div>

        <div className="group">
          <label className="block text-white/90 mb-3 font-semibold text-sm uppercase tracking-wide">
            Coverage Amount
          </label>
          <select
            className="w-full text-black/80 p-4 border border-white/80 rounded-xl bg-white/10 backdrop-blur-sm text-white focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/30 transition-all duration-300 group-hover:border-white/50"
            value={formData.coverage}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, coverage: e.target.value }))
            }
            disabled={isLoading}
          >
            <option>₹10,00,000</option>
            <option>₹25,00,000</option>
            <option>₹50,00,000</option>
            <option>₹1,00,00,000</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 text-white font-bold py-4 px-6 rounded-xl hover:shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300 transform relative overflow-hidden group ${
            isLoading ? "opacity-70 cursor-not-allowed" : "hover:-translate-y-2 hover:scale-105"
          }`}
        >
          {isLoading ? (
            <span className="relative flex items-center justify-center gap-2">
              {/* You can replace this with any spinner icon */}
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Sending…
            </span>
          ) : (
            <span className="relative flex items-center justify-center gap-2">
              <FaChartLine className="mr-2 w-5 h-5" />
              Get My Quote Now
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

import { ReactNode } from "react";
const AnimatedCard = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  index,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: string;
  index: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`card-${index}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [delay, index]);

  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case "left":
          return "translateX(-100px)";
        case "right":
          return "translateX(100px)";
        case "down":
          return "translateY(-50px)";
        default:
          return "translateY(50px)";
      }
    }
    return "translate(0)";
  };

  return (
    <div
      id={`card-${index}`}
      className={`transform transition-all duration-1000 ease-out ${className}`}
      style={{
        transform: getTransform(),
        opacity: isVisible ? 1 : 0,
      }}
    >
      {children}
    </div>
  );
};

const FloatingElement = ({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay: number;
}) => (
  <div
    className="floating-element"
    style={{
      animationDelay: `${delay}s`,
      animation: "float-gentle 8s ease-in-out infinite",
    }}
  >
    {children}
  </div>
);

const TypewriterText = ({
  text,
  delay = 0,
}: {
  text: string;
  delay?: number;
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }
    }, delay + currentIndex * 50);

    return () => clearTimeout(timer);
  }, [currentIndex, text, delay]);

  return (
    <span>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default function Home() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [selectedBenefit, setSelectedBenefit] = useState(0);
  const [selectedRequirement, setSelectedRequirement] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setHeroVisible(true), 200);
    const timer2 = setTimeout(() => setStatsVisible(true), 1500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden bg-gray-900 text-white">
      <style jsx>{`
        @keyframes float-gentle {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-10px) rotate(1deg);
          }
          66% {
            transform: translateY(-5px) rotate(-1deg);
          }
        }
        .floating-element {
          animation: float-gentle 6s ease-in-out infinite;
        }
      `}</style>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center relative z-10 pt-2"
        style={{
          backgroundImage:
            "url(https://img.freepik.com/free-vector/gradient-blur-pink-blue-abstract-background_53876-117324.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-blue-900/30 to-pink-900/40 z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-0" />

        <div className="max-w-7xl mx-auto px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Content */}
            <div
              className={`transform transition-all duration-1200 ease-out ${
                heroVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-20 opacity-0"
              }`}
            >
              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black mb-6 leading-tight text-white drop-shadow-2xl mt-2">
                Unit Linked Insurance
                <br />
                <span className="text-black drop-shadow-lg">Plan</span>
              </h1>
              <p
                className={`text-xl text-white/95 mb-10 max-w-lg leading-relaxed drop-shadow-lg transform transition-all duration-1000 ${
                  heroVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: "400ms" }}
              >
                "Combine insurance with the investment of your choice and enjoy guaranteed returns at the end of your policy term."
              </p>
              <div
                className={`flex flex-col sm:flex-row gap-6 mb-10 transform transition-all duration-1000 ${
                  heroVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: "600ms" }}
              >
                <a
                  href="#quote"
                  className="group bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 text-white font-bold px-10 py-5 rounded-2xl shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/60 hover:-translate-y-3 hover:scale-105 transition-all duration-300 text-center relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative flex items-center justify-center">
                    <FaChartLine className="mr-3 w-5 h-5" />
                    Get Instant Quote
                  </span>
                </a>
                <a
                  href="/contact"
                  className="group border-2 border-white/60 backdrop-blur-sm text-white font-bold px-10 py-5 rounded-2xl hover:bg-white hover:text-gray-900 hover:-translate-y-3 hover:scale-105 transition-all duration-300 text-center relative overflow-hidden"
                >
                  <span className="flex items-center justify-center">
                    <FaUsers className="mr-3 w-5 h-5" />
                    Talk to Expert
                  </span>
                </a>
              </div>
              <QuoteForm />
            </div>

            {/* Right Side with Moving Ball Animation */}
            <div
              className={`transform transition-all duration-1200 ease-out ${
                heroVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-20 opacity-0"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <div className="relative z-10 transform hover:scale-105 transition-all duration-700">
                <div className="relative">
                  <img
                    src="https://img.freepik.com/free-vector/individuals-pool-their-premiums-together-insure-against-risk-peer-peer-insurance-p2p-collaborative-risk-new-social-insurance-concept-pinkish-coral-bluevector-isolated-illustration_335657-1335.jpg?t=st=1748582111~exp=1748585711~hmac=06dba9e55cbec3ef85e77eb7289f4f59b4d020c80112f5c443ebea69c332f05d&w=1380"
                    alt="Family Protection"
                    className="w-full max-w-2xl mx-auto rounded-3xl shadow-2xl shadow-emerald-500/20 border-4 border-white/30 backdrop-blur-sm"
                  />

                  {/* Moving Ball Element */}
                  <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full opacity-80 floating-element shadow-2xl"></div>

                  {/* Floating Stats */}
                  <FloatingElement delay={1}>
                    <div
                      className={`absolute -top-16 -left-16 transform transition-all duration-1000 ${
                        statsVisible
                          ? "scale-100 opacity-100"
                          : "scale-0 opacity-0"
                      }`}
                    >
                      <div className="bg-white/15 backdrop-blur-xl p-6 rounded-2xl border border-white/30 shadow-2xl hover:bg-white/20 transition-all duration-300">
                        <div className="text-emerald-400 font-black text-3xl flex items-center">
                          <FaDollarSign className="mr-2 w-8 h-8" />
                          ₹10L+
                        </div>
                        <div className="text-white/90 text-sm font-semibold">
                          Maximum Coverage
                        </div>
                      </div>
                    </div>
                  </FloatingElement>

                  <FloatingElement delay={2}>
                    <div
                      className={`absolute -bottom-16 -right-16 transform transition-all duration-1000 ${
                        statsVisible
                          ? "scale-100 opacity-100"
                          : "scale-0 opacity-0"
                      }`}
                      style={{ transitionDelay: "200ms" }}
                    >
                      <div className="bg-white/15 backdrop-blur-xl p-6 rounded-2xl border border-white/30 shadow-2xl hover:bg-white/20 transition-all duration-300">
                        <div className="text-cyan-400 font-black text-3xl flex items-center">
                          <FaStar className="mr-2 w-8 h-8" />
                          4.9/5
                        </div>
                        <div className="text-white/90 text-sm font-semibold">
                          Customer Rating
                        </div>
                      </div>
                    </div>
                  </FloatingElement>

                  <FloatingElement delay={3}>
                    <div
                      className={`absolute top-1/2 -left-20 transform transition-all duration-1000 ${
                        statsVisible
                          ? "scale-100 opacity-100"
                          : "scale-0 opacity-0"
                      }`}
                      style={{ transitionDelay: "400ms" }}
                    >
                      <div className="bg-white/15 backdrop-blur-xl p-4 rounded-2xl border border-white/30 shadow-2xl hover:bg-white/20 transition-all duration-300">
                        <div className="text-pink-400 font-black text-2xl flex items-center">
                          <FaAward className="mr-2 w-6 h-6" />
                          99.2%
                        </div>
                        <div className="text-white/90 text-xs font-semibold">
                          Claim Success
                        </div>
                      </div>
                    </div>
                  </FloatingElement>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Life Insurance Section */}
<section id="ulip" className="bg-gradient-to-br from-indigo-50 to-white relative z-10 text-gray-900 py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Header Section */}
    <div className="text-center mb-16">
      <span className="inline-block bg-green-100 text-green-600 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wide mb-4">
        ULIP
      </span>
      <h2 className="text-3xl lg:text-4xl font-semibold mb-4 text-gray-900">
        Smart Investing with <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">Unit Linked Insurance Plans</span>
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Combine life insurance with market-linked investments for long-term wealth creation
      </p>
    </div>
<div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg border border-gray-100">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Section - What is ULIP */}
        <div className="flex-1">
          <div className="flex items-center mb-4">
            <div className="bg-green-100 p-2 rounded-lg mr-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800">What is a ULIP?</h2>
          </div>
          <p className="text-gray-600 pl-14">
            A Unit Linked Insurance Plan (ULIP) is an advanced financial product that combines life insurance with investment opportunities. When you pay premiums, a portion goes toward life coverage while the remainder gets invested in funds of your choice—equity for growth, debt for stability, or balanced funds for moderate risk—based on your financial goals and risk tolerance.
          </p>
        </div>

        {/* Right Section - Who Should Consider */}
        <div className="flex-1">
          <div className="flex items-center mb-4">
            <div className="bg-green-100 p-2 rounded-lg mr-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Who Should Consider a ULIP?</h2>
          </div>
          <p className="text-gray-600 pl-14">
            ULIPs are ideal for investors seeking long-term wealth creation alongside life protection. These plans offer flexibility to switch between funds as market conditions change, but require careful consideration since higher-risk options (like equity funds) may yield greater returns while lower-risk choices (like debt funds) provide stability. They're particularly suitable for those with a 5+ year investment horizon.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
      {/* Benefits Section with Numbered Points */}
<section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
  {/* Decorative elements */}
  <div className="absolute top-0 left-0 w-full h-full opacity-10">
    <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-blue-300 blur-3xl"></div>
    <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-indigo-300 blur-3xl"></div>
  </div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    {/* Header Section */}
    <div className="text-center mb-16">
      <span className="inline-block bg-green-100 text-green-600 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wide mb-4">
        ULIP Guide
      </span>
      <h2 className="text-3xl lg:text-4xl font-extrabold mb-4 text-gray-900">
Smart <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-500 to-green-600">Investment Protection</span>
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Combining life insurance with market-linked investments for long-term growth
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      {/* Left Column - Traditional Insurance */}
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center mb-6">
          <div className="bg-green-100 p-3 rounded-xl mr-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Choosing Traditional Insurance</h3>
        </div>
        <p className="text-gray-700 mb-6">
          When selecting an insurance policy, traditional insurance remains a trusted and time-tested option. Unlike newer models such as digital or on-demand insurance, traditional plans offer consistent benefits and stability that many individuals rely on.
        </p>
        <img 
          src="https://img.freepik.com/free-vector/peer-peer-insurance-model-collaborative-consumption-policyholders-cooperation-p2p-digital-insurers-service-partners-sharing-liability-insurance_335657-2538.jpg?t=st=1748587401~exp=1748591001~hmac=2edc40c2ab5ec89076c7bba5b27f3a967e8d6ae6a10d5f615ce86b9309d0cef5&w=1380" 
          alt="Traditional Insurance" 
          className="w-full rounded-2xl shadow-md border border-gray-200"
        />
      </div>

      {/* Right Column - ULIP Considerations */}
      <div className="space-y-8">
        {/* Investment Type Card */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center mb-6">
            <div className="bg-green-100 p-3 rounded-xl mr-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">ULIP Key Considerations</h3>
          </div>

          {/* Investment Type */}
          <div className="mb-8">
            <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">1</span>
              Investment Type
            </h4>
            <p className="text-gray-700 mb-4">
              With ULIPs (Unit Linked Insurance Plans), policyholders must choose their preferred investment type. Options typically include:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <h5 className="font-bold text-blue-800 mb-2">Equity Funds</h5>
                <p className="text-sm text-gray-700">Higher risk with potential for higher returns</p>
              </div>
              <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                <h5 className="font-bold text-green-800 mb-2">Debt Funds</h5>
                <p className="text-sm text-gray-700">Lower risk with more stable returns</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                <h5 className="font-bold text-purple-800 mb-2">Balanced Funds</h5>
                <p className="text-sm text-gray-700">A mix of both equity and debt</p>
              </div>
            </div>
            <p className="text-gray-600 mt-4 text-sm">
              It's essential to assess personal risk tolerance before selecting an investment type, as this will directly impact the plan's returns.
            </p>
          </div>

          {/* Investment Goals */}
          <div className="mb-8">
            <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">2</span>
              Investment Goals
            </h4>
            <p className="text-gray-700 mb-4">
              Before purchasing a ULIP, clearly define your investment goals. Decide on the return intervals that align with your financial planning:
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">Short-term (3-5 years)</span>
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">Medium-term (5-10 years)</span>
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">Long-term (10+ years)</span>
            </div>
            <p className="text-gray-600 mt-4 text-sm">
              Setting these goals early helps avoid disruptions to future financial decisions and ensures the policy serves its intended purpose.
            </p>
          </div>

          {/* Life Cover */}
          <div>
            <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">3</span>
              Life Cover
            </h4>
            <p className="text-gray-900 mb-4">
              The amount of life cover chosen significantly influences the premium you'll pay. It's important to select a coverage amount that:
            </p>
            <ul className="space-y-3 mb-4">
              <li className="flex items-start text-gray-900">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Aligns with your family's financial needs in your absence</span>
              </li>
              <li className="flex items-start text-gray-900">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Fits comfortably within your budget to avoid missing premium payments</span>
              </li>
            </ul>
            <p className="text-gray-600 text-sm">
              A well-balanced life cover ensures financial security for your loved ones without putting strain on your monthly finances.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 rounded-3xl shadow-xl text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Invest Smartly?</h3>
          <p className="text-blue-100 mb-6">Get expert advice on choosing the right ULIP for your financial goals</p>
          <Link href="/contact">
          <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl">
            Get Personalized Quote
          </button>
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>
    </main>
  );
}
