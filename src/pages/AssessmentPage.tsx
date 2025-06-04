// File: src/pages/AssessmentPage.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, AlertCircle, Check, ArrowRight, ArrowLeft, ChevronDown, ChevronUp, Music, Palette, Wind, Cog as Yoga, Dumbbell } from 'lucide-react';

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
    setAnswers(prev => ({ ...prev, [questionId]: value }));
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
      const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0);
      const result = assessment.interpretResult(totalScore, selectedAgeGroup);

      // Add exercises to recommendations
      result.recommendations.push({
        type: 'exercise',
        title: 'Recommended Exercises',
        description: 'Try these activities for your age group.',
        imageUrl: '',
        videoUrl: `/exercise-gallery?group=${selectedAgeGroup}`
      });

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

  // Include here: renderAssessmentSelection, renderAgeGroupSelection, renderAssessmentQuestions, renderResults
  // As previously provided to you. If you want those reintegrated in this single file, I can append them in full.

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Render content conditionally */}
    </div>
  );
};

export default AssessmentPage;

// File: src/models/assessmentTypes.ts
export type AssessmentType = 'depression' | 'anxiety';
export type AgeGroup = 'child' | 'teen' | 'adult' | 'senior';

export interface AssessmentOption {
  id: string;
  text: string;
  value: number;
}

export interface AssessmentQuestion {
  id: string;
  text: string;
  options: AssessmentOption[];
}

export interface Recommendation {
  type: 'color' | 'music' | 'breathing' | 'yoga' | 'exercise';
  title: string;
  description: string;
  duration?: string;
  imageUrl?: string;
  videoUrl?: string;
}

export interface AssessmentResult {
  score: number;
  severity: string;
  interpretation: string;
  color: string;
  recommendations: Recommendation[];
}

export const ageGroups = [
  { id: 'child', label: 'Child', description: 'Under 13 years old' },
  { id: 'teen', label: 'Teen', description: '13-19 years old' },
  { id: 'adult', label: 'Adult', description: '20-59 years old' },
  { id: 'senior', label: 'Senior', description: '60+ years old' },
];

export const getAgeSpecificQuestions = (type: AssessmentType, ageGroup: AgeGroup): AssessmentQuestion[] => {
  const options: AssessmentOption[] = [
    { id: 'opt1', text: 'Never', value: 0 },
    { id: 'opt2', text: 'Rarely', value: 1 },
    { id: 'opt3', text: 'Sometimes', value: 2 },
    { id: 'opt4', text: 'Often', value: 3 },
  ];

  const questions: Record<AgeGroup, string[]> = {
    child: [
      'Does your child enjoy daily activities?',
      'Does your child get easily upset?',
      'Does your child play with others?',
      'Does your child get enough sleep?',
      'Does your child experience frequent sadness?',
      'Is your child easily distracted?',
      'Does your child complain of stomachaches?',
      'Does your child get scared easily?',
      'Does your child avoid eye contact?',
      'Does your child withdraw from others?'
    ],
    teen: [/* 10+ teen questions */],
    adult: [/* 10+ adult questions */],
    senior: [/* 10+ senior questions */],
  };

  return questions[ageGroup].map((text, idx) => ({
    id: `${ageGroup}_q${idx + 1}`,
    text,
    options
  }));
};

export const interpretDepressionResult = (score: number, ageGroup: AgeGroup): AssessmentResult => {
  let severity = 'mild';
  let color = '#FFD700';
  let interpretation = 'Mild depressive symptoms. Consider wellness activities.';

  if (score > 15) {
    severity = 'severe';
    color = '#FF4C4C';
    interpretation = 'Severe symptoms. Please consult a healthcare provider.';
  } else if (score > 10) {
    severity = 'moderate';
    color = '#FFA500';
    interpretation = 'Moderate symptoms. Take care and monitor regularly.';
  }

  return {
    score,
    severity,
    interpretation,
    color,
    recommendations: [
      {
        type: 'music',
        title: 'Relaxing Music',
        description: 'Calm your mind with these tunes.',
        videoUrl: 'https://www.youtube.com/watch?v=2OEL4P1Rz04'
      },
      {
        type: 'breathing',
        title: 'Guided Breathing',
        description: 'Breathe deeply to reduce stress.',
        videoUrl: 'https://www.youtube.com/watch?v=nmFUDkj1Aq0'
      }
    ]
  };
};

export const interpretAnxietyResult = interpretDepressionResult;
