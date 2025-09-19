"use client"

import { motion } from 'framer-motion';
import { 
  FaPercentage, 
  FaMoneyBillWave, 
  FaHandshake, 
  FaBook, 
  FaRupeeSign, 
  FaSearchDollar,
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
  FaShieldAlt,
  FaChartBar,
  FaClock,
  FaExclamationCircle
} from 'react-icons/fa';
import { GiMoneyStack } from 'react-icons/gi';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function LearnPage() {
  return (
    <div className="pt-20 bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-800 to-gray-900 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-gray-300">
                How to Invest?
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl mb-8 text-gray-300"
            >
              Master the art of smart investing to build lasting wealth
            </motion.p>
          </div>
        </div>
        
      </section>

      {/* Introduction */}
      <section className="py-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">Investment Fundamentals</h2>
              <p className="text-gray-400 mb-6">
                Investing is the strategic allocation of capital with the expectation of generating profit over time. Unlike passive saving, investing actively puts your money to work across various asset classes to build wealth.
              </p>
              <p className="text-gray-400 mb-6">
                Whether planning for retirement, education, or financial independence, mastering investment principles is crucial for making informed decisions that align with your goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-gradient-to-r from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 border border-green-700">
                  <Link href="#investment-types">Explore Investment Types</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-green-600 text-green-400 hover:bg-gray-800">
                  <Link href="/contact">Get Expert Advice</Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl border border-gray-700">
                <Image
                  src="https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Investment Planning"
                  width={600}
                  height={400}
                  className="object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Investment Fundamentals */}
      <section className="py-20 bg-gray-800/50" id="investment-fundamentals">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent"
            >
              Core Investment Principles
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-400"
            >
              Foundational concepts every investor should understand before committing capital
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: FaArrowUp, 
                title: "Risk vs. Return", 
                description: "Higher potential returns typically come with higher risk. Lower-risk investments generally offer more modest returns." 
              },
              { 
                icon: FaClock, 
                title: "Time Horizon", 
                description: "The length of time you plan to hold an investment before needing the money impacts your investment strategy." 
              },
              { 
                icon: FaChartBar, 
                title: "Diversification", 
                description: "Spreading investments across different asset classes can help manage risk and potentially improve returns." 
              },
              { 
                icon: FaPercentage, 
                title: "Compound Growth", 
                description: "The exponential effect where your investment returns generate their own returns over time." 
              },
            ].map((concept, index) => (
              <motion.div 
                key={concept.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 shadow-lg hover:border-green-600/50 transition-colors"
              >
                <div className="bg-green-900/30 p-4 rounded-xl border border-green-600/30 inline-flex mb-6">
                  <concept.icon className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{concept.title}</h3>
                <p className="text-gray-400">{concept.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Types */}
      <section className="py-20" id="investment-types">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent"
            >
              Investment Vehicles
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-400"
            >
              Explore different asset classes and their risk-return profiles
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { 
                title: "Mutual Funds", 
                description: "Professionally managed investment pools that combine money from multiple investors to purchase diversified portfolios of stocks, bonds, or other securities.",
                risk: "Low to High (depending on fund type)",
                returnPotential: "Varies based on fund type and market conditions",
                timeHorizon: "Medium to Long-term",
                image: "https://img.freepik.com/free-vector/woman-examining-banknote-man-counting-coins-illustration_1262-18985.jpg?t=st=1748675459~exp=1748679059~hmac=a7f7e076e8161a124b0b4f4ffca66d257d73e7cf0213ace54512bd5d907edd0e&w=1380"
              },
              { 
                title: "Equities", 
                description: "Ownership shares in publicly traded companies that offer capital appreciation and potential dividend income.",
                risk: "Moderate to High",
                returnPotential: "High growth potential over long periods",
                timeHorizon: "5+ years",
                image: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              },
              { 
                title: "Fixed Income", 
                description: "Debt instruments including government and corporate bonds that provide regular interest payments and return principal at maturity.",
                risk: "Low to Moderate",
                returnPotential: "Moderate, typically lower than equities",
                timeHorizon: "1-10 years",
                image: "https://images.pexels.com/photos/7788009/pexels-photo-7788009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              },
              { 
                title: "Alternative Assets", 
                description: "Includes real estate, commodities, private equity, and other non-traditional investments that can diversify portfolios.",
                risk: "Varies widely",
                returnPotential: "Varies by asset class",
                timeHorizon: "Long-term",
                image: "https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              },
            ].map((investment, index) => (
              <motion.div 
                key={investment.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 shadow-lg overflow-hidden hover:border-green-600/50 transition-colors"
              >
                <div className="md:flex">
                  <div className="md:w-1/3 relative h-64 md:h-auto">
                    <Image
                      src={investment.image}
                      alt={investment.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent"></div>
                  </div>
                  <div className="p-6 md:w-2/3">
                    <h3 className="text-2xl font-bold mb-3 text-white">{investment.title}</h3>
                    <p className="text-gray-400 mb-4">{investment.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <FaExclamationCircle className="h-4 w-4 text-amber-500 mr-2" />
                        <span className="text-sm text-gray-300"><strong>Risk:</strong> {investment.risk}</span>
                      </div>
                      <div className="flex items-center">
                        <FaChartLine className="h-4 w-4 text-green-400 mr-2" />
                        <span className="text-sm text-gray-300"><strong>Returns:</strong> {investment.returnPotential}</span>
                      </div>
                      <div className="flex items-center">
                        <FaClock className="h-4 w-4 text-blue-400 mr-2" />
                        <span className="text-sm text-gray-300"><strong>Horizon:</strong> {investment.timeHorizon}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Strategy */}
      <section className="py-20 bg-gray-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent"
            >
              Building Your Investment Framework
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-400"
            >
              A systematic approach to developing your investment strategy
            </motion.p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {[
              { 
                number: "01", 
                title: "Define Financial Objectives", 
                description: "Clearly articulate specific goals (retirement, education, wealth accumulation) with target amounts and timelines." 
              },
              { 
                number: "02", 
                title: "Assess Risk Capacity", 
                description: "Objectively evaluate how much volatility your financial situation can withstand without compromising goals." 
              },
              { 
                number: "03", 
                title: "Determine Asset Allocation", 
                description: "Establish target percentages for different asset classes based on goals, time horizon, and risk tolerance." 
              },
              { 
                number: "04", 
                title: "Implement Diversification", 
                description: "Spread investments across geographies, sectors, and market capitalizations to mitigate concentration risk." 
              },
              { 
                number: "05", 
                title: "Monitor & Rebalance", 
                description: "Regularly review portfolio performance and adjust allocations to maintain target risk levels." 
              },
            ].map((step, index) => (
              <motion.div 
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start mb-8 bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 shadow-lg"
              >
                <div className="bg-green-600 text-white text-2xl font-bold w-16 h-16 flex items-center justify-center rounded-xl flex-shrink-0 mr-6 border border-green-400/30">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-1/4 w-40 h-40 rounded-full bg-gradient-to-r from-green-600 to-gray-700 blur-3xl mix-blend-overlay"></div>
          <div className="absolute bottom-20 right-1/4 w-60 h-60 rounded-full bg-gradient-to-r from-gray-600 to-green-900 blur-3xl mix-blend-overlay"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold mb-6 text-white"
            >
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-gray-300">Begin Investing</span>?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg mb-8 text-gray-300"
            >
              Our financial experts provide personalized investment strategies tailored to your unique financial situation and goals.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild size="lg" className="bg-gradient-to-r from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 text-white border border-green-700 shadow-lg">
                <Link href="/contact">Schedule Consultation</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-green-600 text-green-400 hover:bg-gray-800 shadow-lg">
                <Link href="/services/investment-advice">Explore Services</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}