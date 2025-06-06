// src/models/assessmentTypes.ts

import * as tf from '@tensorflow/tfjs';

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
  riskFactors: string[];
  protectiveFactors: string[];
  mlPrediction?: {
    riskLevel: number;
    confidence: number;
    personalizedInsights: string[];
  };
}

// ML-powered assessment analysis
class AssessmentMLService {
  private model: tf.LayersModel | null = null;
  private isInitialized = false;

  async initialize() {
    if (this.isInitialized) return;

    try {
      // Create a neural network for risk assessment
      this.model = tf.sequential({
        layers: [
          tf.layers.dense({ inputShape: [15], units: 64, activation: 'relu' }),
          tf.layers.dropout({ rate: 0.3 }),
          tf.layers.dense({ units: 32, activation: 'relu' }),
          tf.layers.dropout({ rate: 0.2 }),
          tf.layers.dense({ units: 16, activation: 'relu' }),
          tf.layers.dense({ units: 3, activation: 'softmax' }) // low, medium, high risk
        ]
      });

      this.model.compile({
        optimizer: 'adam',
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy']
      });

      this.isInitialized = true;
      console.log('Assessment ML Service initialized');
    } catch (error) {
      console.error('Failed to initialize Assessment ML Service:', error);
    }
  }

  async analyzeAssessment(
    answers: number[],
    ageGroup: AgeGroup,
    assessmentType: AssessmentType,
    userHistory?: any[]
  ): Promise<{
    riskLevel: number;
    confidence: number;
    personalizedInsights: string[];
  }> {
    if (!this.model) {
      await this.initialize();
    }

    try {
      // Prepare features for ML model
      const features = this.prepareFeatures(answers, ageGroup, assessmentType, userHistory);
      
      // Get prediction
      const prediction = this.model!.predict(tf.tensor2d([features])) as tf.Tensor;
      const result = await prediction.data();
      prediction.dispose();

      // Extract risk level and confidence
      const riskProbabilities = Array.from(result);
      const riskLevel = riskProbabilities.indexOf(Math.max(...riskProbabilities));
      const confidence = Math.max(...riskProbabilities);

      // Generate personalized insights
      const insights = this.generatePersonalizedInsights(answers, ageGroup, assessmentType, riskLevel);

      return {
        riskLevel: riskLevel / 2, // Normalize to 0-1
        confidence,
        personalizedInsights: insights
      };
    } catch (error) {
      console.error('Error in ML analysis:', error);
      return this.getFallbackAnalysis(answers, ageGroup, assessmentType);
    }
  }

  private prepareFeatures(
    answers: number[],
    ageGroup: AgeGroup,
    assessmentType: AssessmentType,
    userHistory?: any[]
  ): number[] {
    const features = [];

    // Normalize answers (0-1)
    const normalizedAnswers = answers.map(a => a / 3);
    features.push(...normalizedAnswers);

    // Pad or truncate to 10 answers
    while (features.length < 10) features.push(0);
    if (features.length > 10) features.splice(10);

    // Age group encoding
    const ageEncoding = { child: 0, teen: 0.33, adult: 0.66, senior: 1 };
    features.push(ageEncoding[ageGroup]);

    // Assessment type encoding
    features.push(assessmentType === 'depression' ? 0 : 1);

    // Historical trend (if available)
    if (userHistory && userHistory.length > 0) {
      const recentScores = userHistory.slice(-3).map(h => h.score / 27);
      const avgRecent = recentScores.reduce((a, b) => a + b, 0) / recentScores.length;
      features.push(avgRecent);
      
      // Trend direction
      if (recentScores.length >= 2) {
        const trend = recentScores[recentScores.length - 1] - recentScores[0];
        features.push(Math.max(-1, Math.min(1, trend))); // Normalize trend
      } else {
        features.push(0);
      }
    } else {
      features.push(0, 0);
    }

    // Time of day factor (circadian influence)
    const hour = new Date().getHours();
    features.push(hour / 24);

    return features;
  }

  private generatePersonalizedInsights(
    answers: number[],
    ageGroup: AgeGroup,
    assessmentType: AssessmentType,
    riskLevel: number
  ): string[] {
    const insights = [];

    // Analyze answer patterns
    const highScoreQuestions = answers
      .map((score, index) => ({ score, index }))
      .filter(item => item.score >= 2)
      .map(item => item.index);

    const lowScoreQuestions = answers
      .map((score, index) => ({ score, index }))
      .filter(item => item.score === 0)
      .map(item => item.index);

    // Generate insights based on patterns
    if (assessmentType === 'depression') {
      if (highScoreQuestions.includes(0)) { // Mood question
        insights.push("Your responses indicate significant mood challenges. Consider mood-boosting activities like exercise or creative pursuits.");
      }
      if (highScoreQuestions.includes(2)) { // Sleep question
        insights.push("Sleep disturbances are affecting your wellbeing. Establishing a consistent sleep routine could help improve your overall mood.");
      }
      if (lowScoreQuestions.length > 5) {
        insights.push("You show several protective factors. Building on these strengths could help maintain your mental wellness.");
      }
    } else if (assessmentType === 'anxiety') {
      if (highScoreQuestions.includes(0)) { // Worry question
        insights.push("Excessive worry is a key concern. Learning worry management techniques like the 5-4-3-2-1 grounding method could be helpful.");
      }
      if (highScoreQuestions.includes(3)) { // Physical symptoms
        insights.push("You're experiencing physical anxiety symptoms. Breathing exercises and progressive muscle relaxation may provide relief.");
      }
    }

    // Age-specific insights
    if (ageGroup === 'teen') {
      insights.push("As a teenager, peer support and maintaining school-life balance are particularly important for your mental health.");
    } else if (ageGroup === 'adult') {
      insights.push("Work-life balance and stress management techniques are crucial for maintaining your mental wellness.");
    } else if (ageGroup === 'senior') {
      insights.push("Social connections and maintaining physical activity are especially beneficial for your age group.");
    }

    // Risk-level specific insights
    if (riskLevel >= 2) {
      insights.push("Your responses suggest you might benefit from professional support. Consider reaching out to a mental health professional.");
    } else if (riskLevel === 1) {
      insights.push("While your symptoms are manageable, developing coping strategies now can help prevent worsening.");
    } else {
      insights.push("You're showing good mental health resilience. Continue your current positive practices.");
    }

    return insights.slice(0, 4); // Limit to 4 insights
  }

  private getFallbackAnalysis(
    answers: number[],
    ageGroup: AgeGroup,
    assessmentType: AssessmentType
  ) {
    const totalScore = answers.reduce((sum, score) => sum + score, 0);
    const maxScore = answers.length * 3;
    const riskLevel = totalScore / maxScore;

    return {
      riskLevel,
      confidence: 0.7,
      personalizedInsights: [
        "This assessment provides a snapshot of your current mental health status.",
        "Consider tracking your mood over time to identify patterns.",
        "Professional support is available if you need additional help."
      ]
    };
  }
}

const assessmentMLService = new AssessmentMLService();

const baseOptions = [
  { value: 0, label: 'Never' },
  { value: 1, label: 'Rarely' },
  { value: 2, label: 'Sometimes' },
  { value: 3, label: 'Often' },
];

// Enhanced questions with better clinical validity
const depressionQuestions = {
  child: [
    { id: 'd-c-1', text: 'Do you feel sad or unhappy even when good things happen?', options: baseOptions },
    { id: 'd-c-2', text: 'Do you find it hard to enjoy playing with friends or doing fun activities?', options: baseOptions },
    { id: 'd-c-3', text: 'Do you feel tired or have little energy during the day?', options: baseOptions },
    { id: 'd-c-4', text: 'Do you have trouble sleeping or sleep too much?', options: baseOptions },
    { id: 'd-c-5', text: 'Do you get upset easily or cry more than usual?', options: baseOptions },
    { id: 'd-c-6', text: 'Do you feel like nobody likes you or wants to be around you?', options: baseOptions },
    { id: 'd-c-7', text: 'Do you have trouble paying attention in school or during activities?', options: baseOptions },
    { id: 'd-c-8', text: 'Do you feel lonely, even when you\'re around other people?', options: baseOptions },
    { id: 'd-c-9', text: 'Do you worry a lot about making mistakes or not being good enough?', options: baseOptions },
    { id: 'd-c-10', text: 'Do you feel like you\'re not good at things other kids can do?', options: baseOptions },
  ],
  teen: [
    { id: 'd-t-1', text: 'Do you feel hopeless about your future?', options: baseOptions },
    { id: 'd-t-2', text: 'Do you avoid spending time with friends or family?', options: baseOptions },
    { id: 'd-t-3', text: 'Do you feel tired or lack motivation for school or activities?', options: baseOptions },
    { id: 'd-t-4', text: 'Do you have trouble concentrating on schoolwork or other tasks?', options: baseOptions },
    { id: 'd-t-5', text: 'Do you feel worthless or guilty about things?', options: baseOptions },
    { id: 'd-t-6', text: 'Have you noticed changes in your eating habits (eating much more or less)?', options: baseOptions },
    { id: 'd-t-7', text: 'Do you feel restless or agitated?', options: baseOptions },
    { id: 'd-t-8', text: 'Do you ever feel like life isn\'t worth living?', options: baseOptions },
    { id: 'd-t-9', text: 'Do you have trouble falling asleep, staying asleep, or sleep too much?', options: baseOptions },
    { id: 'd-t-10', text: 'Do you feel like you can\'t do anything right?', options: baseOptions },
  ],
  adult: [
    { id: 'd-a-1', text: 'Do you feel down, depressed, or hopeless?', options: baseOptions },
    { id: 'd-a-2', text: 'Do you have little interest or pleasure in doing things you used to enjoy?', options: baseOptions },
    { id: 'd-a-3', text: 'Do you have trouble falling asleep, staying asleep, or sleep too much?', options: baseOptions },
    { id: 'd-a-4', text: 'Do you feel tired or have little energy?', options: baseOptions },
    { id: 'd-a-5', text: 'Do you have poor appetite or find yourself overeating?', options: baseOptions },
    { id: 'd-a-6', text: 'Do you feel bad about yourself, or feel like you\'re a failure?', options: baseOptions },
    { id: 'd-a-7', text: 'Do you have trouble concentrating on work, reading, or other activities?', options: baseOptions },
    { id: 'd-a-8', text: 'Do you move or speak noticeably slower, or feel restless and fidgety?', options: baseOptions },
    { id: 'd-a-9', text: 'Do you have thoughts that you would be better off dead or of hurting yourself?', options: baseOptions },
    { id: 'd-a-10', text: 'Do you find it difficult to get through your daily tasks and responsibilities?', options: baseOptions },
  ],
  senior: [
    { id: 'd-s-1', text: 'Do you feel sad, empty, or depressed most of the time?', options: baseOptions },
    { id: 'd-s-2', text: 'Do you have trouble enjoying activities you used to find pleasurable?', options: baseOptions },
    { id: 'd-s-3', text: 'Do you feel more tired or have less energy than usual?', options: baseOptions },
    { id: 'd-s-4', text: 'Do you have trouble sleeping or find yourself sleeping more than usual?', options: baseOptions },
    { id: 'd-s-5', text: 'Do you feel anxious, worried, or on edge?', options: baseOptions },
    { id: 'd-s-6', text: 'Do you feel hopeless about the future?', options: baseOptions },
    { id: 'd-s-7', text: 'Do you have more trouble remembering things or concentrating?', options: baseOptions },
    { id: 'd-s-8', text: 'Do you feel lonely even when you\'re with other people?', options: baseOptions },
    { id: 'd-s-9', text: 'Do you feel like you\'re a burden to your family or others?', options: baseOptions },
    { id: 'd-s-10', text: 'Do you have trouble making decisions, even about small things?', options: baseOptions },
  ],
};

const anxietyQuestions = {
  child: [
    { id: 'a-c-1', text: 'Do you worry a lot about things that might happen?', options: baseOptions },
    { id: 'a-c-2', text: 'Do you feel scared to be away from your parents or caregivers?', options: baseOptions },
    { id: 'a-c-3', text: 'Do you get nervous when meeting new people or going to new places?', options: baseOptions },
    { id: 'a-c-4', text: 'Do you have trouble sleeping because you\'re worried about things?', options: baseOptions },
    { id: 'a-c-5', text: 'Do you feel your heart beating fast when you\'re worried or scared?', options: baseOptions },
    { id: 'a-c-6', text: 'Do you avoid doing things because they make you nervous or scared?', options: baseOptions },
    { id: 'a-c-7', text: 'Do you get stomachaches or headaches when you\'re worried?', options: baseOptions },
    { id: 'a-c-8', text: 'Do you need a lot of reassurance from adults when you\'re worried?', options: baseOptions },
    { id: 'a-c-9', text: 'Do you worry about making mistakes or not doing things perfectly?', options: baseOptions },
    { id: 'a-c-10', text: 'Do you get upset when things don\'t go as planned?', options: baseOptions },
  ],
  teen: [
    { id: 'a-t-1', text: 'Do you feel nervous or anxious in social situations with peers?', options: baseOptions },
    { id: 'a-t-2', text: 'Do you worry excessively about exams, grades, or school performance?', options: baseOptions },
    { id: 'a-t-3', text: 'Do you have trouble relaxing or unwinding?', options: baseOptions },
    { id: 'a-t-4', text: 'Do you avoid activities or situations because of fear or worry?', options: baseOptions },
    { id: 'a-t-5', text: 'Do you feel restless, keyed up, or on edge?', options: baseOptions },
    { id: 'a-t-6', text: 'Do you have trouble falling asleep due to racing thoughts or worries?', options: baseOptions },
    { id: 'a-t-7', text: 'Do you become irritable when you\'re anxious or stressed?', options: baseOptions },
    { id: 'a-t-8', text: 'Do you feel like your mind goes blank when you\'re stressed or anxious?', options: baseOptions },
    { id: 'a-t-9', text: 'Do you worry excessively about what others think of you?', options: baseOptions },
    { id: 'a-t-10', text: 'Do you experience physical symptoms like sweating, shaking, or rapid heartbeat when anxious?', options: baseOptions },
  ],
  adult: [
    { id: 'a-a-1', text: 'Do you feel nervous, anxious, or on edge?', options: baseOptions },
    { id: 'a-a-2', text: 'Do you find yourself worrying too much about different things?', options: baseOptions },
    { id: 'a-a-3', text: 'Do you have trouble controlling your worries once they start?', options: baseOptions },
    { id: 'a-a-4', text: 'Do you have difficulty relaxing or unwinding?', options: baseOptions },
    { id: 'a-a-5', text: 'Do you feel restless or find it hard to sit still?', options: baseOptions },
    { id: 'a-a-6', text: 'Do you become easily annoyed or irritable?', options: baseOptions },
    { id: 'a-a-7', text: 'Do you feel afraid that something awful might happen?', options: baseOptions },
    { id: 'a-a-8', text: 'Do you have trouble falling asleep or staying asleep due to worry?', options: baseOptions },
    { id: 'a-a-9', text: 'Do you experience racing thoughts that are hard to control?', options: baseOptions },
    { id: 'a-a-10', text: 'Do you have physical symptoms like sweating, trembling, or muscle tension when anxious?', options: baseOptions },
  ],
  senior: [
    { id: 'a-s-1', text: 'Do you worry frequently about your health or the health of family members?', options: baseOptions },
    { id: 'a-s-2', text: 'Do you feel nervous or anxious more often than you used to?', options: baseOptions },
    { id: 'a-s-3', text: 'Do you have trouble relaxing or feeling calm?', options: baseOptions },
    { id: 'a-s-4', text: 'Do you feel restless or on edge?', options: baseOptions },
    { id: 'a-s-5', text: 'Do you avoid certain activities or places due to fear or worry?', options: baseOptions },
    { id: 'a-s-6', text: 'Do you have trouble sleeping because of worries or anxious thoughts?', options: baseOptions },
    { id: 'a-s-7', text: 'Do you experience heart palpitations or rapid heartbeat?', options: baseOptions },
    { id: 'a-s-8', text: 'Do you get easily startled or feel jumpy?', options: baseOptions },
    { id: 'a-s-9', text: 'Do you worry about being alone or something happening when you\'re by yourself?', options: baseOptions },
    { id: 'a-s-10', text: 'Do you experience physical symptoms like sweating, shaking, or dizziness when anxious?', options: baseOptions },
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

function getSeverity(score: number): { severity: string; color: string } {
  if (score < 7) return { severity: 'mild', color: '#4caf50' };
  if (score < 15) return { severity: 'moderate', color: '#ff9800' };
  return { severity: 'severe', color: '#f44336' };
}

export const interpretDepressionResult = async (
  score: number,
  ageGroup: AgeGroup,
  answers: number[],
  userHistory?: any[]
): Promise<AssessmentResult> => {
  const { severity, color } = getSeverity(score);
  let interpretation = '';
  let recommendations: Recommendation[] = [];
  let riskFactors: string[] = [];
  let protectiveFactors: string[] = [];

  // Get ML analysis
  const mlPrediction = await assessmentMLService.analyzeAssessment(
    answers,
    ageGroup,
    'depression',
    userHistory
  );

  // Analyze specific risk and protective factors
  answers.forEach((answer, index) => {
    if (answer >= 2) {
      switch (index) {
        case 0: riskFactors.push('Persistent sad mood'); break;
        case 1: riskFactors.push('Loss of interest in activities'); break;
        case 2: riskFactors.push('Sleep disturbances'); break;
        case 3: riskFactors.push('Fatigue and low energy'); break;
        case 4: riskFactors.push('Appetite changes'); break;
        case 5: riskFactors.push('Negative self-perception'); break;
        case 6: riskFactors.push('Concentration difficulties'); break;
        case 8: riskFactors.push('Thoughts of self-harm'); break;
      }
    } else if (answer === 0) {
      switch (index) {
        case 0: protectiveFactors.push('Stable mood regulation'); break;
        case 1: protectiveFactors.push('Maintained interest in activities'); break;
        case 2: protectiveFactors.push('Good sleep quality'); break;
        case 3: protectiveFactors.push('Adequate energy levels'); break;
        case 5: protectiveFactors.push('Positive self-regard'); break;
        case 6: protectiveFactors.push('Good concentration'); break;
      }
    }
  });

  if (severity === 'mild') interpretation = 'Mild depressive symptoms detected. Early intervention and self-care strategies may be beneficial.';
  if (severity === 'moderate') interpretation = 'Moderate depressive symptoms present. Consider professional support and structured interventions.';
  if (severity === 'severe') interpretation = 'Severe depressive symptoms identified. Professional mental health support is strongly recommended.';

  // Enhanced recommendations based on ML insights
  const recs = {
    child: {
      mild: [
        {
          type: 'music',
          title: 'Mood-Boosting Music for Kids',
          description: 'Listen to uplifting music designed to improve children\'s mood.',
          videoUrl: 'https://www.youtube.com/embed/8ybW48rKBME',
          duration: '10 min',
        },
        {
          type: 'activity',
          title: 'Fun Physical Activities',
          description: 'Engage in age-appropriate physical activities to boost mood.',
          duration: '15-30 min',
        },
      ],
      moderate: [
        {
          type: 'breathing',
          title: 'Balloon Breathing for Kids',
          description: 'Learn fun breathing exercises designed for children.',
          videoUrl: 'https://www.youtube.com/embed/RVA2N6tX2cg',
          duration: '5 min',
        },
        {
          type: 'story',
          title: 'Therapeutic Stories',
          description: 'Listen to stories that help process emotions.',
          videoUrl: 'https://www.youtube.com/embed/1KaOrSuWZeM',
          duration: '8 min',
        },
        {
          type: 'support',
          title: 'Talk to a Trusted Adult',
          description: 'It\'s important to share feelings with parents, teachers, or counselors.',
        },
      ],
      severe: [
        {
          type: 'crisis',
          title: 'Immediate Support Needed',
          description: 'Please have a parent or guardian contact a mental health professional immediately.',
        },
        {
          type: 'breathing',
          title: 'Calming Breathing Exercises',
          description: 'Practice these breathing techniques with an adult.',
          videoUrl: 'https://www.youtube.com/embed/CvF9AEe-ozc',
          duration: '5 min',
        },
      ],
    },
    teen: {
      mild: [
        {
          type: 'journaling',
          title: 'Mood Journaling for Teens',
          description: 'Learn how to track and understand your emotions through writing.',
        },
        {
          type: 'music',
          title: 'Therapeutic Music Playlist',
          description: 'Curated music to help regulate mood and emotions.',
          videoUrl: 'https://www.youtube.com/embed/2Vv-BfVoq4g',
          duration: '10 min',
        },
        {
          type: 'social',
          title: 'Peer Support Strategies',
          description: 'Learn how to build and maintain supportive friendships.',
        },
      ],
      moderate: [
        {
          type: 'yoga',
          title: 'Yoga for Teen Mental Health',
          description: 'Gentle yoga practices designed for adolescents.',
          videoUrl: 'https://www.youtube.com/embed/v7AYKMP6rOE',
          duration: '15 min',
        },
        {
          type: 'counseling',
          title: 'School Counseling Resources',
          description: 'Connect with school counselors or teen support groups.',
        },
        {
          type: 'mindfulness',
          title: 'Teen Mindfulness Practices',
          description: 'Age-appropriate mindfulness and meditation techniques.',
        },
      ],
      severe: [
        {
          type: 'crisis',
          title: 'Professional Help Needed',
          description: 'Contact a mental health professional, school counselor, or crisis helpline immediately.',
        },
        {
          type: 'meditation',
          title: 'Crisis Coping Meditation',
          description: 'Immediate coping strategies for severe emotional distress.',
          videoUrl: 'https://www.youtube.com/embed/92i5m3tV5XY',
          duration: '10 min',
        },
      ],
    },
    adult: {
      mild: [
        {
          type: 'exercise',
          title: 'Mood-Boosting Exercise',
          description: 'Light to moderate exercise routines proven to improve mood.',
          videoUrl: 'https://www.youtube.com/embed/2L2lnxIcNmo',
          duration: '10-20 min',
        },
        {
          type: 'meditation',
          title: 'Daily Mindfulness Practice',
          description: 'Establish a regular mindfulness meditation routine.',
          videoUrl: 'https://www.youtube.com/embed/inpok4MKVLM',
          duration: '10 min',
        },
        {
          type: 'lifestyle',
          title: 'Sleep Hygiene Improvement',
          description: 'Optimize your sleep schedule and environment for better mental health.',
        },
      ],
      moderate: [
        {
          type: 'therapy',
          title: 'Cognitive Behavioral Therapy',
          description: 'Learn CBT techniques to challenge negative thought patterns.',
        },
        {
          type: 'yoga',
          title: 'Therapeutic Yoga Practice',
          description: 'Yoga sequences specifically designed for depression management.',
          videoUrl: 'https://www.youtube.com/embed/4pLUleLdwY4',
          duration: '15-30 min',
        },
        {
          type: 'support',
          title: 'Support Group Participation',
          description: 'Connect with others experiencing similar challenges.',
        },
      ],
      severe: [
        {
          type: 'crisis',
          title: 'Immediate Professional Support',
          description: 'Contact a mental health professional, your doctor, or a crisis helpline immediately.',
        },
        {
          type: 'meditation',
          title: 'Crisis Stabilization Techniques',
          description: 'Immediate coping strategies for severe depression.',
          videoUrl: 'https://www.youtube.com/embed/ZToicYcHIOU',
          duration: '15 min',
        },
        {
          type: 'safety',
          title: 'Safety Planning',
          description: 'Develop a safety plan with professional support.',
        },
      ],
    },
    senior: {
      mild: [
        {
          type: 'music',
          title: 'Therapeutic Music for Seniors',
          description: 'Music therapy designed for older adults.',
          videoUrl: 'https://www.youtube.com/embed/2OEL4P1Rz04',
          duration: '10 min',
        },
        {
          type: 'social',
          title: 'Social Engagement Activities',
          description: 'Strategies to maintain social connections and community involvement.',
        },
      ],
      moderate: [
        {
          type: 'exercise',
          title: 'Gentle Exercise for Seniors',
          description: 'Safe, effective exercises for older adults.',
          videoUrl: 'https://www.youtube.com/embed/6fbM6D5eYuw',
          duration: '10-15 min',
        },
        {
          type: 'support',
          title: 'Family and Community Support',
          description: 'Engage family members and community resources.',
        },
      ],
      severe: [
        {
          type: 'crisis',
          title: 'Medical and Mental Health Support',
          description: 'Contact your doctor, a mental health professional, or emergency services.',
        },
        {
          type: 'meditation',
          title: 'Gentle Meditation for Seniors',
          description: 'Calming meditation practices for older adults.',
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
    riskFactors,
    protectiveFactors,
    mlPrediction
  };
};

export const interpretAnxietyResult = async (
  score: number,
  ageGroup: AgeGroup,
  answers: number[],
  userHistory?: any[]
): Promise<AssessmentResult> => {
  const { severity, color } = getSeverity(score);
  let interpretation = '';
  let recommendations: Recommendation[] = [];
  let riskFactors: string[] = [];
  let protectiveFactors: string[] = [];

  // Get ML analysis
  const mlPrediction = await assessmentMLService.analyzeAssessment(
    answers,
    ageGroup,
    'anxiety',
    userHistory
  );

  // Analyze specific risk and protective factors for anxiety
  answers.forEach((answer, index) => {
    if (answer >= 2) {
      switch (index) {
        case 0: riskFactors.push('Excessive nervousness'); break;
        case 1: riskFactors.push('Uncontrollable worry'); break;
        case 2: riskFactors.push('Difficulty controlling anxiety'); break;
        case 3: riskFactors.push('Inability to relax'); break;
        case 4: riskFactors.push('Restlessness'); break;
        case 5: riskFactors.push('Irritability'); break;
        case 6: riskFactors.push('Fear of catastrophe'); break;
        case 9: riskFactors.push('Physical anxiety symptoms'); break;
      }
    } else if (answer === 0) {
      switch (index) {
        case 0: protectiveFactors.push('Emotional stability'); break;
        case 1: protectiveFactors.push('Controlled worry levels'); break;
        case 3: protectiveFactors.push('Good relaxation ability'); break;
        case 4: protectiveFactors.push('Calm demeanor'); break;
        case 5: protectiveFactors.push('Emotional regulation'); break;
      }
    }
  });

  if (severity === 'mild') interpretation = 'Mild anxiety symptoms present. Stress management and relaxation techniques may be helpful.';
  if (severity === 'moderate') interpretation = 'Moderate anxiety levels detected. Consider anxiety management strategies and professional guidance.';
  if (severity === 'severe') interpretation = 'Severe anxiety symptoms identified. Professional mental health support is strongly recommended.';

  // Similar structure for anxiety recommendations...
  const recs = {
    child: {
      mild: [
        {
          type: 'breathing',
          title: 'Fun Breathing Games',
          description: 'Learn breathing exercises through games and activities.',
          videoUrl: 'https://www.youtube.com/embed/CvF9AEe-ozc',
          duration: '5 min',
        },
      ],
      moderate: [
        {
          type: 'story',
          title: 'Anxiety Management Stories',
          description: 'Stories that teach children how to cope with worry.',
          videoUrl: 'https://www.youtube.com/embed/1KaOrSuWZeM',
          duration: '8 min',
        },
      ],
      severe: [
        {
          type: 'crisis',
          title: 'Professional Support Needed',
          description: 'Contact a child psychologist or your pediatrician immediately.',
        },
      ],
    },
    teen: {
      mild: [
        {
          type: 'mindfulness',
          title: 'Teen Mindfulness Techniques',
          description: 'Age-appropriate mindfulness practices for anxiety management.',
          videoUrl: 'https://www.youtube.com/embed/w6T02g5hnT4',
          duration: '12 min',
        },
      ],
      moderate: [
        {
          type: 'yoga',
          title: 'Anxiety-Relief Yoga',
          description: 'Yoga practices specifically for anxiety reduction.',
          videoUrl: 'https://www.youtube.com/embed/4pLUleLdwY4',
          duration: '15 min',
        },
      ],
      severe: [
        {
          type: 'crisis',
          title: 'Immediate Support Required',
          description: 'Contact a mental health professional or crisis helpline.',
        },
      ],
    },
    adult: {
      mild: [
        {
          type: 'breathing',
          title: 'Progressive Muscle Relaxation',
          description: 'Learn systematic relaxation techniques.',
          videoUrl: 'https://www.youtube.com/embed/odADwWzHR24',
          duration: '7 min',
        },
      ],
      moderate: [
        {
          type: 'meditation',
          title: 'Anxiety-Focused Meditation',
          description: 'Meditation practices designed for anxiety management.',
          videoUrl: 'https://www.youtube.com/embed/O-6f5wQXSu8',
          duration: '10 min',
        },
      ],
      severe: [
        {
          type: 'crisis',
          title: 'Professional Treatment Needed',
          description: 'Seek immediate professional mental health support.',
        },
      ],
    },
    senior: {
      mild: [
        {
          type: 'music',
          title: 'Calming Music Therapy',
          description: 'Therapeutic music for anxiety relief.',
          videoUrl: 'https://www.youtube.com/embed/2OEL4P1Rz04',
          duration: '10 min',
        },
      ],
      moderate: [
        {
          type: 'exercise',
          title: 'Gentle Movement for Anxiety',
          description: 'Low-impact exercises to reduce anxiety.',
          videoUrl: 'https://www.youtube.com/embed/6fbM6D5eYuw',
          duration: '10 min',
        },
      ],
      severe: [
        {
          type: 'crisis',
          title: 'Medical Consultation Required',
          description: 'Contact your healthcare provider or mental health professional.',
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
    riskFactors,
    protectiveFactors,
    mlPrediction
  };
};