import { v4 as uuidv4 } from '../utils/uuid';

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
  color: string;
}

export interface Recommendation {
  type: 'color' | 'music' | 'yoga' | 'breathing' | 'exercise' | 'meditation' | 'general';
  title: string;
  description: string;
  duration?: string;
  imageUrl?: string;
  videoUrl?: string;
  audioUrl?: string;
  steps?: string[];
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

// Export age groups array
export const ageGroups: AgeGroup[] = ['child', 'teen', 'adult', 'senior'];

// Child-specific depression questions (10 questions)
export const childDepressionQuestions: AssessmentQuestion[] = [
  {
    id: uuidv4(),
    text: 'How often do you feel sad or unhappy?',
    options: [
      { id: uuidv4(), text: 'Never', value: 0 },
      { id: uuidv4(), text: 'Sometimes', value: 1 },
      { id: uuidv4(), text: 'Often', value: 2 },
      { id: uuidv4(), text: 'Almost always', value: 3 }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you still enjoy playing with your favorite toys or doing activities you used to like?',
    options: [
      { id: uuidv4(), text: 'Yes, just as much as before', value: 0 },
      { id: uuidv4(), text: 'A little less than before', value: 1 },
      { id: uuidv4(), text: 'Much less than before', value: 2 },
      { id: uuidv4(), text: 'Not at all', value: 3 }
    ]
  },
  {
    id: uuidv4(),
    text: 'How well do you sleep at night?',
    options: [
      { id: uuidv4(), text: 'I sleep very well', value: 0 },
      { id: uuidv4(), text: 'I have some trouble sleeping', value: 1 },
      { id: uuidv4(), text: 'I often have trouble sleeping', value: 2 },
      { id: uuidv4(), text: 'I have a lot of trouble sleeping', value: 3 }
    ]
  },
  {
    id: uuidv4(),
    text: 'How is your appetite?',
    options: [
      { id: uuidv4(), text: 'I eat normally', value: 0 },
      { id: uuidv4(), text: 'I sometimes eat less/more than usual', value: 1 },
      { id: uuidv4(), text: 'I often eat less/more than usual', value: 2 },
      { id: uuidv4(), text: 'I rarely want to eat', value: 3 }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you find it hard to concentrate in school?',
    options: [
      { id: uuidv4(), text: 'No, I can concentrate well', value: 0 },
      { id: uuidv4(), text: 'Sometimes I have trouble', value: 1 },
      { id: uuidv4(), text: 'I often have trouble', value: 2 },
      { id: uuidv4(), text: 'I always have trouble', value: 3 }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you feel tired a lot?',
    options: [
      { id: uuidv4(), text: 'No, I have lots of energy', value: 0 },
      { id: uuidv4(), text: 'Sometimes I feel tired', value: 1 },
      { id: uuidv4(), text: 'I feel tired most days', value: 2 },
      { id: uuidv4(), text: 'I always feel tired', value: 3 }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you feel like you are worth as much as other kids?',
    options: [
      { id: uuidv4(), text: 'Yes, I feel just as good', value: 0 },
      { id: uuidv4(), text: 'Sometimes I feel less worthy', value: 1 },
      { id: uuidv4(), text: 'I often feel less worthy', value: 2 },
      { id: uuidv4(), text: 'I feel worthless', value: 3 }
    ]
  },
  {
    id: uuidv4(),
    text: 'How often do you feel like crying?',
    options: [
      { id: uuidv4(), text: 'Rarely or never', value: 0 },
      { id: uuidv4(), text: 'Sometimes', value: 1 },
      { id: uuidv4(), text: 'Often', value: 2 },
      { id: uuidv4(), text: 'Almost all the time', value: 3 }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you get upset or angry easily?',
    options: [
      { id: uuidv4(), text: 'No, I stay calm', value: 0 },
      { id: uuidv4(), text: 'Sometimes I get upset', value: 1 },
      { id: uuidv4(), text: 'I get upset easily', value: 2 },
      { id: uuidv4(), text: 'I get very upset very easily', value: 3 }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you feel lonely?',
    options: [
      { id: uuidv4(), text: 'No, I have friends and family', value: 0 },
      { id: uuidv4(), text: 'Sometimes I feel lonely', value: 1 },
      { id: uuidv4(), text: 'I often feel lonely', value: 2 },
      { id: uuidv4(), text: 'I always feel lonely', value: 3 }
    ]
  }
];

// Teen-specific depression questions (10 questions)
export const teenDepressionQuestions: AssessmentQuestion[] = [
  {
    id: uuidv4(),
    text: 'How often do you feel overwhelmed by school or social pressures?',
    options: [
      { id: uuidv4(), text: 'Rarely or never', value: 0 },
      { id: uuidv4(), text: 'Sometimes', value: 1 },
      { id: uuidv4(), text: 'Often', value: 2 },
      { id: uuidv4(), text: 'Almost always', value: 3 }
    ]
  },
  {
    id: uuidv4(),
    text: 'Have you lost interest in activities you used to enjoy?',
    options: [
      { id: uuidv4(), text: 'No change in interests', value: 0 },
      { id: uuidv4(), text: 'Slightly less interested', value: 1 },
      { id: uuidv4(), text: 'Much less interested', value: 2 },
      { id: uuidv4(), text: 'No interest at all', value: 3 }
    ]
  },
  {
    id: uuidv4(),
    text: 'How often do you feel hopeless about the future?',
    options: [
      { id: uuidv4(), text: 'Rarely or never', value: 0 },
      { id: uuidv4(), text: 'Sometimes', value: 1 },
      { id: uuidv4(), text: 'Often', value: 2 },
      { id: uuidv4(), text: 'Almost always', value: 3 }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you have trouble with your self-image or body image?',
    options: [
      { id: uuidv4(), text: 'No concerns', value: 0 },
      { id: uuidv4(), text: 'Minor concerns', value: 1 },
      { id: uuidv4(), text: 'Moderate concerns', value: 2 },
      { id: uuidv4(), text: 'Severe concerns', value: 3 }
    ]
  },
  {
    id: uuidv4(),
    text: 'How often do you feel isolated from others?',
    options: [
      { id: uuidv4(), text: 'Rarely or never', value: 0 },
      { id: uuidv4(), text: 'Sometimes', value: 1 },
      { id: uuidv4(), text: 'Often', value: 2 },
      { id: uuidv4(), text: 'Almost always', value: 3 }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you have trouble concentrating on schoolwork?',
    options: [
      { id: uuidv4(), text: 'No trouble', value: 0 },
      { id: uuidv4(), text: 'Some trouble', value: 1 },
      { id: uuidv4(), text: 'Frequent trouble', value: 2 },
      { id: uuidv4(), text: 'Constant trouble', value: 3 }
    ]
  },
  {
    id: uuidv4(),
    text: 'How often do you feel worthless or guilty?',
    options: [
      { id: uuidv4(), text: 'Rarely or never', value: 0 },
      { id: uuidv4(), text: 'Sometimes', value: 1 },
      { id: uuidv4(), text: 'Often', value: 2 },
      { id: uuidv4(), text: 'Almost always', value: 3 }
    ]
  },
  {
    id: uuidv4(),
    text: 'Have there been changes in your sleeping patterns?',
    options: [
      { id: uuidv4(), text: 'No changes', value: 0 },
      { id: uuidv4(), text: 'Slight changes', value: 1 },
      { id: uuidv4(), text: 'Moderate changes', value: 2 },
      { id: uuidv4(), text: 'Severe changes', value: 3 }
    ]
  },
  {
    id: uuidv4(),
    text: 'How often do you feel irritable or angry?',
    options: [
      { id: uuidv4(), text: 'Rarely or never', value: 0 },
      { id: uuidv4(), text: 'Sometimes', value: 1 },
      { id: uuidv4(), text: 'Often', value: 2 },
      { id: uuidv4(), text: 'Almost always', value: 3 }
    ]
  },
  {
    id: uuidv4(),
    text: 'Have you experienced changes in your appetite or weight?',
    options: [
      { id: uuidv4(), text: 'No changes', value: 0 },
      { id: uuidv4(), text: 'Slight changes', value: 1 },
      { id: uuidv4(), text: 'Moderate changes', value: 2 },
      { id: uuidv4(), text: 'Severe changes', value: 3 }
    ]
  }
];

// Senior-specific depression questions (10 questions)
export const seniorDepressionQuestions: AssessmentQuestion[] = [
  {
    id: uuidv4(),
    text: 'How often do you feel lonely or isolated?',
    options: [
      { id: uuidv4(), text: 'Rarely or never', value: 0 },
      { id: uuidv4(), text: 'Sometimes', value: 1 },
      { id: uuidv4(), text: 'Often', value: 2 },
      { id: uuidv4(), text: 'Almost always', value: 3 }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you still enjoy activities you used to like?',
    options: [
      { id: uuidv4(), text: 'Yes, just as much', value: 0 },
      { id: uuidv4(), text: 'Somewhat less', value: 1 },
      { id: uuidv4(), text: 'Much less', value: 2 },
      { id: uuidv4(), text: 'Not at all', value: 3 }
    ]
  },
  {
    id: uuidv4(),
    text: 'How is your memory compared to before?',
    options: [
      { id: uuidv4(), text: 'No changes', value: 0 },
      { id: uuidv4(), text: 'Minor changes', value: 1 },
      { id: uuidv4(), text: 'Moderate changes', value: 2 },
      { id: uuidv4(), text: 'Significant changes', value: 3 }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you feel useful and needed?',
    options: [
      { id: uuidv4(), text: 'Yes, very much', value: 0 },
      { id: uuidv4(), text: 'Sometimes', value: 1 },
      { id: uuidv4(), text: 'Not very often', value: 2 },
      { id: uuidv4(), text: 'Not at all', value: 3 }
    ]
  },
  {
    id: uuidv4(),
    text: 'How often do you feel hopeful about the future?',
    options: [
      { id: uuidv4(), text: 'Most of the time', value: 0 },
      { id: uuidv4(), text: 'Sometimes', value: 1 },
      { id: uuidv4(), text: 'Rarely', value: 2 },
      { id: uuidv4(), text: 'Never', value: 3 }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you have trouble sleeping?',
    options: [
      { id: uuidv4(), text: 'No trouble', value: 0 },
      { id: uuidv4(), text: 'Some trouble', value: 1 },
      { id: uuidv4(), text: 'Frequent trouble', value: 2 },
      { id: uuidv4(), text: 'Severe trouble', value: 3 }
    ]
  },
  {
    id: uuidv4(),
    text: 'How is your appetite?',
    options: [
      { id: uuidv4(), text: 'Normal', value: 0 },
      { id: uuidv4(), text: 'Somewhat changed', value: 1 },
      { id: uuidv4(), text: 'Much changed', value: 2 },
      { id: uuidv4(), text: 'Severely changed', value: 3 }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you feel more irritable than usual?',
    options: [
      { id: uuidv4(), text: 'No change', value: 0 },
      { id: uuidv4(), text: 'Slightly more', value: 1 },
      { id: uuidv4(), text: 'Moderately more', value: 2 },
      { id: uuidv4(), text: 'Much more', value: 3 }
    ]
  },
  {
    id: uuidv4(),
    text: 'How often do you feel tired without a clear reason?',
    options: [
      { id: uuidv4(), text: 'Rarely or never', value: 0 },
      { id: uuidv4(), text: 'Sometimes', value: 1 },
      { id: uuidv4(), text: 'Often', value: 2 },
      { id: uuidv4(), text: 'Almost always', value: 3 }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you have trouble concentrating on daily activities?',
    options: [
      { id: uuidv4(), text: 'No trouble', value: 0 },
      { id: uuidv4(), text: 'Some trouble', value: 1 },
      { id: uuidv4(), text: 'Frequent trouble', value: 2 },
      { id: uuidv4(), text: 'Constant trouble', value: 3 }
    ]
  }
];

// Get therapeutic recommendations based on assessment results
export const getTherapeuticRecommendations = (score: number, ageGroup: AgeGroup): Recommendation[] => {
  const baseRecommendations: Recommendation[] = [
    {
      type: 'color',
      title: 'Color Therapy',
      description: 'Spend time in a room with calming blue or green tones.',
      imageUrl: 'https://images.pexels.com/photos/3255761/pexels-photo-3255761.jpeg',
      videoUrl: 'https://www.youtube.com/embed/tznztJVsW9E'
    },
    {
      type: 'music',
      title: 'Calming Music Therapy',
      description: 'Listen to soothing classical or nature sounds.',
      duration: '15-20 minutes',
      audioUrl: 'https://soundcloud.com/relaxdaily/relaxing-music-calm-studying',
      imageUrl: 'https://images.pexels.com/photos/4088801/pexels-photo-4088801.jpeg'
    },
    {
      type: 'breathing',
      title: '4-7-8 Breathing Exercise',
      description: 'A simple breathing technique to reduce anxiety.',
      duration: '5 minutes',
      videoUrl: 'https://www.youtube.com/embed/gz4G31LGyog',
      steps: [
        'Sit or lie comfortably',
        'Inhale for 4 seconds',
        'Hold breath for 7 seconds',
        'Exhale for 8 seconds',
        'Repeat 4 times'
      ]
    },
    {
      type: 'meditation',
      title: 'Guided Meditation',
      description: 'Follow along with this calming meditation.',
      duration: '10 minutes',
      videoUrl: 'https://www.youtube.com/embed/inpok4MKVLM'
    },
    {
      type: 'yoga',
      title: 'Gentle Yoga Sequence',
      description: 'Simple yoga poses for relaxation.',
      duration: '15 minutes',
      videoUrl: 'https://www.youtube.com/embed/v7AYKMP6rOE',
      steps: [
        'Child\'s Pose',
        'Cat-Cow Stretch',
        'Downward Dog',
        'Forward Fold',
        'Corpse Pose'
      ]
    }
  ];

  switch (ageGroup) {
    case 'child':
      return [
        ...baseRecommendations,
        {
          type: 'exercise',
          title: 'Fun Movement Activities',
          description: 'Playful exercises to boost mood.',
          duration: '15 minutes',
          videoUrl: 'https://www.youtube.com/embed/dhCM0C6GnrY',
          imageUrl: 'https://images.pexels.com/photos/159579/crayons-coloring-book-coloring-book-159579.jpeg'
        },
        {
          type: 'general',
          title: 'Art Therapy',
          description: 'Express feelings through drawing and coloring.',
          videoUrl: 'https://www.youtube.com/embed/x6jSSpN9zGY'
        }
      ];
    case 'teen':
      return [
        ...baseRecommendations,
        {
          type: 'exercise',
          title: 'Teen Workout Routine',
          description: 'Energy-boosting exercises.',
          duration: '20 minutes',
          videoUrl: 'https://www.youtube.com/embed/ml6cT4AZdqI'
        },
        {
          type: 'general',
          title: 'Journaling Exercise',
          description: 'Guided journaling prompts for self-reflection.',
          videoUrl: 'https://www.youtube.com/embed/ZBnPlqQFPKs'
        }
      ];
    case 'senior':
      return [
        ...baseRecommendations,
        {
          type: 'exercise',
          title: 'Chair Yoga',
          description: 'Gentle seated exercises.',
          duration: '15 minutes',
          videoUrl: 'https://www.youtube.com/embed/1DYH5ud3zHo'
        },
        {
          type: 'general',
          title: 'Memory Activities',
          description: 'Brain exercises to stay sharp.',
          videoUrl: 'https://www.youtube.com/embed/0TZxqC6uYDk'
        }
      ];
    default:
      return [
        ...baseRecommendations,
        {
          type: 'exercise',
          title: 'Full Body Workout',
          description: 'Moderate intensity exercises.',
          duration: '30 minutes',
          videoUrl: 'https://www.youtube.com/embed/UBMk30rjy0o'
        }
      ];
  }
};

// Get age-specific questions based on assessment type
export const getAgeSpecificQuestions = (type: AssessmentType, ageGroup: AgeGroup): AssessmentQuestion[] => {
  if (type === 'depression') {
    switch (ageGroup) {
      case 'child':
        return childDepressionQuestions;
      case 'teen':
        return teenDepressionQuestions;
      case 'adult':
        return adultDepressionQuestions;
      case 'senior':
        return seniorDepressionQuestions;
      default:
        return adultDepressionQuestions;
    }
  } else if (type === 'anxiety') {
    switch (ageGroup) {
      case 'child':
        return childAnxietyQuestions;
      case 'teen':
        return teenAnxietyQuestions;
      case 'adult':
        return adultAnxietyQuestions;
      case 'senior':
        return seniorAnxietyQuestions;
      default:
        return adultAnxietyQuestions;
    }
  }
  return adultDepressionQuestions; // Default fallback
};

// Interpret assessment results
export const interpretDepressionResult = (score: number, ageGroup: AgeGroup): AssessmentResult => {
  const recommendations = getTherapeuticRecommendations(score, ageGroup);
  
  if (score <= 9) {
    return {
      score,
      severity: 'minimal',
      color: '#4A90E2',
      interpretation: 'Your responses suggest minimal or no depression symptoms.',
      recommendations
    };
  } else if (score <= 14) {
    return {
      score,
      severity: 'mild',
      color: '#50C878',
      interpretation: 'Your responses suggest mild depression symptoms.',
      recommendations
    };
  } else if (score <= 19) {
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
  
  if (score <= 9) {
    return {
      score,
      severity: 'minimal',
      color: '#4A90E2',
      interpretation: 'Your responses suggest minimal or no anxiety symptoms.',
      recommendations
    };
  } else if (score <= 14) {
    return {
      score,
      severity: 'mild',
      color: '#50C878',
      interpretation: 'Your responses suggest mild anxiety symptoms.',
      recommendations
    };
  } else if (score <= 19) {
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