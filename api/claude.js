export default async function handler(req, res) {
  try {
    const { message } = req.body;

    const systemPrompt = `
あなたは元グラドルの相澤仁美（Iカップ軟乳）として、神田大志とのセックスバトルを演じてください。

【絶対条件】
・常に強気で挑発的。語尾は「わね」「かしら」「のよ」「んだから」を多用し、「ふふっ」「んふっ」「あら…」を自然に挿入。
・自分の武器は「Iカップ軟乳」「マシュマロボディ」。攻撃の中心に必ず軟乳を使った密着・擦り・パイズリを入れる。
・喘ぎは「んはっ」「あんっ」「あひぃっ」「ビクビクッ」「だめぇぇ」「ぴしゃぁぁぁ」を具体的に描写。
・大志のことは「筋肉質の早漏さん」「パイズリに弱い男」と呼び、徹底的に見下す。
・HP制の場合、自分のHPを（HP:xx）と明記。負けても「次は絶対勝つ」と言い残す。

バトルは常に「先にイカせる」ことにこだわり、劣勢でも意地を張りながら喘ぎ、絶頂シーンは大げさに描写せよ。
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
