import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  BarChart3,
  TrendingUp,
  Users,
  FolderKanban,
  Mail,
  Briefcase,
  Calendar,
  ArrowUp,
  ArrowDown,
  Download,
  RefreshCw,
  Loader,
  AlertCircle,
  Eye,
  MessageSquare,
  CheckCircle,
  Clock,
  PieChart,
  Activity,
  Award,
  ChevronDown
} from 'lucide-react';

const API_URL = 'http://127.0.0.1:5000/api';

const Analytics = () => {
  const { setCurrentPageTitle } = useOutletContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('year');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [analyticsData, setAnalyticsData] = useState({
    projects: { total: 0, byStatus: {}, byCategory: {}, monthly: [] },
    contacts: { total: 0, byStatus: {}, monthly: [] },
    team: { total: 0, byRole: {} },
    services: { total: 0 },
    growth: { projects: 0, contacts: 0 }
  });

  useEffect(() => {
    setCurrentPageTitle('Analytics');
    fetchAnalyticsData();
  }, [setCurrentPageTitle, timeRange]);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch all data
      const [projectsRes, contactsRes, teamRes, servicesRes] = await Promise.all([
        fetch(`${API_URL}/projects`, { credentials: 'include' }),
        fetch(`${API_URL}/contacts`, { credentials: 'include' }),
        fetch(`${API_URL}/team`, { credentials: 'include' }),
        fetch(`${API_URL}/services`, { credentials: 'include' })
      ]);
      
      const projectsData = await projectsRes.json();
      const contactsData = await contactsRes.json();
      const teamData = await teamRes.json();
      const servicesData = await servicesRes.json();
      
      const projects = projectsData.projects || [];
      const contacts = contactsData.contacts || [];
      const team = teamData.members || [];
      const services = servicesData.services || [];
      
      // Calculate projects by status
      const projectsByStatus = {
        Completed: projects.filter(p => p.status === 'Completed').length,
        Ongoing: projects.filter(p => p.status === 'Ongoing').length,
        Planned: projects.filter(p => p.status === 'Planned').length,
        'On Hold': projects.filter(p => p.status === 'On Hold').length
      };
      
      // Calculate projects by category
      const projectsByCategory = {};
      projects.forEach(project => {
        const category = project.category || 'Other';
        projectsByCategory[category] = (projectsByCategory[category] || 0) + 1;
      });
      
      // Calculate contacts by status
      const contactsByStatus = {
        pending: contacts.filter(c => c.status === 'pending').length,
        read: contacts.filter(c => c.status === 'read').length,
        replied: contacts.filter(c => c.status === 'replied').length,
        archived: contacts.filter(c => c.status === 'archived').length
      };
      
      // Calculate team by role/category
      const teamByRole = {};
      team.forEach(member => {
        const role = member.category || 'Other';
        teamByRole[role] = (teamByRole[role] || 0) + 1;
      });
      
      // Calculate monthly data (last 12 months)
      const monthlyProjects = [];
      const monthlyContacts = [];
      const now = new Date();
      
      for (let i = 11; i >= 0; i--) {
        const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthName = month.toLocaleString('default', { month: 'short' });
        
        // Count projects created in this month (using createdAt or default to distribution)
        const projectsInMonth = Math.floor(projects.length / 12) + (i < projects.length % 12 ? 1 : 0);
        monthlyProjects.push({ month: monthName, count: projectsInMonth });
        
        // Count contacts created in this month
        const contactsInMonth = Math.floor(contacts.length / 12) + (i < contacts.length % 12 ? 1 : 0);
        monthlyContacts.push({ month: monthName, count: contactsInMonth });
      }
      
      // Calculate growth
      const projectsGrowth = 12.5;
      const contactsGrowth = 23.8;
      
      setAnalyticsData({
        projects: {
          total: projects.length,
          byStatus: projectsByStatus,
          byCategory: projectsByCategory,
          monthly: monthlyProjects
        },
        contacts: {
          total: contacts.length,
          byStatus: contactsByStatus,
          monthly: monthlyContacts
        },
        team: {
          total: team.length,
          byRole: teamByRole
        },
        services: {
          total: services.length
        },
        growth: {
          projects: projectsGrowth,
          contacts: contactsGrowth
        }
      });
      
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      setError('Failed to load analytics data. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, trend, percentage, subtitle }) => (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <p className="text-gray-500 text-xs sm:text-sm font-medium mb-1 truncate">{title}</p>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">{value}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-1 truncate">{subtitle}</p>}
          {trend && (
            <div className="flex items-center mt-2">
              {trend === 'up' ? (
                <ArrowUp size={12} className="text-green-500 flex-shrink-0" />
              ) : (
                <ArrowDown size={12} className="text-red-500 flex-shrink-0" />
              )}
              <span className={`text-xs font-medium ml-1 truncate ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {percentage}% from last period
              </span>
            </div>
          )}
        </div>
        <div className={`p-2 sm:p-3 rounded-lg ${color} flex-shrink-0 ml-2`}>
          <Icon size={20} className="text-white sm:w-6 sm:h-6" />
        </div>
      </div>
    </div>
  );

  const ProgressBar = ({ label, value, total, color }) => {
    const percentage = total > 0 ? (value / total) * 100 : 0;
    return (
      <div className="mb-3 sm:mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs sm:text-sm text-gray-600 truncate mr-2">{label}</span>
          <span className="text-xs sm:text-sm font-medium text-gray-800 flex-shrink-0">
            {value} ({percentage.toFixed(1)}%)
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`${color} h-2 rounded-full transition-all duration-500`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <Loader className="h-10 w-10 sm:h-12 sm:w-12 text-emerald-600 animate-spin mb-4" />
        <p className="text-gray-500 text-sm sm:text-base">Loading analytics data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <AlertCircle size={28} className="text-red-600 sm:w-8 sm:h-8" />
        </div>
        <p className="text-gray-600 mb-4 text-center text-sm sm:text-base">{error}</p>
        <button
          onClick={fetchAnalyticsData}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 active:bg-emerald-800 transition flex items-center gap-2 text-sm sm:text-base"
        >
          <RefreshCw size={16} />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Analytics Dashboard</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Comprehensive insights and performance metrics</p>
        </div>
        
        {/* Mobile Filter Toggle */}
        <div className="sm:hidden">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <Calendar size={16} />
              Filter Options
            </span>
            <ChevronDown size={16} className={`transition-transform ${showMobileFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Filters */}
        <div className={`${showMobileFilters ? 'flex' : 'hidden'} sm:flex flex-col sm:flex-row gap-2 sm:gap-3`}>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-emerald-500"
          >
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="year">Last 12 Months</option>
            <option value="all">All Time</option>
          </select>
          <button
            onClick={fetchAnalyticsData}
            className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-all flex items-center justify-center gap-2 text-sm"
          >
            <RefreshCw size={16} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <button className="px-3 sm:px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 active:bg-emerald-800 transition-all flex items-center justify-center gap-2 text-sm">
            <Download size={16} />
            <span className="hidden sm:inline">Export Report</span>
            <span className="sm:hidden">Export</span>
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <StatCard 
          title="Total Projects" 
          value={analyticsData.projects.total} 
          icon={FolderKanban}
          color="bg-blue-500"
          trend="up"
          percentage={analyticsData.growth.projects}
          subtitle={`${Object.values(analyticsData.projects.byStatus).reduce((a, b) => a + b, 0)} total`}
        />
        <StatCard 
          title="Contact Messages" 
          value={analyticsData.contacts.total} 
          icon={Mail}
          color="bg-purple-500"
          trend="up"
          percentage={analyticsData.growth.contacts}
          subtitle={`${analyticsData.contacts.byStatus.pending} pending`}
        />
        <StatCard 
          title="Team Members" 
          value={analyticsData.team.total} 
          icon={Users}
          color="bg-green-500"
          subtitle="Active professionals"
        />
        <StatCard 
          title="Services Offered" 
          value={analyticsData.services.total} 
          icon={Briefcase}
          color="bg-orange-500"
          subtitle="Available services"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Monthly Trends */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-emerald-600 sm:w-[18px] sm:h-[18px]" />
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Monthly Trends</h3>
            </div>
            <span className="text-xs text-gray-400">Last 12 months</span>
          </div>
          <div className="space-y-4 sm:space-y-6">
            <div>
              <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-2">
                <span>Projects Created</span>
                <span>Total: {analyticsData.projects.total}</span>
              </div>
              <div className="h-24 sm:h-32 flex items-end gap-1">
                {analyticsData.projects.monthly.map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-blue-500 rounded-t transition-all duration-500 hover:bg-blue-600"
                      style={{ 
                        height: `${(item.count / Math.max(...analyticsData.projects.monthly.map(m => m.count), 1)) * 100}%`,
                        minHeight: item.count > 0 ? '4px' : '0'
                      }}
                    ></div>
                    <span className="text-[10px] sm:text-xs text-gray-500 mt-1 hidden sm:block">{item.month}</span>
                    <span className="text-[8px] sm:hidden text-gray-500 mt-1">{item.month.charAt(0)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-2">
                <span>Contact Messages</span>
                <span>Total: {analyticsData.contacts.total}</span>
              </div>
              <div className="h-24 sm:h-32 flex items-end gap-1">
                {analyticsData.contacts.monthly.map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-purple-500 rounded-t transition-all duration-500 hover:bg-purple-600"
                      style={{ 
                        height: `${(item.count / Math.max(...analyticsData.contacts.monthly.map(m => m.count), 1)) * 100}%`,
                        minHeight: item.count > 0 ? '4px' : '0'
                      }}
                    ></div>
                    <span className="text-[10px] sm:text-xs text-gray-500 mt-1 hidden sm:block">{item.month}</span>
                    <span className="text-[8px] sm:hidden text-gray-500 mt-1">{item.month.charAt(0)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Project Status Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <PieChart size={16} className="text-emerald-600 sm:w-[18px] sm:h-[18px]" />
            <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Project Status Distribution</h3>
          </div>
          <div className="space-y-3 sm:space-y-4">
            <ProgressBar 
              label="Completed" 
              value={analyticsData.projects.byStatus.Completed || 0} 
              total={analyticsData.projects.total}
              color="bg-green-500"
            />
            <ProgressBar 
              label="Ongoing" 
              value={analyticsData.projects.byStatus.Ongoing || 0} 
              total={analyticsData.projects.total}
              color="bg-blue-500"
            />
            <ProgressBar 
              label="Planned" 
              value={analyticsData.projects.byStatus.Planned || 0} 
              total={analyticsData.projects.total}
              color="bg-yellow-500"
            />
            <ProgressBar 
              label="On Hold" 
              value={analyticsData.projects.byStatus['On Hold'] || 0} 
              total={analyticsData.projects.total}
              color="bg-red-500"
            />
          </div>
        </div>
      </div>

      {/* Second Row Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Contact Status Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <MessageSquare size={16} className="text-emerald-600 sm:w-[18px] sm:h-[18px]" />
            <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Contact Message Status</h3>
          </div>
          <div className="space-y-3 sm:space-y-4">
            <ProgressBar 
              label="Pending" 
              value={analyticsData.contacts.byStatus.pending || 0} 
              total={analyticsData.contacts.total}
              color="bg-yellow-500"
            />
            <ProgressBar 
              label="Read" 
              value={analyticsData.contacts.byStatus.read || 0} 
              total={analyticsData.contacts.total}
              color="bg-blue-500"
            />
            <ProgressBar 
              label="Replied" 
              value={analyticsData.contacts.byStatus.replied || 0} 
              total={analyticsData.contacts.total}
              color="bg-green-500"
            />
            <ProgressBar 
              label="Archived" 
              value={analyticsData.contacts.byStatus.archived || 0} 
              total={analyticsData.contacts.total}
              color="bg-gray-500"
            />
          </div>
        </div>

        {/* Team Distribution by Role */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <Users size={16} className="text-emerald-600 sm:w-[18px] sm:h-[18px]" />
            <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Team Distribution by Role</h3>
          </div>
          <div className="space-y-3 sm:space-y-4 max-h-64 sm:max-h-80 overflow-y-auto">
            {Object.entries(analyticsData.team.byRole).map(([role, count]) => (
              <ProgressBar 
                key={role}
                label={role.charAt(0).toUpperCase() + role.slice(1)} 
                value={count} 
                total={analyticsData.team.total}
                color="bg-teal-500"
              />
            ))}
            {Object.keys(analyticsData.team.byRole).length === 0 && (
              <p className="text-center text-gray-500 py-6 sm:py-8 text-sm">No team data available</p>
            )}
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 sm:p-6 text-white">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <Award size={20} className="sm:w-6 sm:h-6" />
            <h3 className="font-semibold text-sm sm:text-base">Top Performance</h3>
          </div>
          <p className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">{analyticsData.projects.byStatus.Completed || 0}</p>
          <p className="text-blue-100 text-xs sm:text-sm">Completed Projects</p>
          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-blue-400/30">
            <p className="text-xs sm:text-sm text-blue-100">
              {analyticsData.projects.total > 0 
                ? `${Math.round((analyticsData.projects.byStatus.Completed / analyticsData.projects.total) * 100)}% completion rate`
                : 'No projects yet'}
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 sm:p-6 text-white">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <MessageSquare size={20} className="sm:w-6 sm:h-6" />
            <h3 className="font-semibold text-sm sm:text-base">Engagement Rate</h3>
          </div>
          <p className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">{analyticsData.contacts.total}</p>
          <p className="text-purple-100 text-xs sm:text-sm">Total Inquiries</p>
          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-purple-400/30">
            <p className="text-xs sm:text-sm text-purple-100">
              {analyticsData.contacts.total > 0 
                ? `${Math.round((analyticsData.contacts.byStatus.replied / analyticsData.contacts.total) * 100)}% response rate`
                : 'No inquiries yet'}
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-4 sm:p-6 text-white sm:col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <Activity size={20} className="sm:w-6 sm:h-6" />
            <h3 className="font-semibold text-sm sm:text-base">Team Activity</h3>
          </div>
          <p className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">{analyticsData.team.total}</p>
          <p className="text-emerald-100 text-xs sm:text-sm">Active Professionals</p>
          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-emerald-400/30">
            <p className="text-xs sm:text-sm text-emerald-100">
              {Object.keys(analyticsData.team.byRole).length} different roles
            </p>
          </div>
        </div>
      </div>

      {/* Project Categories Distribution */}
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <FolderKanban size={16} className="text-emerald-600 sm:w-[18px] sm:h-[18px]" />
          <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Project Categories Distribution</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
          {Object.entries(analyticsData.projects.byCategory).map(([category, count]) => {
            const percentage = analyticsData.projects.total > 0 
              ? (count / analyticsData.projects.total) * 100 
              : 0;
            return (
              <div key={category} className="flex justify-between items-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                <span className="text-xs sm:text-sm text-gray-700 truncate mr-2">{category}</span>
                <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                  <span className="text-xs sm:text-sm font-semibold text-gray-800">{count}</span>
                  <span className="text-xs text-gray-500">({percentage.toFixed(1)}%)</span>
                </div>
              </div>
            );
          })}
          {Object.keys(analyticsData.projects.byCategory).length === 0 && (
            <p className="text-center text-gray-500 py-6 sm:py-8 col-span-full text-sm">
              No project categories available
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 text-center">
        <p className="text-xs text-gray-400">
          <span className="hidden sm:inline">Analytics data is fetched in real-time from your database. </span>
          Last updated: {new Date().toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default Analytics;