"use client";

import {
  ArrowRight,
  Sparkles,
  Shield,
  Phone as PhoneIcon,
  Mail as MailIcon,
  User as UserIcon,
  Calendar,
  CheckCircle,
  Star,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function CTASection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  interface FormDataInterface {
    name: string;
    phone: string;
    email: string;
    service: string;
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, phone, email, service } = formData;

    // Build an HTML body that includes all fields
    const htmlBody = `
      <h2>New Callback Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Service Interested:</strong> ${service}</p>
    `;

    try {
      const res = await fetch("/api/sendemail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "kirubakaran003k2@gmail.com",
          subject: `Callback Request from ${name}`,
          html: htmlBody,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server error ${res.status}: ${text}`);
      }

      const data = await res.json();
      console.log("Email sent:", data);

      alert("We received your request! We’ll call you soon.");
      setFormData({ name: "", phone: "", email: "", service: "" });
    } catch (err: any) {
      console.error("Error sending email:", err);
      alert("Failed to send request. Please try again later.");
    }
  };

  return (
    <section className="relative py-24 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-white/10 to-transparent blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-blue-400/20 to-transparent blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-white/5 to-transparent blur-3xl"></div>
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-sm font-semibold">
              <Sparkles className="w-4 h-4" />
              Start Your Journey Today
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                Ready to Secure Your{" "}
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Financial Future?
                </span>
              </h2>
              <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-lg">
                Our team of experts is ready to help you create a personalized
                financial plan that aligns with your goals and secures your
                future.
              </p>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-white/90">4.9/5 Rating</span>
              </div>
              <div className="w-px h-4 bg-white/30"></div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-300" />
                <span className="text-white/90">10,000+ Clients</span>
              </div>
              <div className="w-px h-4 bg-white/30"></div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-300" />
                <span className="text-white/90">Free Consultation</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <button className="group relative px-8 py-4 bg-white text-emerald-700 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Contact Us
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-teal-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </Link>
              <Link href="/services/portfolio-management">
                <button className="px-8 py-4 border-2 border-white/30 text-white rounded-2xl font-semibold text-lg hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-all duration-300 hover:scale-105">
                  Explore Services
                </button>
              </Link>
            </div>

            {/* Additional info */}
            <div className="text-white/70 text-sm">
              <p>📞 Get a callback within 30 minutes • 💼 No hidden fees • 🔒 100% secure</p>
            </div>
          </div>

          {/* Right Form */}
          <div className="relative">
            <div className="relative bg-white/15 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20">
              {/* Form Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-semibold mb-4">
                  <Calendar className="w-4 h-4" />
                  Free Consultation
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">Get Started Today</h3>
                <p className="text-white/80">
                  Fill out the form and we'll get back to you within 30 minutes
                </p>
              </div>

              {/* ↪ Wrap inputs in a form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-white/90"
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border-2 text-white placeholder-white/50 focus:outline-none transition-all duration-300 ${
                          focusedField === "name"
                            ? "border-white/60 bg-white/20"
                            : "border-white/20"
                        }`}
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-white/90"
                    >
                      Phone Number
                    </label>
                    <div className="relative">
                      <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField("phone")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border-2 text-white placeholder-white/50 focus:outline-none transition-all duration-300 ${
                          focusedField === "phone"
                            ? "border-white/60 bg-white/20"
                            : "border-white/20"
                        }`}
                        placeholder="Your phone number"
                        required
                        pattern="\d{10}"
                        title="Enter a 10-digit number"
                      />
                    </div>
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-white/90"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border-2 text-white placeholder-white/50 focus:outline-none transition-all duration-300 ${
                        focusedField === "email"
                          ? "border-white/60 bg-white/20"
                          : "border-white/20"
                      }`}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Service Selection */}
                <div className="space-y-2">
                  <label
                    htmlFor="service"
                    className="block text-sm font-semibold text-white/90"
                  >
                    Service Interest
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("service")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border-2 text-white focus:outline-none transition-all duration-300 ${
                      focusedField === "service"
                        ? "border-white/60 bg-white/20"
                        : "border-white/20"
                    }`}
                    required
                  >
                    <option value="" className="text-gray-800">
                      Select a Service
                    </option>
                    <option value="life-insurance" className="text-gray-800">
                      Life Insurance
                    </option>
                    <option value="health-insurance" className="text-gray-800">
                      Health Insurance
                    </option>
                    <option value="investment" className="text-gray-800">
                      Investment Planning
                    </option>
                    <option value="portfolio" className="text-gray-800">
                      Portfolio Management
                    </option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="group relative w-full px-8 py-4 bg-gradient-to-r from-white to-gray-100 text-emerald-700 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Request Free Callback
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-teal-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </form>

              {/* Form footer */}
              <div className="text-center mt-6 text-white/60 text-sm">
                <p>🔒 Your information is secure and never shared with third parties</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
