import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../Css/dash/Sidebar.css';

function Sidebar() {
  return (
    <aside className="sidebarSideBar">
      <h1 className="logoSideBar">EduMaster</h1>
      <nav className="navSideBar">
        <ul>
          <li>
            <NavLink to="/dashboard" className="navLinkSideBar">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/4c5f3b2089f3400b839048fcebfa2d23/d2c6920b302feb840983f1d86fa631b8ff394d887569993835094ae228b1b785?apiKey=62962492ff174c4d90fed90497575cba&"
                alt=""
                className="iconSideBar"
              />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/AdminCours" className="navLinkSideBar">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/4c5f3b2089f3400b839048fcebfa2d23/34707df174eca7174659f788962315983ade4e064b248dd6c7c66bfcb3087d9e?apiKey=62962492ff174c4d90fed90497575cba&"
                alt=""
                className="iconSideBar"
              />
              <span>Courses</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/AdminUser" className="navLinkSideBar">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/4c5f3b2089f3400b839048fcebfa2d23/dd54b0353dadf90a9ee93f4a3f489d5cc43aa022307b92b2f1e8e8908be62ef8?apiKey=62962492ff174c4d90fed90497575cba&"
                alt=""
                className="iconSideBar"
              />
              <span>Students</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/AdminTeacher" className="navLinkSideBar">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/4c5f3b2089f3400b839048fcebfa2d23/1f1a5b3c8685f7132425a3ebe79185673cd7cd3e6a0bc7bb07e36865226f040f?apiKey=62962492ff174c4d90fed90497575cba&"
                alt=""
                className="iconSideBar"
              />
              <span>Instructors</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/certifications" className="navLinkSideBar">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/4c5f3b2089f3400b839048fcebfa2d23/7c92fa0e99d0a33fab2360b657d8b9b85a7137e25801c6137afeca8e11995003?apiKey=62962492ff174c4d90fed90497575cba&"
                alt=""
                className="iconSideBar"
              />
              <span>Certifications</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/SignupManager" className="navLinkSideBar">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/4c5f3b2089f3400b839048fcebfa2d23/50ae047d7910324bf06337d73edd9792916c1e9568f9532c3e99cb77b4e86560?apiKey=62962492ff174c4d90fed90497575cba&"
                alt=""
                className="iconSideBar"
              />
              <span>SignupManager</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" className="navLinkSideBar">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/4c5f3b2089f3400b839048fcebfa2d23/50ae047d7910324bf06337d73edd9792916c1e9568f9532c3e99cb77b4e86560?apiKey=62962492ff174c4d90fed90497575cba&"
                alt=""
                className="iconSideBar"
              />
              <span>Settings</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
