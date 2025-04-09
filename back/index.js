const express = require('express');
// Import node-fetch for server-side fetch
const app = express();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const PORT = 3001;
const cors = require('cors');
require('dotenv').config();

// Middleware
app.use(cors({
  origin: '*',  // Plus permissif pour le développement
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.post('/chat', async (req, res) => {
  console.log(req.body); // Debugging: Log the request body
  const userMessage = req.body.message;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userMessage }],
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    const botResponse = data.choices[0].message.content;
    res.json({ response: botResponse });
  } catch (error) {
    console.error('Error communicating with OpenAI:', error.message);
    res.status(500).json({ error: 'Failed to fetch response from OpenAI' });
  }
});

// Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});