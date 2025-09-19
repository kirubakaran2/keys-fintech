"use client";
import Link from 'next/link';
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
                Investment advice to power
                <br />
                <span className="text-black drop-shadow-lg">your finances.</span>
              </h1>
              <p
                className={`text-xl text-white/95 mb-10 max-w-lg leading-relaxed drop-shadow-lg transform transition-all duration-1000 ${
                  heroVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: "400ms" }}
              >
"Personal finance plays a crucial role in everyone’s life. Guidance from a professional investment advisor can enhance your financial planning and support you in reaching your investment goals."              </p>
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
                    src="https://img.freepik.com/free-vector/one-one-meeting-concept-illustration_114360-19822.jpg?t=st=1748671974~exp=1748675574~hmac=565df824200b907373bae8caef516bd7dee306ea4e51e43876978bba13871cff&w=1380"
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
        Smart Investment Guidance
      </span>
      <h2 className="text-4xl font-bold text-white mb-4">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-gray-300">
          Expert Financial Advice
        </span>
      </h2>
      <p className="text-lg text-gray-300 max-w-3xl mx-auto">
        Professional guidance to help you make informed investment decisions
      </p>
    </div>

    {/* Main content grid */}
    <div className="grid lg:grid-cols-3 gap-8 mb-16">
      {/* Left column - What is Investment Advice */}
      <div className="lg:col-span-1">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-lg">
          <div className="flex items-center mb-6">
            <div className="bg-green-900/50 p-3 rounded-lg mr-4 border border-green-600/30">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white">
              What Is <span className="text-green-400">Investment Advice?</span>
            </h3>
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-300">
              Professional guidance to help you make smarter financial decisions—whether it's choosing the right mutual fund, planning your taxes, or growing your savings.
            </p>
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <h4 className="font-bold text-green-400 mb-2">Who Can Advise?</h4>
              <p className="text-sm text-gray-300">
                Only SEBI-Registered Investment Advisors (RIAs) are legally allowed to give investment advice in India.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Middle column - Do You Need Advice */}
      <div className="lg:col-span-1">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-lg h-full">
          <div className="flex items-center mb-6">
            <div className="bg-green-900/50 p-3 rounded-lg mr-4 border border-green-600/30">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white">
              Do You Need <span className="text-green-400">Advice?</span>
            </h3>
          </div>

          <div className="space-y-4">
            <ul className="space-y-3">
              {[
                "Don't have time to manage finances",
                "Feel unsure about where to invest",
                "Made poor investment decisions",
                "Need expert guidance for goals",
                "Starting your investment journey",
                "Need tax-saving strategies"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <svg className="flex-shrink-0 w-5 h-5 text-green-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Right column - Advisor Traits */}
      <div className="lg:col-span-1">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-lg h-full">
          <div className="flex items-center mb-6">
            <div className="bg-green-900/50 p-3 rounded-lg mr-4 border border-green-600/30">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white">
              <span className="text-green-400">Good Advisor</span> Traits
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { title: "SEBI Registered", icon: "✅" },
              { title: "Experience", icon: "📈" },
              { title: "Trustworthy", icon: "🤝" },
              { title: "Clear Communication", icon: "💬" },
              { title: "Patient", icon: "🧘" },
              { title: "Practical", icon: "🎯" }
            ].map((trait, index) => (
              <div key={index} className="bg-gray-800/50 p-3 rounded-lg border border-gray-700 hover:border-green-600/50 transition-colors">
                <div className="flex items-center">
                  <span className="text-xl mr-2">{trait.icon}</span>
                  <span className="text-sm font-medium text-gray-300">{trait.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Pricing and Investment Section */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 px-4 sm:px-6 lg:px-0">
      {/* Pricing Section */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-lg">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
          <div className="bg-green-900/50 p-2 rounded-lg mr-4 border border-green-600/30">
            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <span>Advisor <span className="text-green-400">Fee Structures</span></span>
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Fee Structure</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Cost Range</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {[
                { type: "Commission-Based", fee: "% of assets/year", cost: "0.5% – 2%" },
                { type: "Fee-Based", fee: "Fixed annual fee", cost: "₹10,000 – ₹50,000" },
                { type: "Consultant", fee: "Per hour", cost: "₹1,000 – ₹3,000" },
                { type: "Monthly Advisor", fee: "Per month", cost: "₹5,000 – ₹10,000" }
              ].map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-800/50" : "bg-gray-900/50"}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-300">{row.type}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">{row.fee}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-green-400">{row.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Investment Ideas Section */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-lg">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
          <div className="bg-green-900/50 p-2 rounded-lg mr-4 border border-green-600/30">
            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
          </div>
          <span>Where To Invest <span className="text-green-400">₹10,000?</span></span>
        </h3>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            { risk: "Low", option: "Fixed Deposit (FD)", returns: "5% – 6%", color: "from-green-800 to-green-900" },
            { risk: "Medium", option: "Mutual Funds", returns: "8% – 10%", color: "from-green-700 to-green-800" },
            { risk: "High", option: "Blue-Chip Stocks", returns: "12% – 15%", color: "from-green-600 to-green-700" }
          ].map((item, index) => (
            <div key={index} className={`bg-gradient-to-br ${item.color} p-4 rounded-lg border border-gray-700`}>
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-white">{item.risk} Risk</h4>
                <span className="text-xs bg-black/30 text-white px-2 py-1 rounded-full">{item.option}</span>
              </div>
              <p className="text-2xl font-bold text-green-400">{item.returns}</p>
              <p className="text-xs text-gray-300 mt-2">Expected annual returns</p>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-gray-800/50 p-4 rounded-lg border border-gray-700">
          <h4 className="font-bold text-green-400 mb-2">Why Get Advice?</h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li className="flex items-start">
              <svg className="flex-shrink-0 w-4 h-4 text-green-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Better investment decisions</span>
            </li>
            <li className="flex items-start">
              <svg className="flex-shrink-0 w-4 h-4 text-green-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Proper tax planning</span>
            </li>
            <li className="flex items-start">
              <svg className="flex-shrink-0 w-4 h-4 text-green-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Portfolio tracking</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    {/* CTA Section */}
    <div className="mt-8 text-center">
      <Link href="/contact">
      <button className="relative overflow-hidden group bg-gradient-to-r from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 text-white font-bold py-4 px-10 rounded-lg transition-all shadow-xl hover:shadow-2xl border border-green-700">
        <span className="relative z-10">Get Expert Investment Advice</span>
        <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      </button>
      </Link>
      <p className="text-gray-400 text-sm mt-4">
        Consult with SEBI-registered advisors for personalized financial planning
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
    {/* Header with metallic accent */}
    <div className="text-center mb-16">
      <span className="inline-block bg-gradient-to-r from-green-600 to-green-800 text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-4 border border-green-500 shadow-lg">
        Life-Stage Financial Planning
      </span>
      <h2 className="text-4xl font-bold text-white mb-4">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-gray-300">
          Plan Your Personal Finance with Keys Fintech
        </span>
      </h2>
      <p className="text-lg text-gray-300 max-w-3xl mx-auto">
        Tailored investment advice that aligns with your life goals, cash flow, and future aspirations
      </p>
    </div>

    {/* Why It Matters Section */}
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700 shadow-lg mb-16">
      <div className="flex items-center mb-8">
        <div className="bg-green-900/50 p-3 rounded-lg mr-4 border border-green-600/30">
          <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white">
          Why Personal Finance <span className="text-green-400">Planning Matters</span>
        </h3>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: "🏠", title: "Save for major goals", desc: "Home buying, education, or life milestones" },
          { icon: "🛡️", title: "Protect your family", desc: "Right insurance and emergency funds" },
          { icon: "🌴", title: "Stress-free retirement", desc: "Plan for your golden years" },
          { icon: "📈", title: "Beat inflation", desc: "Grow wealth through smart investing" },
          { icon: "🧾", title: "Manage debt", desc: "Reduce liabilities efficiently" },
          { icon: "🔄", title: "Align with life changes", desc: "Adapt to career or business shifts" }
        ].map((item, index) => (
          <div key={index} className="flex items-start p-4 rounded-lg bg-gray-800/30 border border-gray-700 hover:border-green-900/50 transition-colors">
            <span className="text-2xl mr-3 mt-0.5">{item.icon}</span>
            <div>
              <h4 className="font-bold text-white">{item.title}</h4>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* What We Offer Section */}
    <div className="grid lg:grid-cols-2 gap-8 mb-16">
      {/* Left Column - Services */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-lg">
        <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
          <div className="bg-green-900/50 p-2 rounded-lg mr-4 border border-green-600/30">
            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <span>What <span className="text-green-400">Keys Fintech Offers You</span></span>
        </h3>

        <div className="space-y-6">
          {[
            { 
              title: "Goal-Based Planning", 
              desc: "Tailored investments for travel, education, or early retirement",
              icon: "🎯",
              border: "border-green-900/50"
            },
            { 
              title: "Risk Assessment", 
              desc: "Understand and manage risk based on your age and income",
              icon: "📊",
              border: "border-gray-700"
            },
            { 
              title: "Cash Flow & Budgeting", 
              desc: "Track spending and improve savings habits",
              icon: "💰",
              border: "border-green-900/30"
            },
            { 
              title: "Tax Optimization", 
              desc: "Smart investment choices to reduce tax legally",
              icon: "🧾",
              border: "border-gray-700"
            },
            { 
              title: "Portfolio Reviews", 
              desc: "Regular rebalancing based on life changes",
              icon: "🔍",
              border: "border-green-900/50"
            }
          ].map((service, index) => (
            <div key={index} className={`flex items-start p-4 rounded-lg bg-gray-800/30 border ${service.border} hover:border-green-600/50 transition-colors`}>
              <span className="text-2xl mr-3 mt-0.5">{service.icon}</span>
              <div>
                <h4 className="font-bold text-white">{service.title}</h4>
                <p className="text-sm text-gray-400">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column - Expectations */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-lg">
        <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
          <div className="bg-green-900/50 p-2 rounded-lg mr-4 border border-green-600/30">
            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
          </div>
          <span>What You Can <span className="text-green-400">Expect</span></span>
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Your Need</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">What We Deliver</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {[
                { need: "Clarity on financial goals", deliver: "Clear, actionable investment roadmap" },
                { need: "Help with decisions", deliver: "Expert, unbiased guidance" },
                { need: "Long-term wealth", deliver: "Personalized growth portfolio" },
                { need: "Tax planning", deliver: "Customized tax-saving plans" },
                { need: "Confidence", deliver: "Ongoing support and insights" }
              ].map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-800/50" : "bg-gray-900/50"}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-300">{row.need}</td>
                  <td className="px-4 py-4 text-sm text-green-400">{row.deliver}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Journey Section */}
        <div className="mt-8 bg-gradient-to-br from-green-900/20 to-gray-800 rounded-lg p-6 border border-green-900/30">
          <h4 className="text-xl font-bold text-white mb-3 flex items-center">
            <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Your Financial Journey, Our Guidance
          </h4>
          <p className="text-gray-300 mb-4">
            We understand every financial journey is unique. At Keys Fintech, we don't just give advice—we become your partner in progress.
          </p>
        </div>
      </div>
    </div>

    {/* CTA Section */}
    <div className="text-center">
      <Link href="/contact">
      <button className="relative overflow-hidden group bg-gradient-to-r from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 text-white font-bold py-4 px-10 rounded-lg transition-all shadow-xl hover:shadow-2xl border border-green-700 mb-4">
        <span className="relative z-10">Start Your Financial Plan Today</span>
        <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      </button>
      </Link>
      <p className="text-gray-400 text-sm">
        Let's make your money work for your life's ambitions
      </p>
    </div>
  </div>
</section>
    </main>
  );
}
