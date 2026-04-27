export default async function handler(req, res) {
  const { character, mode, location, time, history } = req.body;

  let instruction = "";

  if (mode === "chat") {
    instruction = "キャラになりきって自然に会話してください。";
  }

  if (mode === "battle") {
    instruction = `場所:${location} 時間:${time} バトルを描写してください。`;
  }

  const messages = [
    {
      role: "user",
      content: `
${character}

${instruction}

過去会話:
${JSON.stringify(history)}
`
    }
  ];

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.CLAUDE_API_KEY,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 300,
      messages
    })
  });

  const data = await response.json();

  res.status(200).json({
    reply: data.content[0].text
  });
}
