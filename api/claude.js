export default async function handler(req, res) {
  try {
    const { message } = req.body;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.CLAUDE_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet",
        max_tokens: 300,
        messages: [
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const text = await response.text(); // ←重要

    console.log("Claude raw:", text);

    if (!response.ok) {
      return res.status(500).json({
        error: text
      });
    }

    const data = JSON.parse(text);

    res.status(200).json({
      reply: data.content[0].text
    });

  } catch (e) {
    res.status(500).json({
      error: e.message
    });
  }
}
