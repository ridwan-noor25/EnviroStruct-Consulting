import React, { useEffect, useState } from 'react';
import { 
  Leaf, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight, 
  Briefcase,
  Globe,
  Shield,
  BarChart3,
  HardHat,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  Star,
  Clock,
  Building2,
  Heart,
  Sun,
  Droplets,
  Factory,
  Landmark,
  Handshake,
  LineChart,
  Computer,
  GraduationCap,
  ClipboardCheck,
  FileText,
  Settings,
  Home as HomeIcon,
  Truck,
  Zap,
  Eye,
  ThumbsUp,
  Award,
  Target
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Expertise areas with images
  const expertiseAreas = [
    { 
      image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=400&h=300&fit=crop",
      title: "Environmental Impact Assessment",
      description: "Comprehensive ESIA studies for regulatory compliance"
    },
    { 
      image: "https://images.unsplash.com/photo-1581092335270-8b0b0c3f2f1e?w=400&h=300&fit=crop",
      title: "Engineering & Design",
      description: "Feasibility studies and technical assessments"
    },
    { 
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop",
      title: "Sustainability Advisory",
      description: "Climate risk and ESG integration services"
    },
    { 
      image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=400&h=300&fit=crop",
      title: "Social Safeguards",
      description: "Community engagement and resettlement planning"
    }
  ];

  // Core services (condensed - first 6 on homepage)
  const featuredServices = [
    { icon: Leaf, title: "Environmental & Social Impact Assessments", description: "Comprehensive ESIA studies ensuring regulatory compliance." },
    { icon: ClipboardCheck, title: "Environmental Audits", description: "Systematic evaluation of environmental performance." },
    { icon: Shield, title: "Occupational Health & Safety", description: "Workplace safety assessments and compliance programs." },
    { icon: HardHat, title: "Engineering & Pre-Design", description: "Feasibility studies and technical assessments." },
    { icon: Briefcase, title: "Project Management", description: "Comprehensive planning, supervision, and monitoring." },
    { icon: TrendingUp, title: "Sustainability & Risk Management", description: "Climate risk screening and ESG integration." }
  ];

  // All services (for the full list)
  const allServices = [
    { icon: Leaf, title: "Environmental and Social Impact Assessments", description: "Comprehensive ESIA studies ensuring regulatory compliance and responsible development." },
    { icon: ClipboardCheck, title: "Environmental Audits", description: "Systematic evaluation of environmental performance and regulatory compliance." },
    { icon: FileText, title: "Strategic Environmental and Social Assessments", description: "High-level assessments for policies, plans, and programs." },
    { icon: Settings, title: "Environmental and Social Management Systems", description: "Development of structured management systems for risk management." },
    { icon: HomeIcon, title: "Resettlement Action Plans", description: "Fair and transparent resettlement processes with livelihood restoration." },
    { icon: Shield, title: "Occupational Health and Safety Advisory", description: "Workplace safety assessments and compliance programs." },
    { icon: TrendingUp, title: "Sustainability and Environmental Risk Management", description: "Climate risk screening, ESG integration, and sustainability advisory." },
    { icon: HardHat, title: "Engineering and Pre-Design Studies", description: "Feasibility studies, engineering designs, and technical assessments." },
    { icon: Briefcase, title: "Project Management Services", description: "Comprehensive project planning, supervision, and monitoring." },
    { icon: Building2, title: "Business and Organizational Advisory", description: "Strategic planning and operational efficiency improvement." },
    { icon: LineChart, title: "Financial Advisory Services", description: "Financial planning, investment analysis, and due diligence." },
    { icon: Computer, title: "IT and Digital Solutions", description: "Digital transformation, cybersecurity, and data analytics." },
    { icon: GraduationCap, title: "Training and Capacity Development", description: "Professional training and institutional capacity building." }
  ];

  // Target clients data
  const targetClients = [
    { icon: Landmark, title: "Government & Public Institutions", description: "National and county governments, regulatory agencies" },
    { icon: Globe, title: "Development Partners", description: "Multilateral institutions, donor agencies, and NGOs" },
    { icon: Factory, title: "Private Sector & Investors", description: "Infrastructure, mining, agriculture, energy sectors" },
    { icon: Truck, title: "Infrastructure & Engineering Firms", description: "Construction and engineering consulting firms" }
  ];

  // Featured projects data with high-quality images
  const featuredProjects = [
    {
      title: "Gypsum Powder Processing Plant ESIA",
      client: "Mahad Gypsum Ltd",
      location: "Garissa County, Kenya",
      year: "2025",
      description: "Comprehensive Environmental and Social Impact Assessment for a gypsum processing facility, including stakeholder engagement and ESMP development.",
      image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600&h=400&fit=crop",
      category: "Industrial"
    },
    {
      title: "17 Water Pans ESIA & Monitoring",
      client: "Ewaso Nyiro North Development Authority",
      location: "Northern Kenya",
      year: "2025",
      description: "Environmental and Social Impact Assessment and monitoring for seventeen water pans in arid and semi-arid regions, enhancing water access for communities.",
      image: "https://images.unsplash.com/photo-1581092335270-8b0b0c3f2f1e?w=600&h=400&fit=crop",
      category: "Water Resources"
    },
    {
      title: "Artisanal Gold Mining ESIA",
      client: "Hamakosi & Hilltop Cooperative Societies",
      location: "Marsabit County, Kenya",
      year: "2024",
      description: "ESIA for artisanal gold mining projects with comprehensive community engagement and environmental management planning.",
      image: "https://images.unsplash.com/photo-1581092335270-8b0b0c3f2f1e?w=600&h=400&fit=crop",
      category: "Mining"
    }
  ];

  // Sustainability pillars
  const sustainabilityPillars = [
    { icon: Heart, title: "Environmental Stewardship", description: "Protecting natural resources for future generations" },
    { icon: Sun, title: "Climate Resilience", description: "Building adaptive capacity for climate challenges" },
    { icon: Droplets, title: "Responsible Infrastructure", description: "Balancing progress with environmental protection" },
    { icon: Users, title: "Social Responsibility", description: "Inclusive development benefiting all communities" }
  ];

  // Differentiators
  const differentiators = [
    { icon: Star, title: "Multidisciplinary Expertise", description: "Integrated environmental, social, and engineering solutions" },
    { icon: Shield, title: "Strong Regulatory Knowledge", description: "Deep understanding of national and international standards" },
    { icon: Globe, title: "Local Knowledge with Global Standards", description: "Regional expertise with international best practices" },
    { icon: CheckCircle, title: "Practical Implementation", description: "Results-oriented strategies for real-world application" },
    { icon: Users, title: "Experienced Team", description: "Seasoned professionals with diverse technical backgrounds" },
    { icon: Handshake, title: "Long-term Partnerships", description: "Committed to building lasting client relationships" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&h=900&fit=crop"
            alt="Sustainable development"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F3A5A]/90 to-[#0F3A5A]/70"></div>
        </div>
        
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#6E8F3D]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#6E8F3D]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center bg-[#6E8F3D]/20 backdrop-blur-sm rounded-full px-5 py-2 mb-6 border border-[#6E8F3D]/30">
              <span className="text-[#6E8F3D] text-sm font-semibold tracking-wide">✦ Since 2017</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Building a <span className="text-[#6E8F3D]">Sustainable</span> Future Together
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
              EnviroStruct Consulting International delivers innovative environmental, social, and engineering solutions 
              that drive responsible development and infrastructure excellence across Kenya and beyond.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/portfolio" className="bg-[#6E8F3D] text-white px-8 py-3 rounded-lg hover:bg-[#5a7a32] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2">
                Explore Our Work <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/contact" className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-[#0F3A5A] transition-all duration-300">
                Free Consultation
              </Link>
            </div>
            
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20">
              <div>
                <div className="text-3xl font-bold text-[#6E8F3D]">50+</div>
                <div className="text-sm text-gray-300">Projects Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#6E8F3D]">9+</div>
                <div className="text-sm text-gray-300">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#6E8F3D]">100%</div>
                <div className="text-sm text-gray-300">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

     {/* Company Introduction */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-[#6E8F3D] font-semibold text-sm uppercase tracking-wider">Who We Are</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F3A5A] mt-3 mb-6">
              Your Trusted Partner in <span className="text-[#6E8F3D]">Sustainable Development</span>
            </h2>
            <div className="w-20 h-1 bg-[#6E8F3D] mx-auto mb-8"></div>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              EnviroStruct Consulting International Limited provides specialized environmental, social, engineering, and sustainability 
              advisory services that support responsible development and infrastructure delivery.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              The firm works with <span className="font-semibold text-[#6E8F3D]">government institutions</span>, 
              <span className="font-semibold text-[#6E8F3D]"> private sector organizations</span>, 
              <span className="font-semibold text-[#6E8F3D]"> development partners</span>, and 
              <span className="font-semibold text-[#6E8F3D]"> community-based initiatives</span> to promote environmental 
              stewardship, social responsibility, and sustainable economic growth across Kenya and the wider region.
            </p>
          </div>
        </div>
      </section>

      {/* Our Expertise - With Images */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#6E8F3D] font-semibold text-sm uppercase tracking-wider">Our Expertise</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F3A5A] mt-3 mb-4">
              Areas of Specialization
            </h2>
            <div className="w-20 h-1 bg-[#6E8F3D] mx-auto mb-6"></div>
            <p className="text-gray-600">Delivering excellence across key environmental, social, and engineering domains</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {expertiseAreas.map((area, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl shadow-lg">
                <img 
                  src={area.image}
                  alt={area.title}
                  className="w-full h-80 object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F3A5A] via-[#0F3A5A]/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#6E8F3D] transition">{area.title}</h3>
                  <p className="text-sm text-gray-200">{area.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Services - Condensed with View All Button */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#6E8F3D] font-semibold text-sm uppercase tracking-wider">What We Do</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F3A5A] mt-3 mb-4">
              Core Services
            </h2>
            <div className="w-20 h-1 bg-[#6E8F3D] mx-auto mb-6"></div>
            <p className="text-gray-600">Integrated solutions across environmental, social, engineering, and sustainability domains</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="group bg-gray-50 rounded-xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-14 h-14 bg-[#6E8F3D]/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#6E8F3D] transition-all duration-300">
                    <Icon className="h-7 w-7 text-[#6E8F3D] group-hover:text-white transition" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0F3A5A] mb-3">{service.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <Link 
              to="/services" 
              className="inline-flex items-center gap-2 bg-[#6E8F3D] text-white px-8 py-3 rounded-lg hover:bg-[#5a7a32] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              View All Services <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Differentiators */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#6E8F3D] font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0F3A5A] mt-3 mb-6">
                Setting the Standard in <span className="text-[#6E8F3D]">Consulting Excellence</span>
              </h2>
              <div className="w-20 h-1 bg-[#6E8F3D] mb-8"></div>
              <p className="text-gray-600 text-lg mb-8">
                What sets EnviroStruct apart is our unwavering commitment to quality, innovation, and client success.
              </p>
              <div className="space-y-4">
                {differentiators.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-xl hover:shadow-md transition">
                      <div className="w-10 h-10 bg-[#6E8F3D]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="h-5 w-5 text-[#6E8F3D]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#0F3A5A] mb-1">{item.title}</h3>
                        <p className="text-gray-500 text-sm">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#6E8F3D]/20 rounded-2xl"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#6E8F3D]/20 rounded-2xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=500&fit=crop"
                alt="Why choose us"
                className="rounded-2xl shadow-2xl relative z-10 w-full object-cover h-[500px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Target Clients */}
      <section className="py-24 bg-gradient-to-br from-[#0F3A5A] to-[#0A2A42]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#6E8F3D] font-semibold text-sm uppercase tracking-wider">Who We Serve</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
              Our Valued Clients
            </h2>
            <div className="w-20 h-1 bg-[#6E8F3D] mx-auto mb-6"></div>
            <p className="text-gray-300">Trusted by organizations across public, private, and development sectors</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {targetClients.map((client, index) => {
              const Icon = client.icon;
              return (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 border border-white/20">
                  <div className="w-16 h-16 bg-[#6E8F3D]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-[#6E8F3D]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{client.title}</h3>
                  <p className="text-gray-300 text-sm">{client.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Projects - Professional with Visible Images */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#6E8F3D] font-semibold text-sm uppercase tracking-wider">Success Stories</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F3A5A] mt-3 mb-4">
              Featured Projects
            </h2>
            <div className="w-20 h-1 bg-[#6E8F3D] mx-auto mb-6"></div>
            <p className="text-gray-600">Demonstrating excellence in environmental and social safeguards implementation</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <div className="relative overflow-hidden h-64">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-[#6E8F3D] text-white text-xs px-3 py-1 rounded-full font-semibold">{project.category}</span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-[#0F3A5A] text-white text-xs px-3 py-1 rounded-full">{project.year}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#0F3A5A] mb-3 line-clamp-2">{project.title}</h3>
                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <p className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-[#6E8F3D]" /> 
                      <span>{project.client}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[#6E8F3D]" /> 
                      <span>{project.location}</span>
                    </p>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{project.description}</p>
                  <Link 
                    to={`/projects/${index}`} 
                    className="inline-flex items-center gap-2 mt-4 text-[#6E8F3D] font-semibold text-sm hover:gap-3 transition-all"
                  >
                    Read More <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link 
              to="/portfolio" 
              className="inline-flex items-center gap-2 border-2 border-[#6E8F3D] text-[#6E8F3D] px-8 py-3 rounded-lg hover:bg-[#6E8F3D] hover:text-white transition-all duration-300 font-semibold"
            >
              View All Projects <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Commitment to Sustainability */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#6E8F3D] font-semibold text-sm uppercase tracking-wider">Our Promise</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F3A5A] mt-3 mb-4">
              Commitment to Sustainability
            </h2>
            <div className="w-20 h-1 bg-[#6E8F3D] mx-auto mb-6"></div>
            <p className="text-gray-600">Driving positive change through responsible practices and innovative solutions</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sustainabilityPillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 bg-[#6E8F3D]/10 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-[#6E8F3D] transition-all duration-300 group-hover:scale-110">
                    <Icon className="h-10 w-10 text-[#6E8F3D] group-hover:text-white transition" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0F3A5A] mb-3">{pillar.title}</h3>
                  <p className="text-gray-500 text-sm">{pillar.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&h=400&fit=crop"
            alt="CTA Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0F3A5A]/90"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Ready to Start Your Next Project?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Let's work together to create sustainable solutions that benefit your organization, communities, and the environment.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="bg-[#6E8F3D] text-white px-8 py-3 rounded-lg hover:bg-[#5a7a32] transition-all duration-300 shadow-lg transform hover:-translate-y-0.5">
              Contact Us Today
            </Link>
            <Link to="/contact" className="bg-white text-[#0F3A5A] px-8 py-3 rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg transform hover:-translate-y-0.5">
              Request Consultation
            </Link>
            <Link to="/services" className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-[#0F3A5A] transition-all duration-300">
              View Our Expertise
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <span className="text-[#6E8F3D] font-semibold text-sm uppercase tracking-wider">Get In Touch</span>
              <h2 className="text-4xl font-bold text-[#0F3A5A] mt-3 mb-6">
                Let's Discuss Your Project
              </h2>
              <div className="w-20 h-1 bg-[#6E8F3D] mb-8"></div>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Ready to start your next project? Contact us for reliable environmental, social, and engineering consulting services.
              </p>
              <div className="space-y-5">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:shadow-md transition">
                  <div className="w-12 h-12 bg-[#6E8F3D]/10 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-[#6E8F3D]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Visit Us</p>
                    <p className="font-semibold text-[#0F3A5A]">Nairobi, Kenya</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:shadow-md transition">
                  <div className="w-12 h-12 bg-[#6E8F3D]/10 rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-[#6E8F3D]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Call Us</p>
                    <p className="font-semibold text-[#0F3A5A]">+254 (0) 700 000 000</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:shadow-md transition">
                  <div className="w-12 h-12 bg-[#6E8F3D]/10 rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-[#6E8F3D]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email Us</p>
                    <p className="font-semibold text-[#0F3A5A]">info@envirostruct.co.ke</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-[#0F3A5A] mb-6">Send us a message</h3>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                  <input type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-[#6E8F3D] focus:ring-2 focus:ring-[#6E8F3D]/20 outline-none transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-[#6E8F3D] focus:ring-2 focus:ring-[#6E8F3D]/20 outline-none transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                  <textarea rows="5" placeholder="Tell us about your project..." className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-[#6E8F3D] focus:ring-2 focus:ring-[#6E8F3D]/20 outline-none transition"></textarea>
                </div>
                <button type="submit" className="w-full bg-[#6E8F3D] text-white py-3 rounded-lg hover:bg-[#5a7a32] transition-all duration-300 font-semibold shadow-lg transform hover:-translate-y-0.5">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;