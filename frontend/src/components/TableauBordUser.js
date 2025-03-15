import React from 'react';
import '../Css/tableauBordUser.css';

const TableauBordUser = () => {
  // Données simulées pour la démonstration
  const userProgress = [
    { course: "Mathématiques", progress: 80 },
    { course: "Physique", progress: 50 },
    { course: "Chimie", progress: 70 },
  ];

  return (
    <div className="tableau-bord-user">
      <h2>Tableau de Bord Personnalisé</h2>
      <div className="progress-container">
        {userProgress.map((item, index) => (
          <div key={index} className="course-progress">
            <h3>{item.course}</h3>
            <div className="progress-bar">
              <div 
                className="progress" 
                style={{ width: `${item.progress}%` }}
              ></div>
            </div>
            <span>{item.progress}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableauBordUser;
