import React from 'react';
import '../Css/EduMaster.css';
import TopPicks from './TopPicks';
import CloudSoftware from './CloudSoftware';
import PopularCourses from './PopularCourses';
import Certification from './Certification';
import Instructors from './Instructors';



function EduMaster() {
  return (
    <div className="eduMaster">
      <TopPicks />
      <CloudSoftware />
      <PopularCourses />
      <Certification />
      <Instructors/>
    </div>
  );
}

export default EduMaster;
