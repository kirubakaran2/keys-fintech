"use client";
import Link from 'next/link';
import { useState, useEffect } from "react";
import {
  FaShieldAlt,
  FaHeart,
  FaChartLine,
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
                Whole Life Insurance -
                <br />
                <span className="text-black drop-shadow-lg">Policy </span>
              </h1>
              <p
                className={`text-xl text-white/95 mb-10 max-w-lg leading-relaxed drop-shadow-lg transform transition-all duration-1000 ${
                  heroVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: "400ms" }}
              >
                "Secure your family’s future with a Whole Life Insurance policy that offers lifelong protection. Partner with Keys Fintech Financial Consultants to find the perfect plan at the best premium, tailored just for you!"
How does that sound?
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
                    src="https://img.freepik.com/free-vector/people-carrying-icons-related-insurance_53876-59883.jpg?t=st=1748526990~exp=1748530590~hmac=298828de2568e2f1ed9ec95274c03049375e0cd691ed7d2bcffa8b1a12fed875&w=1380"
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
<section id="about" className="bg-gradient-to-br from-indigo-50 to-white relative z-10 text-gray-900 py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Header Section */}
    <div className="text-center mb-16">
      <span className="inline-block bg-green-100 text-green-600 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wide mb-4">
        Whole Life Insurance Explained
      </span>
      <h2 className="text-3xl lg:text-4xl font-semibold mb-4 text-gray-900">
        Secure Your Family's Future with <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">Whole Life Insurance</span>
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Lifetime protection with fixed premiums and guaranteed death benefits
      </p>
    </div>

    {/* Content Grid */}
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Left Column - Image Card */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-xl p-6 h-full flex flex-col">
          <div className="relative mb-6">
            <img
              src="https://img.freepik.com/free-vector/social-security-concept-illustration_23-2150293950.jpg"
              alt="Whole Life Insurance"
              className="w-full rounded-lg shadow-md transform hover:scale-102 transition-all duration-300"
            />
            <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
              <div className="text-center">
                <div className="text-emerald-600 font-black text-2xl">₹20L+</div>
                <div className="text-gray-600 text-sm font-semibold">Average Payout</div>
              </div>
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-4 text-gray-900">Key Features</h3>
          <ul className="space-y-3 flex-grow">
            <li className="flex items-start">
              <FaCheckCircle className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
              <span>Lifetime coverage</span>
            </li>
            <li className="flex items-start">
              <FaCheckCircle className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
              <span>Fixed premium payments</span>
            </li>
            <li className="flex items-start">
              <FaCheckCircle className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
              <span>Guaranteed death benefit</span>
            </li>
            <li className="flex items-start">
              <FaCheckCircle className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
              <span>Potential cash value growth</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Middle Column - Story and How It Works */}
      <div className="lg:col-span-1 space-y-8">
        {/* Ravi's Story */}
        <div className="bg-white rounded-xl shadow-xl p-6 border-l-4 border-blue-500">
          <div className="flex items-center mb-4">
            <FaUser className="text-blue-500 text-2xl mr-3" />
            <h3 className="text-xl font-semibold text-gray-900">Ravi's Story</h3>
          </div>
          <p className="text-gray-600 mb-4">
            At 30, Ravi secured his wife's future with a Whole Life Policy. Paying just ₹600/month for 15 years, he ensured ₹1 Crore protection.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-gray-700 font-medium">
              "At 80, when Ravi passed away, his wife received the full ₹1 Crore benefit."
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-xl shadow-xl p-6 border-l-4 border-green-500">
          <div className="flex items-center mb-4">
            <FaCogs className="text-green-500 text-2xl mr-3" />
            <h3 className="text-xl font-semibold text-gray-900">How It Works</h3>
          </div>
          <div className="space-y-4">
            <div className="flex">
              <div className="bg-green-100 text-green-600 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">1</div>
              <p className="text-gray-600">Pay premiums for 10-15 years</p>
            </div>
            <div className="flex">
              <div className="bg-green-100 text-green-600 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">2</div>
              <p className="text-gray-600">Enjoy lifetime coverage</p>
            </div>
            <div className="flex">
              <div className="bg-green-100 text-green-600 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">3</div>
              <p className="text-gray-600">Your nominee receives the death benefit</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Types and Advice */}
      <div className="lg:col-span-1 space-y-8">
        {/* Types */}
        <div className="bg-white rounded-xl shadow-xl p-6 border-l-4 border-purple-500">
          <div className="flex items-center mb-6">
            <FaShapes className="text-purple-500 text-2xl mr-3" />
            <h3 className="text-xl font-semibold text-gray-900">Policy Types</h3>
          </div>
          <div className="grid gap-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <FaRegLifeRing className="text-purple-500 mr-2" />
                <h4 className="font-semibold">Participating</h4>
              </div>
              <p className="text-gray-600 text-sm">Earn dividends based on company performance</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <FaDollarSign className="text-blue-500 mr-2" />
                <h4 className="font-semibold">Non-Participating</h4>
              </div>
              <p className="text-gray-600 text-sm">Fixed benefits with stable premiums</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <FaMoneyBillAlt className="text-green-500 mr-2" />
                <h4 className="font-semibold">Level Premium</h4>
              </div>
              <p className="text-gray-600 text-sm">Same premium amount throughout</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <FaHandHoldingHeart className="text-red-500 mr-2" />
                <h4 className="font-semibold">Limited Payment</h4>
              </div>
              <p className="text-gray-600 text-sm">Pay premiums for a shorter duration</p>
            </div>
          </div>
        </div>

        {/* Advice */}
        <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-xl shadow-xl p-6 border border-emerald-200">
          <div className="flex items-center mb-4">
            <FaLightbulb className="text-yellow-500 text-2xl mr-3" />
            <h3 className="text-xl font-semibold text-gray-900">Expert Advice</h3>
          </div>
          <p className="text-gray-600">
            At Keys, we recommend evaluating your age, health, and financial goals when choosing coverage. Premiums vary based on these factors.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
      {/* Types Section */}
<section
  id="plans"
  className="py-10 sm:py-16 bg-gradient-to-br from-white to-gray-50 relative z-5 text-gray-900"
>
  <div className="max-w-5xl mx-auto px-4 sm:px-8">
    <div className="text-center mb-12">
      <span className="inline-block bg-green-100 text-green-600 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wide mb-4">
        Life Insurance Comparison
      </span>
      <h2 className="text-3xl sm:text-5xl font-black text-gray-900 leading-tight">
        Difference Between{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-600">
          Term
        </span>{" "}
        and{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-600">
          Whole Life Insurance
        </span>
      </h2>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Term Life Insurance */}
      <div className="p-6 sm:p-8">
        <h3 className="text-xl sm:text-2xl font-bold text-green-600 mb-4">
          Term Life Insurance
        </h3>
        <ul className="space-y-4 text-sm sm:text-base text-gray-700">
          <li>
            <strong>Coverage:</strong> Provides a death benefit only.
          </li>
          <li>
            <strong>Cost:</strong> Generally more affordable than whole life
            insurance.
          </li>
          <li>
            <strong>Policy Duration:</strong> Choose from fixed terms (e.g., 10,
            20, 30 years).
          </li>
          <li>
            <strong>Premiums:</strong> May vary based on the selected term.
          </li>
          <li>
            <strong>Payout:</strong> Beneficiary receives payment only if the
            policyholder passes within the term.
          </li>
          <li>
            <strong>No Cash Value:</strong> No savings or investment component.
          </li>
        </ul>
      </div>

      {/* Whole Life Insurance */}
      <div className="p-6 sm:p-8 bg-gray-50">
        <h3 className="text-xl sm:text-2xl font-bold text-green-600 mb-4">
          Whole Life Insurance
        </h3>
        <ul className="space-y-4 text-sm sm:text-base text-gray-700">
          <li>
            <strong>Coverage:</strong> Provides lifelong coverage (up to 100
            years).
          </li>
          <li>
            <strong>Cost:</strong> More expensive due to added benefits and
            permanent coverage.
          </li>
          <li>
            <strong>Premiums:</strong> Fixed for the life of the policy.
          </li>
          <li>
            <strong>Cash Value & Dividends:</strong> Accumulates savings and may
            pay dividends.
          </li>
          <li>
            <strong>Loan Collateral:</strong> Cash value can be borrowed against.
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>

      {/* Benefits Section with Numbered Points */}
<section className="py-20 sm:py-28 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
  {/* Decorative elements */}
  <div className="absolute top-0 left-0 w-full h-full opacity-10">
    <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-emerald-300 blur-3xl"></div>
    <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-blue-300 blur-3xl"></div>
  </div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
      {/* Left Side - Enhanced Image Card */}
      <AnimatedCard direction="left" delay={100} index={12}>
        <div className="sticky top-20 group perspective-1000">
          <div className="relative transform transition-all duration-700 group-hover:rotate-y-6">
            <img
              src="https://img.freepik.com/free-vector/family-protection-concept-illustration_114360-17288.jpg"
              alt="Insurance Benefits"
              className="w-full max-w-full h-auto rounded-3xl shadow-2xl border-8 border-white transform transition-transform duration-500 hover:scale-[1.02]"
            />
            <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-emerald-500 to-teal-600 p-4 rounded-2xl shadow-xl">
              <div className="text-center text-white">
                <div className="font-black text-3xl">100+</div>
                <div className="text-sm font-semibold opacity-90">Families Protected</div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedCard>

      {/* Right Side - Enhanced Benefits List */}
      <AnimatedCard direction="right" delay={200} index={13}>
        <div>
          <span className="inline-block bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 px-6 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider mb-6 shadow-sm">
            <span className="mr-2">✨</span> Why Choose Whole Life Insurance with Keys Fintech
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-extrabold mb-10 text-gray-900 leading-tight">
            Secure Your Family's Future with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
              Lifetime Protection
            </span>
          </h2>

          <div className="space-y-6">
            {/* Benefit 1 - Enhanced */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-emerald-100 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-start">
                  <div className="bg-emerald-100 p-3 rounded-xl mr-5 flex-shrink-0">
                    <FaShieldAlt className="text-emerald-600 text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                      Lifelong Coverage up to 100 Years
                    </h3>
                    <p className="text-gray-700">
                      Unlike term plans that expire, our whole life policy provides <strong>continuous protection</strong> until age 100. Your family stays safeguarded through every life stage.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefit 2 - Enhanced */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-emerald-100 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-xl mr-5 flex-shrink-0">
                    <FaCalendarCheck className="text-blue-600 text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                      Limited Premium, Lifetime Coverage
                    </h3>
                    <p className="text-gray-700">
                      Pay premiums for just <strong>10-15 years</strong> and enjoy <strong>lifelong protection</strong>. A short-term commitment for enduring peace of mind.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefit 3 - Enhanced */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-emerald-100 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-xl mr-5 flex-shrink-0">
                    <FaFileInvoiceDollar className="text-purple-600 text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                      Dual Tax Advantages
                    </h3>
                    <div className="space-y-3 text-gray-700">
                      <div className="flex items-start">
                        <div className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded mr-3 mt-1">80C</div>
                        <p>Claim deductions up to <strong>₹1.5 lakhs</strong> on premiums paid</p>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded mr-3 mt-1">10(10D)</div>
                        <p><strong>Tax-free</strong> death benefit for your nominee</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Keys Promise - Enhanced */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-8 rounded-3xl shadow-lg border border-emerald-100 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-start">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-3 rounded-xl mr-5 flex-shrink-0">
                  <FaHandshake className="text-white text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                    The Keys Commitment
                  </h3>
                  <p className="text-gray-900">
                    We go beyond selling policies—our advisors provide <strong>personalized financial guidance</strong> to align your coverage with family goals. Expect:
                  </p>
                  <ul className="mt-3 space-y-2">
                    <li className="flex items-center text-black">
                      <FaCheckCircle className="text-emerald-500 mr-2" />
                      <span>Transparent policy comparisons</span>
                    </li>
                    <li className="flex items-center text-black">
                      <FaCheckCircle className="text-emerald-500 mr-2" />
                      <span>Customized coverage recommendations</span>
                    </li>
                    <li className="flex items-center text-black">
                      <FaCheckCircle className="text-emerald-500 mr-2" />
                      <span>Lifetime policy support</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Link href="/contact">
  <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center">
    <FaPhoneAlt className="mr-3" />
    Get Your Personalized Quote Now
  </button>
</Link>
          </div>
        </div>
      </AnimatedCard>
    </div>
  </div>
</section>
    </main>
  );
}
