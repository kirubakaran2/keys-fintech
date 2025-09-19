"use client";
import Link from 'next/link';
import { useState, useEffect } from "react";
import {
  FaShieldAlt,
  FaHeartbeat,
  FaChartLine,FaUserMd,FaHospital,FaSearch,
  FaBolt,FaRupeeSign,FaHandHoldingUsd,
    FaHandshake,
  FaBriefcase,
  FaCheck,
  FaUserShield,
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
                Group Insurance
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
"Employees are like family—so why not protect them like one? Group health insurance provides comprehensive coverage for all your employees, often at discounted rates."
</p>             <div
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
                    src="https://img.freepik.com/free-vector/protection-concept-illustration_23-2150293956.jpg?t=st=1748621088~exp=1748624688~hmac=4cd0d01bf03d3f4032b9f8519c2276d3656649e132036de6fc386f1fe048b95e&w=1380"
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
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-green-200 blur-3xl mix-blend-multiply"></div>
        <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-gray-300 blur-3xl mix-blend-multiply"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <span className="inline-block bg-green-100 text-green-800 px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide mb-4 border border-green-200">
            Workplace Wellness
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-gray-800">
              Group Health Insurance: Smart Protection for Teams
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Strengthen your workforce with comprehensive healthcare coverage that benefits both employers and employees
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Coverage */}
          <div className="space-y-8">
            {/* Coverage Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-green-300 transition-colors">
              <div className="flex items-start mb-4">
                <div className="bg-green-100 p-3 rounded-lg mr-4 border border-green-200">
                  <FaUserShield className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Employee Coverage</h3>
                  <p className="text-gray-600">
                    Predefined coverage limits that employees can claim for medical expenses. Higher coverage options available with adjusted premiums.
                  </p>
                  <div className="mt-4 bg-green-50 p-3 rounded-lg border border-green-100">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold text-green-800">Flexible:</span> Employers can choose coverage levels based on team needs and budget
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Network Hospitals Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-green-300 transition-colors">
              <div className="flex items-start mb-4">
                <div className="bg-green-100 p-3 rounded-lg mr-4 border border-green-200">
                  <FaHospital className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Network Hospital Access</h3>
                  <p className="text-gray-600">
                    Cashless treatment at thousands of network hospitals nationwide. Wider networks mean better accessibility for your team.
                  </p>
                  <div className="mt-3 flex items-center">
                    <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full mr-2 border border-green-200">5,000+</span>
                    <span className="text-sm text-gray-600">Cashless healthcare facilities</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Benefits */}
          <div className="space-y-8">
            {/* For Employers Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-green-300 transition-colors">
              <div className="flex items-start mb-4">
                <div className="bg-green-100 p-3 rounded-lg mr-4 border border-green-200">
                  <FaBriefcase className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">For Organizations of All Sizes</h3>
                  <p className="text-gray-600">
                    Whether you have 5 or 5,000 employees, group insurance boosts morale, productivity, and demonstrates your commitment to employee wellbeing.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span>Reduces healthcare financial stress</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span>Enhances employee retention</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span>Tax benefits for the company</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Value Proposition Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-green-300 transition-colors">
              <div className="flex items-start mb-4">
                <div className="bg-green-100 p-3 rounded-lg mr-4 border border-green-200">
                  <FaHandshake className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">More Than Just Coverage</h3>
                  <p className="text-gray-600">
                    Group health insurance builds loyalty and engagement by showing employees they're valued beyond their work contributions.
                  </p>
                  <div className="mt-4 flex items-center">
                    <div className="bg-green-100 p-2 rounded-lg mr-3 border border-green-200">
                      <FaChartLine className="text-green-600" />
                    </div>
                    <span className="text-sm text-gray-600">
                      Companies with health benefits see <span className="font-semibold">27% higher productivity</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Considerations */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <div className="bg-green-100 p-2 rounded-lg mr-3 border border-green-200">
              <FaSearch className="text-green-600" />
            </div>
            Choosing the Right Group Health Plan
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Consideration 1 */}
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-bold text-gray-800 mb-2">Coverage Level</h4>
              <p className="text-gray-600 text-sm">
                Balance employee needs with budget constraints when selecting coverage amounts
              </p>
            </div>

            {/* Consideration 2 */}
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-bold text-gray-800 mb-2">Premium Costs</h4>
              <p className="text-gray-600 text-sm">
                Understand how group size and employee demographics affect pricing
              </p>
            </div>

            {/* Consideration 3 */}
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-bold text-gray-800 mb-2">Network Quality</h4>
              <p className="text-gray-600 text-sm">
                Evaluate hospital networks near your offices and employee locations
              </p>
            </div>

            {/* Consideration 4 */}
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-bold text-gray-800 mb-2">Claim Process</h4>
              <p className="text-gray-600 text-sm">
                Look for insurers with fast, digital claims and strong support
              </p>
            </div>

            {/* Consideration 5 */}
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-bold text-gray-800 mb-2">Additional Benefits</h4>
              <p className="text-gray-600 text-sm">
                Consider maternity, wellness programs, or OPD coverage
              </p>
            </div>

            {/* Consideration 6 */}
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-bold text-gray-800 mb-2">Scalability</h4>
              <p className="text-gray-600 text-sm">
                Ensure the plan can grow with your organization
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Link href="/contact">
          <button className="bg-gradient-to-r from-green-600 to-gray-800 hover:from-green-700 hover:to-gray-900 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-sm mb-3">
            Get Group Insurance Quote
          </button>
          </Link>
          <p className="text-gray-500 text-sm">
            *Terms apply. Premiums may vary based on group size and employee demographics.
          </p>
        </div>
      </div>
    </section>
      {/* Benefits Section with Numbered Points */}
    <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-48 h-48 rounded-full bg-green-700 blur-3xl mix-blend-overlay"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-gray-600 blur-3xl mix-blend-overlay"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <span className="inline-block bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide mb-4">
            Employee Wellness Advantage
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-gray-200">
              Why Group Health Insurance Matters
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Strategic benefits that protect your team and strengthen your organization
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Benefit 1 - Talent Attraction */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 hover:border-green-500 transition-all hover:shadow-lg hover:shadow-green-500/10">
            <div className="bg-green-900/50 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4 border border-green-500/30">
              <FaUserShield className="text-green-400 text-xl" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Talent Magnet</h3>
            <p className="text-gray-300 mb-4">
              60% of employees prioritize health benefits when choosing employers.
            </p>
            <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
              <p className="text-sm text-gray-300">
                <span className="font-semibold text-green-400">SHRM Data:</span> Essential for competitive hiring.
              </p>
            </div>
          </div>

          {/* Benefit 2 - Productivity */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 hover:border-green-500 transition-all hover:shadow-lg hover:shadow-green-500/10">
            <div className="bg-green-900/50 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4 border border-green-500/30">
              <FaChartLine className="text-green-400 text-xl" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Productivity Boost</h3>
            <p className="text-gray-300 mb-4">
              WHO reports show 20-25% productivity loss from poor health.
            </p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                <span>Reduces absenteeism</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                <span>Improves focus</span>
              </li>
            </ul>
          </div>

          {/* Benefit 3 - Tax Savings */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 hover:border-green-500 transition-all hover:shadow-lg hover:shadow-green-500/10">
            <div className="bg-green-900/50 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4 border border-green-500/30">
              <FaHandHoldingUsd className="text-green-400 text-xl" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Tax Efficiency</h3>
            <p className="text-gray-300 mb-4">
              Premiums are tax-deductible under Section 80D.
            </p>
            <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
              <p className="text-sm text-gray-300">
                <span className="font-semibold text-green-400">Financial Benefit:</span> Reduce taxable income while protecting employees.
              </p>
            </div>
          </div>

          {/* Benefit 4 - Compliance */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 hover:border-green-500 transition-all hover:shadow-lg hover:shadow-green-500/10">
            <div className="bg-green-900/50 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4 border border-green-500/30">
              <FaBalanceScale className="text-green-400 text-xl" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Regulatory Compliance</h3>
            <p className="text-gray-300 mb-4">
              Meets Social Security Code 2020 requirements.
            </p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                <span>Avoid penalties</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                <span>Future-proof your business</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-gray-200">
              Comprehensive Coverage Features
            </span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 - Ancillary Coverage */}
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-green-500 transition-all group">
              <div className="flex items-start">
                <div className="bg-green-900/50 p-3 rounded-lg w-12 h-12 flex items-center justify-center mr-4 border border-green-500/30 group-hover:bg-green-500/20 transition-colors">
                  <FaAmbulance className="text-green-400 text-xl" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Ancillary Expenses</h4>
                  <p className="text-gray-300">Covers ambulance charges and other support costs during emergencies.</p>
                </div>
              </div>
            </div>

            {/* Feature 2 - No Medical Tests */}
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-green-500 transition-all group">
              <div className="flex items-start">
                <div className="bg-green-900/50 p-3 rounded-lg w-12 h-12 flex items-center justify-center mr-4 border border-green-500/30 group-hover:bg-green-500/20 transition-colors">
                  <FaUserMd className="text-green-400 text-xl" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">No Medical Screening</h4>
                  <p className="text-gray-300">Quick enrollment without medical tests for inclusive coverage.</p>
                </div>
              </div>
            </div>

            {/* Feature 3 - Cost Effective */}
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-green-500 transition-all group">
              <div className="flex items-start">
                <div className="bg-green-900/50 p-3 rounded-lg w-12 h-12 flex items-center justify-center mr-4 border border-green-500/30 group-hover:bg-green-500/20 transition-colors">
                  <FaHandHoldingUsd className="text-green-400 text-xl" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Cost-Effective</h4>
                  <p className="text-gray-300">Lower premiums than individual plans with broader coverage.</p>
                </div>
              </div>
            </div>

            {/* Feature 4 - Cashless */}
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-green-500 transition-all group">
              <div className="flex items-start">
                <div className="bg-green-900/50 p-3 rounded-lg w-12 h-12 flex items-center justify-center mr-4 border border-green-500/30 group-hover:bg-green-500/20 transition-colors">
                  <FaHeartbeat className="text-green-400 text-xl" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Cashless Treatment</h4>
                  <p className="text-gray-300">Network hospitals provide care without upfront payments.</p>
                </div>
              </div>
            </div>

            {/* Feature 5 - Extended Coverage */}
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-green-500 transition-all group">
              <div className="flex items-start">
                <div className="bg-green-900/50 p-3 rounded-lg w-12 h-12 flex items-center justify-center mr-4 border border-green-500/30 group-hover:bg-green-500/20 transition-colors">
                  <FaUserMd className="text-green-400 text-xl" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Extended Protection</h4>
                  <p className="text-gray-300">Covers 30 days pre and 60 days post-hospitalization expenses.</p>
                </div>
              </div>
            </div>

            {/* Feature 6 - Wellness */}
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-green-500 transition-all group">
              <div className="flex items-start">
                <div className="bg-green-900/50 p-3 rounded-lg w-12 h-12 flex items-center justify-center mr-4 border border-green-500/30 group-hover:bg-green-500/20 transition-colors">
                  <FaHeartbeat className="text-green-400 text-xl" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Wellness Benefits</h4>
                  <p className="text-gray-300">Optional health check-ups and mental wellness programs.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Link href="/contact">
          <button className="bg-gradient-to-r from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 text-white font-bold py-3 px-8 rounded-lg transition-all border border-green-700 shadow-lg hover:shadow-green-500/30">
            Design Your Group Health Plan
          </button>
          </Link>
          <p className="text-gray-400 text-sm mt-4">
            *Customizable plans available for organizations of all sizes
          </p>
        </div>
      </div>
    </section>
    </main>
  );
}
