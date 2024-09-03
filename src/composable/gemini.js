import { VertexAI } from '@google-cloud/vertexai';
const vertexAI = new VertexAI({
    project: 'my-project-15193-name-diary',
    location: 'us-central1'
});

const generativeModel = vertexAI.getGenerativeModel({model: 'gemini-1.5-pro'});

async function streamChat() {
    const chat = generativeModel.startChat();
    const chatInput = "GeminiとChatGPTとClaudeとの違いを比較して分析して最終的には用途別におすすめしてください。";
    const result = await chat.sendMessageStream(chatInput);
    for await (const item of result.stream) {
        console.log("Stream chunk: ", item.candidates[0].content.parts[0].text);
    }
    const aggregatedResponse = await result.response;
    console.log('Aggregated response: ', JSON.stringify(aggregatedResponse));
  }
  
  streamChat();
