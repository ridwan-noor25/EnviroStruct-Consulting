// pages/about/TeamMembers.jsx
import React, { useState } from 'react';

const TeamMembers = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const teamMembers = [
    {
      id: 1,
      name: 'Ibrahim Mohamed Aden',
      position: 'Managing Consultant / Lead Expert',
      shortExpertise: 'Environmental & Social Safeguards',
      coreExpertise: 'Environmental and Social Safeguards Instruments (ESIA, ESMP, RAP, SEP, LMP, SMP, ESMS ESG), safeguards compliance, climate risk management',
      qualifications: 'PGCert Sustainability Leadership for the Built Environment – University of Cambridge (UK); MSc Environmental & Business Management – Bangor University (UK); BSc Environmental Studies – Kenyatta University (Kenya)',
      experience: '9+ Years',
      email: 'ibrahim.aden@envirostruct.net',
      phone: '+254 XXX XXX XXX',
      location: 'Nairobi, Kenya',
      category: 'leadership',
      certifications: ['ESIA Expert', 'Climate Risk Management', 'ESG Specialist', 'Safeguards Compliance']
    },
    {
      id: 2,
      name: 'Yasmin Daud Noor',
      position: 'Associate Expert – Environmental & Social Safeguards',
      shortExpertise: 'Environmental assessments & climate resilience',
      coreExpertise: 'Environmental assessments, climate resilience programs, stakeholder consultations, ESMP monitoring',
      qualifications: 'BSc Environmental Studies (Community Development) – Kenyatta University (Kenya)',
      experience: '6+ Years',
      email: 'yasmin.noor@envirostruct.net',
      phone: '+254 XXX XXX XXX',
      location: 'Nairobi, Kenya',
      category: 'environmental',
      certifications: ['Environmental Auditor', 'Climate Resilience Specialist', 'Stakeholder Engagement']
    },
    {
      id: 3,
      name: 'Isnino Mohamed Ibrahim',
      position: 'Social Development Consultant',
      shortExpertise: 'Social impact & community engagement',
      coreExpertise: 'Social impact assessments, community consultations, grievance redress mechanisms',
      qualifications: 'BA Sociology, Psychology & Conflict and Peace Studies – University of Nairobi (Kenya)',
      experience: '5+ Years',
      email: 'isnino.ibrahim@envirostruct.net',
      phone: '+254 XXX XXX XXX',
      location: 'Nairobi, Kenya',
      category: 'social',
      certifications: ['Social Safeguards Specialist', 'Community Engagement Expert', 'Grievance Mechanism']
    },
    {
      id: 4,
      name: 'Eng. Abdirahim Ibrahim Mohamed',
      position: 'Senior Civil Engineer / Infrastructure Specialist',
      shortExpertise: 'Infrastructure design & supervision',
      coreExpertise: 'Infrastructure design, roads, WASH systems, drainage, construction supervision',
      qualifications: 'BSc Civil Engineering – University of Nairobi (Kenya); Registered Professional Engineer – Engineers Board of Kenya (EBK)',
      experience: '12+ Years',
      email: 'abdirahim.mohamed@envirostruct.net',
      phone: '+254 XXX XXX XXX',
      location: 'Nairobi, Kenya',
      category: 'engineering',
      certifications: ['Registered Engineer EBK', 'Infrastructure Design Expert', 'Construction Supervision']
    },
    {
      id: 5,
      name: 'Salim Said Abdalla',
      position: 'Planner / GIS & Land Use Specialist',
      shortExpertise: 'GIS analysis & spatial planning',
      coreExpertise: 'GIS analysis, spatial planning, land administration, environmental mapping',
      qualifications: 'BSc Urban & Regional Planning with IT – Maseno University (Kenya)',
      experience: '5+ Years',
      email: 'salim.abdalla@envirostruct.net',
      phone: '+254 XXX XXX XXX',
      location: 'Nairobi, Kenya',
      category: 'technical',
      certifications: ['GIS Professional', 'Land Use Planner', 'Spatial Analysis']
    },
    {
      id: 6,
      name: 'Fardowsa Hassan Bare',
      position: 'Land Surveyor',
      shortExpertise: 'Topographic & cadastral surveys',
      coreExpertise: 'Topographic surveys, cadastral mapping, infrastructure surveys',
      qualifications: 'B-Tech Land Surveying – Technical University of Kenya (TUK); Diploma Land Surveying – Kenya Institute of Surveying and Mapping (KISM)',
      experience: '5+ Years',
      email: 'fardowsa.bare@envirostruct.net',
      phone: '+254 XXX XXX XXX',
      location: 'Nairobi, Kenya',
      category: 'technical',
      certifications: ['Licensed Surveyor', 'Cadastral Mapping Expert', 'Infrastructure Surveyor']
    },
    {
      id: 7,
      name: 'Muktar Abbey',
      position: 'Water & Environmental Engineer',
      shortExpertise: 'WASH & water systems design',
      coreExpertise: 'WASH infrastructure, water systems design, safeguards monitoring',
      qualifications: 'BSc Water & Environmental Engineering – Egerton University (Kenya)',
      experience: '5+ Years',
      email: 'muktar.abbey@envirostruct.net',
      phone: '+254 XXX XXX XXX',
      location: 'Nairobi, Kenya',
      category: 'engineering',
      certifications: ['Water Systems Designer', 'Environmental Engineer', 'WASH Specialist']
    },
    {
      id: 8,
      name: 'Naima Ibrahim',
      position: 'Monitoring & Evaluation Specialist',
      shortExpertise: 'M&E systems & data analytics',
      coreExpertise: 'M&E systems, data analytics, impact assessments',
      qualifications: 'BSc Economics & Statistics – Kenyatta University (Kenya); MSc Data Science – Strathmore University (Ongoing)',
      experience: '5+ Years',
      email: 'naima.ibrahim@envirostruct.net',
      phone: '+254 XXX XXX XXX',
      location: 'Nairobi, Kenya',
      category: 'monitoring',
      certifications: ['M&E Professional', 'Data Analytics Expert', 'Impact Assessment']
    }
  ];

  const categories = [
    { id: 'all', label: 'All Team' },
    { id: 'leadership', label: 'Leadership' },
    { id: 'environmental', label: 'Environmental' },
    { id: 'social', label: 'Social Development' },
    { id: 'engineering', label: 'Engineering' },
    { id: 'technical', label: 'Technical' },
    { id: 'monitoring', label: 'Monitoring & Evaluation' }
  ];

  const filteredMembers = teamMembers.filter(member => {
    const matchesFilter = filter === 'all' || member.category === filter;
    const matchesSearch = searchTerm === '' || 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.shortExpertise.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0F3A5A] via-[#1a4a6e] to-[#6E8F3D] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-block mb-4">
              <span className="text-[#6E8F3D] font-semibold text-sm uppercase tracking-wider bg-white/10 px-4 py-1.5 rounded-full">
                Our Experts
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Meet Our Team
            </h1>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
              A multidisciplinary team of experienced professionals dedicated to delivering excellence 
              in environmental, social, and engineering solutions across Kenya and the wider region.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Section */}
      <section className="py-8 bg-white border-b border-gray-100 sticky top-0 z-30 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search by name, position, or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-11 pr-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6E8F3D] focus:ring-2 focus:ring-[#6E8F3D]/20 transition-all"
              />
              <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === category.id
                    ? 'bg-[#0F3A5A] text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-[#6E8F3D]/10 hover:text-[#6E8F3D]'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Count */}
          <div className="mb-8 text-center">
            <p className="text-gray-500">
              Showing <span className="font-semibold text-[#0F3A5A]">{filteredMembers.length}</span> team members
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                onClick={() => setSelectedMember(member)}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100"
              >
                {/* Card Header */}
                <div className="relative h-28 bg-gradient-to-r from-[#0F3A5A] to-[#6E8F3D]">
                  <div className="absolute -bottom-10 left-6">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                      <span className="text-2xl font-bold text-[#0F3A5A]">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Card Content */}
                <div className="p-5 pt-12">
                  <h3 className="text-lg font-bold text-[#0F3A5A] mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-[#6E8F3D] font-semibold mb-2">
                    {member.position}
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    {member.shortExpertise}
                  </p>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-start gap-2">
                      <svg className="h-3.5 w-3.5 text-[#6E8F3D] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-xs">{member.coreExpertise.substring(0, 80)}...</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="h-3.5 w-3.5 text-[#6E8F3D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-xs">{member.experience} Experience</span>
                    </div>
                  </div>
                  
                  <button className="mt-4 w-full py-2 text-sm font-medium text-[#6E8F3D] border border-[#6E8F3D] rounded-lg hover:bg-[#6E8F3D] hover:text-white transition-all duration-300">
                    View Full Profile
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredMembers.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg className="h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No team members found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedMember && (
        <div
          onClick={() => setSelectedMember(null)}
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="relative">
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/90 rounded-full hover:bg-white shadow-md"
              >
                <svg className="h-5 w-5 text-[#0F3A5A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="bg-gradient-to-r from-[#0F3A5A] to-[#6E8F3D] p-8 text-white rounded-t-2xl">
                <div className="flex items-center gap-5">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">
                      {selectedMember.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold">{selectedMember.name}</h2>
                    <p className="text-[#6E8F3D] font-medium mt-1">{selectedMember.position}</p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-200">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{selectedMember.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-[#0F3A5A] uppercase mb-3 border-b border-gray-200 pb-2">
                    Core Expertise
                  </h3>
                  <p className="text-gray-700">{selectedMember.coreExpertise}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[#0F3A5A] uppercase mb-3 border-b border-gray-200 pb-2">
                    Qualifications
                  </h3>
                  <p className="text-gray-700">{selectedMember.qualifications}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[#0F3A5A] uppercase mb-3 border-b border-gray-200 pb-2">
                    Experience
                  </h3>
                  <p className="text-gray-700">{selectedMember.experience} of professional experience</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[#0F3A5A] uppercase mb-3 border-b border-gray-200 pb-2">
                    Certifications
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.certifications.map((cert, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-[#6E8F3D]/10 text-[#6E8F3D] text-sm rounded-lg">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[#0F3A5A] uppercase mb-3 border-b border-gray-200 pb-2">
                    Contact
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <svg className="h-4 w-4 text-[#6E8F3D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a href={`mailto:${selectedMember.email}`} className="text-gray-600 hover:text-[#6E8F3D]">
                        {selectedMember.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="h-4 w-4 text-[#6E8F3D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-gray-600">{selectedMember.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamMembers;