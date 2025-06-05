import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, AlertCircle, Check, ArrowRight, ArrowLeft, ChevronDown, ChevronUp, Music, Palette, Wind, Cog as Yoga, Activity } from 'lucide-react';
import { 
  AssessmentQuestion, 
  AssessmentType,
  AgeGroup,
  AssessmentResult,
  ageGroups,
  getAgeSpecificQuestions,
  interpretDepressionResult,
  interpretAnxietyResult
} from '../models/assessmentTypes';
import ExerciseGallery from '../components/ExerciseGallery';

const AssessmentPage: React.FC = () => {
  // ... (previous state and helper functions remain the same)

  const renderResults = () => {
    if (!result || !selectedAgeGroup) return null;

    const getTherapyIcon = (type: string) => {
      switch (type) {
        case 'color':
          return <Palette size={24} />;
        case 'music':
          return <Music size={24} />;
        case 'breathing':
          return <Wind size={24} />;
        case 'yoga':
          return <Yoga size={24} />;
        case 'exercise':
          return <Activity size={24} />;
        default:
          return <Check size={24} />;
      }
    };

    return (
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">Your Assessment Results</h2>
          <p className="text-gray-600">
            Based on your responses, we've generated personalized insights and recommendations.
          </p>
        </div>

        <div className="card mb-8">
          <div className="flex flex-col md:flex-row items-center mb-6 p-4 rounded-lg" style={{ backgroundColor: `${result.color}15` }}>
            <div className="md:mr-6 mb-4 md:mb-0">
              <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ backgroundColor: result.color }}>
                <span className="text-2xl font-bold text-white">{result.score}</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                {activeAssessment === 'depression' ? 'Depression' : 'Anxiety'} Severity: {result.severity.charAt(0).toUpperCase() + result.severity.slice(1)}
              </h3>
              <p className="text-gray-700">
                {result.interpretation}
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 mt-6">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection('recommendations')}
            >
              <h3 className="text-xl font-semibold">Personalized Recommendations</h3>
              {expandedSection === 'recommendations' ? (
                <ChevronUp size={20} className="text-gray-500" />
              ) : (
                <ChevronDown size={20} className="text-gray-500" />
              )}
            </div>
            
            {expandedSection === 'recommendations' && (
              <div className="mt-6 space-y-6">
                {result.recommendations.map((recommendation, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <div className="flex items-start mb-4">
                      <div className="p-2 rounded-full bg-white border border-gray-200 mr-3">
                        {getTherapyIcon(recommendation.type)}
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">{recommendation.title}</h4>
                        <p className="text-gray-600">{recommendation.description}</p>
                      </div>
                    </div>

                    {recommendation.type === 'exercise' && recommendation.exercises && (
                      <div className="mt-4">
                        <ExerciseGallery exercises={recommendation.exercises} />
                      </div>
                    )}

                    {recommendation.imageUrl && recommendation.type !== 'exercise' && (
                      <img 
                        src={recommendation.imageUrl} 
                        alt={recommendation.title}
                        className="w-full h-32 object-cover rounded-lg mt-3"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Next Steps Section */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection('nextSteps')}
            >
              <h3 className="text-xl font-semibold">Next Steps</h3>
              {expandedSection === 'nextSteps' ? (
                <ChevronUp size={20} className="text-gray-500" />
              ) : (
                <ChevronDown size={20} className="text-gray-500" />
              )}
            </div>
            
            {expandedSection === 'nextSteps' && (
              <div className="mt-4 space-y-4">
                <p className="text-gray-700">
                  Consider discussing these results with a healthcare provider. Here are some ways you can move forward:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="p-1 rounded-full bg-primary-100 text-primary-600 mr-3 mt-0.5">
                      <Check size={16} />
                    </div>
                    <p className="text-gray-700">Use our Find Help feature to locate mental health professionals near you</p>
                  </li>
                  <li className="flex items-start">
                    <div className="p-1 rounded-full bg-primary-100 text-primary-600 mr-3 mt-0.5">
                      <Check size={16} />
                    </div>
                    <p className="text-gray-700">Start tracking your mood daily to monitor patterns</p>
                  </li>
                  <li className="flex items-start">
                    <div className="p-1 rounded-full bg-primary-100 text-primary-600 mr-3 mt-0.5">
                      <Check size={16} />
                    </div>
                    <p className="text-gray-700">Try the recommended therapeutic activities</p>
                  </li>
                  <li className="flex items-start">
                    <div className="p-1 rounded-full bg-primary-100 text-primary-600 mr-3 mt-0.5">
                      <Check size={16} />
                    </div>
                    <p className="text-gray-700">Take another assessment in 2-4 weeks to track changes</p>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Disclaimer Section */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection('disclaimer')}
            >
              <h3 className="text-xl font-semibold">Important Disclaimer</h3>
              {expandedSection === 'disclaimer' ? (
                <ChevronUp size={20} className="text-gray-500" />
              ) : (
                <ChevronDown size={20} className="text-gray-500" />
              )}
            </div>
            
            {expandedSection === 'disclaimer' && (
              <div className="mt-4">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-700 text-sm">
                    This assessment is for screening purposes only and is not a diagnostic tool. Results do not 
                    represent a clinical diagnosis. If you're experiencing severe symptoms or have thoughts of 
                    harming yourself, please contact a mental health professional immediately or call the 
                    National Suicide Prevention Lifeline at 988.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button onClick={restartAssessment} className="btn-outline">
            Take Another Assessment
          </button>
          <button onClick={() => {}} className="btn-primary">
            Save Results
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {activeAssessment === null && renderAssessmentSelection()}
      {activeAssessment !== null && currentStep === 0 && renderAgeGroupSelection()}
      {activeAssessment !== null && currentStep > 0 && result === null && renderAssessmentQuestions()}
      {result !== null && renderResults()}
    </div>
  );
};

export default AssessmentPage;
