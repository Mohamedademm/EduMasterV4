import React from 'react';
import '../../Css/dash/Section1.css';

function Section1() {
  return (
    <section className="section1">
      <header className="header1">
        <div className="searchContainer">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/4c5f3b2089f3400b839048fcebfa2d23/86f1bcad9f526b27deb01fcba9939345cd9ce8cb3136d28d1e1581b52ed01dfb?apiKey=62962492ff174c4d90fed90497575cba&"
            alt=""
            className="searchIcon"
          />
          <input
            type="text"
            placeholder="Search for courses, users, etc."
            className="searchInput"
            aria-label="Search for courses, users, etc."
          />
        </div>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/4c5f3b2089f3400b839048fcebfa2d23/3393d72fb0edc93800e27975063aaa10abaa880b20e18bddf21bfb9e33089c05?apiKey=62962492ff174c4d90fed90497575cba&"
          alt="User profile"
          className="userProfile"
        />
      </header>
      <div className="statsContainer">
        <div className="statCard">
          <div className="statHeader">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/4c5f3b2089f3400b839048fcebfa2d23/6f51321b811c480044e3dadefe67b8f8f526f4797d052f8013020d0ca975cd36?apiKey=62962492ff174c4d90fed90497575cba&"
              alt=""
              className="statIcon"
            />
            <span className="statGrowth">+12.5%</span>
          </div>
          <h2 className="statValue">2,543</h2>
          <p className="statLabel">Total Students</p>
        </div>
        <div className="statCard">
          <div className="statHeader">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/4c5f3b2089f3400b839048fcebfa2d23/a4c143baccd96390ba115dd5d1288d2ae12232214c59fab44d299575736b0ff8?apiKey=62962492ff174c4d90fed90497575cba&"
              alt=""
              className="statIcon"
            />
            <span className="statGrowth">+8.2%</span>
          </div>
          <h2 className="statValue">186</h2>
          <p className="statLabel">Total Courses</p>
        </div>
        <div className="statCard">
          <div className="statHeader">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/4c5f3b2089f3400b839048fcebfa2d23/666bc6753db3128e8c1f4bf3796112cc8fca5b4f4482beb8b03a0b77c6f807b1?apiKey=62962492ff174c4d90fed90497575cba&"
              alt=""
              className="statIcon"
            />
            <span className="statGrowth">+5.3%</span>
          </div>
          <h2 className="statValue">78%</h2>
          <p className="statLabel">Completion Rate</p>
        </div>
        <div className="statCard">
          <div className="statHeader">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/4c5f3b2089f3400b839048fcebfa2d23/a7d4529bdf29e7e81001ef08708293d6cefcba1653cd64b901d5c63ca9d77390?apiKey=62962492ff174c4d90fed90497575cba&"
              alt=""
              className="statIcon"
            />
            <span className="statGrowth">+15.8%</span>
          </div>
          <h2 className="statValue">$124.5k</h2>
          <p className="statLabel">Revenue</p>
        </div>
      </div>
    </section>
  );
}

export default Section1;
