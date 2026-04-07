import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  CheckCircle,
  ArrowRight,
  Building2,
  Users,
  Globe,
  Handshake,
  Leaf,
  Shield,
  TrendingUp,
  HardHat,
  Briefcase,
  GraduationCap,
  Clock,
  Award,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    organization: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        organization: '',
        subject: '',
        message: ''
      });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  // Services list
  const services = [
    { icon: Leaf, title: "Environmental and Social Impact Assessments" },
    { icon: Shield, title: "Environmental Audits" },
    { icon: TrendingUp, title: "Sustainability Advisory" },
    { icon: HardHat, title: "Engineering and Infrastructure Studies" },
    { icon: Briefcase, title: "Project Management Services" },
    { icon: Building2, title: "Organizational and Financial Advisory" },
    { icon: GraduationCap, title: "Capacity Building and Professional Training" }
  ];

  // Collaboration partners
  const collaborators = [
    { icon: Building2, title: "Government Agencies", color: "from-blue-600 to-blue-800" },
    { icon: Globe, title: "Development Partners", color: "from-green-600 to-green-800" },
    { icon: Users, title: "Private Sector Organizations", color: "from-yellow-600 to-orange-600" },
    { icon: HardHat, title: "Engineering Firms", color: "from-cyan-600 to-blue-800" },
    { icon: Handshake, title: "Community Development Organizations", color: "from-teal-600 to-green-800" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-[#0F3A5A] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&h=400&fit=crop"
            alt="Contact Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
            <div className="w-20 h-1 bg-[#6E8F3D] mx-auto mb-6"></div>
            <p className="text-gray-200 text-lg">
              Get in touch with our team to discuss your environmental, social, engineering, 
              and sustainability consulting needs.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-[#6E8F3D] font-semibold text-sm uppercase tracking-wider">Get in Touch</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F3A5A] mt-3 mb-6">
              Let's Start a Conversation
            </h2>
            <div className="w-20 h-1 bg-[#6E8F3D] mx-auto mb-8"></div>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              EnviroStruct Consulting International welcomes inquiries from organizations seeking environmental, 
              social, engineering, and sustainability consulting support. We work with government institutions, 
              private sector organizations, development partners, and infrastructure developers to support 
              responsible and sustainable project implementation.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Whether you need assistance with environmental compliance, project planning, or sustainability 
              strategy, our team is ready to provide expert guidance and practical solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#6E8F3D]/10 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-[#6E8F3D]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0F3A5A]">Contact Information</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-[#0F3A5A] mb-4">EnviroStruct Consulting International Limited</h4>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-[#6E8F3D] mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-700">Office Location</p>
                          <p className="text-gray-500">Nairobi, Kenya</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-[#6E8F3D] mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-700">Phone</p>
                          <p className="text-gray-500">+254 (0) 700 000 000</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Mail className="h-5 w-5 text-[#6E8F3D] mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-700">Email</p>
                          <p className="text-gray-500">envirostructconsulting@yahoo.com</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <div className="bg-[#6E8F3D]/10 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-5 w-5 text-[#6E8F3D]" />
                        <p className="font-semibold text-[#0F3A5A]">Response Time</p>
                      </div>
                      <p className="text-gray-600 text-sm">
                        We typically respond to inquiries within 24-48 business hours. For urgent matters, 
                        please call us directly.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      We look forward to discussing your project requirements, partnership opportunities, 
                      or any professional inquiries you may have. Our team is ready to provide the expert 
                      guidance you need.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-[#0F3A5A] mb-6">Send Us a Message</h3>
                
                {submitSuccess && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <p className="text-green-700">Thank you for your message! We'll respond as soon as possible.</p>
                  </div>
                )}
                
                {submitError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700">{submitError}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6E8F3D] focus:ring-2 focus:ring-[#6E8F3D]/20 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6E8F3D] focus:ring-2 focus:ring-[#6E8F3D]/20 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization or Company Name
                    </label>
                    <input
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      placeholder="Your Organization"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6E8F3D] focus:ring-2 focus:ring-[#6E8F3D]/20 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject of Inquiry <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="e.g., Project Consultation, Partnership, Service Inquiry"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6E8F3D] focus:ring-2 focus:ring-[#6E8F3D]/20 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      placeholder="Please describe your project needs, inquiry, or collaboration opportunity..."
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6E8F3D] focus:ring-2 focus:ring-[#6E8F3D]/20 outline-none transition resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#6E8F3D] text-white py-3 rounded-lg hover:bg-[#5a7a32] transition-all duration-300 font-semibold shadow-lg transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  We'll respond to your inquiry as soon as possible. Thank you for reaching out.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Inquiry Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#6E8F3D] font-semibold text-sm uppercase tracking-wider">Our Expertise</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F3A5A] mt-3 mb-6">
              Services You Can Inquire About
            </h2>
            <div className="w-20 h-1 bg-[#6E8F3D] mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg">
              Organizations can contact us regarding a wide range of consulting services. 
              Please describe your specific needs in your message.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:shadow-md transition">
                  <div className="w-10 h-10 bg-[#6E8F3D]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-[#6E8F3D]" />
                  </div>
                  <span className="text-gray-700 text-sm font-medium">{service.title}</span>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <p className="text-gray-600">
              <span className="font-semibold text-[#6E8F3D]">Pro Tip:</span> When reaching out, please describe your 
              project needs in detail so we can connect you with the right expert on our team.
            </p>
          </div>
        </div>
      </section>

      {/* Collaboration Invitation Section */}
      <section className="py-20 bg-gradient-to-br from-[#0F3A5A] to-[#0A2A42]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#6E8F3D] font-semibold text-sm uppercase tracking-wider">Partner With Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-6">
              Let's Collaborate for Sustainable Development
            </h2>
            <div className="w-20 h-1 bg-[#6E8F3D] mx-auto mb-6"></div>
            <p className="text-gray-300 text-lg">
              We invite organizations to collaborate with EnviroStruct on sustainable development 
              and infrastructure projects that create lasting value for communities and the environment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {collaborators.map((collaborator, index) => {
              const Icon = collaborator.icon;
              return (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 border border-white/20">
                  <div className="w-16 h-16 bg-[#6E8F3D]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-[#6E8F3D]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{collaborator.title}</h3>
                  <p className="text-gray-300 text-sm">
                    Join us in creating sustainable solutions that benefit communities and the environment.
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Link
              to="#"
              className="inline-flex items-center gap-2 bg-[#6E8F3D] text-white px-8 py-3 rounded-lg hover:bg-[#5a7a32] transition shadow-lg"
            >
              Explore Partnership Opportunities <ExternalLink className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-1 bg-[#6E8F3D] mx-auto mb-8"></div>
            <h2 className="text-3xl font-bold text-[#0F3A5A] mb-6">
              Partner with EnviroStruct
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              We invite government agencies, development partners, private sector organizations, engineering firms, 
              and community development organizations to partner with EnviroStruct Consulting International.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Together, we can support environmentally responsible and socially inclusive development that creates 
              lasting value for communities, protects our natural resources, and builds a more sustainable future 
              for generations to come.
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 bg-[#6E8F3D]/10 rounded-full flex items-center justify-center">
                <Handshake className="h-6 w-6 text-[#6E8F3D]" />
              </div>
              <div className="w-12 h-12 bg-[#6E8F3D]/10 rounded-full flex items-center justify-center">
                <Leaf className="h-6 w-6 text-[#6E8F3D]" />
              </div>
              <div className="w-12 h-12 bg-[#6E8F3D]/10 rounded-full flex items-center justify-center">
                <Globe className="h-6 w-6 text-[#6E8F3D]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-96 relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63818.8465447668!2d36.76338197239933!3d-1.2866345907467826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="EnviroStruct Location Map"
          className="filter grayscale hover:grayscale-0 transition duration-500"
        ></iframe>
        <div className="absolute inset-0 bg-[#0F3A5A]/10 pointer-events-none"></div>
      </section>
    </div>
  );
};

export default Contact;