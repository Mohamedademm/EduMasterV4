import React from 'react';
import '../../Css/dash/Section2.css';

function Section2() {
  return (
    <section className="section2">
      <div className="enrollmentTrends">
        <div className="sectionHeader">
          <h2>Enrollment Trends</h2>
          <div className="dropdown">
            <span>Last 6 months</span>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/4c5f3b2089f3400b839048fcebfa2d23/8ecdadd280430e811317bbd5bbaa1591870223bea4a93754dd4a1ab37737e210?apiKey=62962492ff174c4d90fed90497575cba&"
              alt=""
              className="dropdownIcon"
            />
          </div>
        </div>
        <div className="chart" aria-label="Enrollment trends chart" role="img"></div>
      </div>
      <div className="popularCourses">
        <div className="sectionHeader">
          <h2>Popular Courses</h2>
          <div className="dropdown">
            <span>All Categories</span>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/4c5f3b2089f3400b839048fcebfa2d23/8ecdadd280430e811317bbd5bbaa1591870223bea4a93754dd4a1ab37737e210?apiKey=62962492ff174c4d90fed90497575cba&"
              alt=""
              className="dropdownIcon"
            />
          </div>
        </div>
        <div className="chart" aria-label="Popular courses chart" role="img"></div>
      </div>
    </section>
  );
}

export default Section2;
