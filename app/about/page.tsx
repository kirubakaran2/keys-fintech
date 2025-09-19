"use client"

import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Award, 
  TrendingUp, 
  Users, 
  Shield, 
  CheckCircle,
  Calendar,
  Leaf,
  BarChart2,
  Globe,
  Handshake
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-20 bg-gray-100 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 text-white py-24">
        <div className="absolute inset-0 bg-black/50 z-0" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-6xl font-bold mb-6 tracking-tight"
            >
              <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">About</span> Keys Fintech
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
            >
              Pioneering financial solutions with integrity and innovation since 2005
            </motion.p>
          </div>
        </div>
        <div className="absolute -bottom-6 left-0 right-0 h-16 bg-gradient-to-b from-emerald-900/80 to-transparent transform -skew-y-3 z-0"></div>
      </section>

      {/* Our Story */}
      <section className="py-24 relative">
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-emerald-900/10 to-transparent -z-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="rounded-xl overflow-hidden border-4 border-gray-800 shadow-2xl">
                <Image
                  src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Our Story"
                  width={800}
                  height={600}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-gray-900 to-emerald-800 text-white p-6 rounded-xl shadow-2xl border border-gray-700">
                <p className="text-xl font-bold flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-emerald-400" />
                  <span>Est. 2005</span>
                </p>
                <p className="text-emerald-300">17+ Years of Excellence</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-8">
                <span className="bg-gradient-to-r from-emerald-500 to-emerald-300 bg-clip-text text-transparent">
                  Our Legacy
                </span>
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                Founded in 2005, Keys Fintech Info emerged as a beacon of trust in the financial advisory landscape. Our journey began with a commitment to redefine financial planning through transparency and client-first values.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                From our humble beginnings, we've grown into a national leader, serving thousands with customized financial strategies that withstand market volatility and life's uncertainties.
              </p>
              <div className="bg-gray-800/50 border-l-4 border-emerald-500 p-4 rounded-r-lg">
                <p className="text-gray-200 italic">
                  "Success isn't measured by profits alone, but by the financial security we create for our clients."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('/grid.svg')]"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                Our Guiding Principles
              </span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto"
            >
              The foundation of everything we do at Keys Fintech
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 shadow-2xl hover:shadow-emerald-900/30 transition-all"
            >
              <div className="bg-gradient-to-br from-emerald-900 to-emerald-700 p-4 rounded-xl inline-flex mb-6">
                <TrendingUp className="h-8 w-8 text-emerald-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Our Mission</h3>
              <p className="text-gray-400">
                To empower individuals and businesses with financial strategies that create lasting wealth and security through innovative, ethical advisory services.
              </p>
              <div className="mt-6 pt-6 border-t border-gray-700">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-300">Personalized financial roadmaps</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-300">Data-driven investment strategies</span>
                  </li>
                </ul>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 shadow-2xl hover:shadow-emerald-900/30 transition-all"
            >
              <div className="bg-gradient-to-br from-emerald-900 to-emerald-700 p-4 rounded-xl inline-flex mb-6">
                <Globe className="h-8 w-8 text-emerald-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Our Vision</h3>
              <p className="text-gray-400">
                To transform the financial advisory landscape by setting new standards of excellence, trust, and technological innovation across global markets.
              </p>
              <div className="mt-6 pt-6 border-t border-gray-700">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-300">Global financial empowerment</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-300">Sustainable wealth creation</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-gray-100 dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-emerald-500 to-emerald-300 bg-clip-text text-transparent">
                Our Core Values
              </span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-400"
            >
              The principles that guide every decision and interaction
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: Shield, 
                title: "Integrity", 
                description: "Uncompromising honesty in all dealings, with full transparency and ethical rigor.",
                bg: "bg-gradient-to-br from-gray-900 to-gray-800"
              },
              { 
                icon: Handshake, 
                title: "Trust", 
                description: "Building lasting relationships through reliability and consistent performance.",
                bg: "bg-gradient-to-br from-emerald-900 to-emerald-800"
              },
              { 
                icon: BarChart2, 
                title: "Excellence", 
                description: "Relentless pursuit of the highest standards in service and results.",
                bg: "bg-gradient-to-br from-gray-900 to-gray-800"
              },
              { 
                icon: Leaf, 
                title: "Sustainability", 
                description: "Creating financial strategies that endure across generations.",
                bg: "bg-gradient-to-br from-emerald-900 to-emerald-800"
              },
            ].map((value, index) => (
              <motion.div 
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${value.bg} text-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-700 hover:border-emerald-500/30`}
              >
                <div className="bg-black/20 p-4 rounded-xl inline-flex mb-6">
                  <value.icon className="h-8 w-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey - FIXED */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/grid-dark.svg')]"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                Our Journey
              </span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-400"
            >
              Key milestones in our evolution as financial leaders
            </motion.p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Mobile Timeline */}
            <div className="block md:hidden space-y-8">
              {[
                { 
                  year: "2005", 
                  title: "Foundation", 
                  description: "Established with a vision for transparent financial advisory services.",
                  icon: <Award className="h-5 w-5" />
                },
                { 
                  year: "2010", 
                  title: "National Expansion", 
                  description: "Expanded operations to 5 major Indian cities, serving diverse markets.",
                  icon: <Globe className="h-5 w-5" />
                },
                { 
                  year: "2015", 
                  title: "Digital Innovation", 
                  description: "Launched proprietary digital advisory platforms and tools.",
                  icon: <TrendingUp className="h-5 w-5" />
                },
                { 
                  year: "2020", 
                  title: "Industry Recognition", 
                  description: "Awarded 'Financial Advisory of the Year' by Finance Today.",
                  icon: <Award className="h-5 w-5" />
                },
                { 
                  year: "2023", 
                  title: "Sustainable Finance", 
                  description: "Introduced ESG-focused investment portfolios and strategies.",
                  icon: <Leaf className="h-5 w-5" />
                }
              ].map((milestone, index) => (
                <motion.div 
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-8"
                >
                  <div className="absolute left-0 top-2 w-4 h-4 bg-emerald-500 border-4 border-gray-900 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  {index < 4 && <div className="absolute left-2 top-6 w-0.5 h-16 bg-emerald-500/50"></div>}
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-emerald-900/50 text-emerald-300 px-3 py-1 rounded-lg text-sm font-medium flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {milestone.year}
                      </div>
                      <div className="bg-emerald-900/30 p-2 rounded-lg">
                        {milestone.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">{milestone.title}</h3>
                    <p className="text-gray-400">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Desktop Timeline */}
            <div className="hidden md:block">
              {/* Central timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-emerald-500 to-emerald-900 rounded-full"></div>
              
              <div className="space-y-16">
                {[
                  { 
                    year: "2005", 
                    title: "Foundation", 
                    description: "Established with a vision for transparent financial advisory services.",
                    icon: <Award className="h-6 w-6 text-white" />
                  },
                  { 
                    year: "2010", 
                    title: "National Expansion", 
                    description: "Expanded operations to 5 major Indian cities, serving diverse markets.",
                    icon: <Globe className="h-6 w-6 text-white" />
                  },
                  { 
                    year: "2015", 
                    title: "Digital Innovation", 
                    description: "Launched proprietary digital advisory platforms and tools.",
                    icon: <TrendingUp className="h-6 w-6 text-white" />
                  },
                  { 
                    year: "2020", 
                    title: "Industry Recognition", 
                    description: "Awarded 'Financial Advisory of the Year' by Finance Today.",
                    icon: <Award className="h-6 w-6 text-white" />
                  },
                  { 
                    year: "2023", 
                    title: "Sustainable Finance", 
                    description: "Introduced ESG-focused investment portfolios and strategies.",
                    icon: <Leaf className="h-6 w-6 text-white" />
                  }
                ].map((milestone, index) => (
                  <motion.div 
                    key={milestone.year}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative flex items-center"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-emerald-500 border-4 border-gray-900 rounded-full flex items-center justify-center z-10 shadow-lg">
                      {milestone.icon}
                    </div>
                    
                    {/* Content card - alternating sides */}
                    <div className={`w-5/12 ${index % 2 === 0 ? 'mr-auto pr-8' : 'ml-auto pl-8'}`}>
                      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-emerald-900/20 transition-all">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-emerald-900/50 text-emerald-300 px-4 py-2 rounded-lg text-lg font-bold flex items-center">
                            <Calendar className="h-5 w-5 mr-2" />
                            {milestone.year}
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-white">{milestone.title}</h3>
                        <p className="text-gray-400 text-lg leading-relaxed">{milestone.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}