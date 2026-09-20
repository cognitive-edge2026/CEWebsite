import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI {
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY || "",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();

  // Robust environment detection:
  // - In AI Studio development, 'npm run dev' requires port 3000 and Vite middleware.
  // - In Cloud Run production, the container must serve prebuilt dist/ files and bind to process.env.PORT (default 8080).
  const distExists = fs.existsSync(path.join(process.cwd(), "dist", "index.html"));
  const isExplicitDev = process.env.npm_lifecycle_event === "dev" || (process.env.NODE_ENV === "development" && !process.env.PORT);
  const isProduction = process.env.NODE_ENV === "production" || (distExists && !isExplicitDev) || Boolean(process.argv[1]?.includes("dist"));
  const primaryPort = isProduction ? (Number(process.env.PORT) || 8080) : 3000;

  app.use(express.json());

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // AI Low-Latency Advisor using gemini-3.1-flash-lite
  app.post("/api/ai/advisor", async (req, res) => {
    try {
      const { message, projectType, propertySize, history = [] } = req.body;
      const ai = getAIClient();

      const systemInstruction = `You are the AI Project Specialist & Spatial Computing Advisor for Cognitive Edge LTD ("Intelligence Beyond Reality").
Cognitive Edge LTD specializes in creating immersive digital twins and virtual reality experiences that revolutionize how real estate and interior design projects are visualized and executed.
Key Value Propositions & Metrics:
- 30% faster sales, reducing the lead-to-close cycle.
- 45% faster decision-making & approvals leading to earlier project delivery.
- 25% cost savings by uncovering customizations before construction begins.
- 15% reduction in revision time.
- "TRY BEFORE YOU BUY" customer confidence & modern buying experience.
- Services: Digital Twin Creation, Virtual Reality Experiences, Interior Design Visualization.

Your responses must be rapid, low-latency, highly structured, professional, concise, encouraging, and tailored to real estate developers, architects, general contractors, and interior designers. Keep answers clear (2-3 concise paragraphs or bullet points).`;

      const prompt = `User Query: ${message || "How can Cognitive Edge help our development project?"}
Project Type: ${projectType || "Commercial / Residential Real Estate"}
Estimated Size: ${propertySize || "Standard project"}
Conversation context: ${JSON.stringify(history.slice(-4))}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({
        reply: response.text || "Cognitive Edge LTD transforms building plans into interactive 3D digital models, reducing cost by 25% and accelerating sales by 30%. How can we assist your specific property?",
      });
    } catch (error: any) {
      console.error("AI Advisor error:", error);
      res.status(500).json({
        reply: "Cognitive Edge transforms blueprints into interactive VR digital twins, accelerating decision cycles by 45% and reducing costly rework. Contact our team at sales@cognitive-edge.us for a custom consultation.",
        error: error.message,
      });
    }
  });

  // Contact Form Submission Endpoint
  app.post("/api/contact", (req, res) => {
    const { name, companyName, profile, state, city, email, phone, message, service } = req.body;

    if (!name || !email || !state || !city) {
      return res.status(400).json({
        success: false,
        error: "Please provide Name, Email, State, and City.",
      });
    }

    console.log("New Lead from Cognitive Edge Website:", {
      name,
      companyName,
      profile: profile || "Not Specified",
      state,
      city,
      email,
      phone,
      message,
      service,
      submittedAt: new Date().toISOString(),
    });

    return res.json({
      success: true,
      message: `Thank you, ${name}! Your inquiry for ${city}, ${state} has been received. A Cognitive Edge specialist will reach out shortly.`,
      leadId: `CE-${Date.now().toString(36).toUpperCase()}`,
    });
  });

  // Vite middleware in dev or static files in production
  if (!isProduction) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const candidatePath = path.join(process.cwd(), "dist");
    const distPath = fs.existsSync(path.join(candidatePath, "index.html"))
      ? candidatePath
      : (typeof __dirname !== "undefined" && fs.existsSync(path.join(__dirname, "index.html"))
        ? __dirname
        : candidatePath);

    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Primary listener
  const primaryServer = app.listen(primaryPort, "0.0.0.0", () => {
    console.log(`Cognitive Edge Server running on http://0.0.0.0:${primaryPort}`);
  });
  primaryServer.on("error", (err: any) => {
    console.error(`Error on primary port ${primaryPort}:`, err?.message || err);
  });

  // In production, also attempt binding port 3000 if different from primary port
  if (isProduction && primaryPort !== 3000) {
    try {
      const secondaryServer = app.listen(3000, "0.0.0.0", () => {
        console.log("Cognitive Edge Server also listening on http://0.0.0.0:3000");
      });
      secondaryServer.on("error", (err: any) => {
        console.warn("Secondary port 3000 listener info:", err?.message || err);
      });
    } catch (_) {}
  }
}

startServer();
