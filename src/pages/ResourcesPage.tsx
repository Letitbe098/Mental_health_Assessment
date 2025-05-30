import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  FileText, 
  Video, 
  Headphones, 
  Search, 
  ExternalLink, 
  Phone, 
  Heart,
  User,
  Clock,
  Share2,
  Bookmark
} from 'lucide-react';

// Resource categories
const categories = [
  { id: 'all', label: 'All Resources' },
  { id: 'articles', label: 'Articles', icon: <FileText className="h-4 w-4" /> },
  { id: 'videos', label: 'Videos', icon: <Video className="h-4 w-4" /> },
  { id: 'podcasts', label: 'Podcasts', icon: <Headphones className="h-4 w-4" /> },
  { id: 'guides', label: 'Self-Help Guides', icon: <BookOpen className="h-4 w-4" /> },
  { id: 'emergency', label: 'Emergency Support', icon: <Phone className="h-4 w-4" /> }
];

// Resource data
const resources = [
  {
    id: 1,
    title: 'Understanding Anxiety: Causes, Symptoms and Treatment Options',
    description: 'A comprehensive guide to understanding anxiety disorders, their symptoms, and various treatment approaches.',
    category: 'articles',
    tags: ['anxiety', 'mental health', 'treatment'],
    image: 'https://images.pexels.com/photos/3755755/pexels-photo-3755755.jpeg?auto=compress&cs=tinysrgb&w=600',
    source: 'Mental Health Foundation',
    readTime: '8 min read',
    featured: true
  },
  {
    id: 2,
    title: 'Mindfulness Meditation for Beginners',
    description: 'Learn the basics of mindfulness meditation and how it can help reduce stress and improve mental wellbeing.',
    category: 'videos',
    tags: ['meditation', 'mindfulness', 'stress'],
    image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=600',
    source: 'Mindfulness Center',
    readTime: '15 min video',
    featured: true
  },
  {
    id: 3,
    title: 'Sleep Hygiene: Improving Your Sleep Quality',
    description: 'Practical tips and strategies to improve your sleep habits and get better quality rest every night.',
    category: 'guides',
    tags: ['sleep', 'health', 'habits'],
    image: 'https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&cs=tinysrgb&w=600',
    source: 'Sleep Research Institute',
    readTime: '12 min read'
  },
  {
    id: 4,
    title: 'The Science of Depression and Effective Treatments',
    description: 'An evidence-based overview of depression, its biological basis, and the most effective treatment approaches.',
    category: 'articles',
    tags: ['depression', 'treatment', 'science'],
    image: 'https://images.pexels.com/photos/5699516/pexels-photo-5699516.jpeg?auto=compress&cs=tinysrgb&w=600',
    source: 'Psychology Today',
    readTime: '10 min read'
  },
  {
    id: 5,
    title: 'Mental Health in the Workplace: Managing Stress and Burnout',
    description: 'Strategies for identifying and managing workplace stress and preventing burnout.',
    category: 'podcasts',
    tags: ['work', 'stress', 'burnout'],
    image: 'https://images.pexels.com/photos/7948073/pexels-photo-7948073.jpeg?auto=compress&cs=tinysrgb&w=600',
    source: 'Workplace Wellness Podcast',
    readTime: '32 min podcast'
  },
  {
    id: 6,
    title: 'Cognitive Behavioral Therapy Techniques You Can Use Today',
    description: 'Learn practical CBT techniques that you can apply in your daily life to improve thought patterns.',
    category: 'guides',
    tags: ['therapy', 'CBT', 'techniques'],
    image: 'https://images.pexels.com/photos/6624862/pexels-photo-6624862.jpeg?auto=compress&cs=tinysrgb&w=600',
    source: 'CBT Center',
    readTime: '15 min read'
  },
  {
    id: 7,
    title: 'Crisis Support Hotlines and Resources',
    description: 'A comprehensive list of emergency mental health resources, hotlines, and services available 24/7.',
    category: 'emergency',
    tags: ['crisis', 'emergency', 'support'],
    image: 'https://images.pexels.com/photos/4386371/pexels-photo-4386371.jpeg?auto=compress&cs=tinysrgb&w=600',
    source: 'National Crisis Support Network',
    readTime: '5 min read',
    featured: true
  },
  {
    id: 8,
    title: 'Breathing Exercises for Immediate Anxiety Relief',
    description: 'Simple breathing techniques that can help reduce anxiety symptoms in minutes.',
    category: 'videos',
    tags: ['anxiety', 'breathing', 'techniques'],
    image: 'https://images.pexels.com/photos/3759660/pexels-photo-3759660.jpeg?auto=compress&cs=tinysrgb&w=600',
    source: 'Anxiety Relief Center',
    readTime: '8 min video'
  }
];

const ResourcesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [bookmarkedResources, setBookmarkedResources] = useState<number[]>([]);

  const toggleBookmark = (id: number) => {
    if (bookmarkedResources.includes(id)) {
      setBookmarkedResources(bookmarkedResources.filter(resId => resId !== id));
    } else {
      setBookmarkedResources([...bookmarkedResources, id]);
    }
  };

  // Filter resources based on search query and selected category
  const filteredResources = resources.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Get featured resources
  const featuredResources = resources.filter(resource => resource.featured);

  return (
    <div className="container mx-auto mt-24 px-4">
      <div>
        <h1 className="text-2xl font-bold text-text md:text-3xl">Mental Health Resources</h1>
        <p className="text-gray-600">
          Explore our curated collection of resources to support your mental well-being
        </p>
      </div>

      {/* Search and filters */}
      <div className="mt-8">
        <div className="mb-6">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input w-full pl-10"
            />
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.icon && <span className="mr-2">{category.icon}</span>}
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured resources */}
      {selectedCategory === 'all' && searchQuery === '' && (
        <div className="mb-10">
          <h2 className="mb-4 text-xl font-semibold">Featured Resources</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {featuredResources.map((resource) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-lg shadow-md"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={resource.image} 
                    alt={resource.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="absolute left-0 top-0 rounded-br-lg bg-primary px-3 py-1 text-xs font-medium text-white">
                  Featured
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-block rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                      {categories.find(cat => cat.id === resource.category)?.label}
                    </span>
                    <button 
                      onClick={() => toggleBookmark(resource.id)}
                      className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-primary"
                    >
                      <Bookmark 
                        className={`h-5 w-5 ${bookmarkedResources.includes(resource.id) ? 'fill-primary text-primary' : ''}`} 
                      />
                    </button>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold leading-tight">{resource.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">{resource.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <User className="mr-1 h-3 w-3" />
                      <span>{resource.source}</span>
                      <span className="mx-2">•</span>
                      <Clock className="mr-1 h-3 w-3" />
                      <span>{resource.readTime}</span>
                    </div>
                    <button className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-primary">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                  <a 
                    href="#" 
                    className="mt-4 flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                  >
                    View Resource
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Emergency support section */}
      {(selectedCategory === 'all' || selectedCategory === 'emergency') && searchQuery === '' && (
        <div className="mb-10 rounded-lg bg-red-50 p-6">
          <div className="flex items-start">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <Phone className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-red-800">Emergency Mental Health Support</h2>
              <p className="mt-1 text-red-700">
                If you're in crisis or need immediate support, please reach out to one of these resources:
              </p>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-md bg-white p-4 shadow-sm">
                  <h3 className="font-medium text-gray-800">National Suicide Prevention Lifeline</h3>
                  <p className="text-lg font-bold text-primary">1-800-273-8255</p>
                  <p className="text-sm text-gray-600">Available 24/7</p>
                </div>
                <div className="rounded-md bg-white p-4 shadow-sm">
                  <h3 className="font-medium text-gray-800">Crisis Text Line</h3>
                  <p className="text-lg font-bold text-primary">Text HOME to 741741</p>
                  <p className="text-sm text-gray-600">Available 24/7</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-red-700">
                Remember, seeking help is a sign of strength, not weakness. You are not alone.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* All resources */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">
          {searchQuery ? 'Search Results' : selectedCategory !== 'all' ? 
            categories.find(cat => cat.id === selectedCategory)?.label : 'All Resources'}
        </h2>
        
        {filteredResources.length === 0 ? (
          <div className="rounded-lg border bg-white p-8 text-center">
            <Search className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium">No resources found</h3>
            <p className="mt-1 text-gray-600">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                className="rounded-lg border bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="h-40 overflow-hidden">
                  <img 
                    src={resource.image} 
                    alt={resource.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {resource.category === 'articles' && <FileText className="mr-2 h-4 w-4 text-blue-500" />}
                      {resource.category === 'videos' && <Video className="mr-2 h-4 w-4 text-red-500" />}
                      {resource.category === 'podcasts' && <Headphones className="mr-2 h-4 w-4 text-purple-500" />}
                      {resource.category === 'guides' && <BookOpen className="mr-2 h-4 w-4 text-green-500" />}
                      {resource.category === 'emergency' && <Phone className="mr-2 h-4 w-4 text-red-500" />}
                      <span className="text-xs font-medium text-gray-600">
                        {categories.find(cat => cat.id === resource.category)?.label}
                      </span>
                    </div>
                    <button 
                      onClick={() => toggleBookmark(resource.id)}
                      className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-primary"
                    >
                      <Bookmark 
                        className={`h-4 w-4 ${bookmarkedResources.includes(resource.id) ? 'fill-primary text-primary' : ''}`} 
                      />
                    </button>
                  </div>
                  
                  <h3 className="mt-2 text-lg font-semibold leading-tight">{resource.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">{resource.description}</p>
                  
                  <div className="mt-3 flex flex-wrap gap-1">
                    {resource.tags.map(tag => (
                      <span key={tag} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <User className="mr-1 h-3 w-3" />
                      <span>{resource.source}</span>
                      <span className="mx-1">•</span>
                      <Clock className="mr-1 h-3 w-3" />
                      <span>{resource.readTime}</span>
                    </div>
                    <div className="flex items-center">
                      <button className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-red-500">
                        <Heart className="h-4 w-4" />
                      </button>
                      <button className="ml-1 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-primary">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <a 
                    href="#" 
                    className="mt-4 flex w-full items-center justify-center rounded-md border border-primary bg-white px-4 py-2 text-sm font-medium text-primary hover:bg-primary/5"
                  >
                    View Resource
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourcesPage;
