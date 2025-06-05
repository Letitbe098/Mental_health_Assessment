// src/services/chatbotService.ts

// ML helper functions (same as before)
type Answers = {
  sleep: string;
  appetite: string;
  sadness: string;
  interest: string;
  energy: string;
};

// Convert answer string to 0 or 1 (assumes positive word means healthy)
function answerToNum(answer: string, positiveWord: string): number {
  return answer.trim().toLowerCase() === positiveWord.toLowerCase() ? 0 : 1;
}

// Simple logistic regression prediction function
function predictRisk(features: number[]): number {
  // Coefficients for 3 classes (Low, Medium, High risk)
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

// The main function exposed to your chatbot component
export async function processChatMessage(conversation: { role: string; content: string }[]): Promise<string> {
  // Get last user message text
  const lastUserMessage = conversation
    .filter((msg) => msg.role === "user")
    .slice(-1)[0]?.content
    .toLowerCase()
    .trim();

  if (!lastUserMessage) {
    return "Please tell me about your sleep, appetite, sadness, interest, and energy levels separated by commas.";
  }

  // Detect if user input looks like an assessment response: 5 comma-separated parts
  const answersArr = lastUserMessage.split(",").map(ans => ans.trim());

  if (answersArr.length === 5) {
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

  // Else fallback to calling your existing OpenAI API function
  const response = await fetch('/.netlify/functions/fetch-openai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: conversation }),
  });
  const data = await response.json();

  return data.reply;
}
