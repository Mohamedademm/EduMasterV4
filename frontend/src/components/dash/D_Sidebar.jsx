import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, styled } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GroupIcon from '@mui/icons-material/Group';
import ClassIcon from '@mui/icons-material/Class';
import CheckIcon from '@mui/icons-material/Check';
import '../../Css/dash/D_Sidebar.css'; // Assurez-vous que le chemin est correct

const SidebarLink = styled('a')({
  textDecoration: 'none',
  color: 'inherit',
});

const DSidebar = ({ openSidebar, closeSidebar }) => (
  <Drawer
    variant="temporary"
    anchor="left"
    open={openSidebar}
    onClose={closeSidebar}
    className="custom-sidebar"
  >
    <List>
      <ListItem className="sidebar-item">
        <ListItemText primary="     " />
      </ListItem>

      <SidebarLink href="/dashboard">
        <ListItem button className="sidebar-link">
          <ListItemIcon className="sidebar-icon"><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" className="sidebar-text" />
        </ListItem>
      </SidebarLink>

      <SidebarLink href="/teachers">
        <ListItem button className="sidebar-link">
          <ListItemIcon className="sidebar-icon"><SchoolIcon /></ListItemIcon>
          <ListItemText primary="Teachers" className="sidebar-text" />
        </ListItem>
      </SidebarLink>

      <SidebarLink href="/students">
        <ListItem button className="sidebar-link">
          <ListItemIcon className="sidebar-icon"><PersonIcon /></ListItemIcon>
          <ListItemText primary="Students" className="sidebar-text" />
        </ListItem>
      </SidebarLink>

      <SidebarLink href="/rooms">
        <ListItem button className="sidebar-link">
          <ListItemIcon className="sidebar-icon"><MeetingRoomIcon /></ListItemIcon>
          <ListItemText primary="Rooms" className="sidebar-text" />
        </ListItem>
      </SidebarLink>

      <SidebarLink href="/subjects">
        <ListItem button className="sidebar-link">
          <ListItemIcon className="sidebar-icon"><MenuBookIcon /></ListItemIcon>
          <ListItemText primary="Subjects" className="sidebar-text" />
        </ListItem>
      </SidebarLink>

      <SidebarLink href="/validStudents">
        <ListItem button className="sidebar-link">
          <ListItemIcon className="sidebar-icon"><CheckIcon /></ListItemIcon>
          <ListItemText primary="Valid Students" className="sidebar-text" />
        </ListItem>
      </SidebarLink>

      <SidebarLink href="/ValidTeacherCIN">
        <ListItem button className="sidebar-link">
          <ListItemIcon className="sidebar-icon"><CheckIcon /></ListItemIcon>
          <ListItemText primary="Valid Teachers" className="sidebar-text" />
        </ListItem>
      </SidebarLink>

      <SidebarLink href="/GenerateClasses">
        <ListItem button className="sidebar-link">
          <ListItemIcon className="sidebar-icon"><ClassIcon /></ListItemIcon>
          <ListItemText primary="Generate Classes" className="sidebar-text" />
        </ListItem>
      </SidebarLink>

      
      <SidebarLink href="/D_AddSubjectsClasses">
        <ListItem button className="sidebar-link">
          <ListItemIcon className="sidebar-icon"><ClassIcon /></ListItemIcon>
          <ListItemText primary="D_AddSubjectsClasses" className="sidebar-text" />
        </ListItem>
      </SidebarLink>

      <SidebarLink href="/AddTeachersToClasse">
        <ListItem button className="sidebar-link">
          <ListItemIcon className="sidebar-icon"><CheckIcon /></ListItemIcon>
          <ListItemText primary="Add Teachers to Class" className="sidebar-text" />
        </ListItem>
      </SidebarLink>

      <SidebarLink href="/ManualTimetable">
        <ListItem button className="sidebar-link">
          <ListItemIcon className="sidebar-icon"><CheckIcon /></ListItemIcon>
          <ListItemText primary="Manual Timetable" className="sidebar-text" />
        </ListItem>
      </SidebarLink>

      <SidebarLink href="/ManagerInterface">
        <ListItem button className="sidebar-link">
          <ListItemIcon className="sidebar-icon"><GroupIcon /></ListItemIcon>
          <ListItemText primary="Manager Interface" className="sidebar-text" />
        </ListItem>
      </SidebarLink>
    </List>
  </Drawer>
);

export default DSidebar;
