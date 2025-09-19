'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

// Define message type
type Message = {
  text: string;
  sender: 'bot' | 'user' | 'loading';
};

// Content and answers - easy to extend later by adding new keys
const knowledgeBase: { [key: string]: string } = {
     greeting: `Hello! 👋 How can I help you today? You can ask me about our contact, products, services, documents, or company info.`,
  contact: `📍 No 39 Pinjala Subramaniam Street, T. Nagar, Chennai 600024
📞 +91 9444567777
✉️ christy@christel.in`,

  products: `🛒 Products Offered:
📦 Family Insurance
👥 Group Insurance
🏥 Health Insurance
🧍 Individual Insurance
❤️ Life Insurance
📈 Mutual Fund
📝 Term Insurance
🔗 Unit Linked Insurance
🌍 Whole Life Insurance

Would you like me to explain any product in detail? For example, "Explain Family Insurance".`,

  services: `🧰 Services Offered:
💼 Financial Consultant
📘 How to Invest
📊 Investment Advice
📁 Portfolio Management

Do you want details about any service?`,

  documents: `📄 Documents Required for Insurance:

- Identity Proof (Aadhar, PAN, Passport)
- Address Proof (Utility Bill, Passport, Aadhaar)
- Recent Passport-sized Photographs
- Medical Reports (if applicable)
- Income Proof (for some policies)
- Proposal Form duly signed
- Other documents as per specific plan requirements

Please check your policy brochure or contact us for exact documents.`,

  about: `🏢 Our Story

Est. 2005 | 17+ Years of Excellence

Founded in 2005, Keys Fintech Info emerged as a beacon of trust in the financial advisory landscape. Our journey began with a commitment to redefine financial planning through transparency and client-first values.

From our humble beginnings, we've grown into a national leader, serving thousands with customized financial strategies that withstand market volatility and life's uncertainties.`,

  claim: `🏥 How to Claim Insurance:

1. Inform the insurer as soon as possible.
2. Submit the claim form along with required documents.
3. Provide hospital bills, discharge summary, and medical reports.
4. Follow up with the claims department.
5. Get cashless treatment if available in network hospitals.`,

  premium: `💰 Premiums depend on the plan, age, and coverage amount. I can help you get a custom quote. Would you like that?`,

  consultation: `💼 We offer expert financial consultation. You can book a session with our advisor anytime. Would you like me to connect you?`,
};

// Detailed explanations for specific products (add more here)
const detailedExplanations: { [key: string]: string } = {
'family insurance': `👪 Family Insurance

Protect all family members with one plan:
- Lower cost than individual plans
- Covers 30+ diseases (Diabetes, Cardiac, Cancer, etc.)
- Cashless hospitalization for entire family
- Easy addition of newborns
- Eligible for ₹25K–₹50K tax savings`,

'group insurance': `🏢 Group Health Insurance

Employer-provided health cover:
- Cashless treatment at 5000+ hospitals
- Flexible coverage for employees
- Tax benefits for employer and employees
- Enhances employee wellness and retention`,

'health insurance': `🩺 Health Insurance

Covers medical expenses including hospitalization, surgeries, medicines, and cashless treatment at network hospitals. Includes critical illness cover and tax benefits.`,

'individual insurance': `🧑‍⚕️ Individual Health Insurance

Personalized coverage for you:
- Pre/post hospitalization costs
- Cashless treatment at 5000+ hospitals
- Maternity and critical illness cover
- Room rent and restoration benefits`,

'lifeinsurance': `🛡️ Life Insurance

Financial protection for your loved ones:
- Coverage up to ₹1 Crore
- Provides death and maturity benefits
- Secures family’s future financially`,

'whole life insurance': `🌳 Whole Life Insurance

Lifetime coverage with savings benefits:
- Financial security for your entire life
- Maturity benefits with insurance protection
- Suitable for long-term planning`,

'term insurance': `⏳ Term Insurance

Affordable life cover for fixed term:
- High coverage at low premiums
- Provides death benefit only
- Ideal for family income protection`,

'unit linked insurance': `📊 Unit Linked Insurance Plan (ULIP)

Investment + Insurance combo:
- Invest in market-linked funds
- Insurance coverage included
- Flexibility to switch funds`,

'mutual-fund': `📈 Mutual Fund Investments

Grow your money with professionally managed funds:
- SIPs start at ₹500/month
- Diversified portfolio to reduce risk
- Tax-saving ELSS options available
- Suitable for medium to long-term goals`,

'portfolio management': `💼 Portfolio Management Service

Customized investment strategies combining stocks, bonds, mutual funds, FDs, and ETFs:
- Tailored to your goals and risk appetite
- Regular monitoring and rebalancing
- Tax-efficient asset allocation
- Professional management for optimized returns`,

'investment advice': `🧑‍💼 Investment Advice

Get expert guidance for smarter investing:
- Tailored strategies to match your goals
- Risk assessment and portfolio planning
- Ongoing support and performance reviews`,

'how to invest': `🚀 How to Invest

Simple steps to start your investment journey:
1. Determine investment amount
2. Learn available options
3. Choose based on risk and goals
4. Start SIPs or lump sums
5. Monitor regularly and rebalance`,

'financial consultant': `💼 Financial Consultant

Professional help to plan and grow your wealth:
- Comprehensive financial planning
- Tax optimization strategies
- Retirement, insurance, and investment advice
- Transparent fee structures`,

'investment advisor': `🧑‍💼 Financial Advisor

Expert guidance to plan and grow your investments:
- SEBI-registered professionals
- Help with tax planning and portfolio review
- Fee structures: commission, fixed, hourly
- Personalized advice based on your goals`,

'investment basics': `🚀 Investment Basics

Simple steps to start investing:
1. Decide investment amount
2. Learn your options
3. Match to goals and risk tolerance
4. Invest regularly via SIPs
5. Monitor and review quarterly
6. Reinvest returns for compounding growth`,

'life insurance': `🛡️ Life Insurance

Financial protection for your family:
- Coverage up to ₹1 Crore
- Provides maturity benefits
- Secures your loved ones’ future`,

'health protection': `🩺 Health Protection

Affordable health plans covering:
- Hospitalization, surgeries, medicines
- Pre and post-hospitalization care
- Ambulance, maternity, OPD coverage
- Tax benefits under Section 80D`,

'investment options 2025': `📊 Best Investments 2025

Diversify with:
- Stocks (20-40% returns)
- Mutual Funds (10-18% CAGR)
- Real Estate (12-20% returns)
- Gold (8-12% returns)
- Health & Life Insurance for protection`,

'compounding': `💰 Power of Compounding

Grow your wealth by reinvesting returns:
- ₹500/month at 12% → ₹50L+ in 25 years
- “Interest on interest” accelerates growth
- Start early and stay consistent`,

'performance tracking': `📊 Performance Tracking

Monitor your investments:
- Quarterly reviews and rebalancing
- Track returns and risk metrics
- Adjust portfolio as per market changes`,

'risk management': `🛡️ Risk Management

Protect your portfolio with:
- Diversification across asset classes
- Strategic asset allocation
- Protective strategies during market volatility`,

'tax optimization': `🧾 Tax Optimization

Save taxes legally through:
- ELSS funds and tax-free bonds
- Strategic timing of investments
- Customized tax-saving plans`,

'financial planning': `🎯 Financial Planning

Plan your finances aligned with life goals:
- Home, education, retirement savings
- Emergency fund and insurance cover
- Debt management and cash flow tracking
- Regular portfolio reviews and adjustments`,

'advisor fee': `💸 Advisor Fees

Understand payment models:
- Commission-based: 0.5%–2% of assets/year
- Fixed fees: ₹10,000–₹50,000 annually
- Hourly consultation: ₹1,000–₹3,000 per hour
- Monthly advisor fees: ₹5,000–₹10,000`,

'consultant vs advisor': `👥 Consultant vs Advisor

- Consultant: Focuses on execution and trades
- Advisor: Provides holistic planning and strategy
Both help grow your wealth with SEBI compliance.`,

'investment risks': `⚠️ Investment Risks

Know the risks before investing:
- Market volatility affects returns
- High-risk assets offer higher potential rewards
- Diversify to minimize losses`,

'start investing': `🚀 Start Investing

Begin with small amounts (₹500/month SIPs):
- Benefit from rupee cost averaging
- Long-term consistency beats timing the market
- Review and adjust investments periodically`,



  // Add other product explanations here
};

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi there! Ask me about our contact, products, services, or anything else.", sender: 'bot' },
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  useEffect(() => {
  const handleScroll = () => {
    if (open) {
      setOpen(false); // Close the chat window on scroll
    }
  };

  window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, [open]);


  // Add loading message (typing animation)
  const addLoadingMessage = () => {
    setMessages((prev) => [...prev, { text: '', sender: 'loading' }]);
  };

  // Remove loading message
  const removeLoadingMessage = () => {
    setMessages((prev) => prev.filter((msg) => msg.sender !== 'loading'));
  };
  

  // Simple helper to match intent based on keywords
  const findIntent = (text: string): string | null => {
    text = text.toLowerCase();
     if (['hi', 'hello', 'hey', 'hii', 'hiya'].some(greet => text.includes(greet))) {
    return 'greeting';
  }
    // Check for detailed product explanation
    for (const productKey of Object.keys(detailedExplanations)) {
      if (text.includes(productKey)) return productKey;
    }
    // Basic intents
    if (text.includes('contact')) return 'contact';
    if (text.includes('product')) return 'products';
    if (text.includes('service')) return 'services';
    if (text.includes('document')) return 'documents';
    if (text.includes('about') || text.includes('company') || text.includes('story') || text.includes('who are you')) return 'about';
    if (text.includes('claim')) return 'claim';
    if (text.includes('premium')) return 'premium';
    if (text.includes('consultation') || text.includes('consultant')) return 'consultation';
    // If user says yes/please without specifying
    if (['yes', 'sure', 'please', 'yeah', 'yep', 'ok'].some(w => text === w || text.includes(w))) {
      return 'ask_which_explain';
    }

    return null;
  };

  // Handle user input and generate response
  const respondTo = (text: string) => {
    addLoadingMessage();

    setTimeout(() => {
      removeLoadingMessage();

      const intent = findIntent(text);

      let reply = "I'm not sure what you mean. Try asking about 'contact', 'products', or 'services'.";

      if (!intent) {
        reply = "Sorry, I didn't understand that. You can ask about 'contact', 'products', 'services', 'documents', or 'about the company'.";
      } else if (intent === 'ask_which_explain') {
        reply = "Please specify which product or service you'd like me to explain. For example, 'Explain Family Insurance'.";
      } else if (detailedExplanations[intent]) {
        reply = detailedExplanations[intent] + "\n\nWould you like info on another product or service?";
      } else {
        reply = knowledgeBase[intent] + "\n\nAnything else you'd like to know?";
      }

      setMessages((prev) => [...prev, { text: reply, sender: 'bot' }]);
    }, 1500);
  };

  // Send user message
  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { text: input.trim(), sender: 'user' };
    setMessages((prev) => [...prev, userMsg]);
    respondTo(input.trim().toLowerCase());
    setInput('');
  };

  // Enter key press handler
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  // Loading dots animation component
  const LoadingDots = () => {
    const [dots, setDots] = useState('');
    useEffect(() => {
      const interval = setInterval(() => {
        setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
      }, 500);
      return () => clearInterval(interval);
    }, []);
    return <span>Typing{dots}</span>;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Floating Chat Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-green-600 p-3 rounded-full shadow-lg hover:bg-green-700 transition-all text-white"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="w-80 h-96 bg-white border border-gray-300 rounded-lg flex flex-col shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-green-600 text-white px-4 py-2 flex justify-between items-center">
            <span>💬 ChatBot Assistant</span>
            <button onClick={() => setOpen(false)} className="text-white" aria-label="Close chat">✖</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50 text-sm flex flex-col">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-xs whitespace-pre-wrap px-3 py-2 rounded-lg ${
                  msg.sender === 'bot'
                    ? 'bg-gray-200 text-black self-start'
                    : msg.sender === 'user'
                    ? 'bg-green-500 text-white self-end ml-auto'
                    : 'bg-gray-300 text-gray-600 italic self-start'
                }`}
              >
                {msg.sender === 'loading' ? <LoadingDots /> : msg.text}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="flex border-t border-gray-300">
            <input
              type="text"
              className="flex-1 p-2 text-sm outline-none"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              aria-label="Chat input"
            />
            <button
              onClick={handleSend}
              className="bg-green-600 text-white px-4 text-sm hover:bg-green-700"
              aria-label="Send message"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
