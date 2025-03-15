import React from 'react';
import '../../Css/dash/Section3.css';

function Section3() {
  return (
    <section className="section3">
      <div className="recentStudents">
        <div className="sectionHeader">
          <h2>Recent Students</h2>
          <button className="viewAllButton">View All</button>
        </div>
        <table className="studentsTable">
          <thead>
            <tr>
              <th>Student</th>
              <th>Email</th>
              <th>Course</th>
              <th>Progress</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="studentInfo">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/4c5f3b2089f3400b839048fcebfa2d23/a9b99f9ce4435a1cd3c4d4ef154288a25c85f52f213b941a00f96478a7c96431?apiKey=62962492ff174c4d90fed90497575cba&"
                    alt=""
                    className="studentAvatar"
                  />
                  <span>Sarah Wilson</span>
                </div>
              </td>
              <td>sarah.w@example.com</td>
              <td>UX Design Fundamentals</td>
              <td>
                <div className="progressBar">
                  <div
                    className="progressFill"
                    style={{ width: '70%' }}
                    aria-label="Progress: 70%"
                    role="progressbar"
                    aria-valuenow="70"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </td>
              <td>
                <button className="viewDetailsButton">View Details</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="instructorCard">
        <div className="instructorInfo">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/4c5f3b2089f3400b839048fcebfa2d23/8f44a8ead0386e6c3f0b7618dea5dd8c3e51418008cd7c9114cb0f8a1d11d132?apiKey=62962492ff174c4d90fed90497575cba&"
            alt=""
            className="instructorAvatar"
          />
          <div>
            <h3>David Chen</h3>
            <p>Web Development</p>
          </div>
        </div>
        <div className="instructorStats">
          <div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/4c5f3b2089f3400b839048fcebfa2d23/01c52aa4ff08ebaece85f494112fef47cae975a2b7421d23f4302c3b8d3c29d7?apiKey=62962492ff174c4d90fed90497575cba&"
              alt=""
              className="statIcon"
            />
            <span>1,234 Students</span>
          </div>
          <div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/4c5f3b2089f3400b839048fcebfa2d23/53807c1fd86509f2dc4c9292b0f8c36f26261138bfa3f39bbada27a8130a191c?apiKey=62962492ff174c4d90fed90497575cba&"
              alt=""
              className="statIcon"
            />
            <span>4.8 Rating</span>
          </div>
        </div>
        <button className="viewProfileButton">View Profile</button>
      </div>
      <div className="courseCard1">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/4c5f3b2089f3400b839048fcebfa2d23/2a8121af0b9e0b79b64ce705c8ea90433d7afa350baa9226cce828f3f2053b07?apiKey=62962492ff174c4d90fed90497575cba&"
          alt=""
          className="courseImage"
        />
        <h3>Modern Web Development</h3>
        <div className="instructorInfo">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/4c5f3b2089f3400b839048fcebfa2d23/81ce2376ef933fcbaf8341ab809b41d0c1a8d28c250975d32647728805d661bc?apiKey=62962492ff174c4d90fed90497575cba&"
            alt=""
            className="instructorAvatar"
          />
          <span>by David Chen</span>
        </div>
        <div className="courseFooter">
          <div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/4c5f3b2089f3400b839048fcebfa2d23/0fd1b08417f15897951970f2323e634ba22a95135d007353a824550436cd861b?apiKey=62962492ff174c4d90fed90497575cba&"
              alt=""
              className="statIcon"
            />
            <span>845 Students</span>
          </div>
          <button className="exploreButton">Explore</button>
        </div>
      </div>
    </section>
  );
}

export default Section3;
