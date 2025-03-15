const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/gemini', async (req, res) => {
    console.log("Requête reçue sur /api/gemini :", req.body); // Ajout du log
    const { message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'GEMINI_API_KEY non configurée' });
    }

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${apiKey}`,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: message
                            }
                        ]
                    }
                ]
            }
        );
    
        const reply = response.data.candidates[0].content.parts[0].text.trim();
        res.json({ reply });
    } catch (error) {
        console.error('Erreur API Gemini :', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Erreur lors de la communication avec l\'API Gemini' });
    }
});


module.exports = router;
