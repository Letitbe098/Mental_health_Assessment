import * as tf from '@tensorflow/tfjs';

// Enhanced ML-powered chatbot service
export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  sentiment?: number;
  confidence?: number;
  intent?: string;
}

export interface UserProfile {
  name?: string;
  age?: number;
  previousAssessments: any[];
  moodHistory: any[];
  preferences: string[];
}

class MLChatbotService {
  private model: tf.LayersModel | null = null;
  private vocabulary: Map<string, number> = new Map();
  private reverseVocabulary: Map<number, string> = new Map();
  private isInitialized = false;
  private conversationContext: string[] = [];
  private userProfile: UserProfile = {
    previousAssessments: [],
    moodHistory: [],
    preferences: []
  };
  private currentQuestionIndex = 0;
  private isInAssessmentMode = false;
  private userResponses: string[] = [];

  // Mental health keywords and their weights
  private mentalHealthKeywords = {
    // Positive emotions
    positive: {
      high: ['amazing', 'fantastic', 'excellent', 'wonderful', 'great', 'awesome', 'perfect', 'brilliant'],
      medium: ['good', 'fine', 'okay', 'alright', 'decent', 'nice', 'well', 'better'],
      low: ['so-so', 'meh', 'average', 'neutral']
    },
    // Negative emotions
    negative: {
      high: ['terrible', 'awful', 'horrible', 'devastating', 'miserable', 'hopeless', 'suicidal', 'worthless'],
      medium: ['bad', 'sad', 'depressed', 'anxious', 'worried', 'stressed', 'upset', 'down'],
      low: ['not good', 'not great', 'could be better', 'struggling', 'tired', 'overwhelmed']
    },
    // Specific conditions
    anxiety: ['anxious', 'worried', 'nervous', 'panic', 'fear', 'stress', 'overwhelmed', 'restless'],
    depression: ['sad', 'depressed', 'hopeless', 'empty', 'worthless', 'tired', 'exhausted', 'numb'],
    help: ['help', 'support', 'advice', 'guidance', 'assistance', 'therapy', 'counseling'],
    crisis: ['suicide', 'kill', 'die', 'end', 'hurt', 'harm', 'emergency', 'can\'t go on']
  };

  // Wellbeing assessment questions
  private wellbeingQuestions = [
    {
      question: "Hi! I'm here to support you. How are you feeling today?",
      quickResponses: ["Very good", "Good", "Okay", "Not good", "Very bad"]
    },
    {
      question: "How has your sleep been lately?",
      quickResponses: ["Very good", "Good", "Poor", "Very poor", "Can't sleep"]
    },
    {
      question: "How are your energy levels?",
      quickResponses: ["High energy", "Normal", "Low energy", "Exhausted", "No energy"]
    },
    {
      question: "Are you feeling anxious or worried about anything?",
      quickResponses: ["Not at all", "A little", "Somewhat", "Very anxious", "Extremely anxious"]
    },
    {
      question: "How connected do you feel to others right now?",
      quickResponses: ["Very connected", "Connected", "Somewhat isolated", "Very isolated", "Completely alone"]
    }
  ];

  async initialize() {
    if (this.isInitialized) return;

    try {
      // Initialize vocabulary with common mental health terms
      this.buildVocabulary();
      
      // Create a simple sentiment analysis model
      await this.createSentimentModel();
      
      this.isInitialized = true;
      console.log('ML Chatbot Service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize ML Chatbot Service:', error);
    }
  }

  private buildVocabulary() {
    const commonWords = [
      'i', 'am', 'feel', 'feeling', 'today', 'help', 'need', 'want', 'can', 'you',
      'me', 'my', 'have', 'been', 'really', 'very', 'so', 'just', 'like', 'think',
      'know', 'get', 'going', 'time', 'good', 'bad', 'better', 'worse', 'hard',
      'difficult', 'easy', 'happy', 'sad', 'angry', 'scared', 'worried', 'anxious',
      'depressed', 'stressed', 'tired', 'exhausted', 'overwhelmed', 'lonely',
      'hopeless', 'hopeful', 'grateful', 'thankful', 'excited', 'nervous'
    ];

    // Add mental health keywords
    Object.values(this.mentalHealthKeywords).flat().forEach(word => {
      if (typeof word === 'string' && !commonWords.includes(word)) {
        commonWords.push(word);
      }
    });

    // Add positive and negative keywords
    Object.values(this.mentalHealthKeywords.positive).flat().forEach(word => {
      if (!commonWords.includes(word)) {
        commonWords.push(word);
      }
    });

    Object.values(this.mentalHealthKeywords.negative).flat().forEach(word => {
      if (!commonWords.includes(word)) {
        commonWords.push(word);
      }
    });

    commonWords.forEach((word, index) => {
      this.vocabulary.set(word, index);
      this.reverseVocabulary.set(index, word);
    });
  }

  private async createSentimentModel() {
    // Create a simple neural network for sentiment analysis
    this.model = tf.sequential({
      layers: [
        tf.layers.dense({ inputShape: [this.vocabulary.size], units: 64, activation: 'relu' }),
        tf.layers.dropout({ rate: 0.3 }),
        tf.layers.dense({ units: 32, activation: 'relu' }),
        tf.layers.dense({ units: 3, activation: 'softmax' }) // negative, neutral, positive
      ]
    });

    this.model.compile({
      optimizer: 'adam',
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy']
    });
  }

  private analyzeSentiment(text: string): { sentiment: number; confidence: number } {
    const lowerText = text.toLowerCase();
    let sentimentScore = 0;
    let confidence = 0.5;

    // Check for positive words
    Object.entries(this.mentalHealthKeywords.positive).forEach(([level, words]) => {
      words.forEach(word => {
        if (lowerText.includes(word)) {
          switch (level) {
            case 'high': sentimentScore += 1.0; confidence = 0.9; break;
            case 'medium': sentimentScore += 0.6; confidence = 0.8; break;
            case 'low': sentimentScore += 0.3; confidence = 0.7; break;
          }
        }
      });
    });

    // Check for negative words
    Object.entries(this.mentalHealthKeywords.negative).forEach(([level, words]) => {
      words.forEach(word => {
        if (lowerText.includes(word)) {
          switch (level) {
            case 'high': sentimentScore -= 1.0; confidence = 0.9; break;
            case 'medium': sentimentScore -= 0.6; confidence = 0.8; break;
            case 'low': sentimentScore -= 0.3; confidence = 0.7; break;
          }
        }
      });
    });

    // Normalize sentiment to -1 to 1 range
    sentimentScore = Math.max(-1, Math.min(1, sentimentScore));

    return { sentiment: sentimentScore, confidence };
  }

  private detectIntent(text: string): string {
    const lowerText = text.toLowerCase();
    
    // Crisis detection (highest priority)
    if (this.mentalHealthKeywords.crisis.some(word => lowerText.includes(word))) {
      return 'crisis';
    }

    // Greeting detection
    if (/^(hi|hello|hey|good morning|good afternoon|good evening)/.test(lowerText) && !this.isInAssessmentMode) {
      return 'greeting';
    }

    // Help seeking
    if (this.mentalHealthKeywords.help.some(word => lowerText.includes(word))) {
      return 'help_seeking';
    }

    // Anxiety detection
    if (this.mentalHealthKeywords.anxiety.some(word => lowerText.includes(word))) {
      return 'anxiety';
    }

    // Depression detection
    if (this.mentalHealthKeywords.depression.some(word => lowerText.includes(word))) {
      return 'depression';
    }

    // Assessment response
    if (this.isInAssessmentMode) {
      return 'assessment_response';
    }

    return 'general';
  }

  private getEmpatheticResponse(sentiment: number, userText: string): string {
    const lowerText = userText.toLowerCase();

    // Very negative responses
    if (sentiment <= -0.7) {
      const responses = [
        "I'm really sorry you're going through such a difficult time. Your feelings are completely valid, and I want you to know that you're not alone.",
        "That sounds incredibly hard. Thank you for sharing this with me - it takes courage to open up about difficult feelings.",
        "I can hear that you're really struggling right now. Please know that what you're feeling matters, and there are people who want to help."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Moderately negative responses
    if (sentiment <= -0.3) {
      const responses = [
        "I understand you're not feeling great right now. It's okay to have difficult days - they're part of being human.",
        "Thank you for being honest about how you're feeling. Sometimes just acknowledging our struggles is the first step.",
        "I hear that things are tough for you right now. Would you like to talk about what's been weighing on your mind?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Neutral responses
    if (sentiment >= -0.3 && sentiment <= 0.3) {
      const responses = [
        "It sounds like you're in a neutral space right now. How would you like to feel instead?",
        "I appreciate you sharing where you're at. Sometimes 'okay' is perfectly fine too.",
        "Thank you for checking in. Is there anything specific you'd like to talk about today?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Positive responses
    if (sentiment > 0.3) {
      const responses = [
        "I'm so glad to hear you're feeling good! That's wonderful. What's been contributing to these positive feelings?",
        "It's great that you're in a good space right now. I'd love to hear more about what's been going well for you.",
        "That's fantastic to hear! Positive moments are so important. What's been the highlight of your day?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    return "Thank you for sharing that with me. How can I best support you today?";
  }

  private generateQuickResponses(questionIndex: number): string[] {
    if (questionIndex < this.wellbeingQuestions.length) {
      return this.wellbeingQuestions[questionIndex].quickResponses;
    }
    return [];
  }

  private generateFollowUpQuestions(intent: string, sentiment: number): string[] {
    if (this.isInAssessmentMode && this.currentQuestionIndex < this.wellbeingQuestions.length) {
      return this.generateQuickResponses(this.currentQuestionIndex);
    }

    const followUps = {
      anxiety: [
        "What usually helps when you feel this way?",
        "Would you like to try a breathing exercise?",
        "Can you tell me more about what's causing the anxiety?"
      ],
      depression: [
        "How long have you been feeling this way?",
        "What activities used to bring you joy?",
        "Do you have support from friends or family?"
      ],
      positive: [
        "What's been the best part of your day?",
        "How can we help you maintain these good feelings?",
        "Would you like to set any positive intentions?"
      ],
      general: sentiment < 0 ? [
        "Would you like to talk more about what's bothering you?",
        "What would help you feel a little better right now?",
        "Is there anything specific that's been on your mind?"
      ] : [
        "What's been on your mind lately?",
        "How can I best support you today?",
        "Is there anything you'd like to explore together?"
      ]
    };

    return followUps[intent] || followUps.general;
  }

  async processMessage(userMessage: string, conversationHistory: ChatMessage[]): Promise<{
    response: string;
    sentiment: number;
    confidence: number;
    intent: string;
    followUpQuestions: string[];
    recommendations: string[];
  }> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    // Analyze the user's message
    const { sentiment, confidence } = this.analyzeSentiment(userMessage);
    const intent = this.detectIntent(userMessage);

    // Update conversation context
    this.conversationContext.push(userMessage);
    if (this.conversationContext.length > 10) {
      this.conversationContext.shift();
    }

    let response = "";
    let followUpQuestions: string[] = [];

    // Handle different intents
    if (intent === 'crisis') {
      response = "I'm very concerned about what you've shared. Your life has value and meaning. Please reach out to a crisis helpline immediately:\n\n🆘 National Suicide Prevention Lifeline: 988\n📱 Crisis Text Line: Text HOME to 741741\n🚨 Emergency Services: 911\n\nAre you in immediate danger? Please don't hesitate to reach out for help.";
      followUpQuestions = ["I need immediate help", "I'm safe for now", "I want to talk to someone"];
    } else if (intent === 'greeting' && conversationHistory.length <= 1) {
      // Start wellbeing assessment
      this.isInAssessmentMode = true;
      this.currentQuestionIndex = 0;
      response = this.wellbeingQuestions[0].question;
      followUpQuestions = this.wellbeingQuestions[0].quickResponses;
    } else if (intent === 'assessment_response' && this.isInAssessmentMode) {
      // Store the response
      this.userResponses.push(userMessage);
      
      // Move to next question or finish assessment
      this.currentQuestionIndex++;
      
      if (this.currentQuestionIndex < this.wellbeingQuestions.length) {
        // Ask next question
        const nextQuestion = this.wellbeingQuestions[this.currentQuestionIndex];
        response = `Thank you for sharing that. ${nextQuestion.question}`;
        followUpQuestions = nextQuestion.quickResponses;
      } else {
        // Assessment complete
        this.isInAssessmentMode = false;
        response = this.generateAssessmentSummary();
        followUpQuestions = this.generateFollowUpQuestions('general', sentiment);
      }
    } else {
      // Generate empathetic response based on sentiment
      response = this.getEmpatheticResponse(sentiment, userMessage);
      followUpQuestions = this.generateFollowUpQuestions(intent, sentiment);
    }

    // Generate recommendations
    const recommendations = this.generateRecommendations(intent, sentiment);

    return {
      response,
      sentiment,
      confidence,
      intent,
      followUpQuestions,
      recommendations
    };
  }

  private generateAssessmentSummary(): string {
    const responses = this.userResponses;
    let summary = "Thank you for sharing your feelings with me. Based on what you've told me:\n\n";
    
    // Analyze overall sentiment from responses
    let overallSentiment = 0;
    responses.forEach(response => {
      const { sentiment } = this.analyzeSentiment(response);
      overallSentiment += sentiment;
    });
    overallSentiment /= responses.length;

    if (overallSentiment <= -0.5) {
      summary += "It sounds like you're going through a challenging time right now. That's completely understandable, and I want you to know that your feelings are valid. ";
      summary += "Consider reaching out to a mental health professional who can provide personalized support. ";
      summary += "In the meantime, please be gentle with yourself and remember that difficult feelings are temporary.";
    } else if (overallSentiment <= 0) {
      summary += "You seem to be managing some ups and downs, which is very normal. ";
      summary += "It might be helpful to focus on small self-care activities and maintaining connections with supportive people in your life.";
    } else {
      summary += "It's wonderful to hear that you're feeling relatively well! ";
      summary += "Keep doing what's working for you, and remember that maintaining good mental health is an ongoing process.";
    }

    summary += "\n\nI'm here whenever you need someone to talk to. How would you like to continue our conversation?";
    
    // Reset for next assessment
    this.userResponses = [];
    this.currentQuestionIndex = 0;
    
    return summary;
  }

  private generateRecommendations(intent: string, sentiment: number): string[] {
    const recommendations = [];

    if (intent === 'anxiety') {
      recommendations.push(
        "Try the 4-7-8 breathing technique",
        "Consider taking our anxiety assessment",
        "Practice grounding exercises"
      );
    } else if (intent === 'depression') {
      recommendations.push(
        "Take our depression screening assessment",
        "Try to get some sunlight or fresh air",
        "Consider reaching out to a mental health professional"
      );
    } else if (sentiment < -0.3) {
      recommendations.push(
        "Log your mood in our mood tracker",
        "Try a guided meditation",
        "Consider talking to someone you trust"
      );
    } else if (sentiment > 0.3) {
      recommendations.push(
        "Record this positive moment in your mood tracker",
        "Share what's working well with others",
        "Set a positive intention for tomorrow"
      );
    }

    return recommendations;
  }

  updateUserProfile(profile: Partial<UserProfile>) {
    this.userProfile = { ...this.userProfile, ...profile };
  }

  getUserProfile(): UserProfile {
    return this.userProfile;
  }

  clearConversationContext() {
    this.conversationContext = [];
    this.isInAssessmentMode = false;
    this.currentQuestionIndex = 0;
    this.userResponses = [];
  }
}

export const mlChatbotService = new MLChatbotService();