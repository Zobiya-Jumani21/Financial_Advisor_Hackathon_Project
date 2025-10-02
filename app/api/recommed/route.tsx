import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const prompt = `
You are an investment advisor.
Budget: ${data.budget}
Risk Tolerance: ${data.riskTolerance}
Time Horizon: ${data.timeHorizon}

Return only JSON, strictly following this structure:
\`\`\`json
{
  "totalAmount": 0,
  "expectedAnnualReturn": "",
  "riskProfile": "",
  "recommendations": [
    {"id": "", "name": "", "description": "", "percentage": 0, "amount": 0, "riskLevel": "", "expectedReturn": "", "reasoning": ""}
  ],
  "summary": ""
}
\`\`\`
`;


    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const resultStr = response.choices[0].message?.content || "{}";

    let result;
    try {
      result = JSON.parse(resultStr);
    } catch (e) {
      console.error("Error parsing AI response:", resultStr);
      result = {};
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error("API route error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
