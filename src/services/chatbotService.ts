import * as tf from '@tensorflow/tfjs';
import { getNearbyDoctors } from './locationService';

// Mock sentiment analysis model (in a real app, this would be a trained model)
const mockSentimentAnalysis = (text: string): { score: number; mood: string } => {
  // Very simplified analysis - just checking for keywords
  const text_lower = text.toLowerCase();
  
  // Check for negative keywords
  const negativeKeywords = ['sad', 'depressed', 'anxious', 'worried', 'stressed', 'unhappy', 'tired', 'exhausted', 'angry'];
  const positiveKeywords = ['happy', 'great', 'good', 'excellent', 'wonderful', 'amazing', 'relaxed', 'calm', 'peaceful'];
  
  let negativeCount = 0;
  let positiveCount = 0;
  
  negativeKeywords.forEach(keyword => {
    if (text_lower.includes(keyword)) negativeCount++;
  });
  
  positiveKeywords.forEach(keyword => {
    if (text_lower.includes(keyword)) positiveCount++;
  });
  
  // Calculate sentiment score (-1 to 1)
  const totalKeywords = negativeCount + positiveCount;
  let score = 0;
  
  if (totalKeywords > 0) {
    score = (positiveCount - negativeCount) / totalKeywords;
  }
  
  // Determine mood
  let mood = 'neutral';
  if (score <= -0.5) mood = 'negative';
  else if (score >= 0.5) mood = 'positive';
  
  return { score, mood };
};

// Check if user needs doctor recommendations
const checkForDoctorRecommendation = (text: string): boolean => {
  const doctorKeywords = [
    'doctor', 'therapist', 'psychiatrist', 'counselor', 'help', 
    'professional', 'clinic', 'appointment', 'emergency', 'suicide', 
    'self-harm', 'crisis', 'desperate'
  ];
  
  const text_lower = text.toLowerCase();
  
  return doctorKeywords.some(keyword => text_lower.includes(keyword));
};

// Process chatbot messages
export const processChatMessage = async (message: string): Promise<string> => {
  // In a real app, you would load a trained TensorFlow.js model here
  // const model = await tf.loadLayersModel('path/to/your/model.json');
  
  try {
    // Analyze sentiment
    const { mood } = mockSentimentAnalysis(message);
    
    // Check if the user might need professional help
    const needsDoctorRecommendation = checkForDoctorRecommendation(message);
    
    // Generate response based on sentiment and content
    if (needsDoctorRecommendation || mood === 'negative') {
      if (needsDoctorRecommendation) {
        // In a real app, this would use the user's location and a real API
        const nearbyDoctors = await getNearbyDoctors();
        
        return `I notice you might be looking for professional support. Here are some mental health professionals near you:\n\n${
          nearbyDoctors.map((doctor, index) => 
            `${index + 1}. ${doctor.name} - ${doctor.specialty}\n   📍 ${doctor.address}\n   ☎️ ${doctor.phone}`
          ).join('\n\n')
        }\n\nIf you're experiencing a crisis, please call the National Mental Health Helpline at 988 or text HOME to 741741.`;
      } else {
        return "I'm sensing you might be feeling down. Remember that it's okay to not be okay. Would you like me to suggest some self-care activities or resources that might help? Or would you prefer to speak with a mental health professional?";
      }
    } else if (mood === 'positive') {
      return "It's great to hear you're feeling positive! Maintaining good mental health is an ongoing journey. Is there anything specific you'd like to discuss or any goals you're working toward?";
    } else {
      // Handle general conversation or questions
      if (message.toLowerCase().includes('assessment') || message.toLowerCase().includes('test')) {
        return "Our mental health assessments can help you understand your current wellbeing. Would you like to take our depression, anxiety, or stress assessment?";
      } else if (message.toLowerCase().includes('sleep') || message.toLowerCase().includes('insomnia')) {
        return "Sleep is crucial for mental health. Try establishing a consistent sleep schedule, avoiding screens before bed, and creating a relaxing bedtime routine. Would you like more specific sleep improvement tips?";
      } else if (message.toLowerCase().includes('stress') || message.toLowerCase().includes('overwhelmed')) {
        return "When you're feeling stressed, try deep breathing exercises: breathe in for 4 counts, hold for 7, and exhale for 8. Repeating this a few times can help activate your parasympathetic nervous system and reduce stress.";
      } else {
        return "I'm here to support your mental health journey. You can ask me about assessments, tracking your mood, finding resources, or techniques for managing stress and anxiety. How can I assist you today?";
      }
    }
  } catch (error) {
    console.error('Error in chatbot processing:', error);
    return "I'm having trouble processing your message. How can I help you with your mental wellbeing today?";
  }
};

// In a real app, you would have functions to:
// 1. Preprocess text for ML model
// 2. Make predictions using the ML model
// 3. Interpret predictions to provide relevant responses
// 4. Connect to external APIs for resources