"use client";
import Link from 'next/link';
import {  FaCoins, FaMoneyBillWave } from 'react-icons/fa';
import { GiProfit } from 'react-icons/gi';
import { RiExchangeDollarLine } from 'react-icons/ri';
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
                Mutual Fund
              </h1>
              <p
                className={`text-xl text-white/95 mb-10 max-w-lg leading-relaxed drop-shadow-lg transform transition-all duration-1000 ${
                  heroVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: "400ms" }}
              >
"A mutual fund pools money from multiple investors to invest in a diversified portfolio of stocks, bonds, or securities, managed by professionals to reduce risk and grow wealth."              </p>
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
                    src="https://img.freepik.com/free-vector/charity-concept-illustration_114360-24502.jpg?t=st=1748677429~exp=1748681029~hmac=7da41c15ca95bcde376fbacc984ef6b127651dbdff2e25aa6901c4a24ba2bd77&w=1380"
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
    {/* Header */}
    <div className="text-center mb-16">
      <span className="inline-block bg-gradient-to-r from-green-600 to-green-800 text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-4 border border-green-500 shadow-lg">
        Smart Investing
      </span>
      <h2 className="text-4xl font-bold text-white mb-4">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-gray-300">
          Mutual Fund Advantages
        </span>
      </h2>
      <p className="text-lg text-gray-300 max-w-3xl mx-auto">
        Discover why mutual funds are the preferred choice for modern investors
      </p>
    </div>

    {/* Benefits Grid */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      {[
        { 
          icon: <FaChartLine className="text-green-400 text-3xl" />,
          title: "Professional Management",
          desc: "Expert fund managers handle research and decisions, saving you time and effort",
          bg: "bg-gradient-to-br from-gray-800 to-gray-900"
        },
        { 
          icon: <RiExchangeDollarLine className="text-green-400 text-3xl" />,
          title: "Diversification",
          desc: "Spread risk across multiple assets with a single investment",
          bg: "bg-gradient-to-br from-gray-800 to-gray-900"
        },
        { 
          icon: <FaPiggyBank className="text-green-400 text-3xl" />,
          title: "Affordable SIPs",
          desc: "Start with just ₹500 and build wealth systematically",
          bg: "bg-gradient-to-br from-gray-800 to-gray-900"
        },
        { 
          icon: <FaShieldAlt className="text-green-400 text-3xl" />,
          title: "Regulated & Safe",
          desc: "SEBI-regulated funds with transparent operations",
          bg: "bg-gradient-to-br from-gray-800 to-gray-900"
        },
        { 
          icon: <GiProfit className="text-green-400 text-3xl" />,
          title: "Tax Benefits",
          desc: "ELSS funds offer tax savings under Section 80C",
          bg: "bg-gradient-to-br from-gray-800 to-gray-900"
        },
        { 
          icon: <FaCoins className="text-green-400 text-3xl" />,
          title: "Liquidity Options",
          desc: "Easy redemption with liquid funds for emergencies",
          bg: "bg-gradient-to-br from-gray-800 to-gray-900"
        }
      ].map((item, index) => (
        <div key={index} className={`${item.bg} p-6 rounded-xl border border-gray-700 hover:border-green-600/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1`}>
          <div className="bg-green-900/30 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 border border-green-700/30">
            {item.icon}
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
          <p className="text-gray-300">{item.desc}</p>
        </div>
      ))}
    </div>

    {/* SIP Showcase */}
    <div className="bg-gradient-to-br from-gray-800 to-green-900/20 rounded-xl p-8 border border-green-900/50 shadow-lg mb-16">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
          <h3 className="text-2xl font-bold text-white mb-4">
            <span className="text-green-400">SIP</span> Magic
          </h3>
          <p className="text-gray-300 mb-4">
            How ₹5000 monthly grows at 12% annual returns:
          </p>
          <ul className="text-gray-300 space-y-2 mb-6">
            <li className="flex items-center">
              <span className="bg-green-500 rounded-full w-2 h-2 mr-2"></span>
              ₹3.5 lakhs in 5 years
            </li>
            <li className="flex items-center">
              <span className="bg-green-500 rounded-full w-2 h-2 mr-2"></span>
              ₹11.5 lakhs in 10 years
            </li>
            <li className="flex items-center">
              <span className="bg-green-500 rounded-full w-2 h-2 mr-2"></span>
              ₹50 lakhs+ in 20 years
            </li>
          </ul>
          <p className="text-sm text-gray-400">
            Small regular investments can create substantial wealth over time
          </p>
        </div>
        <div className="md:w-1/2 bg-gray-800/50 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-white">SIP Growth Projection</h4>
            <span className="text-green-400 text-sm">₹5000/month at 12%</span>
          </div>
          <div className="space-y-3">
            {[
              { years: 5, amount: "₹3.5L" },
              { years: 10, amount: "₹11.5L" },
              { years: 15, amount: "₹25L" },
              { years: 20, amount: "₹50L" },
              { years: 25, amount: "₹1Cr+" }
            ].map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-16 text-gray-400">{item.years} years</div>
                <div className="flex-1 bg-gray-700 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-green-600 to-green-800 h-4 rounded-full" 
                    style={{ width: `${20 + (index * 20)}%` }}
                  ></div>
                </div>
                <div className="w-20 text-right text-green-400">{item.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Fund Types */}
    <div className="mb-16">
      <h3 className="text-2xl font-bold text-white mb-8 flex items-center justify-center">
        <div className="bg-green-900/50 p-2 rounded-lg mr-4 border border-green-600/30">
          <FaMoneyBillWave className="text-green-400 text-xl" />
        </div>
        <span>Mutual Fund <span className="text-green-400">Categories</span></span>
      </h3>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { 
            title: "Equity Funds",
            desc: "Invest primarily in stocks for long-term growth",
            risk: "High",
            returns: "12-18%",
            color: "from-green-600 to-green-900"
          },
          { 
            title: "Debt Funds",
            desc: "Invest in bonds for stable returns",
            risk: "Low",
            returns: "6-9%",
            color: "from-blue-600 to-blue-900"
          },
          { 
            title: "Hybrid Funds",
            desc: "Balance of equity and debt instruments",
            risk: "Moderate",
            returns: "9-12%",
            color: "from-purple-600 to-purple-900"
          },
          { 
            title: "ELSS Funds",
            desc: "Tax-saving funds with 3-year lock-in",
            risk: "High",
            returns: "12-15%",
            color: "from-yellow-600 to-yellow-900"
          },
          { 
            title: "Index Funds",
            desc: "Passively track market indices",
            risk: "Moderate",
            returns: "10-12%",
            color: "from-red-600 to-red-900"
          },
          { 
            title: "Sectoral Funds",
            desc: "Focus on specific sectors like IT, Pharma",
            risk: "Very High",
            returns: "15-25%",
            color: "from-indigo-600 to-indigo-900"
          }
        ].map((item, index) => (
          <div key={index} className="bg-gray-800/50 p-5 rounded-xl border border-gray-700 hover:border-green-600/50 transition-colors shadow-lg">
            <h4 className={`font-bold text-white text-lg mb-2 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
              {item.title}
            </h4>
            <p className="text-sm text-gray-300 mb-3">{item.desc}</p>
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Risk: <span className="font-bold">{item.risk}</span></span>
              <span className="text-green-400">Returns: <span className="font-bold">{item.returns}</span></span>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* CTA */}
    <div className="text-center">
        <Link href="/contact">
      <button className="relative overflow-hidden group bg-gradient-to-r from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 text-white font-bold py-4 px-10 rounded-lg transition-all shadow-xl hover:shadow-2xl border border-green-700">
        <span className="relative z-10">Explore Mutual Funds</span>
        <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      </button>
      </Link>
      <p className="text-gray-400 text-sm mt-4">
        Consult with our experts to find the perfect funds for your financial goals
      </p>
    </div>
  </div>
</section>
    </main>
  );
}
