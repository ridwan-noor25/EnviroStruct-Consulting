import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  Search, 
  Trash2, 
  Eye,
  Mail,
  Phone,
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  Reply,
  Archive,
  RefreshCw,
  Loader,
  ChevronLeft,
  ChevronRight,
  X,
  AlertCircle,
  User,
  MessageSquare,
  Filter,
  ChevronDown
} from 'lucide-react';

const API_URL = 'http://127.0.0.1:5000/api';

const ManageContacts = () => {
  const { setCurrentPageTitle } = useOutletContext();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedContact, setSelectedContact] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingContact, setDeletingContact] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    read: 0,
    replied: 0,
    archived: 0
  });
  const itemsPerPage = 10;

  useEffect(() => {
    setCurrentPageTitle('Manage Contacts');
    fetchContacts();
    fetchStats();
  }, [selectedStatus]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      setErrorMessage('');
      const url = selectedStatus === 'all' 
        ? `${API_URL}/contacts` 
        : `${API_URL}/contacts?status=${selectedStatus}`;
      
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
      setContacts(data.contacts || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setErrorMessage('Failed to load contact messages. Please make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/contacts/stats`, {
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
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const updateContactStatus = async (contactId, status) => {
    try {
      const response = await fetch(`${API_URL}/contacts/${contactId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status })
      });
      
      if (response.ok) {
        fetchContacts();
        fetchStats();
        if (selectedContact && selectedContact.id === contactId) {
          setSelectedContact(prev => ({ ...prev, status, isRead: status !== 'pending' }));
        }
        setSuccessMessage(`Message marked as ${status}`);
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      setErrorMessage('Failed to update status');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const handleDelete = async () => {
    if (!deletingContact) return;
    
    try {
      const response = await fetch(`${API_URL}/contacts/${deletingContact.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      
      if (response.ok) {
        setSuccessMessage('Message deleted successfully!');
        fetchContacts();
        fetchStats();
        closeDeleteModal();
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        const data = await response.json();
        setErrorMessage(data.error || 'Failed to delete message');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
      setErrorMessage('Network error. Please try again.');
    }
  };

  const viewContact = (contact) => {
    setSelectedContact(contact);
    setShowViewModal(true);
    // Mark as read when viewed
    if (contact.status === 'pending') {
      updateContactStatus(contact.id, 'read');
    }
  };

  const closeViewModal = () => {
    setShowViewModal(false);
    setSelectedContact(null);
  };

  const openDeleteModal = (contact) => {
    setDeletingContact(contact);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletingContact(null);
  };

  // Filter contacts by search term
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = searchTerm === '' || 
      contact.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.organization?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
  const paginatedContacts = filteredContacts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium flex items-center gap-1"><Clock size={12} /> Pending</span>;
      case 'read':
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium flex items-center gap-1"><Eye size={12} /> Read</span>;
      case 'replied':
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1"><Reply size={12} /> Replied</span>;
      case 'archived':
        return <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium flex items-center gap-1"><Archive size={12} /> Archived</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">{status}</span>;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'border-yellow-400 bg-yellow-50';
      case 'read': return 'border-blue-400 bg-blue-50';
      case 'replied': return 'border-green-400 bg-green-50';
      case 'archived': return 'border-gray-400 bg-gray-50';
      default: return 'border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatShortDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  // Mobile Contact Card Component
  const MobileContactCard = ({ contact }) => (
    <div 
      className={`bg-white rounded-lg shadow-sm border-l-4 p-4 cursor-pointer hover:shadow-md transition ${getStatusColor(contact.status)}`}
      onClick={() => viewContact(contact)}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-800 truncate">{contact.fullName}</h3>
          <p className="text-xs text-gray-500 truncate">{contact.email}</p>
        </div>
        {getStatusBadge(contact.status)}
      </div>
      
      <p className="text-sm text-gray-700 mb-2 line-clamp-2">{contact.subject}</p>
      
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-2">
          {contact.organization && (
            <span className="flex items-center gap-1">
              <Building2 size={12} />
              <span className="truncate max-w-[120px]">{contact.organization}</span>
            </span>
          )}
        </div>
        <span>{formatShortDate(contact.createdAt)}</span>
      </div>
      
      <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => viewContact(contact)}
          className="flex-1 py-1.5 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition flex items-center justify-center gap-1 text-xs"
        >
          <Eye size={14} />
          View
        </button>
        <button
          onClick={() => openDeleteModal(contact)}
          className="flex-1 py-1.5 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition flex items-center justify-center gap-1 text-xs"
        >
          <Trash2 size={14} />
          Delete
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <Loader className="h-10 w-10 text-emerald-600 animate-spin mb-4" />
        <p className="text-gray-500 text-sm sm:text-base">Loading contact messages...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Contact Messages</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">View and manage inquiries from your website</p>
        </div>
        <button
          onClick={() => {
            fetchContacts();
            fetchStats();
          }}
          className="w-full sm:w-auto px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-all flex items-center justify-center gap-2 text-sm"
        >
          <RefreshCw size={16} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
        <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 border-l-4 border-blue-500">
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">{stats.total}</p>
          <p className="text-xs sm:text-sm text-gray-500">Total</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 border-l-4 border-yellow-500">
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-600">{stats.pending}</p>
          <p className="text-xs sm:text-sm text-gray-500">Pending</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 border-l-4 border-blue-500">
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600">{stats.read}</p>
          <p className="text-xs sm:text-sm text-gray-500">Read</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 border-l-4 border-green-500">
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-600">{stats.replied}</p>
          <p className="text-xs sm:text-sm text-gray-500">Replied</p>
        </div>
        <div className="hidden sm:block bg-white rounded-xl shadow-sm p-4 border-l-4 border-gray-500">
          <p className="text-xl md:text-2xl font-bold text-gray-600">{stats.archived}</p>
          <p className="text-sm text-gray-500">Archived</p>
        </div>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2 text-green-700 text-sm">
          <CheckCircle size={18} className="flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2 text-red-700 text-sm">
          <AlertCircle size={18} className="flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4">
        {/* Search Bar */}
        <div className="relative mb-3 sm:mb-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-4 py-2.5 sm:py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        {/* Mobile Filter Button */}
        <div className="sm:hidden mt-3">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <Filter size={16} />
              Filter by Status
            </span>
            <div className="flex items-center gap-2">
              {selectedStatus !== 'all' && (
                <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-xs capitalize">
                  {selectedStatus}
                </span>
              )}
              <ChevronDown size={16} className={`transition-transform ${showMobileFilters ? 'rotate-180' : ''}`} />
            </div>
          </button>
        </div>

        {/* Status Filters */}
        <div className={`${showMobileFilters ? 'block' : 'hidden'} sm:block mt-3 sm:mt-4`}>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            {['all', 'pending', 'read', 'replied', 'archived'].map((status) => (
              <button
                key={status}
                onClick={() => {
                  setSelectedStatus(status);
                  setCurrentPage(1);
                  setShowMobileFilters(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition flex-shrink-0 capitalize ${
                  selectedStatus === status
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300'
                }`}
              >
                {status === 'all' ? 'All Messages' : status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contacts Display */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {paginatedContacts.length === 0 ? (
          <div className="text-center py-8 sm:py-12 px-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail size={28} className="text-gray-400 sm:w-8 sm:h-8" />
            </div>
            <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-2">No messages found</h3>
            <p className="text-sm text-gray-500">No contact messages match your criteria</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">From</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Subject</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Organization</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Received</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedContacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-gray-50 transition cursor-pointer" onClick={() => viewContact(contact)}>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-800">{contact.fullName}</p>
                          <p className="text-xs text-gray-500">{contact.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-700 max-w-xs truncate">{contact.subject}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {contact.organization || '-'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatDate(contact.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(contact.status)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => viewContact(contact)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => openDeleteModal(contact)}
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

            {/* Mobile Card View */}
            <div className="lg:hidden p-3 sm:p-4 space-y-3">
              {paginatedContacts.map((contact) => (
                <MobileContactCard key={contact.id} contact={contact} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3 px-4 sm:px-6 py-4 border-t border-gray-200">
                <div className="text-xs sm:text-sm text-gray-500">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredContacts.length)} of {filteredContacts.length}
                </div>
                <div className="flex gap-1 sm:gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 active:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  
                  {/* Page Numbers - Hidden on mobile */}
                  <div className="hidden sm:flex gap-2">
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
                  </div>
                  
                  {/* Mobile Page Indicator */}
                  <span className="sm:hidden px-3 py-1 text-sm font-medium text-gray-700">
                    Page {currentPage} of {totalPages}
                  </span>
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 active:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* View Message Modal - Mobile Optimized */}
      {showViewModal && selectedContact && (
        <div className="fixed inset-0 z-50 overflow-y-auto" onClick={closeViewModal}>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm"></div>
          <div className="relative min-h-screen flex items-center justify-center p-2 sm:p-4">
            <div className="relative bg-white rounded-xl sm:rounded-2xl w-full max-w-3xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="sticky top-0 bg-white border-b px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center z-10">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">Message Details</h2>
                <button onClick={closeViewModal} className="p-2 hover:bg-gray-100 active:bg-gray-200 rounded-full transition">
                  <X size={20} />
                </button>
              </div>

              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                {/* Header Info */}
                <div className={`border-l-4 p-3 sm:p-4 rounded-r-xl ${getStatusColor(selectedContact.status)}`}>
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800">{selectedContact.subject}</h3>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">Received: {formatDate(selectedContact.createdAt)}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                      {selectedContact.status !== 'replied' && (
                        <button
                          onClick={() => updateContactStatus(selectedContact.id, 'replied')}
                          className="flex-1 sm:flex-none px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 active:bg-green-800 transition flex items-center justify-center gap-2 text-xs sm:text-sm"
                        >
                          <Reply size={14} />
                          Mark Replied
                        </button>
                      )}
                      {selectedContact.status !== 'archived' && (
                        <button
                          onClick={() => updateContactStatus(selectedContact.id, 'archived')}
                          className="flex-1 sm:flex-none px-3 py-1.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 active:bg-gray-800 transition flex items-center justify-center gap-2 text-xs sm:text-sm"
                        >
                          <Archive size={14} />
                          Archive
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sender Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <User size={16} className="text-emerald-600 flex-shrink-0 sm:w-[18px] sm:h-[18px]" />
                    <div className="min-w-0">
                      <p className="text-xs text-gray-500">Full Name</p>
                      <p className="font-medium text-gray-800 text-sm truncate">{selectedContact.fullName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-emerald-600 flex-shrink-0 sm:w-[18px] sm:h-[18px]" />
                    <div className="min-w-0">
                      <p className="text-xs text-gray-500">Email Address</p>
                      <a href={`mailto:${selectedContact.email}`} className="font-medium text-emerald-600 hover:underline text-sm truncate block">
                        {selectedContact.email}
                      </a>
                    </div>
                  </div>
                  {selectedContact.organization && (
                    <div className="flex items-center gap-3 sm:col-span-2">
                      <Building2 size={16} className="text-emerald-600 flex-shrink-0 sm:w-[18px] sm:h-[18px]" />
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500">Organization</p>
                        <p className="font-medium text-gray-800 text-sm truncate">{selectedContact.organization}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Message Content */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <MessageSquare size={16} />
                    Message
                  </h4>
                  <div className="bg-gray-50 rounded-xl p-3 sm:p-5">
                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-sm">
                      {selectedContact.message}
                    </p>
                  </div>
                </div>

                {/* Reply Section */}
                <div className="border-t pt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Quick Actions</h4>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <a
                      href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 sm:py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 active:bg-emerald-800 transition flex items-center justify-center gap-2 text-sm"
                    >
                      <Reply size={16} />
                      Reply via Email
                    </a>
                    <button
                      onClick={() => {
                        closeViewModal();
                        openDeleteModal(selectedContact);
                      }}
                      className="px-4 py-2.5 sm:py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 active:bg-red-100 transition flex items-center justify-center gap-2 text-sm"
                    >
                      <Trash2 size={16} />
                      Delete Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && deletingContact && (
        <div className="fixed inset-0 z-50 overflow-y-auto" onClick={closeDeleteModal}>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm"></div>
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
              <div className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trash2 size={28} className="text-red-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Delete Message</h3>
                  <p className="text-sm text-gray-500 mb-6">
                    Are you sure you want to delete this message from "{deletingContact.fullName}"? This action cannot be undone.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <button
                      onClick={closeDeleteModal}
                      className="px-4 py-2.5 sm:py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDelete}
                      className="px-4 py-2.5 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 transition flex items-center justify-center gap-2 text-sm"
                    >
                      <Trash2 size={16} />
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

export default ManageContacts;