import { useState } from 'react';
import { 
  BookOpen, 
  FileText, 
  Video, 
  Headphones, 
  Search, 
  Phone,
  Heart
} from 'lucide-react';
import { categories, resources, featuredResources } from '../data/resources';
import ResourceCard from '../components/ResourceCard';
import EmergencySupport from '../components/EmergencySupport';

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
              className="input w-full rounded-md border border-gray-300 px-4 py-2 pl-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
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
              {category.icon && (
                <span className="mr-2">
                  {category.icon === 'FileText' && <FileText className="h-4 w-4" />}
                  {category.icon === 'Video' && <Video className="h-4 w-4" />}
                  {category.icon === 'Headphones' && <Headphones className="h-4 w-4" />}
                  {category.icon === 'BookOpen' && <BookOpen className="h-4 w-4" />}
                  {category.icon === 'Phone' && <Phone className="h-4 w-4" />}
                </span>
              )}
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
              <ResourceCard 
                key={resource.id}
                resource={resource}
                isFeatured={true}
                bookmarkedResources={bookmarkedResources}
                toggleBookmark={toggleBookmark}
              />
            ))}
          </div>
        </div>
      )}

      {/* Emergency support section */}
      {(selectedCategory === 'all' || selectedCategory === 'emergency') && searchQuery === '' && (
        <EmergencySupport />
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
              <ResourceCard 
                key={resource.id}
                resource={resource}
                bookmarkedResources={bookmarkedResources}
                toggleBookmark={toggleBookmark}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourcesPage;
