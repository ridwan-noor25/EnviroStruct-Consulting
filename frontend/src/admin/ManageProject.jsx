import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  X,
  Check,
  AlertCircle,
  Loader,
  Image as ImageIcon,
  TrendingUp,
  Droplets,
  Factory,
  Users,
  Leaf,
  HardHat,
  Building2,
  Star,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Briefcase
} from 'lucide-react';

const API_URL = 'http://127.0.0.1:5000/api';

const ManageProjects = () => {
  const { setCurrentPageTitle } = useOutletContext();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deletingProject, setDeletingProject] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const itemsPerPage = 10;

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    location: '',
    year: new Date().getFullYear().toString(),
    status: 'Completed',
    category: '',
    description: '',
    image: '',
    icon: 'Factory',
    keyFindings: '',
    outcomes: '',
    featured: false,
    order: 0
  });

  // Icon options
  const iconOptions = [
    { value: 'Factory', label: 'Factory/Industrial', icon: Factory },
    { value: 'Droplets', label: 'Water Resources', icon: Droplets },
    { value: 'TrendingUp', label: 'Growth/Trending', icon: TrendingUp },
    { value: 'Users', label: 'Community', icon: Users },
    { value: 'Leaf', label: 'Environment', icon: Leaf },
    { value: 'HardHat', label: 'Infrastructure', icon: HardHat },
    { value: 'Building2', label: 'Urban Development', icon: Building2 },
    { value: 'Briefcase', label: 'General', icon: Briefcase }
  ];

  // Status options
  const statusOptions = ['Completed', 'Ongoing', 'Planned', 'On Hold'];

  useEffect(() => {
    setCurrentPageTitle('Manage Projects');
    fetchProjects();
    fetchCategories();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setErrorMessage('');
      const response = await fetch(`${API_URL}/projects`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setErrorMessage('Failed to load projects. Please make sure the backend server is running on port 5000');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/projects/categories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setCategories(data.categories || ['All']);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories(['All', 'Industrial', 'Water Resources', 'Mining', 'Infrastructure', 'Energy', 'Agriculture', 'Urban Development']);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setErrorMessage('');
    
    try {
      const token = localStorage.getItem('adminToken');
      const url = editingProject 
        ? `${API_URL}/projects/${editingProject.id}`
        : `${API_URL}/projects`;
      
      const response = await fetch(url, {
        method: editingProject ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccessMessage(editingProject ? 'Project updated successfully!' : 'Project created successfully!');
        fetchProjects();
        closeModal();
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setErrorMessage(data.error || 'Failed to save project');
      }
    } catch (error) {
      console.error('Error saving project:', error);
      setErrorMessage('Network error. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingProject) return;
    
    setFormLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/projects/${deletingProject.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      
      if (response.ok) {
        setSuccessMessage('Project deleted successfully!');
        fetchProjects();
        closeDeleteModal();
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        const data = await response.json();
        setErrorMessage(data.error || 'Failed to delete project');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      setErrorMessage('Network error. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  const openModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title || '',
        client: project.client || '',
        location: project.location || '',
        year: project.year || '',
        status: project.status || 'Completed',
        category: project.category || '',
        description: project.description || '',
        image: project.image || '',
        icon: project.icon || 'Factory',
        keyFindings: project.keyFindings || '',
        outcomes: project.outcomes || '',
        featured: project.featured || false,
        order: project.order || 0
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        client: '',
        location: '',
        year: new Date().getFullYear().toString(),
        status: 'Completed',
        category: '',
        description: '',
        image: '',
        icon: 'Factory',
        keyFindings: '',
        outcomes: '',
        featured: false,
        order: 0
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProject(null);
    setErrorMessage('');
  };

  const openDeleteModal = (project) => {
    setDeletingProject(project);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletingProject(null);
    setErrorMessage('');
  };

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.client?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'bg-green-100 text-green-700';
      case 'Ongoing': return 'bg-blue-100 text-blue-700';
      case 'Planned': return 'bg-purple-100 text-purple-700';
      case 'On Hold': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <Loader className="h-10 w-10 text-emerald-600 animate-spin mb-4" />
        <p className="text-gray-500">Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Manage Projects</h2>
          <p className="text-gray-500 mt-1">Create, edit, and manage your portfolio projects</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              fetchProjects();
              fetchCategories();
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all flex items-center gap-2"
          >
            <RefreshCw size={18} />
            Refresh
          </button>
          <button
            onClick={() => openModal()}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-lg hover:from-emerald-500 hover:to-teal-500 transition-all flex items-center gap-2 shadow-md"
          >
            <Plus size={18} />
            Add New Project
          </button>
        </div>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2 text-green-700">
          <Check size={18} />
          <span>{successMessage}</span>
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2 text-red-700">
          <AlertCircle size={18} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects by title, client, or location..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition ${
                  selectedCategory === category
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {paginatedProjects.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No projects found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="mt-4 text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Project</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Client</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Location</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Year</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Category</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Featured</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedProjects.map((project) => (
                    <tr key={project.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            {project.image ? (
                              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <ImageIcon size={16} className="text-gray-400" />
                              </div>
                            )}
                          </div>
                          <span className="font-medium text-gray-800 line-clamp-1">{project.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{project.client}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{project.location}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{project.year}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                          {project.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {project.featured ? (
                          <Star size={16} className="text-yellow-500 fill-yellow-500" />
                        ) : (
                          <span className="text-gray-400 text-xs">No</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openModal(project)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => openDeleteModal(project)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredProjects.length)} of {filteredProjects.length} projects
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-1 rounded-lg transition ${
                          currentPage === pageNum
                            ? 'bg-emerald-600 text-white'
                            : 'border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto" onClick={closeModal}>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm"></div>
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h2>
                <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full transition">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Basic Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Client *</label>
                    <input
                      type="text"
                      name="client"
                      value={formData.client}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Year *</label>
                    <input
                      type="text"
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    >
                      {statusOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    >
                      <option value="">Select Category</option>
                      {categories.filter(c => c !== 'All').map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                    <select
                      name="icon"
                      value={formData.icon}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    >
                      {iconOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                    <input
                      type="number"
                      name="order"
                      value={formData.order}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                  {formData.image && (
                    <div className="mt-2">
                      <img src={formData.image} alt="Preview" className="h-20 w-auto rounded-lg object-cover" />
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  ></textarea>
                </div>

                {/* Key Findings */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Key Findings</label>
                  <textarea
                    name="keyFindings"
                    value={formData.keyFindings}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  ></textarea>
                </div>

                {/* Outcomes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Outcomes</label>
                  <textarea
                    name="outcomes"
                    value={formData.outcomes}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  ></textarea>
                </div>

                {/* Featured Checkbox */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <label className="text-sm font-medium text-gray-700">Featured Project</label>
                </div>

                {/* Form Actions */}
                <div className="flex gap-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-500 hover:to-teal-500 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formLoading ? <Loader size={16} className="animate-spin" /> : <Check size={16} />}
                    {editingProject ? 'Update Project' : 'Create Project'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && deletingProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto" onClick={closeDeleteModal}>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm"></div>
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
              <div className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trash2 size={28} className="text-red-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Delete Project</h3>
                  <p className="text-gray-500 mb-6">
                    Are you sure you want to delete "{deletingProject.title}"? This action cannot be undone.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={closeDeleteModal}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDelete}
                      disabled={formLoading}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {formLoading ? <Loader size={16} className="animate-spin" /> : <Trash2 size={16} />}
                      Delete
                    </button>
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

export default ManageProjects;