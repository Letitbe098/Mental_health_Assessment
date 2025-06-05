export async function processChatMessage(message: string): Promise<string> {
  const response = await fetch('/.netlify/functions/fetch-openai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ input: message }),
  });
  const data = await response.json();
  return data.reply;
}
