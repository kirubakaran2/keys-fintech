'use client';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaChevronDown } from "react-icons/fa";
import { useState } from "react";



export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    service: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, contact, email, service, message } = formData;

    const htmlBody = `
      <h2>New Appointment Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Contact:</strong> ${contact}</p>
      <p><strong>Email:</strong> ${email || "N/A"}</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Message:</strong> ${message || "No message provided."}</p>
    `;

    try {
      const res = await fetch("/api/sendemail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "christy@christel.in",
          subject: `Appointment Request from ${name}`,
          html: htmlBody,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server error ${res.status}: ${text}`);
      }

      const data = await res.json();
      console.log("Success:", data);

      alert("Appointment request sent successfully!");
      setFormData({ name: "", contact: "", email: "", service: "", message: "" });
    } catch (err: any) {
      console.error("Error sending email:", err);
      alert("Failed to send appointment. Check console for details.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-600 mb-4">
            Set an Appointment
          </h1>
          <p className="text-xl text-gray-300">
            Have Questions Or Need To Report An Issue? We&apos;ve Got You Covered.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-green-400 mb-1"
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-white placeholder-gray-400 transition duration-200"
                  placeholder="Your Name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="contact"
                  className="block text-sm font-medium text-green-400 mb-1"
                >
                  Contact *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    maxLength={10}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-white placeholder-gray-400 transition duration-200"
                    placeholder="Mobile Number"
                    required
                    pattern="\d{10}"
                    title="Enter a 10‐digit number"
                  />
                  <span className="absolute right-3 top-3.5 text-xs text-gray-400">
                    {formData.contact.length}/10
                  </span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-green-400 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-white placeholder-gray-400 transition duration-200"
                  placeholder="example@gmail.com"
                />
              </div>

              <div>
                <label
                  htmlFor="service"
                  className="block text-sm font-medium text-green-400 mb-1"
                >
                  Service *
                </label>
                <div className="relative">
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-white appearance-none transition duration-200"
                    required
                  >
                    <option value="">Select Service</option>
                    <option value="Portfolio Management">Portfolio Management</option>
                    <option value="Investment Advice">Investment Advice</option>
                    <option value="Financial Consultant">Financial Consultant</option>
                    <option value="Mutual Funds">Mutual Funds</option>
                    <option value="Stocks">Stocks</option>
                    <option value="Fixed Deposit">Fixed Deposit</option>
                    <option value="others">Others</option>
                  </select>
                  <FaChevronDown className="absolute right-3 top-4 text-gray-400" />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-green-400 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-white placeholder-gray-400 transition duration-200"
                  placeholder="Your message..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold rounded-lg shadow-lg transition duration-200 transform hover:scale-105"
              >
                Book Appointment
              </button>
            </form>
          </div>

          {/* Contact Info & Map */}
          <div className="space-y-8">
            <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-600 mb-6">
                Contact Information
              </h2>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-2 bg-gray-700 rounded-lg text-green-400">
                    <FaMapMarkerAlt className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">Address</h3>
                    <p className="text-gray-300">No 10, kaliyamman kovil street, sai nagar Virugambakkam</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 p-2 bg-gray-700 rounded-lg text-green-400">
                    <FaPhone className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">Phone</h3>
                    <p className="text-gray-300">9444567777</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 p-2 bg-gray-700 rounded-lg text-green-400">
                    <FaEnvelope className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">Email</h3>
                    <p className="text-gray-300">christy@christel.in</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 p-2 bg-gray-700 rounded-lg text-green-400">
                    <FaClock className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">Working Hours</h3>
                    <p className="text-gray-300">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-300">Saturday: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.627238209647!2d80.195342!3d13.059383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266b6f87db491%3A0x4c13da0c7e59d520!2s10%2C%20Kaliamman%20Koil%20St%2C%20Sri%20Venkatesh%20Nagar%2C%20Sai%20Nagar%2C%20Virugambakkam%2C%20Chennai%2C%20Tamil%20Nadu%20600092!5e0!3m2!1sen!2sin!4v1757917668727!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="rounded-b-2xl"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
