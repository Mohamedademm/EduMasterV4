// ChatAndForum.js
import React, { useState } from 'react';
import '../Css/ChatAndForum.css';

function ChatAndForum() {
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: 'Alice', text: 'Bonjour tout le monde!' },
    { id: 2, user: 'Bob', text: 'Salut, comment ça va?' },
  ]);
  const [chatInput, setChatInput] = useState('');

  const [forumThreads, setForumThreads] = useState([
    { id: 1, title: 'Problème de mathématiques', author: 'Charlie', posts: 3 },
    { id: 2, title: 'Astuces de programmation', author: 'Diana', posts: 5 },
  ]);
  const [forumInput, setForumInput] = useState('');

  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Alice a mentionné votre nom dans le chat.' },
    { id: 2, message: 'Un nouveau post a été ajouté dans "Problème de mathématiques".' },
  ]);

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (chatInput.trim() !== '') {
      const newMessage = { id: chatMessages.length + 1, user: 'Vous', text: chatInput };
      setChatMessages([...chatMessages, newMessage]);
      setChatInput('');
    }
  };

  const handleForumSubmit = (e) => {
    e.preventDefault();
    if (forumInput.trim() !== '') {
      const newThread = { id: forumThreads.length + 1, title: forumInput, author: 'Vous', posts: 0 };
      setForumThreads([...forumThreads, newThread]);
      setForumInput('');
    }
  };

  return (
    <div className="chat-forum-container">
      <header className="chat-forum-header">
        <h1>Chat & Forum</h1>
        <div className="notifications">
          {notifications.map((note) => (
            <div key={note.id} className="notification">
              {note.message}
            </div>
          ))}
        </div>
      </header>
      <div className="chat-forum-content">
        <div className="chat-section">
          <h2>Chat en Direct</h2>
          <div className="chat-messages">
            {chatMessages.map((msg) => (
              <div key={msg.id} className="chat-message">
                <strong>{msg.user}:</strong> {msg.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleChatSubmit} className="chat-form">
            <input
              type="text"
              placeholder="Écrire un message..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            />
            <button type="submit">Envoyer</button>
          </form>
        </div>
        <div className="forum-section">
          <h2>Forum</h2>
          <div className="forum-threads">
            {forumThreads.map((thread) => (
              <div key={thread.id} className="forum-thread">
                <h3>{thread.title}</h3>
                <p>Par {thread.author} - {thread.posts} réponses</p>
              </div>
            ))}
          </div>
          <form onSubmit={handleForumSubmit} className="forum-form">
            <input
              type="text"
              placeholder="Créer une nouvelle discussion..."
              value={forumInput}
              onChange={(e) => setForumInput(e.target.value)}
            />
            <button type="submit">Publier</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatAndForum;
