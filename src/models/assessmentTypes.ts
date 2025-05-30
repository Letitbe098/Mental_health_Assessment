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
  recommendations: Recommendation[];
  severity: 'minimal' | 'mild' | 'moderate' | 'severe';
  color: string; // For UI representation
}

export interface Recommendation {
  type: 'color' | 'music' | 'yoga' | 'breathing' | 'general';
  title: string;
  description: string;
  duration?: string;
  imageUrl?: string;
}

export interface AssessmentHistory {
  id: string;
  type: AssessmentType;
  date: Date;
  score: number;
  severity: 'minimal' | 'mild' | 'moderate' | 'severe';
  ageGroup: AgeGroup;
}

export type AssessmentType = 'depression' | 'anxiety' | 'stress' | 'sleep' | 'general';
export type AgeGroup = 'child' | 'teen' | 'adult' | 'senior';

// Age-specific question sets
export const getAgeSpecificQuestions = (type: AssessmentType, ageGroup: AgeGroup): AssessmentQuestion[] => {
  switch (type) {
    case 'depression':
      return ageGroup === 'child' ? childDepressionQuestions :
             ageGroup === 'teen' ? teenDepressionQuestions :
             ageGroup === 'senior' ? seniorDepressionQuestions :
             depressionQuestions;
    case 'anxiety':
      return ageGroup === 'child' ? childAnxietyQuestions :
             ageGroup === 'teen' ? teenAnxietyQuestions :
             ageGroup === 'senior' ? seniorAnxietyQuestions :
             anxietyQuestions;
    default:
      return depressionQuestions;
  }
};

// Age group definitions
export const ageGroups = [
  { id: 'child', label: 'Child (6-12 years)', description: 'Questions adapted for children' },
  { id: 'teen', label: 'Teen (13-19 years)', description: 'Questions focused on adolescent experiences' },
  { id: 'adult', label: 'Adult (20-64 years)', description: 'Standard assessment questions' },
  { id: 'senior', label: 'Senior (65+ years)', description: 'Questions adapted for older adults' },
];

// Standard PHQ-9 Depression Questions (Adult version)
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

// Child-specific depression questions
export const childDepressionQuestions: AssessmentQuestion[] = [
  {
    id: 'child-dep-1',
    text: 'Do you feel sad or unhappy most of the time?',
    options: [
      { id: 'child-dep-1-0', text: 'No, I usually feel happy', value: 0 },
      { id: 'child-dep-1-1', text: 'Sometimes I feel sad', value: 1 },
      { id: 'child-dep-1-2', text: 'I feel sad a lot', value: 2 },
      { id: 'child-dep-1-3', text: 'I feel sad almost all the time', value: 3 },
    ],
  },
  {
    id: 'child-dep-2',
    text: 'Do you still enjoy playing with your favorite toys or doing activities you used to like?',
    options: [
      { id: 'child-dep-2-0', text: 'Yes, just as much as before', value: 0 },
      { id: 'child-dep-2-1', text: 'A little less than before', value: 1 },
      { id: 'child-dep-2-2', text: 'Much less than before', value: 2 },
      { id: 'child-dep-2-3', text: 'I don\'t enjoy them anymore', value: 3 },
    ],
  },
];

// Teen-specific depression questions
export const teenDepressionQuestions: AssessmentQuestion[] = [
  {
    id: 'teen-dep-1',
    text: 'How often do you feel overwhelmed by school or social pressures?',
    options: [
      { id: 'teen-dep-1-0', text: 'Rarely or never', value: 0 },
      { id: 'teen-dep-1-1', text: 'Sometimes', value: 1 },
      { id: 'teen-dep-1-2', text: 'Often', value: 2 },
      { id: 'teen-dep-1-3', text: 'Almost always', value: 3 },
    ],
  },
];

// Senior-specific depression questions
export const seniorDepressionQuestions: AssessmentQuestion[] = [
  {
    id: 'senior-dep-1',
    text: 'How often do you feel isolated or lonely?',
    options: [
      { id: 'senior-dep-1-0', text: 'Rarely or never', value: 0 },
      { id: 'senior-dep-1-1', text: 'Sometimes', value: 1 },
      { id: 'senior-dep-1-2', text: 'Often', value: 2 },
      { id: 'senior-dep-1-3', text: 'Almost always', value: 3 },
    ],
  },
];

// Standard GAD-7 Anxiety Questions (Adult version)
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

// Age-specific anxiety questions follow the same pattern
export const childAnxietyQuestions: AssessmentQuestion[] = [];

export const teenAnxietyQuestions: AssessmentQuestion[] = [];

export const seniorAnxietyQuestions: AssessmentQuestion[] = [];

// Therapeutic recommendations based on assessment results
export const getTherapeuticRecommendations = (score: number, ageGroup: AgeGroup): Recommendation[] => {
  const baseRecommendations: Recommendation[] = [
    {
      type: 'color',
      title: 'Color Therapy',
      description: 'Spend time in a room with calming blue or green tones. These colors are known to reduce stress and anxiety.',
      imageUrl: 'https://images.pexels.com/photos/3255761/pexels-photo-3255761.jpeg'
    },
    {
      type: 'music',
      title: 'Music Therapy',
      description: 'Listen to calming classical or nature sounds for 15-20 minutes.',
      duration: '15-20 minutes',
      imageUrl: 'https://images.pexels.com/photos/4088801/pexels-photo-4088801.jpeg'
    },
    {
      type: 'yoga',
      title: 'Simple Yoga Poses',
      description: 'Try child\'s pose or cat-cow stretches to release tension.',
      duration: '10-15 minutes',
      imageUrl: 'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg'
    },
    {
      type: 'breathing',
      title: 'Deep Breathing Exercise',
      description: 'Practice 4-7-8 breathing: Inhale for 4 counts, hold for 7, exhale for 8.',
      duration: '5-10 minutes',
      imageUrl: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg'
    }
  ];

  // Add age-specific recommendations
  switch (ageGroup) {
    case 'child':
      return [
        ...baseRecommendations,
        {
          type: 'general',
          title: 'Drawing and Coloring',
          description: 'Express your feelings through art using bright, happy colors.',
          imageUrl: 'https://images.pexels.com/photos/159579/crayons-coloring-book-coloring-book-159579.jpeg'
        }
      ];
    case 'teen':
      return [
        ...baseRecommendations,
        {
          type: 'general',
          title: 'Journal Writing',
          description: 'Write down your thoughts and feelings in a private journal.',
          imageUrl: 'https://images.pexels.com/photos/6357/coffee-desk-notes-workspace.jpg'
        }
      ];
    case 'senior':
      return [
        ...baseRecommendations,
        {
          type: 'general',
          title: 'Gentle Walking',
          description: 'Take a short walk in nature or around your garden.',
          duration: '15-20 minutes',
          imageUrl: 'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg'
        }
      ];
    default:
      return baseRecommendations;
  }
};

// Interpret depression assessment results
export const interpretDepressionResult = (score: number, ageGroup: AgeGroup): AssessmentResult => {
  const recommendations = getTherapeuticRecommendations(score, ageGroup);
  
  if (score <= 4) {
    return {
      score,
      severity: 'minimal',
      color: '#4A90E2',
      interpretation: 'Your responses suggest minimal or no depression symptoms.',
      recommendations
    };
  } else if (score <= 9) {
    return {
      score,
      severity: 'mild',
      color: '#50C878',
      interpretation: 'Your responses suggest mild depression symptoms.',
      recommendations
    };
  } else if (score <= 14) {
    return {
      score,
      severity: 'moderate',
      color: '#F59E0B',
      interpretation: 'Your responses suggest moderate depression symptoms.',
      recommendations
    };
  } else {
    return {
      score,
      severity: 'severe',
      color: '#EF4444',
      interpretation: 'Your responses suggest severe depression symptoms.',
      recommendations
    };
  }
};

// Interpret anxiety assessment results
export const interpretAnxietyResult = (score: number, ageGroup: AgeGroup): AssessmentResult => {
  const recommendations = getTherapeuticRecommendations(score, ageGroup);
  
  if (score <= 4) {
    return {
      score,
      severity: 'minimal',
      color: '#4A90E2',
      interpretation: 'Your responses suggest minimal or no anxiety symptoms.',
      recommendations
    };
  } else if (score <= 9) {
    return {
      score,
      severity: 'mild',
      color: '#50C878',
      interpretation: 'Your responses suggest mild anxiety symptoms.',
      recommendations
    };
  } else if (score <= 14) {
    return {
      score,
      severity: 'moderate',
      color: '#F59E0B',
      interpretation: 'Your responses suggest moderate anxiety symptoms.',
      recommendations
    };
  } else {
    return {
      score,
      severity: 'severe',
      color: '#EF4444',
      interpretation: 'Your responses suggest severe anxiety symptoms.',
      recommendations
    };
  }
};