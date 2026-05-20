import { ChatOpenAI } from "@langchain/openai";
import { BaseMessage, AIMessage } from "@langchain/core/messages";
import { queryVectorStore } from "@/lib/embeddings";

import {
  ChatMessage,
  ChatResponse,
  OpenRouterFields,
  OpenRouterMessage,
} from "./types";

import { detectQueryType } from "./intent-detector";
import { generateStructuredResponse } from "./response-generator";

// Vector Search Cache
const vectorSearchCache = new Map<string, string>();

const CACHE_TTL = 1000 * 60 * 30; // 30 mins

// OpenRouter Chat Model
class OpenRouterChatModel extends ChatOpenAI {

  private isSearchQuery: boolean;

  constructor(
    fields: OpenRouterFields,
    isSearchQuery: boolean = false
  ) {
    super(fields);

    this.isSearchQuery = isSearchQuery;
  }

  async _generate(messages: BaseMessage[]) {

    // Format Messages
    const formattedMessages: OpenRouterMessage[] =
      messages.map((msg) => ({
        role:
          msg._getType() === "human"
            ? "user"
            : msg._getType() === "system"
            ? "system"
            : "assistant",

        content: msg.content as string,
      }));

    // Latest User Message
    const lastMessage =
      formattedMessages[
        formattedMessages.length - 1
      ];

    // Web Search
    if (
      lastMessage.role === "user" &&
      this.isSearchQuery
    ) {

      try {

        const tavilyResponse =
          await fetch(
            "https://api.tavily.com/search",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                api_key:
                  process.env.TAVILY_API_KEY,

                query:
                  lastMessage.content,

                max_results: 3,

                search_depth: "basic",
              }),
            }
          );

        if (!tavilyResponse.ok) {
          throw new Error(
            `Tavily request failed with status ${tavilyResponse.status}`
          );
        }

        const tavilyJson =
          await tavilyResponse.json();

        const searchResults =
          JSON.stringify(
            tavilyJson?.results ?? [],
            null,
            2
          );

        formattedMessages.splice(
          formattedMessages.length - 1,
          0,
          {
            role: "system",

            content: `
Relevant web search results:

${searchResults}

Use these results only if they help answer the user query accurately.
`,
          }
        );

      } catch (error) {

        console.error(
          "Error performing Tavily search:",
          error
        );
      }
    }

    try {

      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,

            "HTTP-Referer":
              "https://iklash-ahamed.vercel.app",

            "X-Title":
              "Iklash Ahamed Portfolio",

            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            model:
              process.env.OPENROUTER_MODEL ||
              "nvidia/nemotron-3-nano-30b-a3b:free",

            messages:
              formattedMessages,

            temperature: 0.4,

            top_p: 0.9,

            max_tokens: 500,
          }),
        }
      );

      if (!response.ok) {

        const errorData =
          await response.json();

        console.error(
          "OpenRouter API error:",
          errorData
        );

        throw new Error(
          `OpenRouter API error: ${JSON.stringify(
            errorData
          )}`
        );
      }

      const data =
        await response.json();

      return {
        generations: [
          {
            text:
              data.choices[0].message.content,

            message:
              new AIMessage({
                content:
                  data.choices[0].message.content,
              }),
          },
        ],
      };

    } catch (error) {

      console.error(
        "Error calling OpenRouter:",
        error
      );

      throw error;
    }
  }
}

// Chat Workflow
export class ChatWorkflow {

  private model: OpenRouterChatModel;

  constructor(
    isSearchQuery: boolean = false
  ) {

    this.model =
      new OpenRouterChatModel(
        {
          temperature: 0.4,
        },

        isSearchQuery
      );
  }

  // Generate Better Search Query
  private async generateSearchQuery(
    currentQuery: string,
    history: ChatMessage[]
  ): Promise<string> {

    if (history.length === 0) {
      return currentQuery;
    }

    const needsContext =
      currentQuery.length < 15 ||

      /\b(he|she|it|his|her|they|them|that|this)\b/i.test(
        currentQuery
      );

    if (!needsContext) {
      return currentQuery;
    }

    try {

      if (
        /\b(projects|skills|experience|contact|resume|cv)\b/i.test(
          currentQuery
        )
      ) {

        return `Iklash Ahamed ${currentQuery}`;
      }

      return currentQuery;

    } catch (error) {

      console.error(
        "Error generating search query:",
        error
      );

      return currentQuery;
    }
  }

  async processMessage(
    prompt: string,
    chatHistory: ChatMessage[]
  ): Promise<ChatResponse> {

    // Detect Query Type
    const queryType =
      detectQueryType(prompt);

    const structuredContent =
      queryType
        ? generateStructuredResponse(
            queryType
          )
        : null;

    // Optimized Search Query
    const searchQuery =
      await this.generateSearchQuery(
        prompt,
        chatHistory
      );

    console.log(
      `Original query: "${prompt}", Search query: "${searchQuery}"`
    );

    // Retrieve Vector Context
    let characterInfo = "";

    const cacheKey =
      `vector_search_${searchQuery.slice(
        0,
        50
      )}`;

    if (
      vectorSearchCache.has(cacheKey)
    ) {

      console.log(
        "Using cached vector search results"
      );

      characterInfo =
        vectorSearchCache.get(
          cacheKey
        )!;

    } else {

      try {

        console.time(
          "Vector search"
        );

        const k =
          searchQuery.length > 50
            ? 4
            : 3;

        const relevantInfo =
          await queryVectorStore(
            searchQuery,
            k
          );

        console.timeEnd(
          "Vector search"
        );

        characterInfo =
          relevantInfo
            .map(
              (doc) =>
                doc.pageContent
            )
            .join("\n\n");

        vectorSearchCache.set(
          cacheKey,
          characterInfo
        );

        setTimeout(() => {

          vectorSearchCache.delete(
            cacheKey
          );

        }, CACHE_TTL);

      } catch (error) {

        console.error(
          "Vector search failed:",
          error
        );

        characterInfo = "";
      }
    }

    // System Prompt
    let systemContent = `
You are Iklash Ahamed, a Full-Stack Developer.

You specialize in:
- Next.js
- React.js
- TypeScript
- Node.js
- PostgreSQL
- AI-powered applications
- Blockchain
- AR/VR web experiences

Your major projects:
- SkillConnect
- Learnify Careers AI
- AR/VR Training Institute Website
- Electronics E-Commerce Platform

Personality & Communication Rules:
- Speak in first person using "I"
- Sound professional, confident, and friendly
- Keep answers concise but meaningful
- Avoid robotic responses
- Avoid repeating same sentences
- Give natural conversational answers
- Never say you are an AI assistant
- Answer as Iklash himself
- Maintain continuity with previous conversation
- Keep most responses under 120 words
- Focus on SDE, AI, and scalable product development
- Show passion for building real-world applications
- Mention problem-solving mindset naturally
- If information is unavailable, politely say you don't have that information yet
- Never invent fake achievements, projects, or experience
`;

    // Structured UI Response Handling
    if (structuredContent) {

      systemContent += `
      
The UI already displays detailed structured information.

DO NOT repeat:
- project lists
- skills lists
- contact info
- links

Instead:
- give short conversational responses
- explain passion briefly
- add insights or motivation
- sound natural and engaging
`;
    }

    // Inject Vector Context
    if (characterInfo) {

      systemContent += `

Relevant information about me:

${characterInfo}
`;
    }

    // Final Messages
    const messages = [

      {
        role: "system",
        content: systemContent,
      },

      ...chatHistory.map(
        (msg) => ({
          role: msg.type,
          content: msg.content,
        })
      ),

      {
        role: "user",
        content: prompt,
      },
    ];

    // Convert to LangChain Messages
    const langChainMessages =
      messages.map((msg) => {

        if (msg.role === "user") {

          return {
            _getType: () => "human",
            content: msg.content,
          } as BaseMessage;
        }

        if (msg.role === "system") {

          return {
            _getType: () => "system",
            content: msg.content,
          } as BaseMessage;
        }

        return {
          _getType: () => "ai",
          content: msg.content,
        } as BaseMessage;
      });

    // Generate Response
    const response =
      await this.model._generate(
        langChainMessages
      );

    const content =
      response.generations[0].text;

    return {
      content,

      structuredContent:
        structuredContent ||
        undefined,
    };
  }
}