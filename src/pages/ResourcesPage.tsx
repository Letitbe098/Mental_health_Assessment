import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  BookOpen, 
  Video, 
  Headphones, 
  Link as LinkIcon, 
  Download, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp,
  Filter,
  Clock,
  Tag
} from 'lucide-react';

// Mock data for resources
const resourcesData = [
  {
    id: '1',
    title: 'Understanding Depression: Symptoms, Causes and Treatment',
    type: 'article',
    category: 'depression',
    imageUrl: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'An in-depth look at depression, including its symptoms, causes, and evidence-based treatments.',
    source: 'National Institute of Mental Health',
    readTime: '8 min read',
    link: '#',
  },
  {
    id: '2',
    title: 'Meditation for Anxiety Relief',
    type: 'video',
    category: 'anxiety',
    imageUrl: 'https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'A guided meditation video designed to help reduce anxiety and promote relaxation.',
    source: 'Mindful Health Foundation',
    duration: '15 min',
    link: '#',
  },
  {
    id: '3',
    title: 'Sleep Hygiene: Habits for Better Sleep',
    type: 'article',
    category: 'sleep',
    imageUrl: 'https://images.pexels.com/photos/1028741/pexels-photo-1028741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Learn about effective sleep hygiene practices to improve your sleep quality and mental health.',
    source: 'Sleep Foundation',
    readTime: '6 min read',
    link: '#',
  },
  {
    id: '4',
    title: 'Cognitive Behavioral Therapy Techniques',
    type: 'audio',
    category: 'therapy',
    imageUrl: 'https://images.pexels.com/photos/3755755/pexels-photo-3755755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'An audio guide to basic cognitive behavioral therapy techniques you can practice at home.',
    source: 'American Psychological Association',
    duration: '22 min',
    link: '#',
  },
  {
    id: '5',
    title: 'Managing Stress in the Workplace',
    type: 'pdf',
    category: 'stress',
    imageUrl: 'https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'A comprehensive guide to identifying and managing workplace stress and burnout.',
    source: 'Occupational Health Organization',
    pages: '12 pages',
    link: '#',
  },
  {
    id: '6',
    title: 'Breathing Exercises for Panic Attacks',
    type: 'video',
    category: 'anxiety',
    imageUrl: 'https://images.pexels.com/photos/3094230/pexels-photo-3094230.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Learn effective breathing techniques that can help manage panic attacks and acute anxiety.',
    source: 'Anxiety and Depression Association',
    duration: '8 min',
    link: '#',
  },
];

const ResourcesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedResource, setExpandedResource] = useState<string | null>(null);
  
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'depression', label: 'Depression' },
    { value: 'anxiety', label: 'Anxiety' },
    { value: 'stress', label: 'Stress' },
    { value: 'sleep', label: 'Sleep' },
    { value: 'therapy', label: 'Therapy' },
  ];
  
  const types = [
    { value: 'all', label: 'All Types' },
    { value: 'article', label: 'Articles', icon: <BookOpen size={16} /> },
    { value: 'video', label: 'Videos', icon: <Video size={16} /> },
    { value: 'audio', label: 'Audio', icon: <Headphones size={16} /> },
    { value: 'pdf', label: 'PDFs', icon: <Download size={16} /> },
  ];
  
  const filteredResources = resourcesData.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });
  
  const toggleResourceExpand = (id: string) => {
    if (expandedResource === id) {
      setExpandedResource(null);
    } else {
      setExpandedResource(id);
    }
  };
  
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <BookOpen size={20} />;
      case 'video':
        return <Video size={20} />;
      case 'audio':
        return <Headphones size={20} />;
      case 'pdf':
        return <Download size={20} />;
      default:
        return <LinkIcon size={20} />;
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Mental Health Resources</h1>
        <p className="text-gray-600">
          Explore our curated collection of articles, videos, and tools to support your mental wellbeing.
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
              placeholder="Search resources..."
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
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="w-48">
              <select
                className="input"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {types.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
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
                Category
              </label>
              <select
                className="input"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Resource Type
              </label>
              <select
                className="input"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {types.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Type Filters - Desktop */}
      <div className="hidden md:flex mb-6 overflow-x-auto">
        {types.map((type) => (
          <button
            key={type.value}
            className={`flex items-center px-4 py-2 rounded-full mr-3 transition-colors ${
              selectedType === type.value
                ? 'bg-primary-100 text-primary-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setSelectedType(type.value)}
          >
            {type.icon && <span className="mr-2">{type.icon}</span>}
            {type.label}
          </button>
        ))}
      </div>
      
      {/* Results */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">
          {filteredResources.length} Resources Found
        </h2>
      </div>
      
      {filteredResources.length === 0 ? (
        <div className="bg-white rounded-xl shadow-soft p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Search size={24} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No resources found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search or filters to find more resources.
          </p>
          <button 
            className="btn-primary"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedType('all');
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredResources.map((resource) => (
            <motion.div 
              key={resource.id}
              className="bg-white rounded-xl shadow-soft overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="md:flex">
                <div className="md:w-1/3 h-48 md:h-auto">
                  <img 
                    src={resource.imageUrl} 
                    alt={resource.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <div className="flex items-center mb-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      resource.type === 'article' ? 'bg-blue-100 text-blue-800' :
                      resource.type === 'video' ? 'bg-red-100 text-red-800' :
                      resource.type === 'audio' ? 'bg-purple-100 text-purple-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      <span className="mr-1">{getResourceIcon(resource.type)}</span>
                      {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                    </span>
                    <span className="ml-2 text-xs text-gray-500 flex items-center">
                      <Clock size={12} className="mr-1" />
                      {resource.readTime || resource.duration || resource.pages}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {resource.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Tag size={14} className="text-gray-400 mr-1" />
                      <span className="text-xs text-gray-500">
                        {resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}
                      </span>
                    </div>
                    
                    <button
                      className="text-primary-600 text-sm font-medium flex items-center"
                      onClick={() => toggleResourceExpand(resource.id)}
                    >
                      {expandedResource === resource.id ? (
                        <>Less <ChevronUp size={16} className="ml-1" /></>
                      ) : (
                        <>More <ChevronDown size={16} className="ml-1" /></>
                      )}
                    </button>
                  </div>
                  
                  {expandedResource === resource.id && (
                    <motion.div 
                      className="mt-4 pt-4 border-t border-gray-200"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-gray-700 mb-3">{resource.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Source: {resource.source}</span>
                        <a 
                          href={resource.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn-primary flex items-center text-sm py-1.5"
                        >
                          {resource.type === 'article' ? 'Read Article' :
                           resource.type === 'video' ? 'Watch Video' :
                           resource.type === 'audio' ? 'Listen' :
                           'Download PDF'}
                          <ExternalLink size={14} className="ml-1" />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      
      {/* Featured Collections */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Featured Collections</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-primary-50 rounded-xl p-6 border border-primary-100">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <BookOpen size={20} className="text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Depression Resources</h3>
            <p className="text-gray-700 mb-4">
              Guides, articles, and tools to help understand and manage depression.
            </p>
            <button className="text-primary-600 font-medium flex items-center">
              View Collection <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
          
          <div className="bg-accent-50 rounded-xl p-6 border border-accent-100">
            <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mb-4">
              <Headphones size={20} className="text-accent-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Meditation & Mindfulness</h3>
            <p className="text-gray-700 mb-4">
              Audio guides and practices to help reduce stress and improve mental clarity.
            </p>
            <button className="text-accent-600 font-medium flex items-center">
              View Collection <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
          
          <div className="bg-secondary-50 rounded-xl p-6 border border-secondary-100">
            <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mb-4">
              <Moon size={20} className="text-secondary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Sleep Improvement</h3>
            <p className="text-gray-700 mb-4">
              Resources to help understand sleep patterns and improve sleep quality.
            </p>
            <button className="text-secondary-600 font-medium flex items-center">
              View Collection <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChevronRight = ({ size, className }: { size: number, className: string }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  );
};

export default ResourcesPage;