// pages/about/AboutUs.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Target, 
  Leaf, 
  Users, 
  Lightbulb, 
  Handshake,
  TrendingUp,
  Globe,
  Award,
  BarChart3,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

const AboutUs = () => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const coreValues = [
    {
      icon: Shield,
      title: 'Integrity and Professional Ethics',
      description: 'We uphold the highest standards of honesty, transparency, and accountability in all our professional engagements, ensuring compliance with regulatory frameworks and ethical consulting practices.'
    },
    {
      icon: Target,
      title: 'Technical Excellence',
      description: 'We are committed to delivering high-quality services through sound scientific methods, technical expertise, and adherence to international best practices in environmental, engineering, and sustainability consulting.'
    },
    {
      icon: Leaf,
      title: 'Sustainability and Environmental Stewardship',
      description: 'We promote responsible development by integrating environmental protection, climate resilience, and sustainable resource management into all our projects.'
    },
    {
      icon: Users,
      title: 'Client-Centered Approach',
      description: 'We prioritize understanding our clients\' needs and delivering tailored, practical solutions that support effective decision-making and long-term project success.'
    },
    {
      icon: Handshake,
      title: 'Collaboration and Stakeholder Engagement',
      description: 'We believe successful projects require strong partnerships. We work closely with clients, communities, government institutions, and development partners to ensure inclusive and sustainable outcomes.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation and Continuous Learning',
      description: 'We continuously adopt modern technologies, innovative methodologies, and emerging best practices to enhance the quality and impact of our services.'
    }
  ];

  const stats = [
    { number: '9+', label: 'Years of Excellence', icon: Award, color: '#6E8F3D' },
    { number: '50+', label: 'Projects Completed', icon: BarChart3, color: '#0F3A5A' },
    { number: '15+', label: 'Expert Consultants', icon: Users, color: '#6E8F3D' },
    { number: '6+', label: 'Countries Served', icon: Globe, color: '#0F3A5A' }
  ];

  const differentiators = [
    'Integrated Multidisciplinary Expertise',
    'Strong Regulatory and Safeguards Expertise',
    'Local Knowledge with Global Standards',
    'Results-Oriented and Practical Approach',
    'Experienced Multidisciplinary Team',
    'Commitment to Long-Term Partnerships'
  ];

  return (
    <div className="bg-white">
      {/* Hero Section with Full Cover Image */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="EnviroStruct Consulting Team"
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F3A5A]/90 via-[#0F3A5A]/70 to-[#0F3A5A]/50" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-block mb-4">
              <span className="text-[#6E8F3D] font-semibold text-sm uppercase tracking-wider bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm">
                Who We Are
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6">
              About EnviroStruct
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-3xl mx-auto mb-8">
              Your trusted partner for integrated environmental, social, and engineering solutions that drive sustainable development across Kenya and the wider region.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-[#6E8F3D] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#5a7a2e] transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get in Touch
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/team"
                className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300"
              >
                Meet Our Team
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F3A5A] mb-4">
              Company Overview
            </h2>
            <div className="w-20 h-1 bg-[#6E8F3D] mx-auto mb-8" />
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              EnviroStruct Consulting International Limited is a multidisciplinary consulting firm established to provide integrated environmental, social, engineering, and sustainability advisory services that support responsible development and infrastructure delivery.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              EnviroStruct specializes in environmental and social impact assessments, environmental audits, sustainability risk management, engineering and feasibility studies, and project management services. The firm combines strong technical expertise with practical implementation approaches to support public institutions, private sector organizations, development partners, and community-based initiatives.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              With a team of experienced professionals and a strong understanding of regional development contexts, EnviroStruct is committed to delivering high-quality, practical, and results-oriented solutions that promote environmental stewardship, social responsibility, and sustainable economic growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center group"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="h-8 w-8" style={{ color: stat.color }} />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-[#0F3A5A] mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 uppercase tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="w-14 h-14 bg-[#6E8F3D]/10 rounded-xl flex items-center justify-center mb-6">
                <Target className="h-7 w-7 text-[#6E8F3D]" />
              </div>
              <h3 className="text-2xl font-bold text-[#0F3A5A] mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed text-lg italic">
                "To provide innovative and reliable environmental, social, and engineering consulting services that support sustainable development, regulatory compliance, and resilient infrastructure while creating lasting value for communities, clients, and the environment."
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#0F3A5A] to-[#1a4a6e] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="w-14 h-14 bg-[#6E8F3D]/20 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="h-7 w-7 text-[#6E8F3D]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-gray-200 leading-relaxed text-lg italic">
                "To be a leading consulting firm in environmental and social sustainability, infrastructure advisory, and climate-resilient development across the region."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F3A5A] mb-4">
              Our Core Values
            </h2>
            <div className="w-20 h-1 bg-[#6E8F3D] mx-auto mb-6" />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These values guide our professional conduct, service delivery, and partnerships
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer"
              >
                <div className="w-12 h-12 bg-[#6E8F3D]/10 rounded-lg flex items-center justify-center mb-5 group-hover:bg-[#6E8F3D] transition-colors duration-300">
                  <value.icon className="h-6 w-6 text-[#6E8F3D] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-[#0F3A5A] mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Differentiators Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F3A5A] mb-4">
              What Sets Us Apart
            </h2>
            <div className="w-20 h-1 bg-[#6E8F3D] mx-auto mb-6" />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our competitive advantage is built on key strengths that distinguish us in the consulting sector
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-4"
          >
            {differentiators.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 hover:bg-[#6E8F3D]/5 transition-colors duration-300 group"
              >
                <CheckCircle2 className="h-5 w-5 text-[#6E8F3D] flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-gray-700 font-medium group-hover:text-[#0F3A5A] transition-colors duration-300">
                  {item}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#0F3A5A] to-[#1a4a6e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Partner with Us?
            </h2>
            <p className="text-[#6E8F3D] text-lg mb-8 max-w-2xl mx-auto">
              Let's work together to create sustainable solutions for your projects
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-[#6E8F3D] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#5a7a2e] transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
              >
                Contact Us Today
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                to="/services"
                className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white/10 transition-all duration-200"
              >
                View Our Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;