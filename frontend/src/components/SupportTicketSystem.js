import React, { useState, useEffect } from 'react';
import '../Css/SupportTicketSystem.css';

const SupportTicketSystem = () => {
  const [tickets, setTickets] = useState([]);
  const [newTicket, setNewTicket] = useState('');
  const [priority, setPriority] = useState('medium');
  const [status, setStatus] = useState('open');
  const [assignedTeam, setAssignedTeam] = useState('');
  
  useEffect(() => {
    setTickets([
      { id: 1, message: 'Problème de connexion', priority: 'high', status: 'open', team: 'Backend' },
      { id: 2, message: 'Bug sur l’interface mobile', priority: 'medium', status: 'resolved', team: 'Frontend' }
    ]);
  }, []);

  const handleTicketSubmit = () => {
    const newTicketData = {
      id: tickets.length + 1,
      message: newTicket,
      priority,
      status,
      team: assignedTeam
    };
    setTickets([...tickets, newTicketData]);
    setNewTicket('');
  };

  return (
    <div className="support-ticket-system">
      <h1>Système de Gestion des Incidents</h1>

      <div className="ticket-form">
        <textarea
          value={newTicket}
          onChange={(e) => setNewTicket(e.target.value)}
          placeholder="Décrivez votre problème"
        />
        <div className="form-controls">
          <label>Priorité :
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="low">Faible</option>
              <option value="medium">Moyenne</option>
              <option value="high">Haute</option>
            </select>
          </label>
          <label>Status :
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="open">Ouvert</option>
              <option value="in-progress">En Cours</option>
              <option value="resolved">Résolu</option>
            </select>
          </label>
          <label>Équipe Assignée :
            <select value={assignedTeam} onChange={(e) => setAssignedTeam(e.target.value)}>
              <option value="Backend">Backend</option>
              <option value="Frontend">Frontend</option>
              <option value="Mobile">Mobile</option>
            </select>
          </label>
          <button onClick={handleTicketSubmit}>Soumettre</button>
        </div>
      </div>

      <div className="ticket-list">
        <h2>Tickets de Support</h2>
        <table>
          <thead>
            <tr>
              <th>Message</th>
              <th>Priorité</th>
              <th>Status</th>
              <th>Équipe Assignée</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.message}</td>
                <td>{ticket.priority}</td>
                <td>{ticket.status}</td>
                <td>{ticket.team}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupportTicketSystem;
