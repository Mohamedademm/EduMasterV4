// meeting.js
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Bell, Plus, Search } from 'lucide-react';
import '../Css/MeetingPage.css';

const meetingsData = [
  { id: 1, date: "12/02/2025 - 14h00", host: "Prof. Ahmed", topic: "Mathématiques", participants: 25, status: "En cours" },
  { id: 2, date: "13/02/2025 - 10h30", host: "Dr. Salma", topic: "Intelligence Artificielle", participants: 15, status: "Terminé" },
  { id: 3, date: "14/02/2025 - 16h00", host: "Prof. Yassine", topic: "Marketing Digital", participants: 40, status: "À venir" },
];

const MeetingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMeetings, setFilteredMeetings] = useState(meetingsData);

  useEffect(() => {
    setFilteredMeetings(
      meetingsData.filter(meeting =>
        meeting.topic.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  return (
    <div className="meeting-container">
      <header className="meeting-header">
        <h1>Meetings & Live Classes</h1>
        <Button className="create-btn"><Plus /> Créer une réunion</Button>
        <Input className="search-bar" placeholder="Rechercher..." onChange={(e) => setSearchTerm(e.target.value)} />
      </header>
      
      <div className="dashboard">
        <Card>
          <CardContent>
            <p>Total Réunions : 10</p>
          </CardContent>
        </Card>
      </div>
      
      <Table className="meeting-table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Date & Heure</TableCell>
            <TableCell>Hôte</TableCell>
            <TableCell>Sujet</TableCell>
            <TableCell>Participants</TableCell>
            <TableCell>Statut</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredMeetings.map(meeting => (
            <TableRow key={meeting.id}>
              <TableCell>{meeting.id}</TableCell>
              <TableCell>{meeting.date}</TableCell>
              <TableCell>{meeting.host}</TableCell>
              <TableCell>{meeting.topic}</TableCell>
              <TableCell>{meeting.participants}</TableCell>
              <TableCell>{meeting.status}</TableCell>
              <TableCell>
                <Button>🔗</Button>
                <Button>🔍</Button>
                <Button>✏️</Button>
                <Button>❌</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Calendar className="meeting-calendar" />
    </div>
  );
};

export default MeetingPage;
