import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, AlertCircle, Check, ArrowRight, ArrowLeft, ChevronDown, ChevronUp, Music, Palette, Wind, Yoga } from 'lucide-react';
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
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
              whileHover={{ scale: 1.02 }}
              onClick={() => startAssessment(assessment.id as AssessmentType)}
            >
              <div className="flex items-start">
                <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
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
                <button className="flex items-center text-indigo-600 font-medium">
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
              <Check size={18} className="text-emerald-500 mr-2 mt-1" />
              <span>Age-appropriate questions for children, teens, adults, and seniors.</span>
            </li>
            <li className="flex items-start">
              <Check size={18} className="text-emerald-500 mr-2 mt-1" />
              <span>Personalized recommendations including color therapy, music, and exercises.</span>
            </li>
            <li className="flex items-start">
              <Check size={18} className="text-emerald-500 mr-2 mt-1" />
              <span>Your data is kept private and secure, and you can delete it at any time.</span>
            </li>
            <li className="flex items-start">
              <Check size={18} className="text-emerald-500 mr-2 mt-1" />
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
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50'
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
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center"
          >
            <ArrowLeft size={18} className="mr-1" /> Back
          </button>
          <button
            onClick={nextStep}
            disabled={!selectedAgeGroup}
            className={`px-4 py-2 rounded-md bg-indigo-600 text-white flex items-center ${
              !selectedAgeGroup ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'
            }`}
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
            <motion.div 
              className="h-full bg-indigo-500"
              initial={{ width: `${(currentStep - 1) / questions.length * 100}%` }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            ></motion.div>
          </div>
        </div>

        <motion.div 
          className="bg-white p-6 rounded-lg shadow-md mb-8"
          key={currentQuestion.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-xl font-medium mb-6">
            {currentQuestion.text}
          </h3>

          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <motion.button
                key={option.id}
                className={`w-full p-4 rounded-lg border text-left transition-all ${
                  answers[currentQuestion.id] === option.value
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50'
                }`}
                onClick={() => handleAnswer(currentQuestion.id, option.value)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                    answers[currentQuestion.id] === option.value
                      ? 'border-indigo-500 bg-indigo-500'
                      : 'border-gray-300'
                  }`}>
                    {answers[currentQuestion.id] === option.value && (
                      <Check size={12} className="text-white" />
                    )}
                  </div>
                  <span>{option.text}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="flex justify-between">
          <button
            onClick={prevStep}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center"
          >
            <ArrowLeft size={18} className="mr-1" /> Back
          </button>
          <button
            onClick={nextStep}
            disabled={answers[currentQuestion.id] === undefined}
            className={`px-4 py-2 rounded-md bg-indigo-600 text-white flex items-center ${
              answers[currentQuestion.id] === undefined ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'
            }`}
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
          return <Palette size={24} className="text-indigo-600" />;
        case 'music':
          return <Music size={24} className="text-indigo-600" />;
        case 'breathing':
          return <Wind size={24} className="text-indigo-600" />;
        case 'yoga':
        case 'exercise':
          return <Yoga size={24} className="text-indigo-600" />;
        default:
          return <Check size={24} className="text-indigo-600" />;
      }
    };

    return (
      <motion.div 
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">Your Assessment Results</h2>
          <p className="text-gray-600">
            Based on your responses, we've generated personalized insights and recommendations.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <motion.div 
            className="flex flex-col md:flex-row items-center mb-6 p-4 rounded-lg" 
            style={{ backgroundColor: `${result.color}15` }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
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
          </motion.div>

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
              <motion.div 
                className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {result.recommendations.map((recommendation, index) => (
                  <motion.div 
                    key={index} 
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-start">
                      <div className="p-2 rounded-full bg-white border border-gray-200 mr-3">
                        {getTherapyIcon(recommendation.type)}
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">{recommendation.title}</h4>
                        <p className="text-gray-600 text-sm mb-2">{recommendation.description}</p>
                        {recommendation.duration && (
                          <p className="text-sm text-indigo-600">
                            Recommended duration: {recommendation.duration}
                          </p>
                        )}
                        {recommendation.videoUrl && (
                          <a 
                            href={recommendation.videoUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center mt-2"
                          >
                            Watch video guide <ArrowRight size={14} className="ml-1" />
                          </a>
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
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

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
              <motion.div 
                className="mt-4 space-y-4"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-gray-700">
                  Consider discussing these results with a healthcare provider. Here are some ways you can move forward:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="p-1 rounded-full bg-indigo-100 text-indigo-600 mr-3 mt-0.5">
                      <Check size={16} />
                    </div>
                    <p className="text-gray-700">Use our Find Help feature to locate mental health professionals near you</p>
                  </li>
                  <li className="flex items-start">
                    <div className="p-1 rounded-full bg-indigo-100 text-indigo-600 mr-3 mt-0.5">
                      <Check size={16} />
                    </div>
                    <p className="text-gray-700">Start tracking your mood daily to monitor patterns</p>
                  </li>
                  <li className="flex items-start">
                    <div className="p-1 rounded-full bg-indigo-100 text-indigo-600 mr-3 mt-0.5">
                      <Check size={16} />
                    </div>
                    <p className="text-gray-700">Try the recommended therapeutic activities</p>
                  </li>
                  <li className="flex items-start">
                    <div className="p-1 rounded-full bg-indigo-100 text-indigo-600 mr-3 mt-0.5">
                      <Check size={16} />
                    </div>
                    <p className="text-gray-700">Take another assessment in 2-4 weeks to track changes</p>
                  </li>
                </ul>
              </motion.div>
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
              <motion.div 
                className="mt-4"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-700 text-sm">
                    This assessment is for screening purposes only and is not a diagnostic tool. Results do not 
                    represent a clinical diagnosis. If you're experiencing severe symptoms or have thoughts of 
                    harming yourself, please contact a mental health professional immediately or call the 
                    National Suicide Prevention Lifeline at 988.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={restartAssessment} 
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Take Another Assessment
          </button>
          <button 
            onClick={() => {}} 
            className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Save Results
          </button>
        </div>
      </motion.div>
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
