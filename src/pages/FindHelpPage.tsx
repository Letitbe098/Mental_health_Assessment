import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  Star, 
  Filter, 
  Sliders, 
  ChevronDown,
  ExternalLink
} from 'lucide-react';
import { getNearbyDoctors, Doctor } from '../services/locationService';

const FindHelpPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [specialty, setSpecialty] = useState('all');
  const [location, setLocation] = useState('');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const data = await getNearbyDoctors(specialty);
        setDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDoctors();
  }, [specialty]);
  
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = 
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLocation = !location || doctor.address.toLowerCase().includes(location.toLowerCase());
    
    return matchesSearch && matchesLocation;
  });
  
  const specialties = [
    { value: 'all', label: 'All Specialties' },
    { value: 'psychiatrist', label: 'Psychiatrist' },
    { value: 'psychologist', label: 'Psychologist' },
    { value: 'therapist', label: 'Therapist' },
    { value: 'counselor', label: 'Counselor' },
  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Find Mental Health Professionals</h1>
        <p className="text-gray-600">
          Connect with qualified mental health providers in your area who can provide the support you need.
        </p>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-soft p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, specialty, or location"
              className="input pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <button
            className="md:hidden btn-outline flex items-center justify-center"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} className="mr-2" />
            Filters
          </button>
          
          <div className="hidden md:flex gap-4">
            <div className="w-48">
              <select
                className="input"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
              >
                {specialties.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="relative w-48">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="City or ZIP"
                className="input pl-10"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        {/* Mobile Filters */}
        {showFilters && (
          <motion.div 
            className="md:hidden mt-4 pt-4 border-t border-gray-200 space-y-4"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Specialty
              </label>
              <select
                className="input"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
              >
                {specialties.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="City or ZIP"
                  className="input pl-10"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Results */}
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {loading ? 'Finding providers...' : `${filteredDoctors.length} Providers Found`}
          </h2>
          <div className="flex items-center text-sm text-gray-500">
            <Sliders size={16} className="mr-2" />
            <span className="mr-2">Sort by:</span>
            <select className="border-none bg-transparent font-medium text-gray-700 focus:outline-none focus:ring-0">
              <option>Distance</option>
              <option>Rating</option>
              <option>Name</option>
            </select>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      ) : filteredDoctors.length === 0 ? (
        <div className="bg-white rounded-xl shadow-soft p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Search size={24} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No providers found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search filters or location to find more providers.
          </p>
          <button 
            className="btn-primary"
            onClick={() => {
              setSearchQuery('');
              setSpecialty('all');
              setLocation('');
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <motion.div 
              key={doctor.id}
              className="bg-white rounded-xl shadow-soft overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{doctor.name}</h3>
                    <p className="text-primary-600 font-medium">{doctor.specialty}</p>
                  </div>
                  <div className="flex items-center bg-primary-50 text-primary-700 px-2 py-1 rounded-lg">
                    <Star size={16} className="text-warning-500 mr-1" />
                    <span>{doctor.rating}</span>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-start">
                    <MapPin size={18} className="text-gray-400 mr-2 mt-0.5" />
                    <span className="text-gray-700">{doctor.address}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone size={18} className="text-gray-400 mr-2" />
                    <span className="text-gray-700">{doctor.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <User size={18} className="text-gray-400 mr-2" />
                    <span className="text-gray-700">
                      {doctor.distance} miles away • In-person & Telehealth
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <a 
                    href={`tel:${doctor.phone.replace(/[^0-9]/g, '')}`}
                    className="btn-outline flex-1 flex justify-center items-center"
                  >
                    <Phone size={18} className="mr-1" />
                    Call
                  </a>
                  <button className="btn-primary flex-1 flex justify-center items-center">
                    <Mail size={18} className="mr-1" />
                    Contact
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-50 px-6 py-3 flex justify-between items-center">
                <span className="text-sm text-gray-600">Available for new patients</span>
                <a href="#" className="text-primary-600 text-sm font-medium flex items-center">
                  View Profile <ExternalLink size={14} className="ml-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      
      {/* Crisis Support */}
      <div className="mt-12 bg-primary-50 border border-primary-100 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Need Immediate Support?</h3>
        <p className="text-gray-700 mb-4">
          If you're experiencing a mental health crisis or need immediate support, help is available 24/7:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-primary-100">
            <h4 className="font-semibold mb-2">National Crisis Line</h4>
            <p className="text-gray-600 mb-2">Call or text 988 for immediate support.</p>
            <a href="tel:988" className="text-primary-600 font-medium flex items-center">
              <Phone size={16} className="mr-1" /> Call 988
            </a>
          </div>
          <div className="bg-white rounded-lg p-4 border border-primary-100">
            <h4 className="font-semibold mb-2">Crisis Text Line</h4>
            <p className="text-gray-600 mb-2">Text HOME to 741741 to connect with a counselor.</p>
            <a href="sms:741741?&body=HOME" className="text-primary-600 font-medium flex items-center">
              <Mail size={16} className="mr-1" /> Text 741741
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindHelpPage;