export async function processChatMessage(conversation: { role: string; content: string }[]): Promise<string> {
  const response = await fetch('/.netlify/functions/fetch-openai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: conversation }),
  });
  const data = await response.json();
  return data.reply;
}
