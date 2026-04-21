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
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Award,
  GraduationCap,
  Eye,
  EyeOff,
  Users
} from 'lucide-react';

const API_URL = 'http://127.0.0.1:5000/api';

const ManageTeam = () => {
  const { setCurrentPageTitle } = useOutletContext();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [deletingMember, setDeletingMember] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const itemsPerPage = 10;

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    shortExpertise: '',
    coreExpertise: '',
    qualifications: '',
    experience: '',
    email: '',
    phone: '',
    location: '',
    category: 'leadership',
    certifications: [''],
    order: 0,
    isActive: true
  });

  // Category options
  const categoryOptions = [
    { value: 'leadership', label: 'Leadership', color: 'bg-purple-100 text-purple-700' },
    { value: 'environmental', label: 'Environmental', color: 'bg-green-100 text-green-700' },
    { value: 'social', label: 'Social Development', color: 'bg-blue-100 text-blue-700' },
    { value: 'engineering', label: 'Engineering', color: 'bg-orange-100 text-orange-700' },
    { value: 'technical', label: 'Technical', color: 'bg-cyan-100 text-cyan-700' },
    { value: 'monitoring', label: 'Monitoring & Evaluation', color: 'bg-indigo-100 text-indigo-700' }
  ];

  useEffect(() => {
    setCurrentPageTitle('Manage Team');
    fetchTeamMembers();
    fetchCategories();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      setErrorMessage('');
      const url = selectedCategory === 'all' 
        ? `${API_URL}/team` 
        : `${API_URL}/team?category=${selectedCategory}`;
      
      const response = await fetch(url, {
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
      setMembers(data.members || []);
    } catch (error) {
      console.error('Error fetching team members:', error);
      setErrorMessage('Failed to load team members. Please make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/team/categories`, {
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
      setCategories(data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([
        { id: 'all', label: 'All Team' },
        { id: 'leadership', label: 'Leadership' },
        { id: 'environmental', label: 'Environmental' },
        { id: 'social', label: 'Social Development' },
        { id: 'engineering', label: 'Engineering' },
        { id: 'technical', label: 'Technical' },
        { id: 'monitoring', label: 'Monitoring & Evaluation' }
      ]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCertificationChange = (index, value) => {
    const newCerts = [...formData.certifications];
    newCerts[index] = value;
    setFormData(prev => ({ ...prev, certifications: newCerts }));
  };

  const addCertification = () => {
    setFormData(prev => ({ ...prev, certifications: [...prev.certifications, ''] }));
  };

  const removeCertification = (index) => {
    const newCerts = formData.certifications.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, certifications: newCerts }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setErrorMessage('');
    
    try {
      // Filter out empty certifications
      const filteredCerts = formData.certifications.filter(c => c.trim() !== '');
      
      const memberData = {
        ...formData,
        certifications: filteredCerts
      };
      
      const url = editingMember 
        ? `${API_URL}/team/${editingMember.id}`
        : `${API_URL}/team`;
      
      const response = await fetch(url, {
        method: editingMember ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(memberData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccessMessage(editingMember ? 'Team member updated successfully!' : 'Team member created successfully!');
        fetchTeamMembers();
        closeModal();
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setErrorMessage(data.error || 'Failed to save team member');
      }
    } catch (error) {
      console.error('Error saving team member:', error);
      setErrorMessage('Network error. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingMember) return;
    
    setFormLoading(true);
    try {
      const response = await fetch(`${API_URL}/team/${deletingMember.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      
      if (response.ok) {
        setSuccessMessage('Team member deleted successfully!');
        fetchTeamMembers();
        closeDeleteModal();
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        const data = await response.json();
        setErrorMessage(data.error || 'Failed to delete team member');
      }
    } catch (error) {
      console.error('Error deleting team member:', error);
      setErrorMessage('Network error. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  const openModal = (member = null) => {
    if (member) {
      setEditingMember(member);
      setFormData({
        name: member.name || '',
        position: member.position || '',
        shortExpertise: member.shortExpertise || '',
        coreExpertise: member.coreExpertise || '',
        qualifications: member.qualifications || '',
        experience: member.experience || '',
        email: member.email || '',
        phone: member.phone || '',
        location: member.location || '',
        category: member.category || 'leadership',
        certifications: member.certifications?.length ? member.certifications : [''],
        order: member.order || 0,
        isActive: member.isActive !== undefined ? member.isActive : true
      });
    } else {
      setEditingMember(null);
      setFormData({
        name: '',
        position: '',
        shortExpertise: '',
        coreExpertise: '',
        qualifications: '',
        experience: '',
        email: '',
        phone: '',
        location: '',
        category: 'leadership',
        certifications: [''],
        order: 0,
        isActive: true
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingMember(null);
    setErrorMessage('');
  };

  const openDeleteModal = (member) => {
    setDeletingMember(member);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletingMember(null);
    setErrorMessage('');
  };

  // Filter members by search term
  const filteredMembers = members.filter(member => {
    const matchesSearch = searchTerm === '' || 
      member.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.shortExpertise?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getCategoryColor = (category) => {
    switch(category) {
      case 'leadership': return 'bg-purple-100 text-purple-700';
      case 'environmental': return 'bg-green-100 text-green-700';
      case 'social': return 'bg-blue-100 text-blue-700';
      case 'engineering': return 'bg-orange-100 text-orange-700';
      case 'technical': return 'bg-cyan-100 text-cyan-700';
      case 'monitoring': return 'bg-indigo-100 text-indigo-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryLabel = (category) => {
    switch(category) {
      case 'leadership': return 'Leadership';
      case 'environmental': return 'Environmental';
      case 'social': return 'Social Development';
      case 'engineering': return 'Engineering';
      case 'technical': return 'Technical';
      case 'monitoring': return 'Monitoring & Evaluation';
      default: return category;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <Loader className="h-10 w-10 text-emerald-600 animate-spin mb-4" />
        <p className="text-gray-500">Loading team members...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Manage Team</h2>
          <p className="text-gray-500 mt-1">Create, edit, and manage your team members</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              fetchTeamMembers();
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
            Add Team Member
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
              placeholder="Search team members by name, position, or expertise..."
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
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition ${
                  selectedCategory === category.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Team Members Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {paginatedMembers.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No team members found</h3>
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
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Position</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Category</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Expertise</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Experience</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Order</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                            {member.name?.charAt(0) || '?'}
                          </div>
                          <span className="font-medium text-gray-800">{member.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                        {member.position}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(member.category)}`}>
                          {getCategoryLabel(member.category)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-md truncate">
                        {member.shortExpertise}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{member.experience}</td>
                      <td className="px-6 py-4">
                        {member.isActive ? (
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
                      <td className="px-6 py-4 text-sm text-gray-600">{member.order}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openModal(member)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => openDeleteModal(member)}
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
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredMembers.length)} of {filteredMembers.length} members
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
                  {editingMember ? 'Edit Team Member' : 'Add Team Member'}
                </h2>
                <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full transition">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Basic Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Position *</label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Short Expertise *</label>
                    <input
                      type="text"
                      name="shortExpertise"
                      value={formData.shortExpertise}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., Environmental & Social Safeguards"
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience *</label>
                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., 9+ Years"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
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

                {/* Contact Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., Nairobi, Kenya"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Core Expertise */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Core Expertise *</label>
                  <textarea
                    name="coreExpertise"
                    value={formData.coreExpertise}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    placeholder="Detailed description of their core expertise and areas of specialization..."
                  />
                </div>

                {/* Qualifications */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Qualifications *</label>
                  <textarea
                    name="qualifications"
                    value={formData.qualifications}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    placeholder="Educational background and professional qualifications..."
                  />
                </div>

                {/* Certifications */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Certifications</label>
                  {formData.certifications.map((cert, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={cert}
                        onChange={(e) => handleCertificationChange(index, e.target.value)}
                        placeholder={`Certification ${index + 1}`}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeCertification(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addCertification}
                    className="mt-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
                  >
                    <Plus size={14} />
                    Add Certification
                  </button>
                </div>

                {/* Active Status */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
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
                    {editingMember ? 'Update Member' : 'Create Member'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && deletingMember && (
        <div className="fixed inset-0 z-50 overflow-y-auto" onClick={closeDeleteModal}>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm"></div>
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
              <div className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trash2 size={28} className="text-red-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Delete Team Member</h3>
                  <p className="text-gray-500 mb-6">
                    Are you sure you want to delete "{deletingMember.name}"? This action cannot be undone.
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

export default ManageTeam;