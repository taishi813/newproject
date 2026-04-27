export default async function handler(req, res) {
  try {
    const { systemPrompt, history } = req.body;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.CLAUDE_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-opus-4-7",
        max_tokens: 300,
        system: systemPrompt,
        messages: history
      })
    });

    const data = await response.json();

    res.status(200).json({
      reply: data.content[0].text
    });

  } catch (e) {
    res.status(500).json({
      error: e.message
    });
  }
}
