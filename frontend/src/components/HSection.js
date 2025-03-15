import React from 'react';
import '../Css/H_section.css'; // Ensure this CSS file exists with your styles

const HSection1 = () => {
  return (
    <div className="landingSection">
      <main className="mainContent">
        <div className="contentWrapper">
          <div className="gridLayout">
            <div className="textContainer">
              <h1 className="heroTitle">Master Your Future with AI-Driven Learning</h1>
              <p className="heroSubtitle">Courses, Certifications, and Career-Boosting Skills in One Platform</p>
              <div className="ctaButtons">
                <button className="primaryCta1">Get Started for Free</button>
                <button className="secondaryCta">Explore Courses</button>
              </div>
            </div>
            <div className="imageContainer">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/4c5f3b2089f3400b839048fcebfa2d23/0a55039f0359052a9aeb53943f2fb9955ab0214e16f05b9131f1f6a882112d46?apiKey=4c5f3b2089f3400b839048fcebfa2d23&"
                alt="AI-driven learning platform interface"
                className="heroImage"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HSection1;