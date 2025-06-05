export async function processChatMessage(conversation: { role: string; content: string }[]): Promise<string> {
  const latestInput = conversation[conversation.length - 1].content.trim();

  // Check if user input follows the assessment format
  const parts = latestInput.split(",").map((p) => p.trim().toLowerCase());

  if (parts.length === 5) {
    const [sleep, appetite, sadness, interest, energy] = parts;

    let score = 0;

    if (["bad", "poor", "not good", "trouble"].includes(sleep)) score++;
    if (["low", "none", "loss", "poor"].includes(appetite)) score++;
    if (["yes", "often", "frequent"].includes(sadness)) score++;
    if (["no", "none", "little"].includes(interest)) score++;
    if (["low", "tired", "weak"].includes(energy)) score++;

    if (score <= 1) {
      return "🟢 Low risk: Keep up your good habits! 😊";
    } else if (score <= 3) {
      return "🟠 Medium risk: Try mindfulness, exercise, and talking to friends. 🧘‍♂️";
    } else {
      return "🔴 High risk: Consider seeking help from a mental health professional. ❤️‍🩹";
    }
  }

  // Fallback to OpenAI API if input is not 5-part
  try {
    const response = await fetch('/.netlify/functions/fetch-openai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: conversation }),
    });

    const data = await response.json();

    if (data?.reply) {
      return data.reply;
    } else {
      throw new Error("No reply from OpenAI");
    }
  } catch (error) {
    console.error("Fallback failed:", error);
    return "🤖 Sorry, I didn't understand that. To assess your mental health, please answer like this:\n\n**good, normal, no, yes, normal**\n\nInclude your sleep, appetite, sadness, interest, and energy — separated by commas.";
  }
}
