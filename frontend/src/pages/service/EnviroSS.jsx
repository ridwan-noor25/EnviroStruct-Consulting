// pages/service/EnviroSS.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const EnviroSS = () => {
  const services = [
    {
      id: 1,
      title: 'Environmental and Social Impact Assessments (ESIA)',
      description: 'Comprehensive assessments of environmental, social, health, safety, and human rights impacts associated with proposed projects. The process includes screening, scoping, baseline studies, stakeholder engagement, impact analysis, and preparation of mitigation measures in accordance with national regulations and international safeguards standards.',
      benefits: [
        'Enables informed decision-making',
        'Ensures regulatory compliance',
        'Minimizes environmental and social impacts',
        'Comprehensive stakeholder engagement'
      ]
    },
    {
      id: 2,
      title: 'Environmental Audits (EA)',
      description: 'Systematic evaluation of environmental performance and regulatory compliance of existing projects or facilities. The audits identify gaps, assess environmental management practices, and recommend corrective actions to improve environmental performance and compliance with environmental regulations.',
      benefits: [
        'Identifies compliance gaps',
        'Improves environmental performance',
        'Avoids regulatory penalties',
        'Recommends corrective actions'
      ]
    },
    {
      id: 3,
      title: 'Strategic Environmental and Social Assessments (SESA)',
      description: 'High-level assessments conducted for policies, plans, and programs to integrate environmental and social considerations into strategic decision-making processes and promote sustainable development outcomes.',
      benefits: [
        'Integrates environmental considerations',
        'Supports strategic decision-making',
        'Promotes sustainable outcomes',
        'Policy-level impact analysis'
      ]
    },
    {
      id: 4,
      title: 'Environmental and Social Management Systems (ESMS)',
      description: 'Development and implementation of structured management systems to help organizations manage environmental and social risks. This includes preparation of Environmental and Social Management Plans (ESMPs), monitoring frameworks, emergency response procedures, and operational safeguards.',
      benefits: [
        'Systematic risk management',
        'Long-term operational compliance',
        'Institutional capacity strengthening',
        'Comprehensive safeguards framework'
      ]
    },
    {
      id: 5,
      title: 'Resettlement Action Plans (RAPs)',
      description: 'Preparation and implementation support for resettlement frameworks where projects affect land use or livelihoods. Services include socio-economic surveys, asset valuation, compensation planning, stakeholder engagement, grievance mechanisms, and monitoring of resettlement outcomes.',
      benefits: [
        'Fair and transparent resettlement',
        'Minimizes social disruption',
        'Protects community livelihoods',
        'Comprehensive grievance mechanisms'
      ]
    },
    {
      id: 6,
      title: 'Occupational Health and Safety (OHS) Advisory',
      description: 'Workplace health and safety assessments, policy development, risk identification, compliance audits, and training programs aimed at improving employee safety and ensuring compliance with national and international OHS standards.',
      benefits: [
        'Improves workplace safety',
        'Reduces accident risks',
        'Ensures regulatory compliance',
        'Comprehensive staff training'
      ]
    },
    {
      id: 7,
      title: 'Sustainability and Environmental Risk Management',
      description: 'Identification, assessment, and mitigation of environmental and social risks associated with projects and business operations. This includes climate risk screening, ESG integration, and sustainability advisory services.',
      benefits: [
        'Climate risk screening',
        'ESG integration',
        'Sustainability reporting',
        'Resilience planning'
      ]
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0F3A5A] via-[#1a4a6e] to-[#6E8F3D] text-white overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-block mb-4">
              <span className="text-[#6E8F3D] font-semibold text-sm uppercase tracking-wider bg-white/10 px-4 py-1.5 rounded-full">
                Environmental & Social
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Environmental & Social Advisory
            </h1>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
              Comprehensive environmental and social consulting services that support sustainable development, 
              regulatory compliance, and responsible infrastructure implementation across Kenya and the wider region.
            </p>
          </div>
        </div>
        
        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 75C480 70 600 80 720 85C840 90 960 90 1080 85C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Services Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F3A5A] mb-4">
              Our Environmental & Social Services
            </h2>
            <div className="w-20 h-1 bg-[#6E8F3D] mx-auto mb-6" />
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We provide specialized environmental and social consulting services that help organizations 
              manage risks, ensure compliance, and achieve sustainable outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {services.map((service, index) => (
              <div 
                key={service.id} 
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="md:flex">
                  {/* Left side - Icon and Title */}
                  <div className="md:w-1/3 bg-gradient-to-br from-[#0F3A5A] to-[#6E8F3D] p-6 text-white flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold leading-tight">
                      {service.title}
                    </h3>
                  </div>
                  
                  {/* Right side - Description and Benefits */}
                  <div className="md:w-2/3 p-6">
                    <p className="text-gray-600 mb-5 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="grid md:grid-cols-2 gap-3">
                      {service.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                          <svg className="h-4 w-4 text-[#6E8F3D] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F3A5A] mb-4">
              Why Choose Our Environmental Services?
            </h2>
            <div className="w-20 h-1 bg-[#6E8F3D] mx-auto mb-6" />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We combine technical expertise with practical implementation approaches
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Regulatory Expertise',
                description: 'Deep understanding of national environmental regulations and international safeguards standards'
              },
              {
                title: 'Experienced Team',
                description: 'Multidisciplinary team of environmental and social specialists'
              },
              {
                title: 'Proven Track Record',
                description: 'Successfully completed numerous ESIA and environmental audit assignments'
              },
              {
                title: 'Practical Solutions',
                description: 'Results-oriented approach focused on implementable mitigation measures'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center group">
                <div className="w-12 h-12 bg-[#6E8F3D]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#6E8F3D] transition-colors duration-300">
                  <svg className="h-6 w-6 text-[#6E8F3D] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#0F3A5A] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Differentiators */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#0F3A5A] mb-4">
                Our Approach to Environmental & Social Management
              </h2>
              <div className="w-20 h-1 bg-[#6E8F3D] mb-6" />
              <p className="text-gray-600 mb-6 leading-relaxed">
                At EnviroStruct, we believe that successful projects require a balanced approach that 
                integrates environmental protection, social responsibility, and economic development.
              </p>
              <ul className="space-y-3">
                {[
                  'Rigorous scientific methodology and data-driven analysis',
                  'Meaningful stakeholder engagement and community participation',
                  'Alignment with international best practices and standards',
                  'Practical, cost-effective mitigation measures',
                  'Long-term monitoring and adaptive management'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <svg className="h-5 w-5 text-[#6E8F3D] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-[#0F3A5A] to-[#6E8F3D] rounded-2xl p-8 text-white">
              <div className="text-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Committed to Excellence</h3>
                <p className="text-gray-200 mb-4">
                  Our team brings together certified environmental experts, social specialists, 
                  and industry professionals dedicated to delivering exceptional results.
                </p>
                <div className="flex justify-center gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#6E8F3D]">9+</div>
                    <div className="text-xs">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#6E8F3D]">50+</div>
                    <div className="text-xs">Projects Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#6E8F3D]">100%</div>
                    <div className="text-xs">Client Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#0F3A5A] to-[#1a4a6e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Need Environmental & Social Support?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact our team of experts to discuss how we can assist with your project's 
            environmental and social requirements
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#6E8F3D] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#5a7a2e] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Request a Consultation
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300"
            >
              View Our Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EnviroSS;