import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_URL = 'http://127.0.0.1:5000/api';

const EnviroSS = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Icon mapping for environmental services
  const getIconComponent = (iconName, className = "w-8 h-8") => {
    const icons = {
      'Shield': (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      'ClipboardCheck': (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      'TrendingUp': (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      'Settings': (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      'Users': (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      'HardHat': (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.66 0 3-4 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4-3-9s1.34-9 3-9" />
        </svg>
      ),
      'Leaf': (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      )
    };
    
    return icons[iconName] || icons['Shield'];
  };

  useEffect(() => {
    fetchEnvironmentalServices();
  }, []);

  const fetchEnvironmentalServices = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_URL}/services?category=environmental`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setServices(data.services || []);
    } catch (error) {
      console.error('Error fetching environmental services:', error);
      setError('Failed to load services. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#6E8F3D]/30 border-t-[#6E8F3D] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading environmental services...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchEnvironmentalServices}
            className="px-4 py-2 bg-[#6E8F3D] text-white rounded-lg hover:bg-[#5a7a2e] transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0F3A5A] via-[#1a4a6e] to-[#6E8F3D] text-white overflow-hidden">
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
              Our Environmental & Social Services
            </h2>
            <div className="w-20 h-1 bg-[#6E8F3D] mx-auto mb-6" />
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We provide specialized environmental and social consulting services that help organizations 
              manage risks, ensure compliance, and achieve sustainable outcomes.
            </p>
          </div>

          {services.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No environmental services available at the moment.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {services.map((service) => (
                <div key={service.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="md:flex">
                    <div className="md:w-1/3 bg-gradient-to-br from-[#0F3A5A] to-[#6E8F3D] p-6 text-white flex flex-col items-center justify-center text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        {getIconComponent(service.icon, "w-8 h-8")}
                      </div>
                      <h3 className="text-xl font-bold leading-tight">
                        {service.title}
                      </h3>
                    </div>
                    
                    <div className="md:w-2/3 p-6">
                      <p className="text-gray-600 mb-5 leading-relaxed">
                        {service.description}
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        {service.benefits && service.benefits.map((benefit, idx) => (
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
          )}
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