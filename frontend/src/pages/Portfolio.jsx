import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Briefcase, 
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  ExternalLink,
  TrendingUp,
  Droplets,
  Factory,
  Users,
  Leaf,
  HardHat,
  Award,
  Star,
  Building2,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  // Projects Data
  const projects = [
    {
      id: 1,
      title: "Gypsum Powder Processing Plant ESIA",
      client: "Mahad Gypsum Ltd",
      location: "Bulla Dagah, Garissa County, Kenya",
      year: "2025",
      status: "Completed",
      category: "Industrial",
      description: "Comprehensive Environmental and Social Impact Assessment (ESIA) and Environmental and Social Management Plan (ESMP) for a gypsum powder processing plant. The project included baseline studies, stakeholder consultations, impact analysis, and development of mitigation measures to ensure regulatory compliance and sustainable operations.",
      image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600&h=400&fit=crop",
      icon: Factory,
      keyFindings: "Identified key environmental risks including air quality, noise pollution, and waste management. Developed comprehensive mitigation strategies.",
      outcomes: "Successfully obtained NEMA license. Project implemented with full regulatory compliance."
    },
    {
      id: 2,
      title: "17 Water Pans ESIA & Monitoring",
      client: "Ewaso Nyiro North Development Authority (ENNDA)",
      location: "Northern Kenya",
      year: "2025",
      status: "Completed",
      category: "Water Resources",
      description: "Environmental and Social Impact Assessment and monitoring for seventeen (17) water pans in arid and semi-arid regions of Northern Kenya. The project involved baseline environmental assessments, stakeholder engagement, and development of Environmental and Social Management Plans (ESMPs).",
      image: "https://images.unsplash.com/photo-1581092335270-8b0b0c3f2f1e?w=600&h=400&fit=crop",
      icon: Droplets,
      keyFindings: "Assessed water quality, ecosystem impact, and community water access. Developed sustainable water management plans.",
      outcomes: "Enhanced water access for 50+ communities. Improved drought resilience in the region."
    },
    {
      id: 3,
      title: "Artisanal Gold Mining ESIA",
      client: "Hamakosi & Hilltop Cooperative Societies",
      location: "Marsabit County, Kenya",
      year: "2024",
      status: "Completed",
      category: "Mining",
      description: "Environmental and Social Impact Assessment for artisanal gold mining projects in Marsabit County. The project included comprehensive environmental baseline studies, socio-economic surveys, stakeholder consultations, and development of mitigation measures for responsible mining practices.",
      image: "https://images.unsplash.com/photo-1581092335270-8b0b0c3f2f1e?w=600&h=400&fit=crop",
      icon: TrendingUp,
      keyFindings: "Identified mercury contamination risks, habitat disruption, and community health concerns. Developed safer mining practices.",
      outcomes: "Implemented safer mining techniques. Improved community awareness on environmental protection."
    },
    {
      id: 4,
      title: "Community Water Supply Projects ESIA",
      client: "Development Partners & County Government",
      location: "Various Counties, Kenya",
      year: "2024",
      status: "Completed",
      category: "Water Resources",
      description: "Environmental and Social Assessment for multiple community water supply projects across different counties. The projects focused on improving access to clean water while ensuring environmental sustainability and social inclusivity.",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop",
      icon: Droplets,
      keyFindings: "Assessed water source sustainability, community impact, and environmental safeguards.",
      outcomes: "Improved water access for 100,000+ community members. Sustainable water management systems established."
    },
    {
      id: 5,
      title: "Deqsane Mining Co. Gypsum ESIA",
      client: "Deqsane Mining Co. Ltd",
      location: "Garissa County, Kenya",
      year: "2024",
      status: "Completed",
      category: "Mining",
      description: "Environmental and Social Impact Assessment for gypsum mining operations in Garissa County. The project included comprehensive environmental studies, community engagement, and development of sustainable mining practices.",
      image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600&h=400&fit=crop",
      icon: Factory,
      keyFindings: "Evaluated mining impacts on local ecosystems, air quality, and community livelihoods.",
      outcomes: "Sustainable mining framework implemented. Community compensation plan established."
    },
    {
      id: 6,
      title: "Infrastructure Development ESIA",
      client: "Kenya National Highways Authority",
      location: "Multiple Locations, Kenya",
      year: "2023",
      status: "Completed",
      category: "Infrastructure",
      description: "Environmental and Social Impact Assessment for major road infrastructure projects, including baseline studies, resettlement action plans, and environmental management planning.",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop",
      icon: HardHat,
      keyFindings: "Assessed displacement impacts, noise pollution, and ecosystem fragmentation.",
      outcomes: "Resettlement action plans implemented. Environmental mitigation measures in place."
    },
    {
      id: 7,
      title: "Renewable Energy Project ESIA",
      client: "Rural Electrification Authority",
      location: "Eastern Region, Kenya",
      year: "2023",
      status: "Ongoing",
      category: "Energy",
      description: "Environmental and Social Impact Assessment for solar and wind energy projects, focusing on land use, biodiversity, and community benefits.",
      image: "https://images.unsplash.com/photo-1581092335270-8b0b0c3f2f1e?w=600&h=400&fit=crop",
      icon: Leaf,
      keyFindings: "Evaluated land use conflicts, bird migration patterns, and community benefit sharing.",
      outcomes: "Renewable energy projects advancing with community support and environmental safeguards."
    },
    {
      id: 8,
      title: "Agricultural Development ESIA",
      client: "Ministry of Agriculture",
      location: "Rift Valley, Kenya",
      year: "2023",
      status: "Completed",
      category: "Agriculture",
      description: "Strategic Environmental Assessment for large-scale agricultural development projects, including irrigation schemes and crop expansion programs.",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop",
      icon: TrendingUp,
      keyFindings: "Assessed water usage impacts, soil degradation risks, and biodiversity loss.",
      outcomes: "Sustainable agricultural practices adopted. Water conservation measures implemented."
    },
    {
      id: 9,
      title: "Urban Development Environmental Audit",
      client: "Nairobi City County",
      location: "Nairobi, Kenya",
      year: "2022",
      status: "Completed",
      category: "Urban Development",
      description: "Comprehensive environmental audit for urban development projects, evaluating compliance with environmental regulations and identifying areas for improvement.",
      image: "https://images.unsplash.com/photo-1581092335270-8b0b0c3f2f1e?w=600&h=400&fit=crop",
      icon: Building2,
      keyFindings: "Identified compliance gaps in waste management, air quality, and green spaces.",
      outcomes: "Improved environmental compliance. Enhanced urban planning with green infrastructure."
    }
  ];

  // Categories for filtering
  const categories = ['All', 'Industrial', 'Water Resources', 'Mining', 'Infrastructure', 'Energy', 'Agriculture', 'Urban Development'];

  // Filter projects based on category and search
  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pagination
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Status color mapping
  const getStatusColor = (status) => {
    return status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-24 bg-[#0F3A5A] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&h=400&fit=crop"
            alt="Portfolio Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Portfolio</h1>
            <div className="w-20 h-1 bg-[#6E8F3D] mx-auto mb-6"></div>
            <p className="text-gray-200 text-lg">
              Explore our successful projects demonstrating excellence in environmental and social safeguards implementation across Kenya and the Horn of Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-[#6E8F3D]">{projects.length}+</div>
              <p className="text-sm text-gray-600 mt-1">Projects Delivered</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#6E8F3D]">9+</div>
              <p className="text-sm text-gray-600 mt-1">Years Experience</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#6E8F3D]">15+</div>
              <p className="text-sm text-gray-600 mt-1">Happy Clients</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#6E8F3D]">6+</div>
              <p className="text-sm text-gray-600 mt-1">Counties Served</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Search Section */}
      <section className="py-8 bg-white sticky top-16 z-40 shadow-sm">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects by title, client, or location..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6E8F3D] focus:ring-2 focus:ring-[#6E8F3D]/20"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium ${
                    selectedCategory === category
                      ? 'bg-[#6E8F3D] text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          {currentProjects.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentProjects.map((project) => {
                  const Icon = project.icon;
                  return (
                    <div
                      key={project.id}
                      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                      onClick={() => setSelectedProject(project)}
                    >
                      {/* Project Image */}
                      <div className="relative overflow-hidden h-56">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute top-4 right-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}>
                            {project.status}
                          </span>
                        </div>
                        <div className="absolute bottom-4 left-4">
                          <div className="flex items-center gap-2">
                            <div className="bg-[#6E8F3D] p-1.5 rounded-lg">
                              <Icon className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-white text-sm font-semibold">{project.category}</span>
                          </div>
                        </div>
                      </div>

                      {/* Project Info */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-[#0F3A5A] mb-3 line-clamp-2 group-hover:text-[#6E8F3D] transition">
                          {project.title}
                        </h3>
                        <div className="space-y-2 text-sm text-gray-600 mb-4">
                          <p className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4 text-[#6E8F3D]" />
                            <span>{project.client}</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-[#6E8F3D]" />
                            <span>{project.location}</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-[#6E8F3D]" />
                            <span>{project.year}</span>
                          </p>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                          {project.description}
                        </p>
                        <button className="mt-4 inline-flex items-center gap-2 text-[#6E8F3D] font-semibold text-sm hover:gap-3 transition-all">
                          View Details <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12 gap-2">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`px-4 py-2 rounded-lg transition ${
                        currentPage === number
                          ? 'bg-[#6E8F3D] text-white'
                          : 'border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {number}
                    </button>
                  ))}
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-[#0F3A5A] mb-2">No Projects Found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="mt-4 text-[#6E8F3D] font-semibold hover:underline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto" onClick={() => setSelectedProject(null)}>
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm"></div>
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div 
              className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                <h2 className="text-xl font-bold text-[#0F3A5A]">Project Details</h2>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Project Image */}
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-80 object-cover rounded-xl mb-6"
                />

                {/* Project Header */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedProject.status)}`}>
                      {selectedProject.status}
                    </span>
                    <span className="bg-[#6E8F3D]/10 text-[#6E8F3D] px-3 py-1 rounded-full text-xs font-semibold">
                      {selectedProject.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#0F3A5A] mb-4">{selectedProject.title}</h3>
                  <div className="grid md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl mb-6">
                    <div>
                      <p className="text-xs text-gray-500">Client</p>
                      <p className="font-semibold text-[#0F3A5A]">{selectedProject.client}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="font-semibold text-[#0F3A5A]">{selectedProject.location}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Year</p>
                      <p className="font-semibold text-[#0F3A5A]">{selectedProject.year}</p>
                    </div>
                  </div>
                </div>

                {/* Project Description */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-[#0F3A5A] mb-3">Project Description</h4>
                  <p className="text-gray-600 leading-relaxed">{selectedProject.description}</p>
                </div>

                {/* Key Findings */}
                {selectedProject.keyFindings && (
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-[#0F3A5A] mb-3">Key Findings</h4>
                    <p className="text-gray-600 leading-relaxed">{selectedProject.keyFindings}</p>
                  </div>
                )}

                {/* Outcomes */}
                {selectedProject.outcomes && (
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-[#0F3A5A] mb-3">Project Outcomes</h4>
                    <p className="text-gray-600 leading-relaxed">{selectedProject.outcomes}</p>
                  </div>
                )}

                {/* Call to Action */}
                <div className="mt-8 p-6 bg-gradient-to-r from-[#0F3A5A] to-[#0A2A42] rounded-xl text-center">
                  <h4 className="text-xl font-bold text-white mb-2">Need Similar Services?</h4>
                  <p className="text-gray-200 mb-4">Contact us to discuss your project requirements</p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-[#6E8F3D] text-white px-6 py-2 rounded-lg hover:bg-[#5a7a32] transition"
                  >
                    Contact Us Today <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="py-16 bg-[#6E8F3D]">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Have a Project in Mind?</h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help you achieve your development goals while ensuring environmental sustainability.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-[#6E8F3D] px-8 py-3 rounded-lg hover:bg-gray-100 transition shadow-lg"
          >
            Start Your Project <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;