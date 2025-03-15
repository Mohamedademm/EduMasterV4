import React from 'react';
import '../Css/TopPicks.css';

const topPicksData = [
  {
    title: "Web Design",
    description: "Master modern web design principles"
  },
  {
    title: "Adobe Photoshop",
    description: "Professional photo editing skills"
  },
  {
    title: "WordPress Design",
    description: "Create stunning WordPress sites"
  }
];

function TopPicks() {
  return (
    <section className="topPicksSection">
      <div className="topPicksContainer">
        <h2 className="topPicksTitle">Top Picks for You</h2>
        <div className="courseCardContainer">
          {topPicksData.map((course, index) => (
            <div key={index} className="courseCardCC">
              <div className="courseIconCC"></div>
              <h3 className="courseTitleCC">{course.title}</h3>
              <p className="courseDescriptionCC">{course.description}</p> 
              <div className="exploreContainerCC">
                <span className="exploreTextCC">Explore</span>
                <div className="exploreIconContainerCC"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="discoverMoreContainer">
          <button className="discoverMoreButton">Discover More Skills</button>
        </div>
      </div>
    </section>
  );
}

export default TopPicks;
