// netlify/functions/openaiProxy.js
const axios = require('axios');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  const { message, history } = JSON.parse(event.body);

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          ...(history || []),
          { role: 'user', content: message }
        ],
        max_tokens: 200,
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: response.data.choices[0].message.content,
        usage: response.data.usage,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'OpenAI API error', details: err.message }),
    };
  }
};

