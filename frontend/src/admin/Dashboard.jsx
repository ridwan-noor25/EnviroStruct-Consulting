import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Users,
  FolderKanban,
  Mail,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Briefcase,
  MessageSquare,
  Star,
  Eye,
  Clock,
  CheckCircle,
  Calendar,
  Activity,
  BarChart3,
  PieChart,
  Loader,
  RefreshCw,
  AlertCircle,
  ChevronRight
} from 'lucide-react';

const API_URL = 'http://127.0.0.1:5000/api';

const Dashboard = () => {
  const { setCurrentPageTitle } = useOutletContext();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    projects: { total: 0, completed: 0, ongoing: 0 },
    team: { total: 0, active: 0 },
    contacts: { total: 0, pending: 0, replied: 0 },
    services: { total: 0 },
    recentProjects: [],
    recentContacts: []
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    setCurrentPageTitle('Dashboard');
    fetchAllData();
  }, [setCurrentPageTitle]);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch projects
      const projectsRes = await fetch(`${API_URL}/projects`, {
        credentials: 'include'
      });
      const projectsData = await projectsRes.json();
      const projects = projectsData.projects || [];
      
      // Fetch team members
      const teamRes = await fetch(`${API_URL}/team`, {
        credentials: 'include'
      });
      const teamData = await teamRes.json();
      const team = teamData.members || [];
      
      // Fetch contacts
      const contactsRes = await fetch(`${API_URL}/contacts`, {
        credentials: 'include'
      });
      const contactsData = await contactsRes.json();
      const contacts = contactsData.contacts || [];
      
      // Fetch services
      const servicesRes = await fetch(`${API_URL}/services`, {
        credentials: 'include'
      });
      const servicesData = await servicesRes.json();
      const services = servicesData.services || [];
      
      // Calculate statistics
      const completedProjects = projects.filter(p => p.status === 'Completed').length;
      const ongoingProjects = projects.filter(p => p.status === 'Ongoing').length;
      const pendingContacts = contacts.filter(c => c.status === 'pending').length;
      const repliedContacts = contacts.filter(c => c.status === 'replied').length;
      const activeTeam = team.filter(m => m.isActive !== false).length;
      
      // Get recent items
      const recentProjects = [...projects]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
      
      const recentContacts = [...contacts]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
      
      setStats({
        projects: {
          total: projects.length,
          completed: completedProjects,
          ongoing: ongoingProjects
        },
        team: {
          total: team.length,
          active: activeTeam
        },
        contacts: {
          total: contacts.length,
          pending: pendingContacts,
          replied: repliedContacts
        },
        services: {
          total: services.length
        },
        recentProjects,
        recentContacts
      });
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data. Please refresh the page.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchAllData();
  };

  const StatCard = ({ title, value, icon: Icon, color, trend, percentage, subtitle }) => (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 hover:shadow-md transition-all duration-300 border border-gray-100 group active:bg-gray-50">
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <p className="text-gray-500 text-xs sm:text-sm font-medium mb-1 truncate">{title}</p>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-400 mt-1 line-clamp-2">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center mt-2">
              {trend === 'up' ? (
                <ArrowUp size={12} className="text-green-500 flex-shrink-0" />
              ) : (
                <ArrowDown size={12} className="text-red-500 flex-shrink-0" />
              )}
              <span className={`text-xs font-medium ml-1 truncate ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {percentage}% from last month
              </span>
            </div>
          )}
        </div>
        <div className={`p-2 sm:p-3 rounded-lg ${color} group-hover:scale-110 transition-transform duration-300 flex-shrink-0 ml-2`}>
          <Icon size={20} className="text-white sm:w-6 sm:h-6" />
        </div>
      </div>
    </div>
  );

  const ActivityItem = ({ icon: Icon, title, time, status, color }) => (
    <div className="flex items-center gap-2 sm:gap-3 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors rounded-lg px-2 -mx-2">
      <div className={`p-1.5 sm:p-2 rounded-lg ${color} flex-shrink-0`}>
        <Icon size={14} className="text-white sm:w-4 sm:h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs sm:text-sm font-medium text-gray-800 truncate">{title}</p>
        <p className="text-xs text-gray-400">{time}</p>
      </div>
      {status && (
        <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
          status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
          status === 'completed' ? 'bg-green-100 text-green-700' :
          status === 'replied' ? 'bg-green-100 text-green-700' :
          'bg-blue-100 text-blue-700'
        }`}>
          {status}
        </span>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <Loader className="h-10 w-10 sm:h-12 sm:w-12 text-emerald-600 animate-spin mb-4" />
        <p className="text-gray-500 text-sm sm:text-base">Loading dashboard data...</p>
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
          onClick={fetchAllData}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 active:bg-emerald-800 transition flex items-center gap-2 text-sm sm:text-base"
        >
          <RefreshCw size={16} className="sm:w-4 sm:h-4" />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 px-0 sm:px-0">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-white">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">
              Welcome to Admin Dashboard
            </h2>
            <p className="text-emerald-100 text-xs sm:text-sm max-w-2xl">
              Manage your projects, team members, services, and monitor your website performance from this central dashboard.
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="p-2 bg-white/20 rounded-lg hover:bg-white/30 active:bg-white/40 transition disabled:opacity-50 flex-shrink-0"
            title="Refresh Data"
          >
            <RefreshCw size={16} className={`sm:w-[18px] sm:h-[18px] ${refreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse"></div>
            <span>System Online</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={12} className="sm:w-[14px] sm:h-[14px] flex-shrink-0" />
            <span className="truncate">
              {new Date().toLocaleDateString('en-US', { 
                weekday: window.innerWidth < 640 ? 'short' : 'long',
                month: window.innerWidth < 640 ? 'short' : 'long',
                day: 'numeric',
                ...(window.innerWidth >= 640 && { year: 'numeric' })
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <StatCard 
          title="Total Projects" 
          value={stats.projects.total} 
          icon={FolderKanban}
          color="bg-blue-500"
          trend="up"
          percentage="12"
          subtitle={`${stats.projects.completed} completed, ${stats.projects.ongoing} ongoing`}
        />
        <StatCard 
          title="Team Members" 
          value={stats.team.total} 
          icon={Users}
          color="bg-green-500"
          trend="up"
          percentage="8"
          subtitle={`${stats.team.active} active members`}
        />
        <StatCard 
          title="Contact Messages" 
          value={stats.contacts.total} 
          icon={Mail}
          color="bg-purple-500"
          trend="up"
          percentage="23"
          subtitle={`${stats.contacts.pending} pending, ${stats.contacts.replied} replied`}
        />
        <StatCard 
          title="Services" 
          value={stats.services.total} 
          icon={Briefcase}
          color="bg-orange-500"
          subtitle="Active services"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 sm:p-2 bg-emerald-100 rounded-lg">
                <CheckCircle size={16} className="text-emerald-600 sm:w-[18px] sm:h-[18px]" />
              </div>
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Completion Rate</h3>
            </div>
            <span className="text-xl sm:text-2xl font-bold text-emerald-600">
              {stats.projects.total > 0 
                ? Math.round((stats.projects.completed / stats.projects.total) * 100) 
                : 0}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${stats.projects.total > 0 ? (stats.projects.completed / stats.projects.total) * 100 : 0}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            {stats.projects.completed} out of {stats.projects.total} projects completed
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg">
                <Activity size={16} className="text-blue-600 sm:w-[18px] sm:h-[18px]" />
              </div>
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Response Rate</h3>
            </div>
            <span className="text-xl sm:text-2xl font-bold text-blue-600">
              {stats.contacts.total > 0 
                ? Math.round((stats.contacts.replied / stats.contacts.total) * 100) 
                : 0}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${stats.contacts.total > 0 ? (stats.contacts.replied / stats.contacts.total) * 100 : 0}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            {stats.contacts.replied} out of {stats.contacts.total} messages replied
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 sm:p-2 bg-purple-100 rounded-lg">
                <Users size={16} className="text-purple-600 sm:w-[18px] sm:h-[18px]" />
              </div>
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Team Activity</h3>
            </div>
            <span className="text-xl sm:text-2xl font-bold text-purple-600">
              {stats.team.total > 0 
                ? Math.round((stats.team.active / stats.team.total) * 100) 
                : 0}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${stats.team.total > 0 ? (stats.team.active / stats.team.total) * 100 : 0}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            {stats.team.active} out of {stats.team.total} team members active
          </p>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
        {/* Recent Projects */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FolderKanban size={16} className="text-emerald-600 sm:w-[18px] sm:h-[18px]" />
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Recent Projects</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 hidden sm:inline">Last 5 projects</span>
                <a 
                  href="/admin/projects" 
                  className="text-emerald-600 hover:text-emerald-700 text-xs sm:text-sm flex items-center gap-1"
                >
                  View all
                  <ChevronRight size={14} className="sm:w-4 sm:h-4" />
                </a>
              </div>
            </div>
          </div>
          <div className="p-3 sm:p-4 divide-y divide-gray-100">
            {stats.recentProjects.length === 0 ? (
              <div className="text-center py-6 sm:py-8 text-gray-500 text-sm">
                No projects found
              </div>
            ) : (
              stats.recentProjects.map((project) => (
                <ActivityItem
                  key={project.id}
                  icon={FolderKanban}
                  title={project.title}
                  time={project.year}
                  status={project.status === 'Completed' ? 'completed' : 'pending'}
                  color="bg-blue-500"
                />
              ))
            )}
          </div>
        </div>

        {/* Recent Contact Messages */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-emerald-600 sm:w-[18px] sm:h-[18px]" />
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Recent Contact Messages</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 hidden sm:inline">Last 5 messages</span>
                <a 
                  href="/admin/contacts" 
                  className="text-emerald-600 hover:text-emerald-700 text-xs sm:text-sm flex items-center gap-1"
                >
                  View all
                  <ChevronRight size={14} className="sm:w-4 sm:h-4" />
                </a>
              </div>
            </div>
          </div>
          <div className="p-3 sm:p-4 divide-y divide-gray-100">
            {stats.recentContacts.length === 0 ? (
              <div className="text-center py-6 sm:py-8 text-gray-500 text-sm">
                No messages found
              </div>
            ) : (
              stats.recentContacts.map((contact) => (
                <ActivityItem
                  key={contact.id}
                  icon={MessageSquare}
                  title={contact.subject}
                  time={new Date(contact.createdAt).toLocaleDateString()}
                  status={contact.status}
                  color="bg-purple-500"
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        <a 
          href="/admin/projects" 
          className="bg-white rounded-xl shadow-sm p-3 sm:p-4 text-center hover:shadow-md active:bg-gray-50 transition-all group"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition">
            <FolderKanban size={18} className="text-blue-600 sm:w-5 sm:h-5" />
          </div>
          <p className="text-xs sm:text-sm font-medium text-gray-700 truncate px-1">Manage Projects</p>
          <p className="text-xs text-gray-400 mt-0.5 sm:mt-1">{stats.projects.total} total</p>
        </a>
        <a 
          href="/admin/team" 
          className="bg-white rounded-xl shadow-sm p-3 sm:p-4 text-center hover:shadow-md active:bg-gray-50 transition-all group"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition">
            <Users size={18} className="text-green-600 sm:w-5 sm:h-5" />
          </div>
          <p className="text-xs sm:text-sm font-medium text-gray-700 truncate px-1">Manage Team</p>
          <p className="text-xs text-gray-400 mt-0.5 sm:mt-1">{stats.team.total} members</p>
        </a>
        <a 
          href="/admin/services" 
          className="bg-white rounded-xl shadow-sm p-3 sm:p-4 text-center hover:shadow-md active:bg-gray-50 transition-all group"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition">
            <Briefcase size={18} className="text-orange-600 sm:w-5 sm:h-5" />
          </div>
          <p className="text-xs sm:text-sm font-medium text-gray-700 truncate px-1">Manage Services</p>
          <p className="text-xs text-gray-400 mt-0.5 sm:mt-1">{stats.services.total} services</p>
        </a>
        <a 
          href="/admin/contacts" 
          className="bg-white rounded-xl shadow-sm p-3 sm:p-4 text-center hover:shadow-md active:bg-gray-50 transition-all group"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition">
            <Mail size={18} className="text-purple-600 sm:w-5 sm:h-5" />
          </div>
          <p className="text-xs sm:text-sm font-medium text-gray-700 truncate px-1">View Messages</p>
          <p className="text-xs text-gray-400 mt-0.5 sm:mt-1">{stats.contacts.pending} unread</p>
        </a>
      </div>

      {/* Footer Info */}
      <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 text-center">
        <p className="text-xs text-gray-400">
          <span className="hidden sm:inline">Last updated: {new Date().toLocaleString()}</span>
          <span className="sm:hidden">Updated: {new Date().toLocaleTimeString()}</span>
          <span className="hidden sm:inline"> | </span>
          <span className="hidden sm:inline">Data is fetched in real-time from your database</span>
        </p>
      </div>
    </div>
  );
};

export default Dashboard;