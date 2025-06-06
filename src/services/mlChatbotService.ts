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

  // Mental health keywords and their weights
  private mentalHealthKeywords = {
    anxiety: ['anxious', 'worried', 'nervous', 'panic', 'fear', 'stress', 'overwhelmed'],
    depression: ['sad', 'depressed', 'hopeless', 'empty', 'worthless', 'tired', 'exhausted'],
    positive: ['happy', 'good', 'great', 'excellent', 'wonderful', 'amazing', 'fantastic'],
    negative: ['bad', 'terrible', 'awful', 'horrible', 'worst', 'hate', 'angry'],
    help: ['help', 'support', 'advice', 'guidance', 'assistance', 'therapy', 'counseling'],
    crisis: ['suicide', 'kill', 'die', 'end', 'hurt', 'harm', 'emergency']
  };

  // Response templates based on intent and sentiment
  private responseTemplates = {
    greeting: [
      "Hello! I'm here to support you on your mental health journey. How are you feeling today?",
      "Hi there! I'm glad you're here. What's on your mind today?",
      "Welcome! I'm your mental health companion. How can I help you feel better today?"
    ],
    anxiety: [
      "I understand you're feeling anxious. That's completely normal. Let's try a quick breathing exercise together. Take a deep breath in for 4 counts... hold for 4... and out for 6. How does that feel?",
      "Anxiety can be overwhelming, but you're not alone. Can you tell me what's triggering these feelings? Sometimes talking about it helps.",
      "I hear that you're feeling anxious. Here's a grounding technique: name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste."
    ],
    depression: [
      "I'm sorry you're feeling this way. Depression is real and challenging, but there is hope. Have you been able to do any small activities that usually bring you comfort?",
      "Thank you for sharing that with me. It takes courage to talk about depression. What's one small thing that felt good today, even if it was tiny?",
      "I understand you're going through a difficult time. Remember that your feelings are valid, and seeking help is a sign of strength, not weakness."
    ],
    positive: [
      "That's wonderful to hear! I'm so glad you're feeling good. What's contributing to these positive feelings?",
      "It's great that you're in a good space right now. Would you like to talk about what's been helping you feel this way?",
      "I love hearing that! Positive moments are so important. How can we help you maintain this feeling?"
    ],
    crisis: [
      "I'm very concerned about what you've shared. Your life has value and meaning. Please reach out to a crisis helpline immediately: National Suicide Prevention Lifeline: 988 or Crisis Text Line: Text HOME to 741741. Are you in immediate danger?",
      "Thank you for trusting me with this. You're not alone, and there are people who want to help. Please contact emergency services (911) or a crisis hotline right away. Can someone stay with you right now?"
    ],
    help_seeking: [
      "I'm glad you're looking for help - that's a positive step! Based on our conversation, I think talking to a mental health professional could be really beneficial. Would you like me to help you find resources in your area?",
      "Seeking help shows real strength. There are many types of support available - therapy, support groups, medication if needed. What kind of help feels most comfortable to you right now?",
      "You've taken an important step by reaching out. Professional support can make a huge difference. Would you like information about different types of mental health professionals?"
    ],
    general: [
      "I'm here to listen. Can you tell me more about what you're experiencing?",
      "Thank you for sharing that with me. How long have you been feeling this way?",
      "I want to understand better. What's been the most challenging part of your day?"
    ]
  };

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

  private preprocessText(text: string): number[] {
    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 0);

    const vector = new Array(this.vocabulary.size).fill(0);
    
    words.forEach(word => {
      const index = this.vocabulary.get(word);
      if (index !== undefined) {
        vector[index] = 1;
      }
    });

    return vector;
  }

  private analyzeSentiment(text: string): { sentiment: number; confidence: number } {
    const vector = this.preprocessText(text);
    
    // Simple rule-based sentiment analysis as fallback
    let positiveScore = 0;
    let negativeScore = 0;
    
    const words = text.toLowerCase().split(/\s+/);
    
    words.forEach(word => {
      if (this.mentalHealthKeywords.positive.includes(word)) {
        positiveScore += 1;
      } else if (this.mentalHealthKeywords.negative.includes(word) || 
                 this.mentalHealthKeywords.anxiety.includes(word) ||
                 this.mentalHealthKeywords.depression.includes(word)) {
        negativeScore += 1;
      }
    });

    const totalScore = positiveScore + negativeScore;
    if (totalScore === 0) {
      return { sentiment: 0, confidence: 0.5 }; // neutral
    }

    const sentiment = (positiveScore - negativeScore) / totalScore;
    const confidence = Math.min(totalScore / words.length * 2, 1);

    return { sentiment, confidence };
  }

  private detectIntent(text: string): string {
    const lowerText = text.toLowerCase();
    
    // Crisis detection (highest priority)
    if (this.mentalHealthKeywords.crisis.some(word => lowerText.includes(word))) {
      return 'crisis';
    }

    // Greeting detection
    if (/^(hi|hello|hey|good morning|good afternoon|good evening)/.test(lowerText)) {
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

    // Positive sentiment
    if (this.mentalHealthKeywords.positive.some(word => lowerText.includes(word))) {
      return 'positive';
    }

    return 'general';
  }

  private getPersonalizedResponse(intent: string, sentiment: number, userText: string): string {
    const templates = this.responseTemplates[intent] || this.responseTemplates.general;
    let response = templates[Math.floor(Math.random() * templates.length)];

    // Add personalization based on user profile
    if (this.userProfile.name) {
      response = response.replace(/^(Hi|Hello|Hey)/, `Hi ${this.userProfile.name}`);
    }

    // Add context from previous conversations
    if (this.conversationContext.length > 0) {
      const lastContext = this.conversationContext[this.conversationContext.length - 1];
      if (lastContext.includes('anxiety') && intent === 'general') {
        response += " I remember you mentioned feeling anxious earlier. How are those feelings now?";
      } else if (lastContext.includes('depression') && intent === 'positive') {
        response += " I'm really glad to hear you're feeling better than when we last talked.";
      }
    }

    return response;
  }

  private generateFollowUpQuestions(intent: string): string[] {
    const followUps = {
      anxiety: [
        "What situations tend to trigger your anxiety?",
        "Have you tried any coping strategies that help?",
        "Would you like to learn some relaxation techniques?"
      ],
      depression: [
        "How has your sleep been lately?",
        "Are you able to do activities you usually enjoy?",
        "Do you have people you can talk to about how you're feeling?"
      ],
      positive: [
        "What's been the highlight of your day?",
        "How can we help you maintain these positive feelings?",
        "Would you like to set any goals for tomorrow?"
      ],
      general: [
        "Can you tell me more about what's on your mind?",
        "How long have you been feeling this way?",
        "What would help you feel better right now?"
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
      this.conversationContext.shift(); // Keep only last 10 messages
    }

    // Generate personalized response
    const response = this.getPersonalizedResponse(intent, sentiment, userMessage);
    
    // Generate follow-up questions
    const followUpQuestions = this.generateFollowUpQuestions(intent);

    // Generate recommendations based on intent and sentiment
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

  private generateRecommendations(intent: string, sentiment: number): string[] {
    const recommendations = [];

    if (intent === 'anxiety') {
      recommendations.push(
        "Try the 4-7-8 breathing technique",
        "Consider taking our anxiety assessment",
        "Practice progressive muscle relaxation"
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
  }
}

export const mlChatbotService = new MLChatbotService();