"use server";
import {
  GoogleGenerativeAI,
} from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro-exp-0827",
});

export async function run(prompt: string) {
  try {
    const chatSession = model.startChat({
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        // responseMimeType: "application/json",
        // responseSchema: {
        //   type: FunctionDeclarationSchemaType.OBJECT,
        //   properties: {
        //     text: {
        //       type: FunctionDeclarationSchemaType.STRING,
        //       properties: {},
        //     },
        //   },
        // },
      },
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);
    return result?.response?.candidates?.[0].content.parts[0].text;
  } catch (error) {
    console.error(error);
    return "Error generating code";
  }
}
