"use client";
import Link from 'next/link';
import { useState, useEffect } from "react";
import {
  FaShieldAlt,
  FaHeart,
  FaChartLine,FaPlusCircle,FaHospital,FaUserShield,
  FaSlidersH,FaGift,FaFileInvoiceDollar,
    FaHospitalUser,
  FaClipboardCheck,
  FaClock,
  FaPercentage,
  FaSyncAlt,
  FaMedal,
  FaWallet,
  FaBed,
  FaInfinity,
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
                Individual Insurance
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
"Don’t let health insurance drain your savings. The right plan protects your finances from unexpected medical costs."
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
                    src="https://img.freepik.com/free-vector/family-protection-concept-illustration_114360-25300.jpg?ga=GA1.1.1065821580.1748582073&semt=ais_hybrid&w=740"
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

<section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Decorative metallic elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-green-200 blur-3xl mix-blend-multiply"></div>
        <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-gray-300 blur-3xl mix-blend-multiply"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <span className="inline-block bg-green-100 text-green-800 px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide mb-4 border border-green-200">
            Personal Protection
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-gray-800">
              Individual Health Insurance
            </span> Coverage
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive protection tailored for your unique healthcare needs
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Information */}
          <div className="space-y-6">
            {/* Overview Card */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-lg mr-4 border border-green-200">
                  <FaHospitalUser className="text-green-600 text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Policy Overview</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Individual health insurance policies cover medical expenses incurred before and after hospitalization. 
                These plans typically cover:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span className="text-gray-700">Pre-hospitalization costs (30-60 days)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span className="text-gray-700">Post-hospitalization costs (up to 90 days)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span className="text-gray-700">Cashless treatment at network hospitals</span>
                </li>
              </ul>
            </div>

            {/* Who Should Buy Card */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-lg mr-4 border border-green-200">
                  <FaUserShield className="text-green-600 text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Who Should Buy?</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Ideal for anyone seeking financial protection against medical expenses. Whether you're:
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <h4 className="font-semibold text-green-800">Planning Ahead</h4>
                  <p className="text-gray-600 text-sm">Secure your future healthcare needs</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-800">Managing Health</h4>
                  <p className="text-gray-600 text-sm">Coverage for ongoing conditions</p>
                </div>
              </div>
            </div>

            {/* Considerations Card */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-lg mr-4 border border-green-200">
                  <FaClipboardCheck className="text-green-600 text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Key Considerations</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  {
                    icon: <FaHospitalUser className="text-green-600" />,
                    title: "Network Hospitals",
                    description: "Verify cashless treatment hospitals in your area"
                  },
                  {
                    icon: <FaClock className="text-green-600" />,
                    title: "Waiting Period",
                    description: "Understand when coverage becomes active"
                  },
                  {
                    icon: <FaShieldAlt className="text-green-600" />,
                    title: "Coverage Amount",
                    description: "Choose adequate sum insured for your needs"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="bg-green-100 p-2 rounded-full mr-4 border border-green-200">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Product Highlights */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-lg text-white">
              <h3 className="text-2xl font-bold mb-6">Why Choose Our Plan?</h3>
              <p className="mb-8 text-gray-300">
                Robust, customer-centric health insurance with valuable features for complete peace of mind.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: <FaPercentage className="text-green-400" />, feature: "100% Coverage", detail: "Comprehensive protection" },
                  { icon: <FaWallet className="text-green-400" />, feature: "Premium Promise", detail: "Transparent pricing" },
                  { icon: <FaAmbulance className="text-green-400" />, feature: "Insta Care Cover", detail: "Immediate assistance" },
                  { icon: <FaSyncAlt className="text-green-400" />, feature: "Unlimited Restoration", detail: "Multiple restorations/year" },
                  { icon: <FaMedal className="text-green-400" />, feature: "Cumulative Bonus", detail: "Extra coverage annually" },
                  { icon: <FaBaby className="text-green-400" />, feature: "Maternity Coverage", detail: "Childbirth expenses" },
                  { icon: <FaHospitalUser className="text-green-400" />, feature: "Cashless Everywhere", detail: "Any network hospital" },
                  { icon: <FaBed className="text-green-400" />, feature: "Room Rent Enhancement", detail: "Upgraded rooms included" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start bg-white/5 p-3 rounded-lg backdrop-blur-sm border border-gray-700">
                    <div className="bg-white/10 p-2 rounded-full mr-3">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold">{item.feature}</h4>
                      <p className="text-gray-300 text-sm">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/contact">
              <button className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors border border-green-700">
                Get Your Custom Quote
              </button>
              </Link>
            </div>

            {/* Stats Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 grid grid-cols-2 gap-4">
              <div className="text-center p-3 border-r border-b border-gray-200">
                <div className="text-2xl font-bold text-green-600">30-60</div>
                <div className="text-gray-600 text-xs uppercase tracking-wider">Pre-hospitalization days</div>
              </div>
              <div className="text-center p-3 border-b border-gray-200">
                <div className="text-2xl font-bold text-green-600">90</div>
                <div className="text-gray-600 text-xs uppercase tracking-wider">Post-hospitalization days</div>
              </div>
              <div className="text-center p-3 border-r border-gray-200">
                <div className="text-2xl font-bold text-green-600">5000+</div>
                <div className="text-gray-600 text-xs uppercase tracking-wider">Network hospitals</div>
              </div>
              <div className="text-center p-3">
                <div className="text-2xl font-bold text-green-600">24/7</div>
                <div className="text-gray-600 text-xs uppercase tracking-wider">Customer support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
      {/* Benefits Section with Numbered Points */}
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-green-200 blur-3xl mix-blend-multiply"></div>
        <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-gray-300 blur-3xl mix-blend-multiply"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <span className="inline-block bg-green-100 text-green-800 px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide mb-4 border border-green-200">
            Star Health Advantage
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-gray-800">
              Key Features & Benefits
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive protection designed for your healthcare needs
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1 - Customizable Coverage */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-green-300 transition-colors">
            <div className="bg-green-100 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4 border border-green-200">
              <FaSlidersH className="text-green-600 text-xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Customisable Coverage Options</h3>
            <p className="text-gray-600 mb-4">
              Our plans offer flexible coverage including pre/post-hospitalisation expenses, in-patient care, and daycare procedures.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Multiple coverage levels available</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Minimise out-of-pocket expenses</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Tailored to specific medical needs</span>
              </li>
            </ul>
          </div>

          {/* Feature 2 - Tax Benefits */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-green-300 transition-colors">
            <div className="bg-green-100 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4 border border-green-200">
              <FaFileInvoiceDollar className="text-green-600 text-xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Tax Benefits</h3>
            <p className="text-gray-600 mb-4">
              Premiums eligible for tax deductions under Section 80D of the Income Tax Act.
            </p>
            <div className="bg-green-50 p-3 rounded-lg border border-green-100">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-green-800">Note:</span> Consult your tax advisor for details specific to your situation.
              </p>
            </div>
          </div>

          {/* Feature 3 - Lifelong Renewability */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-green-300 transition-colors">
            <div className="bg-green-100 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4 border border-green-200">
              <FaInfinity className="text-green-600 text-xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Lifelong Renewability</h3>
            <p className="text-gray-600 mb-4">
              Age should never be a barrier to quality healthcare coverage.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Continue coverage into golden years</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Protection when medical needs increase</span>
              </li>
            </ul>
          </div>

          {/* Feature 4 - No Claim Bonus */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-green-300 transition-colors">
            <div className="bg-green-100 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4 border border-green-200">
              <FaGift className="text-green-600 text-xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">No Claim Bonus (NCB)</h3>
            <p className="text-gray-600 mb-4">
              Rewarded for maintaining good health and not making claims.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Premium reduction benefits</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Enhanced coverage options</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Long-term savings potential</span>
              </li>
            </ul>
          </div>

          {/* Feature 5 - Add-On Covers */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-green-300 transition-colors">
            <div className="bg-green-100 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4 border border-green-200">
              <FaPlusCircle className="text-green-600 text-xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Add-On Covers</h3>
            <p className="text-gray-600 mb-4">
              Enhance your base policy with optional benefits.
            </p>
            <div className="grid grid-cols-2 gap-2">
              <span className="bg-green-50 text-green-800 text-xs px-2 py-1 rounded">Maternity</span>
              <span className="bg-green-50 text-green-800 text-xs px-2 py-1 rounded">Daycare</span>
              <span className="bg-green-50 text-green-800 text-xs px-2 py-1 rounded">Restoration</span>
              <span className="bg-green-50 text-green-800 text-xs px-2 py-1 rounded">Co-payment</span>
            </div>
          </div>

          {/* Feature 6 - Cashless Hospitalisation */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-green-300 transition-colors">
            <div className="bg-green-100 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4 border border-green-200">
              <FaHospital className="text-green-600 text-xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Cashless Hospitalisation</h3>
            <p className="text-gray-600 mb-4">
              Stress-free treatment at network hospitals.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Direct bill settlement</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Nationwide network coverage</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Emergency support</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <Link href="/contact">
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors border border-green-700 shadow-sm">
              Explore Health Plans
            </button>
          </Link>
          <p className="text-gray-500 text-sm mt-4">
            *Terms and conditions apply. Please read the policy document carefully.
          </p>
        </div>
      </div>
    </section>
    </main>
  );
}
