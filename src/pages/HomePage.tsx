import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Shield, 
  Sparkles, 
  Users, 
  Brain, 
  LineChart, 
  MessageSquare, 
  Award,
  ArrowRight,
  Star,
  Play,
  TrendingUp,
  Heart,
  Zap
} from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <Brain size={28} className="text-primary-500" />,
      title: 'AI-Powered Assessments',
      description: 'Take scientifically validated mental health assessments with personalized insights powered by advanced AI.',
      color: 'bg-primary-50 border-primary-100',
    },
    {
      icon: <LineChart size={28} className="text-secondary-500" />,
      title: 'Smart Mood Tracking',
      description: 'Track your emotional patterns with intelligent analytics that help you understand your mental wellbeing trends.',
      color: 'bg-secondary-50 border-secondary-100',
    },
    {
      icon: <MessageSquare size={28} className="text-accent-500" />,
      title: '24/7 AI Support',
      description: 'Get instant support from our empathetic AI chatbot, trained specifically for mental health guidance.',
      color: 'bg-accent-50 border-accent-100',
    },
    {
      icon: <Users size={28} className="text-warning-500" />,
      title: 'Expert Network',
      description: 'Connect with verified mental health professionals who match your specific needs and preferences.',
      color: 'bg-warning-50 border-warning-100',
    },
  ];

  const stats = [
    { number: '50K+', label: 'Users Helped', icon: <Users size={20} /> },
    { number: '95%', label: 'Satisfaction Rate', icon: <Star size={20} /> },
    { number: '24/7', label: 'Support Available', icon: <MessageSquare size={20} /> },
    { number: '1000+', label: 'Professionals', icon: <Award size={20} /> },
  ];

  const testimonials = [
    {
      quote: 'MindfulCheck transformed how I understand my mental health. The AI insights are incredibly accurate and helpful.',
      author: 'Sarah Chen',
      role: 'Software Engineer',
      rating: 5,
      avatar: 'SC',
    },
    {
      quote: 'The mood tracking feature helped me identify patterns I never noticed. It\'s like having a personal mental health coach.',
      author: 'Marcus Johnson',
      role: 'Teacher',
      rating: 5,
      avatar: 'MJ',
    },
    {
      quote: 'Finding the right therapist through MindfulCheck was seamless. The matching system really works.',
      author: 'Elena Rodriguez',
      role: 'Marketing Director',
      rating: 5,
      avatar: 'ER',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Complete Assessment',
      description: 'Take our comprehensive mental health assessment in just 5 minutes',
      icon: <Brain size={24} />,
    },
    {
      number: '02',
      title: 'Get AI Insights',
      description: 'Receive personalized recommendations based on your unique profile',
      icon: <Sparkles size={24} />,
    },
    {
      number: '03',
      title: 'Track & Improve',
      description: 'Monitor your progress and connect with professionals when needed',
      icon: <TrendingUp size={24} />,
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-primary-600 via-primary-500 to-accent-600">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Sparkles size={16} className="text-yellow-300 mr-2" />
                <span className="text-white text-sm font-medium">AI-Powered Mental Health Platform</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Your Mental Health,
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                  Reimagined
                </span>
              </h1>
              
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Experience the future of mental wellness with AI-driven assessments, 
                personalized insights, and instant access to professional support.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link 
                  to="/register" 
                  className="group bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  Start Your Journey
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/assessment" 
                  className="group bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
                >
                  <Play size={20} className="mr-2" />
                  Take Free Assessment
                </Link>
              </div>
              
              <div className="flex items-center space-x-6 text-white/80">
                <div className="flex items-center">
                  <Shield size={20} className="mr-2" />
                  <span className="text-sm">HIPAA Compliant</span>
                </div>
                <div className="flex items-center">
                  <Heart size={20} className="mr-2" />
                  <span className="text-sm">Trusted by 50K+ Users</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl blur-3xl opacity-20 animate-pulse-slow"></div>
                <img 
                  src="https://images.pexels.com/photos/3758105/pexels-photo-3758105.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2" 
                  alt="Mental wellness illustration" 
                  className="relative rounded-3xl shadow-2xl w-full h-auto"
                />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
                      <TrendingUp size={24} className="text-secondary-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Mental Health Score</p>
                      <p className="text-2xl font-bold text-secondary-600">8.5/10</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mb-4 text-primary-600">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">
              Advanced Features for
              <span className="block text-primary-600">Better Mental Health</span>
            </h2>
            <p className="text-xl text-gray-600">
              Our cutting-edge platform combines AI technology with human expertise 
              to provide comprehensive mental health support.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`${feature.color} border rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group`}
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">How It Works</h2>
            <p className="text-xl text-gray-600">
              Get started with your mental health journey in three simple steps
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`flex items-center mb-12 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
              >
                <div className="flex-1">
                  <div className={`bg-gradient-to-r ${
                    index === 0 ? 'from-primary-500 to-primary-600' :
                    index === 1 ? 'from-secondary-500 to-secondary-600' :
                    'from-accent-500 to-accent-600'
                  } text-white rounded-2xl p-8`}>
                    <div className="flex items-center mb-4">
                      <span className="text-3xl font-bold opacity-50 mr-4">{step.number}</span>
                      <div className="p-2 bg-white/20 rounded-lg">
                        {step.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-lg opacity-90">{step.description}</p>
                  </div>
                </div>
                <div className="w-16 flex justify-center">
                  {index < steps.length - 1 && (
                    <div className="w-1 h-16 bg-gradient-to-b from-gray-300 to-transparent"></div>
                  )}
                </div>
                <div className="flex-1"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">What Our Users Say</h2>
            <p className="text-xl text-gray-600">
              Real stories from people who transformed their mental health journey with MindfulCheck
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary-600 font-semibold">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Mental Health?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of people who are taking control of their mental wellbeing 
              with our AI-powered platform. Start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <Link 
                to="/register" 
                className="group bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl"
              >
                Get Started Free
                <Zap size={20} className="ml-2 group-hover:scale-110 transition-transform" />
              </Link>
              <Link 
                to="/assessment" 
                className="group bg-white/10 backdrop-blur-sm border border-white/20 px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
              >
                Take Free Assessment
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="flex justify-center items-center space-x-8 text-sm opacity-80">
              <div className="flex items-center">
                <CheckCircle size={16} className="mr-2" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center">
                <Shield size={16} className="mr-2" />
                <span>100% Private & Secure</span>
              </div>
              <div className="flex items-center">
                <Users size={16} className="mr-2" />
                <span>Trusted by 50K+ Users</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;