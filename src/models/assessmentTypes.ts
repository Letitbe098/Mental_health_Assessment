import { ExerciseRecommendation } from './exerciseTypes';

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

export interface TherapyRecommendation {
  type: 'color' | 'music' | 'breathing' | 'yoga' | 'exercise';
  title: string;
  description: string;
  duration?: string;
  imageUrl?: string;
  videoUrl?: string;
  exercises?: ExerciseRecommendation[];
}

export interface AssessmentResult {
  score: number;
  severity: 'minimal' | 'mild' | 'moderate' | 'severe';
  color: string;
  interpretation: string;
  recommendations: TherapyRecommendation[];
}

export const ageGroups = [
  {
    id: 'child',
    label: 'Child (6-12 years)',
    description: 'Age-appropriate questions for children',
  },
  {
    id: 'teen',
    label: 'Teen (13-19 years)',
    description: 'Questions tailored for teenagers',
  },
  {
    id: 'adult',
    label: 'Adult (20-50 years)',
    description: 'Standard adult assessment',
  },
  {
    id: 'senior',
    label: 'Senior (51+ years)',
    description: 'Assessment adapted for older adults',
  },
];

const exerciseRecommendations: Record<AgeGroup, ExerciseRecommendation[]> = {
  child: [
    { name: "Jumping Jacks", img: "https://images.pexels.com/photos/4149273/pexels-photo-4149273.jpeg", duration: "5 minutes" },
    { name: "Bear Crawls", img: "https://images.pexels.com/photos/4149279/pexels-photo-4149279.jpeg", duration: "3 minutes" },
    { name: "Skipping", img: "https://images.pexels.com/photos/4149280/pexels-photo-4149280.jpeg", duration: "10 minutes" }
  ],
  teen: [
    { name: "Push-ups", img: "https://images.pexels.com/photos/4162485/pexels-photo-4162485.jpeg", duration: "3 sets of 10" },
    { name: "Squats", img: "https://images.pexels.com/photos/4162487/pexels-photo-4162487.jpeg", duration: "3 sets of 15" },
    { name: "Planks", img: "https://images.pexels.com/photos/4162488/pexels-photo-4162488.jpeg", duration: "30 seconds x 3" }
  ],
  adult: [
    { name: "Running", img: "https://images.pexels.com/photos/4162489/pexels-photo-4162489.jpeg", duration: "20 minutes" },
    { name: "Cycling", img: "https://images.pexels.com/photos/4162490/pexels-photo-4162490.jpeg", duration: "30 minutes" },
    { name: "Yoga", img: "https://images.pexels.com/photos/4162491/pexels-photo-4162491.jpeg", duration: "15 minutes" }
  ],
  senior: [
    { name: "Walking", img: "https://images.pexels.com/photos/4162492/pexels-photo-4162492.jpeg", duration: "30 minutes" },
    { name: "Water Aerobics", img: "https://images.pexels.com/photos/4162493/pexels-photo-4162493.jpeg", duration: "20 minutes" },
    { name: "Tai Chi", img: "https://images.pexels.com/photos/4162494/pexels-photo-4162494.jpeg", duration: "15 minutes" }
  ]
};

const depressionQuestions: Record<AgeGroup, AssessmentQuestion[]> = {
  child: [
    {
      id: 'child_dep_1',
      text: 'How often do you feel sad or unhappy?',
      options: [
        { id: 'c1_0', text: 'Not at all', value: 0 },
        { id: 'c1_1', text: 'Sometimes', value: 1 },
        { id: 'c1_2', text: 'Most of the time', value: 2 },
        { id: 'c1_3', text: 'All the time', value: 3 }
      ]
    },
    {
      id: 'child_dep_2',
      text: 'Do you still enjoy playing with your favorite toys or doing activities you used to like?',
      options: [
        { id: 'c2_0', text: 'Yes, just as much', value: 0 },
        { id: 'c2_1', text: 'A little less than before', value: 1 },
        { id: 'c2_2', text: 'Much less than before', value: 2 },
        { id: 'c2_3', text: 'Not at all', value: 3 }
      ]
    },
    {
      id: 'child_dep_3',
      text: 'How often do you have trouble sleeping?',
      options: [
        { id: 'c3_0', text: 'Never', value: 0 },
        { id: 'c3_1', text: 'Some nights', value: 1 },
        { id: 'c3_2', text: 'Most nights', value: 2 },
        { id: 'c3_3', text: 'Every night', value: 3 }
      ]
    },
    {
      id: 'child_dep_4',
      text: 'How is your appetite?',
      options: [
        { id: 'c4_0', text: 'I eat normally', value: 0 },
        { id: 'c4_1', text: 'I sometimes eat less/more than usual', value: 1 },
        { id: 'c4_2', text: 'I often eat less/more than usual', value: 2 },
        { id: 'c4_3', text: 'I hardly eat/eat too much', value: 3 }
      ]
    },
    {
      id: 'child_dep_5',
      text: 'Do you feel tired during the day?',
      options: [
        { id: 'c5_0', text: 'Not at all', value: 0 },
        { id: 'c5_1', text: 'Sometimes', value: 1 },
        { id: 'c5_2', text: 'Often', value: 2 },
        { id: 'c5_3', text: 'Always', value: 3 }
      ]
    },
    {
      id: 'child_dep_6',
      text: 'Do you feel like you can concentrate in school?',
      options: [
        { id: 'c6_0', text: 'Yes, just like always', value: 0 },
        { id: 'c6_1', text: 'A little harder than before', value: 1 },
        { id: 'c6_2', text: 'Much harder than before', value: 2 },
        { id: 'c6_3', text: 'Cannot concentrate at all', value: 3 }
      ]
    },
    {
      id: 'child_dep_7',
      text: 'Do you feel like playing with your friends?',
      options: [
        { id: 'c7_0', text: 'Yes, just like always', value: 0 },
        { id: 'c7_1', text: 'Sometimes less than before', value: 1 },
        { id: 'c7_2', text: 'Much less than before', value: 2 },
        { id: 'c7_3', text: 'Not at all', value: 3 }
      ]
    },
    {
      id: 'child_dep_8',
      text: 'Do you feel good about yourself?',
      options: [
        { id: 'c8_0', text: 'Yes, always', value: 0 },
        { id: 'c8_1', text: 'Sometimes', value: 1 },
        { id: 'c8_2', text: 'Not very often', value: 2 },
        { id: 'c8_3', text: 'Never', value: 3 }
      ]
    },
    {
      id: 'child_dep_9',
      text: 'Do you feel like bad things are your fault?',
      options: [
        { id: 'c9_0', text: 'Never', value: 0 },
        { id: 'c9_1', text: 'Sometimes', value: 1 },
        { id: 'c9_2', text: 'Often', value: 2 },
        { id: 'c9_3', text: 'Always', value: 3 }
      ]
    },
    {
      id: 'child_dep_10',
      text: 'Do you feel hopeful about the future?',
      options: [
        { id: 'c10_0', text: 'Yes, very hopeful', value: 0 },
        { id: 'c10_1', text: 'Somewhat hopeful', value: 1 },
        { id: 'c10_2', text: 'Not very hopeful', value: 2 },
        { id: 'c10_3', text: 'Not hopeful at all', value: 3 }
      ]
    }
  ],
  teen: [
    {
      id: 'teen_dep_1',
      text: 'How often have you felt down, depressed, or hopeless?',
      options: [
        { id: 't1_0', text: 'Not at all', value: 0 },
        { id: 't1_1', text: 'Several days', value: 1 },
        { id: 't1_2', text: 'More than half the days', value: 2 },
        { id: 't1_3', text: 'Nearly every day', value: 3 }
      ]
    }
  ],
  adult: [
    {
      id: 'adult_dep_1',
      text: 'Little interest or pleasure in doing things?',
      options: [
        { id: 'a1_0', text: 'Not at all', value: 0 },
        { id: 'a1_1', text: 'Several days', value: 1 },
        { id: 'a1_2', text: 'More than half the days', value: 2 },
        { id: 'a1_3', text: 'Nearly every day', value: 3 }
      ]
    }
  ],
  senior: [
    {
      id: 'senior_dep_1',
      text: 'How often do you feel lonely?',
      options: [
        { id: 's1_0', text: 'Rarely or never', value: 0 },
        { id: 's1_1', text: 'Sometimes', value: 1 },
        { id: 's1_2', text: 'Often', value: 2 },
        { id: 's1_3', text: 'Almost always', value: 3 }
      ]
    }
  ]
};

const anxietyQuestions: Record<AgeGroup, AssessmentQuestion[]> = {
  child: [
    {
      id: 'child_anx_1',
      text: 'How often do you feel worried or scared?',
      options: [
        { id: 'ca1_0', text: 'Not at all', value: 0 },
        { id: 'ca1_1', text: 'Sometimes', value: 1 },
        { id: 'ca1_2', text: 'Often', value: 2 },
        { id: 'ca1_3', text: 'Always', value: 3 }
      ]
    }
  ],
  teen: [],
  adult: [],
  senior: []
};

export const getAgeSpecificQuestions = (type: AssessmentType, ageGroup: AgeGroup): AssessmentQuestion[] => {
  return type === 'depression' ? depressionQuestions[ageGroup] : anxietyQuestions[ageGroup];
};

export const interpretDepressionResult = (score: number, ageGroup: AgeGroup): AssessmentResult => {
  const result: AssessmentResult = {
    score,
    severity: 'minimal',
    color: '#4CAF50',
    interpretation: '',
    recommendations: []
  };

  // Add exercise recommendations based on age group
  result.recommendations.push({
    type: 'exercise',
    title: 'Physical Activity Recommendations',
    description: 'Regular exercise can help improve mood and reduce symptoms of depression',
    exercises: exerciseRecommendations[ageGroup]
  });

  return result;
};

export const interpretAnxietyResult = (score: number, ageGroup: AgeGroup): AssessmentResult => {
  const result: AssessmentResult = {
    score,
    severity: 'minimal',
    color: '#2196F3',
    interpretation: '',
    recommendations: []
  };

  // Add exercise recommendations based on age group
  result.recommendations.push({
    type: 'exercise',
    title: 'Physical Activity Recommendations',
    description: 'Regular exercise can help reduce anxiety and promote relaxation',
    exercises: exerciseRecommendations[ageGroup]
  });

  return result;
};
