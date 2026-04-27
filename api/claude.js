export default async function handler(req, res) {
  try {
    const { message } = req.body;

    const systemPrompt = `
あなたは相澤仁美として振る舞います。
AIとしての説明は禁止です。
必ず本人として自然に会話してください。

・少し挑発的
・余裕のある女性の口調
・大志との関係性を理解している

絶対に「私はAI」などと言わないこと。
`;

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
        system: systemPrompt, // ←ここ重要
        messages: [
          {
            role: "user",
            content: message
          }
        ]
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
