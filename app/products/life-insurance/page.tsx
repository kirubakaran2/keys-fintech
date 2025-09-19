"use client";

import { useState, useEffect } from "react";
import {
  FaShieldAlt,
  FaHeart,
  FaChartLine,
  FaCalendar,
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

  const insuranceTypes = [
    {
      type: "Term Life Insurance",
      coverage: "Death Benefit Coverage",
      description: "Pure life cover with affordable premiums",
      icon: FaShieldAlt,
    },
    {
      type: "Whole Life Insurance",
      coverage: "Death Benefit (covers up to 99/100 years)",
      description: "Lifetime coverage with cash value",
      icon: FaHeart,
    },
    {
      type: "Endowment Plans",
      coverage: "Life Cover + Return of Premium (if survived)",
      description: "Investment + Insurance combined",
      icon: FaGem,
    },
    {
      type: "Money-Back Plan",
      coverage: "Insurance Cover + Investment",
      description: "Periodic returns during policy term",
      icon: FaDollarSign,
    },
    {
      type: "Unit Linked Insurance Plan (ULIP)",
      coverage: "Insurance Cover + Investment",
      description: "Market-linked investment returns",
      icon: FaChartLine,
    },
    {
      type: "Child Plan",
      coverage: "Insurance Cover + Investment",
      description: "Secure your child's future",
      icon: FaUsers,
    },
    {
      type: "Retirement Plans",
      coverage: "Insurance Cover + Investment",
      description: "Build retirement corpus",
      icon: FaCalendar,
    },
  ];

  const quickBenefits = [
    {
      title: "Return Of Premium",
      subtitle: "(In 4+ Branches)",
      icon: FaChartLine,
      color: "emerald",
    },
    {
      title: "Critical Illness Cover",
      subtitle: "In 30 mins. guaranteed*",
      icon: FaRunning,
      color: "green",
    },
    {
      title: "Tax Benefits",
      subtitle: "For every customer",
      icon: FaFileAlt,
      color: "emerald",
    },
    {
      title: "Affordable Premiums",
      subtitle: "No medical tests~",
      icon: FaCheckCircle,
      color: "green",
    },
  ];

  const keyBenefits = [
    {
      title: "Financial Security",
      desc: "Ensure your family maintains their lifestyle with comprehensive financial protection against life's uncertainties.",
      icon: FaLock,
      points: [
        "Up to ₹10 Crore coverage",
        "Flexible premium payment",
        "Guaranteed claim settlement",
      ],
    },
    {
      title: "Investment Growth",
      desc: "Grow your wealth while staying protected with market-linked returns and bonus declarations.",
      icon: FaChartLine,
      points: [
        "Annual bonus potential",
        "Market-linked returns",
        "Wealth accumulation",
      ],
    },
    {
      title: "Tax Advantages",
      desc: "Maximize savings with tax benefits under Section 80C and tax-free maturity benefits.",
      icon: FaFileAlt,
      points: ["₹1.5L tax deduction", "Tax-free maturity", "LTCG benefits"],
    },
  ];

  const documentRequirements = [
    {
      title: "Identity Proof",
      items: ["Aadhaar Card", "PAN Card", "Passport", "Driving License"],
      icon: FaFileAlt,
    },
    {
      title: "Address Proof",
      items: [
        "Utility Bills",
        "Bank Statement",
        "Rental Agreement",
        "Aadhaar Card",
      ],
      icon: FaHome,
    },
    {
      title: "Income Proof",
      items: [
        "Salary Slips",
        "ITR Documents",
        "Bank Statements",
        "Employment Letter",
      ],
      icon: FaDollarSign,
    },
    {
      title: "Medical Documents",
      items: [
        "Health Check-up",
        "Medical Reports",
        "Prescription History",
        "Family History",
      ],
      icon: FaRunning,
    },
  ];

  const statistics = [
    { number: "50M+", label: "People Protected", icon: FaUsers },
    { number: "₹5000Cr+", label: "Claims Paid", icon: FaDollarSign },
    { number: "99.2%", label: "Claim Settlement", icon: FaCheckCircle },
    { number: "25+", label: "Years Experience", icon: FaAward },
  ];

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
              <div className="mb-6">
                <span className="inline-block bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold border border-white/20 mb-4">
                  <FaAward className="inline w-4 h-4 mr-2" />
                  India's Most Trusted Insurance Provider
                </span>
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black mb-6 leading-tight text-white drop-shadow-2xl">
                Life Insurance -
                <br />
                <span className="text-black drop-shadow-lg">Invest </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 drop-shadow-lg">
                  and Protect
                </span>
              </h1>
              <p
                className={`text-xl text-white/95 mb-10 max-w-lg leading-relaxed drop-shadow-lg transform transition-all duration-1000 ${
                  heroVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: "400ms" }}
              >
                Secure your family's future with comprehensive life insurance
                that grows your wealth while providing unmatched financial
                protection.
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
                    src="https://img.freepik.com/free-vector/family-budget-concept-illustration_114360-23758.jpg?t=st=1748524522~exp=1748528122~hmac=e137bc06246c479978ba2bc6d1137831843c8399f642d36e85af49ea36023654&w=1380"
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
      <section
        id="about"
        className="py-16 bg-gradient-to-br from-gray-50 to-white relative z-10 overflow-hidden text-gray-900"
      >
        <div className="max-w-6xl mx-auto px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Image */}
            <AnimatedCard direction="left" delay={200} index={0}>
              <div className="relative">
                <img
                  src="https://img.freepik.com/free-vector/life-insurance-concept-illustration_114360-8321.jpg"
                  alt="Life Insurance Benefits"
                  className="w-full rounded-3xl shadow-2xl hover:scale-105 transition-all duration-700"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                  <div className="text-center">
                    <div className="text-emerald-600 font-black text-2xl">
                      ₹50L+
                    </div>
                    <div className="text-gray-600 text-sm font-semibold">
                      Average Payout
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedCard>

            {/* Right Side - Content */}
            <AnimatedCard direction="right" delay={100} index={1}>
              <div>
                <span className="inline-block bg-emerald-100 text-emerald-600 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wide mb-6">
                  Understanding Life Insurance
                </span>
                <h2 className="text-5xl font-black mb-8 text-gray-900">
                  What is{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">
                    Life Insurance
                  </span>
                  ?
                </h2>

                <div className="space-y-6 mb-8">
                  {quickBenefits.map((benefit, index) => {
                    const IconComponent = benefit.icon;
                    return (
                      <div
                        key={index}
                        className={`bg-gradient-to-r from-${benefit.color}-50 to-${benefit.color}-100 p-6 rounded-2xl border border-${benefit.color}-200 hover:shadow-lg transition-all duration-300`}
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-12 h-12 bg-gradient-to-r from-${benefit.color}-500 to-${benefit.color}-600 rounded-2xl flex items-center justify-center mr-4 flex-shrink-0`}
                          >
                            <IconComponent className="text-white w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-gray-900">
                              {benefit.title}
                            </h4>
                            <p className="text-gray-600 text-sm">
                              {benefit.subtitle}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <p className="text-gray-600 leading-relaxed text-lg">
                  Life insurance is a contract between you and an insurance
                  company that provides financial protection to your loved ones
                  in case of your untimely demise, while also offering
                  investment opportunities for wealth creation.
                </p>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Types Section */}
      <section
        id="plans"
        className="py-10 sm:py-16 bg-gradient-to-br from-white to-gray-50 relative z-5 text-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <AnimatedCard direction="up" delay={100} index={2}>
            <div className="text-center mb-16 sm:mb-20">
              <span className="inline-block bg-green-100 text-green-600 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wide mb-4 sm:mb-6">
                Choose Your Protection
              </span>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-6 sm:mb-8 text-gray-900 leading-tight">
                What are the Different Types of{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-600">
                  Life Insurance
                </span>
                ?
              </h2>
            </div>
          </AnimatedCard>

          <AnimatedCard direction="up" delay={300} index={3}>
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
              <div className="bg-gradient-to-r from-green-500 via-green-600 to-green-600">
                <div className="bg-white">
                  {/* Table Headers */}
                  <div className="hidden sm:grid grid-cols-3 px-4 sm:px-8 py-4 sm:py-6">
                    <div className="font-black text-gray-900 text-base sm:text-xl">
                      Insurance Type
                    </div>
                    <div className="font-black text-gray-900 text-base sm:text-xl">
                      Coverage Benefits
                    </div>
                    <div className="font-black text-gray-900 text-base sm:text-xl">
                      Description
                    </div>
                  </div>
                </div>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-gray-100">
                {insuranceTypes.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <AnimatedCard
                      key={index}
                      delay={400 + index * 100}
                      index={index + 4}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 sm:px-8 py-6 sm:py-8 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group">
                        {/* Insurance Type */}
                        <div className="flex items-center">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-green-700 rounded-xl flex items-center justify-center mr-3 sm:mr-4 group-hover:scale-110 transition-all duration-300">
                            <IconComponent className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                          </div>
                          <span className="text-gray-900 font-bold text-base sm:text-lg">
                            {item.type}
                          </span>
                        </div>

                        {/* Coverage Benefits */}
                        <div className="text-gray-700 font-medium text-sm sm:text-lg flex items-center">
                          <span className="sm:hidden font-semibold mr-2">
                            Benefits:
                          </span>{" "}
                          {item.coverage}
                        </div>

                        {/* Description */}
                        <div className="text-gray-600 text-sm sm:text-base flex items-center">
                          <span className="sm:hidden font-semibold mr-2">
                            Details:
                          </span>{" "}
                          {item.description}
                        </div>
                      </div>
                    </AnimatedCard>
                  );
                })}
              </div>
            </div>
          </AnimatedCard>
        </div>
      </section>

      {/* Benefits Section with Numbered Points */}
      <section className="py-20 sm:py-28 bg-gradient-to-br from-gray-50 to-white relative z-10 text-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Side - Image */}
            <AnimatedCard direction="left" delay={100} index={12}>
              <div className="sticky top-20">
                <img
                  src="https://img.freepik.com/free-vector/protection-concept-illustration_114360-17737.jpg?t=st=1748522750~exp=1748526350~hmac=afcc2854564ce3bd21ed48de958363c874f0af0d1003be70c93d4e526023ec5f&w=2000"
                  alt="Insurance Benefits"
                  className="w-full max-w-full h-auto rounded-3xl shadow-2xl"
                />
              </div>
            </AnimatedCard>

            {/* Right Side - Benefits List */}
            <AnimatedCard direction="right" delay={200} index={13}>
              <div>
                <span className="inline-block bg-green-100 text-green-600 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wide mb-6 text-center">
                  Why Choose Life Insurance
                </span>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-10 text-gray-900">
                  What's the{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                    Benefit
                  </span>
                  ?
                </h2>

                <div className="space-y-8">
                  {keyBenefits.map((benefit, index) => {
                    const IconComponent = benefit.icon;
                    const isSelected = selectedBenefit === index;

                    return (
                      <div
                        key={index}
                        onClick={() => setSelectedBenefit(index)}
                        className={`bg-white p-6 sm:p-8 rounded-3xl shadow-xl border-2 ${
                          isSelected
                            ? "border-emerald-500"
                            : "border-transparent"
                        } hover:border-emerald-200 transition-all duration-300 cursor-pointer`}
                      >
                        <div className="flex flex-col sm:flex-row items-start">
                          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-4 sm:mb-0 sm:mr-6 flex-shrink-0">
                            <IconComponent className="text-white w-6 h-6 sm:w-8 sm:h-8" />
                          </div>
                          <div>
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                              {benefit.title}
                            </h3>
                            <p className="text-gray-600 mb-4">{benefit.desc}</p>
                            <ul className="space-y-2">
                              {benefit.points.map((point, pointIndex) => (
                                <li
                                  key={pointIndex}
                                  className="flex items-start"
                                >
                                  <FaCheckCircle className="text-emerald-500 w-5 h-5 mr-2 mt-1 flex-shrink-0" />
                                  <span className="text-gray-700">{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 md:py-16 bg-gradient-to-br from-white to-gray-50 relative z-10 text-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center mb-12 md:mb-20">
            <span className="inline-block bg-green-100 text-green-600 px-4 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wide mb-4 sm:mb-6">
              Easy Process
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-6 sm:mb-8 text-gray-900 leading-tight">
              Document{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-700">
                Requirements
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {documentRequirements.map((requirement, index) => {
              const IconComponent = requirement.icon;
              const isSelected = selectedRequirement === index;

              return (
                <AnimatedCard
                  key={index}
                  delay={200 + index * 100}
                  index={index + 14}
                >
                  <div
                    onClick={() => setSelectedRequirement(index)}
                    className={`bg-white p-6 sm:p-8 rounded-3xl shadow-xl border-2 ${
                      isSelected ? "border-green-500" : "border-transparent"
                    } hover:border-green-200 transition-all duration-300 cursor-pointer`}
                  >
                    <div className="flex items-start mb-4 sm:mb-6">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-green-700 rounded-xl flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                        <IconComponent className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                        {requirement.title}
                      </h3>
                    </div>
                    <ul className="space-y-2 sm:space-y-3">
                      {requirement.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 mt-2 flex-shrink-0" />
                          <span className="text-sm sm:text-base text-gray-700">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 relative z-10 text-white">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <AnimatedCard direction="up" delay={100} index={18}>
            <div>
              <h2 className="text-5xl font-black mb-8">
                Ready to Secure Your Future?
              </h2>
              <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
                Take the first step towards financial security for you and your
                loved ones. Our experts are here to guide you through the
                process.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <a
                  href="/products/life-insurance"
                  className="group bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 text-white font-bold px-10 py-5 rounded-2xl shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/60 hover:-translate-y-3 hover:scale-105 transition-all duration-300 text-center relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
            </div>
          </AnimatedCard>
        </div>

        {/* Statistics Bar — now in normal flow, appears below all content */}
        <div className="mt-20 px-8">
          <div
            className={`bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl transform transition-all duration-1000 ${
              statsVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {statistics.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={index}
                    className="text-center group hover:scale-110 transition-transform duration-300"
                  >
                    <div className="text-emerald-400 mb-2 flex justify-center">
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <div className="text-white font-black text-2xl lg:text-3xl mb-1">
                      {stat.number}
                    </div>
                    <div className="text-white/80 text-sm font-semibold">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
