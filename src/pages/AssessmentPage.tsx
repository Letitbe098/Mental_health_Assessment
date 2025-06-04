import { CloudLightning } from "lucide-react";

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

export interface AgeGroupInfo {
  id: AgeGroup;
  label: string;
  description: string;
}

export interface TherapeuticRecommendation {
  type: 'color' | 'music' | 'breathing' | 'yoga' | 'exercise';
  title: string;
  description: string;
  duration?: string;
  imageUrl?: string;
  videoUrl?: string;
}

export interface AssessmentResult {
  score: number;
  severity: 'minimal' | 'mild' | 'moderate' | 'moderately severe' | 'severe';
  interpretation: string;
  color: string;
  recommendations: TherapeuticRecommendation[];
}

export const ageGroups: AgeGroupInfo[] = [
  {
    id: 'child',
    label: 'Children (6-12)',
    description: 'Age-appropriate questions for elementary school children'
  },
  {
    id: 'teen',
    label: 'Teenagers (13-17)',
    description: 'Tailored for adolescents and high school students'
  },
  {
    id: 'adult',
    label: 'Adults (18-64)',
    description: 'Standard assessment for adults'
  },
  {
    id: 'senior',
    label: 'Seniors (65+)',
    description: 'Adapted for older adults with age-specific considerations'
  }
];

// Standard PHQ-9 and GAD-7 options
const standardOptions: AssessmentOption[] = [
  { id: 'option0', text: 'Not at all', value: 0 },
  { id: 'option1', text: 'Several days', value: 1 },
  { id: 'option2', text: 'More than half the days', value: 2 },
  { id: 'option3', text: 'Nearly every day', value: 3 }
];

// Child-friendly options
const childOptions: AssessmentOption[] = [
  { id: 'option0', text: 'Never', value: 0 },
  { id: 'option1', text: 'Sometimes', value: 1 },
  { id: 'option2', text: 'A lot of times', value: 2 },
  { id: 'option3', text: 'Almost always', value: 3 }
];

// Depression questions for each age group
const depressionQuestions: Record<AgeGroup, AssessmentQuestion[]> = {
  child: [
    {
      id: 'child_dep_1',
      text: 'How often do you feel sad or unhappy?',
      options: childOptions
    },
    {
      id: 'child_dep_2',
      text: 'How often do you have trouble having fun or enjoying things?',
      options: childOptions
    },
    {
      id: 'child_dep_3',
      text: 'How often do you feel tired or have little energy?',
      options: childOptions
    },
    {
      id: 'child_dep_4',
      text: 'How often do you have trouble sleeping (falling asleep, staying asleep, or waking up too early)?',
      options: childOptions
    },
    {
      id: 'child_dep_5',
      text: 'How often do you not feel hungry or eat less than usual?',
      options: childOptions
    },
    {
      id: 'child_dep_6',
      text: 'How often do you feel bad about yourself or think you let people down?',
      options: childOptions
    },
    {
      id: 'child_dep_7',
      text: 'How often do you have trouble paying attention or concentrating?',
      options: childOptions
    },
    {
      id: 'child_dep_8',
      text: 'How often do you feel like moving or talking very slowly, or the opposite - feeling restless and moving around a lot?',
      options: childOptions
    },
    {
      id: 'child_dep_9',
      text: 'How often do you think about hurting yourself or that you would be better off not here?',
      options: childOptions
    },
    {
      id: 'child_dep_10',
      text: 'How often do you not want to play with friends or be around family?',
      options: childOptions
    }
  ],
  teen: [
    {
      id: 'teen_dep_1',
      text: 'How often have you felt down, depressed, irritable, or hopeless?',
      options: standardOptions
    },
    {
      id: 'teen_dep_2',
      text: 'How often have you had little interest or pleasure in doing things?',
      options: standardOptions
    },
    {
      id: 'teen_dep_3',
      text: 'How often have you had trouble falling asleep, staying asleep, or sleeping too much?',
      options: standardOptions
    },
    {
      id: 'teen_dep_4',
      text: 'How often have you felt tired or had little energy?',
      options: standardOptions
    },
    {
      id: 'teen_dep_5',
      text: 'How often have you had a poor appetite or been overeating?',
      options: standardOptions
    },
    {
      id: 'teen_dep_6',
      text: 'How often have you felt bad about yourself or felt that you are a failure or let yourself or your family down?',
      options: standardOptions
    },
    {
      id: 'teen_dep_7',
      text: 'How often have you had trouble concentrating on things like schoolwork, reading, or watching TV?',
      options: standardOptions
    },
    {
      id: 'teen_dep_8',
      text: 'How often have you moved or spoken so slowly that other people could have noticed, or the opposite – been so fidgety or restless that you\'ve been moving around a lot more than usual?',
      options: standardOptions
    },
    {
      id: 'teen_dep_9',
      text: 'How often have you had thoughts that you would be better off dead or of hurting yourself in some way?',
      options: standardOptions
    },
    {
      id: 'teen_dep_10',
      text: 'How often have you withdrawn from friends or social activities?',
      options: standardOptions
    }
  ],
  adult: [
    {
      id: 'adult_dep_1',
      text: 'Little interest or pleasure in doing things',
      options: standardOptions
    },
    {
      id: 'adult_dep_2',
      text: 'Feeling down, depressed, or hopeless',
      options: standardOptions
    },
    {
      id: 'adult_dep_3',
      text: 'Trouble falling or staying asleep, or sleeping too much',
      options: standardOptions
    },
    {
      id: 'adult_dep_4',
      text: 'Feeling tired or having little energy',
      options: standardOptions
    },
    {
      id: 'adult_dep_5',
      text: 'Poor appetite or overeating',
      options: standardOptions
    },
    {
      id: 'adult_dep_6',
      text: 'Feeling bad about yourself — or that you are a failure or have let yourself or your family down',
      options: standardOptions
    },
    {
      id: 'adult_dep_7',
      text: 'Trouble concentrating on things, such as reading the newspaper or watching television',
      options: standardOptions
    },
    {
      id: 'adult_dep_8',
      text: 'Moving or speaking so slowly that other people could have noticed. Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual',
      options: standardOptions
    },
    {
      id: 'adult_dep_9',
      text: 'Thoughts that you would be better off dead, or of hurting yourself in some way',
      options: standardOptions
    },
    {
      id: 'adult_dep_10',
      text: 'Difficulty maintaining relationships or withdrawing from social activities',
      options: standardOptions
    }
  ],
  senior: [
    {
      id: 'senior_dep_1',
      text: 'How often have you had little interest or pleasure in doing things?',
      options: standardOptions
    },
    {
      id: 'senior_dep_2',
      text: 'How often have you felt down, depressed, or hopeless?',
      options: standardOptions
    },
    {
      id: 'senior_dep_3',
      text: 'How often have you had trouble falling or staying asleep, or sleeping too much?',
      options: standardOptions
    },
    {
      id: 'senior_dep_4',
      text: 'How often have you felt tired or had little energy?',
      options: standardOptions
    },
    {
      id: 'senior_dep_5',
      text: 'How often have you had poor appetite or been overeating?',
      options: standardOptions
    },
    {
      id: 'senior_dep_6',
      text: 'How often have you felt bad about yourself or that you are a failure or have let yourself or your family down?',
      options: standardOptions
    },
    {
      id: 'senior_dep_7',
      text: 'How often have you had trouble concentrating on things, such as reading the newspaper or watching television?',
      options: standardOptions
    },
    {
      id: 'senior_dep_8',
      text: 'How often have you moved or spoken so slowly that other people could have noticed, or the opposite – been so fidgety or restless that you have been moving around a lot more than usual?',
      options: standardOptions
    },
    {
      id: 'senior_dep_9',
      text: 'How often have you had thoughts that you would be better off dead or of hurting yourself in some way?',
      options: standardOptions
    },
    {
      id: 'senior_dep_10',
      text: 'How often have you felt isolated or lonely?',
      options: standardOptions
    }
  ]
};

// Anxiety questions for each age group
const anxietyQuestions: Record<AgeGroup, AssessmentQuestion[]> = {
  child: [
    {
      id: 'child_anx_1',
      text: 'How often do you feel nervous, anxious, or scared?',
      options: childOptions
    },
    {
      id: 'child_anx_2',
      text: 'How often do you worry about things that might happen?',
      options: childOptions
    },
    {
      id: 'child_anx_3',
      text: 'How often do you feel like it\'s hard to stop worrying?',
      options: childOptions
    },
    {
      id: 'child_anx_4',
      text: 'How often do you have trouble relaxing or sitting still?',
      options: childOptions
    },
    {
      id: 'child_anx_5',
      text: 'How often do you feel so restless it\'s hard to sit still?',
      options: childOptions
    },
    {
      id: 'child_anx_6',
      text: 'How often do you feel annoyed or easily upset?',
      options: childOptions
    },
    {
      id: 'child_anx_7',
      text: 'How often do you feel afraid, like something awful might happen?',
      options: childOptions
    },
    {
      id: 'child_anx_8',
      text: 'How often do you get stomachaches or headaches when you\'re worried?',
      options: childOptions
    },
    {
      id: 'child_anx_9',
      text: 'How often do you not want to go to school because you feel nervous or afraid?',
      options: childOptions
    },
    {
      id: 'child_anx_10',
      text: 'How often do you have trouble sleeping because you\'re worried?',
      options: childOptions
    }
  ],
  teen: [
    {
      id: 'teen_anx_1',
      text: 'How often have you felt nervous, anxious, or on edge?',
      options: standardOptions
    },
    {
      id: 'teen_anx_2',
      text: 'How often have you not been able to stop or control worrying?',
      options: standardOptions
    },
    {
      id: 'teen_anx_3',
      text: 'How often have you worried too much about different things?',
      options: standardOptions
    },
    {
      id: 'teen_anx_4',
      text: 'How often have you had trouble relaxing?',
      options: standardOptions
    },
    {
      id: 'teen_anx_5',
      text: 'How often have you been so restless that it\'s hard to sit still?',
      options: standardOptions
    },
    {
      id: 'teen_anx_6',
      text: 'How often have you become easily annoyed or irritable?',
      options: standardOptions
    },
    {
      id: 'teen_anx_7',
      text: 'How often have you felt afraid, as if something awful might happen?',
      options: standardOptions
    },
    {
      id: 'teen_anx_8',
      text: 'How often have you experienced physical symptoms like racing heart, sweating, or trouble breathing when anxious?',
      options: standardOptions
    },
    {
      id: 'teen_anx_9',
      text: 'How often have you avoided situations that make you anxious?',
      options: standardOptions
    },
    {
      id: 'teen_anx_10',
      text: 'How often have you had trouble performing in school or social situations due to anxiety?',
      options: standardOptions
    }
  ],
  adult: [
    {
      id: 'adult_anx_1',
      text: 'Feeling nervous, anxious, or on edge',
      options: standardOptions
    },
    {
      id: 'adult_anx_2',
      text: 'Not being able to stop or control worrying',
      options: standardOptions
    },
    {
      id: 'adult_anx_3',
      text: 'Worrying too much about different things',
      options: standardOptions
    },
    {
      id: 'adult_anx_4',
      text: 'Trouble relaxing',
      options: standardOptions
    },
    {
      id: 'adult_anx_5',
      text: 'Being so restless that it is hard to sit still',
      options: standardOptions
    },
    {
      id: 'adult_anx_6',
      text: 'Becoming easily annoyed or irritable',
      options: standardOptions
    },
    {
      id: 'adult_anx_7',
      text: 'Feeling afraid, as if something awful might happen',
      options: standardOptions
    },
    {
      id: 'adult_anx_8',
      text: 'Experiencing physical symptoms such as increased heart rate, sweating, or shortness of breath',
      options: standardOptions
    },
    {
      id: 'adult_anx_9',
      text: 'Avoiding situations or activities due to anxiety',
      options: standardOptions
    },
    {
      id: 'adult_anx_10',
      text: 'Difficulty performing at work or in social situations due to anxiety',
      options: standardOptions
    }
  ],
  senior: [
    {
      id: 'senior_anx_1',
      text: 'How often have you felt nervous, anxious, or on edge?',
      options: standardOptions
    },
    {
      id: 'senior_anx_2',
      text: 'How often have you not been able to stop or control worrying?',
      options: standardOptions
    },
    {
      id: 'senior_anx_3',
      text: 'How often have you worried too much about different things?',
      options: standardOptions
    },
    {
      id: 'senior_anx_4',
      text: 'How often have you had trouble relaxing?',
      options: standardOptions
    },
    {
      id: 'senior_anx_5',
      text: 'How often have you been so restless that it\'s hard to sit still?',
      options: standardOptions
    },
    {
      id: 'senior_anx_6',
      text: 'How often have you become easily annoyed or irritable?',
      options: standardOptions
    },
    {
      id: 'senior_anx_7',
      text: 'How often have you felt afraid, as if something awful might happen?',
      options: standardOptions
    },
    {
      id: 'senior_anx_8',
      text: 'How often have you worried about your health or medical conditions?',
      options: standardOptions
    },
    {
      id: 'senior_anx_9',
      text: 'How often have you worried about being a burden to others?',
      options: standardOptions
    },
    {
      id: 'senior_anx_10',
      text: 'How often have you avoided activities or social events due to anxiety?',
      options: standardOptions
    }
  ]
};

export const getAgeSpecificQuestions = (
  assessmentType: AssessmentType,
  ageGroup: AgeGroup
): AssessmentQuestion[] => {
  if (assessmentType === 'depression') {
    return depressionQuestions[ageGroup];
  } else {
    return anxietyQuestions[ageGroup];
  }
};

// Depression result interpretation
export const interpretDepressionResult = (
  score: number,
  ageGroup: AgeGroup
): AssessmentResult => {
  let severity: AssessmentResult['severity'] = 'minimal';
  let interpretation = '';
  let color = '#4ADE80'; // Success green for minimal
  let recommendations: TherapeuticRecommendation[] = [];

  // Determine severity based on score
  if (score <= 4) {
    severity = 'minimal';
    interpretation = 'Your symptoms suggest minimal depression. Continue monitoring your mood and practicing self-care.';
    color = '#4ADE80'; // Success green
  } else if (score <= 9) {
    severity = 'mild';
    interpretation = 'Your symptoms suggest mild depression. Consider some self-care strategies and monitoring your mood.';
    color = '#34D399'; // Light green
  } else if (score <= 14) {
    severity = 'moderate';
    interpretation = 'Your symptoms suggest moderate depression. Consider speaking with a mental health professional.';
    color = '#FBBF24'; // Yellow
  } else if (score <= 19) {
    severity = 'moderately severe';
    interpretation = 'Your symptoms suggest moderately severe depression. We recommend consulting with a mental health professional soon.';
    color = '#FB923C'; // Orange
  } else {
    severity = 'severe';
    interpretation = 'Your symptoms suggest severe depression. We strongly recommend speaking with a mental health professional as soon as possible.';
    color = '#F87171'; // Red
  }

  // Age-specific recommendations
  if (ageGroup === 'child') {
    recommendations = [
      {
        type: 'color',
        title: 'Colorful Activities',
        description: 'Spend time with bright, cheerful colors through drawing, coloring books, or games.',
        duration: '15-20 minutes daily',
        imageUrl: 'https://images.pexels.com/photos/159579/crayons-coloring-book-coloring-book-159579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        videoUrl: 'https://www.youtube.com/watch?v=N1w-hDiJ4dM'
      },
      {
        type: 'music',
        title: 'Happy Music Time',
        description: 'Listen to upbeat, positive music and dance or move to the rhythm.',
        duration: '10-15 minutes daily',
        videoUrl: 'https://www.youtube.com/watch?v=71hqRT9U0wg'
      },
      {
        type: 'breathing',
        title: 'Bubble Breathing',
        description: 'Pretend you\'re blowing bubbles - take a deep breath in and slowly blow out.',
        duration: '5 minutes, 3 times a day',
        videoUrl: 'https://www.youtube.com/watch?v=5DqTuWve9t8'
      },
      {
        type: 'exercise',
        title: 'Animal Movements',
        description: 'Jump like a frog, walk like a bear, or slither like a snake to get moving.',
        duration: '10 minutes daily',
        videoUrl: 'https://www.youtube.com/watch?v=26guG6wr5so'
      }
    ];
  } else if (ageGroup === 'teen') {
    recommendations = [
      {
        type: 'color',
        title: 'Art Expression',
        description: 'Express your feelings through art using colors that match your mood or emotions.',
        duration: '20-30 minutes daily',
        imageUrl: 'https://images.pexels.com/photos/6003/brown-white-colorful-artistic.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        videoUrl: 'https://www.youtube.com/watch?v=n-WHOMCFqLM'
      },
      {
        type: 'music',
        title: 'Personal Playlist',
        description: 'Create a playlist of songs that lift your mood and help you feel motivated.',
        duration: '30 minutes daily',
        videoUrl: 'https://www.youtube.com/watch?v=xhrBDcQq2DM'
      },
      {
        type: 'breathing',
        title: '4-7-8 Breathing',
        description: 'Breathe in for 4 counts, hold for 7, and exhale for 8 to reduce stress and anxiety.',
        duration: '5 minutes, 3 times a day',
        videoUrl: 'https://www.youtube.com/watch?v=PmBYdfv5RSk'
      },
      {
        type: 'exercise',
        title: 'Activity Boosters',
        description: 'Short bursts of physical activity like push-ups, jumping jacks, or dancing.',
        duration: '15 minutes daily',
        videoUrl: 'https://www.youtube.com/watch?v=ml6cT4AZdqI'
      }
    ];
  } else if (ageGroup === 'adult') {
    recommendations = [
      {
        type: 'color',
        title: 'Color Mindfulness',
        description: 'Engage in adult coloring books or artwork to promote mindfulness and relaxation.',
        duration: '20-30 minutes daily',
        imageUrl: 'https://images.pexels.com/photos/1631677/pexels-photo-1631677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        videoUrl: 'https://www.youtube.com/watch?v=w6VcbH2ypMg'
      },
      {
        type: 'music',
        title: 'Mood Enhancement',
        description: 'Listen to music that elevates your mood, whether classical, jazz, or your favorite genre.',
        duration: '30 minutes daily',
        videoUrl: 'https://www.youtube.com/watch?v=lFcSrYw-ARY'
      },
      {
        type: 'breathing',
        title: 'Diaphragmatic Breathing',
        description: 'Deep belly breathing to activate your parasympathetic nervous system and reduce stress.',
        duration: '10 minutes, twice daily',
        videoUrl: 'https://www.youtube.com/watch?v=acUZdGd_3Gk'
      },
      {
        type: 'yoga',
        title: 'Gentle Yoga Flow',
        description: 'Simple yoga poses to increase energy, improve mood, and reduce tension.',
        duration: '15-20 minutes daily',
        videoUrl: 'https://www.youtube.com/watch?v=inpok4MKVLM'
      }
    ];
  } else {
    recommendations = [
      {
        type: 'color',
        title: 'Colorful Environments',
        description: 'Surround yourself with colors that bring joy - flowers, artwork, or bright decor.',
        duration: 'Throughout the day',
        imageUrl: 'https://images.pexels.com/photos/1179549/pexels-photo-1179549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        videoUrl: 'https://www.youtube.com/watch?v=Kkc2KinHWiM'
      },
      {
        type: 'music',
        title: 'Music Memories',
        description: 'Listen to music from your youth or songs that bring back positive memories.',
        duration: '30 minutes daily',
        videoUrl: 'https://www.youtube.com/watch?v=h_D3VFfhvs4'
      },
      {
        type: 'breathing',
        title: 'Seated Breathing',
        description: 'Gentle breathing exercises that can be done while seated to promote relaxation.',
        duration: '5-10 minutes, 3 times daily',
        videoUrl: 'https://www.youtube.com/watch?v=RQoP9iLwoos'
      },
      {
        type: 'exercise',
        title: 'Gentle Movement',
        description: 'Chair exercises, gentle stretching, or short walks to maintain mobility and mood.',
        duration: '10-15 minutes, twice daily',
        videoUrl: 'https://www.youtube.com/watch?v=azv8eJgoGLk'
      }
    ];
  }

  return {
    score,
    severity,
    interpretation,
    color,
    recommendations
  };
};

// Anxiety result interpretation
export const interpretAnxietyResult = (
  score: number,
  ageGroup: AgeGroup
): AssessmentResult => {
  let severity: AssessmentResult['severity'] = 'minimal';
  let interpretation = '';
  let color = '#4ADE80'; // Success green for minimal
  let recommendations: TherapeuticRecommendation[] = [];

  // Determine severity based on score
  if (score <= 4) {
    severity = 'minimal';
    interpretation = 'Your symptoms suggest minimal anxiety. Continue monitoring your feelings and practicing self-care.';
    color = '#4ADE80'; // Success green
  } else if (score <= 9) {
    severity = 'mild';
    interpretation = 'Your symptoms suggest mild anxiety. Consider some self-care strategies and monitoring your feelings.';
    color = '#34D399'; // Light green
  } else if (score <= 14) {
    severity = 'moderate';
    interpretation = 'Your symptoms suggest moderate anxiety. Consider speaking with a mental health professional.';
    color = '#FBBF24'; // Yellow
  } else if (score <= 19) {
    severity = 'moderately severe';
    interpretation = 'Your symptoms suggest moderately severe anxiety. We recommend consulting with a mental health professional soon.';
    color = '#FB923C'; // Orange
  } else {
    severity = 'severe';
    interpretation = 'Your symptoms suggest severe anxiety. We strongly recommend speaking with a mental health professional as soon as possible.';
    color = '#F87171'; // Red
  }

  // Age-specific recommendations
  if (ageGroup === 'child') {
    recommendations = [
      {
        type: 'color',
        title: 'Calm Coloring',
        description: 'Use blues and greens in coloring activities to create a sense of calm.',
        duration: '15-20 minutes daily',
        imageUrl: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        videoUrl: 'https://www.youtube.com/watch?v=WRfFuhrdGKM'
      },
      {
        type: 'music',
        title: 'Calming Sounds',
        description: 'Listen to gentle music or nature sounds before bed or when feeling worried.',
        duration: '15 minutes, twice daily',
        videoUrl: 'https://www.youtube.com/watch?v=lFcSrYw-ARY'
      },
      {
        type: 'breathing',
        title: 'Star Breathing',
        description: 'Trace a star with your finger while taking 5 deep breaths - in as you trace up, out as you trace down.',
        duration: '5 minutes, 3 times a day',
        videoUrl: 'https://www.youtube.com/watch?v=Uxbdx-SeOOo'
      },
      {
        type: 'exercise',
        title: 'Stretchy Animals',
        description: 'Stretch like different animals - reach tall like a giraffe or curl up like a cat.',
        duration: '10 minutes daily',
        videoUrl: 'https://www.youtube.com/watch?v=xELgfiXSw-s'
      }
    ];
  } else if (ageGroup === 'teen') {
    recommendations = [
      {
        type: 'color',
        title: 'Blue Space',
        description: 'Spend time in blue spaces - whether looking at pictures of oceans/lakes or actually visiting water.',
        duration: '20 minutes daily',
        imageUrl: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        videoUrl: 'https://www.youtube.com/watch?v=f77SKdyn-1Y'
      },
      {
        type: 'music',
        title: 'Anxiety Playlist',
        description: 'Create a playlist of songs that help you feel grounded and calm during anxious moments.',
        duration: '20-30 minutes daily',
        videoUrl: 'https://www.youtube.com/watch?v=kT1uq1pCJss'
      },
      {
        type: 'breathing',
        title: 'Box Breathing',
        description: 'Breathe in for 4, hold for 4, breathe out for 4, hold for 4 - visualize tracing a box.',
        duration: '5 minutes, 3 times daily',
        videoUrl: 'https://www.youtube.com/watch?v=tEmt1Znux58'
      },
      {
        type: 'yoga',
        title: 'Grounding Poses',
        description: 'Simple yoga poses that help you feel connected to the ground and present in your body.',
        duration: '15 minutes daily',
        videoUrl: 'https://www.youtube.com/watch?v=sTANio_2E0Q'
      }
    ];
  } else if (ageGroup === 'adult') {
    recommendations = [
      {
        type: 'color',
        title: 'Nature Greens',
        description: 'Spend time in natural green environments or bring plants into your home/workspace.',
        duration: '30 minutes daily',
        imageUrl: 'https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        videoUrl: 'https://www.youtube.com/watch?v=NeV4ECOsmeBM'
      },
      {
        type: 'music',
        title: 'Anxiety Relief',
        description: 'Listen to music specifically composed to reduce anxiety (60 bpm).',
        duration: '20 minutes daily',
        videoUrl: 'https://www.youtube.com/watch?v=lFcSrYw-ARY'
      },
      {
        type: 'breathing',
        title: 'Alternate Nostril Breathing',
        description: 'A yogic breathing technique that helps balance the nervous system and reduce anxiety.',
        duration: '5-10 minutes daily',
        videoUrl: 'https://www.youtube.com/watch?v=G8xIEzX40A0'
      },
      {
        type: 'yoga',
        title: 'Anxiety-Reducing Flow',
        description: 'A sequence of yoga poses designed specifically to reduce anxiety and promote calm.',
        duration: '20-30 minutes daily',
        videoUrl: 'https://www.youtube.com/watch?v=hJbRpHZr_d0'
      }
    ];
  } else {
    recommendations = [
      {
        type: 'color',
        title: 'Lavender Calm',
        description: 'Incorporate lavender colors or scents into your environment for their calming properties.',
        duration: 'Throughout the day',
        imageUrl: 'https://images.pexels.com/photos/4016596/pexels-photo-4016596.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        videoUrl: 'https://www.youtube.com/watch?v=O-WqbsWQGAc'
      },
      {
        type: 'music',
        title: 'Classical Relaxation',
        description: 'Listen to gentle classical music, particularly Bach or Mozart, to reduce anxiety.',
        duration: '30 minutes daily',
        videoUrl: 'https://www.youtube.com/watch?v=jgpJVI3tDbY'
      },
      {
        type: 'breathing',
        title: 'Counted Breathing',
        description: 'Simple counted breaths - in for 4, out for 6 - to activate the parasympathetic system.',
        duration: '5 minutes, 3 times daily',
        videoUrl: 'https://www.youtube.com/watch?v=Wemm-i6XHr8'
      },
      {
        type: 'exercise',
        title: 'Gentle Chair Yoga',
        description: 'Simple stretches and movements that can be done while seated to release tension.',
        duration: '10-15 minutes daily',
        videoUrl: 'https://www.youtube.com/watch?v=1DYH5ud3zHo'
      }
    ];
  }

  return {
    score,
    severity,
    interpretation,
    color,
    recommendations
  };
};
