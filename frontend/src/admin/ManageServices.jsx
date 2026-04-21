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
  Shield,
  ClipboardCheck,
  TrendingUp,
  Settings,
  Users,
  HardHat,
  Leaf,
  Ruler,
  PenTool,
  Map,
  Droplets,
  Building2,
  Briefcase,
  DollarSign,
  Globe,
  GraduationCap,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';

const API_URL = 'http://127.0.0.1:5000/api';

const ManageServices = () => {
  const { setCurrentPageTitle } = useOutletContext();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState(['all', 'environmental', 'engineering', 'advisory']);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [deletingService, setDeletingService] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const itemsPerPage = 10;

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    category: 'environmental',
    description: '',
    benefits: [''],
    icon: 'Shield',
    order: 0,
    is_active: true
  });

  // Icon options
  const iconOptions = [
    { value: 'Shield', label: 'Shield', icon: Shield },
    { value: 'ClipboardCheck', label: 'Clipboard Check', icon: ClipboardCheck },
    { value: 'TrendingUp', label: 'Trending Up', icon: TrendingUp },
    { value: 'Settings', label: 'Settings', icon: Settings },
    { value: 'Users', label: 'Users', icon: Users },
    { value: 'HardHat', label: 'Hard Hat', icon: HardHat },
    { value: 'Leaf', label: 'Leaf', icon: Leaf },
    { value: 'Ruler', label: 'Ruler', icon: Ruler },
    { value: 'PenTool', label: 'Pen Tool', icon: PenTool },
    { value: 'Map', label: 'Map', icon: Map },
    { value: 'Droplets', label: 'Droplets', icon: Droplets },
    { value: 'Building2', label: 'Building', icon: Building2 },
    { value: 'Briefcase', label: 'Briefcase', icon: Briefcase },
    { value: 'DollarSign', label: 'Dollar Sign', icon: DollarSign },
    { value: 'Globe', label: 'Globe', icon: Globe },
    { value: 'GraduationCap', label: 'Graduation Cap', icon: GraduationCap },
    { value: 'BarChart3', label: 'Bar Chart', icon: BarChart3 }
  ];

  // Category options
  const categoryOptions = [
    { value: 'environmental', label: 'Environmental & Social', color: 'bg-green-100 text-green-700' },
    { value: 'engineering', label: 'Engineering & Infrastructure', color: 'bg-blue-100 text-blue-700' },
    { value: 'advisory', label: 'Advisory & Management', color: 'bg-purple-100 text-purple-700' }
  ];

  useEffect(() => {
    setCurrentPageTitle('Manage Services');
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setErrorMessage('');
      const response = await fetch(`${API_URL}/services`, {
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
      setServices(data.services || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      setErrorMessage('Failed to load services. Please make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleBenefitChange = (index, value) => {
    const newBenefits = [...formData.benefits];
    newBenefits[index] = value;
    setFormData(prev => ({ ...prev, benefits: newBenefits }));
  };

  const addBenefit = () => {
    setFormData(prev => ({ ...prev, benefits: [...prev.benefits, ''] }));
  };

  const removeBenefit = (index) => {
    const newBenefits = formData.benefits.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, benefits: newBenefits }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setErrorMessage('');
    
    try {
      // Filter out empty benefits
      const filteredBenefits = formData.benefits.filter(b => b.trim() !== '');
      
      const serviceData = {
        ...formData,
        benefits: filteredBenefits
      };
      
      const url = editingService 
        ? `${API_URL}/services/${editingService.id}`
        : `${API_URL}/services`;
      
      const response = await fetch(url, {
        method: editingService ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(serviceData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccessMessage(editingService ? 'Service updated successfully!' : 'Service created successfully!');
        fetchServices();
        closeModal();
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setErrorMessage(data.error || 'Failed to save service');
      }
    } catch (error) {
      console.error('Error saving service:', error);
      setErrorMessage('Network error. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingService) return;
    
    setFormLoading(true);
    try {
      const response = await fetch(`${API_URL}/services/${deletingService.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      
      if (response.ok) {
        setSuccessMessage('Service deleted successfully!');
        fetchServices();
        closeDeleteModal();
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        const data = await response.json();
        setErrorMessage(data.error || 'Failed to delete service');
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      setErrorMessage('Network error. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  const openModal = (service = null) => {
    if (service) {
      setEditingService(service);
      setFormData({
        title: service.title || '',
        category: service.category || 'environmental',
        description: service.description || '',
        benefits: service.benefits?.length ? service.benefits : [''],
        icon: service.icon || 'Shield',
        order: service.order || 0,
        is_active: service.is_active !== undefined ? service.is_active : true
      });
    } else {
      setEditingService(null);
      setFormData({
        title: '',
        category: 'environmental',
        description: '',
        benefits: [''],
        icon: 'Shield',
        order: 0,
        is_active: true
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingService(null);
    setErrorMessage('');
  };

  const openDeleteModal = (service) => {
    setDeletingService(service);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletingService(null);
    setErrorMessage('');
  };

  // Filter services
  const filteredServices = services.filter(service => {
    const matchesSearch = service.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          service.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const paginatedServices = filteredServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getCategoryColor = (category) => {
    switch(category) {
      case 'environmental': return 'bg-green-100 text-green-700';
      case 'engineering': return 'bg-blue-100 text-blue-700';
      case 'advisory': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryLabel = (category) => {
    switch(category) {
      case 'environmental': return 'Environmental & Social';
      case 'engineering': return 'Engineering & Infrastructure';
      case 'advisory': return 'Advisory & Management';
      default: return category;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <Loader className="h-10 w-10 text-emerald-600 animate-spin mb-4" />
        <p className="text-gray-500">Loading services...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Manage Services</h2>
          <p className="text-gray-500 mt-1">Create, edit, and manage your service offerings</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchServices}
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
            Add New Service
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
              placeholder="Search services by title or description..."
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
                className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition capitalize ${
                  selectedCategory === category
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? 'All Services' : getCategoryLabel(category)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {paginatedServices.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No services found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
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
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Service</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Category</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Description</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Benefits</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Order</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedServices.map((service) => (
                    <tr key={service.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="font-medium text-gray-800">{service.title}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(service.category)}`}>
                          {getCategoryLabel(service.category)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-md truncate">
                        {service.description}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {service.benefits?.slice(0, 2).map((benefit, idx) => (
                            <span key={idx} className="inline-block px-1.5 py-0.5 bg-gray-100 rounded text-xs text-gray-600">
                              {benefit.length > 20 ? benefit.substring(0, 20) + '...' : benefit}
                            </span>
                          ))}
                          {service.benefits?.length > 2 && (
                            <span className="text-xs text-gray-400">+{service.benefits.length - 2} more</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {service.is_active ? (
                          <span className="flex items-center gap-1 text-green-600 text-xs">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                            Active
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-gray-400 text-xs">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{service.order}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openModal(service)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => openDeleteModal(service)}
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
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredServices.length)} of {filteredServices.length} services
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
                  {editingService ? 'Edit Service' : 'Add New Service'}
                </h2>
                <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full transition">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Basic Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Title *</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    >
                      {categoryOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                    <input
                      type="number"
                      name="order"
                      value={formData.order}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
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
                    placeholder="Detailed description of the service..."
                  ></textarea>
                </div>

                {/* Benefits */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Key Benefits</label>
                  {formData.benefits.map((benefit, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={benefit}
                        onChange={(e) => handleBenefitChange(index, e.target.value)}
                        placeholder={`Benefit ${index + 1}`}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeBenefit(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addBenefit}
                    className="mt-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
                  >
                    <Plus size={14} />
                    Add Benefit
                  </button>
                </div>

                {/* Active Status */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <label className="text-sm font-medium text-gray-700">Active (show on website)</label>
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
                    {editingService ? 'Update Service' : 'Create Service'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && deletingService && (
        <div className="fixed inset-0 z-50 overflow-y-auto" onClick={closeDeleteModal}>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm"></div>
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
              <div className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trash2 size={28} className="text-red-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Delete Service</h3>
                  <p className="text-gray-500 mb-6">
                    Are you sure you want to delete "{deletingService.title}"? This action cannot be undone.
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

export default ManageServices;