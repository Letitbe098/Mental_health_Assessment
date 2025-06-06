// AssessmentPage.tsx

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  getAgeSpecificQuestions,
  interpretDepressionResult,
  interpretAnxietyResult,
  AssessmentType,
  AgeGroup,
  AssessmentQuestion,
  AssessmentResult,
} from '../models/assessmentTypes';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Lightbulb,
  BarChart3,
  Shield,
  Activity
} from 'lucide-react';

// Enhanced icon helper
const getTherapyIcon = (type: string) => {
  switch (type) {
    case 'music': return '🎵';
    case 'breathing': return '🫁';
    case 'yoga': return '🧘‍♂️';
    case 'journaling': return '📓';
    case 'meditation': return '🧘‍♀️';
    case 'exercise': return '🏃‍♂️';
    case 'story': return '📖';
    case 'mindfulness': return '🧠';
    case 'therapy': return '💬';
    case 'crisis': return '🆘';
    case 'support': return '🤝';
    case 'social': return '👥';
    case 'lifestyle': return '🌱';
    case 'safety': return '🛡️';
    default: return '💡';
  }
};

const AssessmentPage: React.FC = () => {
  const [assessmentType, setAssessmentType] = useState<AssessmentType>('depression');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('adult');
  const [answers, setAnswers] = useState<{ [id: string]: number }>({});
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showProgress, setShowProgress] = useState(true);

  const questions: AssessmentQuestion[] = getAgeSpecificQuestions(assessmentType, ageGroup);

  useEffect(() => {
    // Reset when assessment type or age group changes
    setAnswers({});
    setResult(null);
    setCurrentQuestionIndex(0);
  }, [assessmentType, ageGroup]);

  const handleAnswer = (id: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    
    // Auto-advance to next question
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 300);
    }
  };

  const handleSubmit = async () => {
    setIsAnalyzing(true);
    
    try {
      const answerArray = questions.map(q => answers[q.id] || 0);
      const score = answerArray.reduce((sum, answer) => sum + answer, 0);
      
      // Simulate ML processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      let res: AssessmentResult;
      if (assessmentType === 'depression') {
        res = await interpretDepressionResult(score, ageGroup, answerArray);
      } else {
        res = await interpretAnxietyResult(score, ageGroup, answerArray);
      }
      
      setResult(res);
    } catch (error) {
      console.error('Error processing assessment:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setResult(null);
    setCurrentQuestionIndex(0);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestion Index(prev => prev - 1);
    }
  };

  const progress = ((Object.keys(answers).length) / questions.length) * 100;
  const isComplete = Object.keys(answers).length === questions.length;

  if (isAnalyzing) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Brain size={32} className="text-primary-600" />
          </motion.div>
          <h2 className="text-2xl font-bold mb-2 text-primary-700">Analyzing Your Responses</h2>
          <p className="text-gray-600 mb-6">
            Our AI is processing your assessment using advanced machine learning algorithms...
          </p>
          <div className="space-y-3">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
              <span>Analyzing response patterns</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse delay-75"></div>
              <span>Generating personalized insights</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse delay-150"></div>
              <span>Creating recommendations</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      {!result ? (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-6">
            <h1 className="text-3xl font-bold mb-2">AI-Powered Mental Health Assessment</h1>
            <p className="opacity-90">
              Get personalized insights powered by machine learning technology
            </p>
          </div>

          {/* Assessment Configuration */}
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assessment Type
                </label>
                <select
                  value={assessmentType}
                  onChange={(e) => setAssessmentType(e.target.value as AssessmentType)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="depression">Depression Screening (PHQ-9 Style)</option>
                  <option value="anxiety">Anxiety Assessment (GAD-7 Style)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age Group
                </label>
                <select
                  value={ageGroup}
                  onChange={(e) => setAgeGroup(e.target.value as AgeGroup)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="child">Child (5-12 years)</option>
                  <option value="teen">Teen (13-17 years)</option>
                  <option value="adult">Adult (18-64 years)</option>
                  <option value="senior">Senior (65+ years)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          {showProgress && (
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm text-gray-500">
                  {Object.keys(answers).length} of {questions.length} questions
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-primary-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}

          {/* Questions */}
          <div className="p-6">
            <div className="space-y-6">
              {questions.map((question, index) => (
                <motion.div
                  key={question.id}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    index === currentQuestionIndex
                      ? 'border-primary-300 bg-primary-50'
                      : answers[question.id] !== undefined
                      ? 'border-green-300 bg-green-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                  initial={{ opacity: 0.5, scale: 0.95 }}
                  animate={{ 
                    opacity: index <= currentQuestionIndex ? 1 : 0.5,
                    scale: index === currentQuestionIndex ? 1 : 0.95
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {index + 1}. {question.text}
                    </h3>
                    {answers[question.id] !== undefined && (
                      <CheckCircle size={20} className="text-green-500 flex-shrink-0 ml-2" />
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {question.options.map((option) => (
                      <motion.button
                        key={option.value}
                        onClick={() => handleAnswer(question.id, option.value)}
                        className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                          answers[question.id] === option.value
                            ? 'border-primary-500 bg-primary-500 text-white'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-primary-300 hover:bg-primary-50'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={index > currentQuestionIndex}
                      >
                        {option.label}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>
              
              {isComplete && (
                <motion.button
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Brain size={20} className="mr-2" />
                  Analyze with AI
                </motion.button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Results Display */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Main Result Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div 
              className="p-6 text-white"
              style={{ backgroundColor: result.color }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Assessment Results</h2>
                  <p className="text-lg opacity-90">
                    Score: {result.score} | Severity: {result.severity.charAt(0).toUpperCase() + result.severity.slice(1)}
                  </p>
                </div>
                <div className="text-right">
                  <BarChart3 size={48} className="opacity-80" />
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-700 text-lg leading-relaxed">
                {result.interpretation}
              </p>
            </div>
          </div>

          {/* ML Insights */}
          {result.mlPrediction && (
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 border border-primary-100">
              <div className="flex items-center mb-4">
                <Brain size={24} className="text-primary-600 mr-2" />
                <h3 className="text-xl font-semibold">AI-Generated Insights</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Target size={20} className="text-primary-600 mr-2" />
                    <span className="font-medium">Risk Assessment</span>
                  </div>
                  <div className="text-2xl font-bold text-primary-600">
                    {(result.mlPrediction.riskLevel * 100).toFixed(0)}%
                  </div>
                  <div className="text-sm text-gray-600">
                    Confidence: {(result.mlPrediction.confidence * 100).toFixed(0)}%
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <TrendingUp size={20} className="text-secondary-600 mr-2" />
                    <span className="font-medium">Pattern Analysis</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Based on your response patterns and demographic factors
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Activity size={20} className="text-accent-600 mr-2" />
                    <span className="font-medium">Personalization</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Tailored for {ageGroup} {assessmentType} assessment
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800">Personalized Insights:</h4>
                {result.mlPrediction.personalizedInsights.map((insight, index) => (
                  <div key={index} className="flex items-start bg-white rounded-lg p-3">
                    <Lightbulb size={16} className="text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{insight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Risk and Protective Factors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {result.riskFactors.length > 0 && (
              <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                <div className="flex items-center mb-4">
                  <AlertTriangle size={24} className="text-red-600 mr-2" />
                  <h3 className="text-lg font-semibold text-red-800">Risk Factors Identified</h3>
                </div>
                <ul className="space-y-2">
                  {result.riskFactors.map((factor, index) => (
                    <li key={index} className="flex items-center text-red-700">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.protectiveFactors.length > 0 && (
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <div className="flex items-center mb-4">
                  <Shield size={24} className="text-green-600 mr-2" />
                  <h3 className="text-lg font-semibold text-green-800">Protective Factors</h3>
                </div>
                <ul className="space-y-2">
                  {result.protectiveFactors.map((factor, index) => (
                    <li key={index} className="flex items-center text-green-700">
                      <CheckCircle size={16} className="text-green-500 mr-3" />
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-6 text-primary-700 flex items-center">
              <Lightbulb size={24} className="mr-2" />
              Personalized Recommendations
            </h3>
            
            <div className="grid gap-6">
              {result.recommendations.map((rec, index) => (
                <motion.div 
                  key={index} 
                  className="bg-gray-50 rounded-lg p-6 border border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start">
                    <div className="p-3 rounded-full bg-white border border-gray-200 mr-4 text-3xl">
                      {getTherapyIcon(rec.type)}
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-semibold text-lg mb-2">{rec.title}</h4>
                      <p className="text-gray-600 mb-3">{rec.description}</p>
                      {rec.duration && (
                        <p className="text-sm text-primary-600 mb-3">
                          Duration: {rec.duration}
                        </p>
                      )}
                      {rec.videoUrl && (
                        <div className="mt-4">
                          <iframe
                            width="100%"
                            height="200"
                            src={rec.videoUrl}
                            title={rec.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="rounded-lg"
                          ></iframe>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRestart}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Take Another Assessment
            </button>
            <button
              onClick={() => window.open('/mood-tracker', '_blank')}
              className="px-6 py-3 bg-secondary-600 text-white rounded-lg font-semibold hover:bg-secondary-700 transition-colors"
            >
              Track Your Mood
            </button>
            <button
              onClick={() => window.open('/find-help', '_blank')}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Find Professional Help
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AssessmentPage;