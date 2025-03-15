import React, { useState, useEffect } from 'react';
import { TextField, Button, Card, CardContent, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { motion } from 'framer-motion';
import '../Css/ChatBot.css';

const ChatBot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.text }),
      });

      if (!response.ok) {
        throw new Error('Erreur API');
      }

      const data = await response.json();
      simulateTyping(data.reply.trim());
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: '❌ Erreur API. Réessayez plus tard.' },
      ]);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const simulateTyping = (text) => {
    let index = 0;
    setMessages((prev) => [...prev, { sender: 'bot', text: '' }]);

    const interval = setInterval(() => {
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = {
          sender: 'bot',
          text: text.substring(0, index),
        };
        return newMessages;
      });

      index++;
      if (index > text.length) clearInterval(interval);
    }, 50);
  };

  return (
    <Card
      className={`chatbot-container `}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <CardContent className="chat-messages">
        <button onClick={() => setMessages([])} className="reset-btn">
          Réinitialiser la conversation
        </button>

       
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            className={`message ${msg.sender}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {msg.sender === 'user' ? '👤 ' : '🤖 '} {msg.text}
          </motion.div>
        ))}
        {loading && <CircularProgress size={24} />}
      </CardContent>

      <form onSubmit={handleSubmit} className="chat-form">
        <TextField
          variant="outlined"
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tapez votre message..."
          className="chat-input"
        />
        <Button type="submit" variant="contained" color="primary" endIcon={<SendIcon />} disabled={loading}>
          Envoyer
        </Button>
      </form>
    </Card>
  );
};

export default ChatBot;
