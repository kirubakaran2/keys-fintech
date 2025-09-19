"use client";
import Link from 'next/link';
import { useState, useEffect } from "react";
import {
  FaShieldAlt,FaCarCrash,FaUmbrellaBeach,FaUserAlt,FaRupeeSign,FaMoneyBillWave,FaPercentage,FaSlidersH,
  FaHeart,FaSearchDollar,
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
  FaRunning,FaPlusCircle,
  FaGem,
  FaFileAlt,
  FaCheckCircle,
  FaStar,
  FaAward,
  FaDollarSign,
  FaRegSmileBeam,
  FaMoneyBillAlt,
  FaHandHoldingHeart,FaUserGraduate,FaMedkit,
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
                Term Insurance
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
"Get the dual benefit of insurance and investment, with guaranteed returns at the end of your policy term."              </p>
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
                    src="https://img.freepik.com/free-psd/3d-rendering-banking-sales-background_23-2151052683.jpg?t=st=1748589810~exp=1748593410~hmac=3b9c6f6c63e86dc199f8db1a39f83a42fb87360292841e9f41c037863683949a&w=1380"
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
<section className="py-16 bg-gradient-to-br from-green-50 to-gray-50 relative overflow-hidden">
  {/* Decorative elements */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-emerald-200 blur-3xl"></div>
    <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-teal-200 blur-3xl"></div>
  </div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    {/* Header Section */}
    <div className="text-center mb-12">
      <span className="inline-block bg-emerald-100 text-emerald-700 px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide mb-4">
        Smart Protection
      </span>
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
        Who Needs <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Term Insurance?</span>
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Affordable life coverage tailored for every life stage
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Left Column - Target Groups */}
      <div className="space-y-6">
        {/* Young Adults */}
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-emerald-500 hover:shadow-lg transition-all">
          <div className="flex items-start">
            <div className="bg-emerald-100 p-3 rounded-lg mr-4 flex-shrink-0">
              <FaUserAlt className="text-emerald-600 text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Young Adults (20-30 years)</h3>
              <p className="text-gray-600">Lock in lowest premiums early while building your financial foundation. Starting young saves up to 60% on costs.</p>
            </div>
          </div>
        </div>

        {/* Newly Married */}
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-teal-500 hover:shadow-lg transition-all">
          <div className="flex items-start">
            <div className="bg-teal-100 p-3 rounded-lg mr-4 flex-shrink-0">
              <FaHeart className="text-teal-600 text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Newly Married Couples</h3>
              <p className="text-gray-600">Secure your partner's future with coverage 10-15x your annual income to maintain their lifestyle.</p>
            </div>
          </div>
        </div>

        {/* Parents */}
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500 hover:shadow-lg transition-all">
          <div className="flex items-start">
            <div className="bg-green-100 p-3 rounded-lg mr-4 flex-shrink-0">
              <FaUserGraduate className="text-green-600 text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Parents (40+ years)</h3>
              <p className="text-gray-600">Ensure children's education and family expenses are covered with term plans until retirement age.</p>
            </div>
          </div>
        </div>

        {/* Near Retirement */}
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-gray-500 hover:shadow-lg transition-all">
          <div className="flex items-start">
            <div className="bg-gray-100 p-3 rounded-lg mr-4 flex-shrink-0">
              <FaUmbrellaBeach className="text-gray-600 text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Pre-Retirees (55+ years)</h3>
              <p className="text-gray-600">Bridge the gap until pension kicks in and leave your spouse debt-free with final expense coverage.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Benefits */}
      <div className="space-y-6">
        {/* Benefits Card */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-lg mr-4">
              <FaShieldAlt className="text-white text-xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Why Term Insurance?</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: <FaRupeeSign className="text-emerald-500" />, text: "Premiums from ₹500/month" },
              { icon: <FaFileInvoiceDollar className="text-emerald-500" />, text: "Tax savings under 80C & 10(10D)" },
              { icon: <FaMedkit className="text-emerald-500" />, text: "Critical illness riders available" },
              { icon: <FaCarCrash className="text-emerald-500" />, text: "Accidental death benefit" },
              { icon: <FaPlusCircle className="text-emerald-500" />, text: "Cover up to ₹2 Crore" },
              { icon: <FaMoneyBillWave className="text-emerald-500" />, text: "Income replacement option" }
            ].map((item, index) => (
              <div key={index} className="flex items-start">
                <span className="mt-1 mr-3">{item.icon}</span>
                <span className="text-gray-700">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Image Card */}
        <div className="relative rounded-xl overflow-hidden shadow-md h-64">
          <img
            src="https://img.freepik.com/free-vector/family-benefit-abstract-concept-vector-illustration-family-tax-benefit-payment-per-child-help-with-raising-children-economic-support-insurance-agent-piggy-bank-money-abstract-metaphor_335657-3984.jpg"
            alt="Family Protection"
            className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
            <h3 className="text-xl font-bold text-white">Your Family's Safety Net</h3>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 rounded-xl shadow-md text-center">
          <h3 className="text-xl font-bold text-white mb-3">Get Covered Today</h3>
          <p className="text-emerald-100 mb-4">Instant quotes • No medicals • Paperless process</p>
          <button className="bg-white text-emerald-700 font-semibold py-2 px-6 rounded-lg hover:bg-gray-50 transition-colors">
            Calculate Premium
          </button>
        </div>
      </div>
    </div>
  </div>
</section>
      {/* Benefits Section with Numbered Points */}
    <section className="py-16 bg-gradient-to-br from-green-50 to-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-emerald-200 blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-teal-200 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <span className="inline-block bg-emerald-100 text-emerald-700 px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide mb-4">
            Term Insurance Advantages
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Term Insurance?</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Affordable protection that grows with your life's changing needs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column - Family Image */}
          <div className="relative rounded-xl overflow-hidden shadow-lg h-full min-h-[400px] lg:min-h-[500px]">
            <img
              src="https://img.freepik.com/free-vector/character-family-holding-insurance-illustration_53876-40419.jpg"
              alt="Family Protection"
              className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Your Family's Safety Net</h3>
                <p className="text-emerald-100">Financial security when they need it most</p>
              </div>
            </div>
          </div>

          {/* Middle Column - Benefits */}
          <div className="space-y-6">
            {/* Benefits Card */}
            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-emerald-500">
              <div className="flex items-center mb-6">
                <div className="bg-emerald-100 p-3 rounded-lg mr-4">
                  <FaShieldAlt className="text-emerald-600 text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Key Benefits</h3>
              </div>

              <div className="space-y-4">
                {[
                  { 
                    icon: <FaRupeeSign className="text-emerald-500" />, 
                    title: "Affordable Premium", 
                    text: "Budget-friendly coverage starting from ₹500/month. Early buyers save up to 60% on premiums." 
                  },
                  { 
                    icon: <FaMoneyBillWave className="text-emerald-500" />, 
                    title: "Cost-Effective", 
                    text: "Pay only for the years you need coverage, typically until major financial responsibilities end." 
                  },
                  { 
                    icon: <FaSlidersH className="text-emerald-500" />, 
                    title: "Customizable", 
                    text: "Adjust coverage, payment terms, and add riders like critical illness or accidental death." 
                  },
                  { 
                    icon: <FaFileInvoiceDollar className="text-emerald-500" />, 
                    title: "Tax Benefits", 
                    text: "Save tax under Section 80C (up to ₹1.5L) and tax-free payouts under Section 10(10D)." 
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <span className="mt-1 mr-3 text-lg">{item.icon}</span>
                    <div>
                      <h4 className="font-semibold text-gray-800">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* How to Choose Card */}
            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-teal-500">
              <div className="flex items-center mb-4">
                <div className="bg-teal-100 p-3 rounded-lg mr-4">
                  <FaSearchDollar className="text-teal-600 text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Choosing the Best Plan</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <FaCheckCircle className="text-emerald-500 mt-1 mr-2" />
                  <span className="text-gray-700">Buy early for lowest premiums</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-emerald-500 mt-1 mr-2" />
                  <span className="text-gray-700">Look for claim ratio above 95%</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-emerald-500 mt-1 mr-2" />
                  <span className="text-gray-700">Understand policy terms clearly</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Additional Content */}
          <div className="space-y-6">
            {/* Premium Reduction Card */}
            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-green-500">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <FaPercentage className="text-green-600 text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Reduce Your Premium</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-green-800 text-sm">Avoid Smoking</h4>
                  <p className="text-gray-600 text-xs">Can lower premium by 20-30%</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-green-800 text-sm">Buy Young</h4>
                  <p className="text-gray-600 text-xs">20s premiums are lowest</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-green-800 text-sm">Safe Occupation</h4>
                  <p className="text-gray-600 text-xs">Office jobs get better rates</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-green-800 text-sm">Women's Discount</h4>
                  <p className="text-gray-600 text-xs">Lower rates for female buyers</p>
                </div>
              </div>
            </div>

            {/* Employment Insurance Image */}
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <img
                src="https://img.freepik.com/free-vector/employment-insurance-abstract-concept_335657-3057.jpg"
                alt="Employment Insurance"
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                <h3 className="text-white font-medium text-sm">Income Protection</h3>
              </div>
            </div>

            {/* Buying Process Card */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 rounded-xl shadow-md text-white">
              <h3 className="text-xl font-bold mb-3">Buy with Keys Fintech in 3 Steps</h3>
              <div className="space-y-4 mb-4">
                <div className="flex items-start">
                  <div className="bg-white text-emerald-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">1</div>
                  <span>Book online consultation</span>
                </div>
                <div className="flex items-start">
                  <div className="bg-white text-emerald-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">2</div>
                  <span>Get personalized plan</span>
                </div>
                <div className="flex items-start">
                  <div className="bg-white text-emerald-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">3</div>
                  <span>Pay & get policy instantly</span>
                </div>
              </div>
              <Link href="/contact" >
              <button className="w-full bg-white text-emerald-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                Start Now
              </button>
              </Link>
            </div>

            {/* Car Insurance Image */}
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <img
                src="https://img.freepik.com/free-vector/car-insurance-concept-illustration_114360-22795.jpg"
                alt="Accident Coverage"
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                <h3 className="text-white font-medium text-sm">Accident Protection</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </main>
  );
}
