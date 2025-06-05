// assessment.ts

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
  imageUrl?: string;
}

export interface AssessmentResult {
  score: number;
  severity: string;
  interpretation: string;
  color: string;
  recommendations: Recommendation[];
}

// 10 example questions for each group and assessment
export const getAgeSpecificQuestions = (
  type: AssessmentType,
  ageGroup: AgeGroup
): AssessmentQuestion[] => {
  const baseOptions = [
    { value: 0, label: 'Never' },
    { value: 1, label: 'Rarely' },
    { value: 2, label: 'Sometimes' },
    { value: 3, label: 'Often' },
  ];
  if (type === 'depression') {
    if (ageGroup === 'child')
      return Array.from({ length: 10 }, (_, i) => ({
        id: `d-c-${i + 1}`,
        text: `Child Depression Q${i + 1}`,
        options: baseOptions,
      }));
    if (ageGroup === 'teen')
      return Array.from({ length: 10 }, (_, i) => ({
        id: `d-t-${i + 1}`,
        text: `Teen Depression Q${i + 1}`,
        options: baseOptions,
      }));
    if (ageGroup === 'adult')
      return Array.from({ length: 10 }, (_, i) => ({
        id: `d-a-${i + 1}`,
        text: `Adult Depression Q${i + 1}`,
        options: baseOptions,
      }));
    if (ageGroup === 'senior')
      return Array.from({ length: 10 }, (_, i) => ({
        id: `d-s-${i + 1}`,
        text: `Senior Depression Q${i + 1}`,
        options: baseOptions,
      }));
  }
  if (type === 'anxiety') {
    if (ageGroup === 'child')
      return Array.from({ length: 10 }, (_, i) => ({
        id: `a-c-${i + 1}`,
        text: `Child Anxiety Q${i + 1}`,
        options: baseOptions,
      }));
    if (ageGroup === 'teen')
      return Array.from({ length: 10 }, (_, i) => ({
        id: `a-t-${i + 1}`,
        text: `Teen Anxiety Q${i + 1}`,
        options: baseOptions,
      }));
    if (ageGroup === 'adult')
      return Array.from({ length: 10 }, (_, i) => ({
        id: `a-a-${i + 1}`,
        text: `Adult Anxiety Q${i + 1}`,
        options: baseOptions,
      }));
    if (ageGroup === 'senior')
      return Array.from({ length: 10 }, (_, i) => ({
        id: `a-s-${i + 1}`,
        text: `Senior Anxiety Q${i + 1}`,
        options: baseOptions,
      }));
  }
  return [];
};

// Helper for severity and recommendations
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

  if (severity === 'mild') interpretation = 'Mild symptoms. Monitor and practice self-care.';
  if (severity === 'moderate') interpretation = 'Moderate symptoms. Consider talking to a counselor.';
  if (severity === 'severe') interpretation = 'Severe symptoms. Seek professional help.';

  // Example recommendations (customize as needed)
  if (ageGroup === 'child') {
    recommendations = [
      {
        type: 'music',
        title: 'Happy Songs for Kids',
        description: 'Uplifting music for children.',
        videoUrl: 'https://www.youtube.com/embed/8ybW48rKBME',
        duration: '10 min',
      },
      {
        type: 'breathing',
        title: 'Breathing Exercise for Kids',
        description: 'Simple breathing routine.',
        videoUrl: 'https://www.youtube.com/embed/CvF9AEe-ozc',
        duration: '5 min',
      },
    ];
  }
  if (ageGroup === 'teen') {
    recommendations = [
      {
        type: 'yoga',
        title: 'Yoga for Teens',
        description: 'Gentle yoga to relax your mind.',
        videoUrl: 'https://www.youtube.com/embed/v7AYKMP6rOE',
        duration: '15 min',
      },
      {
        type: 'journaling',
        title: 'Journaling for Teens',
        description: 'Express your thoughts in writing.',
      },
    ];
  }
  if (ageGroup === 'adult') {
    recommendations = [
      {
        type: 'meditation',
        title: 'Guided Meditation',
        description: 'A short meditation to ease your mind.',
        videoUrl: 'https://www.youtube.com/embed/inpok4MKVLM',
        duration: '10 min',
      },
      {
        type: 'exercise',
        title: 'Light Exercise',
        description: 'Simple exercises to boost your mood.',
      },
    ];
  }
  if (ageGroup === 'senior') {
    recommendations = [
      {
        type: 'music',
        title: 'Relaxing Music for Seniors',
        description: 'Calming music to help you relax.',
        videoUrl: 'https://www.youtube.com/embed/2OEL4P1Rz04',
        duration: '10 min',
      },
      {
        type: 'breathing',
        title: 'Breathing Exercise',
        description: 'Gentle breathing for relaxation.',
        videoUrl: 'https://www.youtube.com/embed/SEfs5TJZ6Nk',
        duration: '7 min',
      },
    ];
  }

  // Optionally, add more/less recommendations based on severity

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

  if (severity === 'mild') interpretation = 'Mild anxiety. Practice daily relaxation.';
  if (severity === 'moderate') interpretation = 'Moderate anxiety. Try stress management techniques.';
  if (severity === 'severe') interpretation = 'Severe anxiety. Seek professional support.';

  if (ageGroup === 'child') {
    recommendations = [
      {
        type: 'story',
        title: 'Calming Stories for Kids',
        description: 'Listen to a soothing story.',
        videoUrl: 'https://www.youtube.com/embed/1KaOrSuWZeM',
        duration: '8 min',
      },
      {
        type: 'breathing',
        title: 'Balloon Breathing',
        description: 'Fun breathing exercise for children.',
        videoUrl: 'https://www.youtube.com/embed/RVA2N6tX2cg',
        duration: '5 min',
      },
    ];
  }
  if (ageGroup === 'teen') {
    recommendations = [
      {
        type: 'mindfulness',
        title: 'Mindfulness for Teens',
        description: 'Learn to be present and reduce anxiety.',
        videoUrl: 'https://www.youtube.com/embed/w6T02g5hnT4',
        duration: '12 min',
      },
      {
        type: 'exercise',
        title: 'Stretching Routine',
        description: 'Light stretching to ease tension.',
      },
    ];
  }
  if (ageGroup === 'adult') {
    recommendations = [
      {
        type: 'breathing',
        title: 'Deep Breathing Exercise',
        description: 'Calm your mind with deep breaths.',
        videoUrl: 'https://www.youtube.com/embed/odADwWzHR24',
        duration: '7 min',
      },
      {
        type: 'meditation',
        title: 'Guided Meditation for Anxiety',
        description: 'A meditation to help reduce anxiety.',
        videoUrl: 'https://www.youtube.com/embed/O-6f5wQXSu8',
        duration: '10 min',
      },
    ];
  }
  if (ageGroup === 'senior') {
    recommendations = [
      {
        type: 'music',
        title: 'Calming Music for Seniors',
        description: 'Relaxing music to ease anxiety.',
        videoUrl: 'https://www.youtube.com/embed/2OEL4P1Rz04',
        duration: '10 min',
      },
      {
        type: 'breathing',
        title: 'Gentle Breathing',
        description: 'Easy breathing exercise for seniors.',
        videoUrl: 'https://www.youtube.com/embed/SEfs5TJZ6Nk',
        duration: '7 min',
      },
    ];
  }

  return {
    score,
    severity,
    interpretation,
    color,
    recommendations,
  };
};
