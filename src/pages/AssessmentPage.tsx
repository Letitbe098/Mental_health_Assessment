import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, AlertCircle, Check, ArrowRight, ArrowLeft, ChevronDown, ChevronUp, Music, Palette, Wind, Cog as Yoga } from 'lucide-react';
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

const AssessmentPage: React.FC = () => {
  const [activeAssessment, setActiveAssessment] = useState<AssessmentType | null>(null);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const assessmentTypes = [
    {
      id: 'depression',
      title: 'Depression Assessment',
      description: 'PHQ-9 depression screening questionnaire',
      icon: <Brain size={24} />,
      questions: (ageGroup: AgeGroup) => getAgeSpecificQuestions('depression', ageGroup),
      interpretResult: interpretDepressionResult,
    },
    {
      id: 'anxiety',
      title: 'Anxiety Assessment',
      description: 'GAD-7 anxiety screening questionnaire',
      icon: <AlertCircle size={24} />,
      questions: (ageGroup: AgeGroup) => getAgeSpecificQuestions('anxiety', ageGroup),
      interpretResult: interpretAnxietyResult,
    },
  ];

  const startAssessment = (type: AssessmentType) => {
    setActiveAssessment(type);
    setSelectedAgeGroup(null);
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
  };

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const nextStep = () => {
    if (!selectedAgeGroup) {
      setCurrentStep(1);
      return;
    }

    const assessment = assessmentTypes.find(a => a.id === activeAssessment);
    if (!assessment) return;

    const questions = assessment.questions(selectedAgeGroup);

    if (currentStep < questions.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Calculate result
      const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0);
      const result = assessment.interpretResult(totalScore, selectedAgeGroup);
      setResult(result);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else if (currentStep === 1) {
      setSelectedAgeGroup(null);
      setCurrentStep(0);
    } else {
      setActiveAssessment(null);
    }
  };

  const restartAssessment = () => {
    setActiveAssessment(null);
    setSelectedAgeGroup(null);
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const renderAssessmentSelection = () => {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Mental Health Assessments</h1>
          <p className="text-lg text-gray-600 mb-6">
            Our scientifically validated assessments can help you understand your mental wellbeing.
          </p>
          <div className="bg-primary-50 border border-primary-100 rounded-lg p-4 text-primary-800 inline-block">
            <div className="flex items-start">
              <AlertCircle size={20} className="text-primary-500 mr-2 mt-0.5" />
              <div className="text-left">
                <p className="font-medium">Important Note</p>
                <p className="text-sm">
                  These assessments are screening tools, not diagnostic instruments. Results should be 
                  discussed with a healthcare professional.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assessmentTypes.map((assessment) => (
            <motion.div
              key={assessment.id}
              className="card hover:shadow-medium cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={() => startAssessment(assessment.id as AssessmentType)}
            >
              <div className="flex items-start">
                <div className="p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
                  {assessment.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{assessment.title}</h3>
                  <p className="text-gray-600 mb-3">{assessment.description}</p>
                  <p className="text-sm text-gray-500">
                    Age-appropriate questions • ~5 minutes
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                <button className="flex items-center text-primary-600 font-medium">
                  Start assessment <ArrowRight size={18} className="ml-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">About Our Assessments</h3>
          <p className="text-gray-600 mb-4">
            Our assessments are based on clinically validated screening tools, adapted for different age groups:
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <Check size={18} className="text-secondary-500 mr-2 mt-1" />
              <span>Age-appropriate questions for children, teens, adults, and seniors.</span>
            </li>
            <li className="flex items-start">
              <Check size={18} className="text-secondary-500 mr-2 mt-1" />
              <span>Personalized recommendations including color therapy, music, and exercises.</span>
            </li>
            <li className="flex items-start">
              <Check size={18} className="text-secondary-500 mr-2 mt-1" />
              <span>Your data is kept private and secure, and you can delete it at any time.</span>
            </li>
            <li className="flex items-start">
              <Check size={18} className="text-secondary-500 mr-2 mt-1" />
              <span>Results are provided instantly with age-appropriate guidance.</span>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  const renderAgeGroupSelection = () => {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Select Your Age Group</h2>
          <p className="text-gray-600">
            We'll provide age-appropriate questions and recommendations based on your selection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ageGroups.map((group) => (
            <motion.button
              key={group.id}
              className={`p-4 rounded-lg border text-left transition-all ${
                selectedAgeGroup === group.id
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 hover:border-primary-300 hover:bg-primary-50/50'
              }`}
              onClick={() => setSelectedAgeGroup(group.id as AgeGroup)}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="font-semibold mb-1">{group.label}</h3>
              <p className="text-sm text-gray-600">{group.description}</p>
            </motion.button>
          ))}
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={prevStep}
            className="btn-outline flex items-center"
          >
            <ArrowLeft size={18} className="mr-1" /> Back
          </button>
          <button
            onClick={nextStep}
            disabled={!selectedAgeGroup}
            className="btn-primary flex items-center"
          >
            Continue <ArrowRight size={18} className="ml-1" />
          </button>
        </div>
      </div>
    );
  };

  const renderAssessmentQuestions = () => {
    if (!selectedAgeGroup) return null;

    const assessment = assessmentTypes.find(a => a.id === activeAssessment);
    if (!assessment) return null;

    const questions = assessment.questions(selectedAgeGroup);
    const currentQuestion = questions[currentStep - 1];
    const progress = (currentStep / questions.length) * 100;

    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold">{assessment.title}</h2>
            <span className="text-sm text-gray-500">
              Question {currentStep} of {questions.length}
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="card mb-8">
          <h3 className="text-xl font-medium mb-6">
            {currentQuestion.text}
          </h3>

          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <button
                key={option.id}
                className={`w-full p-4 rounded-lg border text-left transition-all ${
                  answers[currentQuestion.id] === option.value
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-primary-300 hover:bg-primary-50/50'
                }`}
                onClick={() => handleAnswer(currentQuestion.id, option.value)}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                    answers[currentQuestion.id] === option.value
                      ? 'border-primary-500 bg-primary-500'
                      : 'border-gray-300'
                  }`}>
                    {answers[currentQuestion.id] === option.value && (
                      <Check size={12} className="text-white" />
                    )}
                  </div>
                  <span>{option.text}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={prevStep}
            className="btn-outline flex items-center"
          >
            <ArrowLeft size={18} className="mr-1" /> Back
          </button>
          <button
            onClick={nextStep}
            disabled={answers[currentQuestion.id] === undefined}
            className="btn-primary flex items-center"
          >
            {currentStep < questions.length ? (
              <>Next <ArrowRight size={18} className="ml-1" /></>
            ) : (
              <>View Results <ArrowRight size={18} className="ml-1" /></>
            )}
          </button>
        </div>
      </div>
    );
  };

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

          {/* Therapeutic Recommendations */}
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
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.recommendations.map((recommendation, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-start">
                      <div className="p-2 rounded-full bg-white border border-gray-200 mr-3">
                        {getTherapyIcon(recommendation.type)}
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">{recommendation.title}</h4>
                        <p className="text-gray-600 text-sm mb-2">{recommendation.description}</p>
                        {recommendation.duration && (
                          <p className="text-sm text-primary-600">
                            Recommended duration: {recommendation.duration}
                          </p>
                        )}
                      </div>
                    </div>
                    {recommendation.imageUrl && (
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

          <div className="border-t border-gray-200 pt-6 mt-6">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection('nextSteps')}
            >
              <h3 className="text-xl font-semibol

d">Next Steps</h3>
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
