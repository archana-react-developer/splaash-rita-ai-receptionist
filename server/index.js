import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8787;

app.use(cors({ origin: true }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'splaash-rita-api' });
});

app.post('/api/retell/create-web-call', async (req, res) => {
  try {
    const apiKey = process.env.RETELL_API_KEY;
    const agentId = process.env.RETELL_AGENT_ID || req.body.agentId;

    if (!apiKey) return res.status(400).json({ error: 'Missing RETELL_API_KEY in server .env' });
    if (!agentId) return res.status(400).json({ error: 'Missing RETELL_AGENT_ID in server .env' });

    const retellResponse = await fetch('https://api.retellai.com/v2/create-web-call', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agent_id: agentId,
        metadata: {
          source: 'splaash_website',
          receptionist: 'Rita',
          business: 'Splaash Art Studio',
        },
        retell_llm_dynamic_variables: {
          business_name: 'Splaash Art Studio',
          receptionist_name: 'Rita',
          class_day: 'Saturday',
          age_group_1: '5 to 7 years, 1:00 PM to 2:00 PM Pacific Time',
          age_group_2: '8 to 12 years, 2:30 PM to 3:30 PM Pacific Time',
          monthly_price: '$40 per month for four live Zoom classes',
        },
      }),
    });

    const data = await retellResponse.json();
    if (!retellResponse.ok) {
      return res.status(retellResponse.status).json({ error: 'Retell API error', details: data });
    }
    res.status(201).json(data);
  } catch (error) {
    console.error('Retell create-web-call failed:', error);
    res.status(500).json({ error: 'Unable to create Retell web call', details: error?.message || 'Unknown error' });
  }
});

app.listen(PORT, () => console.log(`Rita API running on http://localhost:${PORT}`));
