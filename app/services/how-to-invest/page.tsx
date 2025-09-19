"use client";
import Link from 'next/link';
import { FaPercentage, FaMoneyBillWave, FaHandshake, FaBook, FaRecycle,FaCoins } from 'react-icons/fa';
import { GiMoneyStack } from 'react-icons/gi';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi';
import { GiGoldBar, GiCrystalBars } from 'react-icons/gi';
import { RiStockLine, RiExchangeDollarLine } from 'react-icons/ri';
import { SiBitcoinsv } from 'react-icons/si';
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
                How to Invest:
                <br />
                <span className="text-black drop-shadow-lg">Beginner’s Guide</span>
              </h1>
              <p
                className={`text-xl text-white/95 mb-10 max-w-lg leading-relaxed drop-shadow-lg transform transition-all duration-1000 ${
                  heroVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: "400ms" }}
              >
"Something you bought for ₹100 five years ago would cost much more today. So, what about the money you just kept in the bank over those five years?" </p>
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
                    src="https://img.freepik.com/free-vector/investing-concept-illustration_114360-3218.jpg?ga=GA1.1.279439342.1748671199&semt=ais_hybrid&w=740"
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
        Investment Basics
      </span>
      <h2 className="text-4xl font-bold text-white mb-4">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-gray-300">
          Your Step-by-Step Investment Guide
        </span>
      </h2>
      <p className="text-lg text-gray-300 max-w-3xl mx-auto">
        Start your investment journey with confidence using this simple framework
      </p>
    </div>

    {/* Investment Steps */}
    <div className="grid md:grid-cols-3 gap-8 mb-16">
      {/* Step 1 */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-lg hover:border-green-600/50 transition-colors group">
        <div className="flex items-center mb-6">
          <div className="bg-green-900/50 p-3 rounded-lg mr-4 border border-green-600/30 group-hover:bg-green-800 transition-colors">
            <FaPercentage className="text-green-400 text-xl" />
          </div>
          <div>
            <span className="text-xs font-bold text-green-400">STEP 1</span>
            <h3 className="text-2xl font-bold text-white">
              Determine <span className="text-green-400">Amount</span>
            </h3>
          </div>
        </div>
        <p className="text-gray-300 mb-4">
          Decide how much of your income to invest (typically 25-40% of salary)
        </p>
        <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
          <p className="text-sm text-gray-300">
            <span className="text-green-400 font-bold">Tip:</span> Start with what you can afford and increase gradually
          </p>
        </div>
      </div>

      {/* Step 2 */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-lg hover:border-green-600/50 transition-colors group">
        <div className="flex items-center mb-6">
          <div className="bg-green-900/50 p-3 rounded-lg mr-4 border border-green-600/30 group-hover:bg-green-800 transition-colors">
            <FaChartLine className="text-green-400 text-xl" />
          </div>
          <div>
            <span className="text-xs font-bold text-green-400">STEP 2</span>
            <h3 className="text-2xl font-bold text-white">
              Learn <span className="text-green-400">Options</span>
            </h3>
          </div>
        </div>
        <p className="text-gray-300 mb-4">
          Understand different investment vehicles (mutual funds, stocks, bonds, etc.)
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-800/50 p-2 rounded-lg border border-gray-700 text-center">
            <h4 className="text-xs text-green-400">Safer</h4>
            <p className="text-xs text-gray-300">Index Funds</p>
          </div>
          <div className="bg-gray-800/50 p-2 rounded-lg border border-gray-700 text-center">
            <h4 className="text-xs text-green-400">Growth</h4>
            <p className="text-xs text-gray-300">Equities</p>
          </div>
        </div>
      </div>

      {/* Step 3 */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-lg hover:border-green-600/50 transition-colors group">
        <div className="flex items-center mb-6">
          <div className="bg-green-900/50 p-3 rounded-lg mr-4 border border-green-600/30 group-hover:bg-green-800 transition-colors">
            <FaBalanceScale className="text-green-400 text-xl" />
          </div>
          <div>
            <span className="text-xs font-bold text-green-400">STEP 3</span>
            <h3 className="text-2xl font-bold text-white">
              Match <span className="text-green-400">Goals</span>
            </h3>
          </div>
        </div>
        <p className="text-gray-300 mb-4">
          Align investments with your financial objectives and risk tolerance
        </p>
        <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
          <p className="text-sm text-gray-300">
            <span className="text-green-400 font-bold">Example:</span> Retirement needs different strategy than short-term goals
          </p>
        </div>
      </div>

      {/* Step 4 */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-lg hover:border-green-600/50 transition-colors group">
        <div className="flex items-center mb-6">
          <div className="bg-green-900/50 p-3 rounded-lg mr-4 border border-green-600/30 group-hover:bg-green-800 transition-colors">
            <GiPayMoney className="text-green-400 text-xl" />
          </div>
          <div>
            <span className="text-xs font-bold text-green-400">STEP 4</span>
            <h3 className="text-2xl font-bold text-white">
              Invest <span className="text-green-400">Regularly</span>
            </h3>
          </div>
        </div>
        <p className="text-gray-300 mb-4">
          Commit to consistent investments (monthly/quarterly)
        </p>
        <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
          <p className="text-sm text-gray-300">
            <span className="text-green-400 font-bold">Benefit:</span> Rupee cost averaging reduces market timing risk
          </p>
        </div>
      </div>

      {/* Step 5 */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-lg hover:border-green-600/50 transition-colors group">
        <div className="flex items-center mb-6">
          <div className="bg-green-900/50 p-3 rounded-lg mr-4 border border-green-600/30 group-hover:bg-green-800 transition-colors">
            <FaPiggyBank className="text-green-400 text-xl" />
          </div>
          <div>
            <span className="text-xs font-bold text-green-400">STEP 5</span>
            <h3 className="text-2xl font-bold text-white">
              Monitor <span className="text-green-400">Progress</span>
            </h3>
          </div>
        </div>
        <p className="text-gray-300 mb-4">
          Review portfolio performance periodically (not obsessively)
        </p>
        <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
          <p className="text-sm text-gray-300">
            <span className="text-green-400 font-bold">Tip:</span> Quarterly reviews are often sufficient
          </p>
        </div>
      </div>

      {/* Step 6 */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-lg hover:border-green-600/50 transition-colors group">
        <div className="flex items-center mb-6">
          <div className="bg-green-900/50 p-3 rounded-lg mr-4 border border-green-600/30 group-hover:bg-green-800 transition-colors">
            <FaRecycle className="text-green-400 text-xl" />
          </div>
          <div>
            <span className="text-xs font-bold text-green-400">STEP 6</span>
            <h3 className="text-2xl font-bold text-white">
              Reinvest <span className="text-green-400">Returns</span>
            </h3>
          </div>
        </div>
        <p className="text-gray-300 mb-4">
          Let compounding work its magic by reinvesting dividends and gains
        </p>
        <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
          <p className="text-sm text-gray-300">
            <span className="text-green-400 font-bold">Power:</span> ₹10,000 at 10% for 30 years = ₹1.74 lakhs
          </p>
        </div>
      </div>
    </div>

    {/* Key Principles */}
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-green-900/50 shadow-lg">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">
        Core <span className="text-green-400">Principles</span>
      </h3>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex items-start p-4 rounded-lg bg-gray-800/30 border border-green-900/30">
          <div className="bg-green-900/20 p-2 rounded-full mr-4">
            <GiReceiveMoney className="text-green-400" />
          </div>
          <div>
            <h4 className="font-bold text-white mb-2">Diversification is Key</h4>
            <p className="text-sm text-gray-400">
              Spread investments across asset classes (equities, debt, gold) to reduce risk. 
              Don't put all your money in one place.
            </p>
          </div>
        </div>
        
        <div className="flex items-start p-4 rounded-lg bg-gray-800/30 border border-green-900/30">
          <div className="bg-green-900/20 p-2 rounded-full mr-4">
            <FaMoneyBillWave className="text-green-400" />
          </div>
          <div>
            <h4 className="font-bold text-white mb-2">Start Early, Benefit More</h4>
            <p className="text-sm text-gray-400">
              Time in the market beats timing the market. Even small amounts grow significantly over decades.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* CTA */}
    <div className="mt-16 text-center">
      <Link href="/contact">
      <button className="relative overflow-hidden group bg-gradient-to-r from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 text-white font-bold py-4 px-10 rounded-lg transition-all shadow-xl hover:shadow-2xl border border-green-700">
        <span className="relative z-10">Start Your Investment Journey</span>
        <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      </button>
      </Link>
      <p className="text-gray-400 text-sm mt-4">
        Begin with as little as ₹500 per month through SIPs
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
        Wealth Building
      </span>
      <h2 className="text-4xl font-bold text-white mb-4">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-gray-300">
          Best Investment Options for 2025
        </span>
      </h2>
      <p className="text-lg text-gray-300 max-w-3xl mx-auto">
        Diversify your portfolio with these high-potential investment vehicles
      </p>
    </div>

    {/* Traditional Investments */}
    <div className="mb-16">
      <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
        <div className="bg-green-900/50 p-2 rounded-lg mr-4 border border-green-600/30">
          <RiExchangeDollarLine className="text-green-400 text-xl" />
        </div>
        <span>Traditional <span className="text-green-400">Investments</span></span>
      </h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { 
            icon: <FaShieldAlt className="text-green-400 text-2xl" />, 
            title: "Life Insurance", 
            returns: "Cover up to ₹1 Cr",
            desc: "Financial protection for your family with maturity benefits",
            bg: "bg-gradient-to-br from-gray-800 to-gray-900"
          },
          { 
            icon: <FaHospital className="text-green-400 text-2xl" />, 
            title: "Health Insurance", 
            returns: "Medical coverage",
            desc: "Protect against high healthcare costs with tax benefits",
            bg: "bg-gradient-to-br from-gray-800 to-gray-900"
          },
          { 
            icon: <RiStockLine className="text-green-400 text-2xl" />, 
            title: "Stocks", 
            returns: "20-40% potential returns",
            desc: "High-growth companies like Adani Ports, Ujivan SFB",
            bg: "bg-gradient-to-br from-gray-800 to-gray-900"
          },
          { 
            icon: <FaHome className="text-green-400 text-2xl" />, 
            title: "Real Estate", 
            returns: "12-20% annual returns",
            desc: "Rental income plus property appreciation benefits",
            bg: "bg-gradient-to-br from-gray-800 to-gray-900"
          },
          { 
            icon: <GiGoldBar className="text-green-400 text-2xl" />, 
            title: "Gold", 
            returns: "8-12% historical returns",
            desc: "Digital gold ETFs safer than physical holdings",
            bg: "bg-gradient-to-br from-gray-800 to-gray-900"
          },
          { 
            icon: <FaChartLine className="text-green-400 text-2xl" />, 
            title: "Mutual Funds", 
            returns: "10-18% CAGR",
            desc: "Professional management with SIP options from ₹500",
            bg: "bg-gradient-to-br from-gray-800 to-gray-900"
          }
        ].map((item, index) => (
          <div key={index} className={`${item.bg} p-5 rounded-xl border border-gray-700 hover:border-green-600/50 transition-colors shadow-lg`}>
            <div className="flex items-start mb-3">
              <div className="bg-green-900/30 p-3 rounded-lg mr-4 border border-green-700/30">
                {item.icon}
              </div>
              <div>
                <h4 className="font-bold text-white text-lg">{item.title}</h4>
                <span className="text-sm text-green-400">{item.returns}</span>
              </div>
            </div>
            <p className="text-sm text-gray-300">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Trending Investments */}
    <div className="mb-16">
      <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
        <div className="bg-green-900/50 p-2 rounded-lg mr-4 border border-green-600/30">
          <GiCrystalBars className="text-green-400 text-xl" />
        </div>
        <span>2025 <span className="text-green-400">Trending</span> Investments</span>
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        {[
          { 
            icon: <SiBitcoinsv className="text-green-400 text-2xl" />, 
            title: "Cryptocurrency", 
            pros: ["High growth potential", "Decentralized"],
            cons: ["High volatility", "Unregulated"],
            bg: "bg-gradient-to-br from-gray-800 to-green-900/20"
          },
          { 
            icon: <RiStockLine className="text-green-400 text-2xl" />, 
            title: "Nifty 50 Stocks", 
            pros: ["Bluechip companies", "Market leaders"],
            cons: ["Market risks", "Sector concentration"],
            bg: "bg-gradient-to-br from-gray-800 to-green-900/20"
          },
          { 
            icon: <FaCoins className="text-green-400 text-2xl" />, 
            title: "Digital Gold", 
            pros: ["No storage worries", "Fractional ownership"],
            cons: ["No physical possession", "Platform risk"],
            bg: "bg-gradient-to-br from-gray-800 to-green-900/20"
          },
          { 
            icon: <FaChartLine className="text-green-400 text-2xl" />, 
            title: "Sectoral Mutual Funds", 
            pros: ["Thematic investing", "Professional management"],
            cons: ["Sector risks", "Higher expense ratios"],
            bg: "bg-gradient-to-br from-gray-800 to-green-900/20"
          }
        ].map((item, index) => (
          <div key={index} className={`${item.bg} p-5 rounded-xl border border-gray-700 hover:border-green-600/50 transition-colors shadow-lg`}>
            <div className="flex items-center mb-4">
              <div className="bg-green-900/30 p-3 rounded-lg mr-4 border border-green-700/30">
                {item.icon}
              </div>
              <h4 className="font-bold text-white text-xl">{item.title}</h4>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h5 className="text-green-400 text-sm font-bold mb-2">Pros</h5>
                <ul className="text-xs text-gray-300 space-y-1">
                  {item.pros.map((pro, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-green-500 mr-1">✓</span> {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="text-red-400 text-sm font-bold mb-2">Cons</h5>
                <ul className="text-xs text-gray-300 space-y-1">
                  {item.cons.map((con, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-red-500 mr-1">✗</span> {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Performance Metrics */}
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-green-900/50 shadow-lg mb-16">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">
        Measuring <span className="text-green-400">Performance</span>
      </h3>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: <FaChartLine className="text-green-400" />,
            title: "P/E Ratio",
            desc: "Price-to-Earnings ratio indicates valuation",
            formula: "Market Price ÷ EPS"
          },
          {
            icon: <GiGoldBar className="text-green-400" />,
            title: "Annualized Return",
            desc: "Standardized yearly performance measure",
            formula: "(End Value ÷ Start Value)^(1/n) - 1"
          },
          {
            icon: <RiStockLine className="text-green-400" />,
            title: "Return Calculator",
            desc: "Track absolute profit from investments",
            formula: "Current Value - Invested Amount"
          },
          {
            icon: <FaCoins className="text-green-400" />,
            title: "Daily Returns",
            desc: "Average daily movement of investment",
            formula: "(Today's Price ÷ Yesterday's Price) - 1"
          }
        ].map((item, index) => (
          <div key={index} className="bg-gray-800/50 p-5 rounded-lg border border-gray-700 hover:border-green-600/50 transition-colors">
            <div className="bg-green-900/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
              {item.icon}
            </div>
            <h4 className="font-bold text-white text-center mb-2">{item.title}</h4>
            <p className="text-sm text-gray-300 text-center mb-3">{item.desc}</p>
            <div className="bg-gray-900/50 p-2 rounded text-xs text-green-300 font-mono text-center">
              {item.formula}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Compounding Section */}
    <div className="bg-gradient-to-br from-gray-800 to-green-900/10 rounded-xl p-8 border border-green-900/50 shadow-lg">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
          <h3 className="text-2xl font-bold text-white mb-4">
            The <span className="text-green-400">Power</span> of Compounding
          </h3>
          <p className="text-gray-300 mb-4">
            Reinvesting ₹500 monthly at 12% return grows to:
          </p>
          <ul className="text-gray-300 space-y-2 mb-6">
            <li className="flex items-center">
              <span className="bg-green-500 rounded-full w-2 h-2 mr-2"></span>
              ₹10,718 in 8 months (114% return)
            </li>
            <li className="flex items-center">
              <span className="bg-green-500 rounded-full w-2 h-2 mr-2"></span>
              ₹2.5 lakhs in 10 years
            </li>
            <li className="flex items-center">
              <span className="bg-green-500 rounded-full w-2 h-2 mr-2"></span>
              ₹50 lakhs+ in 25 years
            </li>
          </ul>
          <p className="text-sm text-gray-400">
            "Interest on interest" is the most powerful force in wealth creation
          </p>
        </div>
        <div className="md:w-1/2 bg-gray-800/50 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-white">Compounding Growth</h4>
            <span className="text-green-400 text-sm">12% annual return</span>
          </div>
          <div className="space-y-3">
            {[
              { years: 5, amount: "₹40,000" },
              { years: 10, amount: "₹1.15L" },
              { years: 15, amount: "₹2.5L" },
              { years: 20, amount: "₹5.5L" },
              { years: 25, amount: "₹12L" }
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

    {/* CTA */}
    <div className="mt-16 text-center">
      <Link href="/contact">
      <button className="relative overflow-hidden group bg-gradient-to-r from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 text-white font-bold py-4 px-10 rounded-lg transition-all shadow-xl hover:shadow-2xl border border-green-700">
        <span className="relative z-10">Start Investing Today</span>
        <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      </button>
      </Link>
      <p className="text-gray-400 text-sm mt-4">
        Begin with as little as ₹500 through SIPs in top-performing funds
      </p>
    </div>
  </div>
</section>
    </main>
  );
}
