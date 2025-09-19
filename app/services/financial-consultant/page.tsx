"use client";
import Link from 'next/link';
import { FaPercentage, FaMoneyBillWave, FaHandshake, FaBook,  } from 'react-icons/fa';
import { GiMoneyStack } from 'react-icons/gi';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';

import { useState, useEffect } from "react";
import {
  FaShieldAlt,
  FaUserPlus,
  FaChartLine,FaCreditCard,FaHospital,FaSearch,
  FaBolt,FaRupeeSign,FaSearchDollar,
    FaHandHoldingMedical,
  FaFileMedical,
  FaCheck,
  FaHospitalSymbol,
  FaPlus,
  FaPiggyBank,
  FaWallet,
  FaMobileAlt,
  FaVirus,
  FaAmbulance,
  FaBaby,
  FaStethoscope,
  FaClinicMedical,
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
                Financial
                <br />
                <span className="text-black drop-shadow-lg">Consultant</span>
              </h1>
              <p
                className={`text-xl text-white/95 mb-10 max-w-lg leading-relaxed drop-shadow-lg transform transition-all duration-1000 ${
                  heroVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: "400ms" }}
              >
"Financial consultants are a great option for those with limited time or investment knowledge. This guide covers who they are, their qualifications, and how to choose the right one." </p>
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
                    src="https://img.freepik.com/free-vector/progress-overview-concept-illustration_114360-5470.jpg?t=st=1748672939~exp=1748676539~hmac=ae6be5c44b287db22f942410f0e7ca80c05c997240d4f206ff566e945fdb8ba8&w=1380"
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

<section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
  {/* Metallic decorative elements */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-20 left-1/4 w-40 h-40 rounded-full bg-gradient-to-r from-green-600 to-gray-700 blur-3xl mix-blend-overlay"></div>
    <div className="absolute bottom-20 right-1/4 w-60 h-60 rounded-full bg-gradient-to-r from-gray-600 to-green-900 blur-3xl mix-blend-overlay"></div>
  </div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    {/* Header with metallic accent */}
    <div className="text-center mb-16">
      <span className="inline-block bg-gradient-to-r from-green-600 to-green-800 text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-4 border border-green-500 shadow-lg">
        Professional Wealth Guidance
      </span>
      <h2 className="text-4xl font-bold text-white mb-4">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-gray-300">
          What Is a Financial Consultant?
        </span>
      </h2>
      <p className="text-lg text-gray-300 max-w-3xl mx-auto">
        Expert guidance to plan, manage, and grow your investments when you lack time or expertise
      </p>
    </div>

    {/* Core Services Grid */}
    <div className="grid md:grid-cols-3 gap-8 mb-16">
      {/* What They Do */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-lg">
        <div className="flex items-center mb-6">
          <div className="bg-green-900/50 p-3 rounded-lg mr-4 border border-green-600/30">
            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white">
            What Do <span className="text-green-400">They Do?</span>
          </h3>
        </div>
        
        <div className="space-y-6">
          {[
            { 
              step: "1", 
              title: "Understand Your Goals", 
              desc: "Analyze investment horizon, amount, and risk tolerance",
              border: "border-green-900/30"
            },
            { 
              step: "2", 
              title: "Suggest Investments", 
              desc: "Recommend options matching your financial profile",
              border: "border-gray-700"
            },
            { 
              step: "3", 
              title: "Track Performance", 
              desc: "Monitor and adjust underperforming investments",
              border: "border-green-900/30"
            }
          ].map((item, index) => (
            <div key={index} className={`flex items-start p-4 rounded-lg bg-gray-800/30 border ${item.border} hover:border-green-600/50 transition-colors`}>
              <div className={`bg-gradient-to-br from-green-800 to-green-900 w-8 h-8 rounded-full flex items-center justify-center mr-4 text-white font-bold border border-gray-500`}>
                {item.step}
              </div>
              <div>
                <h4 className="font-bold text-white">{item.title}</h4>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* When to Hire */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-lg">
        <div className="flex items-center mb-6">
          <div className="bg-green-900/50 p-3 rounded-lg mr-4 border border-green-600/30">
            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white">
            When Should You <span className="text-green-400">Hire One?</span>
          </h3>
        </div>
        
        <div className="space-y-4">
          {[
            "You're too busy with work/business",
            "Have limited investment knowledge",
            "Current investments underperforming",
            "Need tax-efficient strategies",
            "Planning major financial decisions"
          ].map((item, index) => (
            <div key={index} className="flex items-start p-3 rounded-lg hover:bg-gray-800/50 transition-colors">
              <svg className="flex-shrink-0 w-5 h-5 text-green-500 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="text-gray-300">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Keys Highlight */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-lg">
        <div className="flex items-center mb-6">
          <div className="bg-green-900/50 p-3 rounded-lg mr-4 border border-green-600/30">
            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white">
            Why Choose <span className="text-green-400">Keys Fintech?</span>
          </h3>
        </div>
        
        <div className="space-y-4 mb-6">
          {[
            "Free video consultation",
            "Expert advice for insurance & investments",
            "Partners with 24+ Insurance companies",
            "44+ Asset Management partnerships",
            "Physical office in T-Nagar, Chennai"
          ].map((item, index) => (
            <div key={index} className="flex items-start">
              <div className="bg-green-900/20 p-1 rounded-full mr-3 mt-0.5">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <span className="text-gray-300">{item}</span>
            </div>
          ))}
        </div>
        <Link href="/contact">
        <button className="w-full bg-gradient-to-r from-green-700 to-green-800 hover:from-green-600 hover:to-green-700 text-white font-medium py-2 px-4 rounded-lg transition-all border border-green-600">
          Contact Us
        </button>
        </Link>
      </div>
    </div>

    {/* Evaluation Section */}
    <div className="grid lg:grid-cols-2 gap-8 mb-16">
      {/* How to Choose */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-lg">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
          <div className="bg-green-900/50 p-2 rounded-lg mr-4 border border-green-600/30">
            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <span>How to Choose the <span className="text-green-400">Right Consultant</span></span>
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            { icon: "📘", title: "Learn the Basics", desc: "Know 30% to ask informed questions" },
            { icon: "📝", title: "Check Track Record", desc: "Review past client performance" },
            { icon: "🔄", title: "Set a Process", desc: "Define decision-making frequency" },
            { icon: "💬", title: "Communication", desc: "Ensure clear explanation style" }
          ].map((item, index) => (
            <div key={index} className="flex items-start p-4 rounded-lg bg-gray-800/30 border border-gray-700 hover:border-green-600/50 transition-colors">
              <span className="text-2xl mr-3">{item.icon}</span>
              <div>
                <h4 className="font-bold text-white">{item.title}</h4>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How to Evaluate */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-lg">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
          <div className="bg-green-900/50 p-2 rounded-lg mr-4 border border-green-600/30">
            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
            </svg>
          </div>
          <span>How to <span className="text-green-400">Evaluate</span></span>
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Factor</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">What to Look For</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {[
                { factor: "Education", lookFor: "Finance degrees, CA, CFA certifications" },
                { factor: "Experience", lookFor: "Years in market & client results" },
                { factor: "Research Skills", lookFor: "Market analysis capabilities" },
                { factor: "Fees", lookFor: "Reasonable cost for value provided" },
                { factor: "SEBI Compliance", lookFor: "Proper registration as RIA" }
              ].map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-800/50" : "bg-gray-900/50"}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-300">{row.factor}</td>
                  <td className="px-4 py-4 text-sm text-gray-400">{row.lookFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    {/* Consultant vs Advisor */}
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700 shadow-lg mb-16">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">
        Consultant <span className="text-green-400">vs.</span> Advisor
      </h3>
      <p className="text-gray-300 text-center max-w-3xl mx-auto mb-8">
        Both guide your investments. In India, they may have different certifications under SEBI rules,
        but share the same goal: helping you grow wealth safely.
      </p>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-800/50 p-6 rounded-lg border border-green-900/30">
          <h4 className="text-xl font-bold text-green-400 mb-3 text-center">Financial Consultant</h4>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start">
              <svg className="flex-shrink-0 w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Focuses on implementation</span>
            </li>
            <li className="flex items-start">
              <svg className="flex-shrink-0 w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>May execute trades</span>
            </li>
            <li className="flex items-start">
              <svg className="flex-shrink-0 w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Often product-specific</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
          <h4 className="text-xl font-bold text-gray-300 mb-3 text-center">Financial Advisor</h4>
          <ul className="space-y-3 text-gray-400">
            <li className="flex items-start">
              <svg className="flex-shrink-0 w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Focuses on holistic planning</span>
            </li>
            <li className="flex items-start">
              <svg className="flex-shrink-0 w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Provides strategic guidance</span>
            </li>
            <li className="flex items-start">
              <svg className="flex-shrink-0 w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Typically fee-based</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    {/* CTA Section */}
    <div className="text-center">
      <Link href="/contact">
      <button className="relative overflow-hidden group bg-gradient-to-r from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 text-white font-bold py-4 px-10 rounded-lg transition-all shadow-xl hover:shadow-2xl border border-green-700 mb-4">
        <span className="relative z-10">Book Free Consultation</span>
        <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      </button>
      </Link>
      <p className="text-gray-400 text-sm">
        Get personalized investment guidance from SEBI-registered professionals
      </p>
    </div>
  </div>
</section>
      {/* Benefits Section with Numbered Points */}

<section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
  {/* Metallic decorative elements */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-20 left-1/4 w-40 h-40 rounded-full bg-gradient-to-r from-green-600 to-gray-700 blur-3xl mix-blend-overlay"></div>
    <div className="absolute bottom-20 right-1/4 w-60 h-60 rounded-full bg-gradient-to-r from-gray-600 to-green-900 blur-3xl mix-blend-overlay"></div>
  </div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    {/* Header */}
    <div className="text-center mb-16">
      <span className="inline-block bg-gradient-to-r from-green-600 to-green-800 text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-4 border border-green-500 shadow-lg">
        Advisor Compensation
      </span>
      <h2 className="text-4xl font-bold text-white mb-4">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-gray-300">
          How Do Financial Advisors Make Money?
        </span>
      </h2>
      <p className="text-lg text-gray-300 max-w-3xl mx-auto">
        Understanding advisor fee structures helps you choose the right professional relationship
      </p>
    </div>

    {/* Fee Structures */}
    <div className="grid md:grid-cols-3 gap-8 mb-16">
      {/* Percentage-Based */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-lg hover:border-green-600/50 transition-colors">
        <div className="flex items-center mb-6">
          <div className="bg-green-900/50 p-3 rounded-lg mr-4 border border-green-600/30">
            <FaPercentage className="text-green-400 text-xl" />
          </div>
          <h3 className="text-2xl font-bold text-white">
            Percentage<span className="text-green-400">-Based</span>
          </h3>
        </div>
        <p className="text-gray-300 mb-4">
          Typically 1-2% of assets under management annually
        </p>
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
          <h4 className="font-bold text-green-400 mb-2">Example</h4>
          <p className="text-sm text-gray-300">
            ₹1 Crore portfolio × 1% fee = ₹1 Lakh/year
          </p>
        </div>
      </div>

      {/* Fixed Fees */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-lg hover:border-green-600/50 transition-colors">
        <div className="flex items-center mb-6">
          <div className="bg-green-900/50 p-3 rounded-lg mr-4 border border-green-600/30">
            <FaMoneyBillWave className="text-green-400 text-xl" />
          </div>
          <h3 className="text-2xl font-bold text-white">
            Fixed <span className="text-green-400">Fees</span>
          </h3>
        </div>
        <p className="text-gray-300 mb-4">
          Flat rates for comprehensive financial planning
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
            <h4 className="text-xs text-green-400">Annual</h4>
            <p className="text-sm text-gray-300">₹25k-₹1L+</p>
          </div>
          <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
            <h4 className="text-xs text-green-400">Hourly</h4>
            <p className="text-sm text-gray-300">₹1k-₹3k/hr</p>
          </div>
        </div>
      </div>

      {/* Commission */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-lg hover:border-green-600/50 transition-colors">
        <div className="flex items-center mb-6">
          <div className="bg-green-900/50 p-3 rounded-lg mr-4 border border-green-600/30">
            <GiMoneyStack className="text-green-400 text-xl" />
          </div>
          <h3 className="text-2xl font-bold text-white">
            <span className="text-green-400">Commission</span>
          </h3>
        </div>
        <p className="text-gray-300 mb-4">
          Earned on performance exceeding agreed targets
        </p>
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
          <h4 className="font-bold text-green-400 mb-2">Structure</h4>
          <p className="text-sm text-gray-300">
            10-20% of profits above benchmark
          </p>
        </div>
      </div>
    </div>

    {/* Warning Section */}
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-red-900/50 shadow-lg mb-16">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
        <div className="bg-red-900/50 p-2 rounded-lg mr-4 border border-red-600/30">
          <RiMoneyDollarCircleLine className="text-red-400 text-xl" />
        </div>
        <span>When <span className="text-red-400">Not</span> to Use an Advisor</span>
      </h3>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { 
            icon: <FaBook className="text-red-400" />, 
            title: "No Investment Knowledge", 
            desc: "Learn basics first to evaluate advice properly",
            bg: "bg-gradient-to-br from-gray-800 to-red-900/20"
          },
          { 
            icon: <FaRupeeSign className="text-red-400" />, 
            title: "Investing < ₹1 Lakh", 
            desc: "Many advisors prefer larger portfolios",
            bg: "bg-gradient-to-br from-gray-800 to-red-900/30"
          },
          { 
            icon: <FaSearchDollar className="text-red-400" />, 
            title: "Didn't Compare", 
            desc: "Always evaluate multiple advisor options",
            bg: "bg-gradient-to-br from-gray-800 to-red-900/20"
          }
        ].map((item, index) => (
          <div key={index} className={`${item.bg} p-5 rounded-lg border border-red-900/30 hover:border-red-600/50 transition-colors`}>
            <div className="flex items-center mb-3">
              <div className="bg-red-900/30 p-2 rounded-lg mr-3 border border-red-700/30">
                {item.icon}
              </div>
              <h4 className="font-bold text-white">{item.title}</h4>
            </div>
            <p className="text-sm text-gray-300 pl-11">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Best Practices */}
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-green-900/50 shadow-lg">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">
        Choosing <span className="text-green-400">Wisely</span>
      </h3>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex items-start p-4 rounded-lg bg-gray-800/30 border border-green-900/30">
          <div className="bg-green-900/20 p-2 rounded-full mr-4">
            <FaHandshake className="text-green-400" />
          </div>
          <div>
            <h4 className="font-bold text-white mb-2">Compare Before Committing</h4>
            <p className="text-sm text-gray-400">
              Evaluate fees, qualifications, and past performance across multiple advisors. 
              Don't settle for the first option you find.
            </p>
          </div>
        </div>
        
        <div className="flex items-start p-4 rounded-lg bg-gray-800/30 border border-green-900/30">
          <div className="bg-green-900/20 p-2 rounded-full mr-4">
            <FaPercentage className="text-green-400" />
          </div>
          <div>
            <h4 className="font-bold text-white mb-2">Understand Fee Structures</h4>
            <p className="text-sm text-gray-400">
              Know exactly how your advisor gets paid and how that might influence their recommendations.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* CTA */}
    <div className="mt-16 text-center">
      <Link href="/contact">
      <button className="relative overflow-hidden group bg-gradient-to-r from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 text-white font-bold py-4 px-10 rounded-lg transition-all shadow-xl hover:shadow-2xl border border-green-700">
        <span className="relative z-10">Find the Right Advisor</span>
        <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      </button>
      </Link>
      <p className="text-gray-400 text-sm mt-4">
        Get matched with SEBI-registered professionals based on your needs
      </p>
    </div>
  </div>
</section>
    </main>
  );
}
