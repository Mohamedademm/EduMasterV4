import React from 'react';
import '../Css/Certification.css';

const certificationData = [
  {
    title: "Professional Certification",
    description: "Recognized by top companies worldwide",
    buttonText: "Get Certified",
    className: "Certification1"
  },
  {
    title: "Industry Certification",
    description: "Validate your expertise",
    buttonText: "Learn More",
    className: "Certification2"
  },
  {
    title: "Academic Certification",
    description: "University-backed credentials",
    buttonText: "Learn More",
    className: "Certification3"
  }
];

function Certification() {
  return (
    <section className="SectionCertCertification">
      <div className="ContainerCertCertification">
        <h2 className="TitleCertCertification">Get Certified</h2>
        <div className="CardContainerCertCertification">
          {certificationData.map((cert, index) => (
            <div 
              key={index} 
              className={`CardCertCertification ${cert.className}`}
            >
              <div className="ImageContainerCertCertification"></div>
              <h3 className="CardTitleCertCertification">{cert.title}</h3>
              <p className="CardDescriptionCertCertification">{cert.description}</p>
              <button className="CardButtonCertCertification">{cert.buttonText}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Certification;
