// Types for different mental health assessments

export interface AssessmentQuestion {
  id: string;
  text: string;
  options: AssessmentOption[];
}

export interface AssessmentOption {
  id: string;
  text: string;
  value: number;
}

export interface AssessmentResult {
  score: number;
  interpretation: string;
  recommendations: string[];
  severity: 'minimal' | 'mild' | 'moderate' | 'severe';
  color: string; // For UI representation
}

export interface AssessmentHistory {
  id: string;
  type: AssessmentType;
  date: Date;
  score: number;
  severity: 'minimal' | 'mild' | 'moderate' | 'severe';
}

export type AssessmentType = 'depression' | 'anxiety' | 'stress' | 'sleep' | 'general';

// PHQ-9 Depression Assessment
export const depressionQuestions: AssessmentQuestion[] = [
  {
    id: 'phq-1',
    text: 'Little interest or pleasure in doing things',
    options: [
      { id: 'phq-1-0', text: 'Not at all', value: 0 },
      { id: 'phq-1-1', text: 'Several days', value: 1 },
      { id: 'phq-1-2', text: 'More than half the days', value: 2 },
      { id: 'phq-1-3', text: 'Nearly every day', value: 3 },
    ],
  },
  {
    id: 'phq-2',
    text: 'Feeling down, depressed, or hopeless',
    options: [
      { id: 'phq-2-0', text: 'Not at all', value: 0 },
      { id: 'phq-2-1', text: 'Several days', value: 1 },
      { id: 'phq-2-2', text: 'More than half the days', value: 2 },
      { id: 'phq-2-3', text: 'Nearly every day', value: 3 },
    ],
  },
  {
    id: 'phq-3',
    text: 'Trouble falling or staying asleep, or sleeping too much',
    options: [
      { id: 'phq-3-0', text: 'Not at all', value: 0 },
      { id: 'phq-3-1', text: 'Several days', value: 1 },
      { id: 'phq-3-2', text: 'More than half the days', value: 2 },
      { id: 'phq-3-3', text: 'Nearly every day', value: 3 },
    ],
  },
  {
    id: 'phq-4',
    text: 'Feeling tired or having little energy',
    options: [
      { id: 'phq-4-0', text: 'Not at all', value: 0 },
      { id: 'phq-4-1', text: 'Several days', value: 1 },
      { id: 'phq-4-2', text: 'More than half the days', value: 2 },
      { id: 'phq-4-3', text: 'Nearly every day', value: 3 },
    ],
  },
  {
    id: 'phq-5',
    text: 'Poor appetite or overeating',
    options: [
      { id: 'phq-5-0', text: 'Not at all', value: 0 },
      { id: 'phq-5-1', text: 'Several days', value: 1 },
      { id: 'phq-5-2', text: 'More than half the days', value: 2 },
      { id: 'phq-5-3', text: 'Nearly every day', value: 3 },
    ],
  },
  {
    id: 'phq-6',
    text: 'Feeling bad about yourself - or that you are a failure or have let yourself or your family down',
    options: [
      { id: 'phq-6-0', text: 'Not at all', value: 0 },
      { id: 'phq-6-1', text: 'Several days', value: 1 },
      { id: 'phq-6-2', text: 'More than half the days', value: 2 },
      { id: 'phq-6-3', text: 'Nearly every day', value: 3 },
    ],
  },
  {
    id: 'phq-7',
    text: 'Trouble concentrating on things, such as reading the newspaper or watching television',
    options: [
      { id: 'phq-7-0', text: 'Not at all', value: 0 },
      { id: 'phq-7-1', text: 'Several days', value: 1 },
      { id: 'phq-7-2', text: 'More than half the days', value: 2 },
      { id: 'phq-7-3', text: 'Nearly every day', value: 3 },
    ],
  },
  {
    id: 'phq-8',
    text: 'Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual',
    options: [
      { id: 'phq-8-0', text: 'Not at all', value: 0 },
      { id: 'phq-8-1', text: 'Several days', value: 1 },
      { id: 'phq-8-2', text: 'More than half the days', value: 2 },
      { id: 'phq-8-3', text: 'Nearly every day', value: 3 },
    ],
  },
  {
    id: 'phq-9',
    text: 'Thoughts that you would be better off dead or of hurting yourself in some way',
    options: [
      { id: 'phq-9-0', text: 'Not at all', value: 0 },
      { id: 'phq-9-1', text: 'Several days', value: 1 },
      { id: 'phq-9-2', text: 'More than half the days', value: 2 },
      { id: 'phq-9-3', text: 'Nearly every day', value: 3 },
    ],
  },
];

// GAD-7 Anxiety Assessment
export const anxietyQuestions: AssessmentQuestion[] = [
  {
    id: 'gad-1',
    text: 'Feeling nervous, anxious, or on edge',
    options: [
      { id: 'gad-1-0', text: 'Not at all', value: 0 },
      { id: 'gad-1-1', text: 'Several days', value: 1 },
      { id: 'gad-1-2', text: 'More than half the days', value: 2 },
      { id: 'gad-1-3', text: 'Nearly every day', value: 3 },
    ],
  },
  {
    id: 'gad-2',
    text: 'Not being able to stop or control worrying',
    options: [
      { id: 'gad-2-0', text: 'Not at all', value: 0 },
      { id: 'gad-2-1', text: 'Several days', value: 1 },
      { id: 'gad-2-2', text: 'More than half the days', value: 2 },
      { id: 'gad-2-3', text: 'Nearly every day', value: 3 },
    ],
  },
  {
    id: 'gad-3',
    text: 'Worrying too much about different things',
    options: [
      { id: 'gad-3-0', text: 'Not at all', value: 0 },
      { id: 'gad-3-1', text: 'Several days', value: 1 },
      { id: 'gad-3-2', text: 'More than half the days', value: 2 },
      { id: 'gad-3-3', text: 'Nearly every day', value: 3 },
    ],
  },
  {
    id: 'gad-4',
    text: 'Trouble relaxing',
    options: [
      { id: 'gad-4-0', text: 'Not at all', value: 0 },
      { id: 'gad-4-1', text: 'Several days', value: 1 },
      { id: 'gad-4-2', text: 'More than half the days', value: 2 },
      { id: 'gad-4-3', text: 'Nearly every day', value: 3 },
    ],
  },
  {
    id: 'gad-5',
    text: 'Being so restless that it\'s hard to sit still',
    options: [
      { id: 'gad-5-0', text: 'Not at all', value: 0 },
      { id: 'gad-5-1', text: 'Several days', value: 1 },
      { id: 'gad-5-2', text: 'More than half the days', value: 2 },
      { id: 'gad-5-3', text: 'Nearly every day', value: 3 },
    ],
  },
  {
    id: 'gad-6',
    text: 'Becoming easily annoyed or irritable',
    options: [
      { id: 'gad-6-0', text: 'Not at all', value: 0 },
      { id: 'gad-6-1', text: 'Several days', value: 1 },
      { id: 'gad-6-2', text: 'More than half the days', value: 2 },
      { id: 'gad-6-3', text: 'Nearly every day', value: 3 },
    ],
  },
  {
    id: 'gad-7',
    text: 'Feeling afraid as if something awful might happen',
    options: [
      { id: 'gad-7-0', text: 'Not at all', value: 0 },
      { id: 'gad-7-1', text: 'Several days', value: 1 },
      { id: 'gad-7-2', text: 'More than half the days', value: 2 },
      { id: 'gad-7-3', text: 'Nearly every day', value: 3 },
    ],
  },
];

// Interpret depression assessment results
export const interpretDepressionResult = (score: number): AssessmentResult => {
  if (score <= 4) {
    return {
      score,
      severity: 'minimal',
      color: '#4A90E2',
      interpretation: 'Your responses suggest minimal or no depression symptoms.',
      recommendations: [
        'Continue maintaining your mental wellbeing through regular exercise and social connection',
        'Practice mindfulness or meditation to maintain emotional balance',
        'Consider taking periodic self-assessments to monitor your mental health'
      ]
    };
  } else if (score <= 9) {
    return {
      score,
      severity: 'mild',
      color: '#50C878',
      interpretation: 'Your responses suggest mild depression symptoms.',
      recommendations: [
        'Consider speaking with a mental health professional about your symptoms',
        'Incorporate regular exercise and social activities into your routine',
        'Practice stress-reduction techniques like deep breathing or meditation',
        'Maintain a regular sleep schedule and healthy diet'
      ]
    };
  } else if (score <= 14) {
    return {
      score,
      severity: 'moderate',
      color: '#F59E0B',
      interpretation: 'Your responses suggest moderate depression symptoms.',
      recommendations: [
        'We recommend consulting with a mental health professional to discuss your symptoms',
        'Consider cognitive behavioral therapy or other evidence-based treatments',
        'Establish a routine with regular sleep, exercise, and nutrition',
        'Connect with supportive friends or family members',
        'Practice self-care activities that you enjoy'
      ]
    };
  } else {
    return {
      score,
      severity: 'severe',
      color: '#EF4444',
      interpretation: 'Your responses suggest severe depression symptoms.',
      recommendations: [
        'We strongly recommend seeking professional help from a mental health provider soon',
        'Consider reaching out to a crisis helpline if you have thoughts of harming yourself',
        'Talk to your doctor about treatment options, which may include therapy and/or medication',
        'Let trusted friends or family members know what you\'re experiencing',
        'Focus on basic self-care: sleep, nutrition, and gentle physical activity'
      ]
    };
  }
};

// Interpret anxiety assessment results
export const interpretAnxietyResult = (score: number): AssessmentResult => {
  if (score <= 4) {
    return {
      score,
      severity: 'minimal',
      color: '#4A90E2',
      interpretation: 'Your responses suggest minimal or no anxiety symptoms.',
      recommendations: [
        'Continue maintaining your mental wellbeing through regular exercise and stress management',
        'Practice mindfulness or meditation to maintain emotional balance',
        'Consider taking periodic self-assessments to monitor your mental health'
      ]
    };
  } else if (score <= 9) {
    return {
      score,
      severity: 'mild',
      color: '#50C878',
      interpretation: 'Your responses suggest mild anxiety symptoms.',
      recommendations: [
        'Consider speaking with a mental health professional about your symptoms',
        'Practice relaxation techniques like deep breathing, progressive muscle relaxation, or meditation',
        'Limit caffeine and alcohol which can worsen anxiety',
        'Maintain regular physical activity which can help reduce anxiety'
      ]
    };
  } else if (score <= 14) {
    return {
      score,
      severity: 'moderate',
      color: '#F59E0B',
      interpretation: 'Your responses suggest moderate anxiety symptoms.',
      recommendations: [
        'We recommend consulting with a mental health professional to discuss your symptoms',
        'Consider cognitive behavioral therapy which is effective for anxiety disorders',
        'Learn and practice grounding techniques for moments of heightened anxiety',
        'Establish a regular sleep schedule and practice good sleep hygiene',
        'Consider joining a support group for people with anxiety'
      ]
    };
  } else {
    return {
      score,
      severity: 'severe',
      color: '#EF4444',
      interpretation: 'Your responses suggest severe anxiety symptoms.',
      recommendations: [
        'We strongly recommend seeking professional help from a mental health provider soon',
        'Talk to your doctor about treatment options, which may include therapy and/or medication',
        'Learn about and practice crisis management techniques for panic or anxiety attacks',
        'Limit exposure to stressful situations and news when possible',
        'Reach out to trusted friends or family members for support'
      ]
    };
  }
};