import { Resource } from '../types';

// Resource categories
export const categories = [
  { id: 'all', label: 'All Resources' },
  { id: 'articles', label: 'Articles', icon: 'FileText' },
  { id: 'videos', label: 'Videos', icon: 'Video' },
  { id: 'podcasts', label: 'Podcasts', icon: 'Headphones' },
  { id: 'guides', label: 'Self-Help Guides', icon: 'BookOpen' },
  { id: 'emergency', label: 'Emergency Support', icon: 'Phone' }
];

// Resource data
export const resources: Resource[] = [
  {
    id: 1,
    title: 'Understanding Anxiety: Causes, Symptoms and Treatment Options',
    description: 'A comprehensive guide to understanding anxiety disorders, their symptoms, and various treatment approaches.',
    category: 'articles',
    categoryLabel: 'Articles',
    tags: ['anxiety', 'mental health', 'treatment'],
    image: 'https://images.pexels.com/photos/3755755/pexels-photo-3755755.jpeg?auto=compress&cs=tinysrgb&w=600',
    source: 'Mental Health Foundation',
    readTime: '8 min read',
    featured: true,
    url: 'https://www.mind.org.uk/information-support/types-of-mental-health-problems/anxiety-and-panic-attacks/about-anxiety/'
  },
  {
    id: 2,
    title: 'Mindfulness Meditation for Beginners',
    description: 'Learn the basics of mindfulness meditation and how it can help reduce stress and improve mental wellbeing.',
    category: 'videos',
    categoryLabel: 'Videos',
    tags: ['meditation', 'mindfulness', 'stress'],
    image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=600',
    source: 'Mindfulness Center',
    readTime: '15 min video',
    featured: true,
    url: 'https://www.youtube.com/watch?v=U9YKY7fdwyg'
  },
  {
    id: 3,
    title: 'Sleep Hygiene: Improving Your Sleep Quality',
    description: 'Practical tips and strategies to improve your sleep habits and get better quality rest every night.',
    category: 'guides',
    categoryLabel: 'Self-Help Guides',
    tags: ['sleep', 'health', 'habits'],
    image: 'https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&cs=tinysrgb&w=600',
    source: 'Sleep Research Institute',
    readTime: '12 min read',
    url: 'https://www.sleepfoundation.org/sleep-hygiene'
  },
  {
    id: 4,
    title: 'The Science of Depression and Effective Treatments',
    description: 'An evidence-based overview of depression, its biological basis, and the most effective treatment approaches.',
    category: 'articles',
    categoryLabel: 'Articles',
    tags: ['depression', 'treatment', 'science'],
    image: 'https://images.pexels.com/photos/5699516/pexels-photo-5699516.jpeg?auto=compress&cs=tinysrgb&w=600',
    source: 'Psychology Today',
    readTime: '10 min read',
    url: 'https://www.apa.org/topics/depression/treatment'
  },
  {
    id: 5,
    title: 'Mental Health in the Workplace: Managing Stress and Burnout',
    description: 'Strategies for identifying and managing workplace stress and preventing burnout.',
    category: 'podcasts',
    categoryLabel: 'Podcasts',
    tags: ['work', 'stress', 'burnout'],
    image: 'https://images.pexels.com/photos/7948073/pexels-photo-7948073.jpeg?auto=compress&cs=tinysrgb&w=600',
    source: 'Workplace Wellness Podcast',
    readTime: '32 min podcast',
    url: 'https://www.npr.org/podcasts/381444246/hidden-brain'
  },
  {
    id: 6,
    title: 'Cognitive Behavioral Therapy Techniques You Can Use Today',
    description: 'Learn practical CBT techniques that you can apply in your daily life to improve thought patterns.',
    category: 'guides',
    categoryLabel: 'Self-Help Guides',
    tags: ['therapy', 'CBT', 'techniques'],
    image: 'https://images.pexels.com/photos/6624862/pexels-photo-6624862.jpeg?auto=compress&cs=tinysrgb&w=600',
    source: 'CBT Center',
    readTime: '15 min read',
    url: 'https://www.apa.org/ptsd-guideline/patients-and-families/cognitive-behavioral'
  },
  {
    id: 7,
    title: 'Crisis Support Hotlines and Resources',
    description: 'A comprehensive list of emergency mental health resources, hotlines, and services available 24/7.',
    category: 'emergency',
    categoryLabel: 'Emergency Support',
    tags: ['crisis', 'emergency', 'support'],
    image: 'https://cdn.sanity.io/images/68lp9qid/production/683723515cae0753002ae39ba4972d1a7a114005-3200x1800.png',
    source: 'National Crisis Support Network',
    readTime: '5 min read',
    featured: true,
    url: 'https://www.samhsa.gov/find-help/national-helpline'
  },
  {
    id: 8,
    title: 'Breathing Exercises for Immediate Anxiety Relief',
    description: 'Simple breathing techniques that can help reduce anxiety symptoms in minutes.',
    category: 'videos',
    categoryLabel: 'Videos',
    tags: ['anxiety', 'breathing', 'techniques'],
    image: 'https://images.pexels.com/photos/3759660/pexels-photo-3759660.jpeg?auto=compress&cs=tinysrgb&w=600',
    source: 'Anxiety Relief Center',
    readTime: '8 min video',
    url: 'https://www.youtube.com/watch?v=odADwWzHR24'
  }
];

// Get featured resources
export const featuredResources = resources.filter(resource => resource.featured);
