import * as dotenv from "dotenv";

import { fileURLToPath } from "url";

import {
  dirname,
  resolve,
} from "path";

import { Document } from "@langchain/core/documents";

import { PineconeStore } from "@langchain/pinecone";

import { Pinecone } from "@pinecone-database/pinecone";

// Character Content
import { characterContent } from "../components/character/character.js";

// Embeddings
import { getEmbeddings } from "../lib/embeddings.js";

// Load Environment Variables
const __filename = fileURLToPath(
  import.meta.url
);

const __dirname = dirname(
  __filename
);

dotenv.config({
  path: resolve(
    __dirname,
    "../.env"
  ),
});

// Debug Logs
console.log(
  "PINECONE_API_KEY exists:",
  !!process.env.PINECONE_API_KEY
);

console.log(
  "GOOGLE_API_KEY exists:",
  !!process.env.GOOGLE_API_KEY
);

// Split Text Into Chunks
function splitTextIntoChunks(
  text: string,
  chunkSize: number
): string[] {

  const chunks: string[] = [];

  const sections =
    text.split(/\n\n+/);

  let currentChunk = "";

  for (const section of sections) {

    if (
      (
        currentChunk +
        section
      ).length <= chunkSize
    ) {

      currentChunk +=
        (
          currentChunk
            ? "\n\n"
            : ""
        ) + section;

    } else {

      if (currentChunk) {
        chunks.push(
          currentChunk
        );
      }

      // Split Large Sections
      if (
        section.length >
        chunkSize
      ) {

        const sentences =
          section.split(
            /(?<=[.!?])\s+/
          );

        let sectionChunk = "";

        for (const sentence of sentences) {

          if (
            (
              sectionChunk +
              sentence
            ).length <= chunkSize
          ) {

            sectionChunk +=
              (
                sectionChunk
                  ? " "
                  : ""
              ) + sentence;

          } else {

            if (
              sectionChunk
            ) {
              chunks.push(
                sectionChunk
              );
            }

            sectionChunk =
              sentence;
          }
        }

        if (sectionChunk) {
          chunks.push(
            sectionChunk
          );
        }

      } else {

        currentChunk =
          section;
      }
    }
  }

  if (currentChunk) {
    chunks.push(
      currentChunk
    );
  }

  return chunks;
}

// Identify Section
function identifySection(
  chunk: string
): string {

  const lowerChunk =
    chunk.toLowerCase();

  if (
    lowerChunk.includes(
      "summary"
    )
  )
    return "summary";

  if (
    lowerChunk.includes(
      "experience"
    )
  )
    return "experience";

  if (
    lowerChunk.includes(
      "education"
    )
  )
    return "education";

  if (
    lowerChunk.includes(
      "projects"
    )
  )
    return "projects";

  if (
    lowerChunk.includes(
      "skills"
    )
  )
    return "skills";

  if (
    lowerChunk.includes(
      "awards"
    )
  )
    return "awards";

  if (
    lowerChunk.includes(
      "languages"
    )
  )
    return "languages";

  if (
    lowerChunk.includes(
      "hobbies"
    )
  )
    return "hobbies";

  if (
    lowerChunk.includes(
      "contact"
    ) ||
    lowerChunk.includes(
      "email"
    ) ||
    lowerChunk.includes(
      "phone"
    )
  )
    return "contact";

  return "general";
}

// Initialize Vector Store
async function initializeVectorStore() {

  try {

    // Validate Environment Variables
    if (
      !process.env
        .PINECONE_API_KEY
    ) {

      throw new Error(
        "PINECONE_API_KEY is missing"
      );
    }

    if (
      !process.env
        .GOOGLE_API_KEY
    ) {

      throw new Error(
        "GOOGLE_API_KEY is missing"
      );
    }

    console.log(
      "API keys found. Initializing..."
    );

    // Initialize Pinecone
    const pinecone =
      new Pinecone({
        apiKey:
          process.env
            .PINECONE_API_KEY,
      });

    // Split Character Content
    const chunks =
      splitTextIntoChunks(
        characterContent,
        500
      );

    console.log(
      `Created ${chunks.length} chunks`
    );

    chunks.forEach(
      (chunk, i) => {

        console.log(
          `Chunk ${i + 1}: ${chunk.substring(
            0,
            60
          )}...`
        );
      }
    );

    // Create Documents
    const documents =
      chunks.map(
        (chunk, i) =>
          new Document({
            pageContent:
              chunk,

            metadata: {
              source:
                "character",

              chunk: i,

              section:
                identifySection(
                  chunk
                ),
            },
          })
      );

    // Index Name
    const indexName =
      process.env
        .PINECONE_INDEX_NAME ||
      "iklash-portfolio";

    console.log(
      `Using index: ${indexName}`
    );

    // Existing Indexes
    const indexes =
      await pinecone.listIndexes();

    const indexExists =
      indexes.indexes?.some(
        (index) =>
          index.name ===
          indexName
      ) || false;

    // Create Index If Missing
    if (!indexExists) {

      console.log(
        `Creating index ${indexName}...`
      );

      await pinecone.createIndex({
        name: indexName,

        dimension: 768,

        metric: "cosine",

        spec: {
          serverless: {
            cloud: "aws",

            region:
              "us-east-1",
          },
        },
      });

      console.log(
        "Waiting for index initialization..."
      );

      await new Promise(
        (resolve) =>
          setTimeout(
            resolve,
            60000
          )
      );

      console.log(
        "Index created successfully"
      );

    } else {

      console.log(
        `Index ${indexName} already exists`
      );

      // Delete Existing Vectors
      try {

        const existingIndex =
          pinecone.Index(
            indexName
          );

        console.log(
          "Deleting existing vectors..."
        );

        await existingIndex
          .namespace(
            "character-info"
          )
          .deleteAll();

        console.log(
          "Existing vectors deleted"
        );

      } catch (error) {

        console.error(
          "Error deleting vectors:",
          error
        );
      }
    }

    // Get Index
    const index =
      pinecone.Index(
        indexName
      );

    // Embeddings
    const embeddings =
      getEmbeddings();

    console.log(
      "Creating vector store..."
    );

    // Create Vector Store
    const vectorStore =
      await PineconeStore.fromDocuments(
        documents,
        embeddings,
        {
          pineconeIndex:
            index as any,

          namespace:
            "character-info",
        }
      );

    console.log(
      "Vector store initialized successfully"
    );

    // Test Similarity Search
    console.log(
      "Running test similarity search..."
    );

    const testQuery =
      "What are Iklash Ahamed's skills?";

    const results =
      await vectorStore.similaritySearch(
        testQuery,
        2
      );

    console.log(
      "Similarity Search Results:"
    );

    results.forEach(
      (result, i) => {

        console.log(
          `Result ${i + 1}: ${result.pageContent.substring(
            0,
            100
          )}...`
        );
      }
    );

    return vectorStore;

  } catch (error) {

    console.error(
      "Error initializing vector store:",
      error
    );

    throw error;
  }
}

// Main Function
async function main() {

  console.log(
    "Starting vector store initialization..."
  );

  try {

    await initializeVectorStore();

    console.log(
      "Vector store initialization completed successfully!"
    );

  } catch (error) {

    console.error(
      "Failed to initialize vector store:",
      error
    );
  }

  process.exit(0);
}

main();