import React from 'react';
import '../Css/CloudSoftware.css';

const featuresData = [
  {
    title: "Seamless Learning",
    description: "Sync your progress across all your devices"
  },
  {
    title: "AI-Powered Recommendations",
    description: "Personalized learning paths just for you"
  },
  {
    title: "Interactive Live Classes",
    description: "Join real-time sessions with experts"
  }
];

function CloudSoftware() {
  return (
    <section className="cloudSoftwareSectionCS">
      <div className="cloudSoftwareContainerCS">
        <h2 className="cloudSoftwareTitleCS">All-In-One Cloud Software</h2>
        <div className="featureCardContainerCS">
          {featuresData.map((feature, index) => (
            <div key={index} className="featureCardCS">
              <h3 className="featureTitleCS">{feature.title}</h3>
              <p className="featureDescriptionCS">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CloudSoftware;
  