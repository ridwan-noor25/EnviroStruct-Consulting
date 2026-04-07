import React, { useEffect, useState } from 'react';
import { 
  ArrowRight,
  Building2,
  Trees,
  Droplets,
  Zap,
  CloudSun,
  CheckCircle,
  Shield,
  Globe,
  Users,
  TrendingUp,
  Leaf,
  Factory,
  Landmark,
  Truck,
  HardHat,
  Battery,
  Recycle,
  Sprout,
  Wind,
  Sun,
  MapPin,
  Briefcase,
  Calendar,
  Star,
  ChevronDown,
  Handshake,
  Home,
  Building,
  Banknote
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Sectors = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSector, setActiveSector] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sectors Data
  const sectors = [
    {
      id: 1,
      title: "Infrastructure Development",
      icon: Building2,
      color: "from-blue-600 to-blue-800",
      lightColor: "bg-blue-50",
      iconColor: "text-blue-600",
      description: "Comprehensive consulting support for infrastructure planning, environmental impact assessments, engineering studies, and project management.",
      longDescription: "We provide end-to-end consulting services for infrastructure development projects, ensuring environmental sustainability and regulatory compliance throughout the project lifecycle. Our expertise covers roads, railways, airports, ports, dams, and urban development projects.",
      services: [
        "Environmental and Social Impact Assessments (ESIA)",
        "Feasibility Studies and Engineering Design",
        "Resettlement Action Plans (RAP)",
        "Construction Environmental Management Plans",
        "Project Management and Supervision",
        "Environmental Audits and Monitoring"
      ],
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop",
      projects: [
        "Infrastructure Development ESIA for Kenya National Highways Authority",
        "Urban Development Environmental Audit for Nairobi City County",
        "Road Construction Environmental Management Plans"
      ],
      stats: {
        projects: "15+",
        experience: "9+ years"
      }
    },
    {
      id: 2,
      title: "Natural Resource Management",
      icon: Trees,
      color: "from-green-600 to-green-800",
      lightColor: "bg-green-50",
      iconColor: "text-green-600",
      description: "Support for responsible resource extraction and environmental sustainability in sectors such as mining, agriculture, and water management.",
      longDescription: "We help clients manage natural resources responsibly through comprehensive environmental assessments, sustainable resource extraction planning, and biodiversity conservation strategies. Our approach balances economic development with environmental protection.",
      services: [
        "Mining Environmental Impact Assessments",
        "Sustainable Agriculture Assessments",
        "Biodiversity and Ecosystem Services",
        "Forestry and Land Use Planning",
        "Fisheries and Marine Resource Management",
        "Natural Capital Accounting"
      ],
      image: "https://images.unsplash.com/photo-1581092335270-8b0b0c3f2f1e?w=600&h=400&fit=crop",
      projects: [
        "Artisanal Gold Mining ESIA in Marsabit County",
        "Deqsane Mining Co. Gypsum ESIA in Garissa County",
        "Agricultural Development Strategic Environmental Assessment"
      ],
      stats: {
        projects: "12+",
        experience: "8+ years"
      }
    },
    {
      id: 3,
      title: "Water and Environmental Systems",
      icon: Droplets,
      color: "from-cyan-600 to-blue-800",
      lightColor: "bg-cyan-50",
      iconColor: "text-cyan-600",
      description: "Environmental assessments and safeguards support for water supply, irrigation, and climate-resilient infrastructure projects.",
      longDescription: "We specialize in water resource management, providing comprehensive environmental assessments for water supply projects, irrigation schemes, and climate-resilient water infrastructure. Our expertise ensures sustainable water use and ecosystem protection.",
      services: [
        "Water Supply ESIA Studies",
        "Irrigation Scheme Assessments",
        "Wastewater Treatment Planning",
        "River Basin Management",
        "Groundwater Resource Assessments",
        "Flood Risk and Drainage Studies"
      ],
      image: "https://images.unsplash.com/photo-1581092335270-8b0b0c3f2f1e?w=600&h=400&fit=crop",
      projects: [
        "17 Water Pans ESIA & Monitoring in Northern Kenya",
        "Community Water Supply Projects ESIA",
        "Irrigation Scheme Environmental Assessments"
      ],
      stats: {
        projects: "20+",
        experience: "9+ years"
      }
    },
    {
      id: 4,
      title: "Energy and Industrial Development",
      icon: Zap,
      color: "from-yellow-600 to-orange-600",
      lightColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
      description: "Advisory services supporting environmental compliance and sustainability in industrial and energy investments.",
      longDescription: "We provide environmental and social advisory services for energy projects and industrial developments, helping clients navigate regulatory requirements and implement sustainable practices. Our expertise covers renewable energy, power generation, and industrial facilities.",
      services: [
        "Renewable Energy ESIA (Solar, Wind, Hydro)",
        "Thermal Power Plant Assessments",
        "Industrial Facility Environmental Audits",
        "Energy Efficiency Studies",
        "Grid Infrastructure Planning",
        "Carbon Footprint Assessments"
      ],
      image: "https://images.unsplash.com/photo-1581092335270-8b0b0c3f2f1e?w=600&h=400&fit=crop",
      projects: [
        "Renewable Energy Project ESIA for Rural Electrification Authority",
        "Gypsum Powder Processing Plant ESIA",
        "Industrial Development Environmental Compliance Audits"
      ],
      stats: {
        projects: "10+",
        experience: "7+ years"
      }
    },
    {
      id: 5,
      title: "Climate Resilience and Sustainability",
      icon: CloudSun,
      color: "from-teal-600 to-green-600",
      lightColor: "bg-teal-50",
      iconColor: "text-teal-600",
      description: "Consulting services supporting climate adaptation, sustainability planning, and environmental risk management.",
      longDescription: "We help organizations build climate resilience and achieve sustainability goals through strategic planning, risk assessments, and adaptation strategies. Our services integrate climate science with practical solutions for long-term resilience.",
      services: [
        "Climate Risk and Vulnerability Assessments",
        "Climate Adaptation Planning",
        "Greenhouse Gas Inventories",
        "Sustainability Strategy Development",
        "ESG Advisory Services",
        "Climate Finance and Carbon Markets"
      ],
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop",
      projects: [
        "Climate Resilience Planning for Water Resources",
        "Sustainability Strategy for Industrial Clients",
        "ESG Framework Development for Investors"
      ],
      stats: {
        projects: "8+",
        experience: "6+ years"
      }
    }
  ];

  // Client Types Data
  const clientTypes = [
    {
      id: 1,
      title: "Government and Public Institutions",
      icon: Landmark,
      description: "National and county governments, regulatory agencies, and development authorities seeking support in environmental compliance, infrastructure planning, and sustainability management.",
      services: [
        "Environmental compliance and regulatory support",
        "Infrastructure planning and ESIA studies",
        "Policy development and strategic assessments",
        "Capacity building for government agencies"
      ],
      color: "from-blue-600 to-blue-800"
    },
    {
      id: 2,
      title: "Development Partners and International Organizations",
      icon: Globe,
      description: "Multilateral institutions, donor agencies, and NGOs implementing development and humanitarian projects that require environmental and social safeguards, monitoring, and evaluation.",
      services: [
        "Environmental and social safeguards compliance",
        "Project monitoring and evaluation",
        "Stakeholder engagement and community consultations",
        "Risk assessment and management frameworks"
      ],
      color: "from-green-600 to-green-800"
    },
    {
      id: 3,
      title: "Private Sector and Investors",
      icon: Banknote,
      description: "Companies involved in infrastructure, mining, agriculture, energy, and industrial development requiring environmental assessments, sustainability advisory services, and regulatory compliance support.",
      services: [
        "Environmental Impact Assessments (EIA)",
        "Sustainability and ESG advisory",
        "Regulatory compliance and permitting",
        "Risk management and due diligence"
      ],
      color: "from-yellow-600 to-orange-600"
    },
    {
      id: 4,
      title: "Engineering and Infrastructure Firms",
      icon: HardHat,
      description: "Construction companies and engineering consultants that require environmental and social expertise to support project planning, feasibility assessments, and compliance with regulatory and donor requirements.",
      services: [
        "Environmental and social expertise for project planning",
        "Feasibility studies and assessments",
        "Regulatory compliance support",
        "Environmental management planning"
      ],
      color: "from-cyan-600 to-blue-800"
    }
  ];

  // Key capabilities
  const capabilities = [
    {
      icon: Shield,
      title: "Regulatory Compliance",
      description: "Ensure full compliance with NEMA regulations and international safeguards standards"
    },
    {
      icon: Globe,
      title: "Stakeholder Engagement",
      description: "Comprehensive community and stakeholder consultation programs"
    },
    {
      icon: TrendingUp,
      title: "Risk Management",
      description: "Identification and mitigation of environmental and social risks"
    },
    {
      icon: Users,
      title: "Capacity Building",
      description: "Training and skill development for project teams and communities"
    },
    {
      icon: Leaf,
      title: "Sustainability Integration",
      description: "Embedding sustainability principles into project design and operations"
    },
    {
      icon: CheckCircle,
      title: "Quality Assurance",
      description: "Rigorous quality control and independent review processes"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-[#0F3A5A] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&h=400&fit=crop"
            alt="Sectors Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Sectors & Clients We Serve</h1>
            <div className="w-20 h-1 bg-[#6E8F3D] mx-auto mb-6"></div>
            <p className="text-gray-200 text-lg">
              EnviroStruct Consulting International works across multiple sectors, providing integrated environmental, 
              social, and engineering solutions that support sustainable development and responsible infrastructure 
              delivery across Kenya and the wider region.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-[#6E8F3D] font-semibold text-sm uppercase tracking-wider">Our Reach</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F3A5A] mt-3 mb-6">
              Serving a Wide Range of Organizations
            </h2>
            <div className="w-20 h-1 bg-[#6E8F3D] mx-auto mb-8"></div>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              EnviroStruct Consulting International works collaboratively with a wide range of organizations across 
              public, private, and development sectors. We partner with our clients to deliver sustainable and 
              responsible development projects that meet regulatory requirements and create lasting value.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our multidisciplinary approach combines environmental expertise, social safeguards, engineering knowledge, 
              and project management capabilities to ensure that projects across all sectors are delivered responsibly, 
              sustainably, and in full compliance with national regulations and international best practices.
            </p>
          </div>
        </div>
      </section>

      {/* Client Types Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#6E8F3D] font-semibold text-sm uppercase tracking-wider">Who We Work With</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F3A5A] mt-3 mb-6">
              Our Clients
            </h2>
            <div className="w-20 h-1 bg-[#6E8F3D] mx-auto mb-6"></div>
            <p className="text-gray-600">
              We serve a diverse range of clients across public, private, and development sectors
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {clientTypes.map((client) => {
              const Icon = client.icon;
              return (
                <div
                  key={client.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className={`bg-gradient-to-r ${client.color} p-6 text-white`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-white/20 p-2 rounded-lg">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-bold">{client.title}</h3>
                    </div>
                    <p className="text-white/90 text-sm leading-relaxed">{client.description}</p>
                  </div>
                  <div className="p-6">
                    <h4 className="font-semibold text-[#0F3A5A] mb-3">Key Services Provided:</h4>
                    <ul className="space-y-2">
                      {client.services.map((service, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-[#6E8F3D] mt-0.5 flex-shrink-0" />
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sectors Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#6E8F3D] font-semibold text-sm uppercase tracking-wider">Our Expertise</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F3A5A] mt-3 mb-6">
              Sectors We Serve
            </h2>
            <div className="w-20 h-1 bg-[#6E8F3D] mx-auto mb-6"></div>
            <p className="text-gray-600">
              Delivering integrated solutions across key sectors
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sectors.map((sector) => {
              const Icon = sector.icon;
              return (
                <div
                  key={sector.id}
                  className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                >
                  {/* Sector Header */}
                  <div className={`bg-gradient-to-r ${sector.color} p-6 text-white`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-white/20 p-2 rounded-lg">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-bold">{sector.title}</h3>
                    </div>
                    <p className="text-white/90 text-sm leading-relaxed">{sector.description}</p>
                  </div>

                  {/* Sector Content */}
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#6E8F3D]">{sector.stats.projects}</div>
                        <div className="text-xs text-gray-500">Projects</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#6E8F3D]">{sector.stats.experience}</div>
                        <div className="text-xs text-gray-500">Experience</div>
                      </div>
                      <button 
                        onClick={() => setActiveSector(activeSector === sector.id ? null : sector.id)}
                        className="text-[#6E8F3D] hover:text-[#5a7a32] transition"
                      >
                        <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${activeSector === sector.id ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                    {/* Expanded Content */}
                    <div className={`transition-all duration-300 overflow-hidden ${activeSector === sector.id ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-[#0F3A5A] mb-2">Key Services:</h4>
                          <ul className="space-y-1">
                            {sector.services.slice(0, 4).map((service, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                <CheckCircle className="h-4 w-4 text-[#6E8F3D] mt-0.5 flex-shrink-0" />
                                <span>{service}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#0F3A5A] mb-2">Sample Projects:</h4>
                          <ul className="space-y-1">
                            {sector.projects.map((project, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                <Briefcase className="h-4 w-4 text-[#6E8F3D] mt-0.5 flex-shrink-0" />
                                <span>{project}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <Link 
                      to="/contact" 
                      className="mt-4 inline-flex items-center gap-2 text-[#6E8F3D] font-semibold text-sm hover:gap-3 transition-all"
                    >
                      Learn More <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Collaborative Approach Section */}
      <section className="py-20 bg-[#0F3A5A]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#6E8F3D] font-semibold text-sm uppercase tracking-wider">Our Approach</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-6">
              Working Collaboratively for Success
            </h2>
            <div className="w-20 h-1 bg-[#6E8F3D] mx-auto mb-6"></div>
            <p className="text-gray-300 text-lg">
              We believe in building strong partnerships with our clients to deliver sustainable and responsible development projects.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
              <div className="w-16 h-16 bg-[#6E8F3D]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Handshake className="h-8 w-8 text-[#6E8F3D]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Partnership Approach</h3>
              <p className="text-gray-300 text-sm">
                We work closely with our clients, understanding their unique needs and objectives to deliver tailored solutions.
              </p>
            </div>
            <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
              <div className="w-16 h-16 bg-[#6E8F3D]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-[#6E8F3D]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Stakeholder Engagement</h3>
              <p className="text-gray-300 text-sm">
                We engage all stakeholders throughout the project lifecycle to ensure inclusive and sustainable outcomes.
              </p>
            </div>
            <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
              <div className="w-16 h-16 bg-[#6E8F3D]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-[#6E8F3D]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Long-term Value</h3>
              <p className="text-gray-300 text-sm">
                We focus on creating lasting value for our clients, communities, and the environment beyond project completion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Integrated Consulting Support Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#6E8F3D] font-semibold text-sm uppercase tracking-wider">Our Capabilities</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F3A5A] mt-3 mb-6">
              Integrated Consulting Support
            </h2>
            <div className="w-20 h-1 bg-[#6E8F3D] mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg">
              We deliver comprehensive consulting solutions that integrate environmental, social, engineering, 
              and management expertise to support projects across all sectors.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <div key={index} className="flex items-start gap-4 p-6 bg-white rounded-xl hover:shadow-lg transition">
                  <div className="w-12 h-12 bg-[#6E8F3D]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="h-6 w-6 text-[#6E8F3D]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#0F3A5A] mb-2">{capability.title}</h3>
                    <p className="text-gray-500 text-sm">{capability.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#6E8F3D]">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Work Together?</h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Whatever sector you operate in, our team is ready to provide the environmental, social, and engineering support you need.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-[#6E8F3D] px-8 py-3 rounded-lg hover:bg-gray-100 transition shadow-lg"
            >
              Contact Our Experts <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-[#6E8F3D] transition"
            >
              View Our Portfolio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sectors;