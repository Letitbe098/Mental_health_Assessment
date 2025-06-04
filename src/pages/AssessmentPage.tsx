export type AssessmentType = 'depression' | 'anxiety';

export type AgeGroup = 'child' | 'teen' | 'adult' | 'senior';

export interface AssessmentQuestion {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
    value: number;
  }[];
}

export interface AssessmentResult {
  score: number;
  severity: string;
  color: string;
  interpretation: string;
  recommendations: {
    type: string;
    title: string;
    description: string;
    duration?: string;
    videoUrl?: string;
    imageUrl?: string;
  }[];
}

export const ageGroups = [
  {
    id: 'child',
    label: 'Children (6-12)',
    description: 'Age-appropriate assessment for children',
  },
  {
    id: 'teen',
    label: 'Teenagers (13-19)',
    description: 'Assessment tailored for adolescents',
  },
  {
    id: 'adult',
    label: 'Adults (20-64)',
    description: 'Comprehensive adult assessment',
  },
  {
    id: 'senior',
    label: 'Seniors (65+)',
    description: 'Assessment adapted for older adults',
  },
];

const questions = {
  depression: {
    child: [
      {
        id: 'dep_c_1',
        text: 'How often do you feel sad or unhappy?',
        options: [
          { id: '0', text: 'Not at all', value: 0 },
          { id: '1', text: 'Sometimes', value: 1 },
          { id: '2', text: 'Often', value: 2 },
          { id: '3', text: 'Almost always', value: 3 },
        ],
      },
      {
        id: 'dep_c_2',
        text: 'Do you find it hard to have fun doing things you usually enjoy?',
        options: [
          { id: '0', text: 'Not at all', value: 0 },
          { id: '1', text: 'Sometimes', value: 1 },
          { id: '2', text: 'Often', value: 2 },
          { id: '3', text: 'Almost always', value: 3 },
        ],
      },
      {
        id: 'dep_c_3',
        text: 'Do you have trouble sleeping at night?',
        options: [
          { id: '0', text: 'Not at all', value: 0 },
          { id: '1', text: 'Sometimes', value: 1 },
          { id: '2', text: 'Often', value: 2 },
          { id: '3', text: 'Almost always', value: 3 },
        ],
      },
      {
        id: 'dep_c_4',
        text: 'Do you feel tired during the day?',
        options: [
          { id: '0', text: 'Not at all', value: 0 },
          { id: '1', text: 'Sometimes', value: 1 },
          { id: '2', text: 'Often', value: 2 },
          { id: '3', text: 'Almost always', value: 3 },
        ],
      },
      {
        id: 'dep_c_5',
        text: 'Do you have trouble concentrating in school?',
        options: [
          { id: '0', text: 'Not at all', value: 0 },
          { id: '1', text: 'Sometimes', value: 1 },
          { id: '2', text: 'Often', value: 2 },
          { id: '3', text: 'Almost always', value: 3 },
        ],
      },
      {
        id: 'dep_c_6',
        text: 'Do you feel like crying often?',
        options: [
          { id: '0', text: 'Not at all', value: 0 },
          { id: '1', text: 'Sometimes', value: 1 },
          { id: '2', text: 'Often', value: 2 },
          { id: '3', text: 'Almost always', value: 3 },
        ],
      },
      {
        id: 'dep_c_7',
        text: 'Do you feel lonely even when you\'re with other people?',
        options: [
          { id: '0', text: 'Not at all', value: 0 },
          { id: '1', text: 'Sometimes', value: 1 },
          { id: '2', text: 'Often', value: 2 },
          { id: '3', text: 'Almost always', value: 3 },
        ],
      },
      {
        id: 'dep_c_8',
        text: 'Do you feel like bad things are your fault?',
        options: [
          { id: '0', text: 'Not at all', value: 0 },
          { id: '1', text: 'Sometimes', value: 1 },
          { id: '2', text: 'Often', value: 2 },
          { id: '3', text: 'Almost always', value: 3 },
        ],
      },
      {
        id: 'dep_c_9',
        text: 'Do you have less appetite than usual?',
        options: [
          { id: '0', text: 'Not at all', value: 0 },
          { id: '1', text: 'Sometimes', value: 1 },
          { id: '2', text: 'Often', value: 2 },
          { id: '3', text: 'Almost always', value: 3 },
        ],
      },
      {
        id: 'dep_c_10',
        text: 'Do you feel like nobody likes you?',
        options: [
          { id: '0', text: 'Not at all', value: 0 },
          { id: '1', text: 'Sometimes', value: 1 },
          { id: '2', text: 'Often', value: 2 },
          { id: '3', text: 'Almost always', value: 3 },
        ],
      },
    ],
    teen: [
      // Similar structure for teen questions
      // 10 questions specific to teenagers
    ],
    adult: [
      // Similar structure for adult questions
      // 10 questions specific to adults
    ],
    senior: [
      // Similar structure for senior questions
      // 10 questions specific to seniors
    ],
  },
  anxiety: {
    child: [
      // 10 anxiety-specific questions for children
    ],
    teen: [
      // 10 anxiety-specific questions for teenagers
    ],
    adult: [
      // 10 anxiety-specific questions for adults
    ],
    senior: [
      // 10 anxiety-specific questions for seniors
    ],
  },
};

export const getAgeSpecificQuestions = (
  type: AssessmentType,
  ageGroup: AgeGroup
): AssessmentQuestion[] => {
  return questions[type][ageGroup];
};

export const interpretDepressionResult = (
  score: number,
  ageGroup: AgeGroup
): AssessmentResult => {
  let severity: string;
  let color: string;
  let interpretation: string;

  if (score <= 5) {
    severity = 'minimal';
    color = '#4CAF50';
    interpretation = 'Your symptoms suggest minimal depression.';
  } else if (score <= 10) {
    severity = 'mild';
    color = '#8BC34A';
    interpretation = 'Your symptoms suggest mild depression.';
  } else if (score <= 15) {
    severity = 'moderate';
    color = '#FFC107';
    interpretation = 'Your symptoms suggest moderate depression.';
  } else {
    severity = 'severe';
    color = '#F44336';
    interpretation = 'Your symptoms suggest severe depression.';
  }

  const recommendations = [
    {
      type: 'color',
      title: 'Color Therapy',
      description: 'Use calming colors to improve mood',
      duration: '15-20 minutes daily',
      videoUrl: 'https://www.youtube.com/watch?v=example1',
    },
    {
      type: 'music',
      title: 'Music Therapy',
      description: 'Listen to uplifting music',
      duration: '30 minutes daily',
      videoUrl: 'https://www.youtube.com/watch?v=example2',
    },
    {
      type: 'breathing',
      title: 'Breathing Exercises',
      description: 'Practice deep breathing techniques',
      duration: '10 minutes, 3 times daily',
      videoUrl: 'https://www.youtube.com/watch?v=example3',
    },
    {
      type: 'yoga',
      title: 'Gentle Movement',
      description: 'Simple stretches and movements',
      duration: '15-20 minutes daily',
      videoUrl: 'https://www.youtube.com/watch?v=example4',
    },
  ];

  return {
    score,
    severity,
    color,
    interpretation,
    recommendations,
  };
};

export const interpretAnxietyResult = (
  score: number,
  ageGroup: AgeGroup
): AssessmentResult => {
  // Similar structure to interpretDepressionResult
  // but with anxiety-specific interpretations and recommendations
  return {
    score,
    severity: 'moderate',
    color: '#FFC107',
    interpretation: 'Your symptoms suggest moderate anxiety.',
    recommendations: [],
  };
};
