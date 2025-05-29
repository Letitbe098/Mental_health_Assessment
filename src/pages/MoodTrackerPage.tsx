import React, { useState } from 'react';
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
  Save
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

// Mock data
const generateMockData = () => {
  const today = new Date();
  const days = eachDayOfInterval({
    start: subDays(today, 14),
    end: today
  });

  return days.map(day => {
    const formattedDay = format(day, 'MMM dd');
    return {
      date: formattedDay,
      mood: Math.floor(Math.random() * 5) + 5,
      energy: Math.floor(Math.random() * 4) + 4,
      sleep: Math.floor(Math.random() * 4) + 5,
      anxiety: Math.floor(Math.random() * 7) + 2,
    };
  });
};

const moodData = generateMockData();

const MoodTrackerPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('mood');
  const [showMoodForm, setShowMoodForm] = useState(false);
  const [moodValue, setMoodValue] = useState(7);
  const [energyValue, setEnergyValue] = useState(6);
  const [sleepValue, setSleepValue] = useState(7);
  const [anxietyValue, setAnxietyValue] = useState(4);
  const [notes, setNotes] = useState('');
  
  const tabs = [
    { id: 'mood', label: 'Mood', icon: <Smile size={20} /> },
    { id: 'sleep', label: 'Sleep', icon: <Moon size={20} /> },
    { id: 'energy', label: 'Energy', icon: <Zap size={20} /> },
    { id: 'anxiety', label: 'Anxiety', icon: <CloudRain size={20} /> },
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to a database
    console.log({
      date: new Date(),
      mood: moodValue,
      energy: energyValue,
      sleep: sleepValue,
      anxiety: anxietyValue,
      notes
    });
    
    setShowMoodForm(false);
    // Would update the chart data here in a real app
  };
  
  const getMoodIcon = (value: number) => {
    if (value >= 8) return <Smile className="text-secondary-500" />;
    if (value >= 5) return <Meh className="text-warning-500" />;
    return <Frown className="text-error-500" />;
  };
  
  const getMoodColor = (value: number) => {
    if (value >= 8) return '#50C878'; // secondary-500
    if (value >= 5) return '#F59E0B'; // warning-500
    return '#EF4444'; // error-500
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Mood Tracker</h1>
          <p className="text-gray-600">
            Track your mood, sleep, energy levels, and anxiety over time
          </p>
        </div>
        <button 
          className="mt-4 sm:mt-0 btn-primary flex items-center"
          onClick={() => setShowMoodForm(true)}
        >
          <Plus size={18} className="mr-1" /> Record Today
        </button>
      </div>
      
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
        
        {/* Chart */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-semibold">
                {tabs.find(tab => tab.id === activeTab)?.label} History
              </h2>
              <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                Last 14 days
              </span>
            </div>
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
              <LineChart data={moodData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  stroke="#9CA3AF"
                  tickMargin={10}
                />
                <YAxis 
                  stroke="#9CA3AF" 
                  domain={[0, 10]}
                  tickCount={6}
                />
                <Tooltip />
                <Legend />
                {activeTab === 'mood' && (
                  <Line 
                    type="monotone" 
                    dataKey="mood" 
                    name="Mood" 
                    stroke="#4A90E2" 
                    strokeWidth={2} 
                    dot={{ stroke: '#4A90E2', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                )}
                {activeTab === 'sleep' && (
                  <Line 
                    type="monotone" 
                    dataKey="sleep" 
                    name="Sleep Quality" 
                    stroke="#B19CD9" 
                    strokeWidth={2} 
                    dot={{ stroke: '#B19CD9', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                )}
                {activeTab === 'energy' && (
                  <Line 
                    type="monotone" 
                    dataKey="energy" 
                    name="Energy Level" 
                    stroke="#50C878" 
                    strokeWidth={2} 
                    dot={{ stroke: '#50C878', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                )}
                {activeTab === 'anxiety' && (
                  <Line 
                    type="monotone" 
                    dataKey="anxiety" 
                    name="Anxiety Level" 
                    stroke="#F59E0B" 
                    strokeWidth={2} 
                    dot={{ stroke: '#F59E0B', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Recent Entries */}
      <div className="bg-white rounded-xl shadow-soft">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Recent Entries</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mood
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sleep
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Energy
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Anxiety
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {moodData.slice(-5).reverse().map((entry, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar size={16} className="text-gray-400 mr-2" />
                      {entry.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getMoodIcon(entry.mood)}
                      <span className="ml-2">{entry.mood}/10</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Moon size={16} className="text-accent-500" />
                      <span className="ml-2">{entry.sleep}/10</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Zap size={16} className="text-secondary-500" />
                      <span className="ml-2">{entry.energy}/10</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <CloudRain size={16} className="text-warning-500" />
                      <span className="ml-2">{entry.anxiety}/10</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {index === 0 ? 'Felt stressed about work deadline' : index === 1 ? 'Had a good day overall' : 'No notes'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Mood Form Modal */}
      {showMoodForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div 
            className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
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
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-6">
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
                
                {/* Sleep Quality Slider */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How well did you sleep?
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
                
                {/* Energy Level Slider */}
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
                
                {/* Anxiety Level Slider */}
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
                
                {/* Notes */}
                <div>
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