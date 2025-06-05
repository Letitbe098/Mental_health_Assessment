const fetch = require('node-fetch');

exports.handler = async (event) => {
  // Debug: Log the incoming event
  console.log("Received event:", event);

  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "No body received" }),
    };
  }

  let messages;
  try {
    const parsed = JSON.parse(event.body);
    messages = parsed.messages;
    if (!messages) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "No 'messages' field in body" }),
      };
    }
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid JSON body" }),
    };
  }

  const openAIKey = process.env.OPENAI_API_KEY;
  if (!openAIKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing OPENAI_API_KEY" }),
    };
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openAIKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messages,
        max_tokens: 200
      })
    });

    const data = await response.json();
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Invalid response from OpenAI", details: data }),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify({ reply: data.choices[0].message.content })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch from OpenAI API', details: error.message })
    };
  }
};
