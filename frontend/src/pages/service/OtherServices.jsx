// pages/service/OtherServices.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const OtherServices = () => {
  const services = [
    {
      title: 'Project Management Services',
      description: 'Comprehensive project management support including planning, resource allocation, implementation supervision, and performance monitoring.',
      benefits: [
        'Efficient project delivery',
        'Timely completion',
        'Resource optimization',
        'Quality assurance'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      title: 'Business and Organizational Advisory',
      description: 'Strategic advisory services designed to support organizations in improving operational efficiency and long-term strategic planning.',
      benefits: [
        'Strategic planning',
        'Operational efficiency',
        'Organizational development',
        'Change management'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      title: 'Financial Advisory Services',
      description: 'Financial analysis and advisory services including investment appraisal, financial planning, risk assessment, and due diligence.',
      benefits: [
        'Investment decisions',
        'Financial planning',
        'Risk assessment',
        'Due diligence'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Information Technology and Digital Solutions',
      description: 'Technology advisory services including digital transformation strategies, cybersecurity advisory, cloud computing solutions, and data analytics.',
      benefits: [
        'Digital transformation',
        'Data security',
        'Cloud solutions',
        'Data-driven decisions'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Training and Professional Development',
      description: 'Customized training programs designed to enhance leadership capacity, technical skills, and institutional performance.',
      benefits: [
        'Skills development',
        'Leadership training',
        'Capacity building',
        'Professional growth'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      title: 'Monitoring and Evaluation (M&E)',
      description: 'Comprehensive M&E systems, data analytics, and impact assessments to track project performance and outcomes.',
      benefits: [
        'Performance tracking',
        'Impact measurement',
        'Data-driven insights',
        'Continuous improvement'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: 'Capacity Development Programs',
      description: 'Institutional capacity strengthening programs to enhance organizational effectiveness and sustainability.',
      benefits: [
        'Institutional strengthening',
        'Process improvement',
        'Knowledge transfer',
        'Sustainable practices'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0F3A5A] via-[#1a4a6e] to-[#6E8F3D] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-block mb-4">
              <span className="text-[#6E8F3D] font-semibold text-sm uppercase tracking-wider bg-white/10 px-4 py-1.5 rounded-full">
                Advisory & Management
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Project Management & Advisory Services
            </h1>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
              Strategic advisory and project management services to ensure successful project delivery 
              and organizational performance improvement.
            </p>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 75C480 70 600 80 720 85C840 90 960 90 1080 85C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F3A5A] mb-4">
              Our Advisory & Management Services
            </h2>
            <div className="w-20 h-1 bg-[#6E8F3D] mx-auto mb-6" />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide strategic advisory and management solutions to help organizations succeed
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0F3A5A] to-[#6E8F3D] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <div className="text-white">
                        {service.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#0F3A5A] mb-3">{service.title}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {service.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                            <svg className="h-3.5 w-3.5 text-[#6E8F3D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F3A5A] mb-4">
            Ready to Transform Your Organization?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Let our advisory team help you achieve your strategic goals and improve project outcomes
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-[#6E8F3D] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#5a7a2e] transition-all duration-300"
          >
            Request a Consultation
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default OtherServices;