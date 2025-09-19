"use client";
import Link from 'next/link';
import { useState, useEffect } from "react";
import {
  FaShieldAlt,
  FaHeart,
  FaChartLine,FaDotCircle,FaHospital,FaUserShield,
  FaRegLifeRing,FaProcedures,FaFileInvoiceDollar,
  FaMoneyBillWave,
  FaPills,
  FaClipboardList,
  FaCity,
  FaUserGraduate,
  FaSearch,
  FaShoppingCart,
  FaFileSignature,
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
                Health Insurance
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
"Integrate insurance with your preferred investment option and secure guaranteed returns upon completing your policy term."              </p>
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

<section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-blue-200 blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-indigo-200 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <span className="inline-block bg-green-100 text-green-700 px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide mb-4">
            Health Protection
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">Health Insurance</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Financial security for medical emergencies with affordable premium plans
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div>
            <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Health Insurance Overview</h3>
              <p className="text-gray-600 mb-4">
                Health Insurance provides coverage for medical expenses, offering financial protection during health emergencies. 
                It covers a range of medical costs including surgery, medications, treatments, and hospital services, ensuring 
                you're financially secure when you need it most.
              </p>
              <p className="text-gray-600">
                In simple terms, health insurance helps you manage medical expenses by paying a small monthly premium. 
                Group health insurance, often part of employee benefit schemes, offers partial coverage from the employer, 
                supporting the welfare of employees.
              </p>
            </div>

            {/* How It Works */}
            <div className="bg-indigo-50 p-6 rounded-xl border-l-4 border-indigo-500">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                  <FaChartLine className="text-indigo-600 text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">How Health Insurance Works</h3>
              </div>
              <p className="text-gray-700 mb-3">
                Imagine a city with 100 people, and one of them, Ravi, opts for a health insurance policy worth 1 Cr until age 54. 
                Statistically, only about 15% will claim insurance, meaning only 15 people will make a claim. 
                The remaining premiums help cover these claims.
              </p>
              <p className="text-gray-700">
                This is the fundamental principle of insurance—spreading individual risk across a large group. 
                As long as widespread health crises don't occur, the system remains sustainable and claims are covered.
              </p>
            </div>
          </div>

          {/* Right Column - Benefits & Images */}
          <div className="space-y-8">
            {/* Benefits Card */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <FaShieldAlt className="text-green-500 mr-3" />
                Key Benefits of Health Insurance
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { 
                    icon: <FaMoneyBillWave className="text-green-500" />, 
                    title: "Return of Premium", 
                    desc: "Available in 4+ branches" 
                  },
                  { 
                    icon: <FaHospital className="text-green-500" />, 
                    title: "Critical Illness Cover", 
                    desc: "Guaranteed in 30 minutes*" 
                  },
                  { 
                    icon: <FaFileInvoiceDollar className="text-green-500" />, 
                    title: "Tax Benefits", 
                    desc: "For every customer" 
                  },
                  { 
                    icon: <FaUserShield className="text-green-500" />, 
                    title: "Affordable Premiums", 
                    desc: "No medical tests required" 
                  }
                ].map((benefit, index) => (
                  <div key={index} className="bg-blue-50 p-4 rounded-lg flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      {benefit.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{benefit.title}</h4>
                      <p className="text-gray-600 text-sm">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative rounded-xl overflow-hidden shadow-lg h-48">
                <img
                  src="https://img.freepik.com/free-vector/health-insurance-concept-idea-security-protection-property-life-from-damage-healthcare-medical-service-isolated-flat-vector-illustration_613284-628.jpg"
                  alt="Health Insurance Concept"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-4">
                  <h3 className="text-white font-medium">Medical Coverage</h3>
                </div>
              </div>
              <div className="relative rounded-xl overflow-hidden shadow-lg h-48">
                <img
                  src="https://img.freepik.com/free-vector/flat-design-employee-benefits-illustration_23-2149498644.jpg"
                  alt="Employee Benefits"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-4">
                  <h3 className="text-white font-medium">Employee Benefits</h3>
                </div>
              </div>
            </div>

            {/* Coverage Details */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaProcedures className="text-indigo-500 mr-3" />
                What's Covered
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center">
                  <FaPills className="text-indigo-400 mr-2" />
                  <span className="text-gray-700">Medications</span>
                </div>
                <div className="flex items-center">
                  <FaHospital className="text-indigo-400 mr-2" />
                  <span className="text-gray-700">Hospitalization</span>
                </div>
                <div className="flex items-center">
                  <FaProcedures className="text-indigo-400 mr-2" />
                  <span className="text-gray-700">Surgeries</span>
                </div>
                <div className="flex items-center">
                  <FaUserShield className="text-indigo-400 mr-2" />
                  <span className="text-gray-700">Preventive Care</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
      {/* Benefits Section with Numbered Points */}
    <section className="py-16 bg-gradient-to-br from-teal-50 to-blue-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-teal-200 blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-blue-200 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Purchase Process */}
          <div>
            <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-teal-500">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
                  Step-by-Step
                </span> Guide
              </h2>
              <p className="text-gray-600 mb-8">Follow these easy steps to buy your preferred policy quickly and smoothly:</p>

              <div className="space-y-6">
                {[
                  {
                    icon: <FaClipboardList className="text-teal-600 text-xl" />,
                    step: "Step 1",
                    title: "Complete the Form",
                    description: "Provide basic information at the top of this page"
                  },
                  {
                    icon: <FaCity className="text-teal-600 text-xl" />,
                    step: "Step 2",
                    title: "Select Income & City",
                    description: "Choose your income bracket and location, then click 'Proceed'"
                  },
                  {
                    icon: <FaUserGraduate className="text-teal-600 text-xl" />,
                    step: "Step 3",
                    title: "Education & Occupation",
                    description: "Enter your education level and employment details"
                  },
                  {
                    icon: <FaSearch className="text-teal-600 text-xl" />,
                    step: "Step 4",
                    title: "Browse Plans",
                    description: "Review available options and click 'Buy this plan'"
                  },
                  {
                    icon: <FaShoppingCart className="text-teal-600 text-xl" />,
                    step: "Step 5",
                    title: "Customize Your Plan",
                    description: "Select term length, payment period, and additional riders"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex group">
                    <div className="flex flex-col items-center mr-4">
                      <div className="bg-teal-100 group-hover:bg-teal-200 transition-colors p-3 rounded-full">
                        {item.icon}
                      </div>
                      {index < 4 && (
                        <div className="h-full w-0.5 bg-teal-100 mt-2"></div>
                      )}
                    </div>
                    <div className="pb-6">
                      <span className="inline-block bg-teal-100 text-teal-800 text-xs font-bold px-2 py-1 rounded-full mb-1">
                        {item.step}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Insurance Overview */}
          <div>
            {/* Health Insurance at a Glance */}
            <div className="bg-white p-8 rounded-2xl shadow-xl mb-8 border-t-4 border-blue-500">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
                Health Insurance <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">at a Glance</span>
              </h2>
              <p className="text-gray-600 mb-6">
                Health insurance is a financial agreement between you and an insurance provider that helps cover the cost of medical care. 
                It acts as a safeguard against high healthcare expenses, offering protection for services like hospital stays, 
                doctor visits, prescription medications, and preventive care.
              </p>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-center">
                  <FaFileSignature className="text-blue-500 mr-3 text-xl" />
                  <span className="font-semibold text-blue-800">Did you know?</span>
                </div>
                <p className="text-blue-700 mt-2">
                  Policies with ₹5L+ coverage can reduce out-of-pocket expenses by 90% during hospitalization.
                </p>
              </div>
            </div>

            {/* Coverage Highlights */}
            <div className="bg-white p-6 rounded-2xl shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <FaHospital className="text-green-500 mr-3" />
                Highlights of Health Insurance Plans
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: <FaStethoscope />, feature: "Free Health Check-ups", available: "Available" },
                  { icon: <FaFileInvoiceDollar />, feature: "Sum Insured", available: "₹50,000 to ₹6 crore" },
                  { icon: <FaAmbulance />, feature: "Ambulance Cover", available: "Available" },
                  { icon: <FaHospital />, feature: "ICU Charges", available: "Covered" },
                  { icon: <FaProcedures />, feature: "Pre & Post-Hospitalization", available: "Covered" },
                  { icon: <FaFileInvoiceDollar />, feature: "Tax Benefits", available: "Up to ₹1,00,000/year" },
                  { icon: <FaClinicMedical />, feature: "Day Care Procedures", available: "Covered" },
                  { icon: <FaBaby />, feature: "Maternity Cover", available: "Available" },
                  { icon: <FaStethoscope />, feature: "Pre-existing Diseases", available: "Covered*" },
                  { icon: <FaClinicMedical />, feature: "OPD Cover", available: "Available" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start p-3 hover:bg-green-50 rounded-lg transition-colors">
                    <div className="bg-green-100 p-2 rounded-full mr-3 text-green-600">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{item.feature}</h4>
                      <span className="text-sm text-green-600 font-medium">{item.available}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </main>
  );
}
