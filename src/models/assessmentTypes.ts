// src/models/assessmentTypes.ts

export type AgeGroup = 'child' | 'teen' | 'adult' | 'senior';
export type AssessmentType = 'depression' | 'anxiety';

export interface AssessmentQuestion {
  id: string;
  text: string;
  options: { value: number; label: string }[];
}

export interface Recommendation {
  type: string;
  title: string;
  description: string;
  videoUrl?: string;
  duration?: string;
}

export interface AssessmentResult {
  score: number;
  severity: string;
  interpretation: string;
  color: string;
  recommendations: Recommendation[];
}

const baseOptions = [
  { value: 0, label: 'Never' },
  { value: 1, label: 'Rarely' },
  { value: 2, label: 'Sometimes' },
  { value: 3, label: 'Often' },
];

// --- QUESTIONS ---

const depressionQuestions = {
  child: [
    { id: 'd-c-1', text: 'Do you feel sad or unhappy even when good things happen?', options: baseOptions },
    { id: 'd-c-2', text: 'Do you find it hard to enjoy playing with friends?', options: baseOptions },
    { id: 'd-c-3', text: 'Do you feel tired or have little energy?', options: baseOptions },
    { id: 'd-c-4', text: 'Do you have trouble sleeping or sleep too much?', options: baseOptions },
    { id: 'd-c-5', text: 'Do you get upset easily or cry a lot?', options: baseOptions },
    { id: 'd-c-6', text: 'Do you feel nobody likes you?', options: baseOptions },
    { id: 'd-c-7', text: 'Do you have trouble paying attention in class?', options: baseOptions },
    { id: 'd-c-8', text: 'Do you feel lonely, even around others?', options: baseOptions },
    { id: 'd-c-9', text: 'Do you worry a lot about making mistakes?', options: baseOptions },
    { id: 'd-c-10', text: 'Do you feel like you are not good at things?', options: baseOptions },
  ],
  teen: [
    { id: 'd-t-1', text: 'Do you feel hopeless about the future?', options: baseOptions },
    { id: 'd-t-2', text: 'Do you avoid friends or family?', options: baseOptions },
    { id: 'd-t-3', text: 'Do you feel tired or lack motivation?', options: baseOptions },
    { id: 'd-t-4', text: 'Do you have trouble concentrating on schoolwork?', options: baseOptions },
    { id: 'd-t-5', text: 'Do you feel worthless or guilty?', options: baseOptions },
    { id: 'd-t-6', text: 'Do you have changes in your eating habits?', options: baseOptions },
    { id: 'd-t-7', text: 'Do you feel restless or agitated?', options: baseOptions },
    { id: 'd-t-8', text: 'Do you feel like life isn’t worth living?', options: baseOptions },
    { id: 'd-t-9', text: 'Do you have trouble sleeping or sleep too much?', options: baseOptions },
    { id: 'd-t-10', text: 'Do you feel like you can’t do anything right?', options: baseOptions },
  ],
  adult: [
    { id: 'd-a-1', text: 'Do you feel down, depressed, or hopeless?', options: baseOptions },
    { id: 'd-a-2', text: 'Do you have little interest or pleasure in doing things?', options: baseOptions },
    { id: 'd-a-3', text: 'Do you have trouble falling or staying asleep, or sleep too much?', options: baseOptions },
    { id: 'd-a-4', text: 'Do you feel tired or have little energy?', options: baseOptions },
    { id: 'd-a-5', text: 'Do you have poor appetite or overeat?', options: baseOptions },
    { id: 'd-a-6', text: 'Do you feel bad about yourself, or that you are a failure?', options: baseOptions },
    { id: 'd-a-7', text: 'Do you have trouble concentrating on things?', options: baseOptions },
    { id: 'd-a-8', text: 'Do you move or speak so slowly that others notice, or the opposite?', options: baseOptions },
    { id: 'd-a-9', text: 'Do you have thoughts that you would be better off dead?', options: baseOptions },
    { id: 'd-a-10', text: 'Do you find it hard to get through daily tasks?', options: baseOptions },
  ],
  senior: [
    { id: 'd-s-1', text: 'Do you feel sad or empty most of the time?', options: baseOptions },
    { id: 'd-s-2', text: 'Do you have trouble enjoying things you used to like?', options: baseOptions },
    { id: 'd-s-3', text: 'Do you feel tired or have less energy than usual?', options: baseOptions },
    { id: 'd-s-4', text: 'Do you have trouble sleeping or sleep more than usual?', options: baseOptions },
    { id: 'd-s-5', text: 'Do you feel anxious or worried?', options: baseOptions },
    { id: 'd-s-6', text: 'Do you feel hopeless about the future?', options: baseOptions },
    { id: 'd-s-7', text: 'Do you have trouble remembering things?', options: baseOptions },
    { id: 'd-s-8', text: 'Do you feel lonely even when with others?', options: baseOptions },
    { id: 'd-s-9', text: 'Do you feel like a burden to others?', options: baseOptions },
    { id: 'd-s-10', text: 'Do you have trouble making decisions?', options: baseOptions },
  ],
};

const anxietyQuestions = {
  child: [
    { id: 'a-c-1', text: 'Do you worry a lot about things?', options: baseOptions },
    { id: 'a-c-2', text: 'Do you feel scared to be away from your parents?', options: baseOptions },
    { id: 'a-c-3', text: 'Do you get nervous when meeting new people?', options: baseOptions },
    { id: 'a-c-4', text: 'Do you have trouble sleeping because of worries?', options: baseOptions },
    { id: 'a-c-5', text: 'Do you feel your heart beating fast when worried?', options: baseOptions },
    { id: 'a-c-6', text: 'Do you avoid things that make you nervous?', options: baseOptions },
    { id: 'a-c-7', text: 'Do you feel sick (stomachache, headache) when worried?', options: baseOptions },
    { id: 'a-c-8', text: 'Do you need a lot of reassurance from adults?', options: baseOptions },
    { id: 'a-c-9', text: 'Do you worry about making mistakes?', options: baseOptions },
    { id: 'a-c-10', text: 'Do you get upset easily when things change?', options: baseOptions },
  ],
  teen: [
    { id: 'a-t-1', text: 'Do you feel nervous or anxious in social situations?', options: baseOptions },
    { id: 'a-t-2', text: 'Do you worry about exams or schoolwork a lot?', options: baseOptions },
    { id: 'a-t-3', text: 'Do you have trouble relaxing?', options: baseOptions },
    { id: 'a-t-4', text: 'Do you avoid activities because of fear or worry?', options: baseOptions },
    { id: 'a-t-5', text: 'Do you feel restless or on edge?', options: baseOptions },
    { id: 'a-t-6', text: 'Do you have trouble sleeping due to worries?', options: baseOptions },
    { id: 'a-t-7', text: 'Do you get irritable when anxious?', options: baseOptions },
    { id: 'a-t-8', text: 'Do you feel your mind goes blank when stressed?', options: baseOptions },
    { id: 'a-t-9', text: 'Do you worry about what others think of you?', options: baseOptions },
    { id: 'a-t-10', text: 'Do you have physical symptoms (sweating, shaking) when anxious?', options: baseOptions },
  ],
  adult: [
    { id: 'a-a-1', text: 'Do you feel nervous, anxious, or on edge?', options: baseOptions },
    { id: 'a-a-2', text: 'Do you worry too much about different things?', options: baseOptions },
    { id: 'a-a-3', text: 'Do you have trouble controlling your worries?', options: baseOptions },
    { id: 'a-a-4', text: 'Do you have difficulty relaxing?', options: baseOptions },
    { id: 'a-a-5', text: 'Do you feel restless or unable to sit still?', options: baseOptions },
    { id: 'a-a-6', text: 'Do you get easily annoyed or irritable?', options: baseOptions },
    { id: 'a-a-7', text: 'Do you feel afraid as if something awful might happen?', options: baseOptions },
    { id: 'a-a-8', text: 'Do you have trouble falling or staying asleep?', options: baseOptions },
    { id: 'a-a-9', text: 'Do you experience racing thoughts?', options: baseOptions },
    { id: 'a-a-10', text: 'Do you have physical symptoms (sweating, trembling) when anxious?', options: baseOptions },
  ],
  senior: [
    { id: 'a-s-1', text: 'Do you worry about your health or family?', options: baseOptions },
    { id: 'a-s-2', text: 'Do you feel nervous or anxious often?', options: baseOptions },
    { id: 'a-s-3', text: 'Do you have trouble relaxing or unwinding?', options: baseOptions },
    { id: 'a-s-4', text: 'Do you feel restless or on edge?', options: baseOptions },
    { id: 'a-s-5', text: 'Do you avoid activities due to fear or worry?', options: baseOptions },
    { id: 'a-s-6', text: 'Do you have trouble sleeping because of worries?', options: baseOptions },
    { id: 'a-s-7', text: 'Do you feel your heart racing or palpitations?', options: baseOptions },
    { id: 'a-s-8', text: 'Do you get easily startled?', options: baseOptions },
    { id: 'a-s-9', text: 'Do you worry about being alone?', options: baseOptions },
    { id: 'a-s-10', text: 'Do you have physical symptoms (sweating, shaking) when anxious?', options: baseOptions },
  ],
};

export const getAgeSpecificQuestions = (
  type: AssessmentType,
  ageGroup: AgeGroup
): AssessmentQuestion[] => {
  if (type === 'depression') return depressionQuestions[ageGroup];
  if (type === 'anxiety') return anxietyQuestions[ageGroup];
  return [];
};

// --- RECOMMENDATIONS ---

function getSeverity(score: number): { severity: string; color: string } {
  if (score < 7) return { severity: 'mild', color: '#4caf50' };
  if (score < 15) return { severity: 'moderate', color: '#ff9800' };
  return { severity: 'severe', color: '#f44336' };
}

export const interpretDepressionResult = (
  score: number,
  ageGroup: AgeGroup
): AssessmentResult => {
  const { severity, color } = getSeverity(score);
  let interpretation = '';
  let recommendations: Recommendation[] = [];

  if (severity === 'mild') interpretation = 'Mild symptoms. Practice self-care and monitor your feelings.';
  if (severity === 'moderate') interpretation = 'Moderate symptoms. Consider talking to someone you trust or a counselor.';
  if (severity === 'severe') interpretation = 'Severe symptoms. Please seek professional help as soon as possible.';

  // Recommendations by age group and severity
  const recs = {
    child: {
      mild: [
        {
          type: 'music',
          title: 'Happy Songs for Kids',
          description: 'Listen to cheerful music to lift your mood.',
          videoUrl: 'https://www.youtube.com/embed/8ybW48rKBME',
          duration: '10 min',
        },
      ],
      moderate: [
        {
          type: 'breathing',
          title: 'Balloon Breathing Exercise',
          description: 'Try this fun breathing exercise to relax.',
          videoUrl: 'https://www.youtube.com/embed/RVA2N6tX2cg',
          duration: '5 min',
        },
        {
          type: 'story',
          title: 'Calm Down Story',
          description: 'Listen to a calming story.',
          videoUrl: 'https://www.youtube.com/embed/1KaOrSuWZeM',
          duration: '8 min',
        },
      ],
      severe: [
        {
          type: 'talk',
          title: 'Talk to a Trusted Adult',
          description: 'It’s important to share your feelings with someone you trust.',
        },
        {
          type: 'breathing',
          title: 'Guided Breathing for Kids',
          description: 'Practice deep breathing with this video.',
          videoUrl: 'https://www.youtube.com/embed/CvF9AEe-ozc',
          duration: '5 min',
        },
      ],
    },
    teen: {
      mild: [
        {
          type: 'journaling',
          title: 'Journaling for Teens',
          description: 'Write down your thoughts and feelings.',
        },
        {
          type: 'music',
          title: 'Mood Boost Music',
          description: 'Listen to music that makes you feel good.',
          videoUrl: 'https://www.youtube.com/embed/2Vv-BfVoq4g',
          duration: '10 min',
        },
      ],
      moderate: [
        {
          type: 'yoga',
          title: 'Yoga for Teens',
          description: 'Try this yoga routine to relax.',
          videoUrl: 'https://www.youtube.com/embed/v7AYKMP6rOE',
          duration: '15 min',
        },
        {
          type: 'talk',
          title: 'Talk to a Counselor',
          description: 'Reach out to a school counselor or trusted adult.',
        },
      ],
      severe: [
        {
          type: 'helpline',
          title: 'Reach Out for Help',
          description: 'Contact a mental health helpline or professional.',
        },
        {
          type: 'meditation',
          title: 'Guided Meditation for Teens',
          description: 'Try this meditation to calm your mind.',
          videoUrl: 'https://www.youtube.com/embed/92i5m3tV5XY',
          duration: '10 min',
        },
      ],
    },
    adult: {
      mild: [
        {
          type: 'exercise',
          title: 'Light Exercise',
          description: 'Try a short walk or stretching.',
          videoUrl: 'https://www.youtube.com/embed/2L2lnxIcNmo',
          duration: '10 min',
        },
        {
          type: 'meditation',
          title: 'Guided Meditation',
          description: 'Practice mindfulness meditation.',
          videoUrl: 'https://www.youtube.com/embed/inpok4MKVLM',
          duration: '10 min',
        },
      ],
      moderate: [
        {
          type: 'yoga',
          title: 'Yoga for Mood',
          description: 'Follow this yoga session to boost your mood.',
          videoUrl: 'https://www.youtube.com/embed/4pLUleLdwY4',
          duration: '15 min',
        },
        {
          type: 'talk',
          title: 'Talk to a Friend or Therapist',
          description: 'Share your feelings with someone you trust.',
        },
      ],
      severe: [
        {
          type: 'helpline',
          title: 'Contact a Mental Health Professional',
          description: 'Please seek immediate help from a professional.',
        },
        {
          type: 'meditation',
          title: 'Deep Relaxation Meditation',
          description: 'Try this deep relaxation session.',
          videoUrl: 'https://www.youtube.com/embed/ZToicYcHIOU',
          duration: '15 min',
        },
      ],
    },
    senior: {
      mild: [
        {
          type: 'music',
          title: 'Relaxing Music for Seniors',
          description: 'Listen to soothing music.',
          videoUrl: 'https://www.youtube.com/embed/2OEL4P1Rz04',
          duration: '10 min',
        },
        {
          type: 'breathing',
          title: 'Gentle Breathing Exercise',
          description: 'Practice gentle breathing.',
          videoUrl: 'https://www.youtube.com/embed/SEfs5TJZ6Nk',
          duration: '7 min',
        },
      ],
      moderate: [
        {
          type: 'talk',
          title: 'Connect with Family',
          description: 'Reach out to family or friends for support.',
        },
        {
          type: 'stretch',
          title: 'Gentle Stretching',
          description: 'Try these stretches for relaxation.',
          videoUrl: 'https://www.youtube.com/embed/6fbM6D5eYuw',
          duration: '10 min',
        },
      ],
      severe: [
        {
          type: 'helpline',
          title: 'Contact a Healthcare Provider',
          description: 'Please contact your doctor or a mental health professional.',
        },
        {
          type: 'meditation',
          title: 'Guided Meditation for Seniors',
          description: 'Try this calming meditation.',
          videoUrl: 'https://www.youtube.com/embed/MIr3RsUWrdo',
          duration: '10 min',
        },
      ],
    },
  };

  recommendations = recs[ageGroup][severity];

  return {
    score,
    severity,
    interpretation,
    color,
    recommendations,
  };
};

export const interpretAnxietyResult = (
  score: number,
  ageGroup: AgeGroup
): AssessmentResult => {
  const { severity, color } = getSeverity(score);
  let interpretation = '';
  let recommendations: Recommendation[] = [];

  if (severity === 'mild') interpretation = 'Mild anxiety. Practice daily relaxation techniques.';
  if (severity === 'moderate') interpretation = 'Moderate anxiety. Try stress management and seek support if needed.';
  if (severity === 'severe') interpretation = 'Severe anxiety. Please seek professional support.';

  // Recommendations by age group and severity
  const recs = {
    child: {
      mild: [
        {
          type: 'breathing',
          title: 'Bubble Breathing',
          description: 'Try this fun breathing exercise.',
          videoUrl: 'https://www.youtube.com/embed/CvF9AEe-ozc',
          duration: '5 min',
        },
      ],
      moderate: [
        {
          type: 'story',
          title: 'Worry Monster Story',
          description: 'Listen to a story to calm your worries.',
          videoUrl: 'https://www.youtube.com/embed/1KaOrSuWZeM',
          duration: '8 min',
        },
        {
          type: 'talk',
          title: 'Talk to a Trusted Adult',
          description: 'Share your worries with a parent or teacher.',
        },
      ],
      severe: [
        {
          type: 'helpline',
          title: 'Reach Out for Help',
          description: 'Ask an adult to help you talk to a counselor.',
        },
        {
          type: 'breathing',
          title: 'Guided Breathing for Kids',
          description: 'Practice deep breathing with this video.',
          videoUrl: 'https://www.youtube.com/embed/RVA2N6tX2cg',
          duration: '5 min',
        },
      ],
    },
    teen: {
      mild: [
        {
          type: 'mindfulness',
          title: 'Mindfulness for Teens',
          description: 'Try this mindfulness exercise.',
          videoUrl: 'https://www.youtube.com/embed/w6T02g5hnT4',
          duration: '12 min',
        },
      ],
      moderate: [
        {
          type: 'yoga',
          title: 'Yoga for Anxiety',
          description: 'Try this yoga routine to reduce anxiety.',
          videoUrl: 'https://www.youtube.com/embed/4pLUleLdwY4',
          duration: '15 min',
        },
        {
          type: 'talk',
          title: 'Talk to a Counselor',
          description: 'Reach out to a school counselor or trusted adult.',
        },
      ],
      severe: [
        {
          type: 'helpline',
          title: 'Contact a Mental Health Helpline',
          description: 'Please talk to a professional for support.',
        },
        {
          type: 'meditation',
          title: 'Guided Meditation for Anxiety',
          description: 'Try this calming meditation.',
          videoUrl: 'https://www.youtube.com/embed/O-6f5wQXSu8',
          duration: '10 min',
        },
      ],
    },
    adult: {
      mild: [
        {
          type: 'breathing',
          title: 'Deep Breathing Exercise',
          description: 'Practice deep breathing to calm anxiety.',
          videoUrl: 'https://www.youtube.com/embed/odADwWzHR24',
          duration: '7 min',
        },
        {
          type: 'exercise',
          title: 'Light Exercise',
          description: 'Try a short walk or stretching.',
          videoUrl: 'https://www.youtube.com/embed/2L2lnxIcNmo',
          duration: '10 min',
        },
      ],
      moderate: [
        {
          type: 'meditation',
          title: 'Guided Meditation for Anxiety',
          description: 'Practice mindfulness meditation.',
          videoUrl: 'https://www.youtube.com/embed/O-6f5wQXSu8',
          duration: '10 min',
        },
        {
          type: 'talk',
          title: 'Talk to a Therapist',
          description: 'Consider talking to a mental health professional.',
        },
      ],
      severe: [
        {
          type: 'helpline',
          title: 'Contact a Mental Health Professional',
          description: 'Please seek immediate help from a professional.',
        },
        {
          type: 'meditation',
          title: 'Deep Relaxation Meditation',
          description: 'Try this deep relaxation session.',
          videoUrl: 'https://www.youtube.com/embed/ZToicYcHIOU',
          duration: '15 min',
        },
      ],
    },
    senior: {
      mild: [
        {
          type: 'music',
          title: 'Calming Music for Seniors',
          description: 'Listen to relaxing music.',
          videoUrl: 'https://www.youtube.com/embed/2OEL4P1Rz04',
          duration: '10 min',
        },
        {
          type: 'breathing',
          title: 'Gentle Breathing Exercise',
          description: 'Practice gentle breathing.',
          videoUrl: 'https://www.youtube.com/embed/SEfs5TJZ6Nk',
          duration: '7 min',
        },
      ],
      moderate: [
        {
          type: 'talk',
          title: 'Connect with Family',
          description: 'Reach out to family or friends for support.',
        },
        {
          type: 'stretch',
          title: 'Gentle Stretching',
          description: 'Try these stretches for relaxation.',
          videoUrl: 'https://www.youtube.com/embed/6fbM6D5eYuw',
          duration: '10 min',
        },
      ],
      severe: [
        {
          type: 'helpline',
          title: 'Contact a Healthcare Provider',
          description: 'Please contact your doctor or a mental health professional.',
        },
        {
          type: 'meditation',
          title: 'Guided Meditation for Seniors',
          description: 'Try this calming meditation.',
          videoUrl: 'https://www.youtube.com/embed/MIr3RsUWrdo',
          duration: '10 min',
        },
      ],
    },
  };

  recommendations = recs[ageGroup][severity];

  return {
    score,
    severity,
    interpretation,
    color,
    recommendations,
  };
};
