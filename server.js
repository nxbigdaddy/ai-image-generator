require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const API_KEY = YOUR_SECRET;
const BASE_URL = 'https://token-plan.cn-beijing.maas.aliyuncs.com/compatible-mode/v1';

async function generateImage(prompt, options = {}) {
  const response = await axios.post(
    `${BASE_URL}/images/generations`,
    {
      model: options.model || 'qwen-image-2.0',
      prompt: prompt,
      n: options.n || 1,
      size: options.size || '1024x1024',
    },
    {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data.data?.[0]?.url;
}

app.post('/api/generate', async (req, res) => {
  try {
    const { prompt, size, model } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const imageUrl = await generateImage(prompt, { size, model });
    res.json({ success: true, url: imageUrl });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
