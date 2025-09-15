import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format, subDays, eachDayOfInterval } from 'date-fns';
import { 
  Smile, 
  Frown, 
  Meh, 
  Moon, 
  Sun, 
  CloudRain,
  Zap,
  Calendar,
  Plus,
  ChevronLeft,
  ChevronRight,
  Save,
  TrendingUp,
  Brain,
  Target,
  Activity
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area
} from 'recharts';
import { moodAnalysisService, MoodEntry, MoodPrediction, MoodPattern } from '../services/moodAnalysisService';

// Enhanced mock data with more factors
const generateEnhancedMockData = () => {
  const today = new Date();
  const days = eachDayOfInterval({
    start: subDays(today, 30),
    end: today
  });

  return days.map(day => {
    const formattedDay = format(day, 'MMM dd');
    const dayOfWeek = day.getDay();
    
    // Simulate realistic patterns
    let baseMood = 6;
    if (dayOfWeek === 0 || dayOfWeek === 6) baseMood += 1; // Weekends better
    if (dayOfWeek === 1) baseMood -= 0.5; // Monday blues
    
    const sleep = Math.max(4, Math.min(10, baseMood + Math.random() * 2 - 1));
    const energy = Math.max(3, Math.min(10, sleep * 0.8 + Math.random() * 2));
    const anxiety = Math.max(1, Math.min(10, 8 - baseMood + Math.random() * 2));
    const mood = Math.max(1, Math.min(10, baseMood + (sleep - 6) * 0.3 + (energy - 6) * 0.2 - (anxiety - 5) * 0.2 + Math.random() * 1 - 0.5));
    
    return {
      date: formattedDay,
      fullDate: day,
      mood: Math.round(mood * 10) / 10,
      energy: Math.round(energy * 10) / 10,
      sleep: Math.round(sleep * 10) / 10,
      anxiety: Math.round(anxiety * 10) / 10,
      socialInteraction: Math.floor(Math.random() * 5) + 4,
      exercise: Math.floor(Math.random() * 6) + 3,
      workStress: Math.floor(Math.random() * 7) + 2,
    };
  });
};

const MoodTrackerPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showMoodForm, setShowMoodForm] = useState(false);
  const [moodValue, setMoodValue] = useState(7);
  const [energyValue, setEnergyValue] = useState(6);
  const [sleepValue, setSleepValue] = useState(7);
  const [anxietyValue, setAnxietyValue] = useState(4);
  const [socialValue, setSocialValue] = useState(6);
  const [exerciseValue, setExerciseValue] = useState(5);
  const [workStressValue, setWorkStressValue] = useState(4);
  const [notes, setNotes] = useState('');
  const [activities, setActivities] = useState<string[]>([]);
  const [moodData, setMoodData] = useState(generateEnhancedMockData());
  const [moodPrediction, setMoodPrediction] = useState<MoodPrediction | null>(null);
  const [moodPatterns, setMoodPatterns] = useState<MoodPattern[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    initializeMoodAnalysis();
  }, []);

  const initializeMoodAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      await moodAnalysisService.initialize();
      
      // Add mock data to the service for demonstration
      moodData.forEach(entry => {
        moodAnalysisService.addMoodEntry({
          date: entry.fullDate,
          mood: entry.mood,
          energy: entry.energy,
          sleep: entry.sleep,
          anxiety: entry.anxiety,
          socialInteraction: entry.socialInteraction,
          exercise: entry.exercise,
          workStress: entry.workStress
        });
      });

      // Get mood patterns
      const patterns = moodAnalysisService.identifyMoodPatterns();
      setMoodPatterns(patterns);

      // Get mood prediction for tomorrow
      const latestEntry = moodData[moodData.length - 1];
      const prediction = await moodAnalysisService.predictMood({
        previousMood: latestEntry.mood,
        sleep: latestEntry.sleep,
        energy: latestEntry.energy,
        anxiety: latestEntry.anxiety,
        socialInteraction: latestEntry.socialInteraction,
        exercise: latestEntry.exercise
      });
      setMoodPrediction(prediction);
    } catch (error) {
      console.error('Error initializing mood analysis:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <TrendingUp size={20} /> },
    { id: 'mood', label: 'Mood', icon: <Smile size={20} /> },
    { id: 'sleep', label: 'Sleep', icon: <Moon size={20} /> },
    { id: 'energy', label: 'Energy', icon: <Zap size={20} /> },
    { id: 'anxiety', label: 'Anxiety', icon: <CloudRain size={20} /> },
    { id: 'insights', label: 'AI Insights', icon: <Brain size={20} /> },
  ];

  const activityOptions = [
    'Exercise', 'Meditation', 'Reading', 'Socializing', 'Work', 'Hobbies', 
    'Outdoor time', 'Music', 'Cooking', 'Gaming', 'Learning', 'Relaxing'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEntry = {
      date: new Date(),
      mood: moodValue,
      energy: energyValue,
      sleep: sleepValue,
      anxiety: anxietyValue,
      socialInteraction: socialValue,
      exercise: exerciseValue,
      workStress: workStressValue,
      notes,
      activities
    };

    // Add to service
    moodAnalysisService.addMoodEntry(newEntry);

    // Update local data
    const newDataPoint = {
      date: format(new Date(), 'MMM dd'),
      fullDate: new Date(),
      mood: moodValue,
      energy: energyValue,
      sleep: sleepValue,
      anxiety: anxietyValue,
      socialInteraction: socialValue,
      exercise: exerciseValue,
      workStress: workStressValue,
    };

    setMoodData(prev => [...prev.slice(-29), newDataPoint]);
    
    // Get new prediction
    const prediction = await moodAnalysisService.predictMood({
      previousMood: moodValue,
      sleep: sleepValue,
      energy: energyValue,
      anxiety: anxietyValue,
      socialInteraction: socialValue,
      exercise: exerciseValue
    });
    setMoodPrediction(prediction);

    // Reset form
    setShowMoodForm(false);
    setNotes('');
    setActivities([]);
  };

  const toggleActivity = (activity: string) => {
    setActivities(prev => 
      prev.includes(activity) 
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    );
  };

  const getMoodIcon = (value: number) => {
    if (value >= 8) return <Smile className="text-secondary-500" />;
    if (value >= 5) return <Meh className="text-warning-500" />;
    return <Frown className="text-error-500" />;
  };

  const getMoodColor = (value: number) => {
    if (value >= 8) return '#50C878';
    if (value >= 5) return '#F59E0B';
    return '#EF4444';
  };

  const getInsightColor = (impact: number) => {
    if (impact > 0.5) return 'text-green-600 bg-green-50';
    if (impact < -0.5) return 'text-red-600 bg-red-50';
    return 'text-yellow-600 bg-yellow-50';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">AI-Powered Mood Tracker</h1>
          <p className="text-gray-600">
            Track your mood with machine learning insights and personalized recommendations
          </p>
        </div>
        <button 
          className="mt-4 sm:mt-0 btn-primary flex items-center"
          onClick={() => setShowMoodForm(true)}
        >
          <Plus size={18} className="mr-1" /> Record Today
        </button>
      </div>

      {/* AI Insights Summary */}
      {moodPrediction && (
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 mb-8 border border-primary-100">
          <div className="flex items-center mb-4">
            <Brain size={24} className="text-primary-600 mr-2" />
            <h2 className="text-xl font-semibold">AI Mood Prediction</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-medium text-gray-700 mb-2">Tomorrow's Predicted Mood</h3>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-primary-600">
                  {moodPrediction.predictedMood.toFixed(1)}/10
                </span>
                <span className="ml-2 text-sm text-gray-500">
                  ({Math.round(moodPrediction.confidence * 100)}% confidence)
                </span>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-medium text-gray-700 mb-2">Key Factors</h3>
              <div className="space-y-1">
                {moodPrediction.factors.slice(0, 2).map((factor, index) => (
                  <div key={index} className={`text-xs px-2 py-1 rounded ${getInsightColor(factor.impact)}`}>
                    {factor.factor}: {factor.impact > 0 ? '+' : ''}{(factor.impact * 100).toFixed(0)}%
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-medium text-gray-700 mb-2">Top Recommendation</h3>
              <p className="text-sm text-gray-600">
                {moodPrediction.recommendations[0] || "Keep up your current routine!"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-soft mb-8">
        <div className="flex overflow-x-auto border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex items-center px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'text-primary-600 border-b-2 border-primary-500'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Comprehensive Overview</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={moodData.slice(-14)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" domain={[0, 10]} />
                    <Tooltip />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="mood" 
                      name="Mood" 
                      stroke="#4A90E2" 
                      fill="#4A90E2" 
                      fillOpacity={0.3}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="energy" 
                      name="Energy" 
                      stroke="#50C878" 
                      fill="#50C878" 
                      fillOpacity={0.3}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="sleep" 
                      name="Sleep" 
                      stroke="#B19CD9" 
                      fill="#B19CD9" 
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'insights' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">AI-Generated Insights</h2>
                {isAnalyzing && (
                  <div className="flex items-center text-primary-600">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600 mr-2"></div>
                    Analyzing patterns...
                  </div>
                )}
              </div>

              {/* Mood Patterns */}
              {moodPatterns.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <Target size={20} className="text-primary-600 mr-2" />
                    Identified Patterns
                  </h3>
                  <div className="space-y-4">
                    {moodPatterns.map((pattern, index) => (
                      <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                        <h4 className="font-medium text-gray-800 mb-2">{pattern.pattern}</h4>
                        <p className="text-gray-600 text-sm mb-3">{pattern.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {pattern.triggers.map((trigger, i) => (
                            <span key={i} className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded">
                              {trigger}
                            </span>
                          ))}
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-gray-700">Suggestions:</p>
                          {pattern.suggestions.map((suggestion, i) => (
                            <p key={i} className="text-xs text-gray-600">• {suggestion}</p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Detailed Factor Analysis */}
              {moodPrediction && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <Activity size={20} className="text-primary-600 mr-2" />
                    Factor Impact Analysis
                  </h3>
                  <div className="space-y-3">
                    {moodPrediction.factors.map((factor, index) => (
                      <div key={index} className="bg-white rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{factor.factor}</span>
                          <span className={`text-sm font-medium ${
                            factor.impact > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {factor.impact > 0 ? '+' : ''}{(factor.impact * 100).toFixed(0)}%
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{factor.description}</p>
                        <div className="mt-2 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              factor.impact > 0 ? 'bg-green-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${Math.abs(factor.impact) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {moodPrediction && moodPrediction.recommendations.length > 0 && (
                <div className="bg-gradient-to-r from-secondary-50 to-accent-50 rounded-lg p-6">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <Lightbulb size={20} className="text-secondary-600 mr-2" />
                    Personalized Recommendations
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {moodPrediction.recommendations.map((rec, index) => (
                      <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                        <p className="text-sm text-gray-700">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Other existing tab content */}
          {activeTab !== 'overview' && activeTab !== 'insights' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                  {tabs.find(tab => tab.id === activeTab)?.label} History
                </h2>
                <div className="flex space-x-2">
                  <button className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
                    <ChevronLeft size={18} />
                  </button>
                  <button className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={moodData.slice(-14)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" domain={[0, 10]} />
                    <Tooltip />
                    <Legend />
                    {activeTab === 'mood' && (
                      <Line 
                        type="monotone" 
                        dataKey="mood" 
                        name="Mood" 
                        stroke="#4A90E2" 
                        strokeWidth={3} 
                        dot={{ stroke: '#4A90E2', strokeWidth: 2, r: 5 }}
                        activeDot={{ r: 8 }}
                      />
                    )}
                    {activeTab === 'sleep' && (
                      <Line 
                        type="monotone" 
                        dataKey="sleep" 
                        name="Sleep Quality" 
                        stroke="#B19CD9" 
                        strokeWidth={3} 
                        dot={{ stroke: '#B19CD9', strokeWidth: 2, r: 5 }}
                        activeDot={{ r: 8 }}
                      />
                    )}
                    {activeTab === 'energy' && (
                      <Line 
                        type="monotone" 
                        dataKey="energy" 
                        name="Energy Level" 
                        stroke="#50C878" 
                        strokeWidth={3} 
                        dot={{ stroke: '#50C878', strokeWidth: 2, r: 5 }}
                        activeDot={{ r: 8 }}
                      />
                    )}
                    {activeTab === 'anxiety' && (
                      <Line 
                        type="monotone" 
                        dataKey="anxiety" 
                        name="Anxiety Level" 
                        stroke="#F59E0B" 
                        strokeWidth={3} 
                        dot={{ stroke: '#F59E0B', strokeWidth: 2, r: 5 }}
                        activeDot={{ r: 8 }}
                      />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Mood Form Modal */}
      {showMoodForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div 
            className="bg-white rounded-xl shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Record Today's Wellbeing</h2>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setShowMoodForm(false)}
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mood Slider */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How are you feeling today?
                  </label>
                  <div className="flex items-center space-x-4">
                    <Frown size={24} className="text-error-500" />
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={moodValue}
                      onChange={(e) => setMoodValue(parseInt(e.target.value))}
                      className="flex-grow h-2 rounded-lg appearance-none bg-gray-200"
                      style={{
                        background: `linear-gradient(to right, ${getMoodColor(moodValue)} 0%, ${getMoodColor(moodValue)} ${(moodValue/10)*100}%, #E5E7EB ${(moodValue/10)*100}%, #E5E7EB 100%)`,
                      }}
                    />
                    <Smile size={24} className="text-secondary-500" />
                    <span className="w-8 text-center font-medium">{moodValue}</span>
                  </div>
                </div>

                {/* Sleep Quality */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sleep quality last night
                  </label>
                  <div className="flex items-center space-x-4">
                    <Moon size={24} className="text-gray-400" />
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={sleepValue}
                      onChange={(e) => setSleepValue(parseInt(e.target.value))}
                      className="flex-grow h-2 rounded-lg appearance-none bg-gray-200"
                      style={{
                        background: `linear-gradient(to right, #B19CD9 0%, #B19CD9 ${(sleepValue/10)*100}%, #E5E7EB ${(sleepValue/10)*100}%, #E5E7EB 100%)`,
                      }}
                    />
                    <Moon size={24} className="text-accent-500" />
                    <span className="w-8 text-center font-medium">{sleepValue}</span>
                  </div>
                </div>

                {/* Energy Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Energy level
                  </label>
                  <div className="flex items-center space-x-4">
                    <Zap size={24} className="text-gray-400" />
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={energyValue}
                      onChange={(e) => setEnergyValue(parseInt(e.target.value))}
                      className="flex-grow h-2 rounded-lg appearance-none bg-gray-200"
                      style={{
                        background: `linear-gradient(to right, #50C878 0%, #50C878 ${(energyValue/10)*100}%, #E5E7EB ${(energyValue/10)*100}%, #E5E7EB 100%)`,
                      }}
                    />
                    <Zap size={24} className="text-secondary-500" />
                    <span className="w-8 text-center font-medium">{energyValue}</span>
                  </div>
                </div>

                {/* Anxiety Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Anxiety level
                  </label>
                  <div className="flex items-center space-x-4">
                    <CloudRain size={24} className="text-gray-400" />
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={anxietyValue}
                      onChange={(e) => setAnxietyValue(parseInt(e.target.value))}
                      className="flex-grow h-2 rounded-lg appearance-none bg-gray-200"
                      style={{
                        background: `linear-gradient(to right, #F59E0B 0%, #F59E0B ${(anxietyValue/10)*100}%, #E5E7EB ${(anxietyValue/10)*100}%, #E5E7EB 100%)`,
                      }}
                    />
                    <CloudRain size={24} className="text-warning-500" />
                    <span className="w-8 text-center font-medium">{anxietyValue}</span>
                  </div>
                </div>

                {/* Social Interaction */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Social interaction quality
                  </label>
                  <div className="flex items-center space-x-4">
                    <User size={24} className="text-gray-400" />
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={socialValue}
                      onChange={(e) => setSocialValue(parseInt(e.target.value))}
                      className="flex-grow h-2 rounded-lg appearance-none bg-gray-200"
                      style={{
                        background: `linear-gradient(to right, #4A90E2 0%, #4A90E2 ${(socialValue/10)*100}%, #E5E7EB ${(socialValue/10)*100}%, #E5E7EB 100%)`,
                      }}
                    />
                    <User size={24} className="text-primary-500" />
                    <span className="w-8 text-center font-medium">{socialValue}</span>
                  </div>
                </div>

                {/* Exercise */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Physical activity level
                  </label>
                  <div className="flex items-center space-x-4">
                    <Activity size={24} className="text-gray-400" />
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={exerciseValue}
                      onChange={(e) => setExerciseValue(parseInt(e.target.value))}
                      className="flex-grow h-2 rounded-lg appearance-none bg-gray-200"
                      style={{
                        background: `linear-gradient(to right, #50C878 0%, #50C878 ${(exerciseValue/10)*100}%, #E5E7EB ${(exerciseValue/10)*100}%, #E5E7EB 100%)`,
                      }}
                    />
                    <Activity size={24} className="text-secondary-500" />
                    <span className="w-8 text-center font-medium">{exerciseValue}</span>
                  </div>
                </div>
              </div>

              {/* Activities */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Activities today (select all that apply)
                </label>
                <div className="flex flex-wrap gap-2">
                  {activityOptions.map((activity) => (
                    <button
                      key={activity}
                      type="button"
                      onClick={() => toggleActivity(activity)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        activities.includes(activity)
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {activity}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes (optional)
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="How was your day? Any significant events or feelings?"
                  className="input"
                ></textarea>
              </div>
              
              <div className="mt-8 flex justify-end space-x-3">
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => setShowMoodForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary flex items-center"
                >
                  <Save size={18} className="mr-1" />
                  Save Entry
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MoodTrackerPage;