import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Retell from "retell-sdk";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8787;

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://rita-splaash-receptionist.netlify.app',
  ],
}));

app.use(express.json());

const retellClient = new Retell({
  apiKey: process.env.RETELL_API_KEY,
});

app.post("/api/retell/create-web-call", async (req, res) => {
  try {
    const webCallResponse = await retellClient.call.createWebCall({
      agent_id: process.env.RETELL_AGENT_ID,
    });

    res.json(webCallResponse);
  } catch (error) {
    console.error("Retell error:", error);
    res.status(500).json({
      error: error.message || "Failed to create Retell web call",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
