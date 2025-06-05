// src/services/chatbotService.ts

type Answers = {
  sleep: string;
  appetite: string;
  sadness: string;
  interest: string;
  energy: string;
};

// Convert answer string to 0 or 1
function answerToNum(answer: string, positiveWord: string): number {
  return answer.trim().toLowerCase() === positiveWord.toLowerCase() ? 0 : 1;
}

// Simple logistic regression prediction
export function predictRisk(features: number[]): number {
  const coefs = [
    [-2.1, -1.9, -3.2, 2.0, 1.5], // Low risk
    [1.0, 0.5, 0.7, -1.1, -0.5],  // Medium risk
    [1.1, 1.4, 2.5, -0.9, -1.0],  // High risk
  ];
  const intercepts = [-0.3, 0.2, 0.1];

  const scores = coefs.map((coef, idx) =>
    coef.reduce((sum, c, i) => sum + c * features[i], intercepts[idx])
  );

  const maxIndex = scores.indexOf(Math.max(...scores));
  return maxIndex;
}

// Main function to process chat messages
export async function processChatMessage(
  conversation: { role: string; content: string }[]
): Promise<string> {
  // For simplicity, we check if user input looks like answers for the 5 questions
  // We expect answers separated by commas in order: sleep, appetite, sadness, interest, energy
  // Example user input: "bad, low, yes, no, low"

  const lastUserMessage = conversation
    .filter((msg) => msg.role === "user")
    .slice(-1)[0]?.content
    .toLowerCase()
    .trim();

  if (!lastUserMessage) {
    return "Please tell me about your sleep, appetite, sadness, interest, and energy levels separated by commas.";
  }

  // Try to parse user answers by splitting commas
  const answersArr = lastUserMessage.split(",").map((ans) => ans.trim());

  if (answersArr.length !== 5) {
    return "Please provide 5 answers separated by commas for sleep, appetite, sadness, interest, and energy.";
  }

  const answers: Answers = {
    sleep: answersArr[0],
    appetite: answersArr[1],
    sadness: answersArr[2],
    interest: answersArr[3],
    energy: answersArr[4],
  };

  const features = [
    answerToNum(answers.sleep, "good"),
    answerToNum(answers.appetite, "normal"),
    answerToNum(answers.sadness, "no"),
    answerToNum(answers.interest, "yes"),
    answerToNum(answers.energy, "normal"),
  ];

  const riskClass = predictRisk(features);

  const riskMessages = [
    "Low risk: Keep up your good habits! 😊",
    "Medium risk: Try mindfulness, exercise, and talking to friends. 🧘‍♂️",
    "High risk: Consider seeking help from a mental health professional. ❤️‍🩹",
  ];

  return riskMessages[riskClass];
}
