import React from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart2,
  LineChart,
  ClipboardCheck,
  Calendar,
  Moon,
  Sun,
  ArrowRight,
  Target,
  TrendingUp,
  Award
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line
} from 'recharts';
import { useAuth } from '../contexts/AuthContext';

const DashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  
  // Mock data for visualizations
  const moodData = [
    { day: 'Mon', mood: 7, sleep: 7 },
    { day: 'Tue', mood: 6, sleep: 6 },
    { day: 'Wed', mood: 8, sleep: 8 },
    { day: 'Thu', mood: 5, sleep: 5 },
    { day: 'Fri', mood: 7, sleep: 7 },
    { day: 'Sat', mood: 9, sleep: 8 },
    { day: 'Sun', mood: 8, sleep: 7 },
  ];
  
  const assessmentHistory = [
    { month: 'Jan', depression: 12, anxiety: 14 },
    { month: 'Feb', depression: 10, anxiety: 12 },
    { month: 'Mar', depression: 8, anxiety: 9 },
    { month: 'Apr', depression: 6, anxiety: 8 },
    { month: 'May', depression: 4, anxiety: 6 },
    { month: 'Jun', depression: 5, anxiety: 7 },
  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back, {currentUser?.displayName || 'User'}
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-2">
          <span className="text-gray-600 text-sm">Last assessment: 5 days ago</span>
          <Link to="/assessment" className="btn-primary">
            Take Assessment
          </Link>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 mb-1">Current Mood</p>
              <h3 className="text-2xl font-bold">Good</h3>
            </div>
            <div className="p-2 rounded-full bg-primary-100 text-primary-600">
              <Sun size={24} />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center">
              <TrendingUp size={16} className="text-secondary-500 mr-1" />
              <span className="text-sm text-gray-600">20% better than last week</span>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 mb-1">Sleep Quality</p>
              <h3 className="text-2xl font-bold">6.8 hrs</h3>
            </div>
            <div className="p-2 rounded-full bg-accent-100 text-accent-600">
              <Moon size={24} />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center">
              <span className="text-sm text-gray-600">Good quality • Consistent pattern</span>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 mb-1">Depression Score</p>
              <h3 className="text-2xl font-bold">5 <span className="text-sm font-normal text-gray-500">/ 27</span></h3>
            </div>
            <div className="p-2 rounded-full bg-secondary-100 text-secondary-600">
              <ClipboardCheck size={24} />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center">
              <Target size={16} className="text-secondary-500 mr-1" />
              <span className="text-sm text-gray-600">Mild • Improving trend</span>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 mb-1">Anxiety Score</p>
              <h3 className="text-2xl font-bold">7 <span className="text-sm font-normal text-gray-500">/ 21</span></h3>
            </div>
            <div className="p-2 rounded-full bg-warning-100 text-warning-500">
              <BarChart2 size={24} />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center">
              <Target size={16} className="text-warning-500 mr-1" />
              <span className="text-sm text-gray-600">Moderate • Stable</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mood and Sleep Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Mood Trends</h2>
            <Link to="/mood-tracker" className="text-primary-600 text-sm font-medium flex items-center">
              View Details <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={moodData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" domain={[0, 10]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  name="Mood" 
                  stroke="#4A90E2" 
                  strokeWidth={2} 
                  activeDot={{ r: 8 }} 
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center">
              <Award size={20} className="text-primary-500 mr-2" />
              <span className="text-gray-700">Your mood has been most positive on weekends.</span>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Sleep Quality</h2>
            <Link to="/mood-tracker" className="text-primary-600 text-sm font-medium flex items-center">
              View Details <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={moodData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" domain={[0, 10]} />
                <Tooltip />
                <Bar 
                  dataKey="sleep" 
                  name="Sleep Quality" 
                  fill="#B19CD9" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center">
              <Moon size={20} className="text-accent-500 mr-2" />
              <span className="text-gray-700">Your average sleep quality is 6.8/10 this week.</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Assessment History */}
      <div className="card mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Assessment History</h2>
          <Link to="/assessment" className="text-primary-600 text-sm font-medium flex items-center">
            Take New Assessment <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart data={assessmentHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="depression" 
                name="Depression Score" 
                stroke="#4A90E2" 
                strokeWidth={2} 
                dot={{ stroke: '#4A90E2', strokeWidth: 2, r: 4 }} 
              />
              <Line 
                type="monotone" 
                dataKey="anxiety" 
                name="Anxiety Score" 
                stroke="#B19CD9" 
                strokeWidth={2} 
                dot={{ stroke: '#B19CD9', strokeWidth: 2, r: 4 }} 
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex items-center">
            <TrendingUp size={20} className="text-secondary-500 mr-2" />
            <span className="text-gray-700">Your mental health scores show improvement over the last 6 months.</span>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-primary-50 border border-primary-100">
          <div className="p-2 rounded-full bg-primary-100 text-primary-600 w-12 h-12 flex items-center justify-center mb-4">
            <ClipboardCheck size={24} />
          </div>
          <h3 className="text-xl font-semibold mb-2">Take Assessment</h3>
          <p className="text-gray-600 mb-4">
            Regular assessments help track your mental health progress over time.
          </p>
          <Link to="/assessment" className="text-primary-600 font-medium flex items-center">
            Start now <ArrowRight size={18} className="ml-1" />
          </Link>
        </div>
        
        <div className="card bg-secondary-50 border border-secondary-100">
          <div className="p-2 rounded-full bg-secondary-100 text-secondary-600 w-12 h-12 flex items-center justify-center mb-4">
            <Calendar size={24} />
          </div>
          <h3 className="text-xl font-semibold mb-2">Log Today's Mood</h3>
          <p className="text-gray-600 mb-4">
            Track your daily mood and sleep patterns to identify trends.
          </p>
          <Link to="/mood-tracker" className="text-secondary-600 font-medium flex items-center">
            Record mood <ArrowRight size={18} className="ml-1" />
          </Link>
        </div>
        
        <div className="card bg-accent-50 border border-accent-100">
          <div className="p-2 rounded-full bg-accent-100 text-accent-600 w-12 h-12 flex items-center justify-center mb-4">
            <LineChart size={24} />
          </div>
          <h3 className="text-xl font-semibold mb-2">Find Support</h3>
          <p className="text-gray-600 mb-4">
            Connect with mental health professionals in your area.
          </p>
          <Link to="/find-help" className="text-accent-600 font-medium flex items-center">
            Find help <ArrowRight size={18} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;